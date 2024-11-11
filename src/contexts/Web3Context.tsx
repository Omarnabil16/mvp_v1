import React, { createContext, useContext, ReactNode } from 'react';
import { ThirdwebProvider, useAddress, useDisconnect, useMetamask } from '@thirdweb-dev/react';

interface Web3ContextType {
  address: string | undefined;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  isConnecting: boolean;
}

const Web3Context = createContext<Web3ContextType | undefined>(undefined);

export function useWeb3() {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error('useWeb3 must be used within a Web3Provider');
  }
  return context;
}

interface Props {
  children: ReactNode;
}

export function Web3Provider({ children }: Props) {
  return (
    <ThirdwebProvider 
      clientId="9b3eda2925e8b1246518e786010cdb7a"
      activeChain="solana"
    >
      <Web3ProviderInner>{children}</Web3ProviderInner>
    </ThirdwebProvider>
  );
}

function Web3ProviderInner({ children }: Props) {
  const address = useAddress();
  const connect = useMetamask();
  const disconnect = useDisconnect();
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async () => {
    try {
      setIsConnecting(true);
      await connect();
    } catch (error) {
      console.error('Connection error:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  const value = {
    address,
    connect: handleConnect,
    disconnect,
    isConnecting
  };

  return (
    <Web3Context.Provider value={value}>
      {children}
    </Web3Context.Provider>
  );
}