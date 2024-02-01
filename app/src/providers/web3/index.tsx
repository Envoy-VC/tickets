'use client';

import React from 'react';

import { DynamicContextProvider } from '@dynamic-labs/sdk-react-core';
import { DynamicWagmiConnector } from '@dynamic-labs/wagmi-connector';
import { MagicWalletConnectors } from '@dynamic-labs/magic';

import { EthereumWalletConnectors } from '@dynamic-labs/ethereum';

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
