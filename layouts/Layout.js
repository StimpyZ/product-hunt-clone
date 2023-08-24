import Head from 'next/head'
import Header from '../components/Header'
export default function Layout ({ children, page }) {

    return (
        <>
            <Head>
                <title>Product Hunt - {page}</title>
                <meta name="description" content="Product hunt Clone" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin
                />
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap"
                />
            </Head>

            <Header />

            <main className='max-w-7xl mx-auto'>
                {children}
            </main>
        </>
    )

}
