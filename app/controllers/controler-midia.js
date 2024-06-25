const imagemModel = require("../models/model-midia");
const multer = require('multer');
const path = require('path');

// Configurando o armazenamento de arquivos
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads-midia-banco/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

const imagemController = {

    uploadImagem: upload.single('imagem'),

    criarImagem: async (req, res) => {
        try {
            const dadosImagem = {
                nome: req.file.filename,
                caminho: req.file.path
            };

            let create = await imagemModel.criarImagem(dadosImagem);
            console.log("Imagem salva no banco de dados!");

            req.session.notification = {
                titulo: "Upload realizado!",
                mensagem: "Sua imagem foi enviada com sucesso!",
                tipo: "success"
            };
            return res.redirect("/");
        } catch (e) {
            console.log(e);
            res.render("pages/template", {
                pagina: {cabecalho: "cabecalho", conteudo: "index", rodape: "rodape"}, 
                usuario_logado: req.session.autenticado, 
                listaErros: null, 
                dadosNotificacao: {
                    titulo: "Erro ao realizar o upload!", 
                    mensagem: "Verifique os valores digitados!", 
                    tipo: "error"
                },
            });
            console.log("Erro ao realizar o upload!");
        }
    },

    obterImagem: async (req, res) => {
        try {
            let imagem = await imagemModel.obterImagem(req.params.id);
            res.sendFile(path.resolve(imagem.caminho));
        } catch (e) {
            console.log(e);
            res.json({erro: "Falha ao acessar a imagem"});
        }
    }
};

module.exports = imagemController;