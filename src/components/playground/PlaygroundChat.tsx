import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, User, Sparkles, Crown, Star } from 'lucide-react';
import { nanoid } from 'nanoid';
import { chatWithCAC } from '../../lib/groq';
import type { CAC, Message } from '../../types/cac';

interface PlaygroundChatProps {
  userCACs: CAC[];
}

export default function PlaygroundChat({ userCACs }: PlaygroundChatProps) {
  const [selectedCAC, setSelectedCAC] = useState<CAC | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize chat when selecting a new CAC
  useEffect(() => {
    if (selectedCAC) {
      setIsTyping(true);
      setTimeout(() => {
        setMessages([{
          id: nanoid(),
          role: 'assistant',
          content: `Hi! I'm ${selectedCAC.name}. ${selectedCAC.description} Let's chat!`,
          timestamp: Date.now()
        }]);
        setIsTyping(false);
      }, 1500);
    }
  }, [selectedCAC]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !selectedCAC) return;

    const userMessage: Message = {
      id: nanoid(),
      role: 'user',
      content: inputMessage,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    setIsTyping(true);

    try {
      const conversationHistory = messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      const response = await chatWithCAC(selectedCAC, inputMessage, conversationHistory);

      setTimeout(() => {
        const assistantMessage: Message = {
          id: nanoid(),
          role: 'assistant',
          content: response,
          timestamp: Date.now()
        };
        setMessages(prev => [...prev, assistantMessage]);
        setIsTyping(false);
      }, Math.random() * 1000 + 500); // Random delay between 500-1500ms for natural feel

    } catch (error) {
      console.error('Error chatting with CAC:', error);
      
      const errorMessage: Message = {
        id: nanoid(),
        role: 'assistant',
        content: "I'm having trouble responding right now. Could you try again?",
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, errorMessage]);
      setIsTyping(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* CAC Selection */}
      <div className="lg:col-span-4">
        <div className="digital-screen">
          <div className="scanner-line" />
          <h2 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
            <Crown className="w-6 h-6 text-brand-orange" />
            <span>Your Comedy Squad</span>
          </h2>
          
          <div className="space-y-4">
            {userCACs.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <MessageSquare className="w-12 h-12 mx-auto mb-4 text-brand-red" />
                <p>No CACs available</p>
                <p className="text-sm">Create your first CAC to start chatting!</p>
              </div>
            ) : (
              userCACs.map((cac) => (
                <motion.div
                  key={cac.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`neon-card p-4 cursor-pointer transition-all ${
                    selectedCAC?.id === cac.id ? 'ring-2 ring-brand-red shadow-[0_0_15px_rgba(255,51,51,0.5)]' : ''
                  }`}
                  onClick={() => setSelectedCAC(cac)}
                >
                  <div className="flex items-center space-x-4">
                    <div className="relative w-16 h-16 group">
                      <div className="absolute inset-0 bg-gradient-to-r from-brand-red via-brand-purple to-brand-orange rounded-full opacity-75 group-hover:opacity-100 blur transition-opacity" />
                      <img
                        src={cac.avatar}
                        alt={cac.name}
                        className="relative w-full h-full rounded-full object-cover"
                      />
                      {selectedCAC?.id === cac.id && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-brand-red rounded-full animate-pulse" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium text-white flex items-center space-x-2">
                        <span>{cac.name}</span>
                        <Star className="w-4 h-4 text-brand-orange" />
                      </h3>
                      <p className="text-sm text-gray-400">{cac.type}</p>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="lg:col-span-8">
        <div className="digital-screen" style={{ minHeight: '600px' }}>
          <div className="scanner-line" />
          
          {selectedCAC ? (
            <>
              {/* Messages Area */}
              <div className="space-y-4 mb-6 h-[450px] overflow-y-auto custom-scrollbar">
                <AnimatePresence mode="popLayout">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className={`flex ${
                        message.role === 'user' ? 'justify-end' : 'justify-start'
                      } items-start space-x-3`}
                    >
                      {message.role === 'assistant' && (
                        <motion.div 
                          className="relative w-8 h-8 flex-shrink-0"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-brand-red via-brand-purple to-brand-orange rounded-full opacity-75 blur" />
                          <img
                            src={selectedCAC.avatar}
                            alt={selectedCAC.name}
                            className="relative w-full h-full rounded-full object-cover"
                          />
                        </motion.div>
                      )}
                      <motion.div
                        layout
                        className={`max-w-[80%] rounded-lg p-4 ${
                          message.role === 'user'
                            ? 'bg-brand-red text-white ml-auto'
                            : 'bg-dark-card text-white'
                        }`}
                      >
                        {message.content}
                      </motion.div>
                      {message.role === 'user' && (
                        <motion.div 
                          className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 bg-brand-purple"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                          <User className="w-full h-full p-1.5 text-white" />
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
                {isTyping && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center space-x-2 text-gray-400"
                  >
                    <div className="w-8 h-8 rounded-full overflow-hidden">
                      <img
                        src={selectedCAC.avatar}
                        alt={selectedCAC.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-brand-red rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-brand-purple rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-brand-orange rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-brand-red via-brand-purple to-brand-orange opacity-20 blur-lg" />
                <div className="relative flex items-center space-x-4">
                  <textarea
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="flex-1 bg-dark-card/50 border border-brand-red/30 rounded-lg p-4 text-white placeholder-gray-400 focus:border-brand-red focus:ring-1 focus:ring-brand-red resize-none"
                    rows={2}
                  />
                  <motion.button
                    onClick={handleSendMessage}
                    disabled={isLoading || !inputMessage.trim()}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-4 bg-brand-red text-white rounded-lg hover:bg-brand-red/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed relative group"
                  >
                    <div className="absolute inset-0 bg-brand-red rounded-lg blur opacity-50 group-hover:opacity-75 transition-opacity" />
                    <Send className="relative w-6 h-6" />
                  </motion.button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-[500px] text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
              >
                <Sparkles className="w-16 h-16 text-brand-red mb-4" />
              </motion.div>
              <h3 className="text-xl font-bold text-white mb-2">Select a CAC to Start Chatting</h3>
              <p className="text-gray-400">Choose from your created CACs or create a new one!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}