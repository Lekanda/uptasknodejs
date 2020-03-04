const express = require('express');
const router = express.Router();

// Importamos Express Validator
const { body } = require('express-validator');

// importar el controlador
const proyectosController = require('../controllers/proyectosController');

module.exports = function() {
    // Ruta para el Home
    router.get('/', proyectosController.proyectosHome);

    router.get('/nuevo-proyecto', proyectosController.formularioProyecto);

    router.post('/nuevo-proyecto', 
        body('nombre').not().isEmpty().trim().escape(),
        proyectosController.nuevoProyecto
    );
    // Listar Proyecto
    router.get('/proyectos/:url', proyectosController.proyectoPorUrl);
    
    return router;
}