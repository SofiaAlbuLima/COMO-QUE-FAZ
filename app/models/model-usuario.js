const pool = require("../../config/pool-conexoes"); //requisição do pool



// AWAIT: Permite que o código seja escrito de forma mais síncrona, como se a tarefa assíncrona fosse executada imediatamente. 
//        O await é usado para esperar que a Promise seja resolvida antes de continuar a execução do código

// [linhas, campos]: respectivamente - resultados da consulta, campos da tabela​

// ?: Cada ponto de interrogação usado indica um local que receberá um valor dinâmico



const usuarioModel = { //const que agrupa todas as funções de acesso e manipulação de dados
    findAll: async () => {
        try {
            const [linhas] = await pool.query("SELECT * FROM clientes");
            return linhas;
        } catch (erro) {
            console.log(erro);
        }
    },
    findUserEmail: async ({ Nickname, Email }) => { //usado para verificar se o usuário já existe (valores unicos) 
        try {
            const query = `
                SELECT idClientes, Nickname, Email, senha, Tipo_Cliente_idTipo_Cliente, foto_icon_perfil 
                FROM clientes 
                WHERE Nickname = ? OR Email = ?
            `;
            const [resultados] = await pool.query(query, [Nickname, Email]);
            return resultados;
        } catch (error) {
            console.error("Erro ao buscar usuário por Nickname ou Email:", error);
            throw error;
        }
    },
    findUserByNickname: async (Nickname) => {
        try {
            const query = `
                SELECT idClientes, Nickname 
                FROM clientes 
                WHERE Nickname = ?
            `;
            const [resultados] = await pool.query(query, [Nickname]);
            return resultados[0]; // Retorna o primeiro resultado encontrado (se existir)
        } catch (error) {
            console.error("Erro ao buscar usuário por Nickname:", error);
            throw error;
        }
    },
    create: async (camposForm) => {
        try {
            const [resultados] = await pool.query(
                "INSERT INTO clientes SET ?", [camposForm]
            );
            return resultados;
        } catch (error) {
            console.log("Erro ao criar usuário:", error);
            return null;
        }
    },
    findUserById: async (idClientes) => {
        try {
            const [resultados] = await pool.query("SELECT * FROM clientes WHERE idClientes = ?", [idClientes]);
            return resultados[0]; // Retorna o usuário encontrado
        } catch (error) {
            console.error("Erro ao buscar usuário por ID:", error);
            throw error;
        }
    },
    findUserByEmail: async (email) => {
        try {
            const query = `
                SELECT idClientes, Nickname, Email, senha, Tipo_Cliente_idTipo_Cliente, foto_icon_perfil 
                FROM clientes 
                WHERE Email = ?
            `;
            const [resultados] = await pool.query(query, [email]);
            return resultados[0]; // Retorna o primeiro resultado encontrado
        } catch (error) {
            console.error("Erro ao buscar usuário por Email:", error);
            throw error;
        }
    },
}

module.exports = usuarioModel //A exportação deste objeto na forma de um módulo.
