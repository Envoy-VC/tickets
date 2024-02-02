import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '~/ui/button';
import Countdown from './countdown';

import { FaArrowRightLong } from 'react-icons/fa6';

import TicketImage from '~/styles/ticket.png';

const Hero = () => {
  return (
    <div className='flex flex-col gap-6 xl:flex-row'>
      <div className='flex w-full basis-3/5 flex-col gap-6'>
        <h1 className='hero-bg hero-text text-center text-4xl font-semibold leading-[1.4] md:text-6xl lg:text-7xl xl:text-start'>
          Get ready for the
          <br className='hidden sm:block' /> biggest tech conclave
          <br className='hidden sm:block' /> in North East India!
        </h1>

        <span className='text-center text-xl font-medium text-neutral-800 sm:text-2xl xl:text-start'>
          Get your passes before its too late!
        </span>
        <div className='flex flex-col items-center gap-4 xl:items-start'>
          <Countdown />
          <div className='flex flex-col gap-3'>
            <Button variant='cta' size='cta' asChild className='group'>
              <Link href='/buy-tickets' className=''>
                Get your passes{' '}
                <FaArrowRightLong className='ml-3 transition-all duration-300 ease-out group-hover:translate-x-2' />
              </Link>
            </Button>
            <span className='ml-3 text-sm text-slate-600'>
              Already have a ticket?{' '}
              <Link href='/scan'>
                <span className='font-medium underline'>Scan it here</span>
              </Link>
            </span>
          </div>
        </div>
      </div>
      <div className='flex w-full basis-2/5 items-center justify-center pb-12'>
        <Image
          src={TicketImage}
          alt='Ticket'
          width={400}
          height={400}
          className='rotate-3d max-w-[256px] object-cover sm:max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg'
        />
      </div>
    </div>
  );
};

export default Hero;
