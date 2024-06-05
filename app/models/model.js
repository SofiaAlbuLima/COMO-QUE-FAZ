const pool = require("../../config/pool-conexoes"); //requisição do pool



// AWAIT: Permite que o código seja escrito de forma mais síncrona, como se a tarefa assíncrona fosse executada imediatamente. 
//        O await é usado para esperar que a Promise seja resolvida antes de continuar a execução do código

// [linhas, campos]: respectivamente - resultados da consulta, campos da tabela​

// ?: Cada ponto de interrogação usado indica um local que receberá um valor dinâmico



const clienteModel = { //const que agrupa todas as funções de acesso e manipulação de dados
    findAll: async()=>{
        try {
            const [linhas, campos] = await pool.query('SELECT * FROM clientes')
            return linhas
        } catch(erro){
            console.log(erro)
        }   
    }
}

// Login: select 
// cadastro: select, insert
// posts: select
// criar post: update
// excluir post: select, delete

module.exports = clienteModel //A exportação deste objeto na forma de um módulo.
