const {timer} = require('hnhn-pkg')

async function main() {
    console.log('start')
    await timer(3000)
    console.log('finished')
}

main()
