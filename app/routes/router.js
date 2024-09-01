var express = require('express');

var router = express.Router();
const moment = require("moment");

const tarefasController = require("../controllers/controller");
const { VerificarAutenticacao, limparSessao, gravarUsuAutenticado, verificarUsuAutorizado } = require("../models/autenticator-middleware");

router.post("/login", tarefasController.regrasValidacaoLogin, gravarUsuAutenticado, tarefasController.Login_formLogin);
router.post("/cadastro", tarefasController.regrasValidacaoCadastro, tarefasController.Login_formCadastro);
router.post('/criar-dica', VerificarAutenticacao, tarefasController.CriarDica);
router.post('/criar-pergunta', VerificarAutenticacao, tarefasController.CriarPergunta);


// Links & Template - Parte Publica
router.get("/", VerificarAutenticacao, async function (req, res) {
    try {
        const data = await tarefasController.MostrarPosts(req, res);
        res.render("pages/template",
            {
                pagina: { cabecalho: "cabecalho", conteudo: "index", rodape: "rodape" },
                ...data
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

router.get("/perfil", VerificarAutenticacao, verificarUsuAutorizado([1, 2], "/"), function (req, res) {
    res.render("pages/template", {
        pagina: { cabecalho: "cabecalho", conteudo: "Meu-perfil", rodape: "none" },
        usuario_logado: req.session.autenticado,
    });
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
router.get("/ajustes", verificarUsuAutorizado([1, 2], "/"), function (req, res) {
    res.render("pages/template", {
        pagina: { cabecalho: "cabecalho", conteudo: "Ajustes", rodape: "none" },
        usuario_logado: req.session.autenticado,
    });
});


router.get("/sair", function (req, res) {
    res.render("pages/template", {
        pagina: { cabecalho: "none", conteudo: "sair", rodape: "none" },
        usuario_logado: req.session.autenticado,
    });
});
router.get("/sair-da-conta", limparSessao, function (req, res) {
    res.redirect("/");
});

router.get("/criar-postagem", VerificarAutenticacao, function (req, res) {
    res.render("pages/template", {
        pagina: { cabecalho: "none", conteudo: "sair", rodape: "none" },
        usuario_logado: req.session.autenticado,
    });
});
router.get("/criar-pergunta", VerificarAutenticacao, function (req, res) {
    res.render("pages/template", {
        pagina: { cabecalho: "none", conteudo: "sair", rodape: "none" },
        usuario_logado: req.session.autenticado,
    });
});
router.get("/dica/:id", async function (req, res) {
    await tarefasController.BuscarPostagemPorId(req, res);
});
router.get("/pergunta/:id", async function (req, res) {
    await tarefasController.BuscarPostagemPorId(req, res);
});
router.get("/login", function (req, res) {
    res.render("pages/template", {
        pagina: { cabecalho: "cabecalho", FormCadastro: "template_cadastro", FormLogin: "template_login", conteudo: "Fazer-Login", rodape: "rodape" },
        usuario_logado: req.session.autenticado,
        listaErroslog: null,
        listaErros: null,
        dadosNotificacao: null
    });
});

router.get("/bigodes-de-ouro", function (req, res) {
    res.render("pages/template", {
        pagina: { cabecalho: "cabecalho", conteudo: "premium", rodape: "rodape" },
        usuario_logado: req.session.autenticado
    });
});


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

router.get("/adm/postagens-perguntas", verificarUsuAutorizado([2], "/sair"),
    function (req, res) {
        res.render("pages/template-adm",
            {
                pagina: { cabecalho: "administrar/menu-administrativo", conteudo: "administrar/paginas/adm-postagens" },
                usuario_logado: req.session.autenticado
            });
    });
router.get("/adm/usuarios", verificarUsuAutorizado([2], "/sair"),
    function (req, res) {
        res.render("pages/template-adm",
            {
                pagina: { cabecalho: "administrar/menu-administrativo", conteudo: "administrar/paginas/adm-usuarios" },
                usuario_logado: req.session.autenticado
            });
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