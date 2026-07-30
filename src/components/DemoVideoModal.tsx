import React, { useState } from 'react';
import { X, Play, Cpu, CheckCircle2, Sparkles, Volume2, ShieldCheck, ArrowRight } from 'lucide-react';

interface DemoVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSandbox: () => void;
}

export const DemoVideoModal: React.FC<DemoVideoModalProps> = ({
  isOpen,
  onClose,
  onOpenSandbox,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeStep, setActiveStep] = useState(0);

  if (!isOpen) return null;

  const tourSteps = [
    { title: '1. AI Research & Literature Synthesis', desc: 'Watch Creatiq parse 14 research papers in 8 seconds and generate cited executive summaries.' },
    { title: '2. Full-Stack AI Coding & Debugging', desc: 'See how Creatiq builds React components and TypeScript backend routes with zero syntax errors.' },
    { title: '3. Community Study Squads & Matching', desc: 'Discover co-founders, study partners, and global hackathon teammates in real time.' },
    { title: '4. Unified Workspace & Note Sync', desc: 'Save conversations directly to your knowledge vault and track daily goal streaks.' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300">
              <Play className="w-4 h-4 fill-cyan-400" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white">Creatiq Product Tour (2 Mins)</h3>
              <p className="text-xs text-slate-400">Interactive walkthrough of the Creatiq AI ecosystem</p>
            </div>
          </div>

          <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Simulated Video Player Screen */}
        <div className="relative aspect-video rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden flex flex-col justify-between p-6 shadow-2xl group">
          {/* Animated Background Mesh */}
          <div className="absolute inset-0 bg-gradient-to-tr from-cyan-950/40 via-purple-950/30 to-slate-950 pointer-events-none" />

          <div className="relative z-10 flex items-center justify-between text-xs text-slate-400">
            <span className="px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 font-mono font-bold border border-cyan-500/30 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              DEMO SIMULATION RUNNING
            </span>
            <span className="font-mono text-slate-400">Step {activeStep + 1} of 4</span>
          </div>

          {/* Active Step Visual Showcase */}
          <div className="relative z-10 max-w-lg mx-auto text-center space-y-3 my-auto">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 to-purple-600 mx-auto flex items-center justify-center text-white shadow-xl shadow-cyan-950/50">
              <Cpu className="w-8 h-8 animate-pulse" />
            </div>
            <h4 className="text-xl font-bold text-white">{tourSteps[activeStep].title}</h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-950/80 p-4 rounded-2xl border border-slate-800">
              {tourSteps[activeStep].desc}
            </p>
          </div>

          {/* Player Step Bar Controls */}
          <div className="relative z-10 flex items-center justify-between gap-2 pt-2 border-t border-slate-800/80">
            <div className="flex gap-2">
              {tourSteps.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`h-2 rounded-full transition-all ${
                    activeStep === idx ? 'w-8 bg-cyan-400' : 'w-2 bg-slate-700'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => {
                onClose();
                onOpenSandbox();
              }}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold text-xs hover:opacity-90 transition-all flex items-center gap-1.5 shadow-md"
            >
              <span>Test This Tool Yourself</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
