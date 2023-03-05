import React from 'react';
import Image from 'next/image';

function Loading() {
    return (
        <div className='flex items-center justify-center h-screen space-x-2'>
            <Image src={'/loading.gif'} alt='' width={1000} height={1000} className='w-80 h-80' />
        </div>
    )
}

export default Loading
