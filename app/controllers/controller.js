// Responsável por receber as entradas do usuário, interpretá-las e acionar ações adequadas no modelo e na visualização

const usuarioModel = require("../models/model-usuario"); //Requisição do arquivo Model para executar ações no Banco de Dados
const conteudoModel = require("../models/model-conteudo");
const imagemModel = require("../models/model-midia");
const admModel = require("../models/model-adm");
const moment = require("moment"); //datas e horas bonitinhas
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(12);


const tarefasController = {

    regrasValidacaoLogin: [
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
    Login_formLogin: async (req, res) => {
        // Verificação de Erros de Validação
        const erros = validationResult(req);
        if (!erros.isEmpty()) {
            return res.render("pages/template", {
                pagina: { cabecalho: "cabecalho", conteudo: "Fazer-Login", FormCadastro: "template_cadastro", FormLogin: "template_login", rodape: "rodape" },
                usuario_logado: req.session.autenticado,
                listaErroslog: erros,
                listaErros: null,
                dadosNotificacao: null
            });
        }

        // Verificar se o usuário está autenticado
        if (req.session.autenticado && req.session.autenticado.autenticado) {
            return res.redirect("/"); // Redireciona se o usuário já estiver autenticado
        }

        // Renderizar a página de login se não houver erros e o usuário não estiver autenticado
        res.render("pages/template", {
            pagina: { cabecalho: "cabecalho", conteudo: "Fazer-Login", FormCadastro: "template_cadastro", FormLogin: "template_login", rodape: "rodape" },
            usuario_logado: null,
            listaErroslog: null,
            listaErros: null,
            dadosNotificacao: { titulo: "Falha ao logar!", mensagem: "Usuário e/ou senha inválidos!", tipo: "error" }
        });
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
                pagina: { cabecalho: "cabecalho", conteudo: "Fazer-Login", FormCadastro: "template_cadastro", FormLogin: "template_login", rodape: "rodape" },
                usuario_logado: req.session.autenticado,
                listaErros: erros,
                listaErroslog: null,
                dadosNotificacao: null
            });
        }
        try {
            let create = usuarioModel.create(dadosForm);
            console.log("cadastro realizado!");

            req.session.notification = {
                titulo: "Cadastro realizado!",
                mensagem: "Novo usuário criado com sucesso!",
                tipo: "success"
            };
            return res.redirect("/");
        } catch (e) {
            console.log(e);
            res.render("pages/template", {
                pagina: { cabecalho: "cabecalho", conteudo: "Fazer-Login", FormCadastro: "template_cadastro", FormLogin: "template_login", rodape: "rodape" },
                usuario_logado: req.session.autenticado,
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
    MostrarPosts: async (req, res, categoriaId = null) => {
        res.locals.moment = moment;
        try {

            const postagemId = req.params.id;
            const categoriaMap = {
                'culinaria': 1,
                'limpeza': 2,
                'bemestar': 3,
                'semmarca': null
            };
            const filtros = {
                recente: 'recente',
                'em-alta': 'em_alta',
                rapidos: 'rapidos',
            };
            let categoria = categoriaId || categoriaMap[req.query.categoria] || null;
            let filtro = req.query.filtro || 'em_alta';
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
                    ingredientes: ingredientes.length ? ingredientes.map(i => i.ingredientes).join(', ') : null
                };
            }));

            return {
                usuario_logado: req.session.autenticado,
                login: req.session.logado,
                postagens: combinedConteudo,
                paginador: paginador,
                categoriaAtual: categoria || 'todas',
                novoFiltro: filtro || 'em_alta'
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
            console.log(data);

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

            let combinedConteudo = data.map(conteudo => ({
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
                subcategorias: conteudo.subcategorias
            }));
            console.log(filtroTipo);
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

            if (!postagem) {
                return res.status(404).render("pages/erro", { mensagem: "Postagem não encontrada" });
            }

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
                subcategorias: postagem.subcategorias
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

            if (postagem.tipo === 'dica') {
                res.render("pages/template", {
                    pagina: { cabecalho: "cabecalho", conteudo: "Base-Dica", rodape: "rodape" },
                    postagem: postagemFormatada,
                    usuario_logado: req.session.autenticado
                });
            } else if (postagem.tipo === 'pergunta') {
                res.render("pages/template", {
                    pagina: { cabecalho: "cabecalho", conteudo: "Base-Pergunta", rodape: "rodape" },
                    postagem: postagemFormatada,
                    usuario_logado: req.session.autenticado
                });
            }
        } catch (erro) {
            res.status(500).json({ erro: erro.message });
        }
    },
    CriarDica: async (req, res) => {
        try {
            let categoriaId;
            let porcoes = null;
            const categoria = req.body.dica_categoria;

            if (categoria === "Culinária") {
                categoriaId = 1;
                porcoes = req.body.dica_porcoes;
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

            const subcategoriasTexto = req.body.dica_subcategorias || '';

            const FormCriarDica = {
                Clientes_idClientes: req.session.autenticado.id,
                Titulo: req.body.dica_titulo,
                Categorias_idCategorias: categoriaId,
                tempo: `${req.body.dica_tempo_horas.padStart(2, '0')}:${req.body.dica_tempo_minutos.padStart(2, '0')}:00`,
                porcoes: porcoes,
                Descricao: req.body.dica_descricao,
                Etapas_Modo_de_Preparo: etapasTexto,
                subcategorias: subcategoriasTexto
            };

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

            console.log("Postagem e ingredientes realizados com sucesso!", postagemId);

            req.session.notification = {
                titulo: "Postagem realizada!",
                mensagem: "Sua dica foi publicada com sucesso!",
                tipo: "success"
            };
            return res.redirect("/perfil");
        } catch (e) {
            console.log(e);
            res.render("pages/template", {
                pagina: { cabecalho: "cabecalho", conteudo: "meu-perfil", rodape: "rodape" },
                usuario_logado: req.session.autenticado,
                listaErros: e,
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

    listarDenuncias: async (req, res) => {
        try {
            categoria = req.query.categoria || null;
            results = await admModel.acharDenuncia();
            resultsconteudo = await admModel.acharConteudo(categoria);

            return {
                denunciasNoControl: results,
                resultsconteudo,
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
            };
    
            const postagemId = req.params.id;
    
            // Buscar os dados da postagem
            const postagem = await conteudoModel.BuscarPostagemPorId(postagemId);
    
            if (!postagem) {
                return res.status(404).render("pages/erro", { mensagem: "Postagem não encontrada" });
            }
    
            // Buscar o criador da postagem
            const criador = await admModel.acharClienteCriadorDenuncia(postagemId);
            dadosForm.usuario_denunciado = criador.Nickname;
    
            // Buscar a categoria da postagem
            const [categoriaResult] = await admModel.categoriaDenuncia(postagemId);
            
            // Verifica se a categoria foi encontrada
            if (!categoriaResult) {
                return res.status(500).send('Erro ao buscar a categoria do conteúdo.');
            }
    
            // Atribuir a categoria ao formulário
            dadosForm.categoria = categoriaResult.Categorias_idCategorias;
    
            // Criar a denúncia com os dados do formulário
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
    }
    
    
};


module.exports = tarefasController;