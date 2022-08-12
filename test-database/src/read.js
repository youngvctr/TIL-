const connection = require('./db')

async function readData(table) {
    await connection.query(`SELECT id, name, quantity FROM ${table};`,
    ((err, results, fields)=>{
        if (err) {
            throw err
        };
        var data = []
        //console.log(results.length)
        for (let i=0; i<results.length; i++){
            data.push(results[i])
            //console.log('Selected ' + results.id[i] + name[i] + quantity[i] + ' row(s).');
            //console.log(data[0])
        }

        const filtData = Object.values(JSON.parse(JSON.stringify(data)))
        filtData.forEach((v) => {
            const {id, name, quantity} = v
            JSON.stringify({
            id: id,
            name: name,
            quantity: quantity,
        })
            quantity <= 0 ? 
            console.log(`    ${id}) ${name} [sold out]💤 `) :
            console.log(`    ${id}) ${name}, ${quantity}개`)
        })
    }))
}

module.exports.readData = readData