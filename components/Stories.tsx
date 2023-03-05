import React from 'react';
import Image from 'next/image';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { CgCardHearts } from 'react-icons/cg';
import { MdOutlineTimer } from 'react-icons/md';
import { RiMessengerLine } from 'react-icons/ri';
import { useSession } from "next-auth/react";


function Stories() {

    const { data: session } = useSession();


    return (
        <div className='flex flex-col sm:flex-row items-start justify-center sm:justify-start gap-y-5 sm:gap-y-0 w-full h-56 sm:h-52 pt-2'>
            <div className='flex flex-col items-center relative border rounded-xl my-auto shadow cursor-pointer group mt-4 sm:mt-2'>
                <Image
                    src={session?.user?.image!}
                    alt='User'
                    unoptimized
                    width={500}
                    height={500}
                    loading="eager"
                    draggable={false}
                    className='w-28 h-40 sm:w-28 sm:h-36 rounded-t-xl object-cover brightness-95 group-hover:brightness-110'
                />
                <span className='absolute bottom-11 left-0 right-0 w-28 bg-gradient-to-t from-black/30 h-20'></span>
                <BsFillPlusCircleFill className='absolute bottom-6 sm:left-9 w-10 h-10 text-primary bg-white p-1 rounded-full active:scale-90 transition-all' />
                <span className='bg-white w-full pt-4 pb-2 rounded-b-xl text-sm text-center'>Create story </span>
            </div>
            <div className='hidden sm:flex flex-col flex-wrap items-start justify-center space-y-4 sm:px-8 my-auto'>
                <div className='flex items-center gap-x-2'>
                    <CgCardHearts className='w-6 h-6' />
                    <span className='text-sm'>Share everyday moments with friends and family.</span>
                </div>
                <div className='flex items-center gap-x-2'>
                    <MdOutlineTimer className='w-6 h-6' />
                    <span className='text-sm'>Stories disappear after 24 hours.</span>
                </div>
                <div className='flex items-center gap-x-2'>
                    <RiMessengerLine className='w-6 h-6' />
                    <span className='text-sm'>Replies and reactions are private.</span>
                </div>
            </div>
        </div>
    )
}

export default Stories
