export default function validateLogin (value) {

    const errors = {}

    if (!value.email) {

        errors.email = 'El email es obligatorio'

    } else if (!/\S+@\S+\.\S+/.test(value.email)) {

        errors.email = 'El email es invalido'

    }

    if (!value.password) {

        errors.password = 'La contraseña es obligatoria'

    } else if (value.password.length < 6) {

        errors.password = 'La contraseña debe tener al menos 6 caracteres'

    }

    return errors

}
