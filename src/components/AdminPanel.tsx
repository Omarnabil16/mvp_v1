import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, User, Loader, AlertCircle, 
  Users, Brain, Settings, Globe, Lock
} from 'lucide-react';
import { useAuth, UserRole } from '../contexts/AuthContext';
import { db } from '../lib/firebase';
import { collection, query, getDocs, updateDoc, doc } from 'firebase/firestore';
import type { CAC } from '../types/cac';

type Tab = 'users' | 'cacs';

export default function AdminPanel() {
  const { getAllUsers, updateUserRole, userProfile } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>('users');
  const [users, setUsers] = useState<any[]>([]);
  const [cacs, setCACs] = useState<CAC[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingUser, setUpdatingUser] = useState<string | null>(null);
  const [updatingCAC, setUpdatingCAC] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, [activeTab]);

  const loadData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      if (activeTab === 'users') {
        const allUsers = await getAllUsers();
        setUsers(allUsers);
      } else {
        await loadCACs();
      }
    } catch (error) {
      setError(`Failed to load ${activeTab}`);
    } finally {
      setIsLoading(false);
    }
  };

  const loadCACs = async () => {
    const cacsRef = collection(db, 'cacs');
    const snapshot = await getDocs(cacsRef);
    const cacsList = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as CAC[];
    setCACs(cacsList);
  };

  const handleRoleChange = async (userId: string, currentRole: UserRole) => {
    setUpdatingUser(userId);
    setError(null);

    try {
      const newRole: UserRole = currentRole === 'admin' ? 'member' : 'admin';
      await updateUserRole(userId, newRole);
      setUsers(users.map(user => 
        user.userId === userId ? { ...user, role: newRole } : user
      ));
    } catch (error) {
      setError('Failed to update user role');
    } finally {
      setUpdatingUser(null);
    }
  };

  const toggleCACVisibility = async (cacId: string, isPublic: boolean) => {
    setUpdatingCAC(cacId);
    setError(null);

    try {
      await updateDoc(doc(db, 'cacs', cacId), { isPublic: !isPublic });
      setCACs(cacs.map(cac => 
        cac.id === cacId ? { ...cac, isPublic: !isPublic } : cac
      ));
    } catch (error) {
      setError('Failed to update CAC visibility');
    } finally {
      setUpdatingCAC(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader className="w-8 h-8 text-brand-red animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Tabs */}
      <div className="flex space-x-4">
        <button
          onClick={() => setActiveTab('users')}
          className={`px-6 py-3 rounded-lg flex items-center space-x-2 transition-all ${
            activeTab === 'users'
              ? 'bg-brand-red text-white'
              : 'bg-dark-card text-gray-400 hover:text-brand-red'
          }`}
        >
          <Users className="w-5 h-5" />
          <span>Users</span>
        </button>
        <button
          onClick={() => setActiveTab('cacs')}
          className={`px-6 py-3 rounded-lg flex items-center space-x-2 transition-all ${
            activeTab === 'cacs'
              ? 'bg-brand-red text-white'
              : 'bg-dark-card text-gray-400 hover:text-brand-red'
          }`}
        >
          <Brain className="w-5 h-5" />
          <span>CACs</span>
        </button>
      </div>

      <div className="digital-screen">
        <div className="scanner-line" />
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            {activeTab === 'users' ? (
              <>
                <Shield className="w-8 h-8 text-brand-red" />
                <h2 className="text-2xl font-bold text-white">User Management</h2>
              </>
            ) : (
              <>
                <Brain className="w-8 h-8 text-brand-red" />
                <h2 className="text-2xl font-bold text-white">CAC Management</h2>
              </>
            )}
          </div>
          <div className="px-3 py-1 rounded-full bg-brand-red/20 text-brand-red text-sm">
            {activeTab === 'users' ? `${users.length} Users` : `${cacs.length} CACs`}
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-brand-red/20 border border-brand-red/30 rounded-lg flex items-center space-x-2 text-brand-red">
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        )}

        <AnimatePresence mode="wait">
          {activeTab === 'users' ? (
            <motion.div
              key="users"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              {users.map((user) => (
                <div key={user.userId} className="neon-card p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden">
                        {user.avatar ? (
                          <img
                            src={user.avatar}
                            alt={user.username}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-brand-purple flex items-center justify-center">
                            <User className="w-6 h-6 text-white" />
                          </div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium text-white">
                          {user.username || 'Anonymous'}
                          {user.userId === userProfile?.userId && (
                            <span className="ml-2 text-sm text-brand-cyan">(You)</span>
                          )}
                        </h3>
                        <p className="text-sm text-gray-400">
                          {user.wallet.slice(0, 4)}...{user.wallet.slice(-4)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        user.role === 'admin'
                          ? 'bg-brand-red/20 text-brand-red'
                          : 'bg-brand-purple/20 text-brand-purple'
                      }`}>
                        {user.role}
                      </span>
                      
                      {user.userId !== userProfile?.userId && (
                        <button
                          onClick={() => handleRoleChange(user.userId, user.role)}
                          disabled={updatingUser === user.userId}
                          className="cyber-button"
                        >
                          {updatingUser === user.userId ? (
                            <Loader className="w-5 h-5 animate-spin" />
                          ) : (
                            <>
                              <Shield className="w-5 h-5" />
                              <span>Change Role</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="cacs"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              {cacs.map((cac) => (
                <div key={cac.id} className="neon-card p-4">
                  <div className="flex items-center justify-between">
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

                    <div className="flex items-center space-x-4">
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        cac.isPublic
                          ? 'bg-brand-cyan/20 text-brand-cyan'
                          : 'bg-brand-purple/20 text-brand-purple'
                      }`}>
                        {cac.isPublic ? 'Public' : 'Private'}
                      </span>
                      
                      <button
                        onClick={() => toggleCACVisibility(cac.id, cac.isPublic)}
                        disabled={updatingCAC === cac.id}
                        className="cyber-button"
                      >
                        {updatingCAC === cac.id ? (
                          <Loader className="w-5 h-5 animate-spin" />
                        ) : cac.isPublic ? (
                          <>
                            <Lock className="w-5 h-5" />
                            <span>Make Private</span>
                          </>
                        ) : (
                          <>
                            <Globe className="w-5 h-5" />
                            <span>Make Public</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}