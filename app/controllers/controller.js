2// Responsável por receber as entradas do usuário, interpretá-las e acionar ações adequadas no modelo e na visualização

const usuarioModel = require("../models/model-usuario"); //Requisição do arquivo Model para executar ações no Banco de Dados
const moment = require("moment"); //datas e horas bonitinhas
const {body, validationResult} = require("express-validator");


const tarefasController = {


    regrasValidacaoLogin:[
        // body('input1').isEmail().
        //     withMessage("Insira um email válido!"),
        body('input2').isLength({ min: 6 , max: 60 }).
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
            if (req.session.autenticado != null) { // verifica se o valor é diferente de null
                res.redirect("/");
            }
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
        
        var dadosForm = { //dados que o usuário digita no formulário
            Nickname: req.body.nomeusu_usu,
            senha: req.body.senha_usu, //bcrypt.hashSync(req.body.senha_usu, salt), -> hash comentado por enquanto que arruma o bd
            'E-mail': req.body.email_usu,
            Nome: "blala1", //dado estático por enquanto que arruma o bd
            Perfil: "blala2", //dado estático por enquanto que arruma o bd
            'Data de Nascimento': "1995-10-02", //dado estático por enquanto que arruma o bd
            Tipo_Cliente_idTipo_Cliente: 1
        };

        try {    
            let findUserEmail = await usuarioModel.findUserEmail(dadosForm);
            if(findUserEmail){
                console.log("Usuário já existe");
            }else{
                console.log("Usuário não existe");
                let create = usuarioModel.create(dadosForm);
                res.redirect("/")

                if (!erros.isEmpty()) {
                    console.log(erros);
                    return res.render("pages/template", {
                        pagina: {cabecalho: "cabecalho", conteudo: "Fazer-Login", rodape: "rodape"}, 
                        logado:null, 
                        listaErros: erros});
                }
                console.log("cadastro realizado!");
                }
        } catch (e) {
            console.log(e);
            res.render("pages/template", {
                pagina: {cabecalho: "cabecalho", conteudo: "Fazer-Login", rodape: "rodape"}, 
                logado:null, 
                listaErros: erros});
        }
        console.log("erro no cadastro!");
    },

    Index_mostrarPosts: async (req, res) => {
        res.locals.moment = moment;
        try {
            res.render("pages/template", {pagina: {cabecalho: "cabecalho", conteudo: "index", rodape: "rodape"}, usuario_logado:req.session.autenticado});
        } catch (e) {
            console.log(e); 
        }
    }
    

};


module.exports = tarefasController;