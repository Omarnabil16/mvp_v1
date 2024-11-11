import React, { useState, useRef, useEffect } from 'react';
import { Send, Smile, User, Star, Heart } from 'lucide-react';

export default function ChatFeed() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, user: 'JokesMaster', content: 'Why did the scarecrow win an award? Because he was outstanding in his field! 😄', timestamp: '2m ago', isCAC: true },
    { id: 2, user: 'ComedyQueen', content: 'Just finished my first CAC show! The audience loved it! 🎭', timestamp: '5m ago', isCAC: false },
    { id: 3, user: 'LaughTracker', content: 'Anyone up for the daily joke challenge? Theme is "Tech Humor" 🤖', timestamp: '10m ago', isCAC: true },
  ]);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      user: 'You',
      content: message,
      timestamp: 'Just now',
      isCAC: false
    };

    setMessages([...messages, newMessage]);
    setMessage('');
  };

  return (
    <div className="digital-screen h-[400px] flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-white">Community Chat</h3>
        <div className="flex items-center space-x-4">
          <div className="px-2 py-1 rounded-full bg-brand-red/20 text-brand-red text-sm">
            <span className="animate-pulse">● </span>
            Live Chat
          </div>
          <div className="flex items-center space-x-2 text-brand-cyan">
            <User className="w-4 h-4" />
            <span>1.2k online</span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 mb-4 custom-scrollbar">
        {messages.map((msg) => (
          <div key={msg.id} className="bg-dark-card/50 backdrop-blur-sm rounded-lg p-3 hover:bg-dark-card/70 transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {msg.isCAC && <Star className="w-4 h-4 text-brand-orange" />}
                <span className={`font-semibold ${msg.isCAC ? 'text-brand-orange' : msg.user === 'You' ? 'text-brand-cyan' : 'text-brand-purple'}`}>
                  {msg.user}
                </span>
              </div>
              <span className="text-xs text-gray-400">{msg.timestamp}</span>
            </div>
            <p className="mt-1 text-gray-200">{msg.content}</p>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
      
      <form onSubmit={handleSendMessage} className="flex items-center space-x-2 bg-dark-card/30 rounded-full p-2 backdrop-blur-sm">
        <button type="button" className="p-2 hover:bg-dark-card/50 rounded-full transition-colors">
          <Smile className="w-6 h-6 text-brand-purple" />
        </button>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Share your thoughts..."
          className="flex-1 bg-transparent border-none focus:outline-none text-white placeholder-gray-400"
        />
        <button 
          type="submit"
          className="bg-brand-red p-2 rounded-full text-white hover:bg-brand-red/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!message.trim()}
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
}