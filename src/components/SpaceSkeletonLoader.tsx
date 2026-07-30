import React from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

interface SpaceSkeletonProps {
  className?: string;
}

export const SpaceShimmerBar: React.FC<SpaceSkeletonProps> = ({ className = 'h-4 w-full rounded-lg' }) => {
  return (
    <div className={`relative overflow-hidden bg-slate-900/80 border border-slate-800/80 ${className}`}>
      {/* Animated Cosmic Shimmer Light Beam */}
      <motion.div
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-cyan-500/15 via-purple-500/20 to-transparent"
        animate={{ translateX: ['-100%', '200%'] }}
        transition={{
          repeat: Infinity,
          duration: 1.8,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
};

export const SpaceCardSkeleton: React.FC<{ variant?: 'tool' | 'post' | 'course' | 'workspace' }> = ({ variant = 'tool' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.3 }}
      className="bg-slate-900/50 border border-slate-800/80 rounded-2xl p-6 relative overflow-hidden backdrop-blur-md flex flex-col justify-between space-y-4 shadow-xl"
    >
      {/* Ambient Pulsing Cosmic Glow */}
      <motion.div
        className="absolute -top-10 -right-10 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none"
        animate={{ opacity: [0.3, 0.7, 0.3], scale: [0.9, 1.1, 0.9] }}
        transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-10 -left-10 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none"
        animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
      />

      {/* Top Header Row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-800/80 border border-slate-700/50 relative overflow-hidden shrink-0">
            <SpaceShimmerBar className="w-full h-full rounded-xl" />
          </div>
          <div className="space-y-1.5 w-32">
            <SpaceShimmerBar className="h-4 w-28 rounded-md" />
            <SpaceShimmerBar className="h-3 w-16 rounded-md" />
          </div>
        </div>
        <SpaceShimmerBar className="h-5 w-16 rounded-full" />
      </div>

      {/* Content Lines */}
      <div className="space-y-2 py-1">
        <SpaceShimmerBar className="h-3.5 w-full rounded-md" />
        <SpaceShimmerBar className="h-3.5 w-4/5 rounded-md" />
        {variant !== 'workspace' && <SpaceShimmerBar className="h-3.5 w-2/3 rounded-md" />}
      </div>

      {/* Code or Box Sample for Tool/Course variant */}
      {(variant === 'tool' || variant === 'course') && (
        <div className="bg-slate-950/70 rounded-xl p-3 border border-slate-800/80 space-y-2">
          <SpaceShimmerBar className="h-2.5 w-20 rounded" />
          <SpaceShimmerBar className="h-3 w-5/6 rounded" />
        </div>
      )}

      {/* Footer Row */}
      <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between">
        <SpaceShimmerBar className="h-3 w-24 rounded" />
        <SpaceShimmerBar className="h-7 w-20 rounded-lg" />
      </div>
    </motion.div>
  );
};

export const SpaceGridSkeleton: React.FC<{ count?: number; variant?: 'tool' | 'post' | 'course' | 'workspace' }> = ({
  count = 6,
  variant = 'tool',
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      {Array.from({ length: count }).map((_, i) => (
        <SpaceCardSkeleton key={i} variant={variant} />
      ))}
    </div>
  );
};

export const SpaceChatSkeleton: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      className="p-4 rounded-2xl bg-slate-900/90 border border-cyan-500/30 text-slate-100 space-y-3 relative overflow-hidden backdrop-blur-md max-w-2xl"
    >
      {/* Scanning Laser Beam Effect */}
      <motion.div
        className="absolute inset-y-0 w-24 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent pointer-events-none"
        animate={{ x: ['-100%', '600%'] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
      />

      <div className="flex items-center gap-2 border-b border-slate-800/80 pb-2">
        <div className="w-5 h-5 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300">
          <Sparkles className="w-3 h-3 animate-spin" />
        </div>
        <span className="text-[11px] font-mono font-bold text-cyan-300">Generating AI Response...</span>
      </div>

      <div className="space-y-2 pt-1">
        <SpaceShimmerBar className="h-3.5 w-full rounded-md" />
        <SpaceShimmerBar className="h-3.5 w-11/12 rounded-md" />
        <SpaceShimmerBar className="h-3.5 w-4/5 rounded-md" />
        <SpaceShimmerBar className="h-3.5 w-2/3 rounded-md" />
      </div>
    </motion.div>
  );
};
