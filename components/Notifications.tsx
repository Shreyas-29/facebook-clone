import Image from 'next/image'
import React, { useEffect, useRef } from 'react'
import { HiOutlineDotsHorizontal } from 'react-icons/hi'

type NotificationsProps = {
    setNotification: (value: boolean) => void;
}

function Notifications({ setNotification }: NotificationsProps) {

    const modalRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                setNotification(false);
            }
        };

        window.addEventListener('mousedown', handleClickOutside);

        return () => {
            window.removeEventListener('mousedown', handleClickOutside);
        };
    }, [modalRef]);


    return (
        <div ref={modalRef} className='hidden lg:inline absolute top-12 right-0 bg-white rounded-2xl border h-max shadow-xl shadow-gray-400/40'>
            <div className='py-4 px-8 flex flex-col items-start w-full'>
                <div className='flex items-center justify-between w-full'>
                    <h2 className='text-lg font-semibold'>Notifications</h2>
                    <div title='More info' className='p-1 w-7 h-7 rounded-full hover:bg-slate-200 flex items-center cursor-pointer'>
                        <HiOutlineDotsHorizontal className='text-gray-500 group-hover:text-gray-900 w-6 h-6' />
                    </div>
                </div>
                <div className='flex items-start space-x-2 w-full mt-4'>
                    <span className='px-4 py-2 rounded-full cursor-pointer bg-primary/10 text-primary hover:bg-primary/20 text-sm font-medium'>
                        All
                    </span>
                    <span className='px-4 py-2 rounded-full cursor-pointer hover:bg-slate-100 text-slate-600 text-sm font-medium'>
                        Unread
                    </span>
                </div>
                <div className='mt-4 flex items-center justify-between w-full'>
                    <span className='text-slate-900 text-sm font-medium'>
                        New
                    </span>
                    <span className='text-primary cursor-pointer text-xs'>
                        See all
                    </span>
                </div>
                <div className='py-4 flex flex-col items-start gap-y-4 w-full'>
                    <div className='flex items-center w-full space-x-4'>
                        <Image
                            src={'https://t.ly/7bn_I'}
                            alt='u'
                            width={500}
                            height={500}
                            unoptimized
                            draggable={false}
                            className='w-14 h-14 rounded-full border object-cover'
                        />
                        <div className='flex flex-col items-start'>
                            <h4 className='font-normal text-gray-800 text-xs'>You have a new friend suggestion</h4>
                            <h5 className='cursor-pointer text-primary hover:text-blue-700 font-semibold text-sm'>Suraj Kumbhar</h5>
                        </div>
                    </div>
                    <div className='flex items-center w-full space-x-4'>
                        <Image
                            src={'https://t.ly/m_EY'}
                            alt='u'
                            width={500}
                            height={500}
                            unoptimized
                            draggable={false}
                            className='w-14 h-14 rounded-full border object-cover'
                        />
                        <div className='flex flex-col items-start'>
                            <h4 className='font-normal text-gray-800 text-xs'>You have a new friend suggestion</h4>
                            <h5 className='cursor-pointer text-primary hover:text-blue-700 font-semibold text-sm'>Gautami Patil</h5>
                        </div>
                    </div>
                    <div className='flex items-center w-full space-x-4'>
                        <Image
                            src={'https://t.ly/_hq4'}
                            alt='u'
                            width={500}
                            height={500}
                            unoptimized
                            draggable={false}
                            className='w-14 h-14 rounded-full border object-cover'
                        />
                        <div className='flex flex-col items-start'>
                            <h4 className='font-normal text-gray-800 text-xs'>You have recived 2 alerts</h4>
                            <h5 className='cursor-pointer text-primary hover:text-blue-700 font-semibold text-sm'>Meta</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Notifications
