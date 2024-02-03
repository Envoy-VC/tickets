'use client';

import React from 'react';
import { useAddress, useSDK } from '@thirdweb-dev/react';
import { Button } from '~/ui/button';
import { QrScanner } from '@yudiel/react-qr-scanner';

import { toast } from 'sonner';

import { CONTRACT_ADDRESS } from '~/lib/contract';

import { AiOutlineLoading } from 'react-icons/ai';
import { FaRegCircleCheck, FaRegCircleXmark } from 'react-icons/fa6';

import { ABI } from '~/lib/contract';
import type { BigNumber } from 'ethers';

const QRWrapper = ({
  children,
  success,
}: React.PropsWithChildren & { success?: boolean }) => {
  return (
    <div className='hero-bg aspect-square w-full max-w-xs rounded-xl border-[1px] p-1'>
      <div className='h-full w-full rounded-lg bg-gray-50'>
        <div className='flex h-full flex-col items-center justify-center gap-4'>
          {success && success === true && (
            <FaRegCircleCheck className='text-9xl text-green-500' />
          )}
          {success !== undefined && success === false && (
            <FaRegCircleXmark className='text-9xl text-red-500' />
          )}
          {children}
        </div>
      </div>
    </div>
  );
};

const ScanTicket = () => {
  const address = useAddress();
  const sdk = useSDK();
  const [mounted, setMounted] = React.useState(false);
  const [isScanning, setIsScanning] = React.useState<boolean>(false);
  const [isVerifying, setIsVerifying] = React.useState<boolean>(false);
  const [result, setResult] = React.useState<string | null>(null);

  React.useEffect(() => {
    setMounted(true);
    return () => {
      setMounted(false);
    };
  }, []);

  const verify = async (data: string) => {
    if (!address) return;
    if (!sdk) return;
    try {
      setResult(null);
      setIsVerifying(true);
      const { contractAddress } = JSON.parse(data) as {
        contractAddress: string;
      };

      if (contractAddress !== CONTRACT_ADDRESS) {
        toast.error('Invalid QR Code');
        setResult('Invalid QR Code');
        return;
      }

      const contract = await sdk.getContract(CONTRACT_ADDRESS, ABI);
      const balance = (
        (await contract.call('balanceOf', [address])) as BigNumber
      ).toNumber();

      console.log(balance);

      if (balance > 0) {
        toast.success('Ticket verified');
        setResult('Ticket verified');
      } else {
        toast.error('Ticket not found');
        setResult('Ticket not found');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsVerifying(false);
    }
  };

  if (!mounted) return null;

  if (!address) {
    return (
      <QRWrapper>
        <div className='flex h-full w-full items-center justify-center'>
          <p className='text-center text-lg font-medium'>
            Please connect your wallet to scan
          </p>
        </div>
      </QRWrapper>
    );
  }

  return (
    <div className='flex w-full flex-col items-center justify-center gap-4'>
      {!isScanning ? (
        <QRWrapper>
          <p className='text-center text-lg font-medium'>
            Scan a ticket to verify
          </p>
        </QRWrapper>
      ) : isVerifying ? (
        <QRWrapper>
          <AiOutlineLoading className='animate-spin text-2xl text-slate-700' />
        </QRWrapper>
      ) : result === null ? (
        <QRWrapper>
          <QrScanner
            onDecode={async (result) => await verify(result)}
            onError={(error) => console.log(error?.message)}
            containerStyle={{
              borderRadius: '0.5rem',
            }}
            scanDelay={1000}
          />
        </QRWrapper>
      ) : (
        <QRWrapper success={result === 'Ticket verified'}>
          <p className='text-center text-lg font-medium'>{result}</p>
        </QRWrapper>
      )}

      <Button
        className='w-fit'
        onClick={() => {
          if (isVerifying) return;
          setResult(null);
          setIsScanning(true);
        }}
      >
        Scan
      </Button>
    </div>
  );
};

export default ScanTicket;
