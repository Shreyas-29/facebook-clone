import React from 'react';
import Buttons from './Buttons';
import { HiHome, HiOutlineUsers, HiOutlineCalendar } from 'react-icons/hi';
import { FiShoppingBag } from 'react-icons/fi';
import { BsCollectionPlay } from 'react-icons/bs';
import { IoTimerOutline } from 'react-icons/io5';
import { TbGridDots } from 'react-icons/tb';


function Sidebar() {

    return (
        <section className='hidden sm:flex sm:flex-none flex-col items-center justify-between fixed left-0 w-16 sm:w-28 lg:w-72 xl:w-80 h-screen mt-20 pb-20 px-4 md:px-10 border-r'>
            <div className='flex flex-col items-center lg:items-start justify-center space-y-2 w-full py-5'>
                <Buttons title='Home' Icon={HiHome} active={true} />
                <Buttons title='Firends' Icon={HiOutlineUsers} active={false} />
                <Buttons title='Events' Icon={HiOutlineCalendar} active={false} />
                <Buttons title='Marketplace' Icon={FiShoppingBag} active={false} />
                <Buttons title='Watch' Icon={BsCollectionPlay} active={false} />
                <Buttons title='Memories' Icon={IoTimerOutline} active={false} />

                <div className='border-t border-gray-300 w-full'></div>

                <div className='flex items-center lg:items-center cursor-pointer lg:space-x-4 rounded-md lg:w-full hover:bg-primary/10 transition ease-out px-4 py-2 hover:scale-105'>
                    <TbGridDots className='w-5 h-5 text-primary' />
                    <h4 className='font-medium hidden lg:inline'>
                        See all
                    </h4>
                </div>
            </div>
            <div className='hidden py-5 lg:flex sticky bottom-0 mt-40 flex-wrap items-center justify-start space-x-2 text-gray-500'>
                <span className='text-sm font-normal cursor-pointer text-gray-500 hover:underline'>
                    Privacy
                </span>
                <span>·</span>
                <span className='text-sm font-normal cursor-pointer text-gray-500 hover:underline'>
                    Terms
                </span>
                <span>·</span>
                <span className='text-sm font-normal cursor-pointer text-gray-500 hover:underline'>
                    Advertising
                </span>
                <span>·</span>
                <span className='text-sm font-normal cursor-pointer text-gray-500 hover:underline'>
                    Ad Choices
                </span>
                <span>·</span>
                <span className='text-sm font-normal cursor-pointer text-gray-500 hover:underline'>
                    Cookies
                </span>
            </div>
        </section>
    )
}

export default Sidebar;