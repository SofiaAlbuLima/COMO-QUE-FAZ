var express = require('express');
const passport = require('passport');

var router = express.Router();

const moment = require("moment");

const tarefasController = require("../controllers/controller");
const { VerificarAutenticacao, limparSessao, gravarUsuAutenticado, verificarUsuAutorizado } = require("../models/autenticator-middleware");

const uploadFile = require("../util/uploader");
const uploadPerfil = require("../util/uploader-perfil");

router.post("/login", tarefasController.regrasValidacaoLogin, gravarUsuAutenticado, tarefasController.Login_formLogin);
router.post("/cadastro", tarefasController.regrasValidacaoCadastro, tarefasController.Login_formCadastro);
router.post('/criar-dica', uploadFile("imagem_criar_post"), VerificarAutenticacao, tarefasController.CriarDica);
router.post('/criar-pergunta', VerificarAutenticacao, tarefasController.CriarPergunta);


router.post('/adicionar-favorito', tarefasController.adicionarFavorito);
router.delete('/remover-favorito', tarefasController.removerFavorito);
router.get('/favoritos', tarefasController.listarFavoritos);

router.post('/editar-perfil',
    VerificarAutenticacao,
    verificarUsuAutorizado([1, 2], "/"),
    tarefasController.regrasValidacaoEditarPerfil,
    uploadPerfil("editar_img_icon", "editar_img_banner"),
    tarefasController.EditarPerfil
);

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
        const { usuario, autenticado } = req.user; 

        req.session.autenticado = autenticado; 

        console.log("Usuário autenticado:", req.user); 
        res.redirect('/');
    }
);


// Links & Template - Parte Publica
router.get("/", VerificarAutenticacao, async function (req, res) {
    try {
        const data = await tarefasController.MostrarPosts(req, res);
        res.render("pages/template",
            {
                pagina: { cabecalho: "cabecalho", conteudo: "index", rodape: "rodape" },
                ...data,
                usuario_logado: req.session.autenticado 
            });
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

router.get("/pergunta", function (req, res) {
    res.render("pages/template", {
        pagina: { cabecalho: "cabecalho", conteudo: "Base-Pergunta", rodape: "rodape" },
        usuario_logado: req.session.autenticado,
    });
});

router.get("/pesquisa", async (req, res) => {
    try {
        const categoriaId = null;
        const data = await tarefasController.PesquisarPosts(req, res, categoriaId);

        res.render("pages/template", {
            pagina: { cabecalho: "cabecalho", conteudo: "pesquisa", rodape: "rodape" },
            ...data
        });
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

router.get("/patinhas/:IdPostagem", tarefasController.MostrarPatinhas);

router.post("/avaliar", VerificarAutenticacao, async (req, res) => {
    await tarefasController.AvaliarPostagem(req, res);
});

router.get("/culinaria", async function (req, res) {
    try {
        const categoriaId = 1;
        const data = await tarefasController.MostrarPosts(req, res, categoriaId);
        res.render("pages/template",
            {
                pagina: { cabecalho: "cabecalho-culinaria", conteudo: "Categoria-Culinária", rodape: "rodape" },
                ...data
            });
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});
router.get("/limpeza", async function (req, res) {
    try {
        const categoriaId = 2;
        const data = await tarefasController.MostrarPosts(req, res, categoriaId);
        res.render("pages/template",
            {
                pagina: { cabecalho: "cabecalho-limpeza", conteudo: "Categoria-Limpeza", rodape: "rodape" },
                ...data
            });
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});
router.get("/bem-estar", async function (req, res) {
    try {
        const categoriaId = 3;
        const data = await tarefasController.MostrarPosts(req, res, categoriaId);
        res.render("pages/template",
            {
                pagina: { cabecalho: "cabecalho-bemestar", conteudo: "Categoria-Bem-Estar", rodape: "rodape" },
                ...data
            });
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

router.get("/perfil",
    VerificarAutenticacao,
    verificarUsuAutorizado([1, 2], "/"),
    async (req, res) => {
        try {
            const perfilResponse = await tarefasController.MostrarProprioPerfil(req, res);
            const data = await tarefasController.MostrarPostagensPerfil(req, res);

            if (perfilResponse && perfilResponse.status !== 404) {
                res.render("pages/template", {
                    pagina: { cabecalho: "cabecalho", conteudo: "Perfil", rodape: "rodape" },
                    usuario_logado: req.session.autenticado,
                    perfil: perfilResponse.perfil || {},
                    dadosNotificacao: null,
                    ...data
                });
            } else {
                res.status(404).render("pages/template", {
                    pagina: { cabecalho: "cabecalho", conteudo: "Perfil", rodape: "rodape" },
                    usuario_logado: req.session.autenticado,
                    listaErros: ["Perfil não encontrado."],
                    dadosNotificacao: null,
                });
            }
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    });
router.get("/perfil/:nickname", VerificarAutenticacao, async function (req, res) {
    await tarefasController.AbrirPerfil(req, res);
});
router.get("/notificacoes", verificarUsuAutorizado([1, 2], "/"), function (req, res) {
    res.render("pages/template", {
        pagina: { cabecalho: "cabecalho", conteudo: "Minhas-Notificações", rodape: "none" },
        usuario_logado: req.session.autenticado,
    });
});
router.get("/favoritos", verificarUsuAutorizado([1, 2], "/"), function (req, res) {
    res.render("pages/template", {
        pagina: { cabecalho: "cabecalho", conteudo: "Meus-Favoritos", rodape: "none" },
        usuario_logado: req.session.autenticado,
    });
});
router.get("/configuracoes", verificarUsuAutorizado([1, 2], "/"), function (req, res) {
    res.render("pages/template", {
        pagina: { cabecalho: "cabecalho", conteudo: "Ajustes", rodape: "none" },
        usuario_logado: req.session.autenticado,
    });
});

router.get("/sair", VerificarAutenticacao, function (req, res) {
    res.render("pages/template", {
        pagina: { cabecalho: "none", conteudo: "sair", rodape: "none" },
        usuario_logado: req.session.autenticado,
    });
});
router.get("/sair-da-conta", limparSessao, function (req, res) {
    res.redirect("/");
});

router.get("/criar-dica", verificarUsuAutorizado([1, 2], "/"), function (req, res) {
    res.render("pages/template", {
        pagina: { cabecalho: "cabecalho", conteudo: "Criar-dica", rodape: "none" },
        usuario_logado: req.session.autenticado,
    });
});

router.get("/criar-pergunta-mob", verificarUsuAutorizado([1, 2], "/"), function (req, res) {
    res.render("pages/template", {
        pagina: { cabecalho: "cabecalho", conteudo: "Criar-pergunta", rodape: "none" },
        usuario_logado: req.session.autenticado,
    });
});

router.get("/criar-pergunta", VerificarAutenticacao, function (req, res) {
    res.render("pages/template", {
        pagina: { cabecalho: "cabecalho", conteudo: "Criar-pergunta", rodape: "none" },
        usuario_logado: req.session.autenticado,
    });
});
router.get("/dica/:id", async function (req, res) {
    await tarefasController.AbrirPostagem(req, res);
});

router.get("/pergunta/:id", async function (req, res) {
    await tarefasController.AbrirPostagem(req, res);
});
router.get("/login", function (req, res) {
    res.render("pages/template", {
        pagina: { cabecalho: "cabecalho", FormCadastro: "template_cadastro", FormLogin: "template_login", conteudo: "Fazer-Login", rodape: "rodape" },
        usuario_logado: req.session.autenticado,
        listaErroslog: null,
        listaErrosCad: null,
      
        dadosNotificacao: null
    });
});

router.get("/bigodes-de-ouro", function (req, res) {
    res.render("pages/template", {
        pagina: { cabecalho: "cabecalho", conteudo: "premium", rodape: "rodape" },
        usuario_logado: req.session.autenticado
    });
});
router.get("/pagamento", function (req, res) {
    res.render("pages/template", {
        pagina: { cabecalho: "cabecalho", conteudo: "pagamento", rodape: "none" },
        usuario_logado: req.session.autenticado
    });
});

router.post('/denunciar/:id', tarefasController.armazenarDenuncia);

// Links & Template - Parte Administrativa
router.get("/adm", verificarUsuAutorizado([2], "/sair"),
    function (req, res) {
        res.render("pages/template-adm",
            {
                pagina: { cabecalho: "administrar/menu-administrativo", conteudo: "administrar/paginas/administrativa" },
                usuario_logado: req.session.autenticado
            });
    });

router.get("/adm/denuncias", verificarUsuAutorizado([2], "/sair"),
    async function (req, res) {
        try {
            const data = await tarefasController.listarDenuncias(req, res);
            res.render("pages/template-adm",
                {
                    pagina: { cabecalho: "administrar/menu-administrativo", conteudo: "administrar/paginas/adm-denuncias" },
                    ...data
                });
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    });

router.get("/adm/usuarios", verificarUsuAutorizado([2], "/sair"),
    async function (req, res) {
        try {
            const data = await tarefasController.listarUsuarios(req, res);
            res.render("pages/template-adm",
                {
                    pagina: { cabecalho: "administrar/menu-administrativo", conteudo: "administrar/paginas/adm-usuarios" },
                    ...data
                });
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    });

router.get("/adm/postagens-perguntas", verificarUsuAutorizado([2], "/sair"),
    async function (req, res) {
        try {
            const data = await tarefasController.listarPostagens(req, res);
            res.render("pages/template-adm",
                {
                    pagina: { cabecalho: "administrar/menu-administrativo", conteudo: "administrar/paginas/adm-postagens" },
                    ...data
                });
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    });

router.get("/adm/acesso-premium", verificarUsuAutorizado([2], "/sair"),
    function (req, res) {
        res.render("pages/template-adm",
            {
                pagina: { cabecalho: "administrar/menu-administrativo", conteudo: "administrar/paginas/adm-premium" },
                usuario_logado: req.session.autenticado
            });
    });

router.get("/adm/marketing-banners", verificarUsuAutorizado([2], "/sair"),
    function (req, res) {
        res.render("pages/template-adm",
            {
                pagina: { cabecalho: "administrar/menu-administrativo", conteudo: "administrar/paginas/adm-banners" },
                usuario_logado: req.session.autenticado
            });
    });



module.exports = router;