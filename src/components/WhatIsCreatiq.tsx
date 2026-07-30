import React, { useState } from 'react';
import { USER_SCENARIOS } from '../data/mockData';
import { GraduationCap, Sparkles, Rocket, Briefcase, CheckCircle2, ArrowRight, Brain, Lightbulb, Users2, ShieldCheck, Zap } from 'lucide-react';

export const WhatIsCreatiq: React.FC = () => {
  const [activeScenarioId, setActiveScenarioId] = useState('student');

  const activeScenario = USER_SCENARIOS.find((s) => s.id === activeScenarioId) || USER_SCENARIOS[0];

  const getScenarioIcon = (iconName: string) => {
    switch (iconName) {
      case 'GraduationCap': return <GraduationCap className="w-5 h-5" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5" />;
      case 'Rocket': return <Rocket className="w-5 h-5" />;
      case 'Briefcase': return <Briefcase className="w-5 h-5" />;
      default: return <Brain className="w-5 h-5" />;
    }
  };

  return (
    <section id="overview" className="py-24 bg-slate-950 relative overflow-hidden border-t border-slate-900">
      {/* Background Subtle Gradient Glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold">
            <Lightbulb className="w-3.5 h-3.5 text-purple-400" />
            Plain English Explanation
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            What is <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">Creatiq</span>?
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Creatiq is not just another AI chatbot where you type a question and get a wall of text.
            It is your <strong className="text-white">all-in-one AI ecosystem</strong> that combines smart tools, structured learning, real-time collaboration, and an inspiring community.
          </p>
        </div>

        {/* 3 Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          
          <div className="bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 rounded-3xl p-8 backdrop-blur-md transition-all hover:-translate-y-1 shadow-xl group">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-110 transition-transform">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">15 AI Tools in One Place</h3>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">
              Stop juggling 8 different subscriptions for research, writing, coding, image generation, and spreadsheets. Creatiq combines them all in one unified workspace.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400">
              <span>One login, unified memory</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 hover:border-purple-500/40 rounded-3xl p-8 backdrop-blur-md transition-all hover:-translate-y-1 shadow-xl group">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 transition-transform">
              <Brain className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Guided Learning Paths</h3>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">
              Don’t know how to use AI? No problem. Creatiq teaches you step-by-step with interactive AI tutors, real-world projects, and verified digital certificates.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-purple-400">
              <span>Learn by doing with AI</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 hover:border-emerald-500/40 rounded-3xl p-8 backdrop-blur-md transition-all hover:-translate-y-1 shadow-xl group">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 transition-transform">
              <Users2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Vibrant Global Community</h3>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">
              Connect with fellow students, creators, developers, and co-founders. Join study groups, ask questions, share project milestones, and enter weekly hackathons.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
              <span>Never build alone again</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

        </div>

        {/* Interactive Scenario Switcher: "A Day with Creatiq" */}
        <div className="bg-gradient-to-b from-slate-900/90 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-10 backdrop-blur-xl shadow-2xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-800">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 font-mono">Real-World Everyday Impact</span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">See How Creatiq Works For You</h3>
            </div>

            {/* Role Tabs */}
            <div className="flex flex-wrap gap-2">
              {USER_SCENARIOS.map((scenario) => (
                <button
                  key={scenario.id}
                  onClick={() => setActiveScenarioId(scenario.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                    activeScenarioId === scenario.id
                      ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg shadow-cyan-950/50'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {getScenarioIcon(scenario.icon)}
                  {scenario.role}
                </button>
              ))}
            </div>
          </div>

          {/* Active Scenario Card Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-cyan-500/10 text-cyan-300 text-xs font-semibold border border-cyan-500/20">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                Scenario for {activeScenario.role}s
              </div>

              <h4 className="text-xl sm:text-2xl font-bold text-white leading-snug">
                "{activeScenario.headline}"
              </h4>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed bg-slate-900/60 p-5 rounded-2xl border border-slate-800">
                {activeScenario.story}
              </p>

              <div className="flex items-center gap-6 pt-2">
                <div>
                  <div className="text-xs text-slate-400 font-medium">Average Time Saved</div>
                  <div className="text-xl font-extrabold text-cyan-400 font-mono">{activeScenario.highlightStats}</div>
                </div>
                <div className="h-8 w-[1px] bg-slate-800" />
                <div>
                  <div className="text-xs text-slate-400 font-medium">Creatiq Mode</div>
                  <div className="text-sm font-bold text-purple-300">Unified Memory & Tools</div>
                </div>
              </div>
            </div>

            {/* Visual Step Card */}
            <div className="lg:col-span-5 bg-slate-950/80 border border-cyan-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden">
              <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-4 flex items-center justify-between">
                <span>Creatiq Live Workflow</span>
                <span className="text-emerald-400 font-bold">100% Automated</span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-[10px] shrink-0">1</span>
                  <p className="text-slate-300"><strong className="text-white">Input context:</strong> Upload notes, documents or rough ideas.</p>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-[10px] shrink-0">2</span>
                  <p className="text-slate-300"><strong className="text-white">AI Engine processes:</strong> Research, drafts, codes or designs instantly.</p>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-[10px] shrink-0">3</span>
                  <p className="text-slate-300"><strong className="text-white">Community & Workspace:</strong> Save to vault or share with team for feedback.</p>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
