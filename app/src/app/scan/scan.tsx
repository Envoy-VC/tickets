'use client';

import React from 'react';
import { useAccount } from 'wagmi';
import { readContract } from '@wagmi/core';

import { Button } from '~/ui/button';
import { QrScanner } from '@yudiel/react-qr-scanner';

import { toast } from 'sonner';

import { AiOutlineLoading } from 'react-icons/ai';
import { ABI } from '~/lib/contract';

const QRWrapper = ({ children }: React.PropsWithChildren) => {
  return (
    <div className='hero-bg aspect-square w-full max-w-sm rounded-xl border-[1px] p-1'>
      <div className='h-full w-full rounded-lg bg-gray-50'>{children}</div>
    </div>
  );
};

const ScanTicket = () => {
  const { address } = useAccount();
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
    try {
      setResult(null);
      setIsVerifying(true);
      const { contractAddress } = JSON.parse(data) as {
        contractAddress: string;
      };

      const res = await readContract({
        address: contractAddress as `0x${string}`,
        abi: ABI,
        functionName: 'balanceOf',
        args: [address],
      });

      if (BigInt(res) > BigInt(0)) {
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
          <div className='flex h-full w-full items-center justify-center'>
            <p className='text-center text-lg font-medium'>
              Scan a ticket to verify
            </p>
          </div>
        </QRWrapper>
      ) : isVerifying ? (
        <QRWrapper>
          <div className='flex h-full w-full items-center justify-center'>
            <AiOutlineLoading className='animate-spin text-2xl text-slate-700' />
          </div>
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
        <QRWrapper>
          <div className='flex h-full w-full items-center justify-center'>
            <p className='text-center text-lg font-medium'>{result}</p>
          </div>
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
