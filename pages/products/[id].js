import Layout from '../../layouts/Layout'
import { useRouter } from 'next/router'
import useAuth from '../../hooks/useAuth'
import Custom404 from '../404'
import { Spinners } from '../../components/Spinners'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { es } from 'date-fns/locale'
import Comments from '../../components/Comments'
import useSWR from 'swr'
import { ConfirmAlert } from '../../components/alerts'

export default function ProductId () {

    const {
        query: { id }
    } = useRouter()
    const {
        authUser,
        handleComment,
        handleSubmitComments,
        fetchProduct,
        fetchHandleVote,
        fetchHandleUnVote,
        handleDeleteProduct
    } = useAuth()

    const isCreator = (id) => {

        if (product?.creator?.id === id) {

            return true

        }

    }

    const {
        data: product,
        error,
        isLoading: loading
    } = useSWR(id, fetchProduct)

    const canEliminate = () => {

        if (!authUser) return false

        if (product.creator.id === authUser.uid) {

            return true

        }

    }

    console.log(product)

    return (
        <Layout page="Producto">
            {error && <Custom404 />}
            {loading && <Spinners />}
            {!loading && !error && product && (
                <>
                    <h1 className="text-5xl text-red-600 font-bold text-center mt-20">
                        {product?.name}
                    </h1>
                    <div className="flex gap-10">
                        <div className="w-2/3 mt-10 flex flex-col gap-4">
                            <p>
                                Publicado hace:{' '}
                                {product.created
                                    ? formatDistanceToNow(
                                        new Date(product?.created),
                                        { locale: es }
                                    )
                                    : null}
                            </p>
                            <p>
                                Por: {product?.creator?.name} de{' '}
                                {product?.company}
                            </p>

                            <img
                                className="w-full h-[600px] object-cover"
                                src={product?.image}
                                alt={product?.name}
                                width={550}
                                height={300}
                            />

                            <p>{product.description}</p>
                            {authUser && (
                                <>
                                    <h2 className="text-3xl font-bold">
                                        Agrega tu comentario
                                    </h2>

                                    <form
                                        onSubmit={(e) =>
                                            handleSubmitComments(e, id, product)
                                        }
                                        className="flex flex-col gap-4"
                                    >
                                        <textarea
                                            onChange={handleComment}
                                            name="comment"
                                            className="border border-gray-400 p-2"
                                            rows="4"
                                        />

                                        <input
                                            type="submit"
                                            value="Agregar comentario"
                                            className="bg-red-600 text-white font-bold p-2 cursor-pointer uppercase"
                                        />
                                    </form>
                                </>
                            )}

                            <h2 className="text-3xl font-bold">Comentarios</h2>
                            {product?.comments?.length > 0
                                ? (
                                    <div className="flex flex-col gap-8 mt-6 mb-10 bg-gray-200 px-7 py-4 rounded-xl">
                                        {product?.comments?.map((comment, i) => (
                                            <Comments
                                                key={comment.id}
                                                comment={comment}
                                                isCreator={isCreator}
                                            />
                                        ))}
                                    </div>
                                )
                                : (
                                    <p className="text-center text-red-600 font-bold">
                                    Aun no hay comentarios
                                    </p>
                                )}
                        </div>

                        <div className="w-1/3 mt-10 flex flex-col gap-10">
                            <a
                                href='https://stimp.netlify.app'
                                target="_blank"
                                rel="noreferrer"
                                className="bg-red-600 text-white font-bold p-2 cursor-pointer uppercase mt-10 text-center">
                                Visitar URL
                            </a>
                            <p className="text-center">
                                Votos {product?.votes}
                            </p>

                            {authUser &&
                                !product.hasVoted.includes(authUser.uid) && (
                                <button
                                    onClick={() =>
                                        fetchHandleVote(id, product)
                                    }
                                    className="bg-white border-black border font-bold p-2 cursor-pointer uppercase"
                                >
                                        Votar
                                </button>
                            )}

                            {authUser &&
                                product.hasVoted.includes(authUser.uid) && (
                                <button
                                    onClick={() =>
                                        fetchHandleUnVote(id, product)
                                    }
                                    className="bg-white border-black border font-bold p-2 cursor-pointer uppercase"
                                >
                                        Quitar voto
                                </button>
                            )}

                            {canEliminate() && (
                                <button
                                    onClick={() => ConfirmAlert('¿Estás seguro de eliminar este producto?', () => handleDeleteProduct(id, product))}
                                    className="bg-white border-black border font-bold p-2 cursor-pointer uppercase">
                                    Eliminar producto
                                </button>
                            )}
                        </div>
                    </div>
                </>
            )}
        </Layout>
    )

}
