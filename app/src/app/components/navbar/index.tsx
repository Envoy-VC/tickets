'use client';

import React from 'react';
import ConnectButton from './connect';
import Navigation from './navigation';
import Link from 'next/link';

const Navbar = () => {
  return (
    <div className='mx-auto my-12 max-w-screen-2xl px-6 py-5'>
      <div className='flex flex-row items-center justify-between'>
        <Link href='/' className='text-[1.75rem] font-bold uppercase'>
          Tickets
        </Link>
        <Navigation />
        <ConnectButton />
      </div>
    </div>
  );
};

export default Navbar;
