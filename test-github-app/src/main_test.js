require('dotenv').config()

const { GITHUB_ACCESS_TOKEN } = process.env
console.log('TOKEN: ', GITHUB_ACCESS_TOKEN)

const { program } = require('commander')
const { Octokit } = require('octokit')

program.version('0.0.1')

const octokit = new Octokit({ auth: GITHUB_ACCESS_TOKEN }) // 유저 정보 출력

program
  .command('me')
  .description('Check my profile')
  .action(async () => {
    const {
      data: { login },
    } = await octokit.rest.users.getAuthenticated()
    console.log('Hello, %s', login)
  })

program
  .command('list-bugs')
  .description('List issues with bug label')
  .action(async () => {
    const result = octokit.rest.issues.listForRepo({
      owner: 'youngvctr',
      repo: 'TIL-',
      label: 'bug', // 특정 레이블 필터링 가능.
    })

    const issuesWithBugLabel = (await result).data.filter(
      // 버그만 솎아내기
      (issue) =>
        issue.labels.find((label) => label.name === 'bug') !== undefined
    )

    const output = issuesWithBugLabel.map((issue) => ({
      title: issue.title,
      number: issue.number,
    }))

    console.log(output)
  })

// 풀 리퀘스트를 모두 검사해서, 만약 너무 diff가 큰(코드 100줄) 풀 리퀘스트가 있으면 `too-big`이라는 레이블을 붙임.
program
  .command('check-prs')
  .description('Check pull requires status')
  .action(async () => {
    console.log('Check PRs!')
  })

program.parseAsync()
