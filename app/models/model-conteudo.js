const pool = require("../../config/pool-conexoes");

const conteudoModel = {
    TotalRegPorTitulo: async (termoPesquisa, filtroTipo = 'todas', filtroCategoria = null) => {
        try {
            const tipoCondicao = filtroTipo !== 'todas' ? `AND tipo = ?` : '';
            const categoriaCondicao = filtroCategoria ? `AND Categorias_idCategorias = ?` : '';

            const query = `
            SELECT COUNT(*) as total FROM (
                SELECT ID_conteudo AS id, 'dica' as tipo, Titulo, Categorias_idCategorias FROM conteudo_postagem
                UNION ALL
                SELECT ID_Pergunta AS id, 'pergunta' as tipo, titulo AS Titulo, categorias_idCategorias AS Categorias_idCategorias FROM perguntas
            ) AS combined
            WHERE Titulo LIKE ? 
            ${tipoCondicao}
            ${categoriaCondicao}`;

            const params = [`%${termoPesquisa}%`];
            if (filtroTipo !== 'todas') params.push(filtroTipo);
            if (filtroCategoria) params.push(filtroCategoria);

            const [result] = await pool.query(query, params);
            return result;
        } catch (erro) {
            throw erro;
        }
    },
    PesquisarPorTitulo: async (termoPesquisa, filtroTipo, filtroCategoria, inicio, total, filtroClassificacao = 'em-alta') => {
        try {
            const tipoCondicao = filtroTipo !== null && filtroTipo !== 'todas' ? `AND tipo = ?` : '';
            const categoriaCondicao = filtroCategoria ? `AND Categorias_idCategorias = ?` : '';
    
            console.log("Termo Pesquisado: " + termoPesquisa);
            console.log("Tipo de Postagem: " + filtroTipo);
            console.log("Categoria: " + filtroCategoria);
            console.log("Inicio: " + inicio);
            console.log("Total: " + total);
            console.log("Classificação: " + filtroClassificacao);
    
            let query = `
            SELECT combined.*, COALESCE(media.media, 0) AS media_avaliacao
            FROM (
                SELECT 
                    c.ID_conteudo AS id, 
                    c.Titulo, 
                    'dica' AS tipo, 
                    cl.Nickname AS nome_usuario, 
                    c.tempo, 
                    c.Clientes_idClientes, 
                    c.Categorias_idCategorias, 
                    c.Descricao, 
                    c.Etapas_Modo_de_Preparo, 
                    c.porcoes, 
                    c.subcategorias
                FROM conteudo_postagem AS c
                JOIN clientes AS cl ON c.Clientes_idClientes = cl.idClientes
                UNION ALL
                SELECT 
                    p.ID_Pergunta AS id, 
                    p.titulo AS Titulo, 
                    'pergunta' AS tipo, 
                    cl.Nickname AS nome_usuario, 
                    NULL AS tempo, 
                    p.Clientes_idClientes, 
                    p.categorias_idCategorias AS Categorias_idCategorias, 
                    NULL AS Descricao, 
                    NULL AS Etapas_Modo_de_Preparo, 
                    NULL AS porcoes, 
                    NULL AS subcategorias
                FROM perguntas AS p
                JOIN clientes AS cl ON p.Clientes_idClientes = cl.idClientes
            ) AS combined
            LEFT JOIN (
                SELECT conteudo_postagem_ID_conteudo, AVG(Nota) AS media
                FROM avaliacao
                GROUP BY conteudo_postagem_ID_conteudo
            ) AS media ON combined.id = media.conteudo_postagem_ID_conteudo
            WHERE Titulo LIKE ? 
            ${tipoCondicao}
            ${categoriaCondicao}`;
    
            switch (filtroClassificacao) {
                case 'mais-rapidas':
                    query += ` ORDER BY tempo ASC`;
                    break;
                case 'em-alta':
                    query += ` ORDER BY media_avaliacao DESC`; // Ordena pela média de avaliação
                    break;
                case 'recentes':
                default:
                    query += ` ORDER BY id DESC`;
            }
    
            query += ` LIMIT ?, ?`;
    
            const params = [`%${termoPesquisa}%`];
            if (filtroTipo !== null && filtroTipo !== 'todas') params.push(filtroTipo);
            if (filtroCategoria) params.push(filtroCategoria);
            params.push(inicio, total);
    
            const resposta = await pool.query(query, params);
            const [linhas] = resposta;
            return linhas;
        } catch (erro) {
            throw erro;
        }
    },
    TotalReg: async (categoria, ordem) => {
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

            switch (ordem) {
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
    FindPage: async (categoria, ordem, inicio, total) => {
        try {
            let query = `
            SELECT combined.*, COALESCE(media.media, 0) AS media_avaliacao
            FROM (
                SELECT c.ID_conteudo AS id, c.Clientes_idClientes, c.Categorias_idCategorias, c.Titulo, c.tempo, c.Descricao, c.Etapas_Modo_de_Preparo, c.porcoes, 'dica' AS tipo, cl.Nickname AS nome_usuario, c.subcategorias, c.idMidia
                FROM conteudo_postagem AS c
                JOIN clientes AS cl ON c.Clientes_idClientes = cl.idClientes
                UNION ALL
                SELECT p.ID_Pergunta AS id, p.Clientes_idClientes, p.categorias_idCategorias, p.titulo AS Titulo, NULL AS tempo, NULL AS Descricao, NULL AS Etapas_Modo_de_Preparo, NULL AS porcoes, 'pergunta' AS tipo, cl.Nickname AS nome_usuario, NULL AS subcategorias, NULL AS idMidia
                FROM perguntas AS p
                JOIN clientes AS cl ON p.Clientes_idClientes = cl.idClientes
            ) AS combined
            LEFT JOIN (
                SELECT conteudo_postagem_ID_conteudo, AVG(Nota) AS media
                FROM avaliacao
                GROUP BY conteudo_postagem_ID_conteudo
            ) AS media ON combined.id = media.conteudo_postagem_ID_conteudo
            `;
    
            if (categoria) {
                query += ` WHERE combined.Categorias_idCategorias = ${pool.escape(categoria)}`;
            }
    
            switch (ordem) {
                case 'rapidos':
                    query += ` ${categoria ? 'AND' : 'WHERE'} tipo = 'dica' ORDER BY tempo ASC`;
                    break;
                case 'em-alta':
                    query += ` ORDER BY media_avaliacao DESC`; // Ordena pela média de avaliação
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
    Avaliacao: async ({ clientes_id, nota, conteudo_id, categorias_id }) => {
        try {
            const query = `
                INSERT INTO avaliacao 
                (Nota, Clientes_idClientes, conteudo_postagem_ID_conteudo, conteudo_postagem_Categorias_idCategorias, conteudo_postagem_Clientes_idClientes)
                VALUES (?, ?, ?, ?, ?)
            `;
            const valores = [nota, clientes_id, conteudo_id, categorias_id, clientes_id];
            await pool.query(query, valores);
        } catch (erro) {
            throw erro;
        }
    },
    VerificarAvaliacaoExistente: async (clientes_id, conteudo_id) => {
        try {
            const query = `
                SELECT * FROM avaliacao 
                WHERE Clientes_idClientes = ? AND conteudo_postagem_ID_conteudo = ?`;
            const [rows] = await pool.query(query, [clientes_id, conteudo_id]);
            return rows.length > 0;
        } catch (erro) {
            throw erro;
        }
    },
    CalcularMediaAvaliacoes: async (conteudoId) => {
        const query = `
            SELECT AVG(Nota) as media
            FROM avaliacao
            WHERE conteudo_postagem_ID_conteudo = ?`;

        const [resultado] = await pool.query(query, [conteudoId]);
        return resultado[0]?.media || 0;
    },

    CriarPostagem: async (camposCriar) => {
        try {
            const [resultados] = await pool.query("insert into conteudo_postagem set ?", [camposCriar])
            return resultados;
        } catch (erro) {
            throw erro;
        }
    },
    CriarIngrediente: async (ingrediente) => {
        try {
            const query = `
                INSERT INTO ingredientes 
                (quantidade_ingredientes, ingredientes, medida_ingredientes, conteúdo_postagem_ID_conteúdo, conteúdo_postagem_Clientes_idClientes, conteúdo_postagem_Categorias_idCategorias) 
                VALUES (?, ?, ?, ?, ?, ?)
            `;
            const [result] = await pool.query(query, [
                ingrediente.quantidade_ingredientes,
                ingrediente.ingredientes,
                ingrediente.medida_ingredientes,
                ingrediente.conteúdo_postagem_ID_conteúdo,
                ingrediente.conteúdo_postagem_Clientes_idClientes,
                ingrediente.conteúdo_postagem_Categorias_idCategorias
            ]);
            return result;
        } catch (err) {
            console.error('Erro ao executar query:', err); // Adicionando um log de erro
            throw err;
        }
    },
    BuscarIngredientesPorPostagemId: async (postagemId) => {
        try {
            const query = `
                SELECT quantidade_ingredientes, ingredientes, medida_ingredientes
                FROM ingredientes
                WHERE conteúdo_postagem_ID_conteúdo = ?`;
            const [resultados] = await pool.query(query, [postagemId]);
            return resultados;
        } catch (erro) {
            throw erro;
        }
    },
    CriarPergunta: async (camposCriar) => {
        try {
            const [resultados] = await pool.query("insert into perguntas set ?", [camposCriar])
            return resultados;
        } catch (erro) {
            throw erro;
        }
    },
    BuscarPostagemPorId: async (id) => {
        try {
            const query = `
            SELECT c.ID_conteudo AS id, 
                   c.Clientes_idClientes, 
                   c.Categorias_idCategorias, 
                   c.Titulo, 
                   c.tempo, 
                   c.Descricao, 
                   c.Etapas_Modo_de_Preparo, 
                   c.porcoes, 
                   c.subcategorias,  -- Incluindo a coluna subcategorias
                   'dica' AS tipo, 
                   cl.Nickname AS nome_usuario
            FROM conteudo_postagem AS c
            JOIN clientes AS cl ON c.Clientes_idClientes = cl.idClientes
            WHERE c.ID_conteudo = ?
            
            UNION ALL
            
            SELECT p.ID_Pergunta AS id, 
                   p.Clientes_idClientes, 
                   p.categorias_idCategorias, 
                   p.titulo AS Titulo, 
                   NULL AS tempo, 
                   NULL AS Descricao, 
                   NULL AS Etapas_Modo_de_Preparo, 
                   NULL AS porcoes, 
                   NULL AS subcategorias,  -- Adicionando NULL para subcategorias na tabela de perguntas
                   'pergunta' AS tipo, 
                   cl.Nickname AS nome_usuario
            FROM perguntas AS p
            JOIN clientes AS cl ON p.Clientes_idClientes = cl.idClientes
            WHERE p.ID_Pergunta = ?`;

            const [resultados] = await pool.query(query, [id, id]);
            return resultados[0];
        } catch (erro) {
            throw erro;
        }
    }
}



module.exports = conteudoModel