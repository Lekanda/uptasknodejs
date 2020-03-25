const Proyectos = require('../models/Proyectos');
const Tareas = require('../models/Tareas');

exports.proyectosHome = async (req, res) => {
    // console.log(proyectos);
    // console.log(res.locals.usuario);
    const usuarioId = res.locals.usuario.id;
    const proyectos = await Proyectos.findAll({where:{ usuarioId }});
    res.render('index', {
        nombrePagina: 'Proyectos '+ res.locals.year,
        proyectos
    });
}
exports.formularioProyecto = async(req, res) => {
    const usuarioId = res.locals.usuario.id;
    const proyectos = await Proyectos.findAll({where:{ usuarioId }});
    res.render('nuevo-proyecto', {
        nombrePagina: 'Nuevo Proyecto',
        proyectos
    });
}
exports.nuevoProyecto = async (req, res) => {
    const usuarioId = res.locals.usuario.id;
    const proyectos = await Proyectos.findAll({where:{ usuarioId }});

    // res.send('Enviaste el formulario');

    // Enviar a consola lo que el usuario escriba
    // console.log(req.body.nombre);

    // Validar que tenga algo en el input
    const nombre = req.body.nombre;
    let errores = [];
    if(!nombre || nombre === '') {
        errores.push({'texto':'Agrega un Nombre al Proyecto'});
    }
    
    // Si hay errores
    if(errores.length > 0 ){
        res.render('nuevo-proyecto', {
            nombrePagina : 'Nuevo Proyecto',
            errores,
            proyectos
        })
    } else {
        // No hay errores, Insertar en la DB
            const usuarioId = res.locals.usuario.id;
            await Proyectos.create({ nombre, usuarioId });
            res.redirect('/');
            // .then(() => console.log('Insertado Correctamente'))
            // .catch(error => console.log(error))
    }
}

exports.proyectoPorUrl = async(req,res,next) => {
    // res.send('Listo');
    // res.send(req.params.url);
    const usuarioId = res.locals.usuario.id;
    const proyectosPromise = Proyectos.findAll({where:{ usuarioId }});

    const proyectoPromise =  Proyectos.findOne({
        where: {
            url: req.params.url,
            usuarioId
        }
    });
    const [proyectos, proyecto] = await Promise.all([proyectosPromise, proyectoPromise ]);
    // Consultar Tareas del Proyecto actual
    // console.log(proyecto);
    const tareas = await Tareas.findAll({
        where:{
            proyectoId : proyecto.id
        },
        include: [
            { model: Proyectos}
        ]
    });
    // console.log(tareas);

    if(!proyecto) return next();

    // console.log(proyecto);
    // res.send('Ok');
    
    // Render a la Vista
    res.render('tareas', {
        nombrePagina: 'Tareas del Proyecto',
        proyecto,
        proyectos,
        tareas
    })
}

exports.formularioEditar = async(req,res) => {
    const usuarioId = res.locals.usuario.id;
    const proyectosPromise = Proyectos.findAll({where:{ usuarioId }});

    const proyectoPromise =  Proyectos.findOne({
        where: {
            id: req.params.id, 
            usuarioId
        }
    });
    const [proyectos, proyecto] = await Promise.all([proyectosPromise, proyectoPromise]);

    // Render a la vista
    res.render('nuevo-proyecto', {
        nombrePagina: 'Editar Proyecto',
        proyectos,
        proyecto
    })
}

exports.actualizarProyecto = async (req, res) => {
    const usuarioId = res.locals.usuario.id;
    const proyectos = await Proyectos.findAll({where:{ usuarioId }});

    // console.log(req.body.nombre);

    // Validar que tenga algo en el input
    const nombre = req.body.nombre;
    let errores = [];
    if(!nombre || nombre === '') {
        errores.push({'texto':'Agrega un Nombre al Proyecto'});
    }
    
    // Si hay errores
    if(errores.length > 0 ){
        res.render('nuevo-proyecto', {
            nombrePagina : 'Nuevo Proyecto',
            errores,
            proyectos
        })
    } else {
        // No hay errores, Insertar en la DB
            await Proyectos.update(
                { nombre: nombre },
                { where: { id: req.params.id }}
            );
            res.redirect('/');
    }
}
exports.eliminarProyecto = async (req, res, next) => {
    
    // Req, query o params
    // console.log(req.query);
    // console.log(req.params);

    const {urlProyecto} = req.query;
    const resultado = await Proyectos.destroy({where:{ url : urlProyecto}});

    if(!resultado){
        return next();
    }

    res.status(200).send('Proyecto Eliminado Correctamente de la DB');
}