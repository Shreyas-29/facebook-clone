import Image from 'next/image'
import React, { useRef, useState } from 'react'
import { HiX } from 'react-icons/hi'
import { HiOutlineFaceSmile, HiOutlinePhoto } from 'react-icons/hi2'
import { IoVideocamOutline } from 'react-icons/io5'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react';
import { addDoc, collection, doc, serverTimestamp, updateDoc, } from "@firebase/firestore";
import { db, storage } from "../firebase";
import { getDownloadURL, ref, uploadString } from 'firebase/storage'
import { CgSpinner } from 'react-icons/cg';
import { useSession } from "next-auth/react";



function InputBox() {

    const { data: session } = useSession();

    const [input, setInput] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [showEmojis, setShowEmojis] = useState(false);
    const [loading, setLoading] = useState(false);

    const fileRef: React.RefObject<HTMLInputElement> = useRef(null);

    const Loading = () => {
        return (
            <div className='flex items-center justify-center h-full w-full space-x-2'>
                <CgSpinner className='text-indigo-500 animate-spin' />
                <p className='text-sm text-indigo-500'>Posting...</p>
            </div>
        )
    }

    const sendPost = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (loading) return <Loading />;
        setLoading(true);

        const docRef = await addDoc(collection(db, 'posts'), {
            // @ts-ignore
            id: session?.user?.uid!,
            username: session?.user?.name!,
            userImg: session?.user?.image!,
            // @ts-ignore
            tag: session?.user?.tag!,
            text: input,
            timestamp: serverTimestamp(),
            // likes: 538
        });

        const imageRef = ref(storage, `posts/${docRef.id}/image`);

        if (selectedFile) {
            await uploadString(imageRef, selectedFile, "data_url").then(async () => {
                const downloadURL = await getDownloadURL(imageRef);
                await updateDoc(doc(db, "posts", docRef.id), {
                    image: downloadURL,
                });
            });
        }

        setLoading(false);
        setInput("");
        setSelectedFile(null);
        setShowEmojis(false);
        // console.log('Post submited.');
    }

    const addImageToPost = (e: React.ChangeEvent<HTMLInputElement>) => {
        const reader = new FileReader();
        if (e?.target.files && e?.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
        }

        reader.onload = (readerEvent: any) => {
            setSelectedFile(readerEvent.target.result);
        };
    };

    const addEmoji = (e: any) => {
        let sym = e.unified.split("-");
        let codesArray: number[] = [];
        sym.forEach((el: string) => codesArray.push(parseInt("0x" + el, 16)));
        let emoji = String.fromCodePoint(...codesArray);
        setInput(input + emoji);
    };


    return (
        <div className='flex flex-col items-center justify-center rounded-2xl shadow bg-white px-4 pt-4 pb-2 mb-4'>
            <div className='flex flex-col items-center space-y-4 w-full border-b pb-4'>
                <div className='flex items-start space-x-2 sm:space-x-4 w-full'>
                    <div className='w-12 h-12'>
                        <Image
                            src={session?.user?.image!}
                            alt=''
                            unoptimized
                            width={1000}
                            height={1000}
                            className='w-10 h-10 rounded-full object-cover border cursor-pointer saturate-100 hover:saturate-150'
                        />
                    </div>
                    <form onSubmit={sendPost} className='flex w-full space-x-2 sm:space-x-4 items-center'>
                        <div className='flex-1 items-center relative'>
                            <input
                                type="text"
                                value={input}
                                onChange={(event) => setInput(event.target.value)}
                                placeholder={`What's on your mind ${session?.user?.name!.substr(0, 8)}?`}
                                className='border bg-slate-100 outline-none rounded-full w-full px-3 sm:px-4 py-2 hover:bg-slate-200 cursor-pointer caret-gray-500 text-sm sm:text-base'
                            />
                            {input ? (
                                <div onClick={() => setInput("")} className='absolute w-6 h-6 rounded-full flex items-center justify-center top-[7px] sm:top-2.5 right-2 cursor-pointer bg-gray-200'>
                                    <HiX className='w-5 h-5 text-slate-800' />
                                </div>
                            ) : null}
                        </div>
                        {input || selectedFile ? (
                            <div className='flex-none items-center'>
                                <button type='submit' className='px-4 sm:px-8 py-3 sm:py-2.5 rounded-full bg-primary text-white font-medium text-xs sm:text-sm hover:bg-blue-700'>
                                    Post
                                </button>
                            </div>
                        ) : null}
                    </form>
                </div>
                {selectedFile && (
                    <div className='relative my-4 rounded-xl'>
                        <div onClick={() => setSelectedFile(null)} className='absolute w-8 h-8 bg-slate-800 hover:bg-slate-700 bg-opacity-75 rounded-full flex items-center justify-center top-1 left-1 cursor-pointer'>
                            <HiX className='w-5 h-5 text-white' />
                        </div>
                        <Image
                            src={selectedFile}
                            alt='file'
                            unoptimized
                            width={1000}
                            height={1000}
                            draggable={false}
                            className='rounded-xl h-48 sm:max-h-80 w-full object-cover select-none pointer-events-none'
                        />
                    </div>
                )}
            </div>
            {!loading && (
                <div className='flex items-center justify-center space-x- w-full mx-auto px-4 pt-2 relative'>
                    <button className='flex items-center justify-center space-x-2 cursor-pointer px-4 md:px-8 py-2 rounded-md hover:bg-slate-200/50 w-full'>
                        <IoVideocamOutline className='w-5 h-5 sm:w-6 sm:h-6 text-red-500' />
                        <span className='text-gray-800 font-medium text-sm sm:text-base'>Video</span>
                    </button>
                    <button
                        onClick={() => fileRef.current?.click()}
                        className='flex items-center justify-center space-x-2 cursor-pointer px-4 md:px-8 py-2 rounded-md hover:bg-slate-200/50 w-full relative'
                    >
                        <input
                            type="file"
                            hidden
                            onChange={addImageToPost}
                            ref={fileRef}
                        />
                        <HiOutlinePhoto className='w-5 h-5 sm:w-6 sm:h-6 text-green-500' />
                        <span className='text-gray-800 font-medium text-sm sm:text-base'>Photo</span>
                    </button>
                    <button onClick={() => setShowEmojis(!showEmojis)} className='flex items-center justify-center space-x-2 cursor-pointer px-4 md:px-8 py-2 rounded-md hover:bg-slate-200/50 w-full'>
                        <HiOutlineFaceSmile className='w-5 h-5 sm:w-6 sm:h-6 text-yellow-500' />
                        <span className='text-gray-800 font-medium text-sm sm:text-base'>Feeling</span>
                    </button>
                    {showEmojis && (
                        <div className='hidden sm:flex absolute top-12 sm:top-14 sm:right-3 shadow-2xl shadow-gray-800/50 z-30'>
                            <Picker
                                onEmojiSelect={addEmoji}
                                data={data}
                                theme='light'
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default InputBox
