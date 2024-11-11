import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tv, Newspaper, Calendar, Star, Users, Clock, Crown } from 'lucide-react';
import LiveShows from './shows/LiveShows';
import DailyDigest from './shows/DailyDigest';

const tabVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

export default function Shows() {
  const [activeTab, setActiveTab] = useState('live');

  const tabs = [
    { id: 'live', label: 'Live Shows', icon: Tv },
    { id: 'digest', label: 'Daily Digest', icon: Newspaper }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Comedy Shows</h1>
        <div className="flex space-x-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-all ${
                  activeTab === tab.id
                    ? 'bg-red-500 text-white'
                    : 'bg-white text-gray-600 hover:bg-red-50 hover:text-red-500'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Dynamic Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          variants={tabVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.2 }}
        >
          {activeTab === 'live' ? <LiveShows /> : <DailyDigest />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}