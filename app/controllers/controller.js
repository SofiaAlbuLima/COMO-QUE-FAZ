2// Responsável por receber as entradas do usuário, interpretá-las e acionar ações adequadas no modelo e na visualização

const Model = require("../models/model-usuario"); //Requisição do arquivo Model para executar ações no Banco de Dados
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
        body("cadastros-place1")
            .isLength({ min: 8, max: 45 }).withMessage("Nome de usuário deve ter de 8 a 45 caracteres!")
            .custom(async value => {
                const nomeUsu = await usuario.findCampoCustom({'user_usuario':value});
                if (nomeUsu > 0) {
                  throw new Error('Nome de usuário em uso!');
                }
              }),  
       // body("cadastros-place2")
           // .isEmail().withMessage("Digite um e-mail válido!")
           // .custom(async value => {
             //   const nomeUsu = await usuario.findCampoCustom({'email_usuario':value});
              //  if (nomeUsu > 0) {
             //     throw new Error('E-mail em uso!');
             //   }
             // }), 
        body("cadastros-place3")
            .isStrongPassword()
            .withMessage("A senha deve ter no mínimo 8 caracteres (mínimo 1 letra maiúscula, 1 caractere especial e 1 número)")
       
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
            user_usuario: req.body.nomeusu_usu,
            senha_usuario: bcrypt.hashSync(req.body.senha_usu, salt),
            nome_usuario: req.body.nome_usu,
            email_usuario: req.body.email_usu,
        };
        if (!erros.isEmpty()) {
            console.log(erros);
            return res.render("pages/cadastro", { listaErros: erros, valores: req.body })
        }
        try {
            let create = usuario.create(dadosForm);
            res.redirect("/")
        } catch (e) {
            console.log(e);
            res.render("pages/cadastro", { listaErros: erros, valores: req.body })
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