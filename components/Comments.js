import React from 'react'
import { UserIcon } from './IconsSvg'

export default function Comments ({ comment, isCreator }) {

    return (
        <div className='flex items-center gap-4'>
            <UserIcon />
            <div className='bg-gray-300 px-4 py-1 rounded-2xl'>
                {isCreator(comment?.userId) && (
                    <span className='text-xs text-red-600 font-bold'>Creador</span>
                )}
                <h5 className='text-xl font-bold'>{comment?.userName}</h5>
                <p className='text-md'>{comment?.comment}</p>
            </div>
        </div>
    )

}
