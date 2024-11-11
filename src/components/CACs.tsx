import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Wand2, Crown, Sparkles, Star } from 'lucide-react';

const tabVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

export default function CACs() {
  const [activeTab, setActiveTab] = useState('create');

  const tabs = [
    { id: 'create', label: 'Create & Customize', icon: Brain },
    { id: 'playground', label: 'Playground', icon: Wand2 },
    { id: 'premium', label: 'Premium', icon: Crown }
  ];

  return (
    <div className="space-y-8">
      {/* Header with Stats */}
      <div className="digital-screen">
        <div className="scanner-line" />
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-red via-brand-purple to-brand-orange">
              CAC Management
            </h1>
            <p className="text-gray-400 mt-2">Create, test, and deploy your Comedy Agents</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-brand-cyan">12</div>
              <div className="text-sm text-gray-400">Active CACs</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-brand-orange">2.5k</div>
              <div className="text-sm text-gray-400">Total Jokes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-brand-purple">89%</div>
              <div className="text-sm text-gray-400">Success Rate</div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-4">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-lg flex items-center space-x-2 transition-all ${
                  activeTab === tab.id
                    ? 'bg-brand-red text-white neon-border'
                    : 'bg-dark-card text-gray-400 hover:text-brand-red hover:bg-dark-lighter'
                }`}
              >
                <Icon className={`w-5 h-5 ${activeTab === tab.id ? 'animate-pulse' : ''}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Dynamic Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          variants={tabVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6"
        >
          {/* Main Content Area */}
          <div className="lg:col-span-8">
            <div className="digital-screen">
              <div className="scanner-line" />
              {activeTab === 'create' && (
                <div className="space-y-6">
                  {/* Personality Selection */}
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4">Choose Base Personality</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { id: 'standup', name: 'Stand-up Comedian', desc: 'Perfect for live performances' },
                        { id: 'satirist', name: 'Social Satirist', desc: 'Sharp commentary on current events' },
                        { id: 'memer', name: 'Meme Lord', desc: 'Masters of internet humor' },
                        { id: 'improv', name: 'Improv Artist', desc: 'Quick-witted responses' }
                      ].map((type) => (
                        <div key={type.id} className="neon-card p-4 cursor-pointer hover:scale-105 transition-transform">
                          <h4 className="text-brand-cyan font-semibold">{type.name}</h4>
                          <p className="text-gray-400 text-sm">{type.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Style Customization */}
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4">Customize Style</h3>
                    <div className="space-y-4">
                      <div className="neon-card p-4">
                        <label className="text-brand-purple block mb-2">Humor Style</label>
                        <div className="grid grid-cols-2 gap-2">
                          <button className="cyber-button">Clean</button>
                          <button className="cyber-button">Edgy</button>
                          <button className="cyber-button">Sarcastic</button>
                          <button className="cyber-button">Absurd</button>
                        </div>
                      </div>

                      <div className="neon-card p-4">
                        <label className="text-brand-orange block mb-2">Topics</label>
                        <div className="flex flex-wrap gap-2">
                          {['Tech', 'Pop Culture', 'Politics', 'Daily Life'].map((topic) => (
                            <button key={topic} className="cyber-button">
                              {topic}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-4">
                    <button className="flex-1 cyber-button">
                      <span>Preview CAC</span>
                    </button>
                    <button className="flex-1 bg-brand-red hover:bg-brand-red/90 text-white py-3 rounded-lg transition-colors flex items-center justify-center space-x-2">
                      <Sparkles className="w-5 h-5" />
                      <span>Create CAC</span>
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'playground' && (
                <div className="space-y-6">
                  {/* Test Environment */}
                  <div className="neon-card p-6">
                    <h3 className="text-xl font-bold text-white mb-4">Test Your CAC</h3>
                    <div className="space-y-4">
                      <textarea
                        className="w-full bg-dark-card/50 border border-brand-red/30 rounded-lg p-4 text-white placeholder-gray-400 focus:border-brand-red focus:ring-1 focus:ring-brand-red"
                        rows={4}
                        placeholder="Type a prompt for your CAC..."
                      />
                      <button className="w-full cyber-button">
                        Generate Response
                      </button>
                    </div>
                  </div>

                  {/* Response Display */}
                  <div className="neon-card p-6">
                    <h3 className="text-xl font-bold text-white mb-4">CAC Response</h3>
                    <div className="bg-dark-card/50 rounded-lg p-4 min-h-[200px] text-gray-300">
                      Response will appear here...
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'premium' && (
                <div className="space-y-6">
                  {/* Premium Features */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { name: 'Celebrity Style', price: '500 TCC' },
                      { name: 'Custom Voice', price: '300 TCC' },
                      { name: 'Advanced AI', price: '750 TCC' },
                      { name: 'Multi-language', price: '400 TCC' }
                    ].map((feature) => (
                      <div key={feature.name} className="neon-card p-4">
                        <h4 className="text-brand-cyan font-semibold">{feature.name}</h4>
                        <p className="text-brand-orange mt-2">{feature.price}</p>
                        <button className="mt-3 w-full cyber-button">
                          Unlock
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {/* Quick Stats */}
            <div className="digital-screen">
              <div className="scanner-line" />
              <h3 className="text-xl font-bold text-white mb-4">Your CACs</h3>
              <div className="space-y-4">
                {[
                  { name: 'TechJoker', type: 'Stand-up', rating: '4.8' },
                  { name: 'MemeKing', type: 'Meme Lord', rating: '4.5' }
                ].map((cac) => (
                  <div key={cac.name} className="neon-card p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-white font-medium">{cac.name}</h4>
                        <span className="text-sm text-gray-400">{cac.type}</span>
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

            {/* Tips & Tricks */}
            <div className="digital-screen">
              <div className="scanner-line" />
              <h3 className="text-xl font-bold text-white mb-4">Pro Tips</h3>
              <div className="space-y-3">
                {[
                  'Use specific prompts for better results',
                  'Test your CAC in different scenarios',
                  'Keep responses concise and punchy'
                ].map((tip, index) => (
                  <div key={index} className="neon-card p-3">
                    <p className="text-gray-300 text-sm">{tip}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}