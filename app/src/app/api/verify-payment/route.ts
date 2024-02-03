/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Razorpay from 'razorpay';
import crypto from 'crypto';
import { redirect, RedirectType } from 'next/navigation';

import { Mumbai } from '@thirdweb-dev/chains';

import { ThirdwebSDK } from '@thirdweb-dev/sdk';

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

  const sdk = ThirdwebSDK.fromPrivateKey(env.PK, Mumbai, {
    secretKey: env.THIRDWEB_SECRET_KEY,
  });

  const contract = await sdk.getContract(CONTRACT_ADDRESS, ABI);

  const tx = await contract.call('safeMint', [address]).catch((err) => {
    console.log('Error: ', err);
    redirect('/buy-tickets/callback?success=false', RedirectType.push);
  });
  console.log('Receipt: ', tx);
  redirect('/buy-tickets/callback?success=true', RedirectType.push);
}
