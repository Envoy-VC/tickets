import { NextResponse } from 'next/server';

import Razorpay from 'razorpay';

import { env } from '~/env';

export async function POST(req: Request) {
  const { amount } = (await req.json()) as {
    amount: number;
  };
  try {
    const instance = new Razorpay({
      key_id: env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      key_secret: env.RAZORPAY_SECRET_KEY,
    });

    const res = await instance.orders.create({
      amount,
      currency: 'INR',
    });

    return NextResponse.json({
      success: true,
      order_id: res.id,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error,
    });
  }
}
