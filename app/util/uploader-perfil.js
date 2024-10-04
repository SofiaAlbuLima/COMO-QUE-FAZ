const multer = require('multer');
const path = require('path');
const sharp = require('sharp');

const fileFilter = (req, file, callBack) => {
    console.log("File recebido:", file);
    if (!file || !file.originalname) {
        return callBack(new Error("Arquivo inválido ou não enviado"));
    }

    const allowedExtensions = /jpeg|jpg|png/;
    const extname = allowedExtensions.test(
        path.extname(file.originalname).toLowerCase()
    );
    const mimetype = allowedExtensions.test(file.mimetype);

    if (extname && mimetype) {
        return callBack(null, true);
    } else {
        callBack(new Error("Apenas arquivos de imagem são permitidos!"));
    }
};

module.exports = (campoArquivo1, campoArquivo2) => {
    const storage = multer.memoryStorage();
    const upload = multer({
        storage: storage,
        limits: { fileSize: 10 * 1024 * 1024 },
        fileFilter: fileFilter,
    });

    return async (req, res, next) => {
        req.session.erroMulter = null;

        // Faz o upload dos dois arquivos
        upload.fields([{ name: campoArquivo1 }, { name: campoArquivo2 }])(req, res, async function (err) {
            if (err) {
                req.session.erroMulter = {
                    value: '',
                    msg: err.message,
                    path: campoArquivo1
                };
                return res.status(400).send(err.message);
            }

            // Processa a imagem do perfil se existir
            if (req.files[campoArquivo1]) {
                try {
                    const imagemPerfil = req.files[campoArquivo1][0];
                    const imagemRedimensionadaPerfil = await sharp(imagemPerfil.buffer)
                        .resize({
                            width: 250,
                            height: 250,
                            fit: 'cover',
                            position: 'center'
                        })
                        .toFormat('jpeg')
                        .toBuffer();
                    req.filePerfil = {
                        buffer: imagemRedimensionadaPerfil,
                        mimetype: 'image/jpeg'
                    };
                } catch (erroSharp) {
                    console.error("Erro ao redimensionar imagem de perfil:", erroSharp);
                    return res.status(500).send("Erro ao processar a imagem de perfil.");
                }
            }

            // Processa a imagem do banner se existir
            if (req.files[campoArquivo2]) {
                try {
                    const imagemBanner = req.files[campoArquivo2][0];
                    const imagemRedimensionadaBanner = await sharp(imagemBanner.buffer)
                        .resize({
                            width: 960,
                            height: 167,
                            fit: 'cover',
                            position: 'center'
                        })
                        .toFormat('jpeg')
                        .toBuffer();
                    req.fileBanner = {
                        buffer: imagemRedimensionadaBanner,
                        mimetype: 'image/jpeg'
                    };
                } catch (erroSharp) {
                    console.error("Erro ao redimensionar imagem do banner:", erroSharp);
                    return res.status(500).send("Erro ao processar a imagem do banner.");
                }
            }

            next();
        });
    };
};