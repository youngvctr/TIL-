// @ts-check
const http = require('http')
const fs = require('fs')
const path = require('path')

const fetch = require('node-fetch') //node-fetch@2 버전으로 재설치 후 {default:fetch} > fetch로 변경.
const { pipeline } = require('stream')
const { promisify } = require('util')
const { createApi } = require('unsplash-js')

const sharp = require('sharp') // 리사이징
const imageSize = require('image-size')

require('dotenv').config()

const unsplash = createApi({
  accessKey: process.env.UNSPLASH_API_ACCESS_KEY,
  // @ts-ignore
  fetch: fetch.default,
})

/**
 *
 * @param {string} query
 */
async function searchImage(query) {
  const result = await unsplash.search.getPhotos({ query })

  if (!result.response) {
    throw new Error('Failed to search image.')
  }

  const image = result.response.results[0]

  if (!image) {
    throw new Error('No image found.')
  }

  return {
    description: image.description || image.alt_description,
    url: image.urls.regular,
  }
}

/**
 * 이미지를 Unsplash에서 검색하거나, 이미 있다면 캐시된 이미지를 반환.
 */

async function getChachedImageOrSearchedImage(query) {
  const imageFilePath = path.resolve(__dirname, `../images/${query}`)

  if (fs.existsSync(imageFilePath)) {
    return {
      message: `Returning cached image: ${query}`,
      stream: fs.createReadStream(imageFilePath),
    }
  }

  const result = await searchImage(query)
  const resp = await fetch.default(result.url)

  resp.body.pipe(fs.createWriteStream(imageFilePath))

  await promisify(pipeline)(resp.body, fs.createWriteStream(imageFilePath))
  const size = imageSize.default(imageFilePath)

  return {
    message: `Returning new image: ${query}, width: ${size.width}, height: ${size.height}`,
    stream: fs.createReadStream(imageFilePath),
  }
}

/**
 * @param {string} url
 * @returns
 */

function convertURLToImageInfo(url) {
  // URL을 어떻게 파싱할 것인가?
  const urlObj = new URL(url, `http://localhost:${PORT}`)

  /**
   *
   * @param {string} name
   * @param {number} defaultValue
   * @returns
   */
  function getSearchParam(name, defaultValue) {
    const str = urlObj.searchParams.get(name)
    return str ? parseInt(str, 10) : defaultValue
  }

  const width = getSearchParam('width', 400)
  const height = getSearchParam('height', 400)

  return {
    query: urlObj.pathname.slice(1),
    width,
    height,
  }
}

const server = http.createServer((req, res) => {
  async function main() {
    if (!req.url) {
      res.statusCode = 400
      res.end('Needs URL.')
      return
    }

    const { query, width, height } = convertURLToImageInfo(req.url)
    try {
      const { message, stream } = await getChachedImageOrSearchedImage(query)
      console.log(message)
      await promisify(pipeline)(
        stream,
        sharp()
          .resize(width, height, {
            fit: 'cover', // cover : 정해진 영역을 모두 채우는 것, conatain : 공백 생김
            background: '#ffffff',
          })
          .png(),
        res
      )
    } catch {
      res.statusCode = 400
      res.end()
    }
  }

  main()
})

const PORT = 5000
server.listen(PORT, () => {
  console.log(`The server is listening at port: ${PORT}`)
})
