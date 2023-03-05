import Image from 'next/image';
import React, { MouseEventHandler, useRef, useState } from 'react';
import { useEffect } from 'react';
import { HiOutlineCalendar, HiOutlineChartBar, HiOutlineEmojiHappy, HiOutlinePhotograph, HiX } from 'react-icons/hi';
import { IoEarth } from 'react-icons/io5';
import Moment from 'react-moment';
import { useSession } from "next-auth/react";
import { DocumentData, addDoc, collection, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { db } from '@/firebase';
import toast from 'react-hot-toast';
import { atom, useRecoilValue } from 'recoil';


function Modal({ post, toggleModal, setOpenModal }: any) {

    const { data: session } = useSession();

    const modalRef = useRef<HTMLDivElement | null>(null);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState<DocumentData[]>([]);

    const postIdState = atom({
        key: 'postIdState',
        default: '',
    });


    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                setOpenModal(false);
            }
        };

        window.addEventListener('mousedown', handleClickOutside);

        return () => {
            window.removeEventListener('mousedown', handleClickOutside);
        };
    }, [modalRef]);


    useEffect(() => {
        if (post?.id) {
            const unsubscribe = onSnapshot(
                collection(db, 'posts', post?.id, 'comments'),
                (snapshot) => {
                    const comments = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                    setComments(comments);
                }
            );
            return unsubscribe;
        }
    }, [post?.id]);




    const sendComment = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, postId: string) => {
        e.preventDefault();

        await addDoc(collection(db, 'posts', postId, 'comments'), {
            comment: comment,
            username: session?.user?.name!,
            // @ts-ignore
            tag: session?.user?.tag!,
            userImg: session?.user?.image!,
            timestamp: serverTimestamp(),
        });

        setComment('');
        // setOpenModal(false);
        toast.success('Comment added successfully');
    };


    return (
        <div>
            <div ref={modalRef} className='bg-gray-500 fixed rounded-2xl inset-0 bg-opacity-40 transition-opacity z-40'></div>
            <div ref={modalRef} className='fixed top-1/2 left-1/2 transform rounded-2xl z-50 bg-white -translate-x-1/2 -translate-y-1/2'>
                <div className='bg-white w-[85vw] sm:w-[480px] h-96 sm:h-96 z-50 rounded-2xl py-4 shadow-xl border flex flex-col'>
                    <div className='flex items-center justify-between w-full border-b pb-4 px-4'>
                        <h2 className='text-gray-800 font-medium'>Share your thoughts</h2>
                        <button onClick={toggleModal} className='flex items-center justify-center w-8 h-8 hover:bg-gray-300 rounded-full cursor-pointer'>
                            <HiX className='w-5 h-5 text-gray-700' />
                        </button>
                    </div>
                    <div className='p-4 flex flex-col w-full border-b shadow'>
                        <div className='flex items-start space-x-2'>
                            <div>
                                <Image
                                    src={post?.userImg}
                                    alt=''
                                    unoptimized
                                    width={1000}
                                    height={1000}
                                    priority={true}
                                    className='w-10 h-10 rounded-full object-cover object-center'
                                />
                            </div>
                            <div className='flex flex-col items-start flex-grow'>
                                <div className='flex items-center space-x-0.5'>
                                    <h3 className='font-semibold text-gray-900'>
                                        {post?.username.substr(0, 8)}
                                    </h3>
                                    <span className='hidden lg:inline text-gray-500'>·</span>
                                    <span className='hidden lg:inline text-xs text-gray-400'>
                                        {/* @ts-ignore */}
                                        @{post?.tag!}
                                    </span>
                                    <span className='text-gray-500'>·</span>
                                    <Moment fromNow className='select-none cursor-pointer text-gray-400 text-xs'>
                                        {post?.timestamp?.toDate()}
                                    </Moment>
                                    <span className='text-gray-500'>·</span>
                                    <IoEarth title='Shared with public' className='text-gray-500 w-3 h-3' />
                                </div>
                                <p className='text-gray-500 flex items-center font-normal text-sm'>
                                    {post?.text}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-col items-center gap-y-1 overflow-y-scroll scrollbar-hide pb-8 pt-2'>
                        {comments.map((comment: any) => (
                            <div className='px-4 py-1 flex flex-col w-full' key={comment?.timestamp}>
                                <div className='flex items-start space-x-2'>
                                    <div>
                                        <Image
                                            src={comment?.userImg}
                                            alt=''
                                            unoptimized
                                            width={1000}
                                            height={1000}
                                            priority={true}
                                            className='w-10 h-10 rounded-full object-cover object-center'
                                        />
                                    </div>
                                    <div className='flex flex-col items-start flex-grow'>
                                        <div className='flex items-center space-x-0.5'>
                                            <h3 className='font-semibold text-gray-900'>
                                                {comment?.username.substr(0, 8)}
                                            </h3>
                                            <span className='text-gray-500'>·</span>
                                            <Moment fromNow className='select-none cursor-pointer text-gray-400 text-xs'>
                                                {comment?.timestamp?.toDate()}
                                            </Moment>
                                        </div>
                                        <p className='text-gray-500 flex items-center font-normal text-sm'>
                                            {comment?.comment}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className={`px-4 pt-4 flex flex-col w-full bg-white fixed sm:relative ${comments.length <= 0 && 'sm:fixed sm:bottom-0 mt-auto sm:pb-4'} bottom-0 rounded-b-2xl`}>
                        <div className='flex items-center space-x-2'>
                            <div>
                                <Image
                                    src={session?.user?.image!}
                                    alt=''
                                    unoptimized
                                    width={1000}
                                    height={1000}
                                    priority={true}
                                    className='w-10 h-10 rounded-full object-cover object-center'
                                />
                            </div>
                            <div className='flex flex-col items-start flex-grow'>
                                <input
                                    type="text"
                                    value={comment}
                                    onChange={(event) => setComment(event.target.value)}
                                    placeholder='Write a comment...'
                                    className='border bg-slate-100 outline-none rounded-full w-full px-3 sm:px-4 py-1.5 hover:bg-slate-200 cursor-pointer caret-gray-500 text-sm sm:text-base'
                                />
                            </div>
                        </div>
                        <div className='flex items-center justify-between w-full pt-2 pb- pr-8'>
                            <div className='flex items-center justify-center space-x-2 relative'>
                                <div className='icon cursor-pointer group'>
                                    <HiOutlinePhotograph className='h-5 w-5 text-primary' />
                                    <input
                                        type="file"
                                        hidden
                                    />
                                    <p className='absolute top-10 -left-2 mx-auto px-2 py-1 rounded-md text-white bg-gray-600 bg-opacity-50 backdrop-blur-lg text-xs opacity-0 group-hover:opacity-100'>
                                        Media
                                    </p>
                                </div>
                                <div className='icon cursor-pointer group relative'>
                                    <HiOutlineChartBar className='h-5 w-5 text-primary rotate-90' />
                                    <p className='absolute top-10 left-0 mx-auto px-2 py-1 rounded-md text-white bg-gray-600 bg-opacity-50 backdrop-blur-lg text-xs opacity-0 group-hover:opacity-100'>
                                        Poll
                                    </p>
                                </div>
                                <div className='icon cursor-pointer group relative'>
                                    <HiOutlineEmojiHappy className='h-5 w-5 text-primary' />
                                    <p className='absolute top-10 -left-1 mx-auto px-2 py-1 rounded-md text-white bg-gray-600 bg-opacity-50 backdrop-blur-lg text-xs opacity-0 group-hover:opacity-100'>
                                        Emoji
                                    </p>
                                </div>
                                <div className='icon cursor-pointer group relative'>
                                    <HiOutlineCalendar className='h-5 w-5 text-primary' />
                                    <p className='absolute top-10 -left-3 mx-auto px-2 py-1 rounded-md text-white bg-gray-600 bg-opacity-50 backdrop-blur-lg text-xs opacity-0 group-hover:opacity-100'>
                                        Schedule
                                    </p>
                                </div>
                            </div>
                            <div className='mb-2 sm:mb-0'>
                                <button
                                    onClick={(e) => sendComment(e, post?.id)}
                                    disabled={!comment}
                                    className='px-4 py-2 rounded-full bg-primary disabled:bg-primary/50 disabled:cursor-not-allowed text-white text-sm'>
                                    Reply
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal
