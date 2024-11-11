import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Star, MessageSquare, Crown, Plus, ArrowRight } from 'lucide-react';

export default function ComedyClubs() {
  const [selectedClub, setSelectedClub] = useState(null);

  const clubs = [
    {
      id: 1,
      name: "Tech Comedians United",
      members: 234,
      rating: 4.8,
      activity: "high",
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=300",
      description: "Where coding meets comedy! Join us for tech-themed humor and debugging jokes.",
      events: ["Weekly Code Roast", "Hackathon Comedy Night"]
    },
    {
      id: 2,
      name: "Meme Masters",
      members: 189,
      rating: 4.6,
      activity: "medium",
      image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=300",
      description: "Creating and sharing the dankest memes in the comedy universe.",
      events: ["Meme Battle Royale", "Template Tuesday"]
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Club List */}
      <div className="lg:col-span-8 space-y-6">
        <div className="digital-screen">
          <div className="scanner-line" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {clubs.map((club, index) => (
              <motion.div
                key={club.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedClub(club)}
                className="neon-card cursor-pointer group"
              >
                <div className="relative h-48 mb-4 overflow-hidden rounded-t-lg">
                  <img
                    src={club.image}
                    alt={club.name}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-xl font-bold text-white">{club.name}</h3>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-brand-cyan" />
                      <span className="text-brand-cyan">{club.members} members</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-brand-orange" />
                      <span className="text-brand-orange">{club.rating}</span>
                    </div>
                  </div>

                  <p className="text-gray-400 text-sm mb-4">{club.description}</p>

                  <button className="w-full cyber-button">
                    Join Club
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Create Club Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="digital-screen"
        >
          <div className="scanner-line" />
          <div className="text-center py-8">
            <Plus className="w-12 h-12 text-brand-red mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Create Your Own Club</h3>
            <p className="text-gray-400 mb-6">Start a community around your favorite comedy style</p>
            <button className="cyber-button">
              Create Club
            </button>
          </div>
        </motion.div>
      </div>

      {/* Sidebar */}
      <div className="lg:col-span-4 space-y-6">
        {/* Top Clubs */}
        <div className="digital-screen">
          <div className="scanner-line" />
          <h3 className="text-xl font-bold text-white mb-4">Top Clubs</h3>
          <div className="space-y-3">
            {clubs.map((club, index) => (
              <div key={index} className="neon-card p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-medium text-white">{club.name}</span>
                    <div className="flex items-center space-x-2 text-sm text-gray-400">
                      <Users className="w-4 h-4" />
                      <span>{club.members}</span>
                    </div>
                  </div>
                  <Crown className="w-5 h-5 text-brand-orange" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="digital-screen">
          <div className="scanner-line" />
          <h3 className="text-xl font-bold text-white mb-4">Club Events</h3>
          <div className="space-y-3">
            {clubs.flatMap(club => 
              club.events.map((event, index) => (
                <div key={`${club.id}-${index}`} className="neon-card p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-medium text-white">{event}</span>
                      <span className="text-sm text-brand-purple block">{club.name}</span>
                    </div>
                    <ArrowRight className="w-5 h-5 text-brand-cyan" />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}