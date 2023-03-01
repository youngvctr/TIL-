const readLine = require('readline')
const connection = require('./db')
const { searchData } = require('./search.js')

function readLineInterface() {
    const rl = readLine.createInterface({
        input: process.stdin,
    })

    let count = 0
    rl.on("line", (line) => {
        if (count === 3) {
            const input = line.split(' ')
            if (input[0].indexOf('y') !== -1 || input[0].indexOf('Y') !== -1) {
                count = 0
            } else if (input[0].indexOf('n') !== -1 || input[0].indexOf('N') !== -1) {
                rl.close()
            } else {
                console.log('📣 Would you like to order more? y/N')
            }
            //rl.close()
        } else {
            input = line.split(' ').map(el => parseInt(el))
            count += 1
            searchData(input[0], input[1], count)
        }
    })

    rl.on('close', () => {
        connection.end(() => {
            console.log(`Thank you 👋`)
        })
    })
}

function readLineUpdater() {
    const rLine = readLine.createInterface({
        input: process.stdin,
    })

    rl.on("line", (line) => {
        input = line.split(' ').map(el => parseInt(el))
        return input
    })
}

module.exports = { readLineInterface, readLineUpdater } 