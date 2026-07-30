import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Rocket, Sparkles, Clock, Send, CheckCircle2, ShieldCheck, ArrowRight, BellRing, MessageSquare, RefreshCw, HardDrive, Mail } from 'lucide-react';
import { useEcosystem } from '../context/EcosystemContext';

interface MvpLaunchSectionProps {
  onScrollToFounder?: () => void;
  onOpenDataExport?: () => void;
}

export const MvpLaunchSection: React.FC<MvpLaunchSectionProps> = ({ onScrollToFounder, onOpenDataExport }) => {
  const { activeCreatorsCount, lastPolledAt, pollRealTimeMetrics } = useEcosystem();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [activePhraseIndex, setActivePhraseIndex] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const targetWhatsAppNumber = '7980259343';
  const founderEmail = 'adikumarsharma06@gmail.com';

  const animatedPhrases = [
    "WAIT... OUR MVP LAUNCHES SOON!",
    "JUST WAIT AND WAIT.. SOMETHING BIG IS COMING!",
    "PREPARE FOR THE ULTIMATE CREATIQ AI ENGINE!",
    "NEXT-GEN CREATOR PLATFORM IS UNLOCKING SOON!"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActivePhraseIndex((prev) => (prev + 1) % animatedPhrases.length);
    }, 3800);
    return () => clearInterval(interval);
  }, [animatedPhrases.length]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setTimeout(() => {
        setEmail('');
        setSubmitted(false);
      }, 4000);
    }
  };

  const handleFounderClick = () => {
    if (onScrollToFounder) {
      onScrollToFounder();
    } else {
      const el = document.getElementById('founder');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleManualPoll = () => {
    setIsRefreshing(true);
    pollRealTimeMetrics();
    setTimeout(() => setIsRefreshing(false), 800);
  };

  const handleWhatsAppSend = () => {
    const text = encodeURIComponent(`*CREATIQ AI MVP LAUNCH ENQUIRY*\nHello Aditya, I want to inquire about Creatiq AI MVP access.\nReal Pioneer Count: ${activeCreatorsCount || 1}\nStatus: Ready in MVP 50%\nTimestamp: ${new Date().toLocaleString()}`);
    window.open(`https://wa.me/91${targetWhatsAppNumber}?text=${text}`, '_blank');
  };

  const handleEmailSend = () => {
    const subject = encodeURIComponent('Creatiq AI MVP Access & Data Enquiry');
    const body = encodeURIComponent(`Hello Aditya Sharma,\n\nI am contacting you regarding Creatiq AI MVP launch details and platform stats.\n\n- Active Pioneer Count: ${activeCreatorsCount || 1}\n- System Readiness: 99.9%\n- MVP Completion: 50%\n\nSent from Creatiq AI Launch Portal`);
    window.open(`mailto:${founderEmail}?subject=${subject}&body=${body}`, '_blank');
  };

  const handleDriveExport = () => {
    if (onOpenDataExport) {
      onOpenDataExport();
    } else {
      const element = document.createElement('a');
      const payload = {
        platform: 'Creatiq AI Studio',
        founder: 'Aditya Sharma',
        activeCreatorsCount: activeCreatorsCount || 1,
        mvpProgress: '50%',
        systemReadiness: '99.9%',
        contactEmail: founderEmail,
        contactWhatsApp: `+91 ${targetWhatsAppNumber}`,
        exportedAt: new Date().toISOString()
      };
      const file = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
      element.href = URL.createObjectURL(file);
      element.download = `Creatiq_AI_MVP_Data_Vault_${Date.now()}.json`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }
  };

  return (
    <section className="py-16 relative overflow-hidden bg-slate-950 border-t border-slate-900">
      {/* Background Animated Neon Mesh */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-cyan-950/40 via-purple-950/20 to-slate-950 pointer-events-none" />

      {/* Floating Animated Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.3, 0.6, 0.3],
          x: [0, 30, 0],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-cyan-600/20 blur-3xl pointer-events-none"
      />

      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.7, 0.3],
          x: [0, -30, 0],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-purple-600/20 blur-3xl pointer-events-none"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="bg-gradient-to-br from-slate-900/90 via-slate-950 to-slate-900/90 border border-cyan-500/40 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden backdrop-blur-2xl">
          
          {/* Top Live MVP Badge & 30s Polling Status */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <Rocket className="w-3.5 h-3.5 text-cyan-400" />
              <span>OFFICIAL MVP LAUNCH COUNTDOWN</span>
            </div>

            {/* Service Polling Status Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-[11px] font-mono font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Real-time 30s Polling Sync</span>
              {lastPolledAt && <span className="text-slate-400 font-normal">({lastPolledAt})</span>}
              <button
                onClick={handleManualPoll}
                title="Sync live user counts now"
                className="hover:text-white p-0.5 rounded transition-transform active:scale-90"
              >
                <RefreshCw className={`w-3 h-3 text-emerald-400 ${isRefreshing ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>

          {/* Animated Dynamic Text Banner */}
          <div className="min-h-[90px] sm:min-h-[110px] flex items-center justify-center mb-6">
            <AnimatePresence mode="wait">
              <motion.h2
                key={activePhraseIndex}
                initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="text-2xl sm:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 tracking-tight leading-tight uppercase font-mono drop-shadow-[0_0_25px_rgba(6,182,212,0.3)]"
              >
                {animatedPhrases[activePhraseIndex]}
              </motion.h2>
            </AnimatePresence>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed mb-8">
            Our engineering team is finalizing the full-scale production deployment of Creatiq AI v3.0. Be the first to receive exclusive VIP access as soon as the MVP goes live!
          </p>

          {/* Early Access Notification Form */}
          <div className="max-w-md mx-auto mb-8">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email for instant MVP launch alert..."
                className="flex-1 bg-slate-900/90 border border-slate-700/80 rounded-2xl px-4 py-3.5 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 shadow-inner"
              />
              <button
                type="submit"
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white font-bold text-xs sm:text-sm hover:opacity-95 transition-all shadow-xl shadow-cyan-950/60 flex items-center justify-center gap-2 whitespace-nowrap group cursor-pointer"
              >
                <BellRing className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                <span>Notify Me</span>
              </button>
            </form>

            {submitted && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>You're on the priority VIP list! We will notify you the second our MVP launches.</span>
              </motion.div>
            )}
          </div>

          {/* Direct Dispatch Channels (WhatsApp & Email) */}
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 max-w-lg mx-auto space-y-3 mb-10">
            <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-wider block text-center">
              Direct Communication & Launch Dispatch
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={handleWhatsAppSend}
                className="px-4 py-3 rounded-xl bg-emerald-950/50 border border-emerald-500/40 hover:bg-emerald-900/60 transition-all text-emerald-300 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <Send className="w-4 h-4 text-emerald-400" />
                <span>Send WhatsApp Message</span>
              </button>

              <button
                onClick={handleEmailSend}
                className="px-4 py-3 rounded-xl bg-cyan-950/50 border border-cyan-500/40 hover:bg-cyan-900/60 transition-all text-cyan-300 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <Mail className="w-4 h-4 text-cyan-400" />
                <span>Send Email Enquiry</span>
              </button>
            </div>
          </div>

          {/* Quick Real Metrics Bar */}
          <div className="pt-8 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="space-y-1 p-2 rounded-xl bg-slate-900/40 border border-slate-800/60">
              <div className="text-xl sm:text-2xl font-black text-cyan-300 font-mono">
                {activeCreatorsCount || 1}
              </div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Real Pioneers Joined</div>
            </div>

            <div className="space-y-1 p-2 rounded-xl bg-slate-900/40 border border-slate-800/60">
              <div className="text-xl sm:text-2xl font-black text-purple-300 font-mono">50%</div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Ready in MVP</div>
            </div>

            <div className="space-y-1 p-2 rounded-xl bg-slate-900/40 border border-slate-800/60">
              <div className="text-xl sm:text-2xl font-black text-emerald-300 font-mono">99.9%</div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">System Readiness</div>
            </div>

            <button
              onClick={handleFounderClick}
              className="space-y-1 p-2 rounded-xl bg-blue-950/40 border border-blue-500/40 hover:border-blue-400 hover:bg-blue-900/50 transition-all cursor-pointer group text-center"
              title="Click to view founder social media accounts and DM directly"
            >
              <div className="text-sm sm:text-base font-bold text-blue-300 font-mono group-hover:text-blue-200 flex items-center justify-center gap-1">
                <MessageSquare className="w-3.5 h-3.5 text-blue-400" />
                <span>DM on Socials</span>
              </div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold group-hover:text-cyan-300">Founder Support</div>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

