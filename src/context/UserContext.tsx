import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, UserActivityEvent } from '../types';
import { UserActivityTracker } from '../services/UserActivityTracker';

export interface UserContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isSubscribed: boolean;
  activateSubscription: () => void;
  isAuthModalOpen: boolean;
  authModalTab: 'login' | 'register';
  activityLogs: UserActivityEvent[];
  logActivity: (type: UserActivityEvent['type'], action: string, details?: string, page?: string) => UserActivityEvent;
  clearActivityLogs: () => void;
  openAuthModal: (tab?: 'login' | 'register') => void;
  closeAuthModal: () => void;
  login: (email: string, password?: string) => boolean;
  register: (data: {
    name: string;
    email: string;
    role?: string;
    company?: string;
    personaTag?: 'Student' | 'Founder' | 'Freelancer' | 'Professional' | 'Creator';
    avatar?: string;
    bio?: string;
  }) => void;
  logout: () => void;
  updateProfile: (data: Partial<UserProfile>) => void;
  enrolledPathIds: string[];
  enrollPath: (pathId: string) => void;
  isPathEnrolled: (pathId: string) => boolean;
  userAiTasksCount: number;
  incrementUserAiTasks: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activityLogs, setActivityLogs] = useState<UserActivityEvent[]>(() => {
    return UserActivityTracker.getActivities();
  });

  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('creatiq_active_user');
    if (!saved) return null;
    try {
      const parsed: UserProfile = JSON.parse(saved);
      parsed.activityLogs = UserActivityTracker.getActivities();
      return parsed;
    } catch {
      return null;
    }
  });

  const [isSubscribed, setIsSubscribed] = useState<boolean>(() => {
    return localStorage.getItem('creatiq_pro_subscription') === 'true';
  });

  const activateSubscription = () => {
    setIsSubscribed(true);
    localStorage.setItem('creatiq_pro_subscription', 'true');
    UserActivityTracker.logActivity('plan_selected', 'Activated Pro Subscription', 'Unlocked top 8 most used AI tools');
  };
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'register'>('login');

  const [enrolledPathIds, setEnrolledPathIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('creatiq_enrolled_paths');
    return saved ? JSON.parse(saved) : [];
  });

  const [userAiTasksCount, setUserAiTasksCount] = useState<number>(() => {
    const saved = localStorage.getItem('creatiq_user_ai_tasks');
    return saved ? parseInt(saved, 10) : 0;
  });

  // Subscribe to real-time activity tracker updates
  useEffect(() => {
    const unsubscribe = UserActivityTracker.subscribe((newEvent) => {
      setActivityLogs((prev) => {
        const updated = [...prev, newEvent].slice(-100);
        return updated;
      });
    });
    return unsubscribe;
  }, []);

  // Sync user state and activity logs to localStorage whenever user or activityLogs change
  useEffect(() => {
    if (user) {
      const updatedUser = { ...user, activityLogs };
      localStorage.setItem('creatiq_active_user', JSON.stringify(updatedUser));
    } else {
      localStorage.removeItem('creatiq_active_user');
    }
  }, [user, activityLogs]);

  useEffect(() => {
    localStorage.setItem('creatiq_enrolled_paths', JSON.stringify(enrolledPathIds));
  }, [enrolledPathIds]);

  useEffect(() => {
    localStorage.setItem('creatiq_user_ai_tasks', userAiTasksCount.toString());
  }, [userAiTasksCount]);

  const logActivity = (
    type: UserActivityEvent['type'],
    action: string,
    details?: string,
    page?: string
  ) => {
    const newEv = UserActivityTracker.logActivity(type, action, details, page);
    return newEv;
  };

  const clearActivityLogs = () => {
    UserActivityTracker.clearActivities();
    setActivityLogs([]);
  };

  const openAuthModal = (tab: 'login' | 'register' = 'login') => {
    setAuthModalTab(tab);
    setIsAuthModalOpen(true);
    logActivity('modal_opened', `Opened ${tab} authentication modal`);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const login = (email: string, password?: string): boolean => {
    const allUsersStr = localStorage.getItem('creatiq_users_db');
    const usersDb: UserProfile[] = allUsersStr ? JSON.parse(allUsersStr) : [];

    let existing = usersDb.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (!existing) {
      const namePart = email.split('@')[0];
      const capitalized = namePart.charAt(0).toUpperCase() + namePart.slice(1);
      existing = {
        id: `usr-${Date.now()}`,
        name: capitalized || 'Creatiq Creator',
        email: email,
        role: 'Full-Stack AI Builder',
        company: 'Creatiq Ecosystem',
        personaTag: 'Creator',
        badge: 'Verified Pioneer',
        avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(email)}`,
        createdAt: new Date().toISOString(),
        activityLogs: []
      };
      usersDb.push(existing);
      localStorage.setItem('creatiq_users_db', JSON.stringify(usersDb));
    }

    setUser(existing);
    setIsAuthModalOpen(false);
    logActivity('login', `User logged in as ${existing.email}`, `Session started for ${existing.name}`);
    return true;
  };

  const register = (data: {
    name: string;
    email: string;
    role?: string;
    company?: string;
    personaTag?: 'Student' | 'Founder' | 'Freelancer' | 'Professional' | 'Creator';
    avatar?: string;
    bio?: string;
  }) => {
    const newUser: UserProfile = {
      id: `usr-${Date.now()}`,
      name: data.name,
      email: data.email,
      role: data.role || 'Full-Stack AI Pioneer',
      company: data.company || 'Creatiq Platform',
      personaTag: data.personaTag || 'Creator',
      badge: 'Early Pioneer',
      avatar: data.avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(data.name)}`,
      bio: data.bio || 'Building future tech with Creatiq AI Brain',
      createdAt: new Date().toISOString(),
      activityLogs: []
    };

    const allUsersStr = localStorage.getItem('creatiq_users_db');
    const usersDb: UserProfile[] = allUsersStr ? JSON.parse(allUsersStr) : [];
    usersDb.push(newUser);
    localStorage.setItem('creatiq_users_db', JSON.stringify(usersDb));

    setUser(newUser);
    setIsAuthModalOpen(false);
    logActivity('register', `Registered new profile ${newUser.name}`, `Email: ${newUser.email}`);
  };

  const logout = () => {
    logActivity('login', 'User logged out');
    setUser(null);
  };

  const updateProfile = (data: Partial<UserProfile>) => {
    if (!user) return;
    const updated = { ...user, ...data, activityLogs };
    setUser(updated);

    const allUsersStr = localStorage.getItem('creatiq_users_db');
    if (allUsersStr) {
      const usersDb: UserProfile[] = JSON.parse(allUsersStr);
      const idx = usersDb.findIndex((u) => u.id === user.id);
      if (idx !== -1) {
        usersDb[idx] = updated;
        localStorage.setItem('creatiq_users_db', JSON.stringify(usersDb));
      }
    }
    logActivity('login', `Updated profile information`, `Fields: ${Object.keys(data).join(', ')}`);
  };

  const enrollPath = (pathId: string) => {
    if (!enrolledPathIds.includes(pathId)) {
      setEnrolledPathIds((prev) => [...prev, pathId]);
      UserActivityTracker.logPathEnrollment(pathId, pathId);
    }
  };

  const isPathEnrolled = (pathId: string) => enrolledPathIds.includes(pathId);

  const incrementUserAiTasks = () => {
    setUserAiTasksCount((prev) => prev + 1);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isSubscribed,
        activateSubscription,
        isAuthModalOpen,
        authModalTab,
        activityLogs,
        logActivity,
        clearActivityLogs,
        openAuthModal,
        closeAuthModal,
        login,
        register,
        logout,
        updateProfile,
        enrolledPathIds,
        enrollPath,
        isPathEnrolled,
        userAiTasksCount,
        incrementUserAiTasks
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
