/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Razorpay from 'razorpay';
import crypto from 'crypto';
import { redirect, RedirectType } from 'next/navigation';

import { createWalletClient, http, publicActions } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { polygonMumbai } from 'viem/chains';

import { env } from '~/env';
import { ABI, CONTRACT_ADDRESS } from '~/lib/contract';

export async function POST(req: Request) {
  const formData = await req.formData();
  const data = Object.fromEntries(formData);
  const { razorpay_payment_id, razorpay_signature } = data as {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
  };

  const instance = new Razorpay({
    key_id: env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    key_secret: env.RAZORPAY_SECRET_KEY,
  });

  const paymentDetails = await instance.payments.fetch(razorpay_payment_id);
  const address = paymentDetails.notes.address;

  if (!address) {
    redirect('/buy-tickets', RedirectType.push);
  }

  const text = `${paymentDetails.order_id}|${razorpay_payment_id}`;
  const generatedSignature = crypto
    .createHmac('sha256', env.RAZORPAY_SECRET_KEY)
    .update(text)
    .digest('hex');

  const success = generatedSignature === razorpay_signature;

  if (!success) {
    redirect('/buy-tickets/callback?success=false', RedirectType.push);
  }

  const client = createWalletClient({
    chain: polygonMumbai,
    transport: http(env.NEXT_PUBLIC_ALCHEMY_RPC_URL),
  }).extend(publicActions);

  const account = privateKeyToAccount(env.PK as `0x${string}`);

  await client
    .writeContract({
      address: CONTRACT_ADDRESS,
      abi: ABI,
      functionName: 'safeMint',
      args: [address],
      account,
    })
    .catch(() => {
      redirect('/buy-tickets/callback?success=false', RedirectType.push);
    })
    .then(() => {
      redirect('/buy-tickets/callback?success=true', RedirectType.push);
    });
}
