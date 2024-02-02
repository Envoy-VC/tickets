'use client';

import React from 'react';
import { useAccount } from 'wagmi';

import { CheckoutWithCard } from '@thirdweb-dev/react';
import { Button } from '~/ui/button';

import { CONTRACT_ID } from '~/lib/contract';

import { MdPayments } from 'react-icons/md';
import { AiOutlineLoading } from 'react-icons/ai';

import { env } from '~/env';

const CardPayments = () => {
  const { address } = useAccount();
  const [mounted, setMounted] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    setMounted(true);
    return () => {
      setMounted(false);
    };
  }, []);

  const onPayWithUPI = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: 100,
        }),
      });

      const data = (await res.json()) as {
        success: boolean;
        order_id: string;
      };

      console.log(data);

      if (!data.success) return;
      const formData = new FormData();
      formData.append('key_id', env.NEXT_PUBLIC_RAZORPAY_KEY_ID);
      formData.append('amount', '100');
      formData.append('order_id', data.order_id);
      formData.append('name', 'Tech Conclave NIT Agartala');
      formData.append(
        'description',
        'Largest tech conclave in the north-east India'
      );
      formData.append(
        'image',
        'https://cdn.razorpay.com/logos/BUVwvgaqVByGp2_large.jpg'
      );
      formData.append(
        'callback_url',
        `${env.NEXT_PUBLIC_BASE_PATH}/api/verify-payment`
      );
      formData.append(
        'cancel_url',
        `${env.NEXT_PUBLIC_BASE_PATH}/api/verify-payment`
      );

      const form = document.createElement('form');
      form.method = 'POST';
      form.action = 'https://api.razorpay.com/v1/checkout/embedded';
      document.body.appendChild(form);
      for (const key of formData.keys()) {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = formData.get(key) as string;
        form.appendChild(input);
      }

      form.submit();

      for (const input of form.getElementsByTagName('input')) {
        input.remove();
      }
      document.body.removeChild(form);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  if (mounted) {
    if (address)
      return (
        <div className='flex flex-col gap-4 py-5'>
          <Button
            className='flex flex-row items-center gap-4 text-white'
            variant='upi'
            onClick={onPayWithUPI}
            disabled={isLoading}
          >
            {isLoading ? (
              <AiOutlineLoading className='animate-spin text-xl' />
            ) : (
              <MdPayments className='text-2xl text-white' />
            )}
            Pay with UPI
          </Button>

          <div className='flex flex-row items-center gap-3'>
            <div className='w-full border-b-[1px] border-neutral-300' />
            <span className='font-semibold text-neutral-400'>OR</span>
            <div className='w-full border-b-[1px] border-neutral-300' />
          </div>

          <div className='rounded-2xl bg-gray-50 p-4'>
            <CheckoutWithCard
              clientId={env.NEXT_PUBLIC_TW_ID}
              configs={{
                contractId: CONTRACT_ID,
                walletAddress: address,
                quantity: 1,

                mintMethod: {
                  name: 'mint',
                  args: {
                    to: '$WALLET',
                  },
                  payment: {
                    value: '0.01 * $QUANTITY',
                    currency: 'MATIC',
                  },
                },
              }}
              options={{
                colorPrimary: '#A457E7',
              }}
              onPaymentSuccess={(result) => {
                console.log('Payment successful:', result);
              }}
            />
          </div>
        </div>
      );
  } else {
    return <div>Connect Wallet</div>;
  }
};

export default CardPayments;
