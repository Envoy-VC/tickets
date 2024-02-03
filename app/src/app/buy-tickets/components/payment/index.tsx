'use client';

import React from 'react';
import { useAddress, useContract, useContractRead } from '@thirdweb-dev/react';
import type { BigNumber } from 'ethers';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/ui/tabs';

import CardPayments from '../card-payment';
import CryptoPayment from '../crypto-payment';
import { ABI, CONTRACT_ADDRESS } from '~/lib/contract';
import Link from 'next/link';

const Payment = () => {
  const address = useAddress();
  const { contract } = useContract(CONTRACT_ADDRESS, ABI);
  const { data } = useContractRead(contract, 'balanceOf', [address]) as {
    data: BigNumber | undefined;
  };
  return (
    <Tabs defaultValue='card' className='!dark'>
      <TabsList className='grid w-full grid-cols-2'>
        <TabsTrigger value='card'>Credit/Debit Card</TabsTrigger>
        <TabsTrigger value='crypto'>Pay with Crypto</TabsTrigger>
      </TabsList>
      <TabsContent value='card'>
        {(data?.toNumber() ?? 0) > 0 && (
          <div className='text-sm font-medium text-neutral-600'>
            You already have a ticket. Please{' '}
            <Link href='/scan' className='underline'>
              scan
            </Link>{' '}
            the QR code to verify.
          </div>
        )}
        <CardPayments />
      </TabsContent>
      <TabsContent value='crypto'>
        {(data?.toNumber() ?? 0) > 0 && (
          <div className='text-sm font-medium text-neutral-600'>
            You already have a ticket. Please{' '}
            <Link href='/scan' className='underline'>
              scan
            </Link>{' '}
            the QR code to verify.
          </div>
        )}
        <CryptoPayment />
      </TabsContent>
    </Tabs>
  );
};

export default Payment;
