import React from 'react';
import Image from 'next/image';

function Loading() {
    return (
        <div className='flex flex-col items-center justify-center h-screen space-x-2'>
            <Image src={'/logo.png'} alt='' width={1000} height={1000} className='w-20 h-20 to-primary mb-10' />
            <div className='flex flex-col items-center fixed bottom-10'>
                <p className='text-slate-500 tracking-wider'>from</p>
                <div className='flex items-center space-x-2'>
                    <Image src={'/meta.png'} alt='' width={500} height={500} className='w-6 h-6 text-primary' />
                    <p className='text-primary font-medium text-lg'>Meta</p>
                </div>
            </div>
        </div>
    )
}

export default Loading
