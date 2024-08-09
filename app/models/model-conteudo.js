const pool = require("../../config/pool-conexoes");

const conteudoModel = { //const que agrupa todas as funções de acesso e manipulação de dados

    TotalReg: async(categoria)=>{ //contagem do total de registros da tabela tarefas, para definir o número de páginas necessárias para a paginação
        try {
            let dicasCountQuery = "SELECT COUNT(*) as total FROM conteudo_postagem";
            let perguntasCountQuery = "SELECT COUNT(*) as total FROM perguntas";

            if (categoria === 'culinaria') {
                dicasCountQuery += " WHERE Categorias_idCategorias = 1";
                perguntasCountQuery += " WHERE categorias_idCategorias = 1";
            } else if (categoria === 'limpeza') {
                dicasCountQuery += " WHERE Categorias_idCategorias = 2";
                perguntasCountQuery += " WHERE categorias_idCategorias = 2";
            } else if (categoria === 'bemestar') {
                dicasCountQuery += " WHERE Categorias_idCategorias = 3";
                perguntasCountQuery += " WHERE categorias_idCategorias = 3";
            }   else {} 

            const [dicasCount] = await pool.query(dicasCountQuery);
            const [perguntasCount] = await pool.query(perguntasCountQuery);

            const total = dicasCount[0].total + perguntasCount[0].total;

            return [{ total }];
        } catch (erro) {
            throw erro;
        }
    },

    FindPage: async(categoria, filtro, inicio, total)=>{ //executar o select com a cláusula LIMIT
        try {
            let baseQuery = `
                SELECT * FROM (
                    SELECT ID_conteudo AS id, Clientes_idClientes, Categorias_idCategorias, Titulo, tempo, Descricao, Etapas_Modo_de_Preparo, porcoes, 'dica' AS tipo FROM conteudo_postagem
                    UNION ALL
                    SELECT ID_Pergunta AS id, Clientes_idClientes, categorias_idCategorias, titulo AS Titulo, NULL AS tempo, NULL AS Descricao, NULL AS Etapas_Modo_de_Preparo, NULL AS porcoes, 'pergunta' AS tipo FROM perguntas
                ) AS combined
            `;
            
            let whereConditions = [];

            if (categoria) {
                const categoriaMap = {
                    culinaria: 1,
                    limpeza: 2,
                    bemestar: 3
                };
                const categoriaId = categoriaMap[categoria.toLowerCase()];
    
                if (categoriaId) {
                    whereConditions.push(`Categorias_idCategorias = ${categoriaId}`);
                }
            }
    
            if (filtro) {
                switch (filtro.toLowerCase()) {
                    case 'emalta':
                        whereConditions.push(`EmAlta = 1`);
                        break;
                    case 'maisrapidas':
                        // Exemplo de filtro 'mais rápidas', só dicas
                        whereConditions.push(`tipo = 'dica'`);
                        whereConditions.push(`tempo IS NOT NULL`);
                        baseQuery += ` ORDER BY tempo ASC`;
                        break;
                    case 'maisrecentes':
                    default:
                        // Por padrão, ordenar por mais recentes
                        baseQuery += ` ORDER BY id DESC`;
                        break;
                }
            } else {
                // Se não há filtro, ordenar por mais recentes por padrão
                baseQuery += ` ORDER BY id DESC`;
            }
    
            // Concatena condições WHERE se existirem
            if (whereConditions.length > 0) {
                baseQuery += ` WHERE ` + whereConditions.join(' AND ');
            }
    
            // Adiciona a cláusula LIMIT
            baseQuery += ` LIMIT ?, ?`;
    
            // Executa a consulta
            const [linhas] = await pool.query(baseQuery, [inicio, total]);
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