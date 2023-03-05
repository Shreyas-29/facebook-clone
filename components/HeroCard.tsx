import React, { useState } from 'react'
import Stories from './Stories';
import Reels from './Reels';
import { MdOutlineSlowMotionVideo } from 'react-icons/md';
import { CgStories } from 'react-icons/cg';



function HeroCard() {

    const [activeTab, setActiveTab] = useState('stories');

    const handleClick = (tab: string) => {
        setActiveTab(tab)
    }

    return (
        <div className='relative bg-white rounded-2xl shadow mb-8'>
            <div className='flex flex-col items-center justify-center mx-auto space-x-4 p-4 rounded-md'>
                <div className='flex items-center justify-between border-b w-full'>
                    <button onClick={() => handleClick('stories')} className={`bg-white flex items-center justify-center cursor-pointer ease-out gap-x-2 w-1/2 hover:bg-gray-200 rounded-md px-4 py-2 font-medium capitalize ${activeTab === 'stories' ? 'text-primary border-b-[3px] rounded-b-none hover:bg-white border-b-primary' : 'text-gray-600'}`}>
                        <CgStories className='h-6 w-6' />
                        stories
                    </button>
                    <button onClick={() => handleClick('reels')} className={`bg-white flex items-center justify-center cursor-pointer ease-out gap-x-2 w-1/2 hover:bg-gray-200 rounded-md px-4 py-2 font-medium capitalize ${activeTab === 'reels' ? 'text-primary border-b-[3px] rounded-b-none hover:bg-white border-b-primary' : 'text-gray-600'}`}>
                        <MdOutlineSlowMotionVideo className='h-6 w-6' />
                        reels
                    </button>
                </div>
                {activeTab === 'stories' && <Stories />}
                {activeTab === 'reels' && <Reels />}
            </div>
        </div>
    )
}

export default HeroCard
