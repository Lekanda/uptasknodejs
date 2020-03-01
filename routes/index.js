const express = require('express');
const router = express.Router();

// importar el controlador
const proyectosController = require('../controllers/proyectosController');

module.exports = function() {
    // Ruta para el Home
    router.get('/', proyectosController.proyectosHome);
    router.get('/nosotros', (req, res) => {
        res.send('hola desde el , nosotros');
    });
    return router;
}