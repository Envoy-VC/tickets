'use client';

import React from 'react';

import { DynamicWidget } from '@dynamic-labs/sdk-react-core';

import { useAccount } from 'wagmi';

const Home = () => {
  const { address } = useAccount();
  return (
    <main>
      <div>
        <DynamicWidget />
        {address}
      </div>
    </main>
  );
};

export default Home;
