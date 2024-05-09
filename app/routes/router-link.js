var express = require('express');
var router = express.Router();


// Links Páginas Administrativas - Inicio
router.get("/adm/administrativa", function (req, res) {
    res.render("pages/template-adm", {pagina: {cabecalho: "menu-administrativo", conteudo: "administrativa"}, logado:null});
});
router.get('/adm/adm-denuncias', function(req, res){
    res.render('partial/administrar/adm-denuncias.ejs'); 
});
router.get('/adm/adm/adm-postagens', function(req, res){
    res.render('partial/administrar/adm-postagens.ejs'); 
});
router.get('/adm/adm-usuarios', function(req, res){
    res.render('partial/administrar/adm-usuarios.ejs'); 
});
router.get('/adm/adm-premium', function(req, res){
    res.render('partial/administrar/adm-premium.ejs'); 
});
router.get('/adm/adm-banners', function(req, res){
    res.render('partial/administrar/adm-banners.ejs'); 
});
// Links Páginas Administrativas - Fim

// Template do menu administrativo - Inicio
router.get("/administrativa", function (req, res) {
    res.render("partial/menu-administrativo", {pagina:"administrativa", logado:null});
});
router.get("/adm-denuncias", function (req, res) {
    res.render("partial/menu-administrativo", {pagina:"adm-denuncias", logado:null});
});
router.get("/adm-postagens", function (req, res) {
    res.render("partial/menu-administrativo", {pagina:"adm-postagens", logado:null});
});
router.get("/adm-usuarios", function (req, res) {
    res.render("partial/menu-administrativo", {pagina:"adm-usuarios", logado:null});
});
router.get("/adm-premium", function (req, res) {
    res.render("partial/menu-administrativo", {pagina:"adm-premium", logado:null});
});
router.get("/adm-banners", function (req, res) {
    res.render("partial/menu-administrativo", {pagina:"adm-banners", logado:null});
});
// Template do menu administrativo - Fim

module.exports = router;