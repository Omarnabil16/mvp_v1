import React from 'react';
import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useSolana } from '../contexts/SolanaContext';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { PublicKey } from '@solana/web3.js';

export default function DevAuthButton() {
  const { updateProfile } = useAuth();
  const { setDevWallet } = useSolana();

  const handleDevAuth = async () => {
    try {
      const userId = "4h1cGgY1JNPEjJLb2EMadxF5rV2HiudWJgdMkePjLpJi";
      const userDoc = await getDoc(doc(db, 'users', userId));
      
      // Set dev wallet in Solana context
      setDevWallet(new PublicKey(userId));
      
      if (userDoc.exists()) {
        await updateProfile(userDoc.data());
      } else {
        // Create default profile if it doesn't exist
        const defaultProfile = {
          userId,
          wallet: userId,
          username: 'DevUser',
          avatar: 'https://i.imgur.com/wCWSQjU.jpg',
          isProfileComplete: true,
          role: 'admin',
          createdAt: Date.now()
        };
        
        await setDoc(doc(db, 'users', userId), defaultProfile);
        await updateProfile(defaultProfile);
      }
    } catch (error) {
      console.error('Dev auth error:', error);
    }
  };

  if (process.env.NODE_ENV === 'production') return null;

  return (
    <motion.button
      onClick={handleDevAuth}
      className="fixed bottom-6 right-6 p-3 bg-dark-card border border-brand-purple/30 rounded-lg text-brand-purple hover:bg-dark-lighter transition-all z-50 group"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Terminal className="w-5 h-5" />
      <motion.span 
        className="absolute right-full mr-2 px-2 py-1 bg-dark-card text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
        initial={{ x: 10, opacity: 0 }}
        whileHover={{ x: 0, opacity: 1 }}
      >
        Dev Auth
      </motion.span>
    </motion.button>
  );
}