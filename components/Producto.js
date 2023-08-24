import Image from 'next/image'
import { CommentIcon } from './IconsSvg'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { es } from 'date-fns/locale'
import Link from 'next/link'

export default function Producto ({ product }) {

    return (
        <div className="flex md:flex-row flex-col justify-between p-4 border-b-2 last:border-none items-center ">
            <div className='flex md:flex-row flex-col items-center'>
                <Image
                    className="aspect-[2/2] object-cover"
                    src={product.image}
                    alt={product.name}
                    width={300}
                    height={300}
                />
                <div className='flex flex-col p-6 gap-4'>
                    <Link href={`/products/${product.id}`}>
                        <h1 className='text-4xl text-red-600 font-bold'>{product.name}</h1>
                    </Link>
                    <p>{product.description}</p>
                    <div className='max-w-[140px] flex justify-between p-1 border border-gray-200'>
                        <CommentIcon />
                        <p>{product.comments.length} Comentarios</p>
                    </div>

                    <p>Publicado {formatDistanceToNow(new Date(product.created), { locale: es })}</p>
                </div>
            </div>
            <div className='text-red-600 border-2 py-1 px-6 text-center border-red-600 md:mr-20'>
                <div>&#9650;</div>
                <p className='text-black'>{product.votes}</p>
            </div>
        </div>
    )

}
