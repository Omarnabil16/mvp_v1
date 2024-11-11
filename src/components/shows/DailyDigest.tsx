import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Newspaper, Settings, Star, Share2, ThumbsUp,
  ChevronLeft, ChevronRight, Bookmark, Radio
} from 'lucide-react';

export default function DailyDigest() {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedTheme, setSelectedTheme] = useState('tech');

  const themes = [
    { id: 'tech', name: 'Tech Humor' },
    { id: 'crypto', name: 'Crypto Comedy' },
    { id: 'pop', name: 'Pop Culture' }
  ];

  const digestContent = [
    {
      id: 1,
      cac: 'BitMaster',
      content: 'Why do programmers prefer dark mode? Because light attracts bugs! 🐛',
      likes: 245,
      shares: 42,
      image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=800'
    },
    {
      id: 2,
      cac: 'Ricky Rugpull',
      content: 'Just like my portfolio, this joke is volatile but promising! 📈',
      likes: 189,
      shares: 31,
      image: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&w=800'
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* E-Reader Main Content */}
      <div className="lg:col-span-8">
        <div className="digital-screen" style={{ minHeight: '600px' }}>
          <div className="scanner-line" />
          
          {/* Theme Selector */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Radio className="w-6 h-6 text-brand-red animate-pulse" />
              <h2 className="text-xl font-bold text-white">Daily Comedy Digest</h2>
            </div>
            <div className="flex space-x-2">
              {themes.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => setSelectedTheme(theme.id)}
                  className={`px-3 py-1 rounded-full text-sm transition-all ${
                    selectedTheme === theme.id
                      ? 'bg-brand-red text-white'
                      : 'bg-dark-card text-gray-400 hover:text-brand-red'
                  }`}
                >
                  {theme.name}
                </button>
              ))}
            </div>
          </div>

          {/* E-Reader Content */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                className="space-y-6"
              >
                {digestContent.map((item) => (
                  <div key={item.id} className="neon-card overflow-hidden">
                    <div className="relative h-48 mb-4">
                      <img 
                        src={item.image} 
                        alt={item.content}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent" />
                    </div>

                    <div className="p-4">
                      <div className="flex items-center space-x-2 mb-4">
                        <Star className="w-5 h-5 text-brand-orange" />
                        <span className="font-medium text-brand-orange">{item.cac}</span>
                      </div>

                      <p className="text-lg text-white mb-4">{item.content}</p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <button className="flex items-center space-x-2 text-gray-400 hover:text-brand-red transition-colors">
                            <ThumbsUp className="w-5 h-5" />
                            <span>{item.likes}</span>
                          </button>
                          <button className="flex items-center space-x-2 text-gray-400 hover:text-brand-cyan transition-colors">
                            <Share2 className="w-5 h-5" />
                            <span>{item.shares}</span>
                          </button>
                        </div>
                        <button className="text-gray-400 hover:text-brand-purple transition-colors">
                          <Bookmark className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Navigation Controls */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                className="p-2 bg-dark-card rounded-full hover:bg-brand-red/20 text-gray-400 hover:text-brand-red transition-all"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button 
                onClick={() => setCurrentPage(prev => prev + 1)}
                className="p-2 bg-dark-card rounded-full hover:bg-brand-red/20 text-gray-400 hover:text-brand-red transition-all"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="lg:col-span-4 space-y-6">
        {/* Featured CACs */}
        <div className="digital-screen">
          <div className="scanner-line" />
          <h3 className="text-xl font-bold text-white mb-4">Today's Writers</h3>
          <div className="space-y-3">
            {[
              { name: 'BitMaster', specialty: 'Tech Humor', rating: 4.8 },
              { name: 'Ricky Rugpull', specialty: 'Crypto Comedy', rating: 4.6 }
            ].map((cac, index) => (
              <div key={index} className="neon-card p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-medium text-white">{cac.name}</span>
                    <span className="text-sm text-brand-purple block">{cac.specialty}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-brand-orange" />
                    <span className="text-brand-orange">{cac.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reading Stats */}
        <div className="digital-screen">
          <div className="scanner-line" />
          <h3 className="text-xl font-bold text-white mb-4">Your Stats</h3>
          <div className="space-y-3">
            <div className="neon-card p-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Reading Streak</span>
                <span className="text-brand-cyan">7 days</span>
              </div>
            </div>
            <div className="neon-card p-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Articles Read</span>
                <span className="text-brand-orange">42</span>
              </div>
            </div>
            <div className="neon-card p-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Reactions Given</span>
                <span className="text-brand-purple">156</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}