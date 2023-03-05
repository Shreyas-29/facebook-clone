import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Feed, Header, LoginPage, Sidebar, Widgets } from '@/components';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { getProviders, getSession, useSession } from "next-auth/react";


interface Props {
  providers: Record<string, unknown>;
}


export default function Home({ providers, }: Props) {

  const { data: session } = useSession();
  const [data, setData] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('https://mocki.io/v1/fcbba5ff-4d94-40d1-9e08-80b86ae09616');
      const data = await res.json();
      setData(data);
    };
    fetchData();
  }, []);



  if (!session) return <LoginPage providers={providers} />;

  return (
    <>
      <Head>
        <title>Facebook - Home</title>
        <meta name="description" content="Facebook clone by Shreyas" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <Header />
      <main className='!bg-[#f0f2f5] flex'>
        <Sidebar />
        <Feed />
        <Widgets data={data} />
      </main>
    </>
  )
}

export async function getServerSideProps() {

  const res = await fetch('https://mocki.io/v1/fcbba5ff-4d94-40d1-9e08-80b86ae09616');
  const data = await res.json();
  console.log(data)

  const session = await getSession();

  const providers = await getProviders();

  return {
    props: {
      session,
      providers,
      data
    },
  };
};

