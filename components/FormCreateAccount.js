import useValidation from '../hooks/useValidation'
import validateAccount from '../constants/validateAccount'
import { useRouter } from 'next/router'
import { ErrorAlert, SuccessAlert } from './alerts'
import useAuth from '../hooks/useAuth'

export default function FormCreateAccount () {

    const INITIAL_STATE = {
        name: '',
        email: '',
        password: ''
    }
    const {
        values,
        errors,
        touchedFields,
        handleChange,
        handleSubmit,
        handleBlur
    } = useValidation(INITIAL_STATE, validateAccount, createAccount)
    const { firebase } = useAuth()
    const { name, email, password } = values
    const router = useRouter()

    async function createAccount () {

        try {

            await firebase.createAccount(name, email, password)
            router.push('/')
            SuccessAlert('Cuenta creada correctamente')

        } catch (error) {

            console.error('Hubo un error al crear el usuario', error.message)
            ErrorAlert(error)

        }

    }

    return (
        <form
            noValidate
            onSubmit={handleSubmit}
            className="max-w-lg mx-auto mt-5 border p-4 border-gray-300 rounded-md shadow bg-white"
        >
            <div className="flex flex-col p-5">
                <label
                    htmlFor="error"
                    className="text-red-600 font-semibold mb-2"
                >
                    Nombre
                </label>
                <input
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={name}
                    type="text"
                    id="name"
                    name="name"
                    className={`bg-white border text-black text-sm rounded-lg block w-full p-2.5 ${
                        errors.name
                            ? 'border-red-500 placeholder-red-700 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500'
                            : 'border-gray-300 '
                    }`}
                    placeholder="Ingresa tu nombre"
                />
                {touchedFields.name && errors.name && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                        <span className="font-medium">Oh, no!</span>{' '}
                        {errors.name}
                    </p>
                )}
            </div>

            <div className="flex flex-col px-5 pb-5">
                <label
                    htmlFor="email"
                    className="text-red-600 font-semibold mb-2"
                >
                    E-mail
                </label>
                <input
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={email}
                    type="text"
                    id="email"
                    name="email"
                    className={`bg-white border text-black text-sm rounded-lg block w-full p-2.5 ${
                        errors.email
                            ? 'border-red-500 placeholder-red-700 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500'
                            : 'border-gray-300 '
                    }`}
                    placeholder="Ingresa tu email"
                />
                {touchedFields.email && errors.email && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                        <span className="font-medium">Opps. </span>{' '}
                        {errors.email}
                    </p>
                )}
            </div>

            <div className="flex flex-col px-5 pb-5">
                <label
                    htmlFor="password"
                    className="text-red-600 font-semibold mb-2"
                >
                    Contraseña
                </label>
                <input
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={password}
                    type="password"
                    id="password"
                    name="password"
                    className={`bg-white border text-black text-sm rounded-lg block w-full p-2.5 ${
                        errors.password
                            ? 'border-red-500 placeholder-red-700 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500'
                            : 'border-gray-300 '
                    }`}
                    placeholder="Ingresa tu contraseña"
                />
                {touchedFields.password && errors.password && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                        <span className="font-medium">Opps.</span>{' '}
                        {errors.password}
                    </p>
                )}
            </div>
            <div className="w-full flex px-5 pb-5">
                <input
                    type="submit"
                    className="bg-red-600 hover:bg-red-700 text-white text-md font-bold w-full shadow uppercase rounded-md px-3 py-2 cursor-pointer mx-auto"
                    value="Crear Cuenta"
                />
            </div>
        </form>
    )

}
