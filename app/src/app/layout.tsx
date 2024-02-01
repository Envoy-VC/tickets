import '~/styles/globals.css';

import { GeistSans } from 'geist/font/sans';
import { Web3Provider } from '~/providers';
import Image from 'next/image';

import BGImage from '../styles/bg.avif';
import Navbar from './components/navbar';

export const metadata = {
  title: 'Create T3 App',
  description: 'Generated by create-t3-app',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <Web3Provider>
        <body
          className={`font-sans ${GeistSans.variable} relative select-none`}
        >
          <main className='absolute top-0 w-full'>
            <Navbar />
            {children}
          </main>
          <Image
            alt='Bg'
            src={BGImage.src}
            className='min-h-[100dvh] w-full'
            width={100}
            height={100}
          />
        </body>
      </Web3Provider>
    </html>
  );
}
