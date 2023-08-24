import { createContext, useState } from 'react'
import firebase from '../firebase/firebase'
import { collection, deleteDoc, doc, getDoc, getDocs, increment, orderBy, query, updateDoc } from 'firebase/firestore'
import { useRouter } from 'next/router'
import { ErrorAlert, SuccessAlert, showLoadingAlert } from '../components/alerts'
import generarId from '../helpers/generateID'
import useSWR, { mutate } from 'swr'
import { deleteObject, getStorage, ref } from 'firebase/storage'

export const FirebaseContext = createContext()

export function FirebaseProvider ({ children }) {

    const [selectedFile, setSelectedFile] = useState(null)
    const [comments, setComments] = useState({})
    const [buscador, setBuscador] = useState(false)
    const router = useRouter()

    const fetcherAuth = async () => {

        return new Promise(resolve => {

            const unsubscribe = firebase.auth.onAuthStateChanged((user) => {

                resolve(user)
                unsubscribe()

            })

        })

    }
    const { data: authUser, isLoading: loadingAuth } = useSWR('auth', fetcherAuth)

    const fetchProducts = async () => {

        const querySnapshot = await getDocs(
            query(collection(firebase.db, 'products'), orderBy('created', 'desc'))
        )

        const products = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }))

        return products

    }
    const { data: products } = useSWR('products', fetchProducts)

    const fetchProduct = async (id) => {

        const productQuery = await doc(
            collection(firebase.db, 'products'),
            id
        )

        const product = await getDoc(productQuery)
        return product.data()

    }

    const fetchHandleVote = async (id, product) => {

        const loadingAlert = showLoadingAlert('Votando', 'El voto se está agregando...')
        const newVoted = [...product.hasVoted, authUser.uid]
        const docRef = doc(firebase.db, 'products', id)
        await updateDoc(docRef, {
            votes: increment(1),
            hasVoted: newVoted
        })

        const newProduct = {
            ...product,
            votes: product.votes + 1,
            hasVoted: newVoted
        }

        await mutate(id, newProduct)

        loadingAlert.close()

    }

    const fetchHandleUnVote = async (id, product) => {

        const loadingAlert = showLoadingAlert('Eliminando voto', 'El voto se está eliminando...')
        const newVoted = product.hasVoted.filter((user) => user !== authUser.uid)
        const docRef = doc(firebase.db, 'products', id)
        await updateDoc(docRef, {
            votes: increment(-1),
            hasVoted: newVoted
        })

        const newProduct = {
            ...product,
            votes: product.votes - 1,
            hasVoted: newVoted
        }

        await mutate(id, newProduct)

        loadingAlert.close()

    }

    const handleUploadImage = (e) => {

        setSelectedFile(e.target.files[0])

    }

    const handleComment = (e) => {

        setComments({
            ...comments,
            [e.target.name]: e.target.value
        })

    }

    const handleSubmitComments = async (e, id, product) => {

        e.preventDefault()

        if (!authUser) {

            router.push('/login')
            return null

        }

        if (!comments.comment) {

            return ErrorAlert('Debes agregar un comentario')

        }

        comments.id = generarId()
        comments.userId = authUser.uid
        comments.userName = authUser.displayName

        const newComments = [...product.comments, comments]
        const docRef = await doc(firebase.db, 'products', id)
        await updateDoc(docRef, {
            comments: newComments
        })

        mutate(id, { ...product, comments: newComments })

        SuccessAlert('Comentario agregado correctamente')

        e.target.reset()

    }

    const handleDeleteProduct = async (id, product) => {

        if (!authUser) {

            router.push('/login')
            return null

        }

        if (product.creator.id === authUser.uid) {

            router.push('/')

        }

        await deleteDoc(doc(firebase.db, 'products', id))
        const storage = getStorage()
        const imageRef = ref(storage, product.image)
        SuccessAlert('Producto eliminado correctamente')
        await deleteObject(imageRef).then(() => {

        }).catch((error) => {

            console.log(error)

        })
        router.push('/')

    }

    const handleBuscador = () => {

        setBuscador(!buscador)

    }

    return (
        <FirebaseContext.Provider
            value={{
                firebase,
                authUser,
                selectedFile,
                loadingAuth,
                products,
                fetchProducts,
                handleUploadImage,
                handleComment,
                handleSubmitComments,
                fetchProduct,
                fetchHandleVote,
                fetchHandleUnVote,
                handleDeleteProduct,
                handleBuscador,
                buscador
            }}
        >
            {children}
        </FirebaseContext.Provider>
    )

}
