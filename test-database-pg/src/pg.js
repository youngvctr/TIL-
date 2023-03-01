// @ts-check

const { Client } = require('pg')
const program = require('commander')
const prompts = require('prompts')
const { tableize } = require('i/lib/methods')

async function connect() {
  const client = new Client({
    user: 'root',
    password: 'todayis220624!',
    database: 'climbing_portal',
  })
  await client.connect()
  return client
}

// @ts-ignore
program.command('list').action(async () => {
  const client = await connect()
  const tableName = await prompts({
    type: 'text',
    name: 'table',
    message: 'Provide a table list.',
  })
  const query = `SELECT * FROM ${tableName.table}`
  const result = await client.query(query)
  console.log(result.rows)
  await client.end()
})

// @ts-ignore
program.command('add').action(async () => {
  const client = await connect()
  const userName = await prompts({
    type: 'text',
    name: 'userName',
    message: 'Provide a user name to insert.',
  })

  const query = `INSERT INTO users (name) VALUES ($1::text)`
  await client.query(query, [userName.userName])
  await client.end()
})

// @ts-ignore
program.command('remove').action(async () => {
  const client = await connect()
  const userName = await prompts({
    type: 'text',
    name: 'userName',
    message: 'Provide a user name to delete.',
  })

  // SQL injection이 가능한 지점, SQL injection : 고전적인 해킹 기법
  // query문을 직접 작성하게되면, 모든 값을 통과하는 쿼리로 테이블을 날릴 수도 있다.
  // const inserted = userName.userName
  // const inserted = `' OR '' = '`
  // const query = `DELETE FROM users WHERE name = $1::text`
  // 항상 escape를 해주어야됨. 대체가능한 고정된 string에 파라미터를 제공해서 pg가 해당 부분을 다루도록 처리해야함.
  await client.query(`DELETE FROM users WHERE name = $1::text`, [
    userName.userName,
  ])
  await client.end()
})

// @ts-ignore
program.parseAsync()
