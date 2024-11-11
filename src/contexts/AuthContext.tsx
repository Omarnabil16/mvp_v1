import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { doc, getDoc, setDoc, collection, getDocs, updateDoc, query, where } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useSolana } from './SolanaContext';

export type UserRole = 'admin' | 'member';

interface UserProfile {
  userId: string;
  wallet: string;
  username: string | null;
  avatar: string | null;
  isProfileComplete: boolean;
  role: UserRole;
  createdAt: number;
}

interface AuthContextType {
  userProfile: UserProfile | null;
  isLoading: boolean;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
  checkProfileCompletion: () => boolean;
  isAdmin: boolean;
  getAllUsers: () => Promise<UserProfile[]>;
  updateUserRole: (userId: string, newRole: UserRole) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const { publicKey } = useSolana();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const loadUserProfile = async () => {
      if (!publicKey) {
        setUserProfile(null);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const walletAddress = publicKey.toString();
        const userDoc = await getDoc(doc(db, 'users', walletAddress));

        if (userDoc.exists()) {
          const userData = userDoc.data() as UserProfile;
          setUserProfile(userData);

          // Redirect to profile setup if incomplete and not already there
          if (!userData.isProfileComplete && location.pathname !== '/profile') {
            navigate('/profile');
          }
        } else {
          // Create new user profile
          const newProfile: UserProfile = {
            userId: walletAddress,
            wallet: walletAddress,
            username: null,
            avatar: null,
            isProfileComplete: false,
            role: 'member',
            createdAt: Date.now()
          };

          await setDoc(doc(db, 'users', walletAddress), newProfile);
          setUserProfile(newProfile);
          navigate('/profile'); // Redirect to profile setup
        }
      } catch (error) {
        console.error('Error loading user profile:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserProfile();
  }, [publicKey, navigate, location.pathname]);

  const updateProfile = async (data: Partial<UserProfile>) => {
    if (!userProfile?.wallet) return;

    try {
      const updatedProfile = {
        ...userProfile,
        ...data,
        isProfileComplete: checkProfileCompletion({ ...userProfile, ...data })
      };

      await setDoc(doc(db, 'users', userProfile.wallet), updatedProfile);
      setUserProfile(updatedProfile);

      // If profile is now complete and we're on the profile page, redirect to dashboard
      if (updatedProfile.isProfileComplete && location.pathname === '/profile') {
        navigate('/');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  };

  const checkProfileCompletion = (profile: Partial<UserProfile> = userProfile): boolean => {
    return !!(profile?.username && profile?.avatar);
  };

  const getAllUsers = async (): Promise<UserProfile[]> => {
    try {
      const usersRef = collection(db, 'users');
      const usersSnapshot = await getDocs(usersRef);
      return usersSnapshot.docs.map(doc => ({
        ...doc.data(),
        userId: doc.id
      })) as UserProfile[];
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  };

  const updateUserRole = async (userId: string, newRole: UserRole) => {
    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, { role: newRole });
      
      // Update local state if this is the current user
      if (userProfile?.userId === userId) {
        setUserProfile(prev => prev ? { ...prev, role: newRole } : null);
      }
    } catch (error) {
      console.error('Error updating user role:', error);
      throw error;
    }
  };

  const value = {
    userProfile,
    isLoading,
    updateProfile,
    checkProfileCompletion,
    isAdmin: userProfile?.role === 'admin',
    getAllUsers,
    updateUserRole
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-brand-red border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-white">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}