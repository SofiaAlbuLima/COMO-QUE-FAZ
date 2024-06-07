// Responsável por receber as entradas do usuário, interpretá-las e acionar ações adequadas no modelo e na visualização

const Model = require("../models/model-usuario"); //Requisição do arquivo Model para executar ações no Banco de Dados
const moment = require("moment"); //datas e horas bonitinhas


const tarefasController = {


    regrasValidacaoLogin:[
         body('input1')
         .isEmail().with.Message("Insira um e-mail válido!"),
         body('input2')
         .isLength({ min: 8 , max: 60 }).with.Message("A senha deve ter no minimo 8 caracteres")
    ],
    regrasValidacaoCadastro:[
        //gab aqui q vc cria as regras :)
       
    ],
    Login_formLogin: async (req, res) => {
        res.locals.moment = moment;
        try {
            const erros = validationResult(req);
            if (!erros.isEmpty()) {
                return res.render("pages/template", { pagina: {cabecalho: "cabecalho", conteudo: "Fazer-Login", rodape: "rodape"}, logado:null, listaErros: erros});
            }
            if (req.session.autenticado != null) {
                res.redirect("/");
            }
            else {
                res.render("partial/paginas/login", { listaErros: erros })
            }

        } catch (e) {
            console.log(e); 
        }
    },


    Index_mostrarPosts: async (req, res) => {
        res.locals.moment = moment;
        try {
            res.render("pages/template", {pagina: {cabecalho: "cabecalho", conteudo: "index", rodape: "rodape"}, logado:null});
        } catch (e) {
            console.log(e); 
        }
    }
    

};


module.exports = tarefasController;