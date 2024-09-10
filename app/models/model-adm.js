const pool = require("../../config/pool-conexoes");

const admModel = {


    acharDenuncia: async () => {
        try {
            const [linhas, campos] = await pool.query('SELECT d.*, p.Titulo as conteudo_postagem ' +
                'FROM denuncia d ' +
                'JOIN conteudo_postagem p ON d.conteudo_ID_conteudo = p.ID_conteudo;')
            console.log(linhas);
            console.log(campos);
            return linhas;
        } catch (error) {
            return error;
        }
    },

    acharConteudo: async (categoria) => {
        try {
            let query = `
                SELECT * FROM (
                    SELECT ID_conteudo AS id, Clientes_idClientes, Categorias_idCategorias, Titulo, tempo, Descricao, Etapas_Modo_de_Preparo, porcoes, 'dica' AS tipo FROM conteudo_postagem
                    UNION ALL
                    SELECT ID_Pergunta AS id, Clientes_idClientes, categorias_idCategorias, titulo AS Titulo, NULL AS tempo, NULL AS Descricao, NULL AS Etapas_Modo_de_Preparo, NULL AS porcoes, 'pergunta' AS tipo FROM perguntas
                ) AS combined
            `;

            if (categoria) {
                query += ` WHERE Categorias_idCategorias = ${pool.escape(categoria)}`;
            }

            const [total] = await pool.query(query);
            return total;

        } catch (erro) {
            throw erro;
        }
    },

    armazenarResposta: async (detalhamento, motivo) => {
        try {
            const query = `  
      INSERT INTO denuncia (detalhamento_denuncia, motivo)  
      VALUES (?, ?)  
     `;

            const [result] = await pool.query(query, [detalhamento, motivo]);
            return result;

        } catch (erro) {
            throw erro;
        }
    }

}

module.exports = admModel