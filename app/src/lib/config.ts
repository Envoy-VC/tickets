import { http, createConfig } from 'wagmi';
import { polygonMumbai } from 'wagmi/chains';

declare module 'wagmi' {
  interface Register {
    config: typeof wagmiConfig;
  }
}

export const wagmiConfig = createConfig({
  chains: [polygonMumbai],
  transports: {
    [polygonMumbai.id]: http(),
  },
});
