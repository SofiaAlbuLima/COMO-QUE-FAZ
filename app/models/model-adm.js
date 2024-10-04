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
    },

    //------------------------------------------------------- USUARIO

    mostrarUsuarios: async () => {
        try {
            let query = `
            select * from clientes;`

            const [result] = await pool.query(query);
            return result;

        } catch (erro) {
            throw erro;
        }
    },

    //------------------------------------------------------- POSTAGENS

    mostrarPostagens: async () => {
        try {
            let query = `
            SELECT combined.*
FROM (
    SELECT 
        c.ID_conteudo AS id, 
        'conteudo_postagem' AS origem,  -- Identificador de origem
        c.Clientes_idClientes as clientes, 
        c.Categorias_idCategorias AS categoria, 
        c.Titulo, 
        c.tempo, 
        c.Descricao, 
        c.Etapas_Modo_de_Preparo, 
        c.porcoes, 
        cl.Nickname AS nome_usuario, 
        c.subcategorias, 
        c.idMidia,
        cl.Nickname
    FROM conteudo_postagem AS c
    JOIN clientes AS cl 
    ON c.Clientes_idClientes = cl.idClientes
    
    UNION ALL
    
    SELECT 
        p.ID_Pergunta AS id, 
        'pergunta' AS origem,  -- Identificador de origem
        p.Clientes_idClientes as clientes, 
        p.categorias_idCategorias AS categoria, 
        p.titulo AS Titulo, 
        NULL AS tempo, 
        NULL AS Descricao, 
        NULL AS Etapas_Modo_de_Preparo, 
        NULL AS porcoes, 
        cl.Nickname AS nome_usuario, 
        NULL AS subcategorias, 
        NULL AS idMidia,
        cl.Nickname
    FROM perguntas AS p
    JOIN clientes AS cl 
    ON p.Clientes_idClientes = cl.idClientes
) AS combined
LEFT JOIN (
    SELECT 
        conteudo_postagem_ID_conteudo, 
        AVG(Nota) AS media
    FROM avaliacao
    GROUP BY conteudo_postagem_ID_conteudo
) AS media 
ON combined.id = media.conteudo_postagem_ID_conteudo;

            `;

            const [result] = await pool.query(query);
            return result;

        } catch (erro) {
            throw erro;
        }
    },

    PegarNomeCliente: async (autorDica) => {
        try {
            let query = `
            SELECT Nickname FROM clientes WHERE idClientes = ?;`;
            
            const [result] = await pool.query(query, [autorDica]);
            
            if (result.length > 0) {
                return result;  // Deve retornar o resultado contendo o Nickname
            } else {
                // console.log(erro);
                return null;  // Deve retornar o resultado contendo o Nickname
            }
    
        } catch (erro) {
            throw erro;
        }
    }
    
}

module.exports = admModel