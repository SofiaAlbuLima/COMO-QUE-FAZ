const pool = require("../../config/pool-conexoes");

const conteudoModel = { //const que agrupa todas as funções de acesso e manipulação de dados

    TotalReg: async()=>{ //contagem do total de registros da tabela tarefas, para definir o número de páginas necessárias para a paginação
        try {
            const [linhas] = await pool.query("SELECT count(*) as total FROM conteudo_postagem");
            return linhas;
        } catch(erro){
            throw erro; 
        }
    },

    FindPage: async(pagina, total)=>{ //executar o select com a cláusula LIMIT
        try {
            const [linhas] = await pool.query("SELECT * FROM conteudo_postagem LIMIT ?, ?", [pagina, total]);
            return linhas;
        } catch(erro){
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