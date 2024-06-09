// Responsável por receber as entradas do usuário, interpretá-las e acionar ações adequadas no modelo e na visualização

const usuarioModel = require("../models/model-usuario"); //Requisição do arquivo Model para executar ações no Banco de Dados
const moment = require("moment"); //datas e horas bonitinhas
const {body, validationResult} = require("express-validator");


const tarefasController = {


    regrasValidacaoLogin:[
        body('input1').isEmail().
            withMessage("Insira um email válido!"),
        body('input2').isLength({ min: 8 , max: 60 }).
            withMessage("A senha deve ter no minimo 8 caracteres")
    ],
    regrasValidacaoCadastro:[
        //gab aqui q vc cria as regras :)
       
    ],
    Login_formLogin: async (req, res) => {
        res.locals.moment = moment;
        try {
            const erros = validationResult(req);
            if (!erros.isEmpty()) {
                return res.render("pages/template", {
                    pagina: {cabecalho: "cabecalho", conteudo: "Fazer-Login", rodape: "rodape"}, 
                    logado:null, 
                    listaErros: erros});
            }
            // if (req.session.autenticado != null) {
            //     res.redirect("/");
            // }
            else {
                res.render("pages/template", {
                    pagina: {cabecalho: "cabecalho", conteudo: "Fazer-Login", rodape: "rodape"}, 
                    logado:null, 
                    listaErros: erros});
            }
        } catch (e) {
            console.log(e); 
        }
    },
    Login_formCadastro: async (req, res) => {
        const erros = validationResult(req);
        console.log(erros);
        var dadosForm = {
            Nickname: req.body.nomeusu_usu,
            senha: req.body.senha_usu, //bcrypt.hashSync(req.body.senha_usu, salt),
            'E-mail': req.body.email_usu,
            Nome: "blala1",
            Perfil: "blala2",
            'Data de Nascimento': "1995-10-02",
            Tipo_Cliente_idTipo_Cliente: 1
        };
        if (!erros.isEmpty()) {
            console.log(erros);
            return res.render("pages/template", {
                pagina: {cabecalho: "cabecalho", conteudo: "Fazer-Login", rodape: "rodape"}, 
                logado:null, 
                listaErros: erros});
        }
        try {
            let create = usuarioModel.create(dadosForm);
            res.redirect("/")
        } catch (e) {
            console.log(e);
            res.render("pages/template", {
                pagina: {cabecalho: "cabecalho", conteudo: "Fazer-Login", rodape: "rodape"}, 
                logado:null, 
                listaErros: erros});
        }
    },

    Index_mostrarPosts: async (req, res) => {
        res.locals.moment = moment;
        try {
            res.render("pages/template", {pagina: {cabecalho: "cabecalho", conteudo: "index", rodape: "rodape"}, logado:null});
        } catch (e) {
            console.log(e); 
        }
    }
    

};


module.exports = tarefasController;