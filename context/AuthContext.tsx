import React, { createContext, useContext, ReactNode, useEffect, useState } from 'react';
import { useUser, useClerk } from '@clerk/clerk-react';
import { User } from '../types';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface AuthContextType {
  user: User | null;
  login: (email: string, role?: 'user' | 'admin') => void;
  register: (name: string, email: string) => void;
  logout: () => void;
  subscribe: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL || 'ianmuriithiflowerz@gmail.com';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user: clerkUser, isLoaded } = useUser();
  const { signOut } = useClerk();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Sync Clerk user with Firestore
  useEffect(() => {
    const syncUser = async () => {
      if (!isLoaded) {
        setLoading(true);
        return;
      }

      if (!clerkUser) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const userId = clerkUser.id;
        const userEmail = clerkUser.primaryEmailAddress?.emailAddress || '';
        const isAdmin = userEmail === ADMIN_EMAIL;

        // Get user data from Firestore
        const userRef = doc(db, 'users', userId);
        const userSnap = await getDoc(userRef);

        let userData: User;

        if (userSnap.exists()) {
          // User exists in Firestore
          const firestoreData = userSnap.data();

          // Check subscription status
          const subscriptionRef = doc(db, 'subscriptions', userId);
          const subscriptionSnap = await getDoc(subscriptionRef);

          let isSubscriber = isAdmin; // Admins always have access
          let subscriptionPlan: 'weekly' | 'monthly' | '3months' | '6months' | 'yearly' | undefined;
          let subscriptionExpiry: string | undefined;

          if (subscriptionSnap.exists()) {
            const subData = subscriptionSnap.data();
            if (subData.status === 'active' && new Date(subData.expiryDate) > new Date()) {
              isSubscriber = true;
              subscriptionPlan = subData.planId as 'weekly' | 'monthly' | '3months' | '6months' | 'yearly';
              subscriptionExpiry = subData.expiryDate;
            }
          }

          userData = {
            id: userId,
            name: firestoreData.name || clerkUser.fullName || 'User',
            email: userEmail,
            role: isAdmin ? 'admin' : 'user',
            isSubscriber,
            isAdmin,
            subscriptionPlan,
            subscriptionExpiry,
            avatarUrl: clerkUser.imageUrl || firestoreData.avatarUrl,
            status: firestoreData.status || 'active',
            lastLogin: new Date().toISOString()
          };

          // Update last login
          await updateDoc(userRef, {
            lastLogin: new Date().toISOString()
          });
        } else {
          // Create new user in Firestore
          userData = {
            id: userId,
            name: clerkUser.fullName || 'User',
            email: userEmail,
            role: isAdmin ? 'admin' : 'user',
            isSubscriber: isAdmin,
            isAdmin,
            avatarUrl: clerkUser.imageUrl,
            status: 'active',
            lastLogin: new Date().toISOString()
          };

          await setDoc(userRef, {
            name: userData.name,
            email: userData.email,
            role: userData.role,
            avatarUrl: userData.avatarUrl,
            status: userData.status,
            lastLogin: userData.lastLogin,
            createdAt: new Date().toISOString()
          });
        }

        setUser(userData);
      } catch (error) {
        console.error('Error syncing user:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    syncUser();
  }, [clerkUser, isLoaded]);

  // Check subscription expiry periodically
  useEffect(() => {
    const checkExpiry = async () => {
      if (user && user.isSubscriber && user.subscriptionExpiry && !user.isAdmin) {
        const now = new Date();
        const expiry = new Date(user.subscriptionExpiry);

        if (now > expiry) {
          console.log(`Subscription expired for ${user.name}. Removing access.`);

          // Update Firestore subscription status
          try {
            const subscriptionRef = doc(db, 'subscriptions', user.id);
            await updateDoc(subscriptionRef, {
              status: 'expired'
            });
          } catch (error) {
            console.error('Error updating subscription status:', error);
          }

          setUser(prev => prev ? ({
            ...prev,
            isSubscriber: false,
            subscriptionPlan: undefined,
            subscriptionExpiry: undefined
          }) : null);

          alert("Your subscription has expired. Please renew to continue accessing the Music Pool.");
        }
      }
    };

    checkExpiry();
    const interval = setInterval(checkExpiry, 60000);

    return () => clearInterval(interval);
  }, [user]);

  const login = () => {
    // Login is handled by Clerk
    console.log('Login is handled by Clerk');
  };

  const register = () => {
    // Registration is handled by Clerk
    console.log('Registration is handled by Clerk');
  };

  const logout = async () => {
    await signOut();
    setUser(null);
  };

  const subscribe = async () => {
    // Subscription is handled by Paystack payment flow
    console.log('Subscription is handled by Paystack');
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      subscribe,
      isAuthenticated: !!user,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};