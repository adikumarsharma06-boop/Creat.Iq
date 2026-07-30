import React from 'react';
import { SpaceGlobe } from './3d/SpaceGlobe';
import { Sparkles, ArrowRight, Play, Users, Cpu, Shield, Zap, Globe2, Rocket, CheckCircle2, Download } from 'lucide-react';
import { useEcosystem } from '../context/EcosystemContext';

interface HeroProps {
  onOpenSandbox: () => void;
  onOpenCreatorCard: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenSandbox,
  onOpenCreatorCard,
}) => {
  const { activeCreatorsCount, globalHubsCount, aiTasksCompleted } = useEcosystem();
  return (
    <section id="hero" className="relative min-h-[92vh] flex items-center justify-center pt-8 pb-16 overflow-hidden bg-slate-950">
      {/* Background Aurora / Space Glow Radial Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-tr from-cyan-600/15 via-blue-600/10 to-purple-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-[450px] h-[450px] bg-cyan-500/10 rounded-full blur-[130px] pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.8) 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

          {/* Left Column: Typography & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">

            {/* Badge Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 text-cyan-300 text-xs font-semibold backdrop-blur-md shadow-lg shadow-cyan-950/30">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300">
                Next-Gen AI Platform & Community
              </span>
              <span className="px-1.5 py-0.2 rounded bg-cyan-500/20 text-[10px] text-cyan-200 uppercase font-mono">
                Ecosystem
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
              Create Smarter.{' '}
              <span className="block mt-1 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
                Grow Faster.
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              The AI-powered ecosystem where students, creators, freelancers, entrepreneurs, and teams{' '}
              <strong className="text-white font-medium">learn, build projects, collaborate,</strong> and grow together in one intelligent platform.
            </p>

            {/* Floating Orbit Quick Feature Chips */}
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start pt-1 text-xs">
              {[
                { label: 'AI Research & Synthesis', color: 'border-cyan-500/40 text-cyan-300 bg-cyan-950/40' },
                { label: 'Full-Stack Code Assistant', color: 'border-blue-500/40 text-blue-300 bg-blue-950/40' },
                { label: 'Startup Advisor & Pitch', color: 'border-purple-500/40 text-purple-300 bg-purple-950/40' },
                { label: 'Socratic Learning Tutor', color: 'border-emerald-500/40 text-emerald-300 bg-emerald-950/40' },
              ].map((chip) => (
                <span
                  key={chip.label}
                  className={`px-3 py-1 rounded-lg border font-medium flex items-center gap-1.5 backdrop-blur-sm ${chip.color}`}
                >
                  <Sparkles className="w-3 h-3 opacity-80" />
                  {chip.label}
                </span>
              ))}
            </div>

            {/* Action CTAs */}
            <div className="pt-3 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
              <a
                href="#pricing"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white font-bold text-sm hover:opacity-95 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-cyan-500/25 flex items-center justify-center gap-2.5 group cursor-pointer"
              >
                <span>Start Free Account</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <button
                onClick={onOpenSandbox}
                className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-slate-900/60 border border-cyan-500/40 hover:border-cyan-400 text-cyan-300 font-semibold text-sm transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 backdrop-blur-md hover:bg-slate-900/90 shadow-lg cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
                <span>Launch Live AI Sandbox</span>
              </button>
            </div>

            {/* Trust Metrics Bar */}
            <div className="pt-6 border-t border-slate-800/60 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center lg:text-left">
              <div>
                <div className="text-xl sm:text-2xl font-extrabold text-white font-mono">15</div>
                <div className="text-xs text-slate-400 font-medium">Integrated AI Tools</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-extrabold text-cyan-400 font-mono">{activeCreatorsCount}</div>
                <div className="text-xs text-slate-400 font-medium">Active Creators</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-extrabold text-purple-400 font-mono">{globalHubsCount}</div>
                <div className="text-xs text-slate-400 font-medium">Global Hubs</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-extrabold text-emerald-400 font-mono">{aiTasksCompleted}</div>
                <div className="text-xs text-slate-400 font-medium">AI Tasks Completed</div>
              </div>
            </div>

          </div>

          {/* Right Column: Full Interactive 3D Earth Globe */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            {/* Ambient Background Glow ring for Globe */}
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/25 via-blue-600/15 to-purple-600/25 rounded-full blur-3xl -z-10" />

            {/* 3D Earth Component */}
            <div className="w-full relative group">
              <SpaceGlobe className="w-full" />

              {/* Floating AI Status Badges attached to Globe space */}
              <div className="hidden sm:flex absolute top-2 right-2 bg-slate-950/90 border border-purple-500/40 rounded-xl p-2.5 shadow-xl backdrop-blur-md items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-300">
                  <Rocket className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Startup Hackathon</div>
                  <div className="text-[10px] text-purple-300 font-medium">$10,000 Prize Pool</div>
                </div>
              </div>

              <div className="hidden sm:flex absolute bottom-2 left-2 bg-slate-950/90 border border-cyan-500/40 rounded-xl p-2.5 shadow-xl backdrop-blur-md items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300">
                  <Cpu className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Creatiq Memory Engine</div>
                  <div className="text-[10px] text-cyan-300 font-medium">Unified Knowledge Synced</div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
