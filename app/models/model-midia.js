const pool = require("../../config/pool-conexoes");

const imagemModel = {
    criarImagem: async(camposCriar) => {
        try {
            const [resultados] = await pool.query("INSERT INTO midia SET ?", [camposCriar]);
            return resultados;
        } catch (erro) {
            throw erro;
        }
    },

    obterImagem: async(id) => {
        try {
            const [linhas] = await pool.query("SELECT * FROM midia WHERE idMidia = ?", [id]);
            return linhas[0];
        } catch (erro) {
            throw erro;
        }
    }
}

module.exports = imagemModel