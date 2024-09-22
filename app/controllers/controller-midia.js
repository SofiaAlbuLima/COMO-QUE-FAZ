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

        uploadImagem: upload.array('imagem', 10),

        criarImagem: async (req, res) => {
            try {
                if (!req.files || req.files.length === 0) {
                    return res.status(400).json({ mensagem: "Imagens são obrigatórias." });
                }
                const imagens = req.files.map(file => ({
                    nome: file.filename,
                    caminho: file.path
                }));

                for (const dadosImagem of imagens) {
                    await imagemModel.criarImagem(dadosImagem);
                }

                req.session.notification = {
                    titulo: "Upload realizado!",
                    mensagem: "Suas imagens foram enviadas com sucesso!",
                    tipo: "success"
                };
                console.log("imagem uploudada");
                return res.redirect("/");
            } catch (e) {
                console.log(e);
                res.render("pages/template", {
                    pagina: { cabecalho: "cabecalho", conteudo: "index", rodape: "rodape" },
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
                res.json({ erro: "Falha ao acessar a imagem" });
            }
        }
    };

    module.exports = imagemController;