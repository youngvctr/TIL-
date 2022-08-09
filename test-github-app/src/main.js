// @ts-check
require('dotenv').config()

const { GITHUB_ACCESS_TOKEN } = process.env

const { program } = require('commander') // 커맨더 설정
const { Octokit } = require('octokit') // private access to git
const prompts = require('prompts') // prompts 재확인 질문 / 의도하지 않은 변경을 막기 위함
const chalk = require('chalk') // chalk 터미널에 출력되는 문자열의 색을 입힘.
const marked = require('marked') // 문서 내 마크다운에 접근함.

program.version('0.0.2')

const octokit = new Octokit({ auth: GITHUB_ACCESS_TOKEN }) // 유저 정보 출력

const OWNER = process.env.GITHUB_OWNER || ''
const REPO = process.env.GITHUB_REPO || ''

const LABEL_TOO_BIG = 'too-big'
const LABEL_BUG = 'bug'
const LABEL_NEEDS_SCREENSHOT = 'needs-screenshot'

program
  .command('me')
  .description('Check my profile')
  .action(async () => {
    const {
      data: { login },
    } = await octokit.rest.users.getAuthenticated() // 출력 데이터는 꼭 필요한 데이터 외에는 하지 말 것(보안)
    console.log('Hello, ' + chalk.bold.yellow(`${login}`))
  })

/**
 *
 * @param {Array<*>} labels
 * @param {string} labelName
 * @returns {boolean}
 */
function hasLabel(labels, labelName) {
  // 중복된 스크립트를 정리하기 위한 메서드
  return labels.find((label) => label.name === labelName) !== undefined
}

program
  .command('list-bugs')
  .description('List issues with bug label')
  .action(async () => {
    const result = await octokit.rest.issues.listForRepo({
      owner: OWNER,
      repo: REPO,
      labels: 'bug',
    })

    const issuesWithBugLabel = result.data.filter(
      // 특정 레이블 필터링
      // 버그만 솎아내기
      (issue) => hasLabel(issue.labels, LABEL_BUG)
    )

    const output = issuesWithBugLabel.map((issue) => ({
      title: issue.title,
      number: issue.number,
    }))

    // @ts-ignore
    let res = Boolean(result.data.map[0])
      ? console.log(chalk.redBright.underline(output))
      : console.log(chalk.blue(`There has no bugs data`))
  })

// 풀 리퀘스트를 모두 검사해서, 만약 너무 diff가 큰(코드 100줄) 풀 리퀘스트가 있으면 `too-big`이라는 레이블을 붙임.
program
  .command('check-prs')
  .description('Check pull-request status')
  .action(async () => {
    const result = await octokit.rest.pulls.list({
      owner: OWNER,
      repo: REPO,
    })
    // 해당 레이블이 달려있는 경우 찾기
    const presWithDiff = await Promise.all(
      result.data.map(async (pr) => ({
        labels: pr.labels,
        number: pr.number,
        compare: await octokit.rest.repos.compareCommits({
          owner: OWNER,
          repo: REPO,
          base: pr.base.ref, // 해당 pr이 들어가는 branch
          head: pr.head.ref, // 현재 pr이 해당하는 branch
        }),
      }))
    )

    if (Boolean(presWithDiff[0]) === false) {
      console.log(chalk.green('There has no PR data'))
      return
    }

    const initialValue = 0
    await Promise.all(
      presWithDiff
        .map(({ compare, ...rest }) => {
          const totalChanges = compare.data.files?.reduce(
            (sum, file) => sum + file.changes, // initialValue를 같이 써줘야됨.
            initialValue
          )
          return {
            compare,
            totalChanges,
            ...rest,
          }
        })
        .filter(
          (pr) =>
            pr && typeof pr.totalChanges === 'number' && pr.totalChanges > 100
        )
        .map(async ({ labels, number, totalChanges }) => {
          console.log(
            chalk.cyanBright('PR :', number),
            chalk.grey(','),
            chalk.blueBright('totalChanges : ', totalChanges)
          )

          if (!hasLabel(labels, LABEL_TOO_BIG)) {
            console.log(
              chalk.green(`Adding ${LABEL_TOO_BIG} label to PR ${number}...`)
            )

            const response = await prompts({
              type: 'confirm',
              name: 'shouldContinue',
              message: chalk.magentaBright(
                `Do you really want to add label ${LABEL_TOO_BIG} to PR #${number} ?`
              ),
            })

            return response.shouldContinue === true
              ? (octokit.rest.issues.addLabels({
                  owner: OWNER,
                  repo: REPO,
                  issue_number: number,
                  labels: [LABEL_TOO_BIG],
                }),
                console.log(chalk.bgGreenBright(`Approved!`)))
              : console.log(chalk.bgGrey(`Cancelled!`))
          }
          return undefined
        })
    )
  })

/**
 *
 * @param {string} md
 */
function isAnyScreenshotInMarkdownDocument(md) {
  // 마크다운 문서에서 스크린샷이 있는지를 확인함.
  const tokens = marked.lexer(md)
  marked.walkTokens(tokens, (token) => {
    if (token.type === 'image') {
      return true
    }
    return false
  })
}

// bug 레이블이 달려 있으나, 스크린샷이 없는 이슈에 대해 needs-screenshot 레이블 달기

program
  .command('check-screenshots')
  .description(
    'Check if any issue missing screenshot even if it has bug label on it'
  )
  .action(async () => {
    const result = await octokit.rest.issues.listForRepo({
      owner: OWNER,
      repo: REPO,
      labels: 'bug', // 특정 레이블 필터링 가능.
    })

    if (Boolean(result.data[0]) === false) {
      console.log(chalk.green('There has no data'))
      return
    }

    const issuesWithBugLabel = result.data // 이슈보고 컨텐츠를 파악해야됨. 마크다운으로 표시된 이슈 내용을 접근함.
    // 1. bug 레이블이 있고, 스크린샷은 없음 => + needs-screenshot
    const issuesWithoutScreenshot = issuesWithBugLabel.filter(
      (issue) =>
        (!issue.body || !isAnyScreenshotInMarkdownDocument(issue.body)) &&
        !hasLabel(issue.labels, LABEL_NEEDS_SCREENSHOT)
    )

    await Promise.all(
      issuesWithoutScreenshot.map(async (issue) => {
        const shouldContinue = await prompts({
          type: 'confirm',
          name: 'shouldContinue',
          message: chalk.magentaBright(
            `Add ${LABEL_NEEDS_SCREENSHOT} to issue #${issue.number} | ${issue.title}?`
          ),
        })

        shouldContinue.shouldContinue = true
          ? (await octokit.rest.issues.addLabels({
              owner: OWNER,
              repo: REPO,
              issue_number: issue.number,
              labels: [LABEL_NEEDS_SCREENSHOT],
            }),
            console.log(chalk.green(`Added!`)))
          : console.log(chalk.grey(`Cancelled!`))
      })
    )

    // 2. bug 레이블이 있고, needs-screenshot과 스크린샷이 있음 => -need-screenshot
    const issuesResolved = issuesWithBugLabel.filter(
      (issue) =>
        issue.body &&
        isAnyScreenshotInMarkdownDocument(issue.body) &&
        hasLabel(issue.labels, LABEL_NEEDS_SCREENSHOT)
    )

    await Promise.all(
      issuesResolved.map(async (issue) => {
        const shouldConfirm = await prompts({
          type: 'confirm',
          name: 'shouldConfirm',
          message: chalk.magentaBright(
            `Remove ${LABEL_NEEDS_SCREENSHOT} from issue #${issue.number} | ${issue.title}?`
          ),
        })

        shouldConfirm.shouldConfirm = true
          ? (await octokit.rest.issues.removeLabel({
              owner: OWNER,
              repo: REPO,
              issue_number: issue.number,
              name: LABEL_NEEDS_SCREENSHOT,
            }),
            console.log(chalk.green(`Removed!`)))
          : console.log(chalk.bgGrey(`Cancelled!`))
      })
    )
  })

program.parseAsync()
