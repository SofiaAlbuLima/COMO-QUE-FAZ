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

        } catch (error) {
            return error;
        }
    },

    criarDenuncia: async (dadosForm) => {
        try {
            const query = `
                INSERT INTO denuncia (motivo, detalhamento_denuncia, usuario_denunciado)
                VALUES (?, ?, ?)
            `;

            const [resultado] = await pool.query(query, [
                dadosForm.motivo,
                dadosForm.detalhamento_denuncia,
                dadosForm.usuario_denunciado // Usa o nome do cliente como usuario_denunciado
            ]);

            return resultado;
        } catch (erro) {
            throw erro;
        }
    },


    acharClienteCriadorDenuncia: async (id) => {
        try {
            const query = `
                SELECT c.Nickname
                FROM clientes c
                JOIN conteudo_postagem cp ON cp.Clientes_idClientes = c.idClientes
                WHERE cp.ID_conteudo = ?;
            `;
            
            const [resultados] = await pool.query(query, [id]);
            
            // Verifique se há um resultado e se contém o 'Nickname'
            if (resultados.length > 0) {
                return resultados[0];
            } else {
                return null; // Retorna null se não encontrar o criador
            }
        } catch (erro) {
            throw erro;
        }
    }
    

}

module.exports = admModel