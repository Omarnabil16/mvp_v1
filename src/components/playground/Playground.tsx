import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, Plus, User } from 'lucide-react';
import { nanoid } from 'nanoid';
import { chatWithCAC } from '../../lib/groq';
import type { CAC, Message } from '../../types/cac';
import CACCreation from './CACCreation';

export default function Playground() {
  const [selectedCAC, setSelectedCAC] = useState<CAC | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showCACCreation, setShowCACCreation] = useState(false);
  const [userCACs, setUserCACs] = useState<CAC[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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

    try {
      const conversationHistory = messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      const response = await chatWithCAC(
        selectedCAC.systemPrompt,
        inputMessage,
        conversationHistory
      );

      const assistantMessage: Message = {
        id: nanoid(),
        role: 'assistant',
        content: response,
        timestamp: Date.now()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error chatting with CAC:', error);
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

  const handleCACCreated = (newCAC: CAC) => {
    setUserCACs(prev => [...prev, newCAC]);
    setShowCACCreation(false);
    setSelectedCAC(newCAC);
    setMessages([{
      id: nanoid(),
      role: 'assistant',
      content: `Hi! I'm ${newCAC.name}. ${newCAC.description} Let's chat!`,
      timestamp: Date.now()
    }]);
  };

  return (
    <div className="min-h-screen bg-pattern">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* CAC Selection Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="digital-screen">
              <div className="scanner-line" />
              <h2 className="text-xl font-bold text-white mb-6">Your CACs</h2>
              
              <div className="space-y-4">
                {userCACs.length === 0 ? (
                  <div className="text-center py-8 text-gray-400">
                    <MessageSquare className="w-12 h-12 mx-auto mb-4 text-brand-red" />
                    <p>No CACs created yet.</p>
                    <p className="text-sm">Create your first CAC to start chatting!</p>
                  </div>
                ) : (
                  userCACs.map((cac) => (
                    <motion.div
                      key={cac.id}
                      layoutId={`cac-${cac.id}`}
                      onClick={() => setSelectedCAC(cac)}
                      className={`neon-card p-4 cursor-pointer transition-all ${
                        selectedCAC?.id === cac.id ? 'ring-2 ring-brand-red' : ''
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-full overflow-hidden">
                          <img
                            src={cac.avatar}
                            alt={cac.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-medium text-white">{cac.name}</h3>
                          <p className="text-sm text-gray-400">{cac.personality}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}

                <button
                  onClick={() => setShowCACCreation(true)}
                  className="w-full cyber-button flex items-center justify-center space-x-2"
                >
                  <Plus className="w-5 h-5" />
                  <span>Create New CAC</span>
                </button>
              </div>
            </div>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-8">
            <div className="digital-screen" style={{ minHeight: '600px' }}>
              <div className="scanner-line" />
              
              {selectedCAC ? (
                <>
                  {/* CAC Info */}
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                      <img
                        src={selectedCAC.avatar}
                        alt={selectedCAC.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white">{selectedCAC.name}</h2>
                      <p className="text-sm text-gray-400">{selectedCAC.description}</p>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="space-y-4 mb-6 max-h-[400px] overflow-y-auto custom-scrollbar">
                    <AnimatePresence mode="popLayout">
                      {messages.map((message) => (
                        <motion.div
                          key={message.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className={`flex ${
                            message.role === 'user' ? 'justify-end' : 'justify-start'
                          } items-start space-x-2`}
                        >
                          {message.role === 'assistant' && (
                            <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                              <img
                                src={selectedCAC.avatar}
                                alt={selectedCAC.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                          <div
                            className={`max-w-[80%] rounded-lg p-4 ${
                              message.role === 'user'
                                ? 'bg-brand-red text-white ml-auto'
                                : 'bg-dark-card text-white'
                            }`}
                          >
                            {message.content}
                          </div>
                          {message.role === 'user' && (
                            <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 bg-brand-purple">
                              <User className="w-full h-full p-1.5 text-white" />
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </AnimatePresence>
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Input Area */}
                  <div className="flex items-center space-x-4">
                    <textarea
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type your message..."
                      className="flex-1 bg-dark-card/50 border border-brand-red/30 rounded-lg p-4 text-white placeholder-gray-400 focus:border-brand-red focus:ring-1 focus:ring-brand-red resize-none"
                      rows={2}
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={isLoading || !inputMessage.trim()}
                      className="p-4 bg-brand-red text-white rounded-lg hover:bg-brand-red/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="w-6 h-6" />
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-[600px] text-center">
                  <MessageSquare className="w-16 h-16 text-brand-red mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">Select a CAC to Start Chatting</h3>
                  <p className="text-gray-400">Choose from your created CACs or create a new one!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* CAC Creation Modal */}
      <AnimatePresence>
        {showCACCreation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-2xl mx-4"
            >
              <CACCreation
                onClose={() => setShowCACCreation(false)}
                onCreated={handleCACCreated}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}