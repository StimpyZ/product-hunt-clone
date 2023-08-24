import useValidation from '../hooks/useValidation'
import validateCreateProduct from '../constants/validateCreateProduct'
import useAuth from '../hooks/useAuth'
import { useRouter } from 'next/router'
import { ErrorAlert, SuccessAlert, showLoadingAlert } from './alerts'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import generarId from '../helpers/generateID'

export default function FormCreateProduct () {

    const INITIAL_STATE = {
        name: '',
        company: '',
        image: '',
        url: '',
        description: ''
    }
    const {
        values,
        errors,
        touchedFields,
        handleChange,
        handleSubmit,
        handleBlur
    } = useValidation(INITIAL_STATE, validateCreateProduct, handleCreateProduct)
    const { firebase, selectedFile, handleUploadImage, authUser } = useAuth()
    const router = useRouter()
    const { name, company, url, description } = values

    async function handleCreateProduct () {

        try {

            const loadingAlert = showLoadingAlert('Creando producto', 'El producto se está creando...')
            let imageUrl = null

            if (selectedFile) {

                const uniqueFileName = `${generarId()}-${selectedFile.name}}`
                const storageRef = ref(firebase.storage, `products/${uniqueFileName}`)
                const uploadTask = uploadBytesResumable(storageRef, selectedFile)
                await uploadTask

                imageUrl = await getDownloadURL(uploadTask.snapshot.ref)

            }

            const product = {
                name,
                company,
                url,
                image: imageUrl,
                description,
                votes: 0,
                comments: [],
                created: Date.now(),
                creator: {
                    id: authUser.uid,
                    name: authUser.displayName
                },
                hasVoted: []
            }

            await firebase.createProduct(product)
            loadingAlert.close()
            SuccessAlert('Producto creado correctamente')
            router.push('/')

        } catch (error) {

            console.error('Hubo un error al crear el producto', error.message)
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

            <div className="flex flex-col px-5 mb-5">
                <label
                    htmlFor="company"
                    className="text-red-600 font-semibold mb-2"
                >
                    Empresa
                </label>
                <input
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={company}
                    type="text"
                    id="company"
                    name="company"
                    className={`bg-white border text-black text-sm rounded-lg block w-full p-2.5 ${
                        errors.company
                            ? 'border-red-500 placeholder-red-700 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500'
                            : 'border-gray-300 '
                    }`}
                    placeholder="Ingresa tu nombre"
                />
                {touchedFields.company && errors.company && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                        <span className="font-medium">Oh, no!</span>{' '}
                        {errors.company}
                    </p>
                )}
            </div>

            <div className="flex flex-col px-5 mb-4">
                <label
                    htmlFor="file"
                    className="text-red-600 font-semibold mb-2"
                >
                    Imagen
                </label>
                <input
                    accept="image/*"
                    type="file"
                    onChange={handleUploadImage}
                    id="file"
                    className={`bg-white border text-black text-sm rounded-lg block w-full p-2.5 ${
                        errors.image
                            ? 'border-red-500 placeholder-red-700 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500'
                            : 'border-gray-300 '
                    }`}
                />

                <p
                    className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                    id="file_input_help"
                >
                        SVG, PNG, JPG or GIF.
                </p>

            </div>

            <div className="flex flex-col px-5 mb-5">
                <label
                    htmlFor="url"
                    className="text-red-600 font-semibold mb-2"
                >
                    Url
                </label>
                <input
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={url}
                    type="url"
                    id="url"
                    name="url"
                    className={`bg-white border text-black text-sm rounded-lg block w-full p-2.5 ${
                        errors.url
                            ? 'border-red-500 placeholder-red-700 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500'
                            : 'border-gray-300 '
                    }`}
                    placeholder="Ingresa tu url"
                />
                {touchedFields.url && errors.url && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                        <span className="font-medium">Oh, no!</span>{' '}
                        {errors.url}
                    </p>
                )}
            </div>

            <div className="flex flex-col px-5 mb-5">
                <label
                    htmlFor="description"
                    className="text-red-600 font-semibold mb-2"
                >
                    Descripcion
                </label>
                <textarea
                    rows="4"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={description}
                    id="description"
                    name="description"
                    className={`bg-white border text-black text-sm rounded-lg block w-full p-2.5 ${
                        errors.description
                            ? 'border-red-500 placeholder-red-700 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500'
                            : 'border-gray-300 '
                    }`}
                    placeholder="Escribe una descripcion"
                />
                {touchedFields.description && errors.description && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                        <span className="font-medium">Oh, no!</span>{' '}
                        {errors.description}
                    </p>
                )}
            </div>

            <div className="w-full flex px-5 pb-5 mt-5">
                <input
                    type="submit"
                    className="bg-red-600 hover:bg-red-700 text-white text-md font-bold w-full shadow uppercase rounded-md px-3 py-2 cursor-pointer mx-auto"
                    value="Crear Producto"
                />
            </div>
        </form>
    )

}
