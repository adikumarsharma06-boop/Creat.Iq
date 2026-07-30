import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, X, Sparkles, ShieldCheck } from 'lucide-react';
import { useEcosystem } from '../context/EcosystemContext';

export const AutoFadeToast: React.FC = () => {
  const { toastNotification, clearToast } = useEcosystem();
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (!toastNotification) {
      setProgress(100);
      return;
    }

    setProgress(100);
    const intervalTime = 50; // update progress every 50ms
    const totalSteps = 5000 / intervalTime;
    const decrement = 100 / totalSteps;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev <= decrement) {
          clearInterval(interval);
          return 0;
        }
        return prev - decrement;
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, [toastNotification]);

  return (
    <AnimatePresence>
      {toastNotification && (
        <motion.div
          key={toastNotification.id}
          initial={{ opacity: 0, y: -40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -30, scale: 0.95 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="fixed top-5 right-5 z-[100] max-w-sm w-full bg-slate-900/95 border border-cyan-500/50 rounded-2xl p-4 shadow-2xl backdrop-blur-xl overflow-hidden"
        >
          {/* Header & Icon */}
          <div className="flex items-start gap-3 relative z-10">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 p-0.5 shrink-0 shadow-lg shadow-cyan-950/60">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center text-cyan-400">
                <Sparkles className="w-4 h-4 animate-pulse" />
              </div>
            </div>

            <div className="flex-1 min-w-0 pr-2">
              <div className="text-xs font-black text-white flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>{toastNotification.title}</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-snug mt-1">
                {toastNotification.message}
              </p>
            </div>

            <button
              onClick={clearToast}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* 5-Second Progress Countdown Bar */}
          <div className="mt-3.5 w-full bg-slate-800 h-1 rounded-full overflow-hidden">
            <motion.div
              className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 h-full"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'linear' }}
            />
          </div>

          {/* Countdown indicator */}
          <div className="flex justify-between items-center mt-1 text-[9px] font-mono text-slate-500">
            <span>Auto-fading status</span>
            <span>5s timer</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
