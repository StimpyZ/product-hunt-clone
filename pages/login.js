import React from 'react'
import Layout from '../layouts/Layout'
import FormLogin from '../components/FormLogin'

export default function Login () {

    return (
        <Layout page="Login">
            <h1 className='mt-20 mb-10 text-center text-3xl font-bold text-red-600 px-3'>Iniciar Sesion</h1>

            <FormLogin />
        </Layout>
    )

}
