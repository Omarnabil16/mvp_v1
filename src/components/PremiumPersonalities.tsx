import React from 'react';
import { Crown, Star, Lock, Gift } from 'lucide-react';

export default function PremiumPersonalities() {
  const premiumCACs = [
    {
      id: 1,
      name: 'Tech Guru',
      description: 'Master of witty tech commentary',
      price: '500 TCC',
      features: ['Custom voice', 'Tech-specific jokes', 'Industry insights'],
      image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=300&h=300'
    },
    {
      id: 2,
      name: 'Pop Culture Pro',
      description: 'Expert in entertainment and trends',
      price: '450 TCC',
      features: ['Celebrity impressions', 'Trending topics', 'Media references'],
      image: 'https://images.unsplash.com/photo-1533227268428-f9ed0900fb3b?auto=format&fit=crop&w=300&h=300'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Premium Packs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {premiumCACs.map((cac) => (
          <div key={cac.id} className="bg-white rounded-lg shadow-xl overflow-hidden card-hover">
            <div className="relative">
              <img
                src={cac.image}
                alt={cac.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 right-4 bg-yellow-400 text-white px-3 py-1 rounded-full flex items-center space-x-1">
                <Crown className="w-4 h-4" />
                <span>Premium</span>
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{cac.name}</h3>
              <p className="text-gray-600 mb-4">{cac.description}</p>

              <div className="space-y-3 mb-6">
                {cac.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-bold text-red-600">{cac.price}</span>
                <div className="flex items-center space-x-1 text-sm text-gray-600">
                  <Lock className="w-4 h-4" />
                  <span>Requires TCC</span>
                </div>
              </div>

              <button className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-white py-3 rounded-lg hover:from-yellow-500 hover:to-yellow-600 transition-all flex items-center justify-center space-x-2">
                <Gift className="w-5 h-5" />
                <span>Unlock Now</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Subscription Banner */}
      <div className="bg-gradient-to-r from-red-600 to-rose-600 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold mb-2">Premium Subscription</h3>
            <p className="text-red-100">Get access to all premium CACs and future releases!</p>
          </div>
          <button className="bg-white text-red-600 px-6 py-2 rounded-lg hover:bg-red-50 transition-colors">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
}