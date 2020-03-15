const tareas = document.querySelector('.listado-pendientes');

if (tareas) {
    tareas.addEventListener('click', (e)=>{
        // console.log(e.target.classList);
        if (e.target.classList.contains('fa-check-circle')) {
            // console.log('Actualizando....');
            const icono = e.target;
            const idTarea = icono.parentElement.parentElement.dataset.tarea;

            console.log(idTarea);
            
        }
    });
}

export default tareas;