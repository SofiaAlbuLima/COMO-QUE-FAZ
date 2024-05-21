const mysql = require('mysql2');
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    // database: process.env.,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

pool.getConnection((err, conn) => {
    if(err){
        console.log(err)
    }
    else{
        console.log("Conecatado ao SGBD!")
    }
})

module.exports = pool.promise()