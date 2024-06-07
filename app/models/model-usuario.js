const pool = require("../../config/pool-conexoes"); //requisição do pool



// AWAIT: Permite que o código seja escrito de forma mais síncrona, como se a tarefa assíncrona fosse executada imediatamente. 
//        O await é usado para esperar que a Promise seja resolvida antes de continuar a execução do código

// [linhas, campos]: respectivamente - resultados da consulta, campos da tabela​

// ?: Cada ponto de interrogação usado indica um local que receberá um valor dinâmico



const usuarioModel = { //const que agrupa todas as funções de acesso e manipulação de dados
    findAll: async()=>{
        try {
            const [linhas] = await pool.query('SELECT * FROM clientes')
            return linhas
        } catch(erro){
            console.log(erro)
        }   
    },
    findUserEmail: async (camposForm) => {
        try {
            const [resultados] = await pool.query(
                "SELECT * FROM clientes WHERE Nickname = ? or E-mail = ?",
                [camposForm.user_usuario, camposForm.user_usuario]
            )
            return resultados;
        } catch (error) {
            console.log(error);
            return error;
        }
    },
    create: async (camposForm) => {
        try {
            const [resultados] = await pool.query(
                "insert into clientes set ?", [camposForm]
            )
            return resultados;
        } catch (error) {
            console.log(error);
            return null;
        }
    },  
}

// Login: select 
// cadastro: select, insert
// posts: select
// criar post: update
// excluir post: select, delete

module.exports = usuarioModel //A exportação deste objeto na forma de um módulo.
