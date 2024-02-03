/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Image from 'next/image';

import Payment from './components/payment';

import TicketImage from '~/styles/ticket.png';

const BuyTickets = () => {
  return (
    <div className='mx-auto flex max-w-screen-2xl flex-col gap-8 py-12 lg:flex-row'>
      <div className='mx-auto flex w-full basis-1/2 flex-col gap-2'>
        <Image
          src={TicketImage}
          alt='Ticket'
          width={500}
          height={500}
          className='mx-auto max-w-[256px] object-cover sm:max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg'
        />
        <div className='mx-auto flex w-full max-w-[256px] flex-row items-center justify-between sm:max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg'>
          <span>Total Cost:</span>
          <div className='flex flex-row items-center gap-2'>
            <div className='flex flex-row items-center font-semibold text-neutral-800'>
              6 MATIC
              <img
                src='https://ipfs.io/ipfs/QmcxZHpyJa8T4i63xqjPYrZ6tKrt55tZJpbXcjSDKuKaf9/polygon/512.png'
                alt='Polygon'
                className='ml-2 h-5 w-5'
              />
            </div>
            <span className='text-neutral-400'>or</span>
            <span className='font-semibold text-neutral-800'>₹399</span>
          </div>
        </div>
      </div>
      <div className='w-full basis-1/2 px-3'>
        <Payment />
      </div>
    </div>
  );
};

export default BuyTickets;
