# Github Repository Management CLI

## 1. 프로젝트 설계

          협업을 통한 프로젝트가 진행됨에 따라 프로젝트 내에 크고 작은 버그가 발생될 수 있다.   
        이때 발생된 버그 이슈는 프로젝트 리포지토리 ISSUE 탭에 남겨 이를 협업하는 개발자들과 공유하곤 한다.   
        그런데 이와 관련하여 로컬에서 원격 리포지토리에 접근하여 버그 및 기타 논의거리에 접근할 수 있게 된다면 보다 편리하게 개발할 수 있다.   
        따라서 본 프로젝트를 통해 GITHUB 관리를 위한 CLI를 만들 것이다. 
  #### 사용된 모듈 
  - dotenv : private imformation을 blind 처리
  - commander : 커맨더 설정
  - octokit : private access to git
  - prompts : 재확인 질문 / 의도하지 않은 변경을 막음
  - chalk : 터미널에 출력되는 문자열의 색 변경
  - marked : 마크다운 문서에 접근
## 2. 구현 flow

  본 토이프로젝트에서는 commander 설정, github에 접근을 비롯하여 작성할 수 있는 스크립트를 기준으로 나누었을 때 프로필 접근, 버그 목록 접근, Pull-request 접근, 마크다운 문서 접근까지 크게 여섯 개의 코드 조각으로 나눠볼 수 있다. 
### 2.1 Commander 설정
  터미널에 작성할 커맨더는 다음과 같은 규칙으로 작성한다. 커맨더에 설정한 규칙은 git에 접근할 때도 쓰이지만, 명령어 전체를 출력할 때도 쓰이므로 꼼꼼하게 작성해두는 것이 좋다.
```
program // commander의 object
  .command(somthing) // typeof something === 'string', 실제 명령에 사용.
  .description(something) // typeof something === 'string', 명령어에 관한 자세한 설명
  .action(async () => {
    // 명령어 실행
  }
```
### 2.2 Github에 접근
  Github 접근을 위해서는 앞서 언급하였지만 git token이 필요하다. git token은 octokit 객체를 초기화하는 시점에 auth 값으로 설정한다.
```
const octokit = new Octokit({ auth: GITHUB_ACCESS_TOKEN })
```
### 2.3 Profile에 접근
   Octokit으로 github 개인 정보에 접근해볼 수 있다. 이때 login 정보만 가볍게 가져오는 것이 좋다. 그래야 보안에 취약해지지 않는다. 
```
const {
  data: { login },
  } = await octokit.rest.users.getAuthenticated() // 출력 데이터는 꼭 필요한 데이터 외에는 하지 말 것(보안)
  console.log('Hello, ' + chalk.bold.yellow(`${login}`))
```
### 2.4 버그 목록에 접근
   Git repository를 보면 issue 탭에서 버그레이블을 붙여 버그 이슈 문서를 생성하게된다. 버그 label이 달린 문서만 터미널에 title, number로 출력한다.
```
const res = await octokit.rest.issues.listForRepo({
      owner: OWNER,
      repo: REPO,
      labels: 'bug', // 다양하게 접근할 수 있음. 'bug,ui,@high'
    })

    const contentsWthBgLbl = res.data.filter(
      // 특정 레이블을 필터링
      // 버그 레이블만 솎아내기
      (issue) => hasLabel(issue.labels, LABEL_BUG) // 코드 중복을 간추리기 위한 메서드
    )

    const output = contentsWthBgLbl.map((issue) => ({
      title: issue.title,
      number: issue.number,
    }))
    
    console.log(output)
})

```
### 2.5 Pull Request에 접근
   Pull Request에서 큰 변화로 생각할 수 있는 것은 코드줄 수다. 코드 줄이 극명하게 차이나도록 변경된 것에서 USER에게 알림을 줄 수 있도록 극명한 차이인 특정 숫자를 기준으로 PR에 too-big이란 label을 붙이도록 설정한다.
```
const result = await octokit.rest.pulls.list({
      owner: OWNER, // github 접근
      repo: REPO,
    })
    
    // 해당 레이블이 달려있는 PR 찾기
    const presWithDiff = await Promise.all(
      result.data.map(async (pr) => ({
        labels: pr.labels,
        number: pr.number,
        compare: await octokit.rest.repos.compareCommits({
          owner: OWNER,
          repo: REPO,
          base: pr.base.ref, // 해당 pr이 들어가는 branch
          head: pr.head.ref, // 현재 pr이 해당하는 branch 미리 생성해둔 branch에 pull request 해둘 것.
        }),
      }))
    )

	// PR의 차이를 특정한 기준 값으로 설정함
    const initialValue = 0 // reduce를 위한 초깃값
    await Promise.all(
      presWithDiff
        .map(({ compare, ...rest }) => { // 기존 배열의 인자들을 새로운 기준으로 쪼개서 반환함.
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
        .filter( // 특정 조건문을 기준으로 label을 붙일 것인지를 설정함.
          (pr) =>
            pr && typeof pr.totalChanges === 'number' && pr.totalChanges > 10 // 기준 값(변경 내용이 많지 않았음. test용)
        )
        .map(async ({ labels, number, totalChanges }) => {
          console.log(
            chalk.cyanBright('PR :', number),
            chalk.grey(','),
            chalk.blueBright('totalChanges : ', totalChanges)
          )

          if (!hasLabel(labels, LABEL_TOO_BIG)) { // 없으면
            console.log(
              chalk.green(`Adding ${LABEL_TOO_BIG} label to PR ${number}...`)
            )

            const response = await prompts({
              type: 'confirm', // y/n로 질문
              name: 'shouldContinue',
              message: chalk.magentaBright(
                `Do you really want to add label ${LABEL_TOO_BIG} to PR #${number} ?`
              ),
            })

            return response.shouldContinue === true
              ? (await octokit.rest.issues.addLabels({
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
```
### 2.6 Markdown 문서에 접근
   Bug label이 붙은 문서는 bug와 관련하여 자세한 내용을 담고 있어야 한다. 그래서 issue를 기록한 문서에는 screenshot이 추가되어야 bug가 어떤 문제를 발생시켰는지 눈으로 알 수 있다. 따라서 marked 모듈로 생성한 객체를 통해 Issue에 추가된 markdown 문서에 접근하고, screenshot의 유/무를 파악해야한다. 그리고나서 screenshot이 필요한지를 label로 추가해 상세한 issue보고 문서가 될 수 있게 한다. 한편, screenshot이 추가된 문서는 더이상 label이 필요 없으므로 불필요한 label을 삭제할 수 있도록 한다.
```
const result = await octokit.rest.issues.listForRepo({
      owner: OWNER,
      repo: REPO,
      labels: 'bug', // 특정 레이블을 필터링함. 
    })

    const issuesWithBugLabel = result.data // 이슈보고 컨텐츠를 파악해야됨. 마크다운으로 표시된 이슈 내용을 접근함.
    // bug 레이블은 있는데 스크린샷은 없음 => needs-screenshot을 추가시킴
    const issuesWithoutScreenshot = issuesWithBugLabel.filter(
      (issue) =>
        (!issue.body || !isAnyScreenshotInMarkdownDocument(issue.body)) && //issue.body null이면 안되니까.
        !hasLabel(issue.labels, LABEL_NEEDS_SCREENSHOT) // 중복 제거를 위한 메서드
    )

    await Promise.all(
      issuesWithoutScreenshot.map(async (issue) => {
        const shouldContinue = await prompts({
          type: 'confirm',
          name: 'shouldContinue',
          message: chalk.magentaBright(	// label을 추가할 것인지 확인하는 메시지
            `Add ${LABEL_NEEDS_SCREENSHOT} to issue #${issue.number} | ${issue.title}?`
          ),
        })

        shouldContinue.shouldContinue = true //shouldContinue만 쓰면 object로 반환하므로 y/n에 상관없이 항상 true로 반환됨
          ? (await octokit.rest.issues.addLabels({
              owner: OWNER,	// 다음과 같은 규칙으로 작성해야 한다.
              repo: REPO,
              issue_number: issue.number,
              labels: [LABEL_NEEDS_SCREENSHOT],
            }),
            console.log(chalk.green(`Added!`)))
          : console.log(chalk.grey(`Cancelled!`))
      })
    )

    // 2. bug 레이블이 있고, needs-screenshot과 스크린샷이 있음 => need-screenshot label 제거
    const issuesResolved = issuesWithBugLabel.filter(
      (issue) =>
        issue.body &&
        isAnyScreenshotInMarkdownDocument(issue.body) &&
        hasLabel(issue.labels, LABEL_NEEDS_SCREENSHOT)
    )

    await Promise.all(
      issuesResolved.map(async (issue) => {
        const shouldConfirm = await prompts({ // label을 제거할 것인지 확인하는 메시지
          type: 'confirm',
          name: 'shouldConfirm',
          message: chalk.magentaBright(
            `Remove ${LABEL_NEEDS_SCREENSHOT} from issue #${issue.number} | ${issue.title}?`
          ),
        })

        shouldConfirm.shouldConfirm = true // shouldConfirm.shouldConfirm 이 부분 매우 중요
          ? (await octokit.rest.issues.removeLabel({  // 다음과 같은 규칙으로 작성해야 한다.
              owner: OWNER,
              repo: REPO,
              issue_number: issue.number,
              name: LABEL_NEEDS_SCREENSHOT,
            }),
            console.log(chalk.green(`Removed!`)))
          : console.log(chalk.bgGrey(`Cancelled!`))
      })
    )
```
## 3. 구현 결과

#### 3.1 개요 및 예외처리 결과 출력
![image1](https://blog.kakaocdn.net/dn/bbFl9w/btrJlhqVjCk/hQ0zlc7la7MFTqllx6QQM1/img.png)
#### 3.2 각종 Label 추가
![image2](https://blog.kakaocdn.net/dn/b26rDw/btrJjLMzAnc/xgRYN6PamX7OUOdXtNOOeK/img.png)
## 4. 이슈

  #### 본 Gihub CLI Project를 통해 다음과 같은 사실을 알 수 있었다. 

- sth.sth으로 접근하지 않아도 T/F 결과를 반환할 수 있으므로 bool값을 리턴하는 변수에 접근하는 것은 명확해야 한다. 한 번에 정확하게 접근하지 못한다면, 다른 방법으로 시도해보면서 케이스 체크를 다양하게 해봐야 할 것이다.
- 한 번에 나은 결과를 만들 수 없으므로 chalk나 예외처리 등을 추가함으로써 좀 더 세세한 스크립트 작성 후 괜찮은 서비스로 만들어봐야 할 것 같다. 
- Github에 접근하는 방법이 생각보다 쉽지만 보안상 취약해지는 것을 고려한다면 토큰 발급 없이 웹으로 접근하는게 마음은 편할 것 같다.

**Reference**
- [jeonghojeong_github](https://github.com/JeongHoJeong/fastcampus-2021-examples/tree/main/packages/cli)

