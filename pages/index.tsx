import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Feed, Header, Loading, Login, Sidebar, Widgets } from '@/components';
import { useSession } from "next-auth/react";


export default function Home() {

  const { data: session, status } = useSession();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('https://mocki.io/v1/fcbba5ff-4d94-40d1-9e08-80b86ae09616');
      const data = await res.json();
      setData(data);
    };
    fetchData();
  }, []);

  if (status === 'unauthenticated') {
    return (
      <Login />
    )
  }
  if (status === 'loading') {
    return (
      <Loading />
    )
  }

  return (
    <>
      <Head>
        <title>Facebook</title>
        <meta name="description" content="Facebook clone by Shreyas" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <Header />
      <main className="!bg-[#f0f2f5] flex">
        <Sidebar />
        <Feed />
        <Widgets data={data} />
      </main>
    </>
  );
}
