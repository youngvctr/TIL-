// H - Timer 
async function timer(ms){
    let count = 0
    const stop = setInterval(()=> {
        console.log(`Time goes on ${count+=1} :)`)
    }, 1000)

    return new Promise((resolve) => {
            const timer = setTimeout(() => {
            resolve()
            clearTimeout(timer)
            clearInterval(stop)
            console.log(`Time goes on ${count+=1} :)`)
        }, ms)
    })
}

module.exports.timer = timer
















