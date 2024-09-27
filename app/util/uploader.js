const multer = require('multer');
const path = require('path');

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
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads/');
        },
        filename: (req, file, cb) => {
            cb(null, `${Date.now()}-${file.originalname}`);
        }
    });

    const upload = multer({
        storage: storage,
        limits: { fileSize: 10 * 1024 * 1024 },
        fileFilter: fileFilter,
    });

    return (req, res, next) => {
        req.session.erroMulter = null;
        upload.single(campoArquivo)(req, res, function (err) {
            if (err instanceof multer.MulterError) {
                req.session.erroMulter = {
                    value: '',
                    msg: err.message,
                    path: campoArquivo
                };
            } else if (err) {
                req.session.erroMulter = {
                    value: '',
                    msg: err.message,
                    path: campoArquivo
                };
            }
            next();
        });
    };
};