// @ts-check

const { Client } = require('pg')
require('dotenv').config()

async function connect() {
  const client = new Client({
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
  })
  await client.connect()
  return client
}

module.exports.connect = connect
