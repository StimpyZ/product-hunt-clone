import Swal from 'sweetalert2'

export const ErrorAlert = (message) => {

    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: message
    })

}

export const SuccessAlert = (message) => {

    Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: message
    })

}

export const ConfirmAlert = (message, callback) => {

    Swal.fire({
        title: '¿Estás seguro?',
        text: message,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, ¡adelante!',
        cancelButtonText: 'No, ¡cancelar!',
        reverseButtons: false
    }).then((result) => {

        if (result.isConfirmed) {

            callback()

        }

    })

}

export const showLoadingAlert = (title, text) => {

    return Swal.fire({
        title,
        text,
        allowOutsideClick: false,
        showConfirmButton: false,
        willOpen: () => {

            Swal.showLoading()

        }
    })

}
