// @ts-check
//IIFE
;(() => {
  const socket = new WebSocket(`ws://${window.location.host}/ws`)
  const formEl = document.getElementById('form')
  const chatsEl = document.getElementById('chats')
  /** @type {HTMLInputElement | null} */
  // @ts-ignore
  const inputEl = document.getElementById('input')

  if (!formEl || !inputEl || !chatsEl) {
    throw new Error('Init failed!')
  }

  /**
   * @typedef Chat //타입을 명시한다.
   * @property {string} nickname
   * @property {string} message
   */

  /**
   * @type {Chat[]}
   */
  const chats = []

  const adjectives = ['귀여운', '깜찍한', '조그만한', '소중한', '까칠한']
  const animals = ['사자', '호랑이', '표범', '독수리', '돌고래']

  /**
   * @param {string[]} array
   * @returns {string}
   */

  function pickRandom(array) {
    const randomIdx = Math.floor(Math.random() * array.length)
    const result = array[randomIdx]
    if (!result) {
      throw new Error('array length is 0.')
    }
    return array[randomIdx]
  }

  const myNickname = `${pickRandom(adjectives)} ${pickRandom(animals)}`

  formEl.addEventListener('submit', (event) => {
    event.preventDefault()
    socket.send(
      JSON.stringify({
        nickname: myNickname,
        message: inputEl.value,
      })
    )
    inputEl.value = ''
  })

  const drawChats = () => {
    chatsEl.innerHTML = ''
    chats.forEach(({ nickname, message }) => {
      const div = document.createElement('div')
      div.innerText = `${nickname}: ${message}`
      chatsEl.appendChild(div)
    })
  }

  socket.addEventListener('message', (event) => {
    const { type, payload } = JSON.parse(event.data)

    if (type === 'sync') {
      const { chats: syncedChats } = payload
      chats.push(...syncedChats)
    } else if (type === 'chat') {
      const chat = payload
      chats.push(chat)
    }

    drawChats()

    //alert(event.data)
  })
})()
