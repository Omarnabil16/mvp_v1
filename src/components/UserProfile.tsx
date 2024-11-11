import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, Camera, Save, AlertCircle, Loader,
  Wallet, Twitter
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useSolana } from '../contexts/SolanaContext';
import { storageService } from '../services/storageService';

export default function UserProfile() {
  const { userProfile, updateProfile } = useAuth();
  const { balance } = useSolana();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [username, setUsername] = useState(userProfile?.username || '');
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleUsernameChange = async () => {
    if (!username.trim()) {
      setError('Username is required');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await updateProfile({ username });
    } catch (error) {
      setError('Failed to update username');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !userProfile?.userId) return;

    setIsLoading(true);
    setError(null);

    try {
      const downloadURL = await storageService.uploadProfilePhoto(userProfile.userId, file);
      await updateProfile({ avatar: downloadURL });
    } catch (error) {
      setError('Failed to update profile photo');
    } finally {
      setIsLoading(false);
    }
  };

  const connectTwitter = () => {
    window.open('https://twitter.com/i/flow/login', '_blank');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Profile Header */}
      <div className="digital-screen">
        <div className="scanner-line" />
        <div className="flex items-center space-x-6">
          {/* Avatar */}
          <div className="relative group">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-dark-lighter">
              {userProfile?.avatar ? (
                <img 
                  src={userProfile.avatar} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <User className="w-12 h-12 text-gray-400" />
                </div>
              )}
            </div>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-0 right-0 p-2 bg-brand-red rounded-full hover:bg-brand-red/90 transition-colors"
            >
              <Camera className="w-4 h-4 text-white" />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {/* User Info */}
          <div className="flex-1">
            <div className="flex items-center space-x-4 mb-4">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                className="flex-1 bg-dark-card border border-brand-red/30 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:border-brand-red focus:ring-1 focus:ring-brand-red"
              />
              <button
                onClick={handleUsernameChange}
                disabled={isLoading || !username.trim()}
                className="cyber-button"
              >
                {isLoading ? (
                  <Loader className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    <span>Save</span>
                  </>
                )}
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-gray-400">
                <Wallet className="w-4 h-4" />
                <span>{balance.toFixed(4)} SOL</span>
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="mt-4 p-3 bg-brand-red/20 border border-brand-red/30 rounded-lg flex items-center space-x-2 text-brand-red">
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        )}
      </div>

      {/* Social Connections */}
      <div className="digital-screen">
        <div className="scanner-line" />
        <h2 className="text-xl font-bold text-white mb-6">Connect Account</h2>
        
        <button
          onClick={connectTwitter}
          className="w-full cyber-button flex items-center justify-between"
        >
          <div className="flex items-center space-x-3">
            <Twitter className="w-5 h-5 text-brand-cyan" />
            <span>Connect X (Twitter)</span>
          </div>
        </button>
      </div>
    </div>
  );
}