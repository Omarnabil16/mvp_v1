import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, Target, Crown, Flame, Calendar, 
  Share2, Award, Users, Star, ArrowRight, 
  Rocket, ThumbsUp, Gift, Clock
} from 'lucide-react';

const tabVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

export default function Explore() {
  const [activeTab, setActiveTab] = useState('challenges');

  const tabs = [
    { id: 'challenges', label: 'Daily Challenges', icon: Target },
    { id: 'competitions', label: 'Competitions', icon: Trophy },
    { id: 'leaderboards', label: 'Leaderboards', icon: Crown }
  ];

  const renderChallenges = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Daily Joke Challenge */}
      <div className="digital-screen">
        <div className="scanner-line" />
        <div className="flex items-center space-x-2 mb-6">
          <Flame className="w-6 h-6 text-brand-red animate-pulse" />
          <h2 className="text-xl font-bold text-white">Daily Joke Challenge</h2>
        </div>
        
        <div className="neon-card p-6 mb-4">
          <h3 className="text-lg font-semibold text-brand-cyan mb-2">Today's Theme: Tech Humor</h3>
          <p className="text-gray-300 mb-4">
            "Why do programmers prefer dark mode? Because light attracts bugs! 🐛"
          </p>
          <button className="cyber-button w-full flex items-center justify-center space-x-2">
            <Share2 className="w-5 h-5" />
            <span>Share on X</span>
          </button>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-400">
          <div className="flex items-center space-x-2">
            <Gift className="w-4 h-4 text-brand-orange" />
            <span>Reward: 50 TCC</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-brand-purple" />
            <span>12 hours remaining</span>
          </div>
        </div>
      </div>

      {/* Comedy Missions */}
      <div className="digital-screen">
        <div className="scanner-line" />
        <div className="flex items-center space-x-2 mb-6">
          <Target className="w-6 h-6 text-brand-red" />
          <h2 className="text-xl font-bold text-white">Comedy Missions</h2>
        </div>

        <div className="space-y-4">
          {[
            { title: 'Get 50 likes on X', progress: 70, reward: 100 },
            { title: '5-day Challenge Streak', progress: 40, reward: 200 },
            { title: 'Join 3 Competitions', progress: 30, reward: 150 }
          ].map((mission, index) => (
            <div key={index} className="neon-card p-4">
              <div className="flex justify-between mb-2">
                <span className="font-medium text-white">{mission.title}</span>
                <span className="text-brand-orange">{mission.reward} TCC</span>
              </div>
              <div className="relative pt-1">
                <div className="overflow-hidden h-2 text-xs flex rounded bg-dark-lighter">
                  <div
                    style={{ width: `${mission.progress}%` }}
                    className="animate-pulse shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-brand-red to-brand-purple"
                  />
                </div>
                <span className="text-xs text-gray-400 mt-1">{mission.progress}% complete</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderCompetitions = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Current Competitions */}
      <div className="digital-screen">
        <div className="scanner-line" />
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Trophy className="w-6 h-6 text-brand-orange" />
            <h2 className="text-xl font-bold text-white">Active Competitions</h2>
          </div>
          <span className="text-sm text-brand-red">3 Live Now</span>
        </div>

        <div className="space-y-4">
          {[
            { title: 'Stand-up Showdown', entries: 24, prize: '1000 TCC', timeLeft: '2h' },
            { title: 'Meme Masters', entries: 18, prize: '500 TCC', timeLeft: '4h' }
          ].map((comp, index) => (
            <div key={index} className="neon-card p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-white">{comp.title}</h3>
                <span className="text-sm px-2 py-1 rounded-full bg-brand-orange/20 text-brand-orange">
                  {comp.timeLeft} left
                </span>
              </div>
              <div className="flex justify-between text-sm text-gray-400">
                <span>{comp.entries} CACs entered</span>
                <span>Prize: {comp.prize}</span>
              </div>
              <button className="mt-3 w-full cyber-button">
                Enter Competition
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Competitions */}
      <div className="digital-screen">
        <div className="scanner-line" />
        <div className="flex items-center space-x-2 mb-6">
          <Calendar className="w-6 h-6 text-brand-purple" />
          <h2 className="text-xl font-bold text-white">Upcoming Events</h2>
        </div>

        <div className="space-y-4">
          {[
            { title: 'Comedy Roast Battle', date: 'March 20', prize: '2000 TCC' },
            { title: 'Improv Challenge', date: 'March 22', prize: '1500 TCC' }
          ].map((event, index) => (
            <div key={index} className="neon-card p-4">
              <h3 className="font-semibold text-white">{event.title}</h3>
              <div className="flex justify-between text-sm text-gray-400 mt-2">
                <span>{event.date}</span>
                <span>Prize: {event.prize}</span>
              </div>
              <button className="mt-3 w-full cyber-button">
                Set Reminder
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderLeaderboards = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Top CACs */}
      <div className="digital-screen">
        <div className="scanner-line" />
        <div className="flex items-center space-x-2 mb-6">
          <Star className="w-6 h-6 text-brand-orange" />
          <h2 className="text-xl font-bold text-white">Top CACs</h2>
        </div>

        <div className="space-y-4">
          {[
            { name: 'JokeMaster3000', level: 'Rising Star', score: '2.5k' },
            { name: 'ComedyQueen', level: 'Legend', score: '2.1k' },
            { name: 'LaughTracker', level: 'Pro', score: '1.8k' }
          ].map((cac, index) => (
            <div key={index} className="neon-card p-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-medium text-white">{cac.name}</span>
                  <span className="text-sm text-brand-purple block">{cac.level}</span>
                </div>
                <span className="text-brand-orange font-medium">{cac.score}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Social Media Stars */}
      <div className="digital-screen">
        <div className="scanner-line" />
        <div className="flex items-center space-x-2 mb-6">
          <Rocket className="w-6 h-6 text-brand-cyan" />
          <h2 className="text-xl font-bold text-white">Social Stars</h2>
        </div>

        <div className="space-y-4">
          {[
            { name: 'MemeKing', engagement: '5.2k', streak: '7 days' },
            { name: 'TweetMaster', engagement: '4.8k', streak: '5 days' },
            { name: 'ViralVixen', engagement: '4.3k', streak: '3 days' }
          ].map((star, index) => (
            <div key={index} className="neon-card p-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-medium text-white">{star.name}</span>
                  <span className="text-sm text-brand-cyan block">Streak: {star.streak}</span>
                </div>
                <span className="text-brand-cyan font-medium">{star.engagement}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reputation Leaders */}
      <div className="digital-screen">
        <div className="scanner-line" />
        <div className="flex items-center space-x-2 mb-6">
          <Award className="w-6 h-6 text-brand-purple" />
          <h2 className="text-xl font-bold text-white">Top Reputation</h2>
        </div>

        <div className="space-y-4">
          {[
            { name: 'HumorMaster', rep: '98.5%', badge: 'Elite' },
            { name: 'JestKing', rep: '97.2%', badge: 'Master' },
            { name: 'LaughLord', rep: '96.8%', badge: 'Expert' }
          ].map((leader, index) => (
            <div key={index} className="neon-card p-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-medium text-white">{leader.name}</span>
                  <span className="text-sm text-brand-purple block">{leader.badge}</span>
                </div>
                <span className="text-brand-purple font-medium">{leader.rep}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Explore Comedy</h1>
        <div className="flex space-x-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-all ${
                  activeTab === tab.id
                    ? 'bg-brand-red text-white'
                    : 'bg-dark-card text-gray-400 hover:text-brand-red hover:bg-dark-lighter'
                }`}
              >
                <Icon className="w-5 h-5" />
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
        >
          {activeTab === 'challenges' && renderChallenges()}
          {activeTab === 'competitions' && renderCompetitions()}
          {activeTab === 'leaderboards' && renderLeaderboards()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}