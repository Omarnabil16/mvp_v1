import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Rocket, Star, MessageSquare, Trophy, Radio } from 'lucide-react';
import ComedyClubs from './community/ComedyClubs';
import StreetTeam from './community/StreetTeam';

const tabVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

export default function Community() {
  const [activeTab, setActiveTab] = useState('clubs');

  const tabs = [
    { id: 'clubs', label: 'Clubs & Groups', icon: Users },
    { id: 'street-team', label: 'Street Team', icon: Rocket }
  ];

  const stats = [
    { label: 'Active Members', value: '2,547', icon: Users, color: 'brand-cyan' },
    { label: 'Daily Messages', value: '12.8k', icon: MessageSquare, color: 'brand-purple' },
    { label: 'Active Clubs', value: '156', icon: Trophy, color: 'brand-orange' }
  ];

  return (
    <div className="space-y-8">
      {/* Header with Stats */}
      <div className="digital-screen">
        <div className="scanner-line" />
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-red via-brand-purple to-brand-orange">
              Community Hub
            </h1>
            <p className="text-gray-400 mt-2">Connect, collaborate, and create with fellow comedians</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="px-3 py-1 rounded-full bg-brand-red/20 text-brand-red text-sm">
              <span className="animate-pulse">● </span>
              Live
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="neon-card p-6 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-dark via-transparent to-dark opacity-50" />
                <div className="relative z-10">
                  <Icon className={`w-8 h-8 text-${stat.color} mb-2 transition-transform group-hover:scale-110`} />
                  <h3 className="text-3xl font-bold text-white mb-1">{stat.value}</h3>
                  <p className="text-gray-400">{stat.label}</p>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-brand-red to-transparent opacity-50 animate-pulse" />
              </motion.div>
            );
          })}
        </div>
      </div>

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
          variants={tabVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.2 }}
        >
          {activeTab === 'clubs' ? <ComedyClubs /> : <StreetTeam />}
        </motion.div>
      </AnimatePresence>

      {/* Live Activity Feed */}
      <div className="digital-screen">
        <div className="scanner-line" />
        <div className="flex items-center space-x-2 mb-6">
          <Radio className="w-6 h-6 text-brand-red animate-pulse" />
          <h2 className="text-xl font-bold text-white">Live Activity</h2>
        </div>
        <div className="space-y-4">
          {[
            { user: 'MemeKing', action: 'joined Tech Comedians Club', time: '2m ago' },
            { user: 'JokeQueen', action: 'started a new raid', time: '5m ago' },
            { user: 'LaughMaster', action: 'earned Top Contributor badge', time: '10m ago' }
          ].map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="neon-card p-4 flex items-center justify-between"
            >
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 rounded-full bg-brand-red animate-pulse" />
                <div>
                  <span className="font-medium text-brand-cyan">{activity.user}</span>
                  <span className="text-gray-400"> {activity.action}</span>
                </div>
              </div>
              <span className="text-sm text-gray-500">{activity.time}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}