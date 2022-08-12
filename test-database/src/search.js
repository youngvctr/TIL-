const connection = require('./db')
const { updateData } = require('./update')

async function searchData(id, oQuantity, count){
    let sub = 0
    await connection.query(`SELECT quantity FROM inventory where id='${id}';`,
    ((err, result, fields)=>{
        if (err){
            throw err
        }

        const filtData = Object.values(JSON.parse(JSON.stringify(result)))
        filtData.forEach((value)=>{
            const { quantity } = value
            JSON.stringify({
                quantity: quantity,
            })
            sub = quantity - oQuantity
            updateData(id, sub, count)
        })
    }))
}

module.exports.searchData = searchData