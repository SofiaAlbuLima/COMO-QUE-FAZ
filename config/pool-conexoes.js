const mysql = require('mysql2')
const pool = mysql.createPool({
    host: process.env.BD_HOST,
    user: process.env.BD_USER,
    password: process.env.BD_PASSWORD,
    database: process.env.BD_DATABASE,
    port: process.env.BD_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

pool.getConnection((err, conn) => { 
    // Se ocorrer um erro ao obter a conexão, ele será tratado e registrado
    if(err){
        console.log(err)
        console.log("uhulll erro :O")
    }
    else{
        console.log("Conectado ao SGBD!")
    }
})

module.exports = pool.promise()
// conexão obtida é exportada como uma promessa
// Agora pode-se usar a promessa para executar consultas SQL e receber os resultados como promessas assíncronas