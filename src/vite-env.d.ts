/// <reference types="vite/client" />

interface Window {
  solana?: {
    isPhantom?: boolean;
    connect(): Promise<{ publicKey: PublicKey }>;
    disconnect(): Promise<void>;
    signMessage(message: Uint8Array): Promise<{ signature: Uint8Array }>;
    publicKey?: PublicKey | null;
    on(event: string, callback: () => void): void;
    removeListener(event: string, callback: () => void): void;
  };
}</content>