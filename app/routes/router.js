var express = require('express');
var router = express.Router();


router.get("/", function (req, res) {
    res.render("pages/template-home", {pagina:"index", logado:null});
});



var fabricaDeConexao = require("../../config/connection_factory");
var conexao = fabricaDeConexao

router.get('/', function(req, res){
    res.render('pages/index');
});

module.exports = router;