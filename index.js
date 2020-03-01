// import express from 'express';// Esta no la soporta NODE 
const express= require('express');
const routes = require('./routes');
const path = require('path');

// Crear un aplicacion express
const app = express();

// Habilitar PUG
app.set('view engine', 'pug');
// Añadir carpeta de las vistas
app.set('views', path.join(__dirname, './views'));

//Habilitar Rutas
app.use('/', routes() );

// Puerto de escucha de express
app.listen(3000);