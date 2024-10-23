// Responsável por receber as entradas do usuário, interpretá-las e acionar ações adequadas no modelo e na visualização

const usuarioModel = require("../models/model-usuario");
const conteudoModel = require("../models/model-conteudo");
const admModel = require("../models/model-adm");

const moment = require("moment"); //datas e horas bonitinhas
const { body, validationResult } = require("express-validator");
const { removeImg } = require("../util/removeImg");
const bcrypt = require("bcryptjs");
// const nodemailer = require('nodemailer');
var salt = bcrypt.genSaltSync(12);

const tarefasController = {
    //supostamente newsletter
  
    // REGRAS VALIDAÇÃO
    regrasValidacaoLogin: [
        body('input1')
            .custom(value => {
                const isEmail = /^\S+@\S+\.\S+$/.test(value);
                const isUsername = /^[a-zA-Z0-9_.\-\s]+$/.test(value)

                if (!isEmail && !isUsername) {
                    throw new Error('Insira um nome de usuário ou email válido!');
                }
                return true;
            }),

        body('input2').isLength({ min: 6, max: 60 }).
            withMessage("A senha deve ter no minimo 6 caracteres")
    ],
    regrasValidacaoCadastro: [
        body("nomeusu_usu")
            .isLength({ min: 5, max: 45 }).withMessage("Nome de usuário deve ter de 5 a 45 caracteres!")
            .custom(async value => {
                const nomeUsu = await usuarioModel.findUserEmail({ Nickname: value });
                if (nomeUsu > 0) {
                    throw new Error('Nome de usuário em uso!');
                }
            }),
        body("email_usu")
            .isEmail().withMessage("Digite um e-mail válido!")
            .custom(async value => {
                const nomeUsu = await usuarioModel.findUserEmail({ Email: value });
                if (nomeUsu > 0) {
                    throw new Error('E-mail em uso!');
                }
            }),
        body("senha_usu")
            .isStrongPassword()
            .withMessage("A senha deve ter no mínimo 8 caracteres (mínimo 1 letra maiúscula, 1 caractere especial e 1 número)")

    ],
    regrasValidacaoEditarPerfil: [
        body("editar-nome-usuario")
            .isLength({ min: 5, max: 45 }).withMessage("Nome de usuário deve ter de 5 a 45 caracteres!"),
        body("editar-biografia")
            .isLength({ min: 0, max: 200 }).withMessage("Sua biografia deve ter até 200 caracteres!"),
        body("editar-nome-site")
            .isLength({ min: 2, max: 30 }).withMessage("Nome do site deve ter de 2 a 30 caracteres!"),
        body("editar-url-site")
            .isURL().withMessage("Insira uma URL válida!"),
    ],
    // LOGIN & CADASTRO & GOOGLE
    Login_formLogin: async (req, res) => {
        const erros = validationResult(req);
        if (!erros.isEmpty()) {
            return res.render("pages/template", {
                pagina: { cabecalho: "cabecalho", conteudo: "Fazer-Login", FormCadastro: "template_cadastro", FormLogin: "template_login", rodape: "rodape" },
                usuario_logado: req.session.autenticado,
                listaErroslog: erros,
                listaErrosCad: null,
                dadosNotificacao: null
            });
        }

        if (req.session.autenticado && req.session.autenticado.autenticado) {
            return res.redirect("/");
        }

        return res.render("pages/template", {
            pagina: { cabecalho: "cabecalho", conteudo: "Fazer-Login", FormCadastro: "template_cadastro", FormLogin: "template_login", rodape: "rodape" },
            usuario_logado: null,
            listaErroslog: null,
            listaErrosCad: null,
            dadosNotificacao: { titulo: "Falha ao logar!", mensagem: "Usuário e/ou senha inválidos!", tipo: "error" }
        });
    },
    Login_formCadastro: async (req, res) => {
        const erros = validationResult(req);
        const salt = bcrypt.genSaltSync(10);
        var dadosForm = {
            Nickname: req.body.nomeusu_usu,
            senha: bcrypt.hashSync(req.body.senha_usu, salt),
            Email: req.body.email_usu,
            Tipo_Cliente_idTipo_Cliente: 1
        };
        if (!erros.isEmpty()) {
            console.log(erros);
            return res.render("pages/template", {
                pagina: { cabecalho: "cabecalho", conteudo: "Fazer-Login", FormCadastro: "template_cadastro", FormLogin: "template_login", rodape: "rodape" },
                usuario_logado: req.session.autenticado,
                listaErroslog: null,
                listaErrosCad: erros,
                dadosNotificacao: null
            });
        }
        try {
            let create = usuarioModel.create(dadosForm);
            console.log("cadastro realizado!");

            req.session.autenticado = {
                autenticado: dadosForm.Nickname,
                tipo: dadosForm.Tipo_Cliente_idTipo_Cliente,
                id: create.idClientes,
            };

            req.session.notification = {
                titulo: "Cadastro realizado!",
                mensagem: "Novo usuário criado com sucesso!",
                tipo: "success"
            };
            return res.redirect("/");
        } catch (e) {
            console.log(e);
            return res.render("pages/template", {
                pagina: { cabecalho: "cabecalho", conteudo: "Fazer-Login", FormCadastro: "template_cadastro", FormLogin: "template_login", rodape: "rodape" },
                usuario_logado: req.session.autenticado,
                listaErrosCad: null,
                listaErroslog: null,
                dadosNotificacao: {
                    titulo: "Erro ao cadastrar!",
                    mensagem: "Tente novamente!",
                    tipo: "error"
                },
            });
        }
    },
    encontrarOuCriarUsuarioGoogle: async (accessToken, refreshToken, profile, done) => {
        try {
            const email = profile.emails && profile.emails[0] ? profile.emails[0].value : null;
            if (!email) {
                return done(new Error("Email do Google não disponível."), null);
            }

            let usuario = await usuarioModel.findUserByEmail(email); // Usa a função do model para buscar por email

            if (!usuario) {
                // Se o usuário não existir, crie um novo
                const novoUsuario = {
                    Nickname: profile.displayName,
                    Email: email,
                    senha: null,
                    Tipo_Cliente_idTipo_Cliente: 1, // Defina o tipo padrão
                };
                const resultado = await usuarioModel.create(novoUsuario);
                usuario = await usuarioModel.findUserById(resultado.insertId); // Cria o novo usuário no banco de dados
            }
            if (!usuario) {
                return done(new Error("Usuário não encontrado ou criado."), null); // Retorna erro se o usuário não foi encontrado ou criado
            }

            const fotoPerfil = usuario.foto_icon_perfil ? `data:image/png;base64,${usuario.foto_icon_perfil.toString('base64')}` : null;

            autenticado = {
                autenticado: usuario.Nickname,
                tipo: usuario.Tipo_Cliente_idTipo_Cliente,
                id: usuario.idClientes,
                foto: fotoPerfil
            };

            done(null, { usuario, autenticado });
        } catch (error) {
            return done(error, null); // Retorna o erro caso algo falhe
        }
    },
    serializeUser: (user, done) => {
        console.log("Serializando usuário:", user, done);
        if (user && user.usuario.idClientes) {
            done(null, user.usuario.idClientes);
        } else {
            done(new Error("Usuário não encontrado para serializar."), null);
        }
    },
    deserializeUser: async (id, done) => {
        try {
            const user = await usuarioModel.findUserById(id);
            if (!user) {
                return done(new Error("Usuário não encontrado."), null);
            }
            done(null, user);
        } catch (error) {
            done(error, null);
        }
    },
    // POSTAGENS
    MostrarPosts: async (req, res, categoriaId = null) => {
        res.locals.moment = moment;
        try {
            const categoriaMap = {
                'culinaria': 1,
                'limpeza': 2,
                'bemestar': 3,
                'semmarca': null
            };
            const filtros = {
                recente: 'recente',
                'em-alta': 'em-alta',
                rapidos: 'rapidos',
            };
            let categoria = categoriaId || categoriaMap[req.query.categoria] || null;
            let filtro = req.query.filtro || 'em-alta';
            let pagina = req.query.pagina || 1;
            let regPagina = 12;
            let inicio = (pagina - 1) * regPagina;

            let results = await conteudoModel.FindPage(categoria, filtros[filtro], inicio, regPagina);
            let totReg = await conteudoModel.TotalReg(categoria, filtros[filtro]);
            let totalRegistros = totReg[0].total;
            let totPaginas = Math.ceil(totalRegistros / regPagina);

            let paginador = totalRegistros <= 12 ? null : {
                "pagina_atual": pagina,
                "total_reg": totalRegistros,
                "total_paginas": totPaginas
            };

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
            }

            let combinedConteudo = await Promise.all(results.map(async (conteudo) => {
                let ingredientes = await conteudoModel.BuscarIngredientesPorPostagemId(conteudo.id);
                let mediaAvaliacoes = await conteudoModel.CalcularMediaAvaliacoes(conteudo.id);

                const isPatinha = await conteudoModel.VerificarSePatinha(conteudo.id);

                let quantidadePatinhas = 0;
                if (conteudo.tipo === "pergunta") {
                    quantidadePatinhas = await conteudoModel.BuscarQuantidadePatinhasPorPergunta(conteudo.id);
                }

                let isFavorito = false;
                if (req.session.autenticado.id) {
                    isFavorito = await conteudoModel.isFavorito(req.session.autenticado.id, conteudo.id);
                }
                return {
                    nome: conteudo.Titulo,
                    usuario: conteudo.Clientes_idClientes,
                    nome_usuario: conteudo.nome_usuario,
                    id: conteudo.id,
                    categoria: conteudo.Categorias_idCategorias,
                    tempo: conteudo.tempo ? formatarTempo(conteudo.tempo) : null,
                    descricao: conteudo.Descricao || null,
                    etapas: conteudo.Etapas_Modo_de_Preparo,
                    porcoes: conteudo.porcoes > 0 ? `${conteudo.porcoes} ${conteudo.porcoes > 1 ? 'Porções' : 'Porção'}` : null,
                    tipo: conteudo.tipo,
                    subcategorias: conteudo.subcategorias,
                    ingredientes: ingredientes.length ? ingredientes.map(i => i.ingredientes).join(', ') : null,
                    mediaAvaliacoes,
                    imagem: conteudo.idMidia ? `data:image;base64,${conteudo.idMidia.toString('base64')}` : null,
                    patinha: isPatinha,
                    quantidadePatinhas: quantidadePatinhas,
                    isFavorito: isFavorito
                };
            }));

            return {
                usuario_logado: req.session.autenticado || {},
                login: req.session.logado,
                postagens: combinedConteudo,
                paginador: paginador,
                categoriaAtual: categoria || 'todas',
                novoFiltro: filtro || 'em-alta'
            };

        } catch (e) {
            console.log(e);
            res.json({ erro: "Falha ao acessar dados" });
        }
    },
    PesquisarPosts: async (req, res, categoriaId = null) => {
        try {
            const termoPesquisa = req.query.pesquisa_form || "";
            const filtroTipo = req.query.filtro_tipo || null;
            let filtroCategoria = req.query.filtro_categoria || null;
            const filtroClassificacao = req.query.filtro_classificacao || 'em-alta';

            const categoriaMap = {
                'culinaria': 1,
                'limpeza': 2,
                'bemestar': 3
            };

            let categoria = categoriaId || categoriaMap[filtroCategoria] || null;
            let filtro = filtroClassificacao || null;

            let pagina = parseInt(req.query.pagina) || 1;;
            let regPagina = 18;
            let inicio = (pagina - 1) * regPagina;

            const data = await conteudoModel.PesquisarPorTitulo(termoPesquisa, filtroTipo, categoria, inicio, regPagina, filtroClassificacao);

            let totReg = await conteudoModel.TotalRegPorTitulo(termoPesquisa, filtroTipo, categoria);
            let totalRegistros = totReg[0].total;
            let totalPaginas = Math.ceil(totalRegistros / regPagina);

            let paginador = totalRegistros <= 18 ? null : {
                paginaAtual: pagina,
                totalRegistros: totalRegistros,
                totalPaginas: totalPaginas
            };

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
            }

            if (!data) {
                return res.status(404).json({ erro: "Nenhum resultado encontrado" });
            }

            let combinedConteudo = await Promise.all(data.map(async conteudo => {
                let ingredientes = await conteudoModel.BuscarIngredientesPorPostagemId(conteudo.id);
                let mediaAvaliacoes = await conteudoModel.CalcularMediaAvaliacoes(conteudo.id);
                const isPatinha = await conteudoModel.VerificarSePatinha(conteudo.id);

                let quantidadePatinhas = 0;
                if (conteudo.tipo === "pergunta") {
                    quantidadePatinhas = await conteudoModel.BuscarQuantidadePatinhasPorPergunta(conteudo.id);
                }

                let isFavorito = false;
                if (conteudo.Clientes_idClientes) {
                    isFavorito = await conteudoModel.isFavorito(conteudo.Clientes_idClientes, conteudo.id);
                }
                return {
                    nome: conteudo.Titulo,
                    usuario: conteudo.Clientes_idClientes,
                    nome_usuario: conteudo.nome_usuario,
                    id: conteudo.id,
                    categoria: conteudo.Categorias_idCategorias,
                    tempo: conteudo.tempo ? formatarTempo(conteudo.tempo) : null,
                    descricao: conteudo.Descricao || null,
                    etapas: conteudo.Etapas_Modo_de_Preparo,
                    porcoes: conteudo.porcoes > 0 ? `${conteudo.porcoes} ${conteudo.porcoes > 1 ? 'Porções' : 'Porção'}` : null,
                    tipo: conteudo.tipo,
                    subcategorias: conteudo.subcategorias,
                    mediaAvaliacoes,
                    ingredientes: ingredientes.length ? ingredientes.map(i => i.ingredientes).join(', ') : null,
                    imagem: conteudo.idMidia ? `data:image;base64,${conteudo.idMidia.toString('base64')}` : null,
                    patinha: isPatinha,
                    quantidadePatinhas: quantidadePatinhas,
                    isFavorito: isFavorito
                };
            }));
            return {
                termoPesquisa,
                filtroTipo,
                aviso: data.length === 0 ? "Não há postagens disponíveis para esta pesquisa." : null,
                usuario_logado: req.session.autenticado,
                postagens: combinedConteudo,
                filtro: filtro,
                paginaAtual: pagina,
                totalPaginas: totalPaginas,
                paginador: paginador,
                paginaAtual: paginador ? paginador.paginaAtual : 1,
                categoriaAtual: categoria || 'todas',
                novoFiltro: filtro || 'recente',
            };
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    },
    AbrirPostagem: async (req, res) => {
        res.locals.moment = moment;
        try {
            const postagemId = req.params.id;
            const postagem = await conteudoModel.BuscarPostagemPorId(postagemId);
            const ingredientes = await conteudoModel.BuscarIngredientesPorPostagemId(postagemId);
            const mediaAvaliacoes = await conteudoModel.CalcularMediaAvaliacoes(postagemId);

            if (!postagem) {
                return res.status(404).render("pages/erro", { mensagem: "Postagem não encontrada" });
            }

            const usuarioPerfil = await conteudoModel.obterPerfilPorNickname(postagem.nome_usuario);

            const fotoPerfil = usuarioPerfil?.foto_icon_perfil
                ? `data:image/png;base64,${usuarioPerfil.foto_icon_perfil.toString('base64')}`
                : null;

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
            }

            let idPergunta = null;
            let quantidadePatinhas = 0;

            const isPatinha = await conteudoModel.VerificarSePatinha(postagemId);
            if (isPatinha) {
                idPergunta = await conteudoModel.BuscarPerguntaPorPatinhaId(postagemId);
            } else {
                idPergunta = postagemId;
            }

            quantidadePatinhas = await conteudoModel.BuscarQuantidadePatinhasPorPergunta(idPergunta);

            let postagemFormatada = {
                titulo: postagem.Titulo,
                usuario: postagem.Clientes_idClientes,
                nome_usuario: postagem.nome_usuario,
                id: postagem.id,
                categoria: postagem.Categorias_idCategorias,
                nomeCategoria: '',
                tempo: postagem.tempo ? formatarTempo(postagem.tempo) : null,
                descricao: postagem.Descricao || null,
                etapas: postagem.Etapas_Modo_de_Preparo ? postagem.Etapas_Modo_de_Preparo.split('; ') : [], // Dividindo as etapas
                porcoes: postagem.porcoes > 0 ? `${postagem.porcoes} ${postagem.porcoes > 1 ? 'Porções' : 'Porção'}` : null,
                tipo: postagem.tipo,
                ingredientes: ingredientes,
                subcategorias: postagem.subcategorias,
                mediaAvaliacoes,
                imagem: postagem.idMidia ? `data:image;base64,${postagem.idMidia.toString('base64')}` : null,
                fotoPerfil,
                patinha: isPatinha,
                idPerguntaAssociada: idPergunta,
                IdPostagem: postagemId,
                quantidadePatinhas: quantidadePatinhas
            };

            switch (postagem.Categorias_idCategorias) {
                case 1:
                    postagemFormatada.nomeCategoria = 'Culinária';
                    break;
                case 2:
                    postagemFormatada.nomeCategoria = 'Limpeza';
                    break;
                case 3:
                    postagemFormatada.nomeCategoria = 'Bem-estar';
                    break;
                default:
                    postagemFormatada.nomeCategoria = 'Outra categoria';
                    break;
            }

            const usuario_logado = req.session.autenticado ? req.session.autenticado : null;

            if (postagem.tipo === 'dica') {
                res.render("pages/template", {
                    pagina: { cabecalho: "cabecalho", conteudo: "Base-Dica", rodape: "rodape" },
                    postagem: postagemFormatada,
                    usuario_logado: usuario_logado
                });
            } else if (postagem.tipo === 'pergunta') {
                res.render("pages/template", {
                    pagina: { cabecalho: "cabecalho", conteudo: "Base-Pergunta", rodape: "rodape" },
                    postagem: postagemFormatada,
                    usuario_logado: usuario_logado
                });
            }
        } catch (erro) {
            res.status(500).json({ erro: erro.message });
        }
    },
    MostrarPatinhas: async (req, res) => {
        try {
            const idPergunta = req.params.IdPostagem;

            const pergunta = await conteudoModel.BuscarPerguntaPorId(idPergunta);
            const nomePergunta = pergunta ? pergunta.titulo : 'Pergunta não encontrada';
            console.log("nomePergunta: ", nomePergunta);

            const dicasPatinhas = await conteudoModel.BuscarDicasPorPergunta(idPergunta);

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
            }

            const dicasFormatadas = await Promise.all(dicasPatinhas.map(async dica => {
                const ingredientes = await conteudoModel.BuscarIngredientesPorPostagemId(dica.id);
                const mediaAvaliacoes = await conteudoModel.CalcularMediaAvaliacoes(dica.id);

                return {
                    nome: dica.Titulo,
                    usuario: dica.Clientes_idClientes,
                    id: dica.ID_conteudo,
                    categoria: dica.Categorias_idCategorias,
                    tempo: dica.tempo ? formatarTempo(dica.tempo) : null,
                    descricao: dica.Descricao || null,
                    etapas: dica.Etapas_Modo_de_Preparo,
                    porcoes: dica.porcoes,
                    subcategorias: dica.subcategorias,
                    mediaAvaliacoes,
                    ingredientes: ingredientes.length ? ingredientes.map(i => i.ingredientes).join(', ') : null,
                    imagem: dica.idMidia ? `data:image;base64,${dica.idMidia.toString('base64')}` : null,
                    patinha: true,
                    tipo: 'dica'
                };
            }));

            console.log("Dicas formatadas: ", dicasFormatadas);

            const totalDicas = dicasFormatadas.length;
            console.log("totalDicas: ", totalDicas);

            const regPagina = 12;
            const totalPaginas = Math.ceil(totalDicas / regPagina);
            console.log("totalPaginas: ", totalPaginas);
            const paginador = totalDicas <= regPagina ? null : {
                paginaAtual: 1,
                totalRegistros: totalDicas,
                totalPaginas: totalPaginas
            };

            res.render("pages/template", {
                pagina: { cabecalho: "cabecalho", conteudo: "Patinhas", rodape: "rodape" },
                usuario_logado: req.session.autenticado || {},
                postagens: dicasFormatadas,
                dicas: dicasFormatadas,
                perguntaId: idPergunta,
                nomePergunta: nomePergunta,
                paginador: paginador,
                paginaAtual: paginador ? paginador.paginaAtual : 1,
                totalPaginas: totalPaginas,

            });
        } catch (error) {
            console.error("Erro ao mostrar patinhas: ", error);
            res.status(500).json({ erro: "Erro ao buscar patinhas para a pergunta." });
        }
    },
    MostrarPostagensPerfil: async (req, res) => {
        const idCliente = req.session.autenticado.id;
        res.locals.moment = moment;

        try {
            const pagina = parseInt(req.query.pagina) || 1; // Página atual
            const regPagina = 12; // Registros por página
            const inicio = (pagina - 1) * regPagina; // Cálculo do início da página

            // Buscar as postagens do perfil do usuário
            let results = await conteudoModel.PesquisarPostsPerfil(idCliente, inicio, regPagina);
            let totReg = await conteudoModel.TotalRegPerfil(idCliente);
            let totalRegistros = totReg[0].total;
            let totPaginas = Math.ceil(totalRegistros / regPagina);

            // Paginador
            let paginador = totalRegistros <= 12 ? null : {
                "pagina_atual": pagina,
                "total_reg": totalRegistros,
                "total_paginas": totPaginas
            };

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
            }

            // Formatar o conteúdo
            let combinedConteudo = await Promise.all(results.map(async (conteudo) => {
                let ingredientes = await conteudoModel.BuscarIngredientesPorPostagemId(conteudo.id);
                let mediaAvaliacoes = await conteudoModel.CalcularMediaAvaliacoes(conteudo.id);

                let isFavorito = false;
                if (conteudo.Clientes_idClientes) {
                    isFavorito = await conteudoModel.isFavorito(conteudo.Clientes_idClientes, conteudo.id);
                }
                return {
                    nome: conteudo.Titulo,
                    usuario: conteudo.Clientes_idClientes,
                    nome_usuario: conteudo.nome_usuario,
                    id: conteudo.id,
                    categoria: conteudo.Categorias_idCategorias,
                    tempo: conteudo.tempo ? formatarTempo(conteudo.tempo) : null,
                    descricao: conteudo.Descricao || null,
                    etapas: conteudo.Etapas_Modo_de_Preparo,
                    porcoes: conteudo.porcoes > 0 ? `${conteudo.porcoes} ${conteudo.porcoes > 1 ? 'Porções' : 'Porção'}` : null,
                    tipo: conteudo.tipo,
                    subcategorias: conteudo.subcategorias,
                    ingredientes: ingredientes.length ? ingredientes.map(i => i.ingredientes).join(', ') : null,
                    mediaAvaliacoes,
                    imagem: conteudo.idMidia ? `data:image;base64,${conteudo.idMidia.toString('base64')}` : null,
                    isFavorito: isFavorito
                };
            }));

            return {
                usuario_logado: req.session.autenticado || {},
                login: req.session.logado,
                postagens: combinedConteudo,
                paginador: paginador,
                total_postagens: totalRegistros,
                categoriaAtual: 'todas',
                novoFiltro: 'recente'
            };

        } catch (e) {
            console.log(e);
            res.json({ erro: "Falha ao acessar dados" });
        }
    },
    listarFavoritos: async (req, res) => {
        const clienteId = req.session.autenticado.id;
        res.locals.moment = moment;
        try {
            const pagina = parseInt(req.query.pagina) || 1;
            const regPagina = 12;
            const inicio = (pagina - 1) * regPagina;

            // Buscar postagens favoritados do usuário
            let results = await conteudoModel.getFavoritosByCliente(clienteId, inicio, regPagina);
            let totalRegistros = await conteudoModel.totalFavoritos(clienteId); // Retorna o total de favoritos
            let totPaginas = Math.ceil(totalRegistros / regPagina);

            // Paginador
            let paginador = totalRegistros <= 12 ? null : {
                "pagina_atual": pagina,
                "total_reg": totalRegistros,
                "total_paginas": totPaginas
            };

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
            }

            // Formatando o conteúdo
            let combinedConteudo = await Promise.all(results.map(async (conteudo) => {
                let ingredientes = await conteudoModel.BuscarIngredientesPorPostagemId(conteudo.id);
                let mediaAvaliacoes = await conteudoModel.CalcularMediaAvaliacoes(conteudo.id);

                const isPatinha = await conteudoModel.VerificarSePatinha(conteudo.id);

                return {
                    nome: conteudo.Titulo,
                    usuario: conteudo.Clientes_idClientes,
                    nome_usuario: conteudo.nome_usuario,
                    id: conteudo.id,
                    categoria: conteudo.Categorias_idCategorias,
                    tempo: conteudo.tempo ? formatarTempo(conteudo.tempo) : null,
                    descricao: conteudo.Descricao || null,
                    etapas: conteudo.Etapas_Modo_de_Preparo,
                    porcoes: conteudo.porcoes > 0 ? `${conteudo.porcoes} ${conteudo.porcoes > 1 ? 'Porções' : 'Porção'}` : null,
                    tipo: conteudo.tipo,
                    subcategorias: conteudo.subcategorias,
                    ingredientes: ingredientes.length ? ingredientes.map(i => i.ingredientes).join(', ') : null,
                    mediaAvaliacoes,
                    imagem: conteudo.idMidia ? `data:image;base64,${conteudo.idMidia.toString('base64')}` : null,
                    isFavorito: true,
                    patinha: isPatinha,
                };
            }));

            console.log(combinedConteudo);

            return res.render("pages/template", {
                pagina: { cabecalho: "cabecalho", conteudo: "Meus-Favoritos", rodape: "none" },
                usuario_logado: req.session.autenticado || {},
                login: req.session.logado,
                postagens: combinedConteudo,
                paginador: paginador,
                total_postagens: totalRegistros,
                categoriaAtual: 'todas',
                novoFiltro: 'recente'
            });
        } catch (error) {
            console.log(error);
            res.json({ erro: "Falha ao acessar dados" });
        }
    },
    // INTERAÇÃO DO USUÁRIO - Avaliação, Favoritos
    AvaliarPostagem: async (req, res) => {
        const { nota, conteudo_id, categorias_id } = req.body;
        const clientes_id = req.session.autenticado.id;

        console.log("Valor Avaliação:" + nota);
        console.log("Id do cliente:" + clientes_id);

        if (!clientes_id) {
            console.log("Usuário não logado!")
            return res.redirect("/login");
        }

        try {
            const avaliacaoExistente = await conteudoModel.VerificarAvaliacaoExistente(clientes_id, conteudo_id);

            if (avaliacaoExistente) {
                return res.status(400).json({ message: "Você já avaliou esta postagem." });
            }

            await conteudoModel.Avaliacao({
                conteudo_id,
                nota,
                clientes_id,
                categorias_id
            });

            const mediaAvaliacoes = await conteudoModel.CalcularMediaAvaliacoes(conteudo_id);
            const mediaFormatada = parseFloat(mediaAvaliacoes).toFixed(1);

            console.log("Avaliação registrada com sucesso!");
            console.log("Média atualizada: ", mediaFormatada);

            return res.redirect("/dica/" + conteudo_id);
        } catch (erro) {
            console.error("Erro ao registrar avaliação:", erro);
            return res.status(500).json({ error: 'Erro ao registrar a avaliação' });
        }
    },
    adicionarFavorito: async (req, res) => {
        if (!req.session.autenticado || !req.session.autenticado.id) {
            return res.status(401).json({ message: "Usuário não autenticado" });
        }

        const clienteId = req.session.autenticado.id;
        const conteudoId = req.body.conteudoId;

        if (!conteudoId) {
            return res.status(400).json({ message: "ID do conteúdo não fornecido." });
        }

        try {
            const jaFavorito = await conteudoModel.isFavorito(clienteId, conteudoId);
            if (jaFavorito) {
                return res.status(400).json({ message: "Já está nos favoritos." });
            }

            await conteudoModel.addFavorito(clienteId, conteudoId);
            res.status(201).json({ message: "Favorito adicionado com sucesso." });
            console.log("Favorito adicionado com sucesso");
        } catch (error) {
            console.error("Erro ao adicionar favorito:", error);
            res.status(500).json({ message: "Erro ao adicionar favorito." });
        }
    },
    removerFavorito: async (req, res) => {
        if (!req.session.autenticado || !req.session.autenticado.id) {
            return res.status(401).json({ message: "Usuário não autenticado" });
        }
        const clienteId = req.session.autenticado.id; // ID do cliente a partir da sessão
        const conteudoId = req.body.conteudoId; // ID do conteúdo a ser removido dos favoritos

        if (!conteudoId) {
            return res.status(400).json({ message: "ID do conteúdo não fornecido." });
        }

        try {
            await conteudoModel.removeFavorito(clienteId, conteudoId);
            res.status(200).json({ message: "Favorito removido com sucesso." });
        } catch (error) {
            res.status(500).json({ message: "Erro ao remover favorito." });
        }
    },
    // CRIAR DICA & PERGUNTA
    CriarDica: async (req, res) => {
        try {
            let categoriaId;
            let porcoes = null;
            const categoria = req.body.dica_categoria;
            console.log("----------------")
            console.log(req.body);

            if (categoria === "Culinária") {
                categoriaId = 1;
                porcoes = req.body.dica_porcoes;
            } else if (categoria === "Limpeza") {
                categoriaId = 2;
            } else if (categoria === "Bem Estar") {
                categoriaId = 3;
            }

            let etapasModoPreparo = req.body.etapas_modo_preparo;
            if (typeof etapasModoPreparo === 'string') {
                etapasModoPreparo = [etapasModoPreparo]; // Se for uma string única, transformar em array
            }
            const etapasTexto = Array.isArray(etapasModoPreparo) ? etapasModoPreparo.join('; ') : '';

            const subcategoriasTexto = req.body.dica_subcategorias || '';

            const FormCriarDica = {
                Clientes_idClientes: req.session.autenticado.id,
                Titulo: req.body.dica_titulo,
                Categorias_idCategorias: categoriaId,
                tempo: `${req.body.dica_tempo_horas.padStart(2, '0')}:${req.body.dica_tempo_minutos.padStart(2, '0')}:00`,
                porcoes: porcoes,
                Descricao: req.body.dica_descricao,
                Etapas_Modo_de_Preparo: etapasTexto,
                subcategorias: subcategoriasTexto,
                idMidia: req.file ? req.file.buffer : null
            };
            console.log("Arquivo recebido no controlador:", req.file);
            if (!req.file) {
                return res.status(400).send("Arquivo não encontrado. Verifique o campo de upload.");
            }

            console.log('FormCriarDica:', FormCriarDica); // Debugging

            const createPostagem = await conteudoModel.CriarPostagem(FormCriarDica);
            const postagemId = createPostagem.insertId;

            const ingredientesArray = req.body.ingredientes || [];
            const quantidadeIngredientesArray = req.body.quantidade_ingredientes || [];
            const medidaIngredientesArray = req.body.medida_ingredientes || [];

            if (ingredientesArray.length > 0 &&
                quantidadeIngredientesArray.length > 0 &&
                medidaIngredientesArray.length > 0) {
                for (let i = 0; i < ingredientesArray.length; i++) {
                    let ingrediente = {
                        quantidade_ingredientes: quantidadeIngredientesArray[i] || null,
                        ingredientes: ingredientesArray[i] || null,
                        medida_ingredientes: medidaIngredientesArray[i] || null,
                        conteúdo_postagem_ID_conteúdo: postagemId,
                        conteúdo_postagem_Clientes_idClientes: req.session.autenticado.id,
                        conteúdo_postagem_Categorias_idCategorias: categoriaId
                    };
                    try {
                        await conteudoModel.CriarIngrediente(ingrediente);
                    } catch (error) {
                        console.error(`Erro ao inserir o ingrediente ${i + 1}:`, error);
                    }
                }
            }

            // const transporter = nodemailer.createTransport({
            //     service: 'gmail',  // ou outro serviço de e-mail como SMT
            //     auth: {
            //       user: 'comoquefazofficial@gmail.com', 
            //       pass: 'OsBigodudos@24'
            //     }
            //   });

              
            // let buscarUsu = usuarioModel.findUserById(req.session.autenticado.id);
               
            //   // Função que envia o e-mail
            //   async function Noticacaopost (buscarUsu.Email, req.body.dica_titulo ) {
            //     try {
            //       const info = await transporter.sendMail({
            //         from: '"Nome do seu site" <seuemail@gmail.com>', // remetente
            //         to: userEmail, // destinatário
            //         subject: 'Confirmação de Postagem', // assunto do e-mail
            //         text: `Seu post com o título "${postTitle}" foi publicado com sucesso!`, // corpo do e-mail em texto
            //       });
            //     }};

            console.log("Postagem e ingredientes realizados com sucesso!", postagemId);

            if (req.body.pergunta_id) {
                const respostaDica = {
                    Perguntas_ID_Pergunta: req.body.pergunta_id,
                    Clientes_idClientes: req.session.autenticado.id,
                    Conteudo_ID_Dica: postagemId
                };
                try {
                    await conteudoModel.CriarRespostaDica(respostaDica);
                    console.log("Vínculo com a pergunta criado na tabela respostas_dica!");
                } catch (error) {
                    console.error("Erro ao criar vínculo na tabela respostas_dica:", error);
                }
            }

            req.session.notification = {
                titulo: "Postagem realizada!",
                mensagem: "Sua dica foi publicada com sucesso!",
                tipo: "success"
            };

            if (req.body.pergunta_id) {
                return res.redirect("/pergunta/" + req.body.pergunta_id);
            }

            return res.redirect("/perfil");
        } catch (e) {
            console.log(e);
            res.render("pages/template", {
                pagina: { cabecalho: "cabecalho", conteudo: "Perfil", rodape: "rodape" },
                usuario_logado: req.session.autenticado,
                listaErrosCad: null,
                listaErroslog: null,
                dadosNotificacao: {
                    titulo: "Erro ao realizar a postagem!",
                    mensagem: "Verifique os valores digitados em rascunhos!",
                    tipo: "error"
                },
            });
            console.log("Erro ao realizar a postagem!");
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
            categorias_idCategorias: categoriaId
        };

        try {
            let create = conteudoModel.CriarPergunta(FormCriarPergunta);
            console.log("Pergunta realizada!");

            req.session.notification = {
                titulo: "Pergunta realizada!",
                mensagem: "Sua pergunta foi publicada com sucesso!",
                tipo: "success"
            };
            return res.redirect("/perfil");
        } catch (error) {
            console.error('Erro ao criar pergunta:', error);
            res.redirect('/');
        }
    },
    // DENÚNCIAS / ADM
    listarDenuncias: async (req, res) => {
        try {
            results = await admModel.mostrarDenuncias();

            return {
                denunciasNoControl: results,
                usuario_logado: req.session.autenticado
            };

        } catch (e) {
            console.log(e);
            res.json({ erro: "Falha ao acessar dados" });
        }
    },
    armazenarDenuncia: async (req, res) => {
        try {
            const dadosForm = {
                motivo: req.body.motivo,
                detalhamento_denuncia: req.body.detalhamento_denuncia,
                autor_denuncia: req.session.autenticado.Nickname
            };

            const postagemId = req.params.id;
            const postagem = await conteudoModel.BuscarPostagemPorId(postagemId);

            dadosForm.conteudo_postagem_ID_conteudo = postagem.ID_conteudo;

            const criador = await admModel.acharClienteCriadorDenuncia(postagemId);
            dadosForm.usuario_denunciado = criador.Nickname;

            const [categoriaResult] = await admModel.categoriaDenuncia(postagemId);

            if (!categoriaResult) {
                return res.status(500).send('Erro ao buscar a categoria do conteúdo.');
            }

            dadosForm.categoria = categoriaResult.Categorias_idCategorias;

            const resultadoDenuncia = await admModel.criarDenuncia(dadosForm);

            if (resultadoDenuncia) {
                res.status(200).send('Denúncia recebida com sucesso!');
            } else {
                res.status(500).send('Erro ao enviar denúncia');
            }
        } catch (error) {
            console.error('Erro ao armazenar denúncia:', error);
            res.status(500).send('Erro ao enviar denúncia');
        }
    },
    listarUsuarios: async (req, res) => {
        try {
            const results = await admModel.mostrarUsuarios();

            return {
                usuariosNoControl: results,
                usuario_logado: req.session.autenticado
            };

        } catch (error) {
            console.error('Erro ao armazenar denúncia:', error);
        }
    },
    listarPostagens: async (req, res) => {
        try {
            const results = await admModel.mostrarPostagens();

            return {
                PostagensNoControl: (results),
                usuario_logado: req.session.autenticado
            };

        } catch (error) {
            console.error('Erro ao armazenar denúncia:', error);
        }
    },
    // PERFIL
    MostrarProprioPerfil: async (req, res) => {
        try {
            const idCliente = req.session.autenticado.id;
            const perfil = await conteudoModel.obterPerfil(idCliente);

            if (!perfil) {
                return res.status(404).json({
                    mensagem: "Perfil não encontrado.",
                    usuario_logado: req.session.autenticado,
                });
            }

            perfil.foto_icon_perfil = perfil.foto_icon_perfil ? `data:image/png;base64,${perfil.foto_icon_perfil.toString('base64')}` : null;
            perfil.foto_banner_perfil = perfil.foto_banner_perfil ? `data:image/png;base64,${perfil.foto_banner_perfil.toString('base64')}` : null;

            req.session.autenticado.foto = perfil.foto_icon_perfil;

            return {
                perfil,
                usuario_logado: req.session.autenticado
            };
        } catch (error) {
            console.error("Erro ao exibir perfil:", error);
            return { status: 500, erro: error.message };
        }
    },
    EditarPerfil: async (req, res) => {
        try {
            const { editar_confirmar_senha, editar_nome_usuario, editar_biografia, editar_nome_site, editar_url_site, editar_img_icon, editar_img_banner } = req.body || {};

            if (!req.session.autenticado || !req.session.autenticado.id) { // Verifica se o usuário está autenticado
                console.log("Erro! 1");
                return res.redirect("/perfil");
            }
            console.log("usuario pesquisado: ", req.session.autenticado.id);
            const user = await usuarioModel.findUserById(req.session.autenticado.id); // Busca os dados atuais do usuário no banco de dados
            if (!user) {
                console.log("Usuário não encontrado");
                return res.redirect("/perfil");
            }

            const senhaCorreta = bcrypt.compareSync(editar_confirmar_senha, user.senha); // Confirma a senha fornecida
            if (!senhaCorreta) {
                console.log("Senha Incorreta");
                return res.redirect("/perfil");
            };

            if (editar_nome_usuario) {
                const nicknameExistente = await usuarioModel.findUserByNickname(editar_nome_usuario);

                if (nicknameExistente && nicknameExistente.idClientes !== user.idClientes) {
                    console.log("Nickname já está em uso");
                    req.session.notification = {
                        titulo: "Erro ao atualizar!",
                        mensagem: "O nome de usuário já está em uso por outra conta.",
                        tipo: "error"
                    };
                    return res.redirect("/perfil");
                }
            }

            const updateData = {}; // Objeto com os dados de perfil a serem atualizados
            if (editar_nome_usuario) updateData.Nickname = editar_nome_usuario;
            if (editar_biografia) updateData.Biografia = editar_biografia;
            if (editar_nome_site) updateData.nome_do_site = editar_nome_site;
            if (editar_url_site) updateData.url_do_site = editar_url_site;

            if (req.filePerfil) {
                updateData.foto_icon_perfil = req.filePerfil.buffer;
            }
            if (req.fileBanner) {
                updateData.foto_banner_perfil = req.fileBanner.buffer;
            }
            await conteudoModel.atualizarPerfil(req.session.autenticado.id, updateData); // Atualiza o perfil do usuário no banco de dados

            if (editar_nome_usuario) {
                req.session.autenticado.autenticado = editar_nome_usuario;
            }

            req.session.notification = {
                titulo: "Perfil atualizado!",
                mensagem: "Seu perfil foi atualizado com sucesso!",
                tipo: "success"
            };
            return res.redirect("/perfil");

        } catch (error) {
            console.log("Erro ao editar perfil!");
            return res.redirect("/perfil");
        }
    },
    AbrirPerfil: async (req, res) => {
        try {
            const nickname = req.params.nickname; // Obter o ID do usuário da URL
            const perfil = await conteudoModel.obterPerfilPorNickname(nickname); // Usar a função de modelo para obter o perfil

            if (!perfil) {
                return res.status(404).json({
                    mensagem: "Perfil não encontrado.",
                    usuario_logado: req.session.autenticado,
                });
            }

            if (req.session.autenticado.autenticado === nickname) {
                return res.redirect("/perfil");
            }

            perfil.foto_icon_perfil = perfil.foto_icon_perfil ? `data:image/png;base64,${perfil.foto_icon_perfil.toString('base64')}` : null;
            perfil.foto_banner_perfil = perfil.foto_banner_perfil ? `data:image/png;base64,${perfil.foto_banner_perfil.toString('base64')}` : null;

            // Pegar postagens e total de postagens
            const pagina = parseInt(req.query.pagina) || 1;
            const regPagina = 12;
            const inicio = (pagina - 1) * regPagina;

            let results = await conteudoModel.PesquisarPostsPerfil(perfil.idClientes, inicio, regPagina);
            let totReg = await conteudoModel.TotalRegPerfil(perfil.idClientes);
            let totalRegistros = totReg[0].total;

            // Paginador
            let totPaginas = Math.ceil(totalRegistros / regPagina);
            let paginador = totalRegistros <= regPagina ? null : {
                "pagina_atual": pagina,
                "total_reg": totalRegistros,
                "total_paginas": totPaginas
            };

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
            }

            // Formatar o conteúdo das postagens
            let combinedConteudo = await Promise.all(results.map(async (conteudo) => {
                let ingredientes = await conteudoModel.BuscarIngredientesPorPostagemId(conteudo.id);
                let mediaAvaliacoes = await conteudoModel.CalcularMediaAvaliacoes(conteudo.id);
                return {
                    nome: conteudo.Titulo,
                    usuario: conteudo.Clientes_idClientes,
                    nome_usuario: conteudo.nome_usuario,
                    id: conteudo.id,
                    categoria: conteudo.Categorias_idCategorias,
                    tempo: conteudo.tempo ? formatarTempo(conteudo.tempo) : null,
                    descricao: conteudo.Descricao || null,
                    etapas: conteudo.Etapas_Modo_de_Preparo,
                    porcoes: conteudo.porcoes > 0 ? `${conteudo.porcoes} ${conteudo.porcoes > 1 ? 'Porções' : 'Porção'}` : null,
                    tipo: conteudo.tipo,
                    subcategorias: conteudo.subcategorias,
                    ingredientes: ingredientes.length ? ingredientes.map(i => i.ingredientes).join(', ') : null,
                    mediaAvaliacoes,
                    imagem: conteudo.idMidia ? `data:image;base64,${conteudo.idMidia.toString('base64')}` : null
                };
            }));

            return res.render("pages/template", {
                pagina: { cabecalho: "cabecalho", conteudo: "Perfil", rodape: "rodape" },
                perfil,
                postagens: combinedConteudo,
                paginador: paginador,
                total_postagens: totalRegistros,
                usuario_logado: req.session.autenticado
            });
        } catch (error) {
            console.error("Erro ao abrir perfil:", error);
            return res.status(500).json({ erro: error.message });
        }
    },
    // PREMIUM
    MostrarPlanos: async (req, res) => {
        const Planos = await conteudoModel.obterPerfilPorNickname(nickname);
    }
};


module.exports = tarefasController;