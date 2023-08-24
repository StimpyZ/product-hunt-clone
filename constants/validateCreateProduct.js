export default function validateCreateProduct (value) {

    const errors = {}

    if (!value.name) {

        errors.name = 'El nombre es obligatorio'

    } else if (value.name.length < 3) {

        errors.name = 'El nombre debe tener al menos 3 caracteres'

    }

    if (!value.company) {

        errors.company = 'La empresa es obligatoria'

    }

    if (!value.url) {

        errors.url = 'La contraseña es obligatoria'

    } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(value.url)) {

        errors.url = 'URL no válida'

    }

    if (!value.description) {

        errors.description = 'Debe agregar una descripción'

    }

    return errors

}
