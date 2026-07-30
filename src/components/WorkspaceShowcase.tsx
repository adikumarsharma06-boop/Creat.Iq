import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SpaceCardSkeleton } from './SpaceSkeletonLoader';
import {
  Layout, FileText, CheckSquare, MessageSquare, Folder, Target, Users,
  Sparkles, Plus, Search, Pin, Trash2, ArrowRight, CheckCircle2, Clock
} from 'lucide-react';

export const WorkspaceShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'notes' | 'kanban' | 'vault' | 'docs' | 'goals'>('notes');
  const [isLoadingTab, setIsLoadingTab] = useState<boolean>(false);

  useEffect(() => {
    setIsLoadingTab(true);
    const timer = setTimeout(() => {
      setIsLoadingTab(false);
    }, 250);
    return () => clearTimeout(timer);
  }, [activeTab]);
  const [noteContent, setNoteContent] = useState<string>(
    '# Launching Creatiq AI App\n- [x] Complete pitch deck\n- [ ] Deploy serverless endpoints\n- [ ] Share with Creatiq Community for feedback'
  );

  const [tasks, setTasks] = useState([
    { id: 't1', title: 'Synthesize literature review on AI Agents', tag: 'Research', status: 'In Progress' },
    { id: 't2', title: 'Refactor React canvas hook for Three.js', tag: 'Coding', status: 'In Progress' },
    { id: 't3', title: 'Design landing page hero banner', tag: 'Design', status: 'Completed' },
    { id: 't4', title: 'Schedule community AMA session', tag: 'Community', status: 'To Do' },
  ]);

  const toggleTaskStatus = (id: string) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, status: t.status === 'Completed' ? 'In Progress' : 'Completed' }
          : t
      )
    );
  };

  return (
    <section id="workspace" className="py-24 bg-slate-950 relative overflow-hidden border-t border-slate-900">
      {/* Background Atmosphere */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
            <Layout className="w-3.5 h-3.5 text-cyan-400" />
            Unified AI Workspace
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Your Entire Workflow in{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
              One Intelligent Hub.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Take notes, plan projects, organize documents, track goals, save AI conversations, and collaborate with your team without leaving Creatiq.
          </p>
        </div>

        {/* Live Workspace Container */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-2xl">
          
          {/* Top Bar Navigation Tabs */}
          <div className="bg-slate-950 border-b border-slate-800/80 p-3 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              {[
                { id: 'notes', label: '📝 AI Smart Notes', icon: FileText },
                { id: 'kanban', label: '📊 Kanban & Tasks', icon: CheckSquare },
                { id: 'vault', label: '💬 AI Conversation Vault', icon: MessageSquare },
                { id: 'docs', label: '📂 Document Organizer', icon: Folder },
                { id: 'goals', label: '🎯 Goal & Streak Tracker', icon: Target },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-400 shrink-0">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-[11px]">Synced to Cloud Vault</span>
            </div>
          </div>

          {/* Tab Content Display */}
          <div className="p-6 md:p-8 min-h-[380px]">

            <AnimatePresence mode="wait">
              {isLoadingTab ? (
                <motion.div
                  key="tab-skeleton"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  <SpaceCardSkeleton variant="workspace" />
                  <SpaceCardSkeleton variant="workspace" />
                  <SpaceCardSkeleton variant="workspace" />
                </motion.div>
              ) : (
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* 1. NOTES TAB */}
            {activeTab === 'notes' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-8 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                    <span className="font-mono uppercase text-cyan-400 font-bold">Interactive AI Scratchpad</span>
                    <button
                      onClick={() => setNoteContent((prev) => prev + '\n- [ ] Added AI suggestion item')}
                      className="text-cyan-400 hover:underline flex items-center gap-1"
                    >
                      <Sparkles className="w-3.5 h-3.5" /> AI Auto-Format
                    </button>
                  </div>
                  <textarea
                    rows={8}
                    value={noteContent}
                    onChange={(e) => setNoteContent(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-xs font-mono text-slate-200 focus:outline-none focus:border-cyan-500/60 leading-relaxed"
                  />
                </div>

                <div className="lg:col-span-4 bg-slate-950 border border-slate-800/80 rounded-2xl p-5 text-xs space-y-4">
                  <div className="flex items-center gap-2 text-purple-300 font-bold">
                    <Sparkles className="w-4 h-4 text-purple-400" />
                    AI Note Assistant
                  </div>
                  <p className="text-slate-400 leading-snug">
                    Creatiq automatically summarizes your notes, creates action items, and connects related research papers.
                  </p>
                  <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-200">
                    <strong className="block text-white mb-1">AI Detected Key Goals:</strong>
                    1. Finish pitch deck for investors.<br/>
                    2. Deploy edge functions.<br/>
                    3. Launch community thread.
                  </div>
                </div>
              </div>
            )}

            {/* 2. KANBAN TAB */}
            {activeTab === 'kanban' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white">Project Sprint Board</h4>
                  <span className="text-xs text-slate-400">Click a task to toggle completion</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {tasks.map((task) => (
                    <div
                      key={task.id}
                      onClick={() => toggleTaskStatus(task.id)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                        task.status === 'Completed'
                          ? 'bg-slate-950/60 border-slate-800 text-slate-500 line-through'
                          : 'bg-slate-950 border-cyan-500/30 text-white hover:border-cyan-400'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2 text-[10px] font-mono">
                        <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300">{task.tag}</span>
                        <span className={task.status === 'Completed' ? 'text-emerald-400' : 'text-amber-400'}>
                          {task.status}
                        </span>
                      </div>
                      <p className="text-xs font-semibold leading-snug mb-3">{task.title}</p>
                      <div className="flex items-center gap-1 text-[10px] text-slate-500">
                        <CheckCircle2 className={`w-3.5 h-3.5 ${task.status === 'Completed' ? 'text-emerald-400' : ''}`} />
                        <span>Toggle Status</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. CHAT VAULT TAB */}
            {activeTab === 'vault' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white">Saved AI Knowledge Conversations</h4>
                  <span className="text-xs text-cyan-400 font-mono">14 Saved Conversations</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  {[
                    { title: 'Quantum Computing Analogy', date: 'Yesterday', category: 'Learning', preview: 'Two magic coins flipped at opposite sides of the galaxy...' },
                    { title: 'SaaS Unit Economics Model', date: '3 days ago', category: 'Business', preview: 'LTV calculated at $1,470 with 3.2% churn ceiling...' },
                    { title: 'React Canvas Resize Hook', date: 'Last week', category: 'Coding', preview: 'useResizeObserver hook with debounced callback...' },
                  ].map((item, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-white">{item.title}</span>
                        <span className="text-[10px] text-slate-500">{item.date}</span>
                      </div>
                      <p className="text-slate-400 line-clamp-2 mb-3 text-[11px]">{item.preview}</p>
                      <span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 text-[10px] font-mono">
                        {item.category}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. DOCUMENTS TAB */}
            {activeTab === 'docs' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white">Uploaded Research Documents & PDFs</h4>
                  <button className="px-3 py-1.5 rounded-lg bg-cyan-500/10 text-cyan-300 font-semibold text-xs border border-cyan-500/30">
                    + Upload New Document
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-white">2026_Global_AI_Market_Report.pdf</div>
                      <div className="text-[10px] text-slate-500">2.4 MB • 48 Pages • Indexed by Creatiq</div>
                    </div>
                    <span className="px-2 py-1 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[10px]">Indexed</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-white">Stanford_Neural_Architectures.pdf</div>
                      <div className="text-[10px] text-slate-500">1.8 MB • 18 Pages • Citations Synced</div>
                    </div>
                    <span className="px-2 py-1 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[10px]">Indexed</span>
                  </div>
                </div>
              </div>
            )}

            {/* 5. GOALS TAB */}
            {activeTab === 'goals' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800">
                    <div className="text-3xl font-extrabold text-cyan-400 font-mono">18 Days</div>
                    <div className="text-xs text-slate-400 font-medium mt-1">Current Active Streak 🔥</div>
                  </div>
                  <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800">
                    <div className="text-3xl font-extrabold text-purple-400 font-mono">24/30</div>
                    <div className="text-xs text-slate-400 font-medium mt-1">Monthly AI Goals Achieved</div>
                  </div>
                  <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800">
                    <div className="text-3xl font-extrabold text-emerald-400 font-mono">Level 4</div>
                    <div className="text-xs text-slate-400 font-medium mt-1">Ecosystem Creator Rank</div>
                  </div>
                </div>
              </div>
            )}
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>

      </div>
    </section>
  );
};
