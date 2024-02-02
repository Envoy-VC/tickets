import { NextResponse } from 'next/server';

import Razorpay from 'razorpay';
import crypto from 'crypto';
import { redirect, RedirectType } from 'next/navigation';

import { env } from '~/env';

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
  console.log('paymentDetails', paymentDetails);

  const text = `${paymentDetails.order_id}|${razorpay_payment_id}`;
  const generatedSignature = crypto
    .createHmac('sha256', env.RAZORPAY_SECRET_KEY)
    .update(text)
    .digest('hex');

  if (generatedSignature !== razorpay_signature) {
    redirect('/buy-tickets', RedirectType.push);
  } else {
    redirect('/buy-tickets', RedirectType.push);
  }
}
