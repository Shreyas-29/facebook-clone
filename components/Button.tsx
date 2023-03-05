import React from 'react';
import { signIn } from 'next-auth/react';

function Button({ title }: { title: string }) {

    return (
        <div>
            <button
                onClick={() => signIn()}
                className="relative inline-flex items-center justify-start px-8 py-3 overflow-hidden font-medium transition-all bg-white border rounded-lg hover:shadow-lg hover:shadow-primary/40 hover:border-primary active:scale-90 transform duration-300 group">
                <span className="w-52 h-52 rounded-lg rotate-[-40deg] bg-primary absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
                <span className="relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white">
                    {title}
                </span>
            </button>
        </div>
    )
}

export default Button
