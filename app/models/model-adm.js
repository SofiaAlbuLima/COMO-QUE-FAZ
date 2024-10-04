const pool = require("../../config/pool-conexoes");

const admModel = {

    mostrarDenuncias: async () => {
        try {
            const query = `SELECT * FROM denuncia`;
            const [resultado] = await pool.query(query);
            return resultado;

        } catch (erro) {
            throw erro;
        }
    },

    criarDenuncia: async (dadosForm) => {
        try {
            const query = `
                INSERT INTO denuncia (motivo, detalhamento_denuncia, conteudo_postagem_ID_conteudo, autor_denuncia)
                VALUES (?, ?, ?, ?)
            `;

            const [resultado] = await pool.query(query, [
                dadosForm.motivo,
                dadosForm.detalhamento_denuncia,
                dadosForm.conteudo_postagem_ID_conteudo,
                dadosForm.autor_denuncia
            ]);

            return resultado;
        } catch (erro) {
            throw erro;
        }
    },

    acharClienteCriadorDenuncia: async (id) => {
        try {
            const query = `
                SELECT clientes.Nickname
                FROM denuncia
                JOIN conteudo_postagem 
                ON denuncia.conteudo_postagem_ID_conteudo = conteudo_postagem.ID_conteudo
                JOIN clientes 
                ON conteudo_postagem.Clientes_idClientes = clientes.idClientes
                WHERE conteudo_postagem.ID_conteudo = ?;

            `;

            const [resultados] = await pool.query(query, [id]);

            if (resultados.length > 0) {
                return resultados[0];
            } else {
                return null;
            }

        } catch (erro) {
            throw erro;
        }
    },

    categoriaDenuncia: async (postagemId) => {
        try {
            let query = `
            SELECT Categorias_idCategorias
            FROM conteudo_postagem
            WHERE ID_conteudo = ?;
            `;

            const values = [postagemId];
            const [result] = await pool.query(query, values);
            return result;
        } catch (erro) {
            throw erro;
        }
    }

}

module.exports = admModel