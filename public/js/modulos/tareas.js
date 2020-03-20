import axios from "axios";
import Swal from 'sweetalert2';
import {actualizarAvance} from '../funciones/avance';

const tareas = document.querySelector('.listado-pendientes');

if (tareas) {
    tareas.addEventListener('click', (e)=>{
        // console.log(e.target.classList);
        if (e.target.classList.contains('fa-check-circle')) {
            // console.log('Actualizando....');
            const icono = e.target;
            const idTarea = icono.parentElement.parentElement.dataset.tarea;
            // console.log(idTarea);

            // Request hacia /tareas/:id
            const url = `${location.origin}/tareas/${idTarea}`;
            // console.log(url);
            axios.patch(url, { idTarea })
                .then(function(respuesta){
                    // console.log(respuesta);
                    if (respuesta.status === 200) {
                        icono.classList.toggle('completo');
                        actualizarAvance();
                    }
                })
        }

        if (e.target.classList.contains('fa-trash')) {
            // console.log('Eliminando...');
            const tareaHTML = e.target.parentElement.parentElement, 
            idTarea = tareaHTML.dataset.tarea;
            // console.log(tareaHTML);
            // console.log(idTarea);
            Swal.fire({
                title: '¿Quieres borrar La Tarea?',
                text: "No podras revertir el cambio!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, Borrala!',
                cancelButtonText: 'No, Cancelar'// Este no sale, hay que ponerlo a mano
            }).then((result) => {
            if (result.value) {
                // console.log('Eliminando...');
                const url = `${location.origin}/tareas/${idTarea}`;
                // enviar el Delete por Axios
                axios.delete(url, { params: { idTarea}})
                    .then(function(respuesta) {
                        if(respuesta.status === 200) {
                            // console.log(respuesta);
                            //Eliminar el Nodo
                            tareaHTML.parentElement.removeChild(tareaHTML);
                            // Opcional una Alerta
                            actualizarAvance();
                            Swal.fire(
                                'Tarea Eliminada Correctamente',
                                respuesta.data,
                                'success'
                            )
                        }
                    });
            }
            })
        }
    });
}

export default tareas;