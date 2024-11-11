import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { PublicKey, Connection } from '@solana/web3.js';
import { web3Service, WalletError } from '../services/web3Service';

interface SolanaContextType {
  publicKey: PublicKey | null;
  balance: number;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  isConnecting: boolean;
  error: string | null;
  setDevWallet: (wallet: PublicKey) => void;
}

const SolanaContext = createContext<SolanaContextType | undefined>(undefined);

const NETWORK = "https://api.mainnet-beta.solana.com";

export function useSolana() {
  const context = useContext(SolanaContext);
  if (!context) {
    throw new Error('useSolana must be used within a SolanaProvider');
  }
  return context;
}

interface Props {
  children: ReactNode;
}

export function SolanaProvider({ children }: Props) {
  const [publicKey, setPublicKey] = useState<PublicKey | null>(null);
  const [balance, setBalance] = useState<number>(0);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const connection = new Connection(NETWORK);

  const fetchBalance = async (pubKey: PublicKey) => {
    try {
      const bal = await connection.getBalance(pubKey);
      setBalance(bal / 1e9);
    } catch (err) {
      console.error('Error fetching balance:', err);
      // Don't set balance to 0 on error, keep the previous value
      // Only log the error for debugging
    }
  };

  const setDevWallet = (wallet: PublicKey) => {
    setPublicKey(wallet);
    fetchBalance(wallet).catch(console.error); // Handle potential error in fetchBalance
  };

  const connect = async () => {
    if (isConnecting) return;
    
    try {
      setIsConnecting(true);
      setError(null);
      
      const address = await web3Service.connectWallet();
      const pubKey = new PublicKey(address);
      
      setPublicKey(pubKey);
      await fetchBalance(pubKey);
    } catch (error) {
      if (error instanceof WalletError) {
        setError(error.message);
      } else {
        setError('Failed to connect wallet');
      }
      throw error;
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnect = async () => {
    try {
      setError(null);
      await web3Service.disconnectWallet();
      setPublicKey(null);
      setBalance(0);
    } catch (error) {
      if (error instanceof WalletError) {
        setError(error.message);
      }
      throw error;
    }
  };

  useEffect(() => {
    const checkInitialConnection = async () => {
      try {
        const address = await web3Service.checkConnection();
        if (address) {
          const pubKey = new PublicKey(address);
          setPublicKey(pubKey);
          await fetchBalance(pubKey);
        }
      } catch (err) {
        console.error('Error checking initial connection:', err);
      }
    };

    const handleAccountChanged = async () => {
      const address = await web3Service.checkConnection();
      if (address) {
        const pubKey = new PublicKey(address);
        setPublicKey(pubKey);
        await fetchBalance(pubKey);
      } else {
        setPublicKey(null);
        setBalance(0);
      }
    };

    checkInitialConnection();

    const provider = web3Service.getPhantomProvider();
    if (provider) {
      provider.on('accountChanged', handleAccountChanged);
      provider.on('disconnect', () => {
        setPublicKey(null);
        setBalance(0);
      });

      return () => {
        provider.removeListener('accountChanged', handleAccountChanged);
        provider.removeListener('disconnect', () => {});
      };
    }
  }, []);

  const value = {
    publicKey,
    balance,
    connect,
    disconnect,
    isConnecting,
    error,
    setDevWallet
  };

  return (
    <SolanaContext.Provider value={value}>
      {children}
    </SolanaContext.Provider>
  );
}