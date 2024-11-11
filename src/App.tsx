import React, { useEffect } from 'react';
import { Home, Brain, User, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Playground from './components/Playground';
import UserProfile from './components/UserProfile';
import AdminPanel from './components/AdminPanel';
import ConnectWallet from './components/ConnectWallet';
import ProfileSetup from './components/ProfileSetup';
import DevAuthButton from './components/DevAuthButton';
import { useAuth } from './contexts/AuthContext';
import { useSolana } from './contexts/SolanaContext';

function App() {
  const { userProfile, isLoading } = useAuth();
  const { publicKey } = useSolana();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeSection, setActiveSection] = React.useState('home');

  const navItems = [
    { id: 'home', icon: Home, label: 'Home', color: 'text-brand-red' },
    { id: 'playground', icon: Brain, label: 'Playground', color: 'text-brand-purple' },
    { id: 'profile', icon: User, label: 'Profile', color: 'text-brand-orange' }
  ];

  // Add admin panel for admin users
  if (userProfile?.role === 'admin') {
    navItems.push({
      id: 'admin',
      icon: Shield,
      label: 'Admin',
      color: 'text-brand-cyan'
    });
  }

  useEffect(() => {
    if (publicKey && userProfile && !userProfile.isProfileComplete && location.pathname !== '/profile') {
      navigate('/profile');
    }
  }, [publicKey, userProfile, location.pathname, navigate]);

  const pageVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-brand-red border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-white">Loading...</p>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    if (!publicKey) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-4">Connect Your Wallet</h1>
            <p className="text-gray-400 mb-6">Connect your wallet to access the platform</p>
            <ConnectWallet />
          </div>
        </div>
      );
    }

    if (userProfile && !userProfile.isProfileComplete) {
      return <ProfileSetup />;
    }

    const Component = {
      home: Dashboard,
      playground: Playground,
      profile: UserProfile,
      admin: AdminPanel
    }[activeSection] || Dashboard;

    return (
      <motion.div
        key={activeSection}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        transition={{ duration: 0.3 }}
        className="w-full"
      >
        <Component />
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-dark text-white">
      {/* Header */}
      <header className="fixed top-0 right-0 left-20 h-16 bg-dark-lighter z-50 border-b border-dark-card px-6 flex items-center justify-between">
        <h1 className="text-xl font-bold text-brand-red">Comedy Cult</h1>
        <ConnectWallet />
      </header>

      <div className="flex">
        {/* Vertical Navbar */}
        {publicKey && userProfile?.isProfileComplete && (
          <motion.nav 
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="fixed left-0 top-0 h-screen w-20 bg-dark-lighter backdrop-blur-sm bg-opacity-80 shadow-[0_0_30px_rgba(255,51,51,0.1)] flex flex-col items-center py-6 space-y-6"
          >
            {navItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setActiveSection(item.id)}
                  className={`nav-item group relative ${
                    activeSection === item.id
                      ? 'active animate-pulse-glow'
                      : `text-gray-400 hover:${item.color}`
                  }`}
                >
                  <Icon className="w-6 h-6 relative z-10" />
                  <motion.span 
                    className="absolute left-full ml-2 px-2 py-1 bg-dark-card text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50"
                    initial={{ x: -10, opacity: 0 }}
                    whileHover={{ x: 0, opacity: 1 }}
                  >
                    {item.label}
                  </motion.span>
                </motion.button>
              );
            })}
          </motion.nav>
        )}

        {/* Main Content */}
        <main className={`flex-1 ${publicKey && userProfile?.isProfileComplete ? 'ml-20' : ''} p-6 pt-20`}>
          <div className="max-w-7xl mx-auto">
            <AnimatePresence mode="wait">
              {renderContent()}
            </AnimatePresence>
          </div>
        </main>
      </div>

      {/* Dev Auth Button */}
      <DevAuthButton />
    </div>
  );
}

export default App;