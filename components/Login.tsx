import React from 'react';
import Head from 'next/head';
import Button from './Button';
import { FcGoogle } from 'react-icons/fc';



function Login() {

    return (
        <div className='bg-white'>
            <Head>
                <title>Facebook - Sign in with Google</title>
                <meta name="description" content="Facebook clone by Shreyas" />
                <link rel="icon" href="/logo.png" />
            </Head>
            <div className='flex flex-col gap-y-4 items-center justify-center h-screen'>
                <FcGoogle className='w-24 h-24 drop-shadow-lg' />
                <Button title={'Sign in with Google'} />
            </div>
        </div>
    )
}

export default Login;
