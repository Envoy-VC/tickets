'use client';

import React from 'react';
import ConnectButton from './connect';
import Navigation from './navigation';

const Navbar = () => {
  return (
    <div className='mx-auto my-12 max-w-screen-2xl px-6 py-5'>
      <div className='flex flex-row items-center justify-between'>
        <div className='text-[1.75rem] font-bold uppercase'>Tickets</div>
        <Navigation />
        <ConnectButton />
      </div>
    </div>
  );
};

export default Navbar;
