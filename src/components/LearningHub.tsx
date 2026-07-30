import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LEARNING_PATHS } from '../data/mockData';
import { LearningPath } from '../types';
import { useEcosystem } from '../context/EcosystemContext';
import { UserActivityTracker } from '../services/UserActivityTracker';
import { SpaceGridSkeleton } from './SpaceSkeletonLoader';
import {
  BookOpen, GraduationCap, Award, CheckCircle, Clock, FileCheck, Sparkles,
  Users, ChevronDown, ChevronUp, ArrowRight, PlayCircle, ShieldCheck,
  X, RotateCcw, CheckCircle2, Circle, Trophy, BarChart3, EyeOff
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface LearningHubProps {
  onOpenCertificateModal: (path: LearningPath) => void;
}

export const LearningHub: React.FC<LearningHubProps> = ({ onOpenCertificateModal }) => {
  const { enrollPath, isPathEnrolled, getPathEnrolledCount, enrolledPathIds, user } = useEcosystem();
  const [selectedPersona, setSelectedPersona] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedPathId, setExpandedPathId] = useState<string | null>(null);
  const [isLoadingPaths, setIsLoadingPaths] = useState<boolean>(false);

  useEffect(() => {
    setIsLoadingPaths(true);
    const timer = setTimeout(() => {
      setIsLoadingPaths(false);
    }, 280);
    return () => clearTimeout(timer);
  }, [selectedPersona, selectedCategory]);

  // User-specific progress dashboard state
  const [hiddenCardIds, setHiddenCardIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('creatiq_hidden_progress_cards');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('creatiq_completed_lessons');
      return saved ? JSON.parse(saved) : ['l1', 'l2', 'l5'];
    } catch {
      return ['l1', 'l2', 'l5'];
    }
  });

  const [claimedCertificates, setClaimedCertificates] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('creatiq_claimed_certs');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('creatiq_hidden_progress_cards', JSON.stringify(hiddenCardIds));
  }, [hiddenCardIds]);

  useEffect(() => {
    localStorage.setItem('creatiq_completed_lessons', JSON.stringify(completedLessonIds));
  }, [completedLessonIds]);

  useEffect(() => {
    localStorage.setItem('creatiq_claimed_certs', JSON.stringify(claimedCertificates));
  }, [claimedCertificates]);

  const personas = ['All', 'Students', 'Creators', 'Entrepreneurs', 'Freelancers', 'Developers', 'Professionals'];
  const categories = ['All', 'AI', 'Coding', 'Content Creation', 'Finance', 'Marketing', 'Productivity'];

  const filteredPaths = LEARNING_PATHS.filter((path) => {
    const matchesPersona = selectedPersona === 'All' || path.persona === selectedPersona;
    const matchesCategory = selectedCategory === 'All' || path.category === selectedCategory;
    return matchesPersona && matchesCategory;
  });

  // Calculate user-specific dashboard progress metrics
  const visiblePaths = LEARNING_PATHS.filter((p) => !hiddenCardIds.includes(p.id));
  const allVisibleLessons = visiblePaths.flatMap((p) => p.lessons || []);
  const totalLessons = allVisibleLessons.length;
  const totalCompletedLessons = allVisibleLessons.filter((l) => completedLessonIds.includes(l.id)).length;
  const totalCertificatesEarned = visiblePaths.filter((p) => {
    const pLessons = p.lessons || [];
    const doneCount = pLessons.filter((l) => completedLessonIds.includes(l.id)).length;
    return (pLessons.length > 0 && doneCount === pLessons.length) || claimedCertificates.includes(p.id);
  }).length;
  const overallMasteryPct = totalLessons > 0 ? Math.round((totalCompletedLessons / totalLessons) * 100) : 0;

  const toggleExpand = (id: string) => {
    setExpandedPathId((prev) => (prev === id ? null : id));
  };

  const handleToggleLesson = (lessonId: string, lessonTitle: string, pathTitle: string) => {
    setCompletedLessonIds((prev) => {
      const isAlreadyDone = prev.includes(lessonId);
      const updated = isAlreadyDone
        ? prev.filter((id) => id !== lessonId)
        : [...prev, lessonId];

      UserActivityTracker.logActivity(
        'feature_used',
        isAlreadyDone ? `Unchecked module: ${lessonTitle}` : `Completed module: ${lessonTitle}`,
        `Path: ${pathTitle}`,
        'learning'
      );
      return updated;
    });
  };

  const handleHideCard = (pathId: string, pathTitle: string) => {
    setHiddenCardIds((prev) => {
      const updated = [...prev, pathId];
      UserActivityTracker.logActivity(
        'page_view',
        `Hid progress card for ${pathTitle}`,
        `User removed card from dashboard view`,
        'learning'
      );
      return updated;
    });
  };

  const handleRestoreHiddenCards = () => {
    setHiddenCardIds([]);
    UserActivityTracker.logActivity(
      'page_view',
      'Restored all hidden progress cards',
      'User unhid all learning progress cards',
      'learning'
    );
  };

  const handleClaimCertificate = (path: LearningPath) => {
    if (!claimedCertificates.includes(path.id)) {
      setClaimedCertificates((prev) => [...prev, path.id]);
      UserActivityTracker.logActivity(
        'path_enrolled',
        `Claimed Certificate for ${path.title}`,
        `Certificate Title: ${path.certificateTitle}`,
        'learning'
      );
    }
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    onOpenCertificateModal(path);
  };

  return (
    <section id="learning" className="py-24 bg-slate-950 relative overflow-hidden border-t border-slate-900">
      {/* Background Subtle Space Lights */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-semibold">
            <BookOpen className="w-3.5 h-3.5 text-blue-400" />
            AI-Powered Hands-On Learning Paths
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Learn AI Skills that{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400">
              Actually Matter.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Tailored learning paths for every persona. Learn with live AI assistance, build real capstone projects, and earn shareable verified certificates.
          </p>
        </div>

        {/* User-Specific Learning Progress Dashboard */}
        <div className="mb-14 bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

          {/* Header & Stats Summary */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-800/80">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                  <BarChart3 className="w-5 h-5" />
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                  {user ? `${user.name}'s Learning Progress` : 'Your Personal Learning Matrix'}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-300">
                Track completed modules, unlock verified AI certificates, and manage active learning paths.
              </p>
            </div>

            {/* Summary Stat Pills */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="px-4 py-2 rounded-2xl bg-slate-950 border border-slate-800/90 text-center">
                <div className="text-[10px] uppercase font-mono font-bold text-slate-400">Active Paths</div>
                <div className="text-lg font-black text-cyan-400 font-mono">{visiblePaths.length}</div>
              </div>
              <div className="px-4 py-2 rounded-2xl bg-slate-950 border border-slate-800/90 text-center">
                <div className="text-[10px] uppercase font-mono font-bold text-slate-400">Modules Done</div>
                <div className="text-lg font-black text-purple-300 font-mono">{totalCompletedLessons} / {totalLessons}</div>
              </div>
              <div className="px-4 py-2 rounded-2xl bg-slate-950 border border-slate-800/90 text-center">
                <div className="text-[10px] uppercase font-mono font-bold text-slate-400">Certificates Earned</div>
                <div className="text-lg font-black text-amber-400 font-mono flex items-center justify-center gap-1">
                  <Trophy className="w-4 h-4 text-amber-400 inline" />
                  <span>{totalCertificatesEarned}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Restore Hidden Cards Banner if any cards are hidden */}
          {hiddenCardIds.length > 0 && (
            <div className="mt-4 p-3 flex items-center justify-between text-xs text-slate-400 bg-slate-950/60 rounded-xl border border-slate-800">
              <div className="flex items-center gap-2">
                <EyeOff className="w-4 h-4 text-amber-400" />
                <span>{hiddenCardIds.length} progress card{hiddenCardIds.length > 1 ? 's' : ''} hidden from dashboard</span>
              </div>
              <button
                onClick={handleRestoreHiddenCards}
                className="px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/20 font-bold text-xs flex items-center gap-1.5 transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Restore All Cards</span>
              </button>
            </div>
          )}

          {/* Overall Progress Bar */}
          <div className="mt-6 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-cyan-400" />
                <span>OVERALL HUB MASTERY</span>
              </span>
              <span className="font-bold text-cyan-400">{overallMasteryPct}%</span>
            </div>
            <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden p-0.5 border border-slate-800">
              <div
                className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 rounded-full transition-all duration-500"
                style={{ width: `${overallMasteryPct}%` }}
              />
            </div>
          </div>

          {/* Progress Cards Grid */}
          <div className="mt-8">
            {visiblePaths.length === 0 ? (
              <div className="py-10 text-center space-y-3 bg-slate-950/60 rounded-2xl border border-dashed border-slate-800">
                <EyeOff className="w-8 h-8 text-slate-500 mx-auto" />
                <h4 className="text-sm font-bold text-white">All progress cards are hidden from dashboard view</h4>
                <p className="text-xs text-slate-400">Click below to unhide your progress cards.</p>
                <button
                  onClick={handleRestoreHiddenCards}
                  className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 transition-all inline-flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Show All Progress Cards</span>
                </button>
              </div>
            ) : (
              <AnimatePresence mode="wait">
                {isLoadingPaths ? (
                  <motion.div
                    key="paths-skeleton"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <SpaceGridSkeleton count={4} variant="course" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="paths-cards"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  >
                    {visiblePaths.map((path) => {
                      const pathLessons = path.lessons || [];
                      const completedCount = pathLessons.filter((l) => completedLessonIds.includes(l.id)).length;
                      const pathPct = pathLessons.length > 0 ? Math.round((completedCount / pathLessons.length) * 100) : 0;
                      const isFullyCompleted = pathPct === 100;
                      const isCertClaimed = claimedCertificates.includes(path.id);

                      return (
                        <div
                          key={`progress-${path.id}`}
                          className="relative bg-slate-950/90 border border-slate-800 hover:border-cyan-500/40 rounded-2xl p-5 sm:p-6 transition-all duration-300 shadow-lg group"
                        >
                      {/* Close Button to Hide Individual Progress Card */}
                      <button
                        onClick={() => handleHideCard(path.id, path.title)}
                        title="Hide progress card from dashboard"
                        className="absolute top-4 right-4 p-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-red-500/20 hover:border-red-500/40 hover:text-red-400 transition-all z-10"
                      >
                        <X className="w-4 h-4" />
                      </button>

                      {/* Card Header */}
                      <div className="pr-10 space-y-2 mb-4">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 text-[10px] font-bold border border-cyan-500/30">
                            {path.persona}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 text-[10px] font-bold border border-purple-500/30">
                            {path.category}
                          </span>
                          {isPathEnrolled(path.id) && (
                            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold">
                              ENROLLED
                            </span>
                          )}
                        </div>

                        <h4 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                          {path.title}
                        </h4>
                      </div>

                      {/* Path Completion Bar */}
                      <div className="space-y-1.5 mb-4 bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className="text-slate-400 text-[11px] font-medium">Modules Completed:</span>
                          <span className="font-bold text-cyan-400">{completedCount} / {pathLessons.length} ({pathPct}%)</span>
                        </div>
                        <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden p-0.5 border border-slate-800/80">
                          <div
                            className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full transition-all duration-300"
                            style={{ width: `${pathPct}%` }}
                          />
                        </div>
                      </div>

                      {/* Interactive Module Checklist */}
                      <div className="space-y-2 mb-5">
                        <span className="text-[10px] uppercase font-mono font-bold text-slate-400 block">
                          Interactive Module Checklist:
                        </span>
                        <div className="space-y-1.5">
                          {pathLessons.map((lesson) => {
                            const isDone = completedLessonIds.includes(lesson.id);
                            return (
                              <button
                                key={lesson.id}
                                onClick={() => handleToggleLesson(lesson.id, lesson.title, path.title)}
                                className={`w-full text-left p-2 rounded-lg text-xs flex items-center justify-between border transition-all ${
                                  isDone
                                    ? 'bg-cyan-950/30 border-cyan-500/30 text-cyan-200'
                                    : 'bg-slate-900/60 border-slate-800/80 text-slate-300 hover:border-slate-700'
                                }`}
                              >
                                <div className="flex items-center gap-2 truncate pr-2">
                                  {isDone ? (
                                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                                  ) : (
                                    <Circle className="w-4 h-4 text-slate-500 shrink-0" />
                                  )}
                                  <span className={`truncate font-medium ${isDone ? 'line-through text-slate-400' : ''}`}>
                                    {lesson.title}
                                  </span>
                                </div>
                                <span className="text-[10px] font-mono text-slate-500 shrink-0">{lesson.duration}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Certificate & Completion Status Footer */}
                      <div className="pt-3 border-t border-slate-900 flex items-center justify-between gap-2">
                        {isFullyCompleted || isCertClaimed ? (
                          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/30">
                            <Trophy className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                            <span>Certificate Unlocked</span>
                          </div>
                        ) : (
                          <div className="text-[11px] text-slate-400 font-mono">
                            {pathLessons.length - completedCount} module{pathLessons.length - completedCount > 1 ? 's' : ''} remaining
                          </div>
                        )}

                        <button
                          onClick={() => handleClaimCertificate(path)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                            isFullyCompleted || isCertClaimed
                              ? 'bg-amber-400 text-slate-950 hover:bg-amber-300 shadow-md shadow-amber-400/20'
                              : 'bg-purple-600/20 text-purple-300 border border-purple-500/40 hover:bg-purple-600/30'
                          }`}
                        >
                          <Award className="w-3.5 h-3.5" />
                          <span>{isCertClaimed ? 'View Certificate' : isFullyCompleted ? 'Claim Certificate' : 'Certificate Preview'}</span>
                        </button>
                      </div>

                    </div>
                  );
                })}
              </motion.div>
            )}
            </AnimatePresence>
            )}
          </div>
        </div>

        {/* Persona & Category Filter Controls */}
        <div className="space-y-4 mb-12 bg-slate-900/60 border border-slate-800 p-4 rounded-2xl backdrop-blur-md">
          
          {/* Persona Filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs scrollbar-none">
            <span className="text-[10px] uppercase font-mono font-bold text-slate-400 shrink-0 mr-2">Target Role:</span>
            {personas.map((persona) => (
              <button
                key={persona}
                onClick={() => setSelectedPersona(persona)}
                className={`px-3.5 py-1.5 rounded-xl font-semibold whitespace-nowrap transition-all ${
                  selectedPersona === persona
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {persona}
              </button>
            ))}
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs border-t border-slate-800/60 pt-3 scrollbar-none">
            <span className="text-[10px] uppercase font-mono font-bold text-slate-400 shrink-0 mr-2">Topic Area:</span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-cyan-500 text-slate-950 shadow-md font-bold'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>

        {/* Learning Paths Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredPaths.map((path) => (
            <div
              key={path.id}
              className="bg-slate-900/60 border border-slate-800/90 hover:border-cyan-500/40 rounded-3xl p-6 md:p-8 backdrop-blur-md transition-all shadow-xl flex flex-col justify-between group"
            >
              <div>
                {/* Header Tag Bar */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-lg bg-cyan-500/10 text-cyan-300 text-xs font-bold border border-cyan-500/30">
                      {path.persona}
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-purple-500/10 text-purple-300 text-xs font-bold border border-purple-500/30">
                      {path.category}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-slate-400 font-medium">{path.level}</span>
                </div>

                {/* Path Title */}
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                  {path.title}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed mb-6">
                  {path.description}
                </p>

                {/* Metrics Bar */}
                <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-slate-950 border border-slate-800/80 text-center text-xs mb-6">
                  <div>
                    <div className="text-slate-400 text-[10px]">Duration</div>
                    <div className="font-bold text-white font-mono">{path.duration}</div>
                  </div>
                  <div>
                    <div className="text-slate-400 text-[10px]">Lessons / Projects</div>
                    <div className="font-bold text-cyan-400 font-mono">{path.lessonsCount} / {path.projectsCount}</div>
                  </div>
                  <div>
                    <div className="text-slate-400 text-[10px]">Enrolled</div>
                    <div className="font-bold text-purple-300 font-mono">{getPathEnrolledCount(path.id)}</div>
                  </div>
                </div>

                {/* Skills Learned */}
                <div className="mb-6">
                  <span className="text-[10px] uppercase font-mono font-bold text-slate-400 block mb-2">Skills You Master:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {path.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-[11px] font-medium text-slate-300"
                      >
                        ✓ {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Expandable Lessons Preview */}
                <button
                  onClick={() => toggleExpand(path.id)}
                  className="w-full py-2 px-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white flex items-center justify-between mb-4"
                >
                  <span className="flex items-center gap-2">
                    <PlayCircle className="w-4 h-4 text-cyan-400" />
                    Preview Modules & AI Assistance ({path.lessons.length} lessons shown)
                  </span>
                  {expandedPathId === path.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>

                {expandedPathId === path.id && (
                  <div className="space-y-2 mb-6 p-4 rounded-2xl bg-slate-950/90 border border-slate-800 text-xs animate-in slide-in-from-top-2 duration-200">
                    {path.lessons.map((lesson, idx) => (
                      <div key={lesson.id} className="flex items-center justify-between p-2 rounded-lg bg-slate-900">
                        <div className="flex items-center gap-2.5">
                          <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 font-mono font-bold text-[10px] flex items-center justify-center">
                            {idx + 1}
                          </span>
                          <span className="text-slate-200 font-medium">{lesson.title}</span>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          {lesson.hasAIAssistant && (
                            <span className="px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300 text-[9px] font-mono">
                              AI Tutor
                            </span>
                          )}
                          <span className="text-slate-500 text-[10px] font-mono">{lesson.duration}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-3">
                <button
                  onClick={() => handleClaimCertificate(path)}
                  className="text-xs font-semibold text-purple-300 hover:text-purple-200 flex items-center gap-1.5"
                >
                  <Award className="w-4 h-4 text-purple-400" />
                  <span>View Certificate</span>
                </button>

                <button
                  onClick={() => {
                    enrollPath(path.id);
                    handleClaimCertificate(path);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs hover:opacity-90 transition-all shadow-md flex items-center gap-2"
                >
                  <span>{isPathEnrolled(path.id) ? 'Continue Path' : 'Start Learning Path'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
