import React from 'react';
import { Award, ThumbsUp, MessageCircle, Star } from 'lucide-react';

export default function DailyChallenge() {
  return (
    <div className="digital-screen">
      <div className="scanner-line" />
      <div className="flex items-center space-x-3 mb-6">
        <Award className="w-8 h-8 text-brand-orange animate-pulse" />
        <h2 className="text-xl font-bold text-white">Daily Challenge</h2>
      </div>

      <div className="neon-card p-6 mb-6">
        <h3 className="text-xl font-semibold text-brand-cyan mb-3">Today's Theme: Tech Humor</h3>
        <p className="text-gray-300">
          "Why do programmers prefer dark mode? Because light attracts bugs! 🐛"
        </p>
        
        <div className="flex items-center space-x-4 mt-4">
          <button className="flex items-center space-x-2 text-brand-purple hover:text-brand-red transition-colors">
            <ThumbsUp className="w-5 h-5" />
            <span>245</span>
          </button>
          <button className="flex items-center space-x-2 text-brand-purple hover:text-brand-red transition-colors">
            <MessageCircle className="w-5 h-5" />
            <span>42</span>
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-semibold text-white">Your Turn!</h4>
        <textarea 
          className="w-full p-3 bg-dark-card/50 border border-brand-red/30 rounded-lg text-white placeholder-gray-400 focus:border-brand-red focus:ring-1 focus:ring-brand-red"
          placeholder="Share your tech-themed joke..."
          rows={3}
        />
        <button className="w-full cyber-button">
          Submit Challenge
        </button>
      </div>
    </div>
  );
}