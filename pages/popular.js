import React from 'react'
import Layout from '../layouts/Layout'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import useAuth from '../hooks/useAuth'
import useSWR from 'swr'
import { Spinners } from '../components/Spinners'
import Producto from '../components/Producto'

export default function Popular () {

    const { firebase } = useAuth()

    const fetchProducts = async () => {

        const querySnapshot = await getDocs(
            query(collection(firebase.db, 'products'), orderBy('votes', 'desc'))
        )

        const products = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }))

        return products

    }

    const { data: products, isLoading: loadingProducts } = useSWR('products', fetchProducts)

    return (
        <Layout page='Home'>
            {loadingProducts
                ? <Spinners />
                : (
                    <div className='bg-white mt-16'>
                        {products.map(product => (
                            <Producto key={product.id} product={product} />
                        ))}
                    </div>
                )}
        </Layout>
    )

}
