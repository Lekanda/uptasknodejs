// import express from 'express';// Esta no la soporta NODE 
const express= require('express');
const routes = require('./routes');


// Crear un aplicacion express
const app = express();

//Habilitar Rutas
app.use('/', routes() );


// Puerto de escucha de express
app.listen(3000);