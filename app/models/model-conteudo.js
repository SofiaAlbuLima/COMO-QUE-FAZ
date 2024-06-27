const pool = require("../../config/pool-conexoes");

const conteudoModel = { //const que agrupa todas as funções de acesso e manipulação de dados

    TotalReg: async(tipo)=>{ //contagem do total de registros da tabela tarefas, para definir o número de páginas necessárias para a paginação
        try {
            let query;
            if (tipo === "dica") {
                query = "SELECT count(*) as total FROM conteudo_postagem";
            } else if (tipo === "pergunta") {
                query = "SELECT count(*) as total FROM perguntas";
            } else {
                throw new Error("Tipo inválido");
            }
            const [linhas] = await pool.query(query);
            return linhas;
        } catch (erro) {
            throw erro;
        }
    },

    FindPage: async(tipo, pagina, total)=>{ //executar o select com a cláusula LIMIT
        try {
            let query;
            let params = [pagina, total];
            if (tipo === "dica") {
                query = "SELECT * FROM conteudo_postagem LIMIT ?, ?";
            } else if (tipo === "pergunta") {
                query = "SELECT * FROM perguntas LIMIT ?, ?";
            } else {
                throw new Error("Tipo inválido");
            }
            const [linhas] = await pool.query(query, [pagina, total]);
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