import React from 'react';
import { Users, Star, MessageSquare, ArrowUpRight } from 'lucide-react';

export default function ComedyClubs() {
  const clubs = [
    {
      id: 1,
      name: "Tech Comedians United",
      members: 234,
      rating: 4.8,
      activity: "high",
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=100&h=100"
    },
    {
      id: 2,
      name: "Meme Masters",
      members: 189,
      rating: 4.6,
      activity: "medium",
      image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=100&h=100"
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-xl p-6 card-hover">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Users className="w-6 h-6 text-red-500" />
          <h2 className="text-xl font-bold">Comedy Clubs</h2>
        </div>
        <button className="text-sm text-red-600 hover:text-red-700 flex items-center space-x-1">
          <span>View All</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-4">
        {clubs.map((club) => (
          <div key={club.id} className="flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
            <img
              src={club.image}
              alt={club.name}
              className="w-12 h-12 rounded-lg object-cover"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800">{club.name}</h3>
              <div className="flex items-center space-x-3 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>{club.members}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span>{club.rating}</span>
                </div>
              </div>
            </div>
            <button className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors">
              Join
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}