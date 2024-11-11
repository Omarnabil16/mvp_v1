import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Brain } from 'lucide-react';
import PlaygroundChat from './playground/PlaygroundChat';
import CACCreation from './playground/CACCreation';
import { useAuth } from '../contexts/AuthContext';
import { cacService } from '../services/cacService';
import type { CAC } from '../types/cac';

export default function Playground() {
  const { userProfile } = useAuth();
  const [activeTab, setActiveTab] = useState('chat');
  const [userCACs, setUserCACs] = useState<CAC[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCACCreation, setShowCACCreation] = useState(false);

  useEffect(() => {
    loadUserCACs();
  }, [userProfile]);

  const loadUserCACs = async () => {
    if (!userProfile?.userId) return;

    try {
      const cacs = await cacService.getUserCACs(userProfile.userId);
      const publicCACs = await cacService.getPublicCACs();
      
      // Combine user's CACs and public CACs, removing duplicates
      const allCACs = [...cacs, ...publicCACs.filter(cac => 
        !cacs.some(userCac => userCac.id === cac.id)
      )];
      
      setUserCACs(allCACs);
    } catch (error) {
      console.error('Error loading CACs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCACCreated = (newCAC: CAC) => {
    setUserCACs(prev => [...prev, newCAC]);
    setShowCACCreation(false);
    setActiveTab('chat');
  };

  const handleCACDeleted = (cacId: string) => {
    setUserCACs(prev => prev.filter(cac => cac.id !== cacId));
  };

  const tabs = [
    { id: 'chat', label: 'Chat', icon: MessageSquare },
    { id: 'create', label: 'Create CAC', icon: Brain }
  ];

  return (
    <div className="space-y-8">
      {/* Navigation Tabs */}
      <div className="flex space-x-4">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-lg flex items-center space-x-2 transition-all ${
                activeTab === tab.id
                  ? 'bg-brand-red text-white neon-border'
                  : 'bg-dark-card text-gray-400 hover:text-brand-red hover:bg-dark-lighter'
              }`}
            >
              <Icon className={`w-5 h-5 ${activeTab === tab.id ? 'animate-pulse' : ''}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Dynamic Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === 'chat' ? (
            <PlaygroundChat 
              userCACs={userCACs} 
              onCACDeleted={handleCACDeleted}
            />
          ) : (
            <CACCreation 
              onClose={() => setActiveTab('chat')} 
              onCreated={handleCACCreated} 
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}