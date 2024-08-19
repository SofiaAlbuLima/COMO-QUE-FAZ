const pool = require("../../config/pool-conexoes");

const denunciaModel = {

acharDenuncia: async () => {
    try {
        const [linhas, campos] = await pool.query('SELECT d.*, p.Titulo as conteudo_postagem '+ 
        'FROM denuncia d '+
        'JOIN conteudo_postagem p ON d.conteudo_ID_conteudo = p.ID_conteudo;')
        console.log(linhas);
        console.log(campos);
        return linhas;
    } catch (error) {
        return error;
    }
}

}

module.exports = denunciaModel