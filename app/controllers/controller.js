2// Responsável por receber as entradas do usuário, interpretá-las e acionar ações adequadas no modelo e na visualização

const usuarioModel = require("../models/model-usuario"); //Requisição do arquivo Model para executar ações no Banco de Dados
const conteudoModel = require("../models/model-conteudo");
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
            const isUsername = /^[a-zA-Z0-9_.\-\s]+$/.test(value)

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
            const erros = validationResult(req);
            if (!erros.isEmpty()) { //Verificação de Erros de Validação
                return res.render("pages/template", {
                    pagina: {cabecalho: "cabecalho", conteudo: "Fazer-Login", rodape: "rodape"}, 
                    usuario_logado:req.session.autenticado,
                    listaErros: erros, 
                    dadosNotificacao: null //mensagem erro express validator
                });
            }
            if (req.session.autenticado && req.session.autenticado.autenticado) {
                res.redirect("/");
            }
            else {
                res.render("pages/template", { //Verificação de Erros de Login com banco
                    pagina: {cabecalho: "cabecalho", conteudo: "Fazer-Login", rodape: "rodape"}, 
                    usuario_logado:req.session.autenticado, 
                    listaErros: null,
                    dadosNotificacao: {titulo:"Falha ao logar!", mensagem:"Usuário e/ou senha inválidos!", tipo: "error" }
                });
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
        if (!erros.isEmpty()) {
            console.log(erros);
            return res.render("pages/template", {
                pagina: {cabecalho: "cabecalho", conteudo: "Fazer-Login", rodape: "rodape"}, 
                listaErros: erros,
                dadosNotificacao: null
            });
        }
        try{
            let create = usuarioModel.create(dadosForm);
            console.log("cadastro realizado!");

            req.session.notification = {
                titulo: "Cadastro realizado!",
                mensagem: "Novo usuário criado com sucesso!",
                tipo: "success"
            };
            return res.redirect("/");
        } catch(e) {
            console.log(e);
            res.render("pages/template", {
                pagina: {cabecalho: "cabecalho", conteudo: "Fazer-Login", rodape: "rodape"}, 
                usuario_logado:req.session.autenticado, 
                listaErros: erros, 
                dadosNotificacao: {
                    titulo: "Erro ao cadastrar!", 
                    mensagem: "Verifique os valores digitados!", 
                    tipo: "error"
                },
            });
            console.log("erro no cadastro!");
        }
    },

    MostrarPosts: async (req, res) => {
        res.locals.moment = moment;
        try {
            let pagina = req.query.pagina == undefined ? 1 : req.query.pagina;
            let regPagina = 12 //número de registros por página
            let inicio = 0
            let totReg = await conteudoModel.TotalReg(); //armazena o número total de registros
            let totPaginas = Math.ceil(totReg[0].total / regPagina); //calcula o número total de páginas necessárias para exibir todos os registros
            let results = await conteudoModel.FindPage(inicio, regPagina);
            let paginador = totReg[0].total <= regPagina
                ? null
                : {"pagina_atual": pagina, "total_reg": totReg[0].total, "total_paginas": totPaginas};
            let postsConteudo = results.map(conteudo => ({
                nome: conteudo.Titulo,
                descricao: conteudo.Descricao,
                tempo: formatarTempo(conteudo.tempo),
                porcoes: conteudo.porcoes
            }));
            function formatarTempo(tempo) {
                let duracao = moment.duration(tempo, 'HH:mm:ss');
                let horas = duracao.hours();
                let minutos = duracao.minutes();
                if (horas > 0 && minutos > 0) {
                    return `${horas}h${minutos}min`;
                } else if (horas > 0 && minutos <= 0) {
                    return `${horas} hora${horas > 1 ? 's' : ''}`;
                } else if (horas <= 0 && minutos > 0) {
                    return `${minutos} minuto${minutos > 1 ? 's' : ''}`;
                } else {
                    return ''; 
                }
            };            
            res.render("pages/template", {
                pagina: {cabecalho: "cabecalho", conteudo: "index", rodape: "rodape"}, 
                usuario_logado:req.session.autenticado,
                login: req.session.logado,  
                posts: postsConteudo, 
                paginador: paginador
            });           
        } catch (e) {
            console.log(e); 
            res.json({erro: "Falha ao acessar dados"})
        }
    },
    CriarDica: async (req, res) => {
        var FormCriarDica = { //dados que o usuário digita no formulário
            Clientes_idClientes: req.session.autenticado.id, 
            Titulo: req.body.dica-titulo,
            Categorias_idCategorias: req.body.dica-categoria,
            tempo: `${req.body.dica-tempo-horas.padStart(2, '0')}:${req.body.dica-tempo-minutos.padStart(2, '0')}:00`, // Formatando horas e minutos
            Descricao: req.body.dica-descricao,
            porcoes: req.body.dica-porcoes
        };
        try{
            let create = conteudoModel.CriarPostagem(FormCriarDica);
            console.log("postagem realizada!");

            req.session.notification = {
                titulo: "Postagem realizada!",
                mensagem: "Sua dica foi publicada com sucesso!",
                tipo: "success"
            };
            return res.redirect("/perfil");
        } catch(e) {
            console.log(e);
            res.render("pages/template", {
                pagina: {cabecalho: "cabecalho", conteudo: "meu-perfil", rodape: "rodape"}, 
                usuario_logado:req.session.autenticado, 
                listaErros: erros, 
                dadosNotificacao: {
                    titulo: "Erro ao realizar a postagem!", 
                    mensagem: "Verifique os valores digitados em rascunhos!", 
                    tipo: "error"
                },
            });
            console.log("Erro ao realizar a postagem!");
        }
    }

    
};


module.exports = tarefasController;