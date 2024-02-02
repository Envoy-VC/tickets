import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(['development', 'test', 'production']),
    RAZORPAY_SECRET_KEY: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_PUBLISHABLE_API_KEY: z.string().min(1),
    NEXT_PUBLIC_ALCHEMY_RPC_URL: z.string().min(1),
    NEXT_PUBLIC_RAZORPAY_KEY_ID: z.string().min(1),
    NEXT_PUBLIC_TW_ID: z.string().min(1),
    NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID: z.string().min(1),
    NEXT_PUBLIC_BASE_PATH: z.string().min(1),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_PUBLISHABLE_API_KEY:
      process.env.NEXT_PUBLIC_PUBLISHABLE_API_KEY,
    NEXT_PUBLIC_ALCHEMY_RPC_URL: process.env.NEXT_PUBLIC_ALCHEMY_RPC_URL,
    NEXT_PUBLIC_RAZORPAY_KEY_ID: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    NEXT_PUBLIC_TW_ID: process.env.NEXT_PUBLIC_TW_ID,
    NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID:
      process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
    NEXT_PUBLIC_BASE_PATH: process.env.NEXT_PUBLIC_BASE_PATH,
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
});
