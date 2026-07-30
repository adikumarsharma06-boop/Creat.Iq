import React, { useState } from 'react';
import { Cpu, Send, CheckCircle2, ShieldCheck, Heart, Sparkles, Github, Twitter, Linkedin, Youtube, MessageSquare, Instagram, ExternalLink } from 'lucide-react';
import { NLogo } from './NLogo';

interface FooterProps {
  onOpenStartupTerms?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenStartupTerms }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setSubscribed(false);
      }, 3000);
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 relative overflow-hidden">
      {/* Space Nebula Background */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-gradient-to-t from-cyan-950/20 via-purple-950/10 to-transparent pointer-events-none" />

      {/* Pre-Footer CTA Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10 border-b border-slate-900">
        <div className="bg-gradient-to-r from-slate-900 via-cyan-950/60 to-purple-950/60 border border-cyan-500/30 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden shadow-2xl">
          <div className="max-w-2xl mx-auto space-y-4">
            <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold font-mono">
              🚀 Join the Future of AI Learning
            </span>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Ready to Create Smarter & Grow Faster?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Start building your projects today with Creatiq’s 15 AI tools, hands-on learning paths, and global creator community.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="#pricing"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white font-bold text-xs hover:opacity-95 transition-all shadow-xl shadow-cyan-950/50"
              >
                Start Free Account
              </a>
              <a
                href="#community"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-600 text-slate-200 font-semibold text-xs hover:bg-slate-800 transition-all"
              >
                Join Community Discord
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Navigation Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
          
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <NLogo size="md" animated={true} />
              <span className="text-xl font-extrabold text-white tracking-tight font-sans">
                c.<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 font-mono">iq</span>
                <span className="text-slate-100 font-sans ml-1">Creatiq</span>
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Creatiq is an AI-powered ecosystem where students, creators, freelancers, entrepreneurs, and teams learn, build projects, collaborate, and grow together.
            </p>

            {/* Live System Operational Status Indicator */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-slate-300 font-medium">All AI Engines Operational</span>
              <span className="text-slate-500 font-mono">• 99.99% Uptime</span>
            </div>
          </div>

          {/* Links Column 1: Ecosystem */}
          <div className="lg:col-span-2 space-y-3 text-xs">
            <span className="font-bold uppercase font-mono text-white text-[11px] tracking-wider block">Ecosystem</span>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#features" className="hover:text-cyan-300 transition-colors">15 AI Tools</a></li>
              <li><a href="#learning" className="hover:text-cyan-300 transition-colors">Learning Paths</a></li>
              <li><a href="#workspace" className="hover:text-cyan-300 transition-colors">AI Workspace Vault</a></li>
              {onOpenStartupTerms && (
                <li>
                  <button onClick={onOpenStartupTerms} className="hover:text-purple-300 transition-colors text-purple-400 font-bold flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    <span>Startup Core Terms</span>
                  </button>
                </li>
              )}
              <li><a href="#why" className="hover:text-cyan-300 transition-colors">ROI Calculator</a></li>
              <li><a href="#pricing" className="hover:text-cyan-300 transition-colors">Pricing & Plans</a></li>
            </ul>
          </div>

          {/* Links Column 2: Community */}
          <div className="lg:col-span-2 space-y-3 text-xs">
            <span className="font-bold uppercase font-mono text-white text-[11px] tracking-wider block">Community</span>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#community" className="hover:text-purple-300 transition-colors">Study Squads</a></li>
              <li><a href="#community" className="hover:text-purple-300 transition-colors">Global Hackathons</a></li>
              <li><a href="#community" className="hover:text-purple-300 transition-colors">Teammate Matchmaker</a></li>
              <li><a href="#community" className="hover:text-purple-300 transition-colors">Showcase & Milestones</a></li>
              <li><a href="#testimonials" className="hover:text-purple-300 transition-colors">Member Stories</a></li>
            </ul>
          </div>

          {/* Column 3: Newsletter */}
          <div className="lg:col-span-4 space-y-3 text-xs">
            <span className="font-bold uppercase font-mono text-white text-[11px] tracking-wider block">Creatiq Dispatch</span>
            <p className="text-slate-400 leading-snug">
              Get weekly AI prompt workflows, community hackathon alerts, and project case studies. Zero spam.
            </p>

            <form onSubmit={handleSubscribe} className="relative pt-1">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email..."
                className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-3 pr-10 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/60"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-2.5 p-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:opacity-90 transition-all"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

            {subscribed && (
              <div className="flex items-center gap-1.5 text-emerald-400 text-[11px] pt-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Subscribed! Welcome to Creatiq Dispatch.</span>
              </div>
            )}
          </div>

        </div>

        {/* Bottom Bar & Highlighted Official Social Handles */}
        <div className="pt-12 mt-12 border-t border-slate-900 flex flex-col lg:flex-row items-center justify-between gap-6 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Creatiq Inc. Built by Aditya Sharma (@startwithaadii). All rights reserved.
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://www.instagram.com/1.creat.iq?igsh=MTlnZzV6MzY3anFrZQ=="
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-xl bg-pink-500/10 border border-pink-500/30 text-pink-300 hover:text-white hover:bg-pink-500/20 text-[11px] font-bold flex items-center gap-1.5 transition-all"
            >
              <Instagram className="w-3.5 h-3.5 text-pink-400" />
              <span>@1.creat.iq</span>
            </a>

            <a
              href="https://www.instagram.com/startwithaadii?igsh=MWg0NmU3czkyOG1jYg=="
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-300 hover:text-white hover:bg-purple-500/20 text-[11px] font-bold flex items-center gap-1.5 transition-all"
            >
              <Instagram className="w-3.5 h-3.5 text-purple-400" />
              <span>@startwithaadii</span>
            </a>

            <a
              href="https://www.linkedin.com/in/aditya-sharma-a38a0a3a6?utm_source=share_via&utm_content=profile&utm_medium=member_android"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-300 hover:text-white hover:bg-blue-500/20 text-[11px] font-bold flex items-center gap-1.5 transition-all"
            >
              <Linkedin className="w-3.5 h-3.5 text-blue-400" />
              <span>LinkedIn</span>
            </a>

            <a
              href="https://chat.whatsapp.com/GSALFIw58U0829qCZ3LVUJ"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 hover:text-white hover:bg-emerald-500/20 text-[11px] font-bold flex items-center gap-1.5 transition-all"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp Group</span>
            </a>

            <a
              href="https://x.com/AdityaShar54906"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 hover:text-white hover:bg-cyan-500/20 text-[11px] font-bold flex items-center gap-1.5 transition-all"
            >
              <Twitter className="w-3.5 h-3.5 text-cyan-400" />
              <span>@AdityaShar54906</span>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
