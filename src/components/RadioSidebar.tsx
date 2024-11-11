import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, ChevronRight, Play, Pause, 
  Volume2, Radio, Users, Clock
} from 'lucide-react';

export default function RadioSidebar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="absolute -left-12 top-1/2 -translate-y-1/2 bg-brand-red p-3 rounded-l-lg text-white hover:bg-brand-red/90 transition-colors"
      >
        {isExpanded ? <ChevronRight className="w-6 h-6" /> : <ChevronLeft className="w-6 h-6" />}
        {!isExpanded && (
          <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-2 h-2 bg-brand-cyan rounded-full animate-ping" />
        )}
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ x: 400 }}
            animate={{ x: 0 }}
            exit={{ x: 400 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="w-96 bg-dark-lighter backdrop-blur-lg bg-opacity-95 p-6 rounded-l-xl shadow-2xl border-l border-t border-b border-brand-red/20"
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
                  <Radio className="w-6 h-6 text-brand-red" />
                  <span>What's Happening</span>
                </h2>
                <div className="px-3 py-1 rounded-full bg-brand-red/20 text-brand-red text-sm">
                  <span className="animate-pulse">● </span>
                  Live
                </div>
              </div>

              {/* Now Playing */}
              <div className="neon-card p-4">
                <h3 className="text-lg font-bold text-white mb-2">Tech Comedy Hour</h3>
                <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4" />
                    <span>1.2k listening</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>45:20</span>
                  </div>
                </div>

                {/* Audio Controls */}
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-12 h-12 rounded-full bg-brand-red flex items-center justify-center text-white hover:bg-brand-red/90 transition-colors"
                  >
                    {isPlaying ? (
                      <Pause className="w-6 h-6" />
                    ) : (
                      <Play className="w-6 h-6" />
                    )}
                  </button>
                  <div className="flex-1">
                    <div className="h-1 bg-dark-card rounded-full overflow-hidden">
                      <div className="h-full w-2/3 bg-gradient-to-r from-brand-red to-brand-purple" />
                    </div>
                  </div>
                  <Volume2 className="w-6 h-6 text-brand-red" />
                </div>
              </div>

              {/* Upcoming Shows */}
              <div>
                <h3 className="text-lg font-bold text-white mb-3">Coming Up Next</h3>
                <div className="space-y-3">
                  {[
                    { time: '21:00', show: 'Meme Review Live', viewers: '856' },
                    { time: '22:00', show: 'Crypto Comedy Night', viewers: '1.1k' }
                  ].map((show, index) => (
                    <div key={index} className="neon-card p-3 flex items-center justify-between">
                      <div>
                        <div className="text-white font-medium">{show.show}</div>
                        <div className="text-sm text-gray-400">{show.time} UTC</div>
                      </div>
                      <div className="flex items-center space-x-1 text-brand-cyan text-sm">
                        <Users className="w-4 h-4" />
                        <span>{show.viewers}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}