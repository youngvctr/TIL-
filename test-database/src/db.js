const mysql = require('mysql')
require('dotenv').config()

const connection = mysql.createConnection({
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
  port: process.env.port,
})

connection.connect(
    async function (err) { 
        if (err) { 
            //console.log("!!! Cannot connect !!! Error:");
            throw err;

        } else {
            //console.log("Connection established.");
        }
    });


module.exports = connection