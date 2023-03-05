import React, { useEffect, useState } from 'react'
import HeroCard from './HeroCard'
import InputBox from './InputBox'
import Posts from './Posts'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '@/firebase';
import Loading from './Loading';


function Feed() {

    const [posts, setPosts] = useState<{ id: any, data: any }[]>([]);

    useEffect(() => {
        onSnapshot(
            query(collection(db, 'posts'), orderBy('timestamp', 'desc')),
            (snapshot) => {
                setPosts(snapshot.docs)
            }
        )
    }, [db]);


    return (
        <section className='my-32 sm:my-24 flex-grow ml-4 sm:ml-32 lg:ml-96 xl:mx-auto pb-44 mr-4 overflow-y-scroll max-w-2xl mx-auto container w-full relative scrollbar-hide'>
            <HeroCard />
            <InputBox />
            <div className='space-y-4'>
                {posts.map((post) => {
                    return (
                        <Posts post={post?.data()} id={post?.id} key={post?.id} />
                    )
                })}
            </div>
        </section>
    )
}

export default Feed
