const multer = require('multer');
const path = require('path');
const sharp = require('sharp'); // Importa o sharp para manipulação de imagem

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

module.exports = (campoArquivo) => {
    const storage = multer.memoryStorage(); // Armazenamento em memória para facilitar manipulação com `sharp`
    const upload = multer({
        storage: storage,
        limits: { fileSize: 10 * 1024 * 1024 }, // Limite de 10MB
        fileFilter: fileFilter,
    });

    return async (req, res, next) => {
        req.session.erroMulter = null;
        
        upload.single(campoArquivo)(req, res, async function (err) {
            if (err) {
                req.session.erroMulter = {
                    value: '',
                    msg: err.message,
                    path: campoArquivo
                };
                return res.status(400).send(err.message);
            }
            
            console.log("Arquivo recebido no middleware:", req.file);
            
            if (req.file) {
                try {
                    // Define o tamanho desejado para a imagem de perfil
                    const tamanhoDesejado = 250; // Tamanho desejado em pixels (250x250)

                    // Usa `sharp` para redimensionar a imagem
                    const imagemRedimensionada = await sharp(req.file.buffer)
                        .resize({
                            width: tamanhoDesejado,
                            height: tamanhoDesejado,
                            fit: 'cover', // Define o ajuste de corte para manter a proporção
                            position: 'center' // Centraliza a imagem ao cortar
                        })
                        .toFormat('jpeg') // Converte para JPEG (opcional, pode remover ou ajustar)
                        .toBuffer(); // Retorna como buffer para armazenar

                    // Atualiza a imagem processada no `req.file`
                    req.file.buffer = imagemRedimensionada;
                    req.file.mimetype = 'image/jpeg'; // Ajusta o mimetype para consistência
                } catch (erroSharp) {
                    console.error("Erro ao redimensionar imagem:", erroSharp);
                    return res.status(500).send("Erro ao processar a imagem.");
                }
            }
            
            next();
        });
    };
};