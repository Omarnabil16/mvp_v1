import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Loader, AlertCircle } from 'lucide-react';
import { useSolana } from '../contexts/SolanaContext';
import { useAuth } from '../contexts/AuthContext';

export default function ConnectWallet() {
  const { publicKey, balance, connect, disconnect, isConnecting, error } = useSolana();
  const { userProfile } = useAuth();

  const handleConnect = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      await connect();
    } catch (error) {
      // Error is handled by the context
    }
  };

  const handleDisconnect = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      await disconnect();
    } catch (error) {
      // Error is handled by the context
    }
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  return (
    <div className="relative">
      {error && (
        <div className="absolute -bottom-12 right-0 z-50 bg-brand-red/90 text-white px-4 py-2 rounded-lg flex items-center space-x-2 text-sm whitespace-nowrap">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {isConnecting ? (
        <button 
          disabled
          className="bg-brand-red/50 text-white px-4 py-2 rounded-lg flex items-center space-x-2 cursor-not-allowed"
        >
          <Loader className="w-5 h-5 animate-spin" />
          <span>Connecting...</span>
        </button>
      ) : publicKey ? (
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            {userProfile?.avatar ? (
              <div className="w-8 h-8 rounded-full overflow-hidden">
                <img
                  src={userProfile.avatar}
                  alt={userProfile.username || 'Profile'}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-8 h-8 rounded-full bg-brand-purple flex items-center justify-center">
                {userProfile?.username?.[0]?.toUpperCase() || '?'}
              </div>
            )}
            <div className="text-right">
              <div className="text-sm text-white">{formatAddress(publicKey.toString())}</div>
              <div className="text-xs text-brand-cyan">{balance.toFixed(4)} SOL</div>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDisconnect}
            className="bg-brand-red hover:bg-brand-red/90 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Disconnect
          </motion.button>
        </div>
      ) : (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleConnect}
          className="bg-brand-red hover:bg-brand-red/90 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <ExternalLink className="w-5 h-5" />
          <span>Connect Wallet</span>
        </motion.button>
      )}
    </div>
  );
}