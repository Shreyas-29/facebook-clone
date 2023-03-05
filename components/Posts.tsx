import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { HiOutlineBookmark, HiOutlineDotsHorizontal, HiOutlineLink, HiX } from 'react-icons/hi';
import { IoArrowRedoOutline, IoChatboxOutline, IoClose, IoEarth } from 'react-icons/io5'
import { MdDelete, MdOutlineThumbUp, MdThumbUp } from 'react-icons/md';
import Moment from 'react-moment';
import Modal from './Modal';
import { useSession } from "next-auth/react";
import { DocumentData, collection, deleteDoc, doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '@/firebase';
import toast from 'react-hot-toast';

interface Props {
    id: string,
    post: any,
    key: string
}


function Posts({ key, post, id }: Props) {

    const { data: session } = useSession();

    const [toggleInfo, setToggleInfo] = useState(false);
    const [liked, setLiked] = useState(false);
    const [count, setCount] = useState([]);
    const [scale, setScale] = useState(100);
    const [openModal, setOpenModal] = useState(false);
    const [postSaved, setPostSaved] = useState(false);
    const [comments, setComments] = useState<DocumentData[]>([]);

    const modalRef = useRef<HTMLDivElement | null>(null);

    const handleToggle = () => {
        setToggleInfo(!toggleInfo);
    }

    const handleLiked = async () => {
        setLiked(!liked);
        if (liked) {
            // @ts-ignore 
            await deleteDoc(doc(db, "posts", id, "likes", session?.user?.uid!));
        }
        else {
            // @ts-ignore 
            await setDoc(doc(db, "posts", id, "likes", session?.user?.uid!), {
                username: session?.user?.name!,
            })
        }
    }

    const toggleModal = () => {
        setOpenModal(!openModal);
    }

    const deletePost = () => {
        deleteDoc(doc(db, "posts", id));
        toast.success('Post deleted successfully!');
    }

    const savePost = () => {
        if (postSaved) {
            return;
        }
        setPostSaved(true);
        setToggleInfo(!toggleInfo);
        toast.promise(
            // Promise function that resolves after 1 second
            new Promise((resolve) => setTimeout(resolve, 1000)),
            {
                // Options for the toast
                loading: 'Saving post...',
                success: 'Post saved!',
                error: 'Failed to save post',
            }
        )
    };

    const isWebShareSupported = () => {
        if (navigator?.share!) {
            return true;
        }

        return false;
    };

    const shareUrl = async () => {
        try {
            await navigator.share({
                title: document.title,
                url: window.location.href,
            });
        } catch (err) {
            console.error(err);
        }
    };
    // console.log(isWebShareSupported())


    useEffect(() => {
        if (liked) {
            setScale(150);
            setTimeout(() => {
                setScale(100);
            }, 200);
        }
    }, [liked]);

    useEffect(() =>
        onSnapshot(collection(db, "posts", id, "likes"), (snapshot) =>
            // @ts-ignore 
            setCount(snapshot.docs)),
        [db, id]
    );

    useEffect(() =>
        // @ts-ignore 
        setLiked(count.findIndex((like) => like.id === session?.user?.uid!) !== -1),
        [count]
    );

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


    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                setToggleInfo(false);
            }
        };

        window.addEventListener('mousedown', handleClickOutside);

        return () => {
            window.removeEventListener('mousedown', handleClickOutside);
        };
    }, [modalRef]);


    return (
        <div key={key} className={`flex flex-col items-start rounded-2xl bg-white space-y-4 shadow pt-4 pb-2`}>
            <div className='flex items-center justify-center space-x-4 w-full relative px-4'>
                <div>
                    <Image
                        src={post?.userImg!}
                        alt=''
                        unoptimized
                        width={1000}
                        height={1000}
                        priority={true}
                        className='w-10 h-10 rounded-full object-cover'
                    />
                </div>
                <div className='flex flex-col items-start flex-grow'>
                    <h3 className='font-semibold capitalize text-gray-900'>
                        {post?.username}
                    </h3>
                    <p className='text-gray-500 flex items-center space-x-1 font-normal text-xs'>
                        <Moment format='DD MMM YY' className='hover:underline select-none cursor-pointer'>
                            {post?.timestamp?.toDate()}
                        </Moment>
                        <span>at</span>
                        <Moment format='HH:mm' className='hover:underline select-none cursor-pointer'>
                            {post?.timestamp?.toDate()}
                        </Moment>
                        <span>·</span>
                        <IoEarth title='Shared with public' className='text-gray-600' />
                    </p>
                </div>
                {/* @ts-ignore */}
                {session?.user?.uid === post?.id ? (
                    <>
                        <div title='More info' onClick={handleToggle} className='p-1 w-7 h-7 rounded-full hover:bg-slate-200 flex items-center cursor-pointer'>
                            <HiOutlineDotsHorizontal className='text-gray-500 group-hover:text-gray-900 w-6 h-6' />
                        </div>
                        <div title='Delete this post' onClick={deletePost} className='p-1 w-7 h-7 rounded-full hover:bg-red-100 flex items-center cursor-pointer group'>
                            <MdDelete className='text-gray-500 group-hover:text-red-500 w-6 h-6' />
                        </div>
                    </>
                ) : (
                    <div onClick={handleToggle} className='p-1 w-7 h-7 rounded-full hover:bg-slate-200 flex items-center cursor-pointer'>
                        <HiOutlineDotsHorizontal className='text-gray-500 group-hover:text-gray-900 w-6 h-6' />
                    </div>
                )}
                {toggleInfo && (
                    <div ref={modalRef} className='py-4 w-44 bg-white rounded-2xl flex flex-col items-start absolute top-8 right-6 border shadow-xl shadow-gray-400/20 transition-transform origin-top-right'>
                        <div onClick={savePost} className='flex items-center space-x-2 text-gray-600 px-4 w-full py-2 hover:bg-slate-100 transition-all cursor-pointer'>
                            <HiOutlineBookmark className='w-5 h-5' />
                            <span className='text-sm'>{postSaved ? 'Save this post' : 'Post saved'} </span>
                        </div>
                        <div className='flex items-center space-x-2 text-gray-600 px-4 w-full py-2 hover:bg-slate-100 transition-all cursor-pointer'>
                            <HiOutlineLink className='w-5 h-5' />
                            <span className='text-sm'>Copy Link</span>
                        </div>
                    </div>
                )}
            </div>
            <div className='flex flex-col items-start justify-center w-full'>
                <div className='px-4 mb-4'>
                    <p>{post?.text}</p>
                </div>
                {post?.image ? (
                    <div className='w-full bg-black mb-2'>
                        <Image
                            src={post?.image!}
                            alt=''
                            unoptimized
                            width={1000}
                            height={1000}
                            className='w-full sm:h-80 object-cover'
                        />
                    </div>
                ) : null}
                <div className='flex items-center justify-between w-full px-4 pb-2 border-b mb-2'>
                    <div className='flex items-center space-x-2'>
                        <span className='bg-primary text-white p-1 rounded-full cursor-pointer'>
                            <MdThumbUp className='sm:w-3 w-2 sm:h-3 h-2' />
                        </span>
                        {liked ? (
                            <span className='text-gray-500 text-xs sm:text-sm'>
                                {/* {count.length >= 1 && (
                                    count.length
                                )} */}
                                {count.length > 1 ? (
                                    <p>You and {count.length - 1} others</p>
                                ) : (
                                    <p>You liked the post</p>
                                )}
                            </span>
                        ) : (
                            <span className='text-gray-500 text-xs sm:text-sm'>
                                {count.length === 0 ? null : count.length}
                            </span>
                        )}
                    </div>
                    {comments.length >= 1 ? (
                        <div>
                            <span className='text-sm text-gray-500'>
                                {comments.length} comments
                            </span>
                        </div>
                    ) : null}
                </div>
                <div className='flex items-center justify-center w-full px-4 relative'>
                    {liked ? (
                        <button onClick={handleLiked} className='flex items-center justify-center space-x-2 cursor-pointer px-4 md:px-8 py-2 rounded-md hover:bg-slate-200/50 w-full'>
                            <MdThumbUp className={`sm:w-6 sm:h-6 text-primary transform scale-${scale} transition-all duration-500 ease-out`} />
                            <span className='text-primary font-semibold text-xs sm:text-base'>Like</span>
                        </button>
                    ) : (
                        <button onClick={handleLiked} className='flex items-center justify-center space-x-2 cursor-pointer px-4 md:px-8 py-2 rounded-md hover:bg-slate-200/50 w-full'>
                            <MdOutlineThumbUp className='sm:w-6 sm:h-6 text-gray-500' />
                            <span className='text-gray-500 font-semibold text-xs sm:text-base'>Like</span>
                        </button>
                    )}
                    <button onClick={toggleModal} className='flex items-center justify-center space-x-2 cursor-pointer px-4 md:px-8 py-2 rounded-md hover:bg-slate-200/50 w-full'>
                        <IoChatboxOutline className='sm:w-6 sm:h-6 text-gray-500' />
                        <span className='text-gray-500 font-semibold text-xs sm:text-base'>Comment</span>
                    </button>

                    {openModal ? <Modal post={post} toggleModal={toggleModal} setOpenModal={setOpenModal} /> : null}

                    <button onClick={shareUrl} className='flex items-center justify-center space-x-2 cursor-pointer px-4 md:px-8 py-2 rounded-md hover:bg-slate-200/50 w-full'>
                        <IoArrowRedoOutline className='sm:w-6 sm:h-6 text-gray-500' />
                        <span className='text-gray-500 font-semibold text-xs sm:text-base'>Share</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Posts
