const { validationResult } = require("express-validator");
const usuario = require("./model-usuario.js");
const bcrypt = require("bcryptjs");

VerificarAutenticacao = (req, res, next) => { //verificar se o usuário está autenticado na sessão
    if(req.session.autenticado){
        var autenticado = req.session.autenticado;
    }else{
        var autenticado = { autenticado: null, tipo: null };
    }
    req.session.autenticado = autenticado;
    next();
}

limparSessao = (req, res, next) => {
    req.session.destroy();
    next()
}

gravarUsuAutenticado = async (req, res, next) => { //verifica se o usuário existe e compara a senha fornecida
    erros = validationResult(req)
    if (erros.isEmpty()) {
        var dadosForm = {
            Nickname: req.body.input1,
            senha: req.body.input2
        };
        var results = await usuario.findUserEmail(dadosForm);
        var total = Object.keys(results).length; //retoma o numero de elemento do array (criado pelo Object.keys) results 
        if (total == 1) { //verifica se há apenas um resultado
            if (bcrypt.compareSync(dadosForm.senha, results[0].senha)) { //comparação da senha fornecida com a senha armazenada
                var autenticado = {autenticado: results[0].Nickname, tipo: results[0].Tipo_Cliente_idTipo_Cliente};
                console.log("login feito");
            }
        } else {
            var autenticado =  { autenticado: null, tipo: null };
        }
    } else {
        var autenticado =  { autenticado: null, tipo: null };
        console.log("erros:" + erros);
    }
    console.log("autenticado: " + autenticado + ", total: " + total + " e resultados: " + results);
    req.session.autenticado = autenticado;
    next();
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
}

module.exports = { //enviado para o router
    VerificarAutenticacao,
    limparSessao,
    gravarUsuAutenticado,
    verificarUsuAutorizado
}