const express = require('express')
const app = express()
const port = 2999

//middleware para gerenciar sessões no Express. armazenar informações do usuário entre diferentes solicitações HTTP 
const session = require('express-session'); 
app.use(session({
    secret: 'CQFmvIn2UP2oTdsMWc', //assinar o cookie da sessão
    resave: false, //false é para evitar gravações desnecessárias
    saveUninitialized: true, //sessão sem dados ser salva - útil para rastrear visitantes novos
    cookie: {secure: false} 
}));


const env = require('dotenv').config();

app.use(express.static('app/public'));


app.set('view engine', 'ejs');
app.set('views', './app/views')


var rotas = require('./app/routes/router');
app.use('/', rotas);


app.listen(port, () => {
    console.log(`Abriu na porta ${port}\nhttp://localhost:${port}`);
});