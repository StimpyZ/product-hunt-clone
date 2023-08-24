import Link from 'next/link'
import { CloseIcon, IconHamburguer, LogoutIcon, SearchIcon } from './IconsSvg'
import { useState } from 'react'
import useAuth from '../hooks/useAuth'
import { ConfirmAlert } from './alerts'
import firebase from '../firebase/firebase'
import { Spinners } from './Spinners'
import Busqueda from './Busqueda'
export default function Header () {

    const [menu, setMenu] = useState(false)
    const { authUser, loadingAuth, handleBuscador } = useAuth()

    if (loadingAuth) return <Spinners />

    return (
        <header className="shadow-lg bg-white">

            <div className="p-5 flex justify-between items-center max-w-7xl mx-auto text-lg">
                <Link href="/" className="text-6xl font-bold text-red-600">
                    P
                </Link>
                <div className="md2:hidden">
                    <button onClick={() => setMenu(!menu)}>
                        <IconHamburguer />
                    </button>
                </div>
                <div className="md2:flex items-center hidden gap-10">
                    <button
                        onClick={handleBuscador}
                        className="flex items-center gap-2 bg-gray-200 px-4 py-2 rounded-md shadow-md hover:bg-gray-300 transition-all">
                        <SearchIcon />

                        Buscar proyecto</button>

                    <nav className="flex gap-5 text-gray-500 font-semibold">
                        <Link className="hover:underline" href="/">
                            Inicio
                        </Link>
                        <Link className="hover:underline" href="/popular">
                            Populares
                        </Link>
                        {authUser && (
                            <Link className="hover:underline" href="/new-product">
                            Nuevo Producto
                            </Link>
                        )}
                    </nav>
                </div>
                <div className="md2:flex hidden items-center gap-2">
                    {authUser
                        ? (
                            <>
                                <p>Hola: {authUser.displayName.split(' ')[0]}</p>
                                <button
                                    onClick={() => ConfirmAlert('¿Estás seguro de cerrar sesion?', () => firebase.logout())}
                                    className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md gap-1">
                                    <LogoutIcon />
                                Cerrar sesion
                                </button>
                            </>
                        )
                        : (
                            <>
                                <Link
                                    className="inline-flex items-center px-6  py-2 bg-red-600 hover:bg-red-700 text-white text-md font-semibold rounded-md gap-1"
                                    href="/login"
                                >
                                Login
                                </Link>
                                <Link
                                    className="inline-flex items-center px-4 py-2 border border-black font-semibold text-md rounded-md gap-1"
                                    href="/create-account"
                                >
                                Crear cuenta
                                </Link>
                            </>
                        )}
                </div>
                {menu && (
                    <div className="md2:hidden fixed right-0 bottom-0 h-full bg-white shadow-xl w-[300px] p-7">
                        <button className='flex justify-end w-full mb-10' onClick={() => setMenu(!menu)}>
                            <CloseIcon />
                        </button>
                        <div className="flex flex-col items-center h-full gap-5">
                            <div className="flex flex-col gap-2 text-center">
                                {authUser
                                    ? (
                                        <>
                                            <p>Hola: {authUser.displayName.split(' ')[0]}</p>
                                            <button
                                                onClick={() => ConfirmAlert('¿Estás seguro de cerrar sesion?', () => firebase.logout())}
                                                className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md gap-1">
                                                <LogoutIcon />
                                            Cerrar sesion
                                            </button>
                                        </>
                                    )
                                    : (
                                        <>

                                            <Link
                                                className="text-center py-2 bg-red-600 hover:bg-red-700 text-white text-md font-semibold rounded-md gap-1"
                                                href="/login"
                                            >
                                            Login
                                            </Link>
                                            <Link
                                                className="text-center px-4 py-2 border border-black font-semibold text-md rounded-md gap-1"
                                                href="/create-account"
                                            >
                                            Crear cuenta
                                            </Link>
                                        </>
                                    )}
                            </div>
                            <form className="flex items-center">
                                <input
                                    type="text"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm inline-block p-2 rounded-tl-md rounded-bl-md rounded-tr-none rounded-br-none outline-none"
                                    placeholder="John"
                                    required
                                />

                                <button
                                    type="submit"
                                    className="inline-flex bg-gray-200 p-[6px] border-t border-r border-b border-gray-300 rounded-tr-md rounded-br-md border-l-0"
                                >
                                    <SearchIcon />
                                </button>
                            </form>

                            <nav className="flex flex-col gap-5 text-gray-500 font-semibold text-center">
                                <Link className="hover:underline" href="/">
                                    Inicio
                                </Link>
                                <Link className="hover:underline" href="/popular">
                                    Populares
                                </Link>
                                {authUser && (
                                    <Link className="hover:underline" href="/new-product">
                                    Nuevo Producto
                                    </Link>
                                )}
                            </nav>
                        </div>
                    </div>
                )}
            </div>
            <Busqueda />
        </header>
    )

}
