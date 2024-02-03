'use client';

import React from 'react';
import { ConnectWallet, lightTheme } from '@thirdweb-dev/react';
const ConnectButton = () => {
  return (
    <ConnectWallet
      theme={lightTheme({
        colors: {
          accentText: '#A256E5',
          accentButtonBg: '#A256E5',
        },
      })}
      btnTitle='Sign-in'
      modalTitle={'Sign-in'}
      switchToActiveChain={true}
      modalSize={'compact'}
      welcomeScreen={{}}
      modalTitleIconUrl={''}
    />
  );
};

export default ConnectButton;
