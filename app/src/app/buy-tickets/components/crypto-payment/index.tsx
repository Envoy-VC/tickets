/* eslint-disable @next/next/no-img-element */
'use client';

import React from 'react';

import {
  useAddress,
  useContract,
  useContractWrite,
  useSDK,
} from '@thirdweb-dev/react';
import { parseEther } from 'ethers/lib/utils';
import { NoWallet } from '~/app/components';
import { Button } from '~/ui/button';

import { CONTRACT_ADDRESS, ABI } from '~/lib/contract';
import { toast } from 'sonner';

const CryptoPayment = () => {
  const address = useAddress();
  const sdk = useSDK();
  const { contract } = useContract(CONTRACT_ADDRESS, ABI);
  const { mutateAsync } = useContractWrite(contract, 'mint');

  const buy = async () => {
    if (!sdk) return;
    try {
      const balance = await sdk.wallet.balance();
      if (balance.value.lt(parseEther('6'))) {
        toast.error('Insufficient funds');
        return;
      }
      await mutateAsync({
        args: [address],
        overrides: {
          value: parseEther('6'),
        },
      });
    } catch (e) {
      console.error(e);
      toast.error('Something went wrong');
    }
  };

  if (!address) {
    return <NoWallet />;
  }

  return (
    <div className='flex flex-col gap-2 py-12'>
      <Button onClick={buy} size='lg' variant='outline'>
        Buy Ticket for 6 MATIC
        <img
          src='https://ipfs.io/ipfs/QmcxZHpyJa8T4i63xqjPYrZ6tKrt55tZJpbXcjSDKuKaf9/polygon/512.png'
          alt='Polygon'
          className='ml-2 h-5 w-5'
        />
      </Button>
    </div>
  );
};

export default CryptoPayment;
