import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Camera, Save, AlertCircle, Loader, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { storageService } from '../services/storageService';

export default function ProfileSetup() {
  const { userProfile, updateProfile } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [username, setUsername] = useState(userProfile?.username || '');
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !userProfile?.userId) return;

    setIsLoading(true);
    setError(null);

    try {
      const downloadURL = await storageService.uploadProfilePhoto(userProfile.userId, file);
      await updateProfile({ avatar: downloadURL });
    } catch (error) {
      setError('Failed to upload profile photo');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="digital-screen">
          <div className="scanner-line" />
          
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Complete Your Profile</h1>
            <p className="text-gray-400">Set up your Comedy Cult identity</p>
          </div>

          <div className="space-y-6">
            {/* Avatar Upload */}
            <div className="flex flex-col items-center">
              <div className="relative group">
                <div className="w-32 h-32 rounded-full overflow-hidden bg-dark-lighter">
                  {userProfile?.avatar ? (
                    <img 
                      src={userProfile.avatar} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <User className="w-16 h-16 text-gray-400" />
                    </div>
                  )}
                </div>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-0 right-0 p-3 bg-brand-red rounded-full hover:bg-brand-red/90 transition-colors group"
                >
                  <Camera className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
              <p className="text-sm text-gray-400 mt-2">Upload a profile photo</p>
            </div>

            {/* Username Input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-400">Username</label>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Choose your username"
                  className="flex-1 bg-dark-card/50 border border-brand-red/30 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:border-brand-red focus:ring-1 focus:ring-brand-red"
                />
                <motion.button
                  onClick={handleUsernameChange}
                  disabled={isLoading || !username.trim()}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 bg-brand-red text-white rounded-lg hover:bg-brand-red/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <Loader className="w-5 h-5 animate-spin" />
                  ) : (
                    <Save className="w-5 h-5" />
                  )}
                </motion.button>
              </div>
            </div>

            {error && (
              <div className="p-3 bg-brand-red/20 border border-brand-red/30 rounded-lg flex items-center space-x-2 text-brand-red">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="text-center text-sm text-gray-400">
              Complete your profile to access all features
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}