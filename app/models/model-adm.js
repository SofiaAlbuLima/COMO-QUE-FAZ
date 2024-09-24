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
                INSERT INTO denuncia (motivo, detalhamento_denuncia, usuario_denunciado, Categorias_idCategorias)
                VALUES (?, ?, ?, ?)
            `;

            const [resultado] = await pool.query(query, [
                dadosForm.motivo,
                dadosForm.detalhamento_denuncia,
                dadosForm.usuario_denunciado,
                dadosForm.categoria
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

            if (resultados.length > 0) {
                return resultados[0];
            } else {
                return null;
            }

        } catch (erro) {
            throw erro;
        }
    },

    // tirar isso, pq já coloquei no controller, pelo re.session.auteticado.id ------ colocar o id da postagem na tabela denuncia, pq se nn vai ocorrer a repetição de informações (ex: nome de quem criou a denuncia)
    // AutorDenuncia: async () => {
    //     try {
    //         query = `
    //         SELECT c.Nickname AS criador_denuncia
    //         FROM denuncia d
    //         JOIN clientes c ON d.Clientes_idClientes = c.idClientes
    //         WHERE d.ID_denuncia = ?;
    //         `
    //         const [resultado] = await pool.query(query);
    //         return resultado;

    //     } catch (erro) {
    //         throw erro;
    //     }
    // },


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
    },

    //------------------------------------------------------- USUARIO

    mostrarUsuarios: async () => {
        try{
            let query = `
            select * from clientes;`

            const [result] = await pool.query(query);
            return result;

        } catch (erro) {
            throw erro;
        }
    },

    //------------------------------------------------------- USUARIO

    mostrarPostagensPerguntas: async () => {
        try {
            let query = `
            select * from conteudo_postagem`

            const [result] = await pool.query(query);
            return result;

        } catch (erro) {
            throw erro;
        }
    }
}

module.exports = admModel