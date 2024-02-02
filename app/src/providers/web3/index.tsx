'use client';

import React from 'react';

import { WagmiConfig } from 'wagmi';

import { config } from '~/lib/config';

const Web3Provider = ({ children }: React.PropsWithChildren) => {
  return <WagmiConfig config={config}>{children}</WagmiConfig>;
};

export default Web3Provider;
