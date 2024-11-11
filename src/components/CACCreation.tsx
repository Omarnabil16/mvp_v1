import React, { useState } from 'react';
import { Sparkles, Brain, Wand2, Settings } from 'lucide-react';

export default function CACCreation() {
  const [step, setStep] = useState(1);
  const [personality, setPersonality] = useState('');

  const personalities = [
    { id: 'witty', name: 'Witty Observer', description: 'Sharp, quick-witted commentary on daily life' },
    { id: 'satirist', name: 'Social Satirist', description: 'Clever criticism of society and culture' },
    { id: 'absurdist', name: 'Absurdist', description: 'Surreal and unexpected humor' }
  ];

  return (
    <div className="bg-white rounded-lg shadow-xl p-6 card-hover">
      <div className="flex items-center space-x-2 mb-6">
        <Brain className="w-7 h-7 text-red-500 animate-pulse-glow" />
        <h2 className="text-2xl font-bold">Create Your CAC</h2>
      </div>

      <div className="space-y-6">
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Choose Personality Type</h3>
            {personalities.map((type) => (
              <div
                key={type.id}
                onClick={() => setPersonality(type.id)}
                className={`p-4 rounded-lg cursor-pointer transition-all ${
                  personality === type.id
                    ? 'bg-red-50 border-2 border-red-500'
                    : 'border-2 border-gray-100 hover:border-red-200'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Sparkles className={`w-5 h-5 ${
                    personality === type.id ? 'text-red-500' : 'text-gray-400'
                  }`} />
                  <div>
                    <h4 className="font-medium">{type.name}</h4>
                    <p className="text-sm text-gray-600">{type.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex space-x-4">
          <button
            onClick={() => setStep(step > 1 ? step - 1 : step)}
            className={`flex-1 py-2 rounded-lg transition-colors ${
              step === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-red-100 text-red-600 hover:bg-red-200'
            }`}
            disabled={step === 1}
          >
            Previous
          </button>
          <button
            onClick={() => setStep(step < 3 ? step + 1 : step)}
            className="flex-1 bg-gradient-to-r from-red-600 to-rose-600 text-white py-2 rounded-lg hover:from-red-700 hover:to-rose-700 transition-all hover-scale"
          >
            {step === 3 ? 'Create CAC' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
}