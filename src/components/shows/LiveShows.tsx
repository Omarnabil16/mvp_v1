import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, Star, Users, Clock, Crown, ThumbsUp, 
  MessageSquare, Play, Volume2, Mic, Radio
} from 'lucide-react';

export default function LiveShows() {
  const [selectedShow, setSelectedShow] = useState<string | null>(null);
  const [isLive, setIsLive] = useState(false);

  const upcomingShows = [
    {
      id: '1',
      title: 'Tech Comedy Night',
      host: 'BitMaster',
      type: 'Stand-Up',
      time: '21:00 UTC',
      date: 'Today',
      viewers: 234,
      price: 'Free',
      description: 'A night of tech-themed comedy and programming jokes!',
      thumbnail: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=800'
    },
    {
      id: '2',
      title: 'Crypto Roast Battle',
      host: 'Ricky Rugpull',
      type: 'Roast Battle',
      time: '22:00 UTC',
      date: 'Tomorrow',
      viewers: 189,
      price: '50 TCC',
      description: 'Watch CACs battle it out with crypto-themed roasts!',
      thumbnail: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=800'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Stage Area */}
      <div className="digital-screen relative overflow-hidden" style={{ minHeight: '400px' }}>
        <div className="scanner-line" />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-red/10 to-transparent animate-pulse" />
        
        {isLive ? (
          <div className="relative z-10">
            <div className="absolute top-4 right-4 flex items-center space-x-4">
              <div className="px-3 py-1 rounded-full bg-brand-red/20 text-brand-red text-sm">
                <span className="animate-pulse">● </span>
                LIVE
              </div>
              <div className="flex items-center space-x-2 text-white">
                <Users className="w-4 h-4" />
                <span>1.2k watching</span>
              </div>
            </div>

            {/* Virtual Stage */}
            <div className="flex flex-col items-center justify-center h-96">
              <div className="w-24 h-24 rounded-full bg-brand-red/20 flex items-center justify-center mb-4">
                <Mic className="w-12 h-12 text-brand-red animate-pulse" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Tech Comedy Night</h2>
              <p className="text-gray-400">with BitMaster</p>
            </div>

            {/* Audio Controls */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <div className="audio-player">
                <button className="play-button">
                  <Play className="w-6 h-6 text-white" />
                </button>
                <div className="flex-1">
                  <div className="h-1 bg-dark-lighter rounded-full overflow-hidden">
                    <div className="h-full w-1/3 bg-gradient-to-r from-brand-red to-brand-purple animate-pulse" />
                  </div>
                </div>
                <Volume2 className="w-6 h-6 text-brand-red" />
                <div className="flex items-center space-x-2 px-4 border-l border-white/10">
                  <Radio className="w-5 h-5 text-brand-purple" />
                  <span className="text-sm text-white">Live: Tech Comedy Hour</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-96">
            <button 
              onClick={() => setIsLive(true)}
              className="bg-brand-red hover:bg-brand-red/90 text-white px-8 py-4 rounded-lg flex items-center space-x-3 transform hover:scale-105 transition-all"
            >
              <Play className="w-6 h-6" />
              <span className="text-lg font-bold">Enter Virtual Stage</span>
            </button>
          </div>
        )}
      </div>

      {/* Upcoming Shows Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {upcomingShows.map((show) => (
          <motion.div
            key={show.id}
            layoutId={show.id}
            onClick={() => setSelectedShow(show.id)}
            className="neon-card overflow-hidden cursor-pointer group"
          >
            <div className="relative h-48">
              <img 
                src={show.thumbnail} 
                alt={show.title}
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-xl font-bold text-white mb-2">{show.title}</h3>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 text-brand-cyan">
                    <Star className="w-4 h-4" />
                    <span>{show.host}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-brand-orange">
                    <Clock className="w-4 h-4" />
                    <span>{show.time}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2 text-gray-400">
                  <Users className="w-4 h-4" />
                  <span>{show.viewers} interested</span>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  show.price === 'Free'
                    ? 'bg-brand-cyan/20 text-brand-cyan'
                    : 'bg-brand-orange/20 text-brand-orange'
                }`}>
                  {show.price}
                </span>
              </div>

              <p className="text-gray-400 mb-4">{show.description}</p>

              <div className="flex space-x-2">
                <button className="flex-1 cyber-button">
                  Set Reminder
                </button>
                <button className="flex-1 bg-brand-red hover:bg-brand-red/90 text-white py-2 rounded-lg transition-all flex items-center justify-center space-x-2">
                  <Crown className="w-5 h-5" />
                  <span>Get VIP Access</span>
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="digital-screen">
          <div className="scanner-line" />
          <h3 className="text-xl font-bold text-white mb-4">Live Reactions</h3>
          <div className="grid grid-cols-2 gap-3">
            <button className="cyber-button flex items-center justify-center space-x-2">
              <ThumbsUp className="w-5 h-5" />
              <span>Applaud</span>
            </button>
            <button className="cyber-button flex items-center justify-center space-x-2">
              <MessageSquare className="w-5 h-5" />
              <span>Comment</span>
            </button>
          </div>
        </div>

        <div className="digital-screen">
          <div className="scanner-line" />
          <h3 className="text-xl font-bold text-white mb-4">Your Schedule</h3>
          <div className="space-y-2">
            {[
              { time: '19:00', show: 'Meme Review' },
              { time: '21:00', show: 'Tech Comedy' }
            ].map((slot, index) => (
              <div key={index} className="neon-card p-2 flex justify-between items-center">
                <span className="text-brand-purple">{slot.time}</span>
                <span className="text-white">{slot.show}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="digital-screen">
          <div className="scanner-line" />
          <h3 className="text-xl font-bold text-white mb-4">VIP Benefits</h3>
          <div className="space-y-2">
            <div className="neon-card p-2">
              <span className="text-brand-orange">Priority Seating</span>
            </div>
            <div className="neon-card p-2">
              <span className="text-brand-cyan">Exclusive Chat</span>
            </div>
            <div className="neon-card p-2">
              <span className="text-brand-purple">Backstage Access</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}