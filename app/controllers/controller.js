2// Responsável por receber as entradas do usuário, interpretá-las e acionar ações adequadas no modelo e na visualização

const usuarioModel = require("../models/model-usuario"); //Requisição do arquivo Model para executar ações no Banco de Dados
const moment = require("moment"); //datas e horas bonitinhas
const {body, validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(12);


const tarefasController = {


    regrasValidacaoLogin:[
     body('input1')
        .custom(value => {
            // Verifica se é um email válido
            const isEmail = /^\S+@\S+\.\S+$/.test(value);
            // Verifica se é um nome de usuário válido (por exemplo, apenas caracteres alfanuméricos)
            const isUsername = /^[a-zA-Z0-9]+$/.test(value);

            if (!isEmail && !isUsername) {
                throw new Error('Insira um nome de usuário ou email válido!');
            }
            return true;
        }),

     body('input2').isLength({ min: 6 , max: 60 }).
            withMessage("A senha deve ter no minimo 6 caracteres")
    ],
    regrasValidacaoCadastro:[
        body("nomeusu_usu")
            .isLength({ min: 8, max: 45 }).withMessage("Nome de usuário deve ter de 8 a 45 caracteres!")
            .custom(async value => {
                const nomeUsu = await usuarioModel.findUserEmail({Nickname:value});
                if (nomeUsu > 0) {
                  throw new Error('Nome de usuário em uso!');
                }
              }),  
        body("email_usu")
           .isEmail().withMessage("Digite um e-mail válido!")
           .custom(async value => {
               const nomeUsu = await usuarioModel.findUserEmail({Email:value});
               if (nomeUsu > 0) {
                 throw new Error('E-mail em uso!');
               }
             }), 
        body("senha_usu")
            .isStrongPassword()
            .withMessage("A senha deve ter no mínimo 8 caracteres (mínimo 1 letra maiúscula, 1 caractere especial e 1 número)")
       
    ],
    Login_formLogin: async (req, res) => {
        try {
            const erros = validationResult(req);
            if (!erros.isEmpty()) {
                return res.render("pages/template", {
                    pagina: {cabecalho: "cabecalho", conteudo: "Fazer-Login", rodape: "rodape"}, 
                    usuario_logado:req.session.autenticado,
                    listaErros: erros, 
                    dadosNotificacao: null 
                });
            }
            if (req.session.autenticado && req.session.autenticado.autenticado) {
                res.redirect("/");
            }
            else {
                res.render("pages/template", {
                    pagina: {cabecalho: "cabecalho", conteudo: "Fazer-Login", rodape: "rodape"}, 
                    usuario_logado:req.session.autenticado, 
                    listaErros: null,
                    dadosNotificacao: {titulo:"Falha ao logar!", mensagem:"Usuário e/ou senha inválidos!", tipo: "error" }
                });
            }
        } catch (e) {
            console.error("Erro no login:", e);
        }
    },
    Login_formCadastro: async (req, res) => {
        const erros = validationResult(req);
        
        var dadosForm = { //dados que o usuário digita no formulário
            Nickname: req.body.nomeusu_usu,
            senha: bcrypt.hashSync(req.body.senha_usu, salt),
            Email: req.body.email_usu,
            Tipo_Cliente_idTipo_Cliente: 1
        };

        try {    
                let create = usuarioModel.create(dadosForm);

                if (!erros.isEmpty()) {
                    console.log(erros);
                    return res.render("pages/template", {
                        pagina: {cabecalho: "cabecalho", conteudo: "Fazer-Login", rodape: "rodape"}, 
                        usuario_logado:req.session.autenticado, 
                        listaErros: null,
                        dadosNotificacao: {
                            titulo: "Cadastro realizado!", mensagem: "Novo usuário criado com sucesso!", tipo: "success"
                        }
                    });
                }
                console.log("cadastro realizado!");
                return res.redirect("/");
                }
        catch (e) {
            console.log(e);
            res.render("pages/template", {
                pagina: {cabecalho: "cabecalho", conteudo: "Fazer-Login", rodape: "rodape"}, 
                usuario_logado:req.session.autenticado, 
                listaErros: erros,
                dadosNotificacao: {
                    titulo: "Erro ao cadastrar!", mensagem: "Verifique os valores digitados!", tipo: "error"
                }
            });
            console.log("erro no cadastro!");
        }
    },

    Index_mostrarPosts: async (req, res) => {
        res.locals.moment = moment;
        try {
                res.render("pages/template", {
                    pagina: {cabecalho: "cabecalho", conteudo: "index", rodape: "rodape"}, 
                    usuario_logado:req.session.autenticado,
                    login: req.session.logado});   
            
        } catch (e) {
            console.log(e); 
        }
    }
    

};


module.exports = tarefasController;