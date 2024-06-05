// Responsável por receber as entradas do usuário, interpretá-las e acionar ações adequadas no modelo e na visualização

const Model = require("../models/model"); //Requisição do arquivo Model para executar ações no Banco de Dados
const moment = require("moment"); //datas e horas bonitinhas


const tarefasController = {

    // iniciarTarefa: async (req,res) =>{ //funções que executarão as funcionalidades previstas pelo sistema.​
    //     let { id } = req.query;
    //     try {
    //         results = await tarefasModel.situacaoTarefa(1, id);
    //     } catch (e){
    //         console.log(e);
    //         res.json({ erro: "Falha ao acessar dados"});
    //     }
    //     let url = req.rawHeaders[25];
    //     let urlChamadora = url.replace("https://localhost:3000", "");
    //     res.redirect(urlChamadora);
    // },

    regrasValidacao:[
        //gab aqui q vc cria as regras :)
       
    ],

    Index_mostrarPosts: async (req, res) => {
        res.locals.moment = moment;
        try {
            res.render("pages/template", {pagina: {cabecalho: "cabecalho", conteudo: "index", rodape: "rodape"}, logado:null});
        } catch (e) {
            console.log(e); 
        }
    },
    Login_formLogin: async (req, res) => {
        res.locals.moment = moment;
        try {
            res.render("pages/template", { pagina: {cabecalho: "cabecalho", conteudo: "Fazer-Login", rodape: "rodape"}, logado:null});
        } catch (e) {
            console.log(e); 
        }
    }

};


module.exports = tarefasController;