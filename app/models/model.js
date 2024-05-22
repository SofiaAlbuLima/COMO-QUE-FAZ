const pool = require("../../config/pool-conexoes");

const clienteModel = {
    findAll: async()=>{
        try {
            const [linhas,campos] = await pool.query('SELECT * FROM clientes')
            return linhas
        } catch(erro){
            console.log(erro)
        }
    }
}

module.exports = clienteModel
