import React, { useState } from 'react';
import Link from 'next/link';
import { BiSearchAlt2 } from 'react-icons/bi';
import { IoMdNotifications, IoMdNotificationsOutline } from 'react-icons/io';
import { BsMessenger } from 'react-icons/bs';
import { useSession, signOut } from "next-auth/react";
import Image from 'next/image';
import toast from 'react-hot-toast';
import Notifications from './Notifications';
import { Spin as Hamburger } from 'hamburger-react'
import { HiHome, HiOutlineUserGroup, HiOutlineUsers } from 'react-icons/hi';
import { MdOndemandVideo, MdOutlineFindInPage } from 'react-icons/md';
import { IoBookmarkOutline, IoLogInOutline, IoTimerOutline } from 'react-icons/io5';
import { FiShoppingBag } from 'react-icons/fi';
import { RiMessengerLine } from 'react-icons/ri';


function Header() {

    const { data: session } = useSession();

    const [modal, setModal] = useState(false);
    const [notification, setNotification] = useState(false);
    const [isOpen, setOpen] = useState(false)

    const openModal = () => {
        setModal(!modal);
    }

    const openNotifications = () => {
        setNotification(!notification);
    }

    const handleSignOut = () => {
        signOut();
        toast.success("Singout successfully!");
    }
    const user = true;


    return (
        <header className='flex items-center justify-center fixed top-0 z-50 w-screen py-2 px-4 md:py-4 md:px-10 bg-white shadow-sm border-b'>
            <nav className='hidden sm:flex items-center justify-between w-full relative'>
                <div>
                    <Link href={'/'}>
                        <h1 className='text-3xl font-semibold text-primary'>facebook</h1>
                    </Link>
                </div>
                <div className='border rounded-full p-1 w-8 h-8 md:w-72 lg:w-96 md:h-10 flex items-center justify-center md:justify-start space-x-2 md:px-4 bg-gray-100 hover:bg-gray-200 mr-20 sm:mr-0 group cursor-pointer'>
                    <BiSearchAlt2 className='h-5 md:h-6 md:w-6 w-5 pl-0.5 md:pl-0 text-gray-500' />
                    <input type="text" placeholder='Search Facebook' className='hidden md:inline-flex outline-none bg-gray-100 group-hover:bg-gray-200 w-full' />
                </div>
                <div className='flex items-center space-x-2 md:space-x-4 justify-end'>
                    <Link href={'https://www.messenger.com'} target='_blank'>
                        <div className='p-2.5 bg-gray-300/70 hover:bg-gray-400/50 rounded-full cursor-pointer'>
                            <BsMessenger className='h-4 w-4 text-gray-800' />
                        </div>
                    </Link>
                    <div onClick={openNotifications} className={`p-2 bg-gray-300/70 hover:bg-gray-400/50 rounded-full cursor-pointer relative ${notification && 'bg-primary/10'}`}>
                        <span className='bg-red-500 text-white w-4 h-4 rounded-full absolute top-0 right-0 text-center text-xs'>2</span>
                        <IoMdNotifications className={`h-5 w-5 text-gray-800 ${notification && 'text-primary'}`} />
                    </div>
                    <div onClick={openModal} className='cursor-pointer'>
                        <Image
                            src={session?.user?.image!}
                            alt={session?.user?.name!}
                            unoptimized
                            draggable={false}
                            width={500}
                            height={500}
                            className='w-9 h-9 rounded-full object-cover'
                        />
                    </div>
                </div>
                {notification ? <Notifications setNotification={setNotification} /> : null}
            </nav>
            {modal ? (
                <div className='z-50'>
                    <div className='bg-gray-500 fixed inset-0 bg-opacity-50 transition-opacity z-40'></div>
                    <div className='fixed top-1/2 left-1/2 transform rounded-2xl z-50 bg-white -translate-x-1/2 -translate-y-1/2'>
                        <div className='bg-white w-80 h-max z-50 rounded-2xl shadow-2xl shadow-gray-400/80 border flex flex-col py-5'>
                            <div className='p-4'>
                                <img src="/logo.png" alt="facebook" className='w-10 h-10 mx-auto mb-4' />
                                <p className='text-center font-medium'>
                                    Are you sure want to sign out?
                                </p>
                                <div className='flex items-center justify-center gap-x-4 pt-8'>
                                    <button
                                        onClick={openModal}
                                        className='font-medium px-5 py-1.5 rounded-md bg-red-500 hover:bg-red-600 relative group text-white'>
                                        <span className='absolute bottom-0 left-0 right-0 group-hover:-translate-y-10 opacity-0 group-hover:opacity-100 transition-transform duration-300 text-lg'>
                                            😃
                                        </span>
                                        Close
                                    </button>
                                    <button
                                        onClick={handleSignOut}
                                        className='font-medium px-5 py-1.5 rounded-md bg-primary hover:bg-blue-600 relative group text-white'>
                                        <span className='absolute bottom-0 left-0 right-0 group-hover:-translate-y-10 opacity-0 group-hover:opacity-100 transition-transform duration-300 text-lg'>
                                            😓
                                        </span>
                                        Signout
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
            <nav className='flex flex-col sm:hidden items-center justify-center w-full space-y-1 relative'>
                <div className='flex items-center justify-between w-full'>
                    <div>
                        <Link href={'/'}>
                            <h1 className='text-3xl font-semibold text-primary'>facebook</h1>
                        </Link>
                    </div>
                    <div className='flex items-center -mr-2'>
                        <div className='active:bg-gray-300/70 hover:bg-gray-300/70 p-2 rounded-full cursor-pointer'>
                            <BiSearchAlt2 className='h-5 w-5 text-gray-800' />
                        </div>
                        <div>
                            <Hamburger toggled={isOpen} toggle={setOpen} size={18} rounded />
                        </div>
                    </div>
                </div>
                <div className='flex items-center justify-evenly space-x-2 w-full'>
                    <div className='flex items-center px-2 py-2 rounded-md hover:bg-gray-400/10 cursor-pointer'>
                        <HiHome className='w-6 h-6 text-primary' />
                    </div>
                    <div className='flex items-center px-2 py-2 rounded-md hover:bg-gray-400/10 cursor-pointer'>
                        <HiOutlineUsers className='w-6 h-6 text-gray-400' />
                    </div>
                    <div className='flex items-center px-2 py-2 rounded-md hover:bg-gray-400/10 cursor-pointer'>
                        <RiMessengerLine className='w-6 h-6 text-gray-400' />
                    </div>
                    <div className='flex items-center px-2 py-2 rounded-md hover:bg-gray-400/10 cursor-pointer'>
                        <MdOndemandVideo className='w-6 h-6 text-gray-400' />
                    </div>
                    <div className='flex items-center px-2 py-2 rounded-md hover:bg-gray-400/10 cursor-pointer'>
                        <IoMdNotificationsOutline className='w-6 h-6 text-gray-400' />
                    </div>
                </div>
            </nav>

            {isOpen && (
                <div className='absolute top-16 z-40 bg-white border-t w-full h-screen py-4'>
                    <div className='w-full py-4'>
                        {user ? (
                            <>
                                <div onClick={openModal} className='cursor-pointer flex items-center justify-between border-b border-slate-300 px-4 w-full pb-4'>
                                    <div className='flex space-x-4 items-center'>
                                        <div className='cursor-pointer'>
                                            <Image
                                                src={session?.user?.image!}
                                                alt={session?.user?.name!}
                                                unoptimized
                                                width={500}
                                                height={500}
                                                className='w-10 h-10 rounded-full object-cover border'
                                            />
                                        </div>
                                        <div className='flex flex-col items-start'>
                                            <h5 className='capitalize font-medium '>
                                                {session?.user?.name!}
                                            </h5>
                                            {/* @ts-ignore */}
                                            <p className='text-xs text-gray-400'>@{session?.user?.tag!}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <IoLogInOutline className='w-7 h-7 text-gray-600' />
                                    </div>
                                </div>
                                <div className='flex flex-col items-start space-y-4 w-full py-4 px-4'>
                                    <div className='flex items-center space-x-4 px-2 py-2 rounded-md w-full hover:bg-primary/10 transition ease-out cursor-pointer'>
                                        <HiHome className='w-6 h-6 text-primary' />
                                        <h4 className='font-medium text-primary'>
                                            Home
                                        </h4>
                                    </div>
                                    <div className='flex items-center space-x-4 px-2 py-2 rounded-md w-full hover:bg-slate-100 transition ease-out group cursor-pointer'>
                                        <RiMessengerLine className='w-6 h-6 text-slate-400' />
                                        <h4 className='font-medium'>
                                            Messenger
                                        </h4>
                                    </div>
                                    <div className='flex items-center space-x-4 px-2 py-2 rounded-md w-full hover:bg-slate-100 transition ease-out group cursor-pointer'>
                                        <HiOutlineUsers className='w-6 h-6 text-slate-400' />
                                        <h4 className='font-medium'>
                                            Friends
                                        </h4>
                                    </div>
                                    <div className='flex items-center space-x-4 px-2 py-2 rounded-md w-full hover:bg-slate-100 transition ease-out group cursor-pointer'>
                                        <HiOutlineUserGroup className='w-6 h-6 text-slate-400' />
                                        <h4 className='font-medium'>
                                            Groups
                                        </h4>
                                    </div>
                                    <div className='flex items-center space-x-4 px-2 py-2 rounded-md w-full hover:bg-slate-100 transition ease-out group cursor-pointer'>
                                        <FiShoppingBag className='w-6 h-6 text-slate-400' />
                                        <h4 className='font-medium'>
                                            Marketplace
                                        </h4>
                                    </div>
                                    <div className='flex items-center space-x-4 px-2 py-2 rounded-md w-full hover:bg-slate-100 transition ease-out group cursor-pointer'>
                                        <IoBookmarkOutline className='w-6 h-6 text-slate-400' />
                                        <h4 className='font-medium'>
                                            Saved
                                        </h4>
                                    </div>
                                    <div className='flex items-center space-x-4 px-2 py-2 rounded-md w-full hover:bg-slate-100 transition ease-out group cursor-pointer'>
                                        <MdOutlineFindInPage className='w-6 h-6 text-slate-400' />
                                        <h4 className='font-medium'>
                                            Pages
                                        </h4>
                                    </div>
                                    <div className='flex items-center space-x-4 px-2 py-2 rounded-md w-full hover:bg-slate-100 transition ease-out group cursor-pointer'>
                                        <IoTimerOutline className='w-6 h-6 text-slate-400' />
                                        <h4 className='font-medium'>
                                            Memories
                                        </h4>
                                    </div>
                                </div>
                            </>
                        ) : null}
                    </div>
                </div>
            )}

        </header>
    )
}

export default Header;