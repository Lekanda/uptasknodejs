// import express from 'express';// Esta no la soporta NODE 
const express= require('express');

// Crear un aplicacion express
const app = express();

// Ruta para el Home
app.use('/', (req, res) => {
    res.send('hola desde el /index.js');
});

// Puerto de escucha de express
app.listen(3000);