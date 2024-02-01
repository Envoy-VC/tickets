'use client';

import React from 'react';

import {
  DynamicContextProvider,
  DynamicWagmiConnector,
  MagicWalletConnectors,
  EthereumWalletConnectors,
} from '~/lib/dynamic';

import { env } from '~/env';

const Web3Provider = ({ children }: React.PropsWithChildren) => {
  return (
    <DynamicContextProvider
      settings={{
        environmentId: env.NEXT_PUBLIC_DYNAMIC_ID,
        walletConnectors: [EthereumWalletConnectors, MagicWalletConnectors],
      }}
    >
      <DynamicWagmiConnector>{children}</DynamicWagmiConnector>
    </DynamicContextProvider>
  );
};

export default Web3Provider;
