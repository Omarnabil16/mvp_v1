import React from 'react';
import { Rocket, Users, Clock, ArrowRight } from 'lucide-react';

export default function SocialMediaRaids() {
  const raids = [
    {
      id: 1,
      title: "Evening Comedy Raid",
      time: "20:00 UTC",
      participants: 156,
      status: "upcoming",
      hashtag: "#TCCComedyRaid"
    },
    {
      id: 2,
      title: "Meme Lords Unite",
      time: "22:00 UTC",
      participants: 89,
      status: "active",
      hashtag: "#MemeLords"
    }
  ];

  return (
    <div className="digital-screen">
      <div className="scanner-line" />
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Rocket className="w-6 h-6 text-brand-red animate-pulse" />
          <h2 className="text-xl font-bold text-white">Social Media Raids</h2>
        </div>
        <span className="text-sm text-brand-orange font-medium">2 Active Raids</span>
      </div>

      <div className="space-y-4">
        {raids.map((raid) => (
          <div key={raid.id} className="neon-card p-4">
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-semibold text-white">{raid.title}</h3>
              <span className={`text-xs px-2 py-1 rounded-full ${
                raid.status === 'active' 
                  ? 'bg-brand-cyan/20 text-brand-cyan' 
                  : 'bg-brand-orange/20 text-brand-orange'
              }`}>
                {raid.status}
              </span>
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{raid.time}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4" />
                <span>{raid.participants} raiders</span>
              </div>
            </div>
            
            <div className="mt-3 text-sm text-brand-purple font-medium">
              {raid.hashtag}
            </div>
            
            <button className="mt-3 w-full cyber-button">
              Join Raid
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}