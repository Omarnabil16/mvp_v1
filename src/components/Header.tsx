import React from 'react';
import { Bell } from 'lucide-react';
import ConnectWallet from './ConnectWallet';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-dark-lighter z-50 h-16 border-b border-dark-card">
      <div className="max-w-7xl mx-auto px-6 h-full flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-brand-red animate-neon">Comedy Cult</h1>
        </div>

        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-dark-card rounded-full relative">
            <Bell className="w-6 h-6 text-gray-400 hover:text-white transition-colors" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-brand-red rounded-full"></span>
          </button>
          
          <ConnectWallet />
        </div>
      </div>
    </header>
  );
}