const { validationResult } = require("express-validator");
const usuario = require("./model-usuario.js");
const bcrypt = require("bcryptjs");

VerificarAutenticacao = (req, res, next) => { //verificar se o usuário está autenticado na sessão
    if (req.session.autenticado) {
        req.session.logado = (req.session.logado || 0) + 1; // Incrementa logins válidos
    } else {
        req.session.autenticado = { autenticado: null, tipo: null, id: null };
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
        const erros = validationResult(req);
        var autenticado = { autenticado: null, tipo: null, id: null };
        if (erros.isEmpty()) {
            const { input1, input2 } = req.body;
            const users = await usuario.findUserEmail({ Nickname: input1, Email: input1 });

            const fotoPerfil = users[0].foto_icon_perfil ? `data:image/png;base64,${users[0].foto_icon_perfil.toString('base64')}` : null;

            if (users.length === 1 && bcrypt.compareSync(input2, users[0].senha)) {
                autenticado = {
                    autenticado: users[0].Nickname,
                    tipo: users[0].Tipo_Cliente_idTipo_Cliente,
                    id: users[0].idClientes,
                    foto: fotoPerfil 
                };
                console.log("login feito");
            } else {
                console.log("Nenhum usuário encontrado ou múltiplos usuários encontrados");
            }
        } else {
            console.log("Erros de validação:", erros.array());
        }

        req.session.autenticado = autenticado;
        req.session.logado = 0;
        next();
    } catch (error) {
        console.error("Erro ao autenticar usuário:", error);
        next(error);
    }
}

verificarUsuAutorizado = (tiposPermitidos, destinoFalha) => { //responsável por verificar se o usuário está autorizado a acessar um determinado recurso ou rota
    return (req, res, next) => {
        const usuario = req.session.autenticado;
        if (usuario && usuario.autenticado && tiposPermitidos.includes(usuario.tipo)) {
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