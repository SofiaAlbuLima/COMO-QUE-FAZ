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
                    SELECT ID_conteudo AS id, Clientes_idClientes, Categorias_idCategorias, Titulo, tempo, Descricao, Etapas_Modo_de_Preparo, porcoes, 'dica' AS tipo FROM conteudo_postagem
                    UNION ALL
                    SELECT ID_Pergunta AS id, Clientes_idClientes, categorias_idCategorias, titulo AS Titulo, NULL AS tempo, NULL AS Descricao, NULL AS Etapas_Modo_de_Preparo, NULL AS porcoes, 'pergunta' AS tipo FROM perguntas
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