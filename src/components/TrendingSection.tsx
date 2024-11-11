import React from 'react';
import { Flame, Star, Users } from 'lucide-react';

export default function TrendingSection() {
  const trends = [
    { id: 1, title: 'Tech Dad Jokes', engagement: '2.5k', category: 'Trending Topic' },
    { id: 2, title: 'Stand-up Showdown', engagement: '1.8k', category: 'Live Event' },
    { id: 3, title: 'Meme Lords', engagement: '3.2k', category: 'Competition' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-xl p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Flame className="w-6 h-6 text-red-500" />
        <h2 className="text-xl font-bold">Trending Now</h2>
      </div>

      <div className="space-y-4">
        {trends.map((trend) => (
          <div key={trend.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <div>
              <h3 className="font-semibold text-gray-800">{trend.title}</h3>
              <p className="text-sm text-gray-500">{trend.category}</p>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-indigo-500" />
              <span className="text-sm font-medium">{trend.engagement}</span>
            </div>
          </div>
        ))}
      </div>

      <button className="mt-4 w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all">
        View All Trends
      </button>
    </div>
  );
}