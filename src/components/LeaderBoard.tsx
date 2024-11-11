import React from 'react';
import { Crown, Star, Award, ArrowUp } from 'lucide-react';

export default function LeaderBoard() {
  const leaders = [
    { id: 1, name: 'JokeMaster3000', points: 1250, rank: 1 },
    { id: 2, name: 'ComedyQueen', points: 980, rank: 2 },
    { id: 3, name: 'LaughTracker', points: 875, rank: 3 },
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-5 h-5 text-brand-orange animate-pulse" />;
      case 2:
        return <Star className="w-5 h-5 text-brand-purple" />;
      case 3:
        return <Award className="w-5 h-5 text-brand-cyan" />;
      default:
        return null;
    }
  };

  return (
    <div className="digital-screen">
      <div className="scanner-line" />
      <h2 className="text-2xl font-bold text-white flex items-center space-x-2 mb-6">
        <Crown className="w-7 h-7 text-brand-orange" />
        <span>Top Comedians</span>
      </h2>

      <div className="space-y-4">
        {leaders.map((leader) => (
          <div 
            key={leader.id}
            className="neon-card flex items-center justify-between p-4"
          >
            <div className="flex items-center space-x-3">
              {getRankIcon(leader.rank)}
              <span className="font-semibold text-white">{leader.name}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-brand-orange font-bold">{leader.points}</span>
              <span className="text-sm text-gray-400">pts</span>
            </div>
          </div>
        ))}
      </div>

      <button className="mt-6 w-full cyber-button">
        View Full Leaderboard
      </button>
    </div>
  );
}