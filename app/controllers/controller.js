// Responsável por receber as entradas do usuário, interpretá-las e acionar ações adequadas no modelo e na visualização

const usuarioModel = require("../models/model-usuario"); //Requisição do arquivo Model para executar ações no Banco de Dados
const conteudoModel = require("../models/model-conteudo");
const imagemModel = require("../models/model-midia");
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
            .isLength({ min: 5, max: 45 }).withMessage("Nome de usuário deve ter de 5 a 45 caracteres!")
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
                    listaErroslog: erros, 
                    listaErros:null,
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
                    listaErroslog: null,
                    listaErros:null,
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
                usuario_logado:req.session.autenticado, 
                listaErros: erros,
                listaErroslog: null,
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
                listaErros: null, 
                listaErroslog: null,
                dadosNotificacao: {
                    titulo: "Erro ao cadastrar!", 
                    mensagem: "Tente novamente!", 
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
            let inicio = (pagina - 1) * regPagina;

            let totRegDicas = await conteudoModel.TotalReg("dica");
            let totRegPerguntas = await conteudoModel.TotalReg("pergunta");
            let totReg = totRegDicas[0].total + totRegPerguntas[0].total;
            let totPaginas = Math.ceil(totReg / regPagina); //calcula o número total de páginas necessárias para exibir todos os registros

            let dicas = await conteudoModel.FindPage("dica", inicio, regPagina / 2); // busca registros do tipo dica
            let perguntas = await conteudoModel.FindPage("pergunta", inicio, regPagina / 2);

            function formatarTempo(tempo) {
                let duracao = moment.duration(tempo, 'HH:mm:ss');
                let horas = duracao.hours();
                let minutos = duracao.minutes();
                if (horas > 0 && minutos > 0) {
                    return `${horas}h${minutos}min`;
                } else if (horas > 0 && minutos <= 0) {
                    return `${horas}hora${horas > 1 ? 's' : ''}`;
                } else if (horas <= 0 && minutos > 0) {
                    return `${minutos}min`;
                } else {
                    return ''; 
                }
            };

            let perguntasConteudo = perguntas.map(conteudo => ({
                nome: conteudo.titulo,
                categoria: conteudo.categorias_idCategorias
            }));

            let postsConteudo = dicas.map(conteudo => ({
                nome: conteudo.Titulo,
                descricao: conteudo.Descricao,
                tempo: formatarTempo(conteudo.tempo),
                porcoes: conteudo.porcoes > 0 ? `${conteudo.porcoes} ${conteudo.porcoes > 1 ? 'Porções' : 'Porção'}` : null,
                categoria: conteudo.Categorias_idCategorias
            }));

            console.log("pagina_atual: " + pagina + " total_reg: " + totReg + " total_paginas: " + totPaginas + " Índice de início:" + inicio + " regPagina: " + regPagina);

            let paginador = totReg <= regPagina
                ? null
                : {"pagina_atual": pagina, "total_reg": totReg, "total_paginas": totPaginas};

            res.render("pages/template", {
                pagina: {cabecalho: "cabecalho", conteudo: "index", rodape: "rodape"}, 
                usuario_logado:req.session.autenticado,
                login: req.session.logado,
                perguntas: perguntasConteudo, 
                posts: postsConteudo, 
                paginador: paginador
            });           
        } catch (e) {
            console.log(e); 
            res.json({erro: "Falha ao acessar dados"})
        }
    },
    CriarDica: async (req, res) => {
        var categoriaId;
        var categoria = req.body.dica_categoria;
        if (categoria === "Culinária") {
            categoriaId = 1;
        } else if (categoria === "Limpeza") {
            categoriaId = 2;
        } else if (categoria === "Bem Estar") {
            categoriaId = 3;
        }

        const etapasModoPreparo = req.body.etapas_modo_preparo;
        if (!Array.isArray(etapasModoPreparo)) {
            console.log('etapas_modo_preparo não é um array:', etapasModoPreparo);
            return res.status(400).send('Etapas do modo de preparo inválidas');
        }
        const etapasTexto = etapasModoPreparo.join('; ');

        var FormCriarDica = { //dados que o usuário digita no formulário
            Clientes_idClientes: req.session.autenticado.id, 
            Categorias_idCategorias: categoriaId,
            Titulo: req.body.dica_titulo,
            tempo: `${req.body.dica_tempo_horas.padStart(2, '0')}:${req.body.dica_tempo_minutos.padStart(2, '0')}:00`, // Formatando horas e minutos
            Descricao: req.body.dica_descricao,
            porcoes: req.body.dica_porcoes,
            Etapas_Modo_de_Preparo: etapasTexto 
        };
        const { ingredientes, quantidade_ingredientes, medida_ingredientes } = req.body;

        if (!ingredientes || !quantidade_ingredientes || !medida_ingredientes) {
            return res.status(400).send('Dados de ingredientes ausentes');
        };

        const ingredientesArray = Array.isArray(ingredientes) ? ingredientes : [ingredientes];
        const quantidadeIngredientesArray = Array.isArray(quantidade_ingredientes) ? quantidade_ingredientes : [quantidade_ingredientes];
        const medidaIngredientesArray = Array.isArray(medida_ingredientes) ? medida_ingredientes : [medida_ingredientes];


        try{
            // const dadosImagem = {
            //     nome: req.file.filename,
            //     caminho: req.file.path
            // };
            
            // let imagemCriada = await imagemModel.criarImagem(dadosImagem);
            // FormCriarDica.imagem_id = imagemCriada.insertId;

            let create = conteudoModel.CriarPostagem(FormCriarDica);
            const postagemId = create.insertId;


            for (let i = 0; i < ingredientesArray.length; i++) {
                let ingrediente = {
                    quantidade_ingredientes: quantidadeIngredientesArray[i],
                    ingredientes: ingredientesArray[i],
                    medida_ingredientes: medidaIngredientesArray[i],
                    postagem_id: postagemId
                };
                await ingredientesModel.criarIngrediente(ingrediente);
            }
            console.log("Postagem realizada!");

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
            console.log(FormCriarDica);
        }
    },
    CriarPergunta: async (req, res) => {
        var categoriaId;
        var categoria = req.body.pergunta_categoria;
        if (categoria === "Culinária") {
            categoriaId = 1;
        } else if (categoria === "Limpeza") {
            categoriaId = 2;
        } else if (categoria === "Bem Estar") {
            categoriaId = 3;
        }

        var FormCriarPergunta = {
            Clientes_idClientes: req.session.autenticado.id,
            titulo: req.body.pergunta_titulo,
            Categorias_idCategorias: categoriaId
        };

        try{
            let create = conteudoModel.CriarPergunta(FormCriarPergunta);
            console.log("Pergunta realizada!");

            req.session.notification = {
                titulo: "Pergunta realizada!",
                mensagem: "Sua pergunta foi publicada com sucesso!",
                tipo: "success"
            };
            return res.redirect("/perfil");
        } catch(e){
            console.log(e);
            res.render("pages/template", {
                pagina: {cabecalho: "cabecalho", conteudo: "meu-perfil", rodape: "rodape"}, 
                usuario_logado:req.session.autenticado, 
                listaErros: erros, 
                dadosNotificacao: {
                    titulo: "Erro ao realizar a pergunta!", 
                    mensagem: "Verifique os valores digitados em rascunhos!", 
                    tipo: "error"
                },
            });
            console.log("Erro ao realizar a pergunta!");
            console.log(FormCriarPergunta);
        }
    }
};


module.exports = tarefasController;