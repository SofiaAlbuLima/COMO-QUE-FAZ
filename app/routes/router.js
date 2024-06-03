var express = require('express');
var router = express.Router();
const moment = require("moment");
const {body, validationResult} = require("express-validator");
const tarefasController = require("../controllers/controller");

// Links & Template - Parte Publica
router.get("/", function (req, res) {
    // tarefasController.listarTarefasPaginadas(req, res);
    res.render("pages/template", {pagina: {cabecalho: "cabecalho", conteudo: "index", rodape: "rodape"}, logado:null});
});
    router.get("/login",
//validação
    //router.post('/Fazer-login', 
      //body('input1').isEmail(),
         //with.Message("Insira um email válido!")
      //body('input2').isLength({ min: 8 , max: 60 })
        //with.Message("A senha deve ter no minimo 8 caracteres")
     function (req, res) {
        //const errors = validationResult(req);
        //if(!errors.isEmpty()) {
            //console.log(errors);
            //return res.render("pages/template", {"erros": errors, "valores":req.body, "retorno": null});
       // }
        res.render("pages/template", 
       // {"erros": null, "valores": {"input1": "", "input2": ""} ,"retorno": null}
        { pagina: {cabecalho: "cabecalho", conteudo: "Fazer-Login", rodape: "rodape"}, logado:null});
    });
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