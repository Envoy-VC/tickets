'use client';

import React from 'react';
import '@rainbow-me/rainbowkit/styles.css';

import { RainbowKitProvider, lightTheme } from '@rainbow-me/rainbowkit';
import { chains } from '~/lib/config';

const RainbowWrapper = ({ children }: React.PropsWithChildren) => {
  return (
    <RainbowKitProvider
      chains={chains}
      theme={lightTheme({
        accentColor: '#9553DA',
      })}
    >
      {children}
    </RainbowKitProvider>
  );
};

export default RainbowWrapper;
