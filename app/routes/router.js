var express = require('express');
var router = express.Router();


router.get("/", function (req, res) {
    res.render("pages/template", {pagina: {cabecalho : "cabecalho", conteudo: "index",rodape: "rodape"}, logado:null});
});


var fabricaDeConexao = require("../../config/connection_factory");
var conexao = fabricaDeConexao

router.get('/', function(req, res){
    res.render('partial/index');
});



module.exports = router;