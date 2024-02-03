'use client';

import React from 'react';

import { ThirdwebProvider } from '@thirdweb-dev/react';
import { Mumbai } from '@thirdweb-dev/chains';

import {
  embeddedWallet,
  metamaskWallet,
  walletConnect,
  localWallet,
  en,
} from '@thirdweb-dev/react';

import { env } from '~/env';

const Web3Provider = ({ children }: React.PropsWithChildren) => {
  return (
    <ThirdwebProvider
      activeChain={Mumbai}
      supportedChains={[Mumbai]}
      clientId={env.NEXT_PUBLIC_TW_ID}
      locale={en()}
      autoSwitch
      theme='light'
      supportedWallets={[
        metamaskWallet(),
        walletConnect(),
        localWallet(),
        embeddedWallet({
          recommended: true,
          auth: {
            options: ['google'],
          },
        }),
      ]}
    >
      {children}
    </ThirdwebProvider>
  );
};

export default Web3Provider;
