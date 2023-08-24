import useSWR from 'swr'
import Producto from '../components/Producto'
import { Spinners } from '../components/Spinners'
import useAuth from '../hooks/useAuth'
import Layout from '../layouts/Layout'

export default function Home () {

    const { fetchProducts } = useAuth()
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
