import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ShoppingBag, Star, Gift, Crown, Filter, Search, 
  Package, Truck, Tag, Radio, ArrowRight
} from 'lucide-react';

export default function MerchStore() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Items', icon: Package },
    { id: 'apparel', name: 'Apparel', icon: Tag },
    { id: 'collectibles', name: 'Collectibles', icon: Gift },
    { id: 'digital', name: 'Digital Items', icon: Star }
  ];

  const products = [
    {
      id: 1,
      name: "Comedy Cult Premium Hoodie",
      price: "150 TCC",
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=300&h=300",
      rating: 4.8,
      category: 'apparel',
      exclusive: true
    },
    {
      id: 2,
      name: "Limited Edition CAC Sticker Pack",
      price: "30 TCC",
      image: "https://images.unsplash.com/photo-1572375992501-4b0892d50c69?auto=format&fit=crop&w=300&h=300",
      rating: 4.5,
      category: 'collectibles',
      exclusive: false
    },
    {
      id: 3,
      name: "Digital Profile Badge Bundle",
      price: "50 TCC",
      image: "https://images.unsplash.com/photo-1526379879527-8559ecfcaec0?auto=format&fit=crop&w=300&h=300",
      rating: 4.7,
      category: 'digital',
      exclusive: true
    }
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  return (
    <div className="space-y-8">
      {/* Header with Stats */}
      <div className="digital-screen">
        <div className="scanner-line" />
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-red via-brand-purple to-brand-orange">
              Comedy Merch Store
            </h1>
            <p className="text-gray-400 mt-2">Exclusive items for true comedy fans</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="px-3 py-1 rounded-full bg-brand-red/20 text-brand-red text-sm">
              <span className="animate-pulse">● </span>
              New Drops
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: 'Items Available', value: '42', icon: Package, color: 'brand-cyan' },
            { label: 'Limited Edition', value: '7', icon: Crown, color: 'brand-orange' },
            { label: 'TCC Balance', value: '1,234', icon: Gift, color: 'brand-purple' }
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="neon-card p-6 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-dark via-transparent to-dark opacity-50" />
                <div className="relative z-10">
                  <Icon className={`w-8 h-8 text-${stat.color} mb-2 transition-transform group-hover:scale-110`} />
                  <h3 className="text-3xl font-bold text-white mb-1">{stat.value}</h3>
                  <p className="text-gray-400">{stat.label}</p>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-brand-red to-transparent opacity-50 animate-pulse" />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Categories */}
      <div className="flex space-x-4">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-lg flex items-center space-x-2 transition-all ${
                selectedCategory === category.id
                  ? 'bg-brand-red text-white neon-border'
                  : 'bg-dark-card text-gray-400 hover:text-brand-red hover:bg-dark-lighter'
              }`}
            >
              <Icon className={`w-5 h-5 ${selectedCategory === category.id ? 'animate-pulse' : ''}`} />
              <span>{category.name}</span>
            </button>
          );
        })}
      </div>

      {/* Featured Banner */}
      <div className="digital-screen">
        <div className="scanner-line" />
        <div className="flex items-center justify-between p-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">TCC Holder Exclusive</h2>
            <p className="text-gray-400">Get 20% off on all premium items!</p>
          </div>
          <Crown className="w-12 h-12 text-brand-orange animate-pulse" />
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="neon-card overflow-hidden group"
          >
            <div className="relative h-48">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent" />
              {product.exclusive && (
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-brand-orange/20 text-brand-orange text-sm flex items-center space-x-1">
                  <Crown className="w-4 h-4" />
                  <span>Exclusive</span>
                </div>
              )}
            </div>
            
            <div className="p-4">
              <h3 className="text-lg font-semibold text-white mb-2">{product.name}</h3>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-brand-orange" />
                  <span className="text-brand-orange">{product.rating}</span>
                </div>
                <span className="text-brand-cyan font-medium">{product.price}</span>
              </div>
              
              <button className="w-full cyber-button flex items-center justify-center space-x-2">
                <ShoppingBag className="w-5 h-5" />
                <span>Add to Cart</span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Shopping Cart Preview */}
      <div className="fixed bottom-6 right-6">
        <button className="play-button relative">
          <ShoppingBag className="w-6 h-6 text-white" />
          <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-brand-orange flex items-center justify-center text-sm text-white">
            3
          </span>
        </button>
      </div>
    </div>
  );
}