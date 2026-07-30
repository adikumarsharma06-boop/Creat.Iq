import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Rocket, CheckCircle2, Clock, Sparkles, Flag, Users, Globe, Cpu, MessageSquare, Award, ArrowRight } from 'lucide-react';
import { useEcosystem } from '../context/EcosystemContext';

interface Milestone {
  id: number;
  phase: string;
  title: string;
  quarter: string;
  status: 'completed' | 'active' | 'upcoming';
  description: string;
  highlightMetric: string;
  details: string[];
}

export const GrowthRoadmap: React.FC = () => {
  const { activeCreatorsCount, globalHubsCount, aiTasksCompleted, communityPosts, testimonials, user } = useEcosystem();
  const [selectedMilestone, setSelectedMilestone] = useState<number>(3); // Default active phase

  const milestones: Milestone[] = [
    {
      id: 1,
      phase: 'Phase 01',
      title: 'Foundation & Core Vision',
      quarter: 'Q1 2026',
      status: 'completed',
      description: 'Aditya Sharma laid down the architectural blueprint for Creatiq AI — combining clean geometric UI with high-performance neural engines.',
      highlightMetric: '100% Custom Architecture',
      details: [
        'Designed proprietary 15 AI suite engine',
        'Established full-stack modular typescript codebase',
        'Formulated verified Creator Passport standard'
      ]
    },
    {
      id: 2,
      phase: 'Phase 02',
      title: 'Live AI Sandbox & 15 Tools Suite',
      quarter: 'Q2 2026',
      status: 'completed',
      description: 'Deployed interactive sandbox modules, code generators, study hubs, and dynamic 3D globe visualization.',
      highlightMetric: `${aiTasksCompleted} AI Tasks Executed`,
      details: [
        'Built instant interactive code playground',
        'Integrated multi-modal AI prompt generators',
        'Launched real-time workspace export system'
      ]
    },
    {
      id: 3,
      phase: 'Phase 03',
      title: 'Global Community & Creator Onboarding',
      quarter: 'Current Active Phase',
      status: 'active',
      description: 'Connecting creators, students, freelancers, and co-founders worldwide into active learning squads.',
      highlightMetric: `${activeCreatorsCount} Real Pioneers Joined`,
      details: [
        `${activeCreatorsCount} active registered creators in ecosystem`,
        `${globalHubsCount} global learning hubs established`,
        `${communityPosts.length} forum discussions & ${testimonials.length} verified reviews`
      ]
    },
    {
      id: 4,
      phase: 'Phase 04',
      title: 'Cloud Optimization & Enterprise Security',
      quarter: 'Final Testing Stage',
      status: 'upcoming',
      description: 'Hardening zero-training privacy rules, sub-second latency routing, and cloud persistence layers.',
      highlightMetric: '99.9% Uptime Guarantee',
      details: [
        'End-to-end encrypted prompt pipelines',
        'Multi-region failover infrastructure',
        'Zero data-training privacy guarantee'
      ]
    },
    {
      id: 5,
      phase: 'Phase 05',
      title: 'Official Production MVP Launch (v3.0)',
      quarter: 'Upcoming Launch',
      status: 'upcoming',
      description: 'Unlocking full production features, team workspace collaboration, and global hackathon prize payouts.',
      highlightMetric: 'MVP Launch Ready',
      details: [
        'Unlocking exclusive VIP pioneer badges',
        'Launch of $10,000 Hackathon Prize Pool',
        'Full multi-user collaborative workspaces'
      ]
    }
  ];

  return (
    <section id="roadmap" className="py-20 relative overflow-hidden bg-slate-950 border-t border-slate-900">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold"
          >
            <Flag className="w-3.5 h-3.5 text-cyan-400" />
            <span>STARTUP GROWTH ROADMAP</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-black text-white tracking-tight"
          >
            Journey Toward Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">MVP Launch</span>
          </motion.h2>

          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Trace Creatiq AI's progression from initial concept to official production launch with live real-time platform metrics.
          </p>
        </div>

        {/* Real Ecosystem Live Counter Strip */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-slate-900/80 border border-cyan-500/30 rounded-2xl p-4 sm:p-6 mb-16 shadow-xl backdrop-blur-md grid grid-cols-2 sm:grid-cols-4 gap-4 text-center divide-x-0 sm:divide-x divide-slate-800"
        >
          <div className="space-y-1">
            <div className="flex items-center justify-center gap-1.5 text-cyan-400">
              <Users className="w-4 h-4" />
              <span className="text-xs font-mono font-bold uppercase">Real Pioneers</span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white font-mono">{activeCreatorsCount}</div>
            <div className="text-[10px] text-slate-400">Registered Ecosystem Users</div>
          </div>

          <div className="space-y-1 pt-3 sm:pt-0">
            <div className="flex items-center justify-center gap-1.5 text-purple-400">
              <Globe className="w-4 h-4" />
              <span className="text-xs font-mono font-bold uppercase">Active Hubs</span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white font-mono">{globalHubsCount}</div>
            <div className="text-[10px] text-slate-400">Global Learning Circles</div>
          </div>

          <div className="space-y-1 pt-3 sm:pt-0">
            <div className="flex items-center justify-center gap-1.5 text-emerald-400">
              <Cpu className="w-4 h-4" />
              <span className="text-xs font-mono font-bold uppercase">AI Executions</span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white font-mono">{aiTasksCompleted}</div>
            <div className="text-[10px] text-slate-400">Live AI Tasks Run</div>
          </div>

          <div className="space-y-1 pt-3 sm:pt-0">
            <div className="flex items-center justify-center gap-1.5 text-blue-400">
              <MessageSquare className="w-4 h-4" />
              <span className="text-xs font-mono font-bold uppercase">Community Input</span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white font-mono">{communityPosts.length + testimonials.length}</div>
            <div className="text-[10px] text-slate-400">Posts & Reviews Logged</div>
          </div>
        </motion.div>

        {/* Milestone Timeline Grid (Desktop Line + Mobile Vertical Line) */}
        <div className="relative mb-12">
          
          {/* Connecting Animated Line for Desktop */}
          <div className="hidden lg:block absolute top-12 left-0 right-0 h-1 bg-slate-800 -z-0">
            <motion.div
              initial={{ width: '0%' }}
              whileInView={{ width: '75%' }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 shadow-[0_0_15px_rgba(6,182,212,0.8)]"
            />
          </div>

          {/* Timeline Nodes Container */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 relative z-10">
            {milestones.map((item, index) => {
              const isSelected = selectedMilestone === item.id;
              const isCompleted = item.status === 'completed';
              const isActive = item.status === 'active';

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setSelectedMilestone(item.id)}
                  className={`cursor-pointer rounded-2xl p-5 border transition-all duration-300 flex flex-col justify-between ${
                    isSelected
                      ? 'bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 border-cyan-400/80 shadow-2xl shadow-cyan-950/80 ring-2 ring-cyan-500/20 scale-[1.02]'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                  }`}
                >
                  <div>
                    {/* Node Header & Indicator Icon */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                        {item.phase}
                      </span>

                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shadow-md transition-transform ${
                        isCompleted
                          ? 'bg-emerald-500/20 border border-emerald-500/60 text-emerald-400'
                          : isActive
                          ? 'bg-cyan-500/30 border-2 border-cyan-400 text-cyan-300 animate-pulse'
                          : 'bg-slate-950 border border-slate-700 text-slate-500'
                      }`}>
                        {isCompleted ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        ) : isActive ? (
                          <Sparkles className="w-4 h-4 text-cyan-300 animate-spin" style={{ animationDuration: '6s' }} />
                        ) : (
                          <span>{item.id}</span>
                        )}
                      </div>
                    </div>

                    <h3 className="text-sm font-bold text-white mb-1 line-clamp-2">
                      {item.title}
                    </h3>

                    <div className="text-[11px] font-mono text-cyan-400 mb-2">
                      {item.quarter}
                    </div>

                    <p className="text-xs text-slate-400 leading-relaxed line-clamp-3 mb-4">
                      {item.description}
                    </p>
                  </div>

                  {/* Highlight Metric Pill */}
                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-lg bg-cyan-950/60 border border-cyan-500/30 text-[10px] font-mono font-bold text-cyan-300">
                      {item.highlightMetric}
                    </span>

                    <span className={`text-[10px] font-mono uppercase font-bold ${
                      isCompleted ? 'text-emerald-400' : isActive ? 'text-cyan-400' : 'text-slate-500'
                    }`}>
                      {isCompleted ? 'Done' : isActive ? 'In Progress' : 'Planned'}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Selected Phase Detailed Breakdown Box */}
        {milestones.find((m) => m.id === selectedMilestone) && (
          <motion.div
            key={selectedMilestone}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-900/90 border border-cyan-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden backdrop-blur-xl"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-6">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-mono font-bold">
                    {milestones[selectedMilestone - 1].phase} Details
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    {milestones[selectedMilestone - 1].quarter}
                  </span>
                </div>
                <h4 className="text-xl font-extrabold text-white mt-1">
                  {milestones[selectedMilestone - 1].title}
                </h4>
              </div>

              <div className="px-4 py-2 rounded-xl bg-cyan-950 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold flex items-center gap-2">
                <Rocket className="w-4 h-4 text-cyan-400" />
                <span>{milestones[selectedMilestone - 1].highlightMetric}</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
              {milestones[selectedMilestone - 1].description}
            </p>

            <div className="space-y-2.5">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider font-semibold block">
                Key Accomplishments & Deliverables:
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {milestones[selectedMilestone - 1].details.map((detail, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-2 text-xs text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

      </div>
    </section>
  );
};
