import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AI_FEATURES } from '../data/mockData';
import { AIFeature } from '../types';
import {
  MessageSquareText, Search, PenTool, Code2, TrendingUp, Rocket, Megaphone,
  GraduationCap, FileText, Layout, Table, Globe, Sparkles, Video, CheckCircle2,
  Filter, ArrowRight, Play, Terminal, Zap, ExternalLink, Lock, Crown, ShieldCheck
} from 'lucide-react';
import { useUser } from '../context/UserContext';
import { SubscriptionLockModal } from './SubscriptionLockModal';
import { SpaceGridSkeleton } from './SpaceSkeletonLoader';

interface AIFeaturesProps {
  onSelectFeatureForSandbox: (feature: AIFeature) => void;
  onOpenPaymentModal?: () => void;
}

export const AIFeatures: React.FC<AIFeaturesProps> = ({
  onSelectFeatureForSandbox,
  onOpenPaymentModal,
}) => {
  const { isSubscribed } = useUser();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [lockedModalFeature, setLockedModalFeature] = useState<AIFeature | null>(null);
  const [isLoadingTools, setIsLoadingTools] = useState<boolean>(false);

  useEffect(() => {
    setIsLoadingTools(true);
    const timer = setTimeout(() => {
      setIsLoadingTools(false);
    }, 280);
    return () => clearTimeout(timer);
  }, [activeCategory, searchQuery]);

  const categories = [
    { id: 'all', label: 'All 15 AI Tools' },
    { id: 'creation', label: 'Content & Creation' },
    { id: 'business', label: 'Business & Startup' },
    { id: 'learning', label: 'Learning & Research' },
    { id: 'coding', label: 'Coding & Web' },
    { id: 'productivity', label: 'Productivity' },
  ];

  const handleToolClick = (feature: AIFeature) => {
    if (feature.isLocked && !isSubscribed) {
      setLockedModalFeature(feature);
    } else {
      onSelectFeatureForSandbox(feature);
    }
  };

  const getFeatureIcon = (iconName: string) => {
    switch (iconName) {
      case 'MessageSquareText': return <MessageSquareText className="w-5 h-5" />;
      case 'Search': return <Search className="w-5 h-5" />;
      case 'PenTool': return <PenTool className="w-5 h-5" />;
      case 'Code2': return <Code2 className="w-5 h-5" />;
      case 'TrendingUp': return <TrendingUp className="w-5 h-5" />;
      case 'Rocket': return <Rocket className="w-5 h-5" />;
      case 'Megaphone': return <Megaphone className="w-5 h-5" />;
      case 'GraduationCap': return <GraduationCap className="w-5 h-5" />;
      case 'FileText': return <FileText className="w-5 h-5" />;
      case 'Layout': return <Layout className="w-5 h-5" />;
      case 'Table': return <Table className="w-5 h-5" />;
      case 'Globe': return <Globe className="w-5 h-5" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5" />;
      case 'Video': return <Video className="w-5 h-5" />;
      case 'CheckCircle2': return <CheckCircle2 className="w-5 h-5" />;
      default: return <Sparkles className="w-5 h-5" />;
    }
  };

  const filteredFeatures = AI_FEATURES.filter((feature) => {
    const matchesCategory = activeCategory === 'all' || feature.category === activeCategory;
    const matchesSearch =
      feature.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      feature.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      feature.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="features" className="py-24 bg-slate-950 relative overflow-hidden border-t border-slate-900">
      {/* Background Aurora */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Subscription Lock Alert Modal */}
      <SubscriptionLockModal
        isOpen={!!lockedModalFeature}
        onClose={() => setLockedModalFeature(null)}
        feature={lockedModalFeature}
        onBuySubscription={() => {
          if (onOpenPaymentModal) {
            onOpenPaymentModal();
          }
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            15 Integrated Core AI Capabilities
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Every AI Tool You Need.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
              One Intelligent Platform.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Explore Creatiq’s complete suite of specialized AI tools. The top 8 most used tools are locked for Pro Subscribers. Buy a subscription to unlock full access.
          </p>

          {/* Subscription Banner Status Notice */}
          {!isSubscribed ? (
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold shadow-lg mt-2">
              <Lock className="w-4 h-4 text-amber-400 animate-pulse shrink-0" />
              <span>Top 8 Most Used Tools are Locked • Buy a Pro Subscription (starting at ₹99/mo) to unlock</span>
              {onOpenPaymentModal && (
                <button
                  onClick={onOpenPaymentModal}
                  className="ml-2 px-2.5 py-1 rounded-lg bg-amber-500 text-slate-950 font-black text-[11px] hover:bg-amber-400 transition-colors flex items-center gap-1"
                >
                  <Crown className="w-3 h-3" />
                  <span>Unlock Now</span>
                </button>
              )}
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold shadow-lg mt-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>PRO Subscription Active • All 15 AI Tools Unlocked!</span>
            </div>
          )}
        </div>

        {/* Search & Category Filter Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12 bg-slate-900/80 border border-slate-800 p-3 rounded-2xl backdrop-blur-md">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  activeCategory === cat.id
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-md shadow-cyan-950/40'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-64 shrink-0">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search AI features..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/60"
            />
          </div>

        </div>

        {/* Features Cards Grid */}
        <AnimatePresence mode="wait">
          {isLoadingTools ? (
            <motion.div
              key="skeleton-tools"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <SpaceGridSkeleton count={6} variant="tool" />
            </motion.div>
          ) : (
            <motion.div
              key="actual-tools"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredFeatures.map((feature) => {
                const isToolLocked = feature.isLocked && !isSubscribed;

                return (
                  <div
                    key={feature.id}
                    onClick={() => handleToolClick(feature)}
                    className={`bg-slate-900/60 border rounded-2xl p-6 backdrop-blur-md transition-all hover:-translate-y-1.5 flex flex-col justify-between group cursor-pointer relative overflow-hidden ${
                      isToolLocked
                        ? 'border-amber-500/40 hover:border-amber-400 hover:shadow-2xl hover:shadow-amber-950/40 bg-gradient-to-b from-amber-950/10 to-slate-900/80'
                        : 'border-slate-800/80 hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-950/30'
                    }`}
                  >
                    {/* Subtle Ambient Hover Glow */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform pointer-events-none" />

                    {/* Top Lock Tag Banner for Locked Tools */}
                    {isToolLocked && (
                      <div className="bg-amber-500/20 border-b border-amber-500/30 -mx-6 -mt-6 mb-4 px-6 py-1.5 flex items-center justify-between text-[11px] font-bold text-amber-300">
                        <div className="flex items-center gap-1.5">
                          <Lock className="w-3.5 h-3.5 text-amber-400" />
                          <span>PRO Subscription Required</span>
                        </div>
                        <span className="text-[10px] bg-amber-500 text-slate-950 px-2 py-0.5 rounded-full font-black">LOCKED</span>
                      </div>
                    )}

                    <div>
                      {/* Header: Icon + Badge */}
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${feature.accentColor} p-[1px]`}>
                          <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform relative">
                            {getFeatureIcon(feature.iconName)}
                            {isToolLocked && (
                              <div className="absolute inset-0 bg-slate-950/80 rounded-[11px] flex items-center justify-center text-amber-400">
                                <Lock className="w-4 h-4" />
                              </div>
                            )}
                          </div>
                        </div>

                        {isToolLocked ? (
                          <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[10px] font-bold flex items-center gap-1">
                            <Crown className="w-3 h-3 text-amber-400" /> Top 8 Locked
                          </span>
                        ) : feature.badge ? (
                          <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-[10px] font-bold">
                            {feature.badge}
                          </span>
                        ) : null}
                      </div>

                      {/* Title & Subtitle */}
                      <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors flex items-center justify-between">
                        <span>{feature.title}</span>
                        {isToolLocked && <Lock className="w-4 h-4 text-amber-400 shrink-0" />}
                      </h3>
                      
                      <p className="text-xs text-slate-400 font-medium mb-3">
                        {feature.subtitle}
                      </p>

                      {/* Description */}
                      <p className="text-xs text-slate-300 leading-relaxed mb-4 line-clamp-3">
                        {feature.description}
                      </p>

                      {/* Interactive Sample Prompt Preview Box */}
                      <div className="bg-slate-950/80 rounded-xl p-3 border border-slate-800 text-[11px] font-mono text-slate-300 mb-4 group-hover:border-cyan-500/30 transition-colors">
                        <span className="text-slate-500 block text-[10px] uppercase font-sans mb-1 font-semibold">Sample Prompt:</span>
                        <p className="line-clamp-2 text-cyan-200/90 italic">"{feature.samplePrompt}"</p>
                      </div>
                    </div>

                    {/* Card Footer */}
                    <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs">
                      <span className="text-slate-400 text-[11px] font-medium">{feature.stats}</span>
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToolClick(feature);
                        }}
                        className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 text-xs ${
                          isToolLocked
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 group-hover:bg-amber-500 group-hover:text-slate-950'
                            : 'bg-cyan-500/10 text-cyan-300 group-hover:bg-cyan-500 group-hover:text-slate-950'
                        }`}
                      >
                        {isToolLocked ? (
                          <>
                            <Lock className="w-3 h-3" />
                            <span>Unlock Tool</span>
                          </>
                        ) : (
                          <>
                            <span>Test Live</span>
                            <ExternalLink className="w-3 h-3" />
                          </>
                        )}
                      </button>
                    </div>

                  </div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom CTA Banner for Features */}
        <div className="mt-16 bg-gradient-to-r from-slate-900 via-amber-950/30 to-slate-900 border border-amber-500/30 rounded-3xl p-8 text-center flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-left space-y-1">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Crown className="w-5 h-5 text-amber-400" />
              <span>Unlock All Top 8 Most Used AI Tools</span>
            </h3>
            <p className="text-xs text-slate-300">
              Get unlimited access to AI Chat, AI Coding, Deep Research, 4K Image Generation, and more starting at ₹99/month.
            </p>
          </div>

          <button
            onClick={() => {
              if (onOpenPaymentModal) onOpenPaymentModal();
            }}
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-cyan-500 to-purple-600 text-slate-950 font-black text-xs hover:opacity-95 transition-all shadow-lg shadow-amber-950/50 flex items-center gap-2 shrink-0"
          >
            <Lock className="w-4 h-4" />
            <span>Buy Subscription to Unlock Top 8 Tools</span>
          </button>
        </div>

      </div>
    </section>
  );
};
