// import express from 'express';// Esta no la soporta NODE 
const express= require('express');
const routes = require('./routes');
const path = require('path');
const bodyParser = require('body-parser');
// const expressValidator = require('express-validator');

// Helpers con algunas funciones
const helpers = require('./helpers');

// Crear la conexion la DB
const db = require('./config/db');
require('./models/Proyectos');
db.sync()
    .then(() => console.log('Conectado al Servidor'))
    .catch(error => console.log(error))
    

// Crear un aplicacion express
const app = express();


//Donde cargar los archivos Estaticos
app.use(express.static('public'));

// Habilitar PUG
app.set('view engine', 'pug');
// Añadir carpeta de las vistas
app.set('views', path.join(__dirname, './views'));

//pasar vardump a la APP
app.use((req, res, next) => {
    res.locals.vardump = helpers.vardump;
    next();
})

// Habilitar Body-Parser para leer datos del formulario
app.use(bodyParser.urlencoded({extended: true}));

// Agregamos express validator a toda la aplicación
// app.use(expressValidator());

//Habilitar Rutas
app.use('/', routes() );

// Puerto de escucha de express
app.listen(3000);