var express = require('express');
var router = express.Router();

// Links & Template - Parte Publica
router.get("/", function (req, res) {
    res.render("pages/template", {pagina: {cabecalho: "cabecalho", conteudo: "index", rodape: "rodape"}, logado:null});
});
    router.get("/login", function (req, res) {
        res.render("pages/template", {
            pagina: {cabecalho: "cabecalho", conteudo: "Fazer-Login", rodape: "rodape"}, logado:null});
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


var fabricaDeConexao = require("../../config/connection_factory");
var conexao = fabricaDeConexao;


module.exports = router;