var express = require('express');

var router = express.Router();
const moment = require("moment");

const tarefasController = require("../controllers/controller");
const { VerificarAutenticacao, limparSessao, gravarUsuAutenticado, verificarUsuAutorizado } = require("../models/autenticator-middleware");

    router.post("/login", tarefasController.regrasValidacaoLogin, gravarUsuAutenticado, tarefasController.Login_formLogin);
    router.post("/cadastro", tarefasController.regrasValidacaoCadastro, tarefasController.Login_formCadastro);
    router.post('/criar-dica', tarefasController.CriarDica);

// Links & Template - Parte Publica
    router.get("/", VerificarAutenticacao, function (req, res) {
        tarefasController.MostrarPosts(req, res);
    });

    router.get("/dica", function(req, res) {
        res.render("pages/template", {pagina: {cabecalho: "cabecalho", conteudo: "Base-Dica", rodape: "rodape"}, 
        usuario_logado:req.session.autenticado, 
        });
    });

    router.get("/pergunta", function(req, res) {
        res.render("pages/template", {pagina: {cabecalho: "cabecalho", conteudo: "Base-Pergunta", rodape: "rodape"}, 
        usuario_logado:req.session.autenticado, 
        });
    });

    router.get("/culinaria", function(req, res) {
        res.render("pages/template", {pagina: {cabecalho: "cabecalho", conteudo: "Categoria-Culinária", rodape: "rodape"}, 
        usuario_logado:req.session.autenticado, 
        });
    });
    router.get("/limpeza", function(req, res) {
        res.render("pages/template", {pagina: {cabecalho: "cabecalho", conteudo: "Categoria-Limpeza", rodape: "rodape"}, 
        usuario_logado:req.session.autenticado, 
        });
    });
    router.get("/bem-estar", function(req, res) {
        res.render("pages/template", {pagina: {cabecalho: "cabecalho", conteudo: "Categoria-Bem-Estar", rodape: "rodape"}, 
        usuario_logado:req.session.autenticado, 
        });
    });

    router.get("/perfil", verificarUsuAutorizado([1, 2], "/"), function(req, res) {
        res.render("pages/template", {pagina: {cabecalho: "cabecalho", conteudo: "Meu-perfil", rodape: "rodape"}, 
        usuario_logado:req.session.autenticado, 
        });
    });
    router.get("/notificacoes", verificarUsuAutorizado([1, 2], "/"), function(req, res) {
        res.render("pages/template", {pagina: {cabecalho: "cabecalho", conteudo: "Minhas-Notificações", rodape: "rodape"}, 
        usuario_logado:req.session.autenticado, 
        });
    });
    router.get("/favoritos", verificarUsuAutorizado([1, 2], "/"), function(req, res) {
        res.render("pages/template", {pagina: {cabecalho: "cabecalho", conteudo: "Meus-Favoritos", rodape: "rodape"}, 
        usuario_logado:req.session.autenticado, 
        });
    });

    router.get("/sair", function(req, res){
        res.render("pages/template", {pagina: {cabecalho: "none", conteudo: "sair", rodape: "none"}, 
            usuario_logado:req.session.autenticado, 
            });
    });
    router.get("/sair-da-conta", limparSessao, function (req, res) {
        res.redirect("/");
    });

    router.get("/criar-postagem", function(req, res){
        res.render("pages/template", {pagina: {cabecalho: "none", conteudo: "sair", rodape: "none"}, 
            usuario_logado:req.session.autenticado, 
            });
    });
    router.get("/criar-pergunta", function(req, res){
        res.render("pages/template", {pagina: {cabecalho: "none", conteudo: "sair", rodape: "none"}, 
            usuario_logado:req.session.autenticado, 
            });
    });

    router.get("/login", function (req, res) {
        res.render("pages/template", {pagina: {cabecalho: "cabecalho", conteudo: "Fazer-Login", rodape: "rodape"}, 
            usuario_logado:req.session.autenticado, 
            listaErros: null,
            dadosNotificacao:null});
    });
    
    router.get("/bigodes-de-ouro", function (req, res) {
        res.render("pages/template", {
            pagina: {cabecalho: "cabecalho", conteudo: "premium", rodape: "rodape"}, 
            usuario_logado:req.session.autenticado
        });
    });

    
// Links & Template - Parte Administrativa
    router.get("/adm", verificarUsuAutorizado([2], "/sair"), 
        function (req, res) {
            res.render("pages/template-adm", 
            {pagina: {cabecalho: "administrar/menu-administrativo", conteudo: "administrar/paginas/administrativa"}, 
            usuario_logado: req.session.autenticado});
        });
        
    router.get("/adm/denuncias", verificarUsuAutorizado([2], "/sair"), 
        function (req, res) {
            res.render("pages/template-adm",
            {pagina: {cabecalho: "administrar/menu-administrativo", conteudo: "administrar/paginas/adm-denuncias"}, 
            usuario_logado:req.session.autenticado});
    });
    router.get("/adm/postagens-perguntas", verificarUsuAutorizado([2], "/sair"), 
        function (req, res) {
            res.render("pages/template-adm", 
            {pagina: {cabecalho: "administrar/menu-administrativo", conteudo: "administrar/paginas/adm-postagens"}, 
            usuario_logado:req.session.autenticado});
    });
    router.get("/adm/usuarios", verificarUsuAutorizado([2], "/sair"), 
        function (req, res) {
            res.render("pages/template-adm", 
            {pagina: {cabecalho: "administrar/menu-administrativo", conteudo: "administrar/paginas/adm-usuarios"}, 
            usuario_logado:req.session.autenticado});
    });
    router.get("/adm/acesso-premium", verificarUsuAutorizado([2], "/sair"), 
        function (req, res) {
            res.render("pages/template-adm", 
            {pagina: {cabecalho: "administrar/menu-administrativo", conteudo: "administrar/paginas/adm-premium"}, 
            usuario_logado:req.session.autenticado});
    });
    router.get("/adm/marketing-banners", verificarUsuAutorizado([2], "/sair"), 
        function (req, res) {
            res.render("pages/template-adm", 
            {pagina: {cabecalho: "administrar/menu-administrativo", conteudo: "administrar/paginas/adm-banners"}, 
            usuario_logado:req.session.autenticado});
    });


module.exports = router;