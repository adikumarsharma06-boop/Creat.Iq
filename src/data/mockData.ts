import { AIFeature, CommunityPost, LearningPath, Testimonial, FAQItem, PricingPlan } from '../types';

export const AI_FEATURES: AIFeature[] = [
  {
    id: 'ai-chat',
    title: 'AI Chat',
    subtitle: 'Conversational Intelligence',
    description: 'Context-aware conversational partner powered by real-time web grounding, long-term memory, and multi-modal understanding.',
    category: 'creation',
    iconName: 'MessageSquareText',
    badge: '🔒 PRO Locked',
    isLocked: true,
    isMostUsed: true,
    samplePrompt: 'Explain how quantum entanglement works using an easy analogy for a high school student.',
    demoOutput: 'Imagine two magic coins flipped at the exact same time on opposite sides of the galaxy. Even light-years apart, whenever coin A lands on heads, coin B instantly lands on tails...',
    accentColor: 'from-cyan-500 to-blue-600',
    stats: '142K+ monthly uses'
  },
  {
    id: 'ai-research',
    title: 'AI Research',
    subtitle: 'Deep Web & Academic Synthesis',
    description: 'Scours thousands of research papers, market reports, and global news sources to draft cited executive summaries in seconds.',
    category: 'learning',
    iconName: 'Search',
    badge: '🔒 PRO Locked',
    isLocked: true,
    isMostUsed: true,
    samplePrompt: 'Synthesize current 2026 trends in renewable energy grid storage solutions with pros & cons.',
    demoOutput: 'Found 14 peer-reviewed sources. Key insight: Solid-state battery capacity increased 34% this year while sodium-ion thermal stability achieved grid parity in 12 regions...',
    accentColor: 'from-purple-500 to-indigo-600',
    stats: '98K+ papers analyzed'
  },
  {
    id: 'ai-writing',
    title: 'AI Writing',
    subtitle: 'Long-form & Copywriting',
    description: 'Craft viral newsletters, persuasive landing page copy, academic essays, and SEO-optimized blogs with adaptive tone controls.',
    category: 'creation',
    iconName: 'PenTool',
    badge: '🔒 PRO Locked',
    isLocked: true,
    isMostUsed: true,
    samplePrompt: 'Draft a compelling launch email for a sustainable apparel brand targetting Gen Z.',
    demoOutput: 'Subject: Fashion that outlasts trends (and respects the planet 🌍)\n\nHey Alex, what if your favorite jacket didn’t cost the earth?',
    accentColor: 'from-blue-500 to-cyan-400',
    stats: '84K+ words generated'
  },
  {
    id: 'ai-coding',
    title: 'AI Coding',
    subtitle: 'Full-Stack Code & Debugging',
    description: 'Write, refactor, debug, and optimize code in TypeScript, Python, Rust, Go, and SQL with real-time error detection.',
    category: 'coding',
    iconName: 'Code2',
    badge: '🔒 PRO Locked',
    isLocked: true,
    isMostUsed: true,
    samplePrompt: 'Build a React hook for debouncing search input with TypeScript types and cleanup.',
    demoOutput: '```typescript\nexport function useDebounce<T>(value: T, delay: number = 300): T {\n  const [debouncedValue, setDebouncedValue] = useState<T>(value);\n  ...\n}```',
    accentColor: 'from-cyan-400 to-emerald-500',
    stats: '210K+ code scripts'
  },
  {
    id: 'ai-business',
    title: 'AI Business Assistant',
    subtitle: 'Financial Modeling & Ops',
    description: 'Generate unit economics, cash-flow projections, competitive matrices, and automated operational checklists.',
    category: 'business',
    iconName: 'TrendingUp',
    samplePrompt: 'Create a 12-month unit economics model for a B2B SaaS product priced at $49/mo.',
    demoOutput: 'Model generated: LTV = $1,470 (based on 3.2% churn). Recommended CAC ceiling = $367. Break-even achieved at month 4.2 per subscriber...',
    accentColor: 'from-emerald-400 to-teal-600',
    stats: '12K+ models built'
  },
  {
    id: 'ai-startup-advisor',
    title: 'AI Startup Advisor',
    subtitle: 'Market Analysis & Investor Pitching',
    description: 'Simulate investor Q&A sessions, refine pitch deck story arcs, evaluate TAM/SAM/SOM, and discover grants.',
    category: 'business',
    iconName: 'Rocket',
    badge: '🔒 PRO Locked',
    isLocked: true,
    isMostUsed: true,
    samplePrompt: 'Critique my value proposition for an AI scheduling tool for remote medical clinics.',
    demoOutput: 'Strength: Clear ROI on reduced no-shows. Weakness: Missing HIPAA/GDPR compliance assurance in elevator pitch. Suggested revision: ...',
    accentColor: 'from-violet-500 to-purple-600',
    stats: '65K+ startups advised'
  },
  {
    id: 'ai-marketing',
    title: 'AI Marketing',
    subtitle: 'Campaigns & Strategy',
    description: 'Plan multi-channel marketing calendars, generate high-converting ad variations, and analyze audience engagement analytics.',
    category: 'business',
    iconName: 'Megaphone',
    samplePrompt: 'Generate a 4-week TikTok/Reels content strategy for launching a productivity app.',
    demoOutput: 'Week 1 Theme: "The Chaos Before the Fix" (3 Hook variations). Day 1: POV: You have 14 tabs open and 5 minutes to submit...',
    accentColor: 'from-fuchsia-500 to-pink-500',
    stats: '18K+ campaigns planned'
  },
  {
    id: 'ai-learning-tutor',
    title: 'AI Learning Tutor',
    subtitle: 'Socratic Study Partner',
    description: 'Personalized interactive teacher that breaks down complex subjects step-by-step, creates practice quizzes, and adapts to your pace.',
    category: 'learning',
    iconName: 'GraduationCap',
    badge: 'Student Choice',
    samplePrompt: 'Test my knowledge on Organic Chemistry functional groups with 3 progressive questions.',
    demoOutput: 'Question 1: You spot a compound with a carbonyl group attached to a hydroxyl group (-COOH). What functional class is this?',
    accentColor: 'from-cyan-500 to-indigo-500',
    stats: '29K+ tutoring sessions'
  },
  {
    id: 'ai-resume-builder',
    title: 'AI Resume Builder',
    subtitle: 'Smart CV & Portfolio',
    description: 'Tailor your resume to specific job descriptions, quantify achievements with impactful bullet points, and pass ATS filters.',
    category: 'productivity',
    iconName: 'FileText',
    samplePrompt: 'Rewrite my bullet point: "Helped manage the company social media accounts".',
    demoOutput: 'Optimized: "Architected organic social media campaigns across 3 platforms, expanding follower base by 142% and generating 45K monthly site visits."',
    accentColor: 'from-blue-400 to-purple-500',
    stats: '15K+ resumes optimized'
  },
  {
    id: 'ai-presentation',
    title: 'AI Presentation Generator',
    subtitle: 'Slide Decks in Seconds',
    description: 'Convert outlines, documents, or ideas into beautifully structured 10-slide presentation decks complete with speaker notes.',
    category: 'creation',
    iconName: 'Layout',
    samplePrompt: 'Outline a 7-slide pitch for a student community initiative on campus cleanups.',
    demoOutput: 'Slide 1: Title & Vision\nSlide 2: The On-Campus Plastic Problem\nSlide 3: Gamified Cleanups Concept\nSlide 4: Pilot Metrics & Impact...',
    accentColor: 'from-amber-400 to-orange-500',
    stats: '22K+ decks created'
  },
  {
    id: 'ai-spreadsheet',
    title: 'AI Spreadsheet Assistant',
    subtitle: 'Formula & Data Analysis',
    description: 'Ask questions about complex raw datasets in natural language, generate Excel/Google Sheets formulas, and plot pivot charts.',
    category: 'productivity',
    iconName: 'Table',
    samplePrompt: 'Write an XLOOKUP formula with error handling for matching employee IDs across two sheets.',
    demoOutput: '`=IFERROR(XLOOKUP(A2, Staff!A:A, Staff!C:C, "Not Found"), "Invalid ID")`',
    accentColor: 'from-emerald-400 to-cyan-500',
    stats: '19K+ formulas created'
  },
  {
    id: 'ai-website-builder',
    title: 'AI Website Builder',
    subtitle: 'Instant Web Layouts',
    description: 'Describe your project or product to instantly generate responsive React & Tailwind UI code, color palettes, and copy.',
    category: 'coding',
    iconName: 'Globe',
    badge: '🔒 PRO Locked',
    isLocked: true,
    isMostUsed: true,
    samplePrompt: 'Generate a hero section layout for a local artisan coffee shop in dark espresso aesthetic.',
    demoOutput: 'Component created with dark roasted espresso background `#1c120c`, warm amber glow accents, and floating steam particle effects...',
    accentColor: 'from-indigo-500 to-cyan-400',
    stats: '175K+ layouts created'
  },
  {
    id: 'ai-image-gen',
    title: 'AI Image Generator',
    subtitle: 'Prompt to Visuals',
    description: 'Generate high-resolution 4K graphics, UI mockups, 3D render art, logo concepts, and marketing banners in seconds.',
    category: 'creation',
    iconName: 'Sparkles',
    badge: '🔒 PRO Locked',
    isLocked: true,
    isMostUsed: true,
    samplePrompt: 'Futuristic glass glowing sphere floating over a dark galaxy grid with cyan aurora lighting.',
    demoOutput: 'Generated 4 high-res vector and photorealistic options ready for asset export...',
    accentColor: 'from-pink-500 to-purple-600',
    stats: '320K+ images rendered'
  },
  {
    id: 'ai-video-assistant',
    title: 'AI Video Assistant',
    subtitle: 'Script to Storyboard',
    description: 'Turn ideas into production-ready video scripts, visual shot lists, voiceover timestamps, and automated subtitle files.',
    category: 'creation',
    iconName: 'Video',
    badge: '🔒 PRO Locked',
    isLocked: true,
    isMostUsed: true,
    samplePrompt: 'Draft a 60-second YouTube Short script explaining why neural networks learn like human brains.',
    demoOutput: '[0:00-0:05] Hook: "Did you know your brain and ChatGPT use the exact same mathematical trick?" [Visual: Glowing synaptic network]...',
    accentColor: 'from-purple-400 to-pink-500',
    stats: '110K+ scripts generated'
  },
  {
    id: 'ai-productivity',
    title: 'AI Productivity Assistant',
    subtitle: 'Task & Goal Optimizer',
    description: 'Intelligent scheduling assistant that prioritizes your daily check-lists, breaks down daunting projects, and maintains streak focus.',
    category: 'productivity',
    iconName: 'CheckCircle2',
    samplePrompt: 'Break down "Launch my portfolio website" into 5 actionable daily sub-tasks.',
    demoOutput: 'Day 1: Wireframe layout & collect 3 key case studies.\nDay 2: Write concise bio and project copy using AI Writer...\nDay 3: Code React layout...',
    accentColor: 'from-cyan-400 to-blue-500',
    stats: '24K+ tasks organized'
  }
];

export const COMMUNITY_POSTS: CommunityPost[] = [];

export const LEARNING_PATHS: LearningPath[] = [
  {
    id: 'path-students',
    title: 'AI-Powered Study & Academic Mastery',
    persona: 'Students',
    category: 'AI',
    level: 'Beginner',
    duration: '2 Weeks • 8 Modules',
    lessonsCount: 16,
    projectsCount: 4,
    description: 'Master deep research, structured essay writing, Socratic exam preparation, and complex problem-solving with AI assistants.',
    skills: ['Deep Literature Synthesis', 'Socratic Study Prompting', 'Smart Note Architecture', 'Academic Ethics'],
    lessons: [
      { id: 'l1', title: 'Setting Up Your AI Study Assistant & Memory Vault', duration: '15 mins', hasAIAssistant: true },
      { id: 'l2', title: 'Synthesizing 10+ Academic Papers in 10 Minutes', duration: '20 mins', hasAIAssistant: true },
      { id: 'l3', title: 'Interactive Socratic Flashcards & Mock Exams', duration: '25 mins', hasAIAssistant: true },
      { id: 'l4', title: 'Writing Well-Cited Research Drafts Without Friction', duration: '30 mins', hasAIAssistant: true }
    ],
    certificateTitle: 'Certified AI Academic Strategist',
    enrolledCount: 0,
    imageBg: 'from-cyan-900/40 to-blue-900/40'
  },
  {
    id: 'path-creators',
    title: 'Content Creator Engine: Zero to Viral',
    persona: 'Creators',
    category: 'Content Creation',
    level: 'Intermediate',
    duration: '3 Weeks • 12 Modules',
    lessonsCount: 22,
    projectsCount: 6,
    description: 'Build an automated multi-channel content system. Generate engaging scripts, eye-catching thumbnails, and automated newsletters.',
    skills: ['Hook Engineering', 'Multi-Format Repurposing', 'AI Storyboarding', 'Audience Analytics'],
    lessons: [
      { id: 'l5', title: 'Viral Script Anatomy & Hook Testing with AI', duration: '18 mins', hasAIAssistant: true },
      { id: 'l6', title: 'Prompting 4K Visuals & Thumbnails that Demand Clicks', duration: '22 mins', hasAIAssistant: true },
      { id: 'l7', title: 'Turning One 10-Min Video into 15 Social Posts', duration: '30 mins', hasAIAssistant: true }
    ],
    certificateTitle: 'Certified AI Content Architect',
    enrolledCount: 0,
    imageBg: 'from-purple-900/40 to-pink-900/40'
  },
  {
    id: 'path-entrepreneurs',
    title: 'AI Startup Zero-to-Launch Blueprint',
    persona: 'Entrepreneurs',
    category: 'Finance',
    level: 'Advanced',
    duration: '4 Weeks • 16 Modules',
    lessonsCount: 28,
    projectsCount: 8,
    description: 'Transform an idea into a validated business. Validate markets, build financial models, generate pitch decks, and launch landing pages.',
    skills: ['Market Validation', 'Unit Economics Modeling', 'Investor Pitch Decking', 'No-Code MVP Launch'],
    lessons: [
      { id: 'l8', title: 'Idea Stress-Testing & TAM/SAM/SOM Calculation', duration: '25 mins', hasAIAssistant: true },
      { id: 'l9', title: 'Building a 3-Year SaaS Financial Model with AI', duration: '35 mins', hasAIAssistant: true },
      { id: 'l10', title: 'Creating High-Converting Landing Page Code', duration: '40 mins', hasAIAssistant: true }
    ],
    certificateTitle: 'Certified AI Venture Founder',
    enrolledCount: 0,
    imageBg: 'from-emerald-900/40 to-teal-900/40'
  },
  {
    id: 'path-developers',
    title: 'Modern Full-Stack AI Engineering',
    persona: 'Developers',
    category: 'Coding',
    level: 'Intermediate',
    duration: '3 Weeks • 10 Modules',
    lessonsCount: 20,
    projectsCount: 5,
    description: 'Supercharge your development speed by 10x. Learn AI-driven refactoring, API integration, testing automation, and edge deployment.',
    skills: ['Prompt-Driven Development', 'API Proxy Architecture', 'Automated Testing', 'Performance Tuning'],
    lessons: [
      { id: 'l11', title: 'Building Scalable Full-Stack Apps with AI Coding', duration: '30 mins', hasAIAssistant: true },
      { id: 'l12', title: 'Automated Unit Test Generation & Edge Debugging', duration: '25 mins', hasAIAssistant: true }
    ],
    certificateTitle: 'Certified Full-Stack AI Engineer',
    enrolledCount: 0,
    imageBg: 'from-blue-900/40 to-indigo-900/40'
  }
];

export const TESTIMONIALS: Testimonial[] = [];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Pro Lite',
    tagline: 'Affordable entry tier for students & creators unlocking top AI tools.',
    priceMonthly: 99,
    priceYearly: 79,
    features: [
      'Unlock top locked AI tools & generators',
      '500 AI Generations / month',
      'Standard AI Chat, Writing & Research',
      'Community Hub & Study Group Access',
      'Basic Learning Hub & Certificates',
      'Creatiq Creator Profile & Badge'
    ],
    aiCredits: '500 credits/month',
    communityAccess: 'Standard forums & discussions',
    ctaText: 'Subscribe Pro Lite (₹99/mo)',
    ctaVariant: 'secondary'
  },
  {
    id: 'pro',
    name: 'Pro Creator',
    tagline: 'For power students, freelancers, creators & ambitious professionals.',
    priceMonthly: 199,
    priceYearly: 159,
    popular: true,
    features: [
      'Unlimited access to ALL 15 AI tools',
      'Unlimited AI Generations & High-Res 4K Image Gen',
      'Deep AI Research & Academic Synthesis',
      'Full Learning Hub & Verified Certificates',
      'Private Study Squads & Teammate Matchmaker',
      'Personalized Workspace Vault & Note Sync',
      'Priority Speed & 24/7 AI Tutor Access'
    ],
    aiCredits: 'Unlimited Fast Generation',
    communityAccess: 'VIP Squads, Hackathons & Mentorship',
    ctaText: 'Subscribe Pro Creator (₹199/mo)',
    ctaVariant: 'primary'
  },
  {
    id: 'team',
    name: 'Startup & Team',
    tagline: 'For co-founders, small businesses, labs, and growing agencies.',
    priceMonthly: 499,
    priceYearly: 399,
    features: [
      'Everything in Pro for up to 5 team members',
      'Shared Team Workspace & Collaborative Canvas',
      'Custom Brand Voice & Knowledge Base Uploads',
      'AI Startup Advisor & Financial Model Builders',
      'Dedicated Community Channel & Custom Badges',
      'Priority 1-on-1 Onboarding & Admin Console',
      'Custom API Integration Support'
    ],
    aiCredits: 'Unlimited Team Credits',
    communityAccess: 'Private Team Hub & Investor Matching',
    ctaText: 'Launch Team Workspace',
    ctaVariant: 'outline'
  }
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'How is Creatiq different from standard AI chatbots like ChatGPT?',
    answer: 'Unlike standalone chatbots that only answer text prompts in isolation, Creatiq is an all-in-one ecosystem combining 15 specialized AI tools, structured learning paths with verified certificates, an active global creator community, and a collaborative workspace. You learn, create, find co-founders, and track your growth in one seamless platform.',
    category: 'general'
  },
  {
    id: 'faq-2',
    question: 'Is Creatiq suitable for complete beginners with no technical background?',
    answer: 'Absolutely! Creatiq was built from the ground up to be human-friendly, intuitive, and plain-English. You do not need to know coding or complex prompt engineering. Our AI Learning Tutor guides you step-by-step through every feature.',
    category: 'general'
  },
  {
    id: 'faq-3',
    question: 'Can I find teammates or co-founders through the Creatiq Community?',
    answer: 'Yes! The Creatiq Community features a dedicated Teammate Matchmaker, study groups, hackathons, and regional squads where thousands of students, developers, designers, and entrepreneurs connect daily.',
    category: 'community'
  },
  {
    id: 'faq-4',
    question: 'What do I get with the Learning Hub certificates?',
    answer: 'Upon completing a learning path and submitting your capstone project, you earn a verified Creatiq Digital Certificate that can be embedded directly into your LinkedIn profile, portfolio, or resume with a unique verification link.',
    category: 'features'
  },
  {
    id: 'faq-5',
    question: 'Is my data secure and private?',
    answer: 'Yes. We take security seriously. Your workspace documents, AI chats, and personal data are encrypted in transit and at rest. We never use your private workspace data to train public AI models.',
    category: 'security'
  },
  {
    id: 'faq-6',
    question: 'Can I cancel or change my plan at any time?',
    answer: 'Yes! There are no long-term contracts. You can upgrade, downgrade, or cancel your subscription anytime with a single click from your account dashboard.',
    category: 'pricing'
  }
];

export const USER_SCENARIOS = [
  {
    id: 'student',
    role: 'Student',
    headline: 'Ace your exams & finish research papers in half the time',
    story: 'Maya opens Creatiq AI Research, drops 5 PDF textbook chapters, gets a synthesized study guide with key definitions, tests herself with the AI Tutor, and finishes her term paper with proper APA citations before dinner.',
    icon: 'GraduationCap',
    highlightStats: 'Save 12+ hours/week'
  },
  {
    id: 'creator',
    role: 'Creator',
    headline: 'Turn 1 idea into a week of multi-channel viral content',
    story: 'Leo inputs a single topic into AI Video Assistant. In 2 minutes, Creatiq outputs a 60-second video script, 3 high-converting thumbnail prompts, a newsletter draft, and 5 Twitter thread hooks.',
    icon: 'Sparkles',
    highlightStats: '5x content output'
  },
  {
    id: 'entrepreneur',
    role: 'Entrepreneur',
    headline: 'Build a pitch deck, financial model & website in 1 weekend',
    story: 'Alex uses AI Startup Advisor to critique his business model, AI Spreadsheet to build a 3-year cash flow forecast, AI Website Builder to code a landing page, and finds a lead developer in the Creatiq Community.',
    icon: 'Rocket',
    highlightStats: '₹0 spent on agencies'
  },
  {
    id: 'freelancer',
    role: 'Freelancer & Pro',
    headline: 'Deliver 10/10 client work faster without burning out',
    story: 'Elena leverages AI Coding and AI Writing to draft client proposals, optimize client React code, and manage her project deadlines in her unified Creatiq Workspace.',
    icon: 'Briefcase',
    highlightStats: 'Double client capacity'
  }
];
