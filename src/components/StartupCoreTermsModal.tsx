import React, { useState } from 'react';
import { X, ShieldCheck, CheckCircle2, FileText, Cpu, Lock, HelpCircle, Sparkles, BookOpen, UserCheck, ArrowRight } from 'lucide-react';

interface StartupCoreTermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StartupCoreTermsModal: React.FC<StartupCoreTermsModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'how_it_works' | 'terms' | 'privacy' | 'community'>('how_it_works');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 sticky top-0 bg-slate-950/90 z-20 backdrop-blur-md">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 flex items-center justify-center text-white shadow-lg">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-white">Creatiq Startup Core Terms & Operational Model</h3>
              <p className="text-xs text-slate-400">Everything you need to know about how our ecosystem operates</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection Navigation */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800/80 pb-3">
          <button
            onClick={() => setActiveTab('how_it_works')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'how_it_works'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>How Creatiq Works</span>
          </button>

          <button
            onClick={() => setActiveTab('terms')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'terms'
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-sm'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Core Startup Terms</span>
          </button>

          <button
            onClick={() => setActiveTab('privacy')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'privacy'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Data Privacy & AI Security</span>
          </button>

          <button
            onClick={() => setActiveTab('community')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'community'
                ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40 shadow-sm'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>Community Guidelines</span>
          </button>
        </div>

        {/* Tab Content Display */}
        <div className="space-y-4 text-xs leading-relaxed text-slate-300">
          
          {/* TAB 1: HOW CREATIQ WORKS */}
          {activeTab === 'how_it_works' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="bg-slate-900/60 border border-cyan-500/30 rounded-2xl p-4 space-y-2">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  1. Unified All-in-One AI Platform
                </h4>
                <p className="text-slate-300">
                  Creatiq integrates 15 specialized AI modules — from instant full-stack code generation and AI research summaries to automated social graphics and project vaults. You don't need 10 different subscriptions.
                </p>
              </div>

              <div className="bg-slate-900/60 border border-purple-500/30 rounded-2xl p-4 space-y-2">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-purple-400" />
                  2. Learn by Building Real Projects
                </h4>
                <p className="text-slate-300">
                  Instead of passive videos, Creatiq provides hands-on interactive AI workflows. Get step-by-step guidance, code breakdowns, and instant sandboxes for web, mobile, and AI models.
                </p>
              </div>

              <div className="bg-slate-900/60 border border-emerald-500/30 rounded-2xl p-4 space-y-2">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-emerald-400" />
                  3. Global Creator & Startup Ecosystem
                </h4>
                <p className="text-slate-300">
                  Connect with co-founders, join global hackathons with cash prize pools, earn official verified Creator Passports, and share project milestones with thousands of active builders.
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: CORE STARTUP TERMS */}
          {activeTab === 'terms' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
                <h4 className="text-sm font-bold text-white">1. Ownership & Intellectual Property</h4>
                <p className="text-slate-300">
                  Everything you build, write, or generate using Creatiq AI is 100% owned by you. Creatiq claims zero IP rights over user-created code, art, documents, or startup projects.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
                <h4 className="text-sm font-bold text-white">2. Transparent Pricing & Free Plan Policy</h4>
                <p className="text-slate-300">
                  Creatiq offers a permanent Free Starter account with access to core AI tools and community hubs. Upgrades to Pro ($19/mo) or Team ($49/mo) can be canceled at any time with no lock-in fees.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
                <h4 className="text-sm font-bold text-white">3. Founder Commitment & Operational Uptime</h4>
                <p className="text-slate-300">
                  Led by Aditya Sharma (@startwithaadii), Creatiq guarantees 99.9% uptime across all neural engines and active customer support within 24 hours.
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: PRIVACY & AI SECURITY */}
          {activeTab === 'privacy' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-2">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Enterprise-Grade Encryption & Zero-Training Guarantee
                </h4>
                <p className="text-slate-300">
                  Your private project files and custom prompts are encrypted in transit and at rest. We never sell user data or train public models on your proprietary code.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
                <h4 className="text-sm font-bold text-white">Data Export & Account Controls</h4>
                <p className="text-slate-300">
                  You can export your workspace data, project history, and certificates at any time in JSON, ZIP, or PDF formats using our built-in Data Export modal.
                </p>
              </div>
            </div>
          )}

          {/* TAB 4: COMMUNITY GUIDELINES */}
          {activeTab === 'community' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
                <h4 className="text-sm font-bold text-white">Safe, Inclusive & Collaborative Space</h4>
                <p className="text-slate-300">
                  Creatiq strictly prohibits hate speech, spam, malicious code generation, or harassment in community study squads and hackathon boards.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
                <h4 className="text-sm font-bold text-white">Verified Creator Passports</h4>
                <p className="text-slate-300">
                  Members who contribute project showcases or complete learning modules earn verified badges on their Creator Passport profile.
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Footer Action */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
          <span className="text-[11px] text-slate-400 font-mono">
            Official Startup Terms v3.0 • Creatiq AI Inc.
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold text-xs hover:opacity-90 transition-all shadow-lg"
          >
            I Understand & Agree
          </button>
        </div>

      </div>
    </div>
  );
};
