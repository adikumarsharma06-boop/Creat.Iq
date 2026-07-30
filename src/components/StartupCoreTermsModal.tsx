import React, { useState } from 'react';
import { X, ShieldCheck, CheckCircle2, FileText, Cpu, Lock, Sparkles, BookOpen, UserCheck, ArrowRight, Zap, HeartHandshake, Compass, Layers } from 'lucide-react';

interface StartupCoreTermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StartupCoreTermsModal: React.FC<StartupCoreTermsModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'how_it_works' | 'working_style' | 'terms' | 'privacy'>('how_it_works');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-xl animate-in fade-in duration-200">
      
      {/* Outer Glow & Shimmer Container */}
      <div className="relative w-full max-w-3xl bg-slate-950/95 border border-cyan-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto glow-border-cyan overflow-hidden">
        
        {/* Ambient Light Shining Background Orbs */}
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-cyan-500/15 rounded-full blur-[100px] pointer-events-none animate-ambient-glow" />
        <div className="absolute bottom-0 left-10 w-72 h-72 bg-purple-500/15 rounded-full blur-[100px] pointer-events-none animate-ambient-glow" />

        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 sticky top-0 bg-slate-950/90 z-20 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600 p-0.5 shadow-lg shadow-cyan-950/60">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-cyan-400">
                <ShieldCheck className="w-5 h-5 animate-pulse" />
              </div>
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest">
                <Sparkles className="w-3 h-3 text-cyan-400" />
                <span>Simple & Transparent Guide</span>
              </div>
              <h3 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
                <span>Creatiq Core Terms & Working Style</span>
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Friendly Subtitle */}
        <div className="p-3.5 rounded-2xl bg-cyan-950/30 border border-cyan-500/20 text-xs text-slate-200 flex items-start gap-2.5">
          <Zap className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-cyan-300 font-bold">Written in Simple English:</strong> No complex legal jargon! We believe in 100% transparency so you can build, create, and launch with complete peace of mind.
          </p>
        </div>

        {/* Tab Selection Navigation */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800/80 pb-3 relative z-10">
          <button
            onClick={() => setActiveTab('how_it_works')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'how_it_works'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-950'
                : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span>How Creatiq Works</span>
          </button>

          <button
            onClick={() => setActiveTab('working_style')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'working_style'
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-sm shadow-purple-950'
                : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-purple-400" />
            <span>Our Working Style</span>
          </button>

          <button
            onClick={() => setActiveTab('terms')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'terms'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm shadow-emerald-950'
                : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-emerald-400" />
            <span>Core Terms & Ownership</span>
          </button>

          <button
            onClick={() => setActiveTab('privacy')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'privacy'
                ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40 shadow-sm shadow-blue-950'
                : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <Lock className="w-3.5 h-3.5 text-blue-400" />
            <span>Data Privacy Guarantee</span>
          </button>
        </div>

        {/* Tab Content Display */}
        <div className="space-y-4 text-xs leading-relaxed text-slate-300 relative z-10">
          
          {/* TAB 1: HOW CREATIQ WORKS */}
          {activeTab === 'how_it_works' && (
            <div className="space-y-3.5 animate-in fade-in duration-150">
              <div className="bg-slate-900/70 border border-cyan-500/30 rounded-2xl p-4 space-y-2 relative overflow-hidden group hover:border-cyan-500/50 transition-all">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    1. 15 Powerful AI Tools in One Place
                  </h4>
                  <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded-full border border-cyan-500/30">
                    No multi-subscription chaos
                  </span>
                </div>
                <p className="text-slate-300 text-xs">
                  Instead of paying separately for code generators, research tools, visual builders, and pitch deck makers, Creatiq provides 15 specialized AI modules under one single dashboard.
                </p>
              </div>

              <div className="bg-slate-900/70 border border-purple-500/30 rounded-2xl p-4 space-y-2 relative overflow-hidden group hover:border-purple-500/50 transition-all">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-purple-400" />
                    2. Learn by Real Hands-On Building
                  </h4>
                  <span className="text-[10px] font-mono text-purple-300 bg-purple-950/60 px-2 py-0.5 rounded-full border border-purple-500/30">
                    Interactive Sandboxes
                  </span>
                </div>
                <p className="text-slate-300 text-xs">
                  We skip boring, passive video lectures! You learn by crafting real projects with interactive live sandboxes, smart code breakdowns, and real-time step-by-step guidance.
                </p>
              </div>

              <div className="bg-slate-900/70 border border-emerald-500/30 rounded-2xl p-4 space-y-2 relative overflow-hidden group hover:border-emerald-500/50 transition-all">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-emerald-400" />
                    3. Global Network of 18 Creator Hubs
                  </h4>
                  <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/30">
                    Global Community
                  </span>
                </div>
                <p className="text-slate-300 text-xs">
                  Connect with fellow builders across San Francisco, London, Bengaluru, Tokyo, and 14 other global hubs. Participate in live hackathons, share milestones, and earn verified Creator Passports.
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: OUR WORKING STYLE & CULTURE */}
          {activeTab === 'working_style' && (
            <div className="space-y-3.5 animate-in fade-in duration-150">
              <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Zap className="w-4 h-4 text-cyan-400" />
                  Speed & Execution First
                </h4>
                <p className="text-slate-300 text-xs">
                  We help creators turn raw ideas into working MVPs within hours instead of months. Our AI engines streamline code scaffolding, architecture setup, and visual design out of the box.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <HeartHandshake className="w-4 h-4 text-purple-400" />
                  Community-Driven Growth
                </h4>
                <p className="text-slate-300 text-xs">
                  No builder gets left behind. Whether you need feedback on a landing page, help debugging an API route, or looking for a co-founder, our global study squads are active 24/7.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Layers className="w-4 h-4 text-emerald-400" />
                  Modular & Scalable Architecture
                </h4>
                <p className="text-slate-300 text-xs">
                  Everything you generate on Creatiq uses production-standard clean code (TypeScript, React, Tailwind CSS, Express). You can easily export your project to GitHub or deploy to Cloud Run at any time.
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: CORE TERMS & OWNERSHIP */}
          {activeTab === 'terms' && (
            <div className="space-y-3.5 animate-in fade-in duration-150">
              <div className="p-4 rounded-2xl bg-slate-900/70 border border-emerald-500/30 space-y-2">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  1. You Own 100% of Your Code & Intellectual Property
                </h4>
                <p className="text-slate-300 text-xs">
                  Everything you write, design, or generate on Creatiq belongs entirely to you. We claim <strong className="text-emerald-300 font-bold">zero ownership rights</strong> over your code, app assets, pitch decks, or startup ideas.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  2. Honest & Clear Pricing Policy
                </h4>
                <p className="text-slate-300 text-xs">
                  Our Starter plan is 100% free forever. If you choose to upgrade to Pro ($19/mo) or Pioneer ($49/mo) for advanced AI quotas, you can cancel anytime in one click with zero hidden cancellation fees.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-400" />
                  3. Direct Founder Commitment
                </h4>
                <p className="text-slate-300 text-xs">
                  Led by founder Aditya Sharma, our engineering team guarantees 99.9% ecosystem uptime, continuous AI model upgrades, and fast community support.
                </p>
              </div>
            </div>
          )}

          {/* TAB 4: DATA PRIVACY GUARANTEE */}
          {activeTab === 'privacy' && (
            <div className="space-y-3.5 animate-in fade-in duration-150">
              <div className="p-4 rounded-2xl bg-blue-950/30 border border-blue-500/30 space-y-2">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Lock className="w-4 h-4 text-blue-400" />
                  Zero Public Training & Encrypted Data Vault
                </h4>
                <p className="text-slate-300 text-xs">
                  Your private project prompts and source code are encrypted in transit and at rest. We <strong className="text-blue-300 font-bold">never sell your data</strong> or use your proprietary ideas to train public models.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  Full Control Over Data Export
                </h4>
                <p className="text-slate-300 text-xs">
                  You can download your entire workspace backup, project history, and certificates at any time in standard JSON format using our integrated Data Export Vault.
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Footer Action */}
        <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between relative z-10">
          <span className="text-[11px] text-slate-400 font-mono">
            Creatiq Terms v3.2 • Founder Verified ✨
          </span>
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white font-bold text-xs hover:opacity-95 transition-all shadow-lg shadow-cyan-950/80 cursor-pointer flex items-center gap-2"
          >
            <span>I Understand & Agree</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};

