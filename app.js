const express = require('express');
const app = express();
const port = 3000; 
const fs = require('fs');
const path = require('path');
const passport = require('passport');

const env = require('dotenv').config();

const GoogleStrategy = require('passport-google-oauth20').Strategy;

const usuarioController = require("./app/controllers/controller");

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.NODE_ENV === 'production'
        ? "https://como-que-faz.onrender.com/auth/google/callback"
        : "http://localhost:3000/auth/google/callback"
}, usuarioController.encontrarOuCriarUsuarioGoogle));

// Registro de serialize e deserialize com passport
passport.serializeUser(usuarioController.serializeUser);
passport.deserializeUser(usuarioController.deserializeUser);

//middleware para gerenciar sessões no Express. armazenar informações do usuário entre diferentes solicitações HTTP 
const session = require('express-session');
app.use(session({
    secret: 'CQFmvIn2UP2oTdsMWc', // Assinar o cookie da sessão
    resave: false, // false é para evitar gravações desnecessárias
    saveUninitialized: true, // Sessão sem dados ser salva - útil para rastrear visitantes novos
    cookie: { secure: false }
}));

app.use(passport.initialize());
app.use(passport.session());

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('app/public'));

app.set('view engine', 'ejs');
app.set('views', './app/views')

app.use('/uploads', express.static('uploads'));

var rotas = require('./app/routes/router');
app.use('/', rotas);

app.listen(port, () => {
    console.log(`Abriu na porta ${port}\nhttp://localhost:${port}`);
});