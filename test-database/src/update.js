const connection = require('./db')
const { readData } = require('./read')

async function updateData(id, quantity, count){
    await connection.query('UPDATE inventory SET quantity = ? WHERE id = ?', [quantity, id], 
    ((err, results, fields) => {
        if (err) {
            throw err
        };
        //console.log('Updated ' + results.affectedRows + ' row(s).');
    }))

    count === 3 ? console.log('📣 Would you like to order more? y/N') : await readData('inventory')
        
}

module.exports.updateData = updateData