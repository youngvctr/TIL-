const { readLineInterface } = require('./readline')
const { readData } = require('./read')

async function main() {
    console.log(`

    [Market Open Only Today🤫]

    Hi, There 😄 🤙
    Today we have lots of items. 😌 :
    `
    )
    console.log(`
    Type what you want in the menu like number, quantity.
    
    For example,
    If you want chunkychalk's number, 10 then

    > 1 10
        
    and then push the Enter key.
    Let's get start to order. ;)
    
    What do you want?
        `)
    await readData('inventory')
    await readLineInterface();
    // await insertData(5, 'berrychunkychalk', 100);
    // await updateData(30, 'chunkychalk');
}

main()