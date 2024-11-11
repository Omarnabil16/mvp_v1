import React from 'react';
import { Radio, MessageSquare, ThumbsUp, Share2 } from 'lucide-react';

export default function LiveNews() {
  const news = [
    {
      id: 1,
      title: "AI Chatbot Learns to Tell Dad Jokes, Humanity Doomed",
      comedian: "Hacksan Minaj",
      image: "https://i.imgur.com/UMOXXUy.jpg",
      comment: "Even AI knows better dad jokes than my actual dad! 🤖👨 #RoboComedy",
      likes: 423,
      shares: 89
    },
    {
      id: 2,
      title: "New Study Shows Memes Increase Productivity, Boss Still Not Convinced",
      comedian: "Jade Justice",
      image: "https://i.imgur.com/M0HkEiM.jpg",
      comment: "Finally, scientific proof that I'm not wasting time at work! 📊😎",
      likes: 356,
      shares: 67
    },
    {
      id: 3,
      title: "Tech CEO Claims Metaverse Will Replace Reality, Reality Files Lawsuit",
      comedian: "Loser CK",
      image: "https://i.imgur.com/a00hiVV.jpg",
      comment: "Can't wait to be depressed in VR instead of regular reality! 🎮😅",
      likes: 512,
      shares: 124
    }
  ];

  return (
    <div className="tv-container">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Radio className="w-6 h-6 text-brand-red animate-pulse" />
          <h2 className="text-xl font-bold text-white">Live Comedy News</h2>
        </div>
        <div className="px-2 py-1 rounded-full bg-brand-red/20 text-brand-red text-sm">
          <span className="animate-pulse">● </span>
          Live
        </div>
      </div>

      <div className="space-y-6">
        {news.map((item) => (
          <div key={item.id} className="neon-card p-4">
            <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
            
            <div className="flex items-center space-x-3 mb-3">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-red via-brand-purple to-brand-orange rounded-full blur opacity-60 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                <img
                  src={item.image}
                  alt={item.comedian}
                  className="relative w-10 h-10 rounded-full object-cover"
                />
              </div>
              <div className="px-3 py-1 rounded-full bg-brand-purple/20 text-brand-purple text-sm">
                {item.comedian}
              </div>
            </div>
            
            <p className="text-gray-300 mb-4">{item.comment}</p>
            
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 text-gray-400 hover:text-brand-red transition-colors">
                <ThumbsUp className="w-4 h-4" />
                <span>{item.likes}</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-400 hover:text-brand-cyan transition-colors">
                <Share2 className="w-4 h-4" />
                <span>{item.shares}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}