import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Rocket, Star, Users, Clock, Share2, Trophy,
  TrendingUp, Radio, Target, Crown
} from 'lucide-react';

export default function StreetTeam() {
  const [selectedRaid, setSelectedRaid] = useState(null);

  const raids = [
    {
      id: 1,
      title: "Evening Comedy Raid",
      time: "20:00 UTC",
      participants: 156,
      status: "upcoming",
      hashtag: "#TCCComedyRaid",
      reward: "250 TCC",
      target: "X (Twitter)"
    },
    {
      id: 2,
      title: "Meme Lords Unite",
      time: "22:00 UTC",
      participants: 89,
      status: "active",
      hashtag: "#MemeLords",
      reward: "180 TCC",
      target: "X (Twitter)"
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Main Content */}
      <div className="lg:col-span-8 space-y-6">
        {/* Active Raids */}
        <div className="digital-screen">
          <div className="scanner-line" />
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Rocket className="w-6 h-6 text-brand-red animate-pulse" />
              <h2 className="text-xl font-bold text-white">Active Raids</h2>
            </div>
            <div className="px-3 py-1 rounded-full bg-brand-red/20 text-brand-red text-sm">
              <Radio className="w-4 h-4 inline-block mr-2" />
              Live
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {raids.map((raid, index) => (
              <motion.div
                key={raid.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="neon-card group cursor-pointer"
                onClick={() => setSelectedRaid(raid)}
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-bold text-white">{raid.title}</h3>
                    <span className={`text-sm px-2 py-1 rounded-full ${
                      raid.status === 'active' 
                        ? 'bg-brand-cyan/20 text-brand-cyan' 
                        : 'bg-brand-orange/20 text-brand-orange'
                    }`}>
                      {raid.status}
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2 text-gray-400">
                        <Clock className="w-4 h-4" />
                        <span>{raid.time}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-400">
                        <Users className="w-4 h-4" />
                        <span>{raid.participants} raiders</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-brand-purple">{raid.hashtag}</span>
                      <span className="text-brand-orange">{raid.reward}</span>
                    </div>
                  </div>

                  <button className="mt-4 w-full cyber-button flex items-center justify-center space-x-2">
                    <Share2 className="w-4 h-4" />
                    <span>Join Raid</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Raid Performance */}
        <div className="digital-screen">
          <div className="scanner-line" />
          <h3 className="text-xl font-bold text-white mb-6">Your Raid Performance</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: 'Raids Joined', value: '12', icon: Target, color: 'brand-cyan' },
              { label: 'Total Earned', value: '850 TCC', icon: Trophy, color: 'brand-orange' },
              { label: 'Current Rank', value: '#42', icon: Crown, color: 'brand-purple' }
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="neon-card p-4"
                >
                  <Icon className={`w-6 h-6 text-${stat.color} mb-2`} />
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="lg:col-span-4 space-y-6">
        {/* Top Raiders */}
        <div className="digital-screen">
          <div className="scanner-line" />
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">Top Raiders</h3>
            <TrendingUp className="w-5 h-5 text-brand-red" />
          </div>
          
          <div className="space-y-4">
            {[
              { name: 'JokeMaster', points: '1,250', position: 1 },
              { name: 'MemeQueen', points: '980', position: 2 },
              { name: 'LaughTracker', points: '875', position: 3 }
            ].map((raider, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="neon-card p-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      index === 0 ? 'bg-brand-orange' : 
                      index === 1 ? 'bg-brand-purple' : 
                      'bg-brand-cyan'
                    }`}>
                      {raider.position}
                    </div>
                    <span className="font-medium text-white">{raider.name}</span>
                  </div>
                  <span className="text-brand-red">{raider.points}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Raid Schedule */}
        <div className="digital-screen">
          <div className="scanner-line" />
          <h3 className="text-xl font-bold text-white mb-4">Upcoming Raids</h3>
          <div className="space-y-3">
            {[
              { time: '20:00 UTC', event: 'Evening Raid' },
              { time: '22:00 UTC', event: 'Night Owls' },
              { time: '00:00 UTC', event: 'Global Raid' }
            ].map((schedule, index) => (
              <div key={index} className="neon-card p-4">
                <div className="flex justify-between items-center">
                  <span className="text-brand-purple">{schedule.time}</span>
                  <span className="text-white">{schedule.event}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}