import { createConfig, configureChains, mainnet } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { createWeb3Modal } from '@web3modal/wagmi/react';
import { WagmiConfig } from 'wagmi';
import React from 'react';

const projectId = '9b3eda2925e8b1246518e786010cdb7a';

const metadata = {
  name: 'Comedy Cult',
  description: 'Comedy Cult DApp',
  url: 'https://comedycult.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
};

const { chains, publicClient } = configureChains(
  [mainnet],
  [publicProvider()]
);

const config = createConfig({
  autoConnect: true,
  publicClient,
  connectors: []
});

createWeb3Modal({
  wagmiConfig: config,
  projectId,
  chains,
  themeMode: 'dark',
  themeVariables: {
    '--w3m-accent': '#FF3333'
  }
});

export function WalletProvider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiConfig config={config}>
      {children}
    </WagmiConfig>
  );
}