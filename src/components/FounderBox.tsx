import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Linkedin, Instagram, Twitter, Heart, Rocket, Compass, ExternalLink, Code, Target, Award } from 'lucide-react';

export const FounderBox: React.FC = () => {
  return (
    <section id="founder" className="py-20 relative overflow-hidden bg-slate-950/80 border-t border-slate-900/80">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-r from-cyan-600/10 via-purple-600/10 to-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono font-semibold"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>The Journey & Vision</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight"
          >
            Behind <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">Creatiq AI</span>
          </motion.h2>

          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Meet the founder building the next generation of creative and intelligence platforms with unwavering grit.
          </p>
        </div>

        {/* Founder Card Container */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="bg-gradient-to-b from-slate-900/90 via-slate-950 to-slate-900/90 border border-cyan-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden backdrop-blur-xl group hover:border-cyan-500/50 transition-all duration-300"
        >
          {/* Top Decorative Metallic Bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Founder Avatar / Monogram */}
            <div className="lg:col-span-4 flex flex-col items-center text-center space-y-4">
              <div className="relative group/avatar">
                {/* Glowing Outer Ring */}
                <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 blur-md opacity-75 group-hover/avatar:opacity-100 transition-opacity animate-pulse" />
                
                <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-2xl bg-slate-950 border-2 border-cyan-400/80 overflow-hidden p-1 shadow-2xl flex flex-col items-center justify-center">
                  <div className="w-full h-full rounded-xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 flex flex-col items-center justify-center text-white relative p-4">
                    <span className="text-3xl sm:text-4xl font-extrabold font-mono tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300">
                      AS
                    </span>
                    <span className="text-[10px] font-mono text-cyan-400 mt-1 uppercase tracking-widest font-bold">
                      Founder
                    </span>
                  </div>
                </div>

                {/* Founder Badge */}
                <span className="absolute -bottom-2 -right-2 px-2.5 py-1 rounded-full bg-cyan-950 border border-cyan-500/60 text-cyan-300 text-[10px] font-mono font-bold shadow-lg flex items-center gap-1">
                  <Rocket className="w-3 h-3 text-cyan-400" />
                  <span>Lead Architect</span>
                </span>
              </div>

              <div>
                <h3 className="text-xl font-extrabold text-white tracking-tight">Aditya Sharma</h3>
                <p className="text-xs text-cyan-400 font-mono font-medium mt-0.5">Founder & Creator of Creatiq AI</p>
                <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 mt-1">
                  <Code className="w-3.5 h-3.5 text-purple-400" />
                  <span>Full-Stack AI Developer</span>
                </div>
              </div>
            </div>

            {/* Right: Inspirational Story & Social Links */}
            <div className="lg:col-span-8 space-y-6 border-t lg:border-t-0 lg:border-l border-slate-800/80 pt-6 lg:pt-0 lg:pl-8">
              
              {/* Inspiration Quote */}
              <div className="relative bg-slate-900/60 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-inner">
                <span className="text-4xl text-cyan-500/30 font-serif leading-none absolute top-3 left-4 select-none">“</span>
                <p className="text-sm sm:text-base text-slate-200 italic font-sans leading-relaxed pl-4 relative z-10">
                  "Just a boy with a relentless dream to turn ambition into reality — building next-generation intelligent systems step-by-step, driven by pure passion to empower creators, builders, and dreamers worldwide."
                </p>
                <div className="mt-3 text-right">
                  <span className="text-xs font-mono font-bold text-cyan-400">— Aditya Sharma (@startwithaadii)</span>
                </div>
              </div>

              {/* Founder Stats / Core Beliefs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800 text-center">
                  <Target className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
                  <div className="text-xs font-bold text-white">Mission Driven</div>
                  <div className="text-[10px] text-slate-400">Democratizing AI for All</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800 text-center">
                  <Award className="w-4 h-4 text-purple-400 mx-auto mb-1" />
                  <div className="text-xs font-bold text-white">Uncompromising Quality</div>
                  <div className="text-[10px] text-slate-400">Built for Scale & Precision</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800 text-center">
                  <Compass className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
                  <div className="text-xs font-bold text-white">Community First</div>
                  <div className="text-[10px] text-slate-400">Empowering Innovators</div>
                </div>
              </div>

              {/* Official Verified Social Handles & IDs */}
              <div className="pt-2">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-3 font-semibold">
                  Connect Directly with Aditya & Official Handles:
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {/* Founder Instagram */}
                  <a
                    href="https://www.instagram.com/startwithaadii?igsh=MWg0NmU3czkyOG1jYg=="
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-purple-950/40 border border-purple-500/30 hover:border-purple-400 hover:bg-purple-900/40 text-purple-200 transition-all flex items-center justify-between group/link"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-300">
                        <Instagram className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white group-hover/link:text-purple-300 transition-colors">
                          @startwithaadii
                        </div>
                        <div className="text-[10px] text-slate-400">Founder Instagram Handle</div>
                      </div>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-purple-400 opacity-60 group-hover/link:opacity-100 transition-opacity" />
                  </a>

                  {/* Brand Instagram */}
                  <a
                    href="https://www.instagram.com/1.creat.iq?igsh=MTlnZzV6MzY3anFrZQ=="
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-pink-950/40 border border-pink-500/30 hover:border-pink-400 hover:bg-pink-900/40 text-pink-200 transition-all flex items-center justify-between group/link"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-pink-500/20 flex items-center justify-center text-pink-300">
                        <Instagram className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white group-hover/link:text-pink-300 transition-colors">
                          @1.creat.iq
                        </div>
                        <div className="text-[10px] text-slate-400">Official Brand Handle</div>
                      </div>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-pink-400 opacity-60 group-hover/link:opacity-100 transition-opacity" />
                  </a>

                  {/* LinkedIn */}
                  <a
                    href="https://www.linkedin.com/in/aditya-sharma-a38a0a3a6?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-blue-950/40 border border-blue-500/30 hover:border-blue-400 hover:bg-blue-900/40 text-blue-200 transition-all flex items-center justify-between group/link"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-300">
                        <Linkedin className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white group-hover/link:text-blue-300 transition-colors">
                          Aditya Sharma
                        </div>
                        <div className="text-[10px] text-slate-400">LinkedIn Profile</div>
                      </div>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-blue-400 opacity-60 group-hover/link:opacity-100 transition-opacity" />
                  </a>

                  {/* Twitter / X */}
                  <a
                    href="https://x.com/AdityaShar54906"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/30 hover:border-cyan-400 hover:bg-cyan-900/40 text-cyan-200 transition-all flex items-center justify-between group/link"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-300">
                        <Twitter className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white group-hover/link:text-cyan-300 transition-colors">
                          @AdityaShar54906
                        </div>
                        <div className="text-[10px] text-slate-400">Twitter / X</div>
                      </div>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-cyan-400 opacity-60 group-hover/link:opacity-100 transition-opacity" />
                  </a>
                </div>
              </div>

            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};
