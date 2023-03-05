import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { getReels } from '@/graphql';
import { CgSpinner } from 'react-icons/cg';

function Reels() {


  const [reels, setReels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getReels()
      .then((result) => setReels(result));
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const reel = reels.map((item: any) => item.node);


  return (
    <div className='flex items-start pt-6 pb-2 max-w-[600px] overflow-x-scroll gap-2 scrollbar-hide'>
      <div className='flex items-center justify-center w-full scrollbar-hide gap-x-2 overflow-x-scroll'>
        {loading && (
          <div className='w-full h-full'>
            <CgSpinner className='text-indigo-500 w-6 h-6 animate-spin' />
          </div>
        )}
        {reel?.map((item: any) => (
          <Image
            src={item?.featuredImage.url}
            alt=''
            unoptimized
            width={1000}
            draggable={false}
            height={1000}
            key={item?.id}
            className='w-28 h-48 !sm:w-32 !sm:h-44 first:ml-28 active:scale-90 transition transform active:opacity-20 cursor-pointer rounded-xl object-cover brightness-95 group-hover:brightness-110 shadow'
          />
        ))}
      </div>
    </div>
  )
}

export default Reels
// 576, 672
