const express = require('express');
const router = express.Router();


module.exports = function() {
    // Ruta para el Home
    router.get('/', (req, res) => {
        res.send('hola desde el /index.JS');
    });
    router.get('/nosotros', (req, res) => {
        res.send('hola desde el , nosotros');
    });
    return router;
}