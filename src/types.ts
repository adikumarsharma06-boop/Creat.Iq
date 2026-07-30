export interface UserActivityEvent {
  id: string;
  timestamp: string;
  type: 'page_view' | 'feature_used' | 'path_enrolled' | 'plan_selected' | 'data_exported' | 'search' | 'modal_opened' | 'login' | 'register';
  action: string;
  details?: string;
  page?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  company: string;
  personaTag: 'Student' | 'Founder' | 'Freelancer' | 'Professional' | 'Creator';
  badge: string;
  avatar: string;
  bio?: string;
  createdAt: string;
  activityLogs?: UserActivityEvent[];
}

export interface AIFeature {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: 'creation' | 'business' | 'learning' | 'productivity' | 'coding';
  iconName: string;
  badge?: string;
  samplePrompt: string;
  demoOutput: string;
  accentColor: string;
  stats: string;
  isLocked?: boolean;
  isMostUsed?: boolean;
}

export interface CommunityPost {
  id: string;
  author: {
    name: string;
    avatar: string;
    role: string;
    badge: string;
  };
  title: string;
  content: string;
  category: 'study' | 'discussion' | 'challenge' | 'showcase';
  likes: number;
  replies: number;
  tags: string[];
  timestamp: string;
  featured?: boolean;
}

export interface LearningPath {
  id: string;
  title: string;
  persona: 'Students' | 'Creators' | 'Entrepreneurs' | 'Freelancers' | 'Professionals' | 'Developers' | 'Small Businesses';
  category: 'Marketing' | 'AI' | 'Coding' | 'Design' | 'Finance' | 'Content Creation' | 'Productivity';
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  lessonsCount: number;
  projectsCount: number;
  description: string;
  skills: string[];
  lessons: {
    id: string;
    title: string;
    duration: string;
    hasAIAssistant: boolean;
  }[];
  certificateTitle: string;
  enrolledCount: number;
  imageBg: string;
}

export interface WorkspaceTool {
  id: string;
  name: string;
  icon: string;
  description: string;
  previewType: 'notes' | 'kanban' | 'vault' | 'docs' | 'goals';
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  personaTag: 'Student' | 'Founder' | 'Freelancer' | 'Professional' | 'Creator';
  content: string;
  rating: number;
  metrics: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'features' | 'community' | 'pricing' | 'security';
}

export interface PricingPlan {
  id: string;
  name: string;
  tagline: string;
  priceMonthly: number;
  priceYearly: number;
  popular?: boolean;
  features: string[];
  aiCredits: string;
  communityAccess: string;
  ctaText: string;
  ctaVariant: 'primary' | 'secondary' | 'outline';
}

export interface BackupSnapshot {
  id: string;
  timestamp: string;
  triggerType: 'auto_scheduled' | 'event_threshold' | 'manual';
  dataSizeKb: number;
  eventsCount: number;
  user: {
    name: string;
    email: string;
    role: string;
  };
  payloads: {
    json: string;
    notionMarkdown: string;
    whatsAppText: string;
    emailBody: string;
  };
}
