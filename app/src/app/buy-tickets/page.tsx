import React from 'react';
import Image from 'next/image';

import Payment from './components/payment';

import TicketImage from '~/styles/ticket.png';

const BuyTickets = () => {
  return (
    <div className='mx-auto flex max-w-screen-2xl flex-col gap-8 py-12 lg:flex-row'>
      <div className='mx-auto w-full basis-1/2'>
        <Image
          src={TicketImage}
          alt='Ticket'
          width={500}
          height={500}
          className='mx-auto max-w-[256px] object-cover sm:max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg'
        />
      </div>
      <div className='w-full basis-1/2 px-3'>
        <Payment />
      </div>
    </div>
  );
};

export default BuyTickets;
