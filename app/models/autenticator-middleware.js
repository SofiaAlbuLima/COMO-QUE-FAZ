const { validationResult } = require("express-validator");
const usuario = require("./model-usuario.js");
const bcrypt = require("bcryptjs");

VerificarAutenticacao = (req, res, next) => { //verificar se o usuário está autenticado na sessão
    if(req.session.autenticado){
        var autenticado = autenticado;
        req.session.logado = req.session.logado + 1;
    }else{
        var autenticado = { autenticado: null, tipo: null, id: null };
        req.session.logado = 0;
    }
    next();
}

limparSessao = (req, res, next) => {
    req.session.destroy();
    next()
}

gravarUsuAutenticado = async (req, res, next) => { //verifica se o usuário existe e compara a senha fornecida
    try {
        erros = validationResult(req);
        var autenticado = { autenticado: null, tipo: null, id: null };
        let results = [];
        if (erros.isEmpty()) {
            var dadosForm = {
                input1: req.body.input1,
                senha: req.body.input2
            };
            results = await usuario.findUserEmail({ Nickname: dadosForm.input1, Email: dadosForm.input1 }); // Utilize a função findUserEmail para buscar tanto por Nickname quanto por Email
            var total = results.length; //retoma o numero de elemento do array (criado pelo Object.keys) results 
            if (total === 1) { //verifica se há apenas um resultado
                if (bcrypt.compareSync(dadosForm.senha, results[0].senha)) { //comparação da senha fornecida com a senha armazenada
                    autenticado = {
                        autenticado: results[0].Nickname, 
                        tipo: results[0].Tipo_Cliente_idTipo_Cliente,
                        id: results[0].idClientes
                    };
                    console.log("login feito");
                }
            } else {
                autenticado =  { autenticado: null, tipo: null, id: null };
                console.log("Nenhum usuário encontrado ou múltiplos usuários encontrados");
            }
        } else {
            autenticado =  { autenticado: null, tipo: null, id: null };
            console.log("erros:" + erros);
        }
        console.log("autenticado: " + autenticado + ", total: " + total + " e resultados: " + results);
        req.session.autenticado = autenticado;
        req.session.logado= 0;
        next();
    } catch (error) {
        console.error("Erro ao autenticar usuário:", error);
        next(error);
    }
}

verificarUsuAutorizado = (tipoPermitido, destinoFalha) => { //responsável por verificar se o usuário está autorizado a acessar um determinado recurso ou rota
    return (req, res, next) => {
        if (req.session.autenticado.autenticado != null &&
            tipoPermitido.find(function (element) { return element == req.session.autenticado.tipo }) != undefined) {
            next();
        } else {
            res.redirect(destinoFalha);
        }
    };
};

module.exports = { //enviado para o router
    VerificarAutenticacao,
    limparSessao,
    gravarUsuAutenticado,
    verificarUsuAutorizado
};