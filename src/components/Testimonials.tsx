import React, { useState } from 'react';
import { Star, Quote, Sparkles, CheckCircle2, Plus, MessageSquare, X } from 'lucide-react';
import { useEcosystem } from '../context/EcosystemContext';

export const Testimonials: React.FC = () => {
  const { testimonials, addTestimonial, user } = useEcosystem();
  const [selectedTag, setSelectedTag] = useState<string>('All');

  // Submit Feedback Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [company, setCompany] = useState('');
  const [personaTag, setPersonaTag] = useState<'Student' | 'Founder' | 'Freelancer' | 'Professional' | 'Creator'>('Creator');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(5);
  const [metrics, setMetrics] = useState('Saved 10+ hrs/week');

  React.useEffect(() => {
    if (user) {
      setName(user.name);
      setRole(user.role);
      setCompany(user.company);
      setPersonaTag(user.personaTag);
    }
  }, [user, isModalOpen]);

  const tags = ['All', 'Student', 'Founder', 'Freelancer', 'Professional', 'Creator'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    addTestimonial({
      name: user ? user.name : (name.trim() || 'Verified Member'),
      role: user ? user.role : (role.trim() || 'Creatiq User'),
      company: user ? user.company : (company.trim() || 'Community Pioneer'),
      personaTag: user ? user.personaTag : personaTag,
      content: content.trim(),
      rating,
      metrics: metrics.trim() || 'Verified Feedback'
    });

    setName('');
    setRole('');
    setCompany('');
    setContent('');
    setIsModalOpen(false);
  };

  const filteredTestimonials = testimonials.filter((t) => {
    return selectedTag === 'All' || t.personaTag === selectedTag;
  });

  return (
    <section id="testimonials" className="py-24 bg-slate-950 relative overflow-hidden border-t border-slate-900">
      {/* Background Lights */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold">
            <Quote className="w-3.5 h-3.5 text-purple-400" />
            Verified Community Feedback ({testimonials.length})
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Real Stories from{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
              Real Creators.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Read how students, founders, freelancers, and teams use Creatiq to learn faster, ship bigger, and save hundreds of hours.
          </p>

          <button
            onClick={() => setIsModalOpen(true)}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-xs hover:opacity-90 transition-all shadow-md inline-flex items-center gap-2 mt-2"
          >
            <Plus className="w-4 h-4" />
            Submit Your Feedback
          </button>
        </div>

        {/* Persona Filter Tabs */}
        <div className="flex justify-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedTag === tag
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-950/40'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {tag === 'All' ? '🌟 All Testimonials' : `${tag}s`}
            </button>
          ))}
        </div>

        {/* Testimonials Cards Grid */}
        {filteredTestimonials.length === 0 ? (
          <div className="bg-slate-900/40 border border-slate-800/80 rounded-3xl p-12 text-center max-w-xl mx-auto space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mx-auto">
              <Quote className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white">No Community Reviews Yet</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Be the first verified member to share your experience and feedback with Creatiq!
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-xs hover:opacity-90 transition-all shadow-lg inline-flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Submit First Review
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredTestimonials.map((t) => (
              <div
                key={t.id}
                className="bg-slate-900/60 border border-slate-800/80 hover:border-purple-500/40 rounded-3xl p-8 backdrop-blur-xl transition-all hover:-translate-y-1 shadow-2xl flex flex-col justify-between group"
              >
                <div>
                  {/* Rating & Metric Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex gap-1">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>

                    <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold font-mono">
                      ⚡ {t.metrics}
                    </span>
                  </div>

                  {/* Content Quote */}
                  <p className="text-slate-300 text-sm leading-relaxed mb-6 italic">
                    "{t.content}"
                  </p>
                </div>

                {/* Author Footer */}
                <div className="pt-4 border-t border-slate-800/60 flex items-center gap-4">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-purple-500/40 shadow-md"
                  />
                  <div>
                    <div className="font-bold text-white text-sm flex items-center gap-2">
                      {t.name}
                      <span className="px-2 py-0.2 rounded text-[10px] font-semibold bg-slate-800 text-purple-300 border border-slate-700">
                        {t.personaTag}
                      </span>
                    </div>
                    <div className="text-xs text-slate-400">
                      {t.role} • <span className="text-slate-300 font-medium">{t.company}</span>
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>

      {/* Submit Testimonial Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-150">
          <div className="bg-slate-950 border border-slate-800 rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Quote className="w-5 h-5 text-purple-400" />
                Submit Your Feedback
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Jordan Lee"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Role / Title</label>
                  <input
                    type="text"
                    placeholder="e.g. CS Student"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Company / School</label>
                  <input
                    type="text"
                    placeholder="e.g. Stanford University"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Persona Tag</label>
                  <select
                    value={personaTag}
                    onChange={(e) => setPersonaTag(e.target.value as any)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                  >
                    <option value="Student">Student</option>
                    <option value="Founder">Founder</option>
                    <option value="Freelancer">Freelancer</option>
                    <option value="Professional">Professional</option>
                    <option value="Creator">Creator</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Highlight Metric</label>
                  <input
                    type="text"
                    placeholder="e.g. Built MVP in 2 days"
                    value={metrics}
                    onChange={(e) => setMetrics(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Your Review / Story</label>
                <textarea
                  rows={4}
                  required
                  placeholder="How has Creatiq helped you learn, build, or grow?"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500 resize-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold hover:opacity-90 shadow-md"
                >
                  Submit Feedback
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </section>
  );
};

