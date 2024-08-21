const pool = require("../../config/pool-conexoes");

const conteudoModel = { //const que agrupa todas as funções de acesso e manipulação de dados

    TotalReg: async(categoria, ordem) => { 
        try {
            let query = `
            SELECT COUNT(*) as total FROM (
                SELECT ID_conteudo AS id, Categorias_idCategorias, 'dica' as tipo FROM conteudo_postagem
                UNION ALL
                SELECT ID_Pergunta AS id, categorias_idCategorias, 'pergunta' as tipo FROM perguntas
            ) AS combined 
            `;
            
            if (categoria) {
                query += ` WHERE Categorias_idCategorias = ${pool.escape(categoria)}`;
            }
            
            switch(ordem) {
                case 'rapidos':
                    query += ` ${categoria ? 'AND' : 'WHERE'} tipo = 'dica'`;
                    break;
            }
            const [total] = await pool.query(query);
            return total;
        } catch (erro) {
            throw erro;
        }
    },

    FindPage: async(categoria, ordem, inicio, total) => { 
        try {
            let query = `
                SELECT * FROM (
                    SELECT c.ID_conteudo AS id, c.Clientes_idClientes, c.Categorias_idCategorias, c.Titulo, c.tempo, c.Descricao, c.Etapas_Modo_de_Preparo, c.porcoes, 'dica' AS tipo, cl.Nickname AS nome_usuario
                    FROM conteudo_postagem AS c
                    JOIN clientes AS cl ON c.Clientes_idClientes = cl.idClientes
                    UNION ALL
                    SELECT p.ID_Pergunta AS id, p.Clientes_idClientes, p.categorias_idCategorias, p.titulo AS Titulo, NULL AS tempo, NULL AS Descricao, NULL AS Etapas_Modo_de_Preparo, NULL AS porcoes, 'pergunta' AS tipo, cl.Nickname AS nome_usuario
                    FROM perguntas AS p
                    JOIN clientes AS cl ON p.Clientes_idClientes = cl.idClientes
                ) AS combined
            `;
    
            if (categoria) {
                query += ` WHERE Categorias_idCategorias = ${pool.escape(categoria)}`;
            }
    
            switch(ordem) {
                case 'rapidos':
                    query += ` ${categoria ? 'AND' : 'WHERE'} tipo = 'dica' ORDER BY tempo ASC`;
                    break;
                case 'em_alta':
                    query += ` ORDER BY id DESC`;
                    break;
                case 'recente':
                default:
                    query += ` ORDER BY id DESC`;
            }
    
            query += ` LIMIT ?, ?`;
            const [linhas] = await pool.query(query, [inicio, total]);
            return linhas;
        } catch (erro) {
            throw erro;
        }
    },

    CriarPostagem: async(camposCriar)=>{
        try{
            const [resultados] = await pool.query( "insert into conteudo_postagem set ?", [camposCriar])
            return resultados;
        } catch(erro){
            throw erro; 
        }
    },
    criarIngrediente: (ingrediente) => {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO ingredientes (quantidade_ingredientes, ingredientes, medida_ingredientes, postagem_id) VALUES (?, ?, ?, ?)';
            pool.query(query, [ingrediente.quantidade_ingredientes, ingrediente.ingredientes, ingrediente.medida_ingredientes, ingrediente.postagem_id], (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    },

    CriarPergunta: async(camposCriar)=>{
        try{
            const [resultados] = await pool.query( "insert into perguntas set ?", [camposCriar])
            return resultados;
        } catch(erro){
            throw erro; 
        }
    }
}


module.exports = conteudoModel