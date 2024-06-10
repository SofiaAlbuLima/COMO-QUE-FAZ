var express = require('express');

var router = express.Router();
const moment = require("moment");

const tarefasController = require("../controllers/controller");
const { VerificarAutenticacao, limparSessao, gravarUsuAutenticado } = require("../models/autenticator-middleware");

// Links & Template - Parte Publica
    router.get("/", VerificarAutenticacao, function (req, res) {
        tarefasController.Index_mostrarPosts(req, res);
    });
    
    router.get("/sair", function (req, res) {
        res.redirect("/");
    });

    router.get("/login", function (req, res) {
        res.render("pages/template", {pagina: {cabecalho: "cabecalho", conteudo: "Fazer-Login", rodape: "rodape"}, 
            logado:null, 
            listaErros: null});
    });

    router.post("/login", tarefasController.regrasValidacaoLogin, gravarUsuAutenticado, tarefasController.Login_formLogin);
    router.post("/cadastro", tarefasController.regrasValidacaoCadastro, tarefasController.Login_formCadastro);
    
    router.get("/bigodes-de-ouro", function (req, res) {
        res.render("pages/template", {
            pagina: {cabecalho: "cabecalho", conteudo: "premium", rodape: "rodape"}, logado:null});
    });

// Links & Template - Parte Administrativa
router.get("/adm", function (req, res) {
    res.render("pages/template-adm", {pagina: {cabecalho: "administrar/menu-administrativo", conteudo: "administrar/paginas/administrativa"}, logado:null});
});
    router.get("/adm/denuncias", function (req, res) {
        res.render("pages/template-adm", {pagina: {cabecalho: "administrar/menu-administrativo", conteudo: "administrar/paginas/adm-denuncias"}, logado:null});
    });
    router.get("/adm/postagens-perguntas", function (req, res) {
        res.render("pages/template-adm", {pagina: {cabecalho: "administrar/menu-administrativo", conteudo: "administrar/paginas/adm-postagens"}, logado:null});
    });
    router.get("/adm/usuarios", function (req, res) {
        res.render("pages/template-adm", {pagina: {cabecalho: "administrar/menu-administrativo", conteudo: "administrar/paginas/adm-usuarios"}, logado:null});
    });
    router.get("/adm/acesso-premium", function (req, res) {
        res.render("pages/template-adm", {pagina: {cabecalho: "administrar/menu-administrativo", conteudo: "administrar/paginas/adm-premium"}, logado:null});
    });
    router.get("/adm/marketing-banners", function (req, res) {
        res.render("pages/template-adm", {pagina: {cabecalho: "administrar/menu-administrativo", conteudo: "administrar/paginas/adm-banners"}, logado:null});
    });


module.exports = router;