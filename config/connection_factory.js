var mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();

module.exports = function(){
    try{
        let conexao = mysql.createConnection({
            host: process.env.HOST,
            user: process.env.USER,
            password: process.env.PASSWORDITB,
            database: process.env.DATABASE,
            port: process.env.PORT
        });
        console.log("Conexão estabelecida!");
        return conexao;
    } catch (e){
        console.log("Falha ao estabelecer a conexão");
        console.log(e);
        return null
    }
}