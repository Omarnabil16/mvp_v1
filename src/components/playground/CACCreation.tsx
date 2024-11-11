import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Upload, X, Sparkles, User } from 'lucide-react';
import { nanoid } from 'nanoid';
import { chatWithHacksan, generateSystemPrompt } from '../../lib/groq';
import { useAuth } from '../../contexts/AuthContext';
import { cacService } from '../../services/cacService';
import { storageService } from '../../services/storageService';
import type { Message } from '../../types/cac';

interface CACCreationProps {
  onClose: () => void;
  onCreated: (cac: any) => void;
}

export default function CACCreation({ onClose, onCreated }: CACCreationProps) {
  const { userProfile } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [cacData, setCAcData] = useState({
    name: '',
    avatar: '',
    type: '',
    personality: '',
    story: '',
    humorStyle: ''
  });
  const [currentStep, setCurrentStep] = useState('name');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const initializeChat = async () => {
      const initialMessage: Message = {
        id: nanoid(),
        role: 'assistant',
        content: "Hey there! I'm Hacksan Minaj, the Comedy Cult Manager. As the manager, it's my job to help you create an amazing Comedy AI Character (CAC). Let's start with a name - what should we call your CAC?",
        timestamp: Date.now()
      };
      setMessages([initialMessage]);
    };

    initializeChat();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !userProfile?.userId) return;

    setIsLoading(true);
    try {
      const downloadURL = await storageService.uploadCACPhoto(userProfile.userId, nanoid(), file);
      setCAcData(prev => ({ ...prev, avatar: downloadURL }));
      
      const response: Message = {
        id: nanoid(),
        role: 'assistant',
        content: "Perfect photo! Now, tell me what type of character they are (e.g., Stand-up Comedian, Tech Influencer, Ex-politician) and their key personality traits (e.g., sarcastic, witty, energetic)?",
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, response]);
      setCurrentStep('type');
    } catch (error) {
      console.error('Error uploading avatar:', error);
      const errorMessage: Message = {
        id: nanoid(),
        role: 'assistant',
        content: "Oops! Had trouble with that image. Could you try another one?",
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

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
      let response = '';

      switch (currentStep) {
        case 'name':
          const isAvailable = await cacService.checkNameAvailability(inputMessage);
          if (!isAvailable) {
            response = `That name is already taken! How about trying something else?`;
          } else {
            setCAcData(prev => ({ ...prev, name: inputMessage }));
            response = `"${inputMessage}" - I like it! Now, let's give them a face. Upload a photo for your CAC's avatar.`;
            setCurrentStep('avatar');
          }
          break;

        case 'type':
          setCAcData(prev => ({ ...prev, type: inputMessage }));
          response = "Great choice! Now, what's their story? Give me a brief background that makes them unique.";
          setCurrentStep('story');
          break;

        case 'story':
          setCAcData(prev => ({ ...prev, story: inputMessage }));
          response = "That's a fascinating backstory! Finally, what's their style of humor? Are they sarcastic, observational, absurdist?";
          setCurrentStep('humor');
          break;

        case 'humor':
          setCAcData(prev => ({ ...prev, humorStyle: inputMessage }));
          response = "Perfect! I've got everything I need. Type 'create' when you're ready to bring your CAC to life!";
          setCurrentStep('confirm');
          break;

        case 'confirm':
          if (inputMessage.toLowerCase() === 'create') {
            await handleCreateCAC();
            return;
          } else {
            response = "Just type 'create' when you're ready!";
          }
          break;

        default:
          response = await chatWithHacksan(inputMessage, { step: currentStep });
      }

      const assistantMessage: Message = {
        id: nanoid(),
        role: 'assistant',
        content: response,
        timestamp: Date.now()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error in chat:', error);
      const errorMessage: Message = {
        id: nanoid(),
        role: 'assistant',
        content: "I'm having trouble right now. Could you try again?",
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateCAC = async () => {
    if (!userProfile?.userId || !cacData.name || !cacData.avatar || !cacData.type) return;

    setIsLoading(true);
    try {
      // Generate a personalized system prompt based on CAC data
      const systemPrompt = await generateSystemPrompt(
        cacData.name,
        cacData.type,
        cacData.story,
        cacData.humorStyle
      );

      const newCAC = {
        ...cacData,
        systemPrompt,
        createdBy: userProfile.userId,
        isPublic: false,
        createdAt: Date.now()
      };

      const cacId = await cacService.createCAC(newCAC);
      onCreated({ id: cacId, ...newCAC });

      const successMessage: Message = {
        id: nanoid(),
        role: 'assistant',
        content: "Your CAC has been created! You'll find them ready for chat in the Playground tab.",
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, successMessage]);
    } catch (error) {
      console.error('Error creating CAC:', error);
      const errorMessage: Message = {
        id: nanoid(),
        role: 'assistant',
        content: "Sorry, I couldn't create the CAC. Please try again.",
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, errorMessage]);
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
    <div className="digital-screen max-h-[80vh] flex flex-col">
      <div className="scanner-line" />
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-brand-red/50 animate-pulse">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/thecomedycult-6cc85.firebasestorage.app/o/profiles%2F4h1cGgY1JNPEjJLb2EMadxF5rV2HiudWJgdMkePjLpJi%2FLeonardo_Phoenix_Create_a_cartoon_profile_picture_of_a_charact_1.jpg?alt=media&token=088f5953-4f26-4bbf-94d3-69c2c81c8fa4"
              alt="Hacksan Minaj"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-xl font-bold text-white">Create with Hacksan</h2>
        </div>
        <button 
          onClick={onClose} 
          className="p-2 hover:bg-dark-card rounded-lg transition-colors group"
        >
          <X className="w-6 h-6 text-gray-400 group-hover:text-brand-red transition-colors" />
        </button>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-6 custom-scrollbar">
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
                <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-brand-red/30">
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/thecomedycult-6cc85.firebasestorage.app/o/profiles%2F4h1cGgY1JNPEjJLb2EMadxF5rV2HiudWJgdMkePjLpJi%2FLeonardo_Phoenix_Create_a_cartoon_profile_picture_of_a_charact_1.jpg?alt=media&token=088f5953-4f26-4bbf-94d3-69c2c81c8fa4"
                    alt="Hacksan Minaj"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                className={`max-w-[80%] rounded-lg p-4 ${
                  message.role === 'user'
                    ? 'bg-brand-red text-white ml-auto'
                    : 'bg-dark-card text-white'
                }`}
              >
                {message.content}
              </motion.div>
              {message.role === 'user' && (
                <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 bg-brand-purple ring-2 ring-brand-purple/30">
                  <User className="w-full h-full p-1.5 text-white" />
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* File Input (Hidden) */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Input Area */}
      <div className="flex items-center space-x-4">
        {currentStep === 'avatar' && (
          <button
            onClick={() => fileInputRef.current?.click()}
            className="p-3 bg-brand-purple text-white rounded-lg hover:bg-brand-purple/90 transition-colors group"
          >
            <Upload className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </button>
        )}
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          className="flex-1 bg-dark-card/50 border border-brand-red/30 rounded-lg p-4 text-white placeholder-gray-400 focus:border-brand-red focus:ring-1 focus:ring-brand-red"
        />
        <button
          onClick={handleSendMessage}
          disabled={isLoading || !inputMessage.trim()}
          className="p-4 bg-brand-red text-white rounded-lg hover:bg-brand-red/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed group"
        >
          <Send className="w-5 h-5 group-hover:scale-110 transition-transform" />
        </button>
      </div>
    </div>
  );
}