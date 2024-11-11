import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Rocket, Heart, Users, MessageSquare,
  Twitter, Send, Brain
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ChatFeed from './ChatFeed';
import LiveNews from './LiveNews';

export default function Dashboard() {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);

  const socialLinks = [
    { 
      platform: 'X', 
      icon: Twitter, 
      url: 'https://x.com/thecomedycult',
      followers: '12.5K'
    },
    { 
      platform: 'TikTok', 
      url: 'https://tiktok.com/@thecomedycult',
      followers: '25.8K',
      customIcon: (
        <svg 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="w-8 h-8"
        >
          <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
        </svg>
      )
    },
    { 
      platform: 'Telegram', 
      icon: Send,
      url: 'https://t.me/+yPEUrZEFfXplYTk0',
      followers: '8.2K'
    }
  ];

  const handleChatWithCAC = () => {
    navigate('/playground');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      {/* Welcome Title */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center py-12"
      >
        <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-red via-brand-purple to-brand-orange animate-pulse">
          Welcome to the Cult!
        </h1>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-4 text-xl text-gray-400"
        >
          Where Comedy Meets Technology
        </motion.div>
      </motion.div>

      {/* TCC Price and VIP CAC Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* TCC Price Card */}
        <div className="digital-screen relative overflow-hidden">
          <div className="scanner-line" />
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-brand-red/20 via-transparent to-brand-purple/20 animate-pulse" />
          
          <div className="relative z-10 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
                <Rocket className="w-6 h-6 text-brand-red" />
                <span>TCC Price</span>
              </h2>
              <div className="px-3 py-1 rounded-full bg-brand-green/20 text-brand-cyan flex items-center space-x-1">
                <span>+42.0%</span>
              </div>
            </div>

            <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-red via-brand-purple to-brand-orange animate-pulse mb-4">
              $4.20
            </div>

            <div className="text-xl text-brand-cyan font-medium mb-6">
              "Few understand the power of comedy! 🚀"
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="neon-card p-3 text-center">
                <div className="text-brand-orange text-lg font-bold">Market Cap</div>
                <div className="text-white">$42M</div>
              </div>
              <div className="neon-card p-3 text-center">
                <div className="text-brand-purple text-lg font-bold">Online Members</div>
                <div className="text-white">4,269</div>
              </div>
            </div>
          </div>
        </div>

        {/* VIP CAC Spotlight */}
        <div className="digital-screen relative overflow-hidden">
          <div className="scanner-line" />
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-brand-orange/20 via-transparent to-brand-purple/20 animate-pulse" />
          
          <div className="relative z-10 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
                <span>CAC of the Week</span>
              </h2>
              <div className="px-3 py-1 rounded-full bg-brand-orange/20 text-brand-orange">
                Premium CAC
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-red via-brand-purple to-brand-orange rounded-2xl blur opacity-60 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                <img
                  src="https://i.imgur.com/wCWSQjU.jpg"
                  alt="Koin-Mala Harris"
                  className="relative w-32 h-32 rounded-2xl object-cover"
                />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-brand-purple to-brand-red">
                    Koin-Mala Harris
                  </h3>
                  <button 
                    onClick={() => setIsFavorite(!isFavorite)}
                    className={`p-2 rounded-full transition-colors ${
                      isFavorite ? 'text-brand-red' : 'text-gray-400 hover:text-brand-red'
                    }`}
                  >
                    <Heart className={`w-6 h-6 ${isFavorite ? 'fill-current' : ''}`} />
                  </button>
                </div>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center space-x-1 text-brand-cyan">
                    <MessageSquare className="w-4 h-4" />
                    <span>4.2k jokes</span>
                  </div>
                  <div className="flex items-center space-x-1 text-brand-purple">
                    <Users className="w-4 h-4" />
                    <span>10.5k fans</span>
                  </div>
                </div>
                <p className="text-gray-400 mb-4">
                  "I'm here to regulate your funny bone and pump up those laugh markets! 📈"
                </p>
                <button 
                  onClick={() => navigate('/playground')}
                  className="w-full cyber-button flex items-center justify-center space-x-2"
                >
                  <Brain className="w-5 h-5" />
                  <span>Chat with Koin-Mala</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Social Media Links */}
      <div className="digital-screen">
        <div className="scanner-line" />
        <h2 className="text-2xl font-bold text-white mb-6">Join Our Community</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {socialLinks.map((social, index) => (
            <a
              key={social.platform}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="neon-card p-6 hover:scale-105 transition-transform"
            >
              <div className="flex items-center justify-between mb-4">
                {social.icon ? <social.icon className="w-8 h-8 text-brand-red" /> : social.customIcon}
                <span className="text-xl font-bold text-white">{social.platform}</span>
              </div>
              <div className="text-2xl font-bold text-brand-orange">
                {social.followers}
              </div>
              <div className="text-sm text-gray-400">followers</div>
            </a>
          ))}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChatFeed />
        <LiveNews />
      </div>
    </motion.div>
  );
}