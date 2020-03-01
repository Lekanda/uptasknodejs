// import express from 'express';// Esta no la soporta NODE 
const express= require('express');
const routes = require('./routes');
const path = require('path');
const bodyParser = require('body-parser');

// Crear un aplicacion express
const app = express();

//Donde cargar los archivos Estaticos
app.use(express.static('public'));

// Habilitar PUG
app.set('view engine', 'pug');
// Añadir carpeta de las vistas
app.set('views', path.join(__dirname, './views'));

// Habilitar Body-Parser para leer datos del formulario
app.use(bodyParser.urlencoded({extended: true}));

//Habilitar Rutas
app.use('/', routes() );

// Puerto de escucha de express
app.listen(3000);