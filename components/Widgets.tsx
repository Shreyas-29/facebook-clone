import React from 'react';
import Image from 'next/image';
import { HiPlus } from 'react-icons/hi';
import Link from 'next/link';


interface Props {
    data: {
        id: number,
        title: string,
        image: string,
        website: string,
    }[];
}


function Widgets({ data }: Props) {

    return (
        <section className='hidden xl:flex flex-col items-start my-24 xl:w-80 h-screen pb-20 px-4 fixed right-0'>
            <div className=''>
                <h4 className='text-gray-600 font-semibold text-'>Sponsored</h4>
            </div>
            <div className='flex flex-col items-center space-y-4 py-4 mb-4'>
                {data?.map((item) => (
                    <Link href={'/'} key={item?.id}>
                        <div className='flex items-center space-x-4 cursor-pointer hover:bg-gray-200 rounded-lg p-2'>
                            <Image
                                src={item?.image}
                                alt=''
                                unoptimized
                                width={100}
                                height={100}
                                className='w-28 h-28 object-cover rounded-lg'
                            />
                            <div className='flex flex-col items-start'>
                                <h5 className='text-gray-900 font-medium text-sm'>{item?.title}</h5>
                                <p className='text-gray-500 text-xs'>{item?.website}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
            <div className='mb-2'>
                <h4 className='text-black font-bold text-lg'>Group Conversations</h4>
            </div>
            <Link href={'/'} className='flex items-center space-x-4 w-full p-2 cursor-pointer hover:bg-gray-200 rounded-lg'>
                <span className='bg-gray-300 text-black p-1 rounded-full cursor-pointer'>
                    <HiPlus className='sm:w-5 w-2 sm:h-5 h-2' />
                </span>
                <span className='capitalize text-gray-600 text-sm'>Create new group</span>
            </Link>
        </section>
    )
}

export default Widgets
