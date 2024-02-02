import { createConfig, configureChains } from 'wagmi';

import { publicProvider } from 'wagmi/providers/public';
import {
  connectorsForWallets,
  getDefaultWallets,
} from '@rainbow-me/rainbowkit';

import { polygonMumbai } from 'viem/chains';

import { MagicAuthConnector } from '@magiclabs/wagmi-connector';
import type { Chain } from 'wagmi';

import { env } from '~/env';

export const { chains, publicClient, webSocketPublicClient } = configureChains(
  [polygonMumbai],
  [publicProvider()]
);

export const rainbowMagicConnector = ({ chains }: { chains: Chain[] }) => ({
  id: 'magic',
  name: 'Sign in with Google',
  iconUrl:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/2048px-Google_%22G%22_logo.svg.png',
  iconBackground: 'white',
  createConnector: () => {
    const connector = new MagicAuthConnector({
      chains,
      options: {
        apiKey: env.NEXT_PUBLIC_PUBLISHABLE_API_KEY,
        oauthOptions: {
          providers: ['google'],
        },
        enableEmailLogin: true,
        isDarkMode: false,
        magicSdkConfiguration: {
          network: {
            rpcUrl: env.NEXT_PUBLIC_ALCHEMY_RPC_URL,
            chainId: polygonMumbai.id,
          },
        },
      },
    });
    return { connector };
  },
});

const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: [rainbowMagicConnector({ chains })],
  },
  ...getDefaultWallets({
    appName: 'Tickets',
    chains,
    projectId: env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
  }).wallets,
]);

export const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
  connectors,
});
