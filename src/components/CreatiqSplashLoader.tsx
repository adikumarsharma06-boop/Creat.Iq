import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Cpu, Zap, ShieldCheck, Rocket, Globe } from 'lucide-react';
import { NLogo } from './NLogo';

interface CreatiqSplashLoaderProps {
  onComplete?: () => void;
  autoHideDuration?: number;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  duration: number;
  delay: number;
  targetX: number;
  targetY: number;
}

export const CreatiqSplashLoader: React.FC<CreatiqSplashLoaderProps> = ({
  onComplete,
  autoHideDuration = 2400,
}) => {
  const [progress, setProgress] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [isWarping, setIsWarping] = useState(false);

  const statusMessages = [
    'Initializing Creatiq Cosmic Core...',
    'Loading Neural AI Engine v2.4...',
    'Generating 15 AI Tool Schematics...',
    'Connecting Global Creator Nodes...',
    'Syncing Encrypted Data Backup...',
    'Creatiq Space Portal Online!'
  ];

  // Generate 60 space particles with deterministic positions and colors
  const particles: Particle[] = useMemo(() => {
    const colors = [
      'rgba(34, 211, 238, 0.85)', // cyan
      'rgba(168, 85, 247, 0.85)', // purple
      'rgba(236, 72, 153, 0.85)', // pink
      'rgba(52, 211, 153, 0.85)', // emerald
      'rgba(255, 255, 255, 0.9)',  // white
    ];

    return Array.from({ length: 55 }).map((_, i) => {
      const angle = Math.random() * Math.PI * 2;
      const distance = 100 + Math.random() * 400;
      return {
        id: i,
        x: (Math.random() - 0.5) * 100, // percentage from center
        y: (Math.random() - 0.5) * 100,
        size: Math.random() * 3.5 + 1,
        color: colors[i % colors.length],
        duration: 2 + Math.random() * 3,
        delay: Math.random() * 0.8,
        targetX: Math.cos(angle) * distance,
        targetY: Math.sin(angle) * distance,
      };
    });
  }, []);

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.floor((elapsed / autoHideDuration) * 100));
      setProgress(pct);

      const idx = Math.min(
        statusMessages.length - 1,
        Math.floor((pct / 100) * statusMessages.length)
      );
      setStatusIndex(idx);

      if (pct >= 100) {
        clearInterval(interval);
        setIsWarping(true); // Trigger space warp hyper-drive transition

        setTimeout(() => {
          setVisible(false);
          if (onComplete) onComplete();
        }, 500);
      }
    }, 35);

    return () => clearInterval(interval);
  }, [autoHideDuration, onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="creatiq-splash-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] bg-slate-950 flex items-center justify-center overflow-hidden select-none"
        >
          {/* Deep Space Background Canvas */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black" />

          {/* Glowing Nebula Cloud Layer */}
          <motion.div
            animate={{
              opacity: [0.35, 0.65, 0.35],
              scale: [1, 1.12, 1],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-cyan-600/20 via-purple-600/25 to-pink-600/20 blur-[120px] pointer-events-none"
          />

          {/* Cosmic Space Grid Lines */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

          {/* Animated Floating Space Particles */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {particles.map((p) => (
              <motion.div
                key={p.id}
                initial={{
                  x: `${50 + p.x}%`,
                  y: `${50 + p.y}%`,
                  scale: 0.2,
                  opacity: 0.2,
                }}
                animate={
                  isWarping
                    ? {
                        x: `calc(50% + ${p.targetX * 2.5}px)`,
                        y: `calc(50% + ${p.targetY * 2.5}px)`,
                        scale: [1, 8],
                        opacity: [1, 0],
                      }
                    : {
                        x: [
                          `calc(50% + ${p.x}% - 10px)`,
                          `calc(50% + ${p.x}% + 10px)`,
                          `calc(50% + ${p.x}% - 10px)`,
                        ],
                        y: [
                          `calc(50% + ${p.y}% - 10px)`,
                          `calc(50% + ${p.y}% + 10px)`,
                          `calc(50% + ${p.y}% - 10px)`,
                        ],
                        opacity: [0.3, 0.9, 0.3],
                        scale: [0.8, 1.4, 0.8],
                      }
                }
                transition={
                  isWarping
                    ? { duration: 0.45, ease: 'easeIn' }
                    : {
                        duration: p.duration,
                        repeat: Infinity,
                        delay: p.delay,
                        ease: 'easeInOut',
                      }
                }
                style={{
                  width: `${p.size}px`,
                  height: `${p.size}px`,
                  backgroundColor: p.color,
                  boxShadow: `0 0 10px ${p.color}`,
                }}
                className="absolute rounded-full"
              />
            ))}
          </div>

          {/* Central Cosmic Ring System & Core Badge */}
          <div className="relative flex items-center justify-center">
            
            {/* Outer Spinning Ring 1 (Cyan/Purple Gradient) */}
            <motion.div
              animate={
                isWarping
                  ? { scale: 2.2, opacity: 0, rotate: 360 }
                  : { rotate: 360 }
              }
              transition={
                isWarping
                  ? { duration: 0.45 }
                  : { duration: 12, repeat: Infinity, ease: 'linear' }
              }
              className="w-80 h-80 rounded-full border border-cyan-500/30 border-t-cyan-400 border-r-purple-500/60 shadow-[0_0_30px_rgba(34,211,238,0.15)]"
            />

            {/* Counter-Spinning Ring 2 (Purple/Pink Gradient) */}
            <motion.div
              animate={
                isWarping
                  ? { scale: 1.8, opacity: 0, rotate: -360 }
                  : { rotate: -360 }
              }
              transition={
                isWarping
                  ? { duration: 0.45 }
                  : { duration: 8, repeat: Infinity, ease: 'linear' }
              }
              className="absolute w-64 h-64 rounded-full border border-purple-500/30 border-b-pink-400 border-l-emerald-400/60 shadow-[0_0_25px_rgba(168,85,247,0.15)]"
            />

            {/* Inner Pulsing Energy Orb */}
            <motion.div
              animate={{
                scale: isWarping ? [1, 3] : [0.95, 1.08, 0.95],
                opacity: isWarping ? 0 : [0.4, 0.8, 0.4],
              }}
              transition={{
                duration: isWarping ? 0.45 : 2.5,
                repeat: isWarping ? 0 : Infinity,
                ease: 'easeInOut',
              }}
              className="absolute w-44 h-44 rounded-full bg-gradient-to-tr from-cyan-500/20 via-purple-600/30 to-pink-500/20 blur-2xl pointer-events-none"
            />

            {/* Center Content Box */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={
                isWarping
                  ? { scale: 1.15, opacity: 0 }
                  : { scale: 1, opacity: 1 }
              }
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="absolute flex flex-col items-center text-center space-y-4 px-6 max-w-xs sm:max-w-sm"
            >
              
              {/* Glowing N Logo Badge */}
              <motion.div
                animate={{
                  y: isWarping ? 0 : [-3, 3, -3],
                  rotate: isWarping ? 180 : 0,
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="relative"
              >
                <NLogo size="2xl" animated={true} />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-purple-400 rounded-full border-2 border-slate-950 animate-ping" />
              </motion.div>

              {/* Title Header */}
              <div className="space-y-1">
                <motion.h1
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 tracking-wider font-sans"
                >
                  c.iq <span className="text-white font-sans">CREATIQ</span> <span className="text-cyan-400 font-mono text-xl sm:text-2xl">[AI CORE]</span>
                </motion.h1>
                <p className="text-[10px] sm:text-xs text-indigo-300/90 font-mono tracking-widest uppercase font-semibold">
                  Dark Blue & Neon Purple Engine • Active
                </p>
              </div>

              {/* Progress Bar Container */}
              <div className="w-full space-y-2 pt-2">
                <div className="w-full bg-slate-900/90 border border-slate-800/80 h-2.5 rounded-full overflow-hidden p-0.5 shadow-inner backdrop-blur-md">
                  <motion.div
                    className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 h-full rounded-full shadow-sm shadow-cyan-400"
                    style={{ width: `${progress}%` }}
                    transition={{ ease: 'linear' }}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 px-1">
                  <span className="flex items-center gap-1 text-cyan-400">
                    <Zap className="w-3 h-3 text-cyan-400" />
                    <span>SYSTEM BOOT</span>
                  </span>
                  <span className="font-bold text-white font-mono">{progress}%</span>
                </div>
              </div>

              {/* Dynamic Animated Status Text */}
              <div className="h-6 flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={statusIndex}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                    className="text-xs font-mono text-purple-300 flex items-center gap-1.5"
                  >
                    <Cpu className="w-3.5 h-3.5 text-cyan-400 shrink-0 animate-spin" style={{ animationDuration: '3s' }} />
                    <span className="truncate max-w-[240px]">{statusMessages[statusIndex]}</span>
                  </motion.div>
                </AnimatePresence>
              </div>

            </motion.div>
          </div>

          {/* Bottom Security Tag */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-[10px] font-mono text-slate-400 backdrop-blur-md">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>256-Bit Encrypted Space Neural Matrix</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
