exports.proyectosHome = (req, res) => {
    res.render('index', {
        nombrePagina: 'Proyectos'
    });
}
exports.formularioProyecto = (req, res) => {
    res.render('nuevo-proyecto', {
        nombrePagina: 'Nuevo Proyecto'
    });
}
exports.nuevoProyecto = (req, res) => {
    // res.send('Enviaste el formulario');
    // Enviar a consola lo que el usuario escriba
    console.log(req.body);
}