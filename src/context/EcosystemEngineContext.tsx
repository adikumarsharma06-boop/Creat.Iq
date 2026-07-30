import React, { createContext, useContext, useState, useEffect } from 'react';
import { CommunityPost, Testimonial, UserProfile } from '../types';

export interface ToastNotification {
  id: string;
  title: string;
  message: string;
  type?: 'success' | 'info' | 'warning';
}

export interface EcosystemEngineContextType {
  user: UserProfile | null;
  activeCreatorsCount: number;
  globalHubsCount: number;
  aiTasksCompleted: number;
  communityPosts: CommunityPost[];
  testimonials: Testimonial[];
  enrolledPathIds: string[];
  isAuthModalOpen: boolean;
  authModalTab: 'login' | 'register';
  lastPolledAt: string;
  isPollingActive: boolean;
  toastNotification: ToastNotification | null;
  showToast: (title: string, message: string, type?: 'success' | 'info' | 'warning') => void;
  clearToast: () => void;
  pollRealTimeMetrics: () => void;
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
  incrementAiTasks: () => void;
  registerCreator: () => void;
  addCommunityPost: (post: {
    authorName?: string;
    authorRole?: string;
    title: string;
    content: string;
    category: 'study' | 'discussion' | 'challenge' | 'showcase';
    tags: string[];
  }) => void;
  likePost: (id: string) => void;
  addTestimonial: (testimonial: {
    name?: string;
    role?: string;
    company?: string;
    personaTag?: 'Student' | 'Founder' | 'Freelancer' | 'Professional' | 'Creator';
    content: string;
    rating: number;
    metrics?: string;
  }) => void;
  enrollPath: (pathId: string) => void;
  isPathEnrolled: (pathId: string) => boolean;
  getPathEnrolledCount: (pathId: string) => number;
}

const EcosystemEngineContext = createContext<EcosystemEngineContextType | undefined>(undefined);

export const EcosystemEngineProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('creatiq_active_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'register'>('login');

  const [activeCreatorsCount, setActiveCreatorsCount] = useState<number>(() => {
    const saved = localStorage.getItem('creatiq_creators_count');
    return saved ? parseInt(saved, 10) : 0;
  });

  const [globalHubsCount, setGlobalHubsCount] = useState<number>(() => {
    const saved = localStorage.getItem('creatiq_hubs_count');
    return saved ? parseInt(saved, 10) : 0;
  });

  const [aiTasksCompleted, setAiTasksCompleted] = useState<number>(() => {
    const saved = localStorage.getItem('creatiq_ai_tasks_count');
    return saved ? parseInt(saved, 10) : 0;
  });

  const [communityPosts, setCommunityPosts] = useState<CommunityPost[]>(() => {
    const saved = localStorage.getItem('creatiq_community_posts');
    return saved ? JSON.parse(saved) : [];
  });

  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    const saved = localStorage.getItem('creatiq_testimonials');
    return saved ? JSON.parse(saved) : [];
  });

  const [enrolledPathIds, setEnrolledPathIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('creatiq_enrolled_paths');
    return saved ? JSON.parse(saved) : [];
  });

  const [pathEnrolledCounts, setPathEnrolledCounts] = useState<Record<string, number>>(() => {
    const saved = localStorage.getItem('creatiq_path_counts');
    return saved ? JSON.parse(saved) : {};
  });

  const [lastPolledAt, setLastPolledAt] = useState<string>(() => new Date().toLocaleTimeString());
  const [isPollingActive, setIsPollingActive] = useState<boolean>(true);
  const [toastNotification, setToastNotification] = useState<ToastNotification | null>(null);

  const clearToast = () => {
    setToastNotification(null);
  };

  const showToast = (title: string, message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = `toast-${Date.now()}`;
    setToastNotification({ id, title, message, type });

    // Auto fadeout after 5 seconds (5000 ms)
    setTimeout(() => {
      setToastNotification((current) => (current?.id === id ? null : current));
    }, 5000);
  };

  // Service-level 30-second polling function to sync real user counts & ecosystem metrics
  const pollRealTimeMetrics = () => {
    // Read actual registered users from local database store
    const allUsersStr = localStorage.getItem('creatiq_users_db');
    const usersDb: UserProfile[] = allUsersStr ? JSON.parse(allUsersStr) : [];
    const actualUsersCount = usersDb.length;

    setActiveCreatorsCount((prev) => {
      // Ensure count is at least equal to actual registered users count
      const updated = Math.max(prev, actualUsersCount);
      return updated;
    });

    if (actualUsersCount > 0 && globalHubsCount === 0) {
      setGlobalHubsCount(1);
    }

    setLastPolledAt(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
  };

  // Automated 30-Second Polling Service Loop
  useEffect(() => {
    pollRealTimeMetrics(); // Initial sync
    const interval = setInterval(() => {
      pollRealTimeMetrics();
    }, 30000); // 30 seconds interval

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('creatiq_active_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('creatiq_active_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('creatiq_creators_count', activeCreatorsCount.toString());
  }, [activeCreatorsCount]);

  useEffect(() => {
    localStorage.setItem('creatiq_hubs_count', globalHubsCount.toString());
  }, [globalHubsCount]);

  useEffect(() => {
    localStorage.setItem('creatiq_ai_tasks_count', aiTasksCompleted.toString());
  }, [aiTasksCompleted]);

  useEffect(() => {
    localStorage.setItem('creatiq_community_posts', JSON.stringify(communityPosts));
  }, [communityPosts]);

  useEffect(() => {
    localStorage.setItem('creatiq_testimonials', JSON.stringify(testimonials));
  }, [testimonials]);

  useEffect(() => {
    localStorage.setItem('creatiq_enrolled_paths', JSON.stringify(enrolledPathIds));
  }, [enrolledPathIds]);

  useEffect(() => {
    localStorage.setItem('creatiq_path_counts', JSON.stringify(pathEnrolledCounts));
  }, [pathEnrolledCounts]);

  const openAuthModal = (tab: 'login' | 'register' = 'login') => {
    setAuthModalTab(tab);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const login = (email: string, password?: string) => {
    // Check registered users history or create profile on fly
    const allUsersStr = localStorage.getItem('creatiq_users_db');
    const usersDb: UserProfile[] = allUsersStr ? JSON.parse(allUsersStr) : [];
    
    let existing = usersDb.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!existing) {
      // Derive name from email prefix if logging in fresh
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
        createdAt: new Date().toISOString()
      };
      usersDb.push(existing);
      localStorage.setItem('creatiq_users_db', JSON.stringify(usersDb));
    }

    setUser(existing);
    setActiveCreatorsCount((prev) => (prev === 0 ? 1 : prev));
    setIsAuthModalOpen(false);
    showToast('Logged In Successfully! 🚀', `Welcome back, ${existing.name}! Your workspace session is active across Creatiq.`);
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
      createdAt: new Date().toISOString()
    };

    const allUsersStr = localStorage.getItem('creatiq_users_db');
    const usersDb: UserProfile[] = allUsersStr ? JSON.parse(allUsersStr) : [];
    usersDb.push(newUser);
    localStorage.setItem('creatiq_users_db', JSON.stringify(usersDb));

    setUser(newUser);
    registerCreator();
    setIsAuthModalOpen(false);
    showToast('Account Created! 🎉', `Welcome ${newUser.name}! Your Pioneer Passport is ready.`);
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (data: Partial<UserProfile>) => {
    if (!user) return;
    const updated = { ...user, ...data };
    setUser(updated);

    const allUsersStr = localStorage.getItem('creatiq_users_db');
    if (allUsersStr) {
      const usersDb: UserProfile[] = JSON.parse(allUsersStr);
      const idx = usersDb.findIndex(u => u.id === user.id);
      if (idx !== -1) {
        usersDb[idx] = updated;
        localStorage.setItem('creatiq_users_db', JSON.stringify(usersDb));
      }
    }
  };

  const incrementAiTasks = () => {
    setAiTasksCompleted((prev) => prev + 1);
  };

  const registerCreator = () => {
    setActiveCreatorsCount((prev) => {
      const next = prev + 1;
      if (next > 0 && globalHubsCount === 0) {
        setGlobalHubsCount(1);
      }
      return next;
    });
  };

  const addCommunityPost = (data: {
    authorName?: string;
    authorRole?: string;
    title: string;
    content: string;
    category: 'study' | 'discussion' | 'challenge' | 'showcase';
    tags: string[];
  }) => {
    const authorName = user ? user.name : (data.authorName || 'Anonymous Creator');
    const authorRole = user ? user.role : (data.authorRole || 'Community Member');
    const avatar = user ? user.avatar : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200';
    const badge = user ? user.badge : 'Early Pioneer';

    const newPost: CommunityPost = {
      id: `post-${Date.now()}`,
      author: {
        name: authorName,
        avatar,
        role: authorRole,
        badge
      },
      title: data.title,
      content: data.content,
      category: data.category,
      likes: 0,
      replies: 0,
      tags: data.tags,
      timestamp: 'Just now'
    };

    setCommunityPosts((prev) => [newPost, ...prev]);
    setActiveCreatorsCount((prev) => (prev === 0 ? 1 : prev));
  };

  const likePost = (id: string) => {
    setCommunityPosts((prev) =>
      prev.map((post) => (post.id === id ? { ...post, likes: post.likes + 1 } : post))
    );
  };

  const addTestimonial = (data: {
    name?: string;
    role?: string;
    company?: string;
    personaTag?: 'Student' | 'Founder' | 'Freelancer' | 'Professional' | 'Creator';
    content: string;
    rating: number;
    metrics?: string;
  }) => {
    const name = user ? user.name : (data.name || 'Verified Member');
    const role = user ? user.role : (data.role || 'Creatiq User');
    const company = user ? user.company : (data.company || 'Community Pioneer');
    const personaTag = user ? user.personaTag : (data.personaTag || 'Creator');
    const avatar = user ? user.avatar : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200';

    const newTestimonial: Testimonial = {
      id: `test-${Date.now()}`,
      name,
      role,
      company,
      avatar,
      personaTag,
      content: data.content,
      rating: data.rating,
      metrics: data.metrics || 'Verified User Feedback'
    };

    setTestimonials((prev) => [newTestimonial, ...prev]);
  };

  const enrollPath = (pathId: string) => {
    if (!enrolledPathIds.includes(pathId)) {
      setEnrolledPathIds((prev) => [...prev, pathId]);
    }
    setPathEnrolledCounts((prev) => ({
      ...prev,
      [pathId]: (prev[pathId] || 0) + 1
    }));
  };

  const isPathEnrolled = (pathId: string) => enrolledPathIds.includes(pathId);

  const getPathEnrolledCount = (pathId: string) => pathEnrolledCounts[pathId] || 0;

  return (
    <EcosystemEngineContext.Provider
      value={{
        user,
        activeCreatorsCount,
        globalHubsCount,
        aiTasksCompleted,
        communityPosts,
        testimonials,
        enrolledPathIds,
        isAuthModalOpen,
        authModalTab,
        lastPolledAt,
        isPollingActive,
        toastNotification,
        showToast,
        clearToast,
        pollRealTimeMetrics,
        openAuthModal,
        closeAuthModal,
        login,
        register,
        logout,
        updateProfile,
        incrementAiTasks,
        registerCreator,
        addCommunityPost,
        likePost,
        addTestimonial,
        enrollPath,
        isPathEnrolled,
        getPathEnrolledCount
      }}
    >
      {children}
    </EcosystemEngineContext.Provider>
  );
};

export const useEcosystemEngine = () => {
  const context = useContext(EcosystemEngineContext);
  if (!context) {
    throw new Error('useEcosystemEngine must be used within an EcosystemEngineProvider');
  }
  return context;
};

// Aliases for compatibility
export const EcosystemProvider = EcosystemEngineProvider;
export const useEcosystem = useEcosystemEngine;
