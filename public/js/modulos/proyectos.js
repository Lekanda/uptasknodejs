import Swal from 'sweetalert2';
import axios from 'axios';

const btnEliminar = document.querySelector('#eliminar-proyecto');

if(btnEliminar) {
    btnEliminar.addEventListener('click', e => {
        const urlProyecto = e.target.dataset.proyectoUrl;
        // console.log('diste click en eliminar');
        // console.log(urlProyecto);

        // return;

        Swal.fire({
            title: '¿Quieres borrar el Proyecto?',
            text: "No podras revertir el cambio!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Borralo!',
            cancelButtonText: 'No, Cancelar'// Este no sale, hay que ponerlo a mano
        }).then((result) => {
        if (result.value) {
            // Enviar Peticion a Axios
            const url = `${location.origin}/proyectos/${urlProyecto}`;

            axios.delete(url, {params: {urlProyecto}})
                .then(function(respuesta){
                    console.log(respuesta);
                    Swal.fire(
                        'Proyecto Borrado!',
                        // 'Tu Proyecto se ha sido Borrado.',
                        respuesta.data,
                        'success'
                        );
                        // redireccionar al inicio
                        
                        window.location.href = '/'
                })
                .catch(() => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Hubo un error',
                        text: 'No se pudo eliminar el Proyecto'
                    })
                })
            // console.log(url);
            // return;
        }
        })
    })
}
export default btnEliminar;