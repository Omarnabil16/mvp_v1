import React, { useState } from 'react';
import { User, Camera, Tag, Save, Sparkles } from 'lucide-react';

export default function ProfileSettings() {
  const [username, setUsername] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(0);
  const [interests, setInterests] = useState<string[]>([]);

  const avatarStyles = [
    'pixel', 'anime', 'classic', 'cyberpunk', 'abstract'
  ];

  const interestOptions = [
    'Stand-up Comedy', 'Memes', 'Tech Humor', 'Satire',
    'Wordplay', 'Improv', 'Dark Humor', 'Slapstick'
  ];

  const generateNewAvatar = (style: string) => {
    // In a real implementation, this would call an avatar generation API
    // For now, we'll use placeholder images
    return `https://source.unsplash.com/random/150x150?${style},avatar&sig=${Math.random()}`;
  };

  const handleInterestToggle = (interest: string) => {
    setInterests(prev => 
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-xl p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center space-x-3 border-b pb-6">
        <User className="w-8 h-8 text-red-500" />
        <h2 className="text-2xl font-bold">Profile Settings</h2>
      </div>

      {/* Username Section */}
      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">Username</label>
        <div className="relative">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Choose your username"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
          />
          <div className="absolute right-3 top-2.5 text-sm text-gray-500">
            {username.length}/20
          </div>
        </div>
      </div>

      {/* Avatar Generator */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium text-gray-700">Profile Picture</label>
          <button 
            onClick={() => setSelectedAvatar(prev => (prev + 1) % avatarStyles.length)}
            className="flex items-center space-x-2 text-red-600 hover:text-red-700"
          >
            <Camera className="w-4 h-4" />
            <span>Generate New</span>
          </button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {avatarStyles.map((style, index) => (
            <div
              key={style}
              onClick={() => setSelectedAvatar(index)}
              className={`relative rounded-xl overflow-hidden cursor-pointer transition-transform hover:scale-105 ${
                selectedAvatar === index ? 'ring-4 ring-red-500' : ''
              }`}
            >
              <img
                src={generateNewAvatar(style)}
                alt={`${style} avatar`}
                className="w-full h-32 object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                <span className="text-white text-sm capitalize">{style}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interests Section */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Tag className="w-5 h-5 text-red-500" />
          <label className="block text-sm font-medium text-gray-700">Interests</label>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {interestOptions.map((interest) => (
            <button
              key={interest}
              onClick={() => handleInterestToggle(interest)}
              className={`px-4 py-2 rounded-full text-sm transition-all ${
                interests.includes(interest)
                  ? 'bg-red-500 text-white hover:bg-red-600'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {interest}
            </button>
          ))}
        </div>
      </div>

      {/* Special Features */}
      <div className="bg-gradient-to-r from-red-50 to-rose-50 rounded-xl p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Sparkles className="w-5 h-5 text-red-500 animate-pulse-glow" />
          <h3 className="font-semibold">Premium Features</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="bg-white/50 hover:bg-white/70 transition-colors p-4 rounded-lg text-left">
            <span className="block font-medium">Custom Animations</span>
            <span className="text-sm text-gray-600">Add flair to your profile</span>
          </button>
          <button className="bg-white/50 hover:bg-white/70 transition-colors p-4 rounded-lg text-left">
            <span className="block font-medium">Exclusive Badges</span>
            <span className="text-sm text-gray-600">Show off your achievements</span>
          </button>
        </div>
      </div>

      {/* Save Button */}
      <button className="w-full bg-gradient-to-r from-red-600 to-rose-600 text-white py-3 rounded-xl hover:from-red-700 hover:to-rose-700 transition-all flex items-center justify-center space-x-2 hover-scale">
        <Save className="w-5 h-5" />
        <span>Save Profile</span>
      </button>
    </div>
  );
}