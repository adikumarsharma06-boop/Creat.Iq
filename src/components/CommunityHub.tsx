import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CommunityPost } from '../types';
import { useEcosystem } from '../context/EcosystemContext';
import { SpaceGridSkeleton } from './SpaceSkeletonLoader';
import { GlobalCreatorMap } from './GlobalCreatorMap';
import {
  Users, MessageSquare, Trophy, Sparkles, Heart, Share2, PlusCircle,
  Search, Filter, Award, Flame, CheckCircle, ArrowRight, UserPlus, Shield, Globe2, X, Plus
} from 'lucide-react';

interface CommunityHubProps {
  onOpenCreatorCard: () => void;
}

export const CommunityHub: React.FC<CommunityHubProps> = ({ onOpenCreatorCard }) => {
  const { communityPosts, addCommunityPost, likePost, activeCreatorsCount, user, openAuthModal } = useEcosystem();
  const [activeTab, setActiveTab] = useState<'all' | 'study' | 'discussion' | 'challenge' | 'showcase'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoadingPosts, setIsLoadingPosts] = useState<boolean>(false);

  useEffect(() => {
    setIsLoadingPosts(true);
    const timer = setTimeout(() => {
      setIsLoadingPosts(false);
    }, 280);
    return () => clearTimeout(timer);
  }, [activeTab, searchQuery]);

  // Create Post Modal State
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [authorName, setAuthorName] = useState('');
  const [authorRole, setAuthorRole] = useState('Student & Creator');
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [postCategory, setPostCategory] = useState<'study' | 'discussion' | 'challenge' | 'showcase'>('discussion');
  const [postTags, setPostTags] = useState('');

  React.useEffect(() => {
    if (user) {
      setAuthorName(user.name);
      setAuthorRole(user.role);
    }
  }, [user, isPostModalOpen]);

  const handleCreatePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postTitle.trim() || !postContent.trim()) return;

    addCommunityPost({
      authorName: authorName.trim() || 'Anonymous Creator',
      authorRole: authorRole.trim() || 'Community Member',
      title: postTitle,
      content: postContent,
      category: postCategory,
      tags: postTags.split(',').map((t) => t.trim()).filter(Boolean)
    });

    setPostTitle('');
    setPostContent('');
    setPostTags('');
    setIsPostModalOpen(false);
  };

  const filteredPosts = communityPosts.filter((post) => {
    const matchesTab = activeTab === 'all' || post.category === activeTab;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTab && matchesSearch;
  });

  const studySquadsCount = communityPosts.filter((p) => p.category === 'study').length;
  const challengesCount = communityPosts.filter((p) => p.category === 'challenge').length;

  return (
    <section id="community" className="py-24 bg-slate-950 relative overflow-hidden border-t border-slate-900">
      {/* Background Atmosphere */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-r from-purple-600/10 via-pink-600/10 to-cyan-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold">
            <Users className="w-3.5 h-3.5 text-purple-400" />
            Global AI Ecosystem Community
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Learn, Build & Grow{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
              Together.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Creatiq is more than tools — it’s a thriving global network where creators connect and collaborate.
          </p>
        </div>

        {/* Community Highlights Ticker / Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 text-center backdrop-blur-md">
            <div className="text-cyan-400 font-bold text-lg sm:text-2xl font-mono">{studySquadsCount}</div>
            <div className="text-xs text-slate-400">Active Study Squads</div>
          </div>
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 text-center backdrop-blur-md">
            <div className="text-purple-400 font-bold text-lg sm:text-2xl font-mono">{challengesCount}</div>
            <div className="text-xs text-slate-400">Active Challenges</div>
          </div>
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 text-center backdrop-blur-md">
            <div className="text-pink-400 font-bold text-lg sm:text-2xl font-mono">{communityPosts.length}</div>
            <div className="text-xs text-slate-400">Total Posts & Q&As</div>
          </div>
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 text-center backdrop-blur-md">
            <div className="text-emerald-400 font-bold text-lg sm:text-2xl font-mono">{activeCreatorsCount}</div>
            <div className="text-xs text-slate-400">Registered Members</div>
          </div>
        </div>

        {/* Global Creator Network Interactive SVG Map */}
        <div className="mb-14">
          <GlobalCreatorMap />
        </div>

        {/* Community Tabs & Action Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 bg-slate-900/80 border border-slate-800 p-3 rounded-2xl backdrop-blur-md">
          
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {[
              { id: 'all', label: 'All Feed' },
              { id: 'study', label: '📚 Study Squads & Teams' },
              { id: 'discussion', label: '💬 Q&A & Discussions' },
              { id: 'challenge', label: '🏆 Challenges & Hackathons' },
              { id: 'showcase', label: '🚀 Milestones & Showcase' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto shrink-0">
            <div className="relative flex-1 md:w-56">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search topics or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/60"
              />
            </div>

            <button
              onClick={() => setIsPostModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-xs hover:opacity-90 transition-all shadow-md flex items-center gap-1.5 shrink-0"
            >
              <Plus className="w-3.5 h-3.5" />
              Create Post
            </button>

            <button
              onClick={onOpenCreatorCard}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition-all border border-slate-700 flex items-center gap-1.5 shrink-0"
            >
              <UserPlus className="w-3.5 h-3.5 text-cyan-400" />
              Creator Card
            </button>
          </div>

        </div>

        {/* Community Feed Grid */}
        <AnimatePresence mode="wait">
          {isLoadingPosts ? (
            <motion.div
              key="community-skeleton"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <SpaceGridSkeleton count={4} variant="post" />
            </motion.div>
          ) : filteredPosts.length === 0 ? (
            <motion.div
              key="community-empty"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="bg-slate-900/40 border border-slate-800/80 rounded-3xl p-12 text-center max-w-xl mx-auto space-y-4"
            >
              <div className="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mx-auto">
                <MessageSquare className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white">No Community Posts Yet</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Be the very first member to publish a project, study squad request, or discussion topic on Creatiq!
              </p>
              <button
                onClick={() => setIsPostModalOpen(true)}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-xs hover:opacity-90 transition-all shadow-lg inline-flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Create First Community Post
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="community-posts"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {filteredPosts.map((post) => (
                <div
                  key={post.id}
                  className="bg-slate-900/60 border border-slate-800/90 hover:border-purple-500/40 rounded-2xl p-6 backdrop-blur-md transition-all hover:shadow-xl hover:shadow-purple-950/20 flex flex-col justify-between"
                >
                  <div>
                    {/* Author Info */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={post.author.avatar}
                          alt={post.author.name}
                          className="w-10 h-10 rounded-full object-cover border border-purple-500/30"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-white">{post.author.name}</span>
                            <span className="px-2 py-0.2 rounded text-[10px] font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                              {post.author.badge}
                            </span>
                          </div>
                          <span className="text-xs text-slate-400">{post.author.role}</span>
                        </div>
                      </div>

                      <span className="text-xs text-slate-500 font-mono">{post.timestamp}</span>
                    </div>

                    {/* Title & Body */}
                    <h3 className="text-base font-bold text-white mb-2 leading-snug hover:text-purple-300 transition-colors cursor-pointer">
                      {post.title}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed mb-4">
                      {post.content}
                    </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-md bg-slate-950 border border-slate-800 text-[10px] font-mono text-cyan-300"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Interactions Footer */}
                <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => likePost(post.id)}
                      className="flex items-center gap-1.5 font-semibold text-slate-400 hover:text-pink-400 transition-colors"
                    >
                      <Heart className={`w-4 h-4 ${post.likes > 0 ? 'fill-pink-500 text-pink-500' : ''}`} />
                      <span>{post.likes}</span>
                    </button>

                    <button className="flex items-center gap-1.5 hover:text-cyan-300 font-semibold transition-colors">
                      <MessageSquare className="w-4 h-4" />
                      <span>{post.replies} Replies</span>
                    </button>
                  </div>

                  <button
                    onClick={onOpenCreatorCard}
                    className="text-purple-300 hover:text-white font-semibold flex items-center gap-1 text-xs"
                  >
                    <span>Connect</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

        {/* Teammate Matchmaker Feature Card */}
        <div className="mt-14 bg-gradient-to-r from-purple-950/60 via-slate-900 to-cyan-950/60 border border-purple-500/30 rounded-3xl p-8 backdrop-blur-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-3">
              <span className="px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 text-xs font-bold border border-pink-500/30">
                🎯 Creatiq Teammate & Mentor Matchmaker
              </span>
              <h3 className="text-2xl font-extrabold text-white">Need a co-founder, developer or study partner?</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Connect with community members by skills (React, Python, UI/UX, Finance) and timezones to build your dream team.
              </p>
            </div>

            <div className="lg:col-span-4 flex justify-end">
              <button
                onClick={onOpenCreatorCard}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 text-white font-bold text-xs hover:opacity-95 transition-all shadow-xl flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-white" />
                Create Free Community Profile
              </button>
            </div>

          </div>
        </div>

      </div>

      {/* Create Post Modal */}
      {isPostModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-150">
          <div className="bg-slate-950 border border-slate-800 rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-purple-400" />
                Publish Community Post
              </h3>
              <button onClick={() => setIsPostModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePostSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Your Name</label>
                <input
                  type="text"
                  placeholder="e.g. Alex Rivera"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Category</label>
                <select
                  value={postCategory}
                  onChange={(e) => setPostCategory(e.target.value as any)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="study">📚 Study Squads & Teams</option>
                  <option value="discussion">💬 Q&A & Discussions</option>
                  <option value="challenge">🏆 Challenges & Hackathons</option>
                  <option value="showcase">🚀 Milestones & Showcase</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Post Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Building an AI app for campus note-taking"
                  value={postTitle}
                  onChange={(e) => setPostTitle(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Content / Details</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Share details about your question, project idea, or squad request..."
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500 resize-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Tags (comma separated)</label>
                <input
                  type="text"
                  placeholder="e.g. React, Python, Hackathon"
                  value={postTags}
                  onChange={(e) => setPostTags(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsPostModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold hover:opacity-90 shadow-md"
                >
                  Publish Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </section>
  );
};

