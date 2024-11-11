import { PublicKey } from '@solana/web3.js';

export interface PhantomWindow extends Window {
  phantom?: {
    solana?: {
      connect(): Promise<{ publicKey: PublicKey }>;
      disconnect(): Promise<void>;
      signMessage(message: Uint8Array): Promise<{ signature: Uint8Array }>;
      isPhantom?: boolean;
      publicKey?: PublicKey | null;
      on(event: string, callback: () => void): void;
      removeListener(event: string, callback: () => void): void;
    };
  };
  solana?: {
    connect(): Promise<{ publicKey: PublicKey }>;
    disconnect(): Promise<void>;
    signMessage(message: Uint8Array): Promise<{ signature: Uint8Array }>;
    isPhantom?: boolean;
    publicKey?: PublicKey | null;
    on(event: string, callback: () => void): void;
    removeListener(event: string, callback: () => void): void;
  };
}

declare const window: PhantomWindow;

export class WalletError extends Error {
  constructor(message: string, public code?: number) {
    super(message);
    this.name = 'WalletError';
  }
}

export const web3Service = {
  async waitForPhantom(timeout = 3000): Promise<void> {
    if (this.getPhantomProvider()) return;

    return new Promise((resolve, reject) => {
      const startTime = Date.now();
      const interval = setInterval(() => {
        if (this.getPhantomProvider()) {
          clearInterval(interval);
          resolve();
        } else if (Date.now() - startTime >= timeout) {
          clearInterval(interval);
          reject(new WalletError('Phantom wallet not detected. Please install Phantom.'));
        }
      }, 100);
    });
  },

  getPhantomProvider() {
    if (window.phantom?.solana?.isPhantom) {
      return window.phantom.solana;
    }
    
    if (window.solana?.isPhantom) {
      return window.solana;
    }

    return null;
  },

  async getProvider() {
    try {
      await this.waitForPhantom();
      
      const provider = this.getPhantomProvider();
      
      if (!provider) {
        window.open('https://phantom.app/', '_blank');
        throw new WalletError('Please install Phantom wallet');
      }

      return provider;
    } catch (error) {
      if (error instanceof WalletError) {
        throw error;
      }
      throw new WalletError('Failed to get wallet provider');
    }
  },

  async checkConnection(): Promise<string | null> {
    try {
      const provider = await this.getProvider();
      if (!provider?.publicKey) return null;
      
      // Verify the connection is active
      const isConnected = await this.verifyConnection(provider);
      return isConnected ? provider.publicKey.toString() : null;
    } catch (error) {
      console.error('Connection check error:', error);
      return null;
    }
  },

  async verifyConnection(provider: PhantomWindow['solana']): Promise<boolean> {
    if (!provider) return false;
    
    try {
      const publicKey = provider.publicKey;
      return !!publicKey;
    } catch {
      return false;
    }
  },

  async connectWallet(): Promise<string> {
    try {
      const provider = await this.getProvider();
      
      if (!provider) {
        throw new WalletError('Wallet provider not available');
      }

      // Ensure clean state before connecting
      if (provider.disconnect && !provider.publicKey) {
        try {
          await provider.disconnect();
          await new Promise(resolve => setTimeout(resolve, 500));
        } catch {
          // Ignore disconnect errors
        }
      }

      // Connection attempt with retry
      let attempts = 0;
      const maxAttempts = 3;

      while (attempts < maxAttempts) {
        try {
          const response = await Promise.race([
            provider.connect(),
            new Promise((_, reject) => 
              setTimeout(() => reject(new WalletError('Connection timeout')), 5000)
            )
          ]) as { publicKey: PublicKey };

          if (!response?.publicKey) {
            throw new WalletError('Invalid connection response');
          }

          // Verify connection
          const isConnected = await this.verifyConnection(provider);
          if (!isConnected) {
            throw new WalletError('Connection verification failed');
          }

          return response.publicKey.toString();
        } catch (error: any) {
          attempts++;
          
          if (error?.code === 4001) {
            throw new WalletError('Connection rejected by user');
          } else if (error?.code === -32603) {
            throw new WalletError('Please unlock your wallet');
          }
          
          if (attempts === maxAttempts) {
            throw new WalletError('Failed to connect to wallet');
          }
          
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }

      throw new WalletError('Connection attempts exhausted');
    } catch (error: any) {
      if (error instanceof WalletError) {
        throw error;
      }
      throw new WalletError(error.message || 'Unknown connection error');
    }
  },

  async disconnectWallet(): Promise<void> {
    try {
      const provider = await this.getProvider();
      if (provider?.disconnect) {
        await provider.disconnect();
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    } catch (error) {
      throw new WalletError('Failed to disconnect wallet');
    }
  }
};