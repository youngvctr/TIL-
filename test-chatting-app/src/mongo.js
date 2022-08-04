// @ts-check
// @ts-ignore
require('dotenv').config()
const { MongoClient } = require('mongodb')
const { MONGO_PASSWORD, MONGO_USER, MONGO_CLUSTER } = process.env

const uri = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_CLUSTER}.gwyplzx.mongodb.net/?retryWrites=true&w=majority`
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

module.exports = client
