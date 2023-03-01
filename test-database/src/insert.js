const connection = require('./db')
const { readLineUpdater } = require('./readline')

async function insertData(key, name, quantity) {
    var arr = [readLineUpdater[0], readLineUpdater[1], readLineUpdater[2]]
    key = arr[0]
    name = arr[1]
    quantity = arr[2]
    await connection.query(`INSERT INTO inventory(id, name, quantity) VALUE('${key}', '${name}', '${quantity}');`,
        ((err, results, fields) => {
            if (err) {
                throw err
            };
            console.log('Inserted ' + results.affectedRows + ' row(s).');
        }))
}

module.exports.insertData = insertData