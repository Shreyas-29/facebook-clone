import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from "next-auth/react";
import { Toaster } from 'react-hot-toast';
import { RecoilRoot } from 'recoil';


export default function App({
  Component,
  pageProps: { session, pageProps }
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        <Component {...pageProps} />
        <Toaster
          position="bottom-center"
          reverseOrder={false}
          gutter={8}
        />
      </RecoilRoot>
    </SessionProvider>
  )
}
