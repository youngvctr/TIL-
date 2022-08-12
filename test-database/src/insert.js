const connection = require('./db')

async function insertData(key, name, quantity){
    await connection.query(`INSERT INTO inventory(id, name, quantity) VALUE('${key}', '${name}', '${quantity}');`,
    ((err, results, fields)=>{
        if (err) {
            throw err
        };
        console.log('Inserted ' + results.affectedRows + ' row(s).');
    })) 
}

module.exports.insertData = insertData