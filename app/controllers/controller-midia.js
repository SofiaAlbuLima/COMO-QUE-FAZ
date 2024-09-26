const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Verificar se o diretório existe, caso contrário, criar o diretório
const uploadDir = path.join(__dirname, '..', 'uploads-midia-banco');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configurando o armazenamento de arquivos
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

exports.uploadImagem = upload.array('imagem', 10); // Permitindo até 10 imagens

exports.criarImagem = (req, res) => {
    if (!req.files) {
        return res.status(400).send('Nenhum arquivo foi enviado.');
    }

    // Processa a lógica de armazenamento de imagens aqui
    res.status(200).send('Imagens enviadas com sucesso!');
};