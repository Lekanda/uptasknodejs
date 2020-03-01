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

    // Validar que tenga algo en el input
    const { nombre } = req.body;

    let errores = [];
    if(!nombre) {
        errores.push({'texto':'Agrega un Nombre al Proyecto'});
    }

    // Si hay errores
    if(errores.length>0) {
        res.render('nuevo-proyecto', {
            nombrePagina: 'Nuevo Proyecto',
            errores
        })
    } else {
        // No hay errores, Insertar en la DB
    }
}