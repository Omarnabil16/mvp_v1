import React, { useState } from 'react';
import { Send, Sparkles, ThumbsUp, ThumbsDown, Save } from 'lucide-react';

export default function CACPlayground() {
  const [prompt, setPrompt] = useState('');
  const [selectedScenario, setSelectedScenario] = useState('');

  const scenarios = [
    { id: 'heckler', name: 'Respond to Heckler', prompt: 'Handle a tough crowd member' },
    { id: 'current', name: 'Current Events', prompt: 'Comment on latest tech news' },
    { id: 'roast', name: 'Friendly Roast', prompt: 'Playfully roast a fellow comedian' }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Testing Area */}
      <div className="bg-white rounded-lg shadow-xl p-6 card-hover">
        <h2 className="text-xl font-bold mb-6">Test Your CAC</h2>
        
        <div className="space-y-4">
          <div className="bg-gray-50 rounded-lg p-4 min-h-[200px]">
            {/* Response Area */}
            <p className="text-gray-600">
              Your CAC's responses will appear here...
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Type a prompt for your CAC..."
              className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
            <button className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Scenarios and Settings */}
      <div className="space-y-6">
        {/* Preset Scenarios */}
        <div className="bg-white rounded-lg shadow-xl p-6 card-hover">
          <h2 className="text-xl font-bold mb-4">Preset Scenarios</h2>
          <div className="space-y-3">
            {scenarios.map((scenario) => (
              <button
                key={scenario.id}
                onClick={() => setSelectedScenario(scenario.id)}
                className={`w-full p-3 rounded-lg text-left transition-all ${
                  selectedScenario === scenario.id
                    ? 'bg-red-50 border-2 border-red-500'
                    : 'border-2 border-gray-100 hover:border-red-200'
                }`}
              >
                <div className="font-medium">{scenario.name}</div>
                <div className="text-sm text-gray-600">{scenario.prompt}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-xl p-6 card-hover">
          <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <button className="w-full bg-red-50 text-red-600 py-2 rounded-lg hover:bg-red-100 transition-colors flex items-center justify-center space-x-2">
              <Save className="w-5 h-5" />
              <span>Save Changes</span>
            </button>
            <button className="w-full bg-gradient-to-r from-red-600 to-rose-600 text-white py-2 rounded-lg hover:from-red-700 hover:to-rose-700 transition-all">
              Deploy to Telegram
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}