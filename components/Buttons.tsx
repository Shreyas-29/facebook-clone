import React from 'react';
import { IconType } from 'react-icons';


interface Props {
    title: string,
    Icon: IconType,
    active: boolean
}

function Buttons({ title, Icon, active }: Props) {
    return (
        <div className='flex items-center lg:space-x-4 px-2 lg:px-4 py-2 rounded-md lg:w-full hover:bg-primary/10 transition ease-out cursor-pointer hover:scale-105'>
            <Icon className='w-5 h-5 text-primary' />
            <h4 className={`font-medium ${active && 'text-primary'} hidden lg:inline-flex`}>
                {title}
            </h4>
        </div>
    )
}

export default Buttons
