// import express from 'express';// Esta no la soporta NODE 
const express= require('express');
const routes = require('./routes');
const path = require('path');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
// const session = require('cookie-session');
const cookieParser = require('cookie-parser');
const passport = require('./config/passport');
//importar las variables
require('dotenv').config({ path: 'variables.env'});

const helpers = require('./helpers');// Helpers con algunas funciones

// Crear la conexion la DB
const db = require('./config/db');
require('./models/Proyectos');
require('./models/Tareas');
require('./models/Usuarios');
db.sync()
    .then(() => console.log('Conectado al Servidor'))
    .catch(error => console.log(error))
    
// Crear un aplicacion express
const app = express();

//Donde cargar los archivos Estaticos
app.use(express.static('public'));

// Habilitar PUG
app.set('view engine', 'pug');

// Habilitar Body-Parser para leer datos del formulario
app.use(bodyParser.urlencoded({extended: true}));

// ***Agregamos express validator a toda la aplicación
// app.use(expressValidator());


// Añadir carpeta de las vistas
app.set('views', path.join(__dirname, './views'));

//Agregar Flash Messages
app.use(flash());

//Agregar Cookie-Parser
app.use(cookieParser());

// Agregar Sessiones: Nos ayuda a ir entre las distintas paginas sin necesidad de volver a autenticar
app.use(session({
    secret: 'supersecreto',// Firma el cookie
    resave: false,
    saveUninitialized: false
}));


// Agregamos Passport
app.use(passport.initialize());
app.use(passport.session());

//pasar vardump a la APP
app.use((req, res, next) => {
    // console.log(req.user);
    res.locals.vardump = helpers.vardump;
    res.locals.mensajes = req.flash();
    res.locals.usuario = {...req.user} || null;
    next();
});

// Primer Middleware
app.use((req, res, next) => {
    const fecha = new Date();    
    res.locals.year = fecha.getFullYear();
    next();
});

//Habilitar Rutas
app.use('/', routes() );

// Servidor y Puerto
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3000;

app.listen(port, host, () =>{
    console.log('El servidor esta Listo');
    
})


// require('./handlers/email');// Manda llamar al mail