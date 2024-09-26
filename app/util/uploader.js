const multer = require('multer');
const path = require('path');
const fs = require('fs');

const fileFilter = (req, file, callBack) => {
    const allowedExtensions = /jpeg|jpg|png/;
    const extname = allowedExtensions.test(
        path.extname(file.origianalname).toLowerCase()
    );
    const mimetype = allowedExtensions.test(file.mimetype);

    if(extname && mimetype){
        return callBack(null,true);
    } else {
        callBack(new Error ("Apenas Arquivos de imagem são permitidos!"));
    }
};

module.exports = (caminho = null, tamanhoArq = 3) => {
    if(caminho = null){
        const storage = multer.memoryStorage();
        upload = multer({
            storage: storage,
            limits: { fileSize: tamanhoArq * 1024 * 1024 },
            fileFilter: fileFilter,
        });
    } else {
        const storagePasta = multer.diskStorage({
            destination: (req, file, callBack) => {
                callBack(null, caminho);
            },
            filename: function (req, file, callBack){
                callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
            },
        });
        upload = multer({
            storage: storagePasta,
            limits: { fileSize: tamanhoArq * 1024 * 1024},
            fileFilter: fileFilter,
        });
    }
    return (campoArquivo) => {
        return (req, res, next) => {
            req.session.erroMulter = null;
            upload.single(campoArquivo)(req, res, function (err){
                if (err instanceof multer.MulterError){
                    req.session.erroMulter = {
                        value: '',
                        msg: err.message,
                        path: campoArquivo
                    }
                } else if (err){
                    req.session.erroMulter = {
                        value: '',
                        msg: err.message,
                        path: campoArquivo
                    }
                }
                next();
            });
        };
    }
};
