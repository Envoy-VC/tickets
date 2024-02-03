'use client';

import React from 'react';
import { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { useSearchParams } from 'next/navigation';

import TicketImage from '~/styles/ticket.png';
import { Button } from '~/ui/button';

import { cn } from '~/lib/utils';

const InfoBox = ({ success }: { success: boolean }) => {
  return (
    <div className='flex flex-col items-center justify-center gap-3'>
      <Image
        src={TicketImage}
        width={200}
        height={200}
        alt='Ticket Image'
        className='w-full max-w-xs'
      />
      <div className={cn('text-xl font-semibold text-neutral-800')}>
        {success ? 'Payment Successful' : 'Payment Failed'}
      </div>
      {success && (
        <div className='font-semibold text-neutral-800'>
          You ticket will arrive in your wallet soon.
        </div>
      )}
      <Button asChild>
        <Link href='/'>Back to Home</Link>
      </Button>
    </div>
  );
};

const PaymentCallback = () => {
  const searchParams = useSearchParams();
  const hasSuccess = searchParams.has('success');
  const success = searchParams.get('success');

  return (
    <>
      {!hasSuccess && <></>}
      {hasSuccess && success === 'true' && <InfoBox success={true} />}
      {hasSuccess && success === 'false' && <InfoBox success={false} />}
    </>
  );
};

const PaymentCallbackPage = () => {
  return (
    <Suspense>
      <PaymentCallback />
    </Suspense>
  );
};

export default PaymentCallbackPage;
