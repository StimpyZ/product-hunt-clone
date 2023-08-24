import Layout from '../layouts/Layout'
import FormCreateProduct from '../components/FormCreateProduct'
import useAuth from '../hooks/useAuth'
import { useRouter } from 'next/router'
import { Spinners } from '../components/Spinners'

export default function NewProduct () {

    const { authUser, loadingAuth } = useAuth()
    const router = useRouter()

    if (loadingAuth) return <Spinners />

    if (!authUser) {

        router.push('/login')
        return null

    }

    return (
        <Layout page="Nuevo producto">
            <h1 className='mt-20 mb-10 text-center text-3xl font-bold text-red-600 px-3'>Nuevo producto</h1>
            <FormCreateProduct />
        </Layout>
    )

}
