import React from 'react'
import Layout from '../layouts/Layout'
import FormCreateAccount from '../components/FormCreateAccount'

export default function CreateAccount () {

    return (
        <Layout page="Crear Cuenta">
            <h1 className='mt-20 mb-10 text-center text-3xl font-bold text-red-600 px-3'>Crear Cuenta</h1>
            <FormCreateAccount />
        </Layout>
    )

}
