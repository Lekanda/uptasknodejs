import Swal from 'sweetalert2';
import axios from 'axios';

const btnEliminar = document.querySelector('#eliminar-proyecto');

btnEliminar.addEventListener('click', () => {
    // console.log('diste click en eliminar');
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
        Swal.fire(
        'Proyecto Borrado!',
        'Tu Proyecto se ha sido Borrado.',
        'success'
        );
        //redireccionar al inicio
        setTimeout(() => {
            window.location.href = '/'
        }, 3000);
    }
    })
})