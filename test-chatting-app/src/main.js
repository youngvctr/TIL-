// @ts-check

const Koa = require('koa')
const path = require('path')
const Pug = require('koa-pug')
const route = require('koa-route')
const serve = require('koa-static')
const websockify = require('koa-websocket')
const mount = require('koa-mount')
const mongoClient = require('./mongo')

const app = websockify(new Koa())

// @ts-ignore
// eslint-disable-next-line no-new
new Pug({
  viewPath: path.resolve(__dirname, './views'),
  app,
})

app.use(mount('/public', serve('src/public')))

app.use(async (ctx) => {
  await ctx.render('main')
})

const _client = mongoClient.connect()

async function getChatsCollection() {
  const client = await _client
  return client.db('chat').collection('chats')
}

// Using routes
app.ws.use(
  route.all('/ws', async (ctx) => {
    const chatsCollection = await getChatsCollection()
    const chatsCursor = chatsCollection.find(
      {},
      {
        sort: {
          createdAt: 1,
        },
      }
    )

    const chats = await chatsCursor.toArray()
    ctx.websocket.send(
      //채팅을 다 긁어모아서 array로 만들어주는.
      JSON.stringify({
        type: 'sync',
        payload: {
          chats,
        },
      })
    )
    //ctx.websocket.send('Hello, Client!') // string
    ctx.websocket.on('message', async (data) => {
      // @ts-ignore
      //if (typeof data !== 'string') {
      //  return
      //}

      /** @type {Chat} */
      const chat = JSON.parse(data.toString()) // 서버가 재시작 했을 때 이전 데이터가 그대로 보존되어야 하므로.
      await chatsCollection.insertOne({
        ...chat,
        createdAt: new Date(),
      })
      const { message, nickname } = chat

      const { server } = app.ws

      if (!server) {
        return
      }

      server.clients.forEach((client) => {
        //broadcast : 주소에 접속한 user들이 같은 내용을 보도록함.
        client.send(
          JSON.stringify({
            type: 'chat',
            payload: {
              message,
              nickname,
            },
          })
        )
      })

      console.log(`${nickname} : ${message}`) // buffer to string
    })
  })
)

app.listen(5000)
