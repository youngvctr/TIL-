// @ts-check

const { v4: uuidv4 } = require('uuid') //Universally Unique IDentifier; 네트워크 상에서 고유성이 보장되는 id를 만들기 위한 표준 규약.
const { getUsersCollection } = require('./mongo')
const { signJWT } = require('./jwt')

/**a
 * @param {string} facebookId
 * @returns {Promise<string>}
 */
async function createUserWithFacebookIdAndGetId(facebookId) {
  const users = await getUsersCollection()
  const userId = uuidv4()
  await users.insertOne({
    id: userId,
    facebookId,
  })
  return userId
}

/**
 * @param {string} userId
 */
async function getAccessTokenForUserId(userId) {
  return signJWT(userId)
}

module.exports = {
  createUserWithFacebookIdAndGetId,
  getAccessTokenForUserId,
}
