import React, { useState } from 'react';
import {
  Instagram,
  Linkedin,
  Twitter,
  ExternalLink,
  Sparkles,
  Share2,
  CheckCircle2,
  Users,
  Copy,
  Globe,
  Heart,
  MessageSquare
} from 'lucide-react';

export const SocialConnectHighlight: React.FC = () => {
  const [copiedLink, setCopiedLink] = useState<string | null>(null);

  const socialLinks = [
    {
      id: 'aadi-instagram',
      name: 'Aditya Sharma (Founder)',
      handle: '@startwithaadii',
      platform: 'Instagram',
      url: 'https://www.instagram.com/startwithaadii?igsh=MWg0NmU3czkyOG1jYg==',
      icon: Instagram,
      color: 'from-pink-500 via-rose-500 to-amber-500',
      badge: 'Founder & Builder',
      badgeBg: 'bg-pink-500/10 text-pink-300 border-pink-500/30',
      description: 'Follow Aditya Sharma for daily AI build updates, founder insights, and tech tutorials.',
    },
    {
      id: 'creatiq-instagram',
      name: 'Creatiq Official',
      handle: '@1.creat.iq',
      platform: 'Instagram',
      url: 'https://www.instagram.com/1.creat.iq?igsh=MTlnZzV6MzY3anFrZQ==',
      icon: Instagram,
      color: 'from-purple-500 via-pink-500 to-cyan-500',
      badge: 'Official Community',
      badgeBg: 'bg-purple-500/10 text-purple-300 border-purple-500/30',
      description: 'Official Creatiq AI Studio account for feature releases, community highlights, and AI tips.',
    },
    {
      id: 'creatiq-whatsapp',
      name: 'Creatiq WhatsApp Group',
      handle: 'Join Community Group',
      platform: 'WhatsApp',
      url: 'https://chat.whatsapp.com/GSALFIw58U0829qCZ3LVUJ',
      icon: MessageSquare,
      color: 'from-emerald-500 via-teal-500 to-cyan-500',
      badge: 'Official Group',
      badgeBg: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
      description: 'Join the official WhatsApp group to connect directly with builders and founder Aditya Sharma.',
    },
    {
      id: 'aadi-linkedin',
      name: 'Aditya Sharma',
      handle: 'Aditya Sharma',
      platform: 'LinkedIn',
      url: 'https://www.linkedin.com/in/aditya-sharma-a38a0a3a6?utm_source=share_via&utm_content=profile&utm_medium=member_android',
      icon: Linkedin,
      color: 'from-blue-600 to-cyan-500',
      badge: 'Professional Network',
      badgeBg: 'bg-blue-500/10 text-blue-300 border-blue-500/30',
      description: 'Connect on LinkedIn for professional network collaborations, career updates, and tech partnerships.',
    },
    {
      id: 'aadi-x',
      name: 'Aditya Sharma (@AdityaShar54906)',
      handle: '@AdityaShar54906',
      platform: 'X (Twitter)',
      url: 'https://x.com/AdityaShar54906',
      icon: Twitter,
      color: 'from-cyan-400 to-slate-200',
      badge: 'Tech & AI Thoughts',
      badgeBg: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30',
      description: 'Real-time AI prompts, project code snippets, and fast tech commentary on X.',
    },
  ];

  const handleCopyLink = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedLink(id);
    setTimeout(() => setCopiedLink(null), 2500);
  };

  return (
    <section id="socials" className="py-16 sm:py-20 bg-slate-950 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-cyan-500/10 border border-purple-500/30">
            <Sparkles className="w-4 h-4 text-pink-400 animate-pulse" />
            <span className="text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-cyan-300 font-mono uppercase tracking-wider">
              Official Social Connect Hub
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Connect With Us Across <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400">
              Our Social Channels
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Stay updated with the latest AI workflows, connect directly with founder <strong className="text-white">Aditya Sharma</strong>, and join the official <strong className="text-cyan-300">Creatiq AI</strong> builder network.
          </p>
        </div>

        {/* Social Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {socialLinks.map((item) => {
            const IconComp = item.icon;
            const isCopied = copiedLink === item.id;

            return (
              <div
                key={item.id}
                className="group relative bg-slate-900/90 border border-slate-800 hover:border-purple-500/50 rounded-3xl p-6 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-purple-950/40 hover:-translate-y-1 flex flex-col justify-between"
              >
                {/* Glow accent */}
                <div className={`absolute -top-px left-8 right-8 h-px bg-gradient-to-r ${item.color} opacity-60 group-hover:opacity-100 transition-opacity`} />

                <div className="space-y-4">
                  {/* Top Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.color} p-[1px] shadow-lg`}>
                      <div className="w-full h-full bg-slate-950 rounded-[15px] flex items-center justify-center">
                        <IconComp className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                      </div>
                    </div>

                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold border ${item.badgeBg}`}>
                      {item.badge}
                    </span>
                  </div>

                  {/* Title & Handle */}
                  <div>
                    <h3 className="text-base font-extrabold text-white group-hover:text-cyan-300 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-xs font-mono text-cyan-400 font-semibold mt-0.5">
                      {item.handle}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-400 leading-relaxed min-h-[3rem]">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Action Bar */}
                <div className="pt-5 mt-4 border-t border-slate-800/80 flex items-center gap-2">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r ${item.color} text-white font-extrabold text-xs flex items-center justify-center gap-2 hover:opacity-95 transition-all shadow-md`}
                  >
                    <span>Follow / Connect</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <button
                    onClick={() => handleCopyLink(item.url, item.id)}
                    title="Copy Profile Link"
                    className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-all shrink-0"
                  >
                    {isCopied ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Global Social Banner Bar */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-purple-950/40 to-cyan-950/40 border border-purple-500/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0">
              <Users className="w-6 h-6 text-cyan-400" />
            </div>
            <div className="space-y-1 text-center md:text-left">
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center justify-center md:justify-start gap-2">
                <span>Join Creatiq AI Community Network</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  @1.creat.iq & @startwithaadii
                </span>
              </h4>
              <p className="text-xs text-slate-300">
                Direct access to founder updates on Instagram, LinkedIn professional discussions, and real-time Twitter/X tech threads.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href="https://www.instagram.com/1.creat.iq?igsh=MTlnZzV6MzY3anFrZQ=="
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-xs hover:opacity-90 transition-all shadow-lg flex items-center gap-2"
            >
              <Instagram className="w-4 h-4" />
              <span>@1.creat.iq</span>
            </a>
            <a
              href="https://www.instagram.com/startwithaadii?igsh=MWg0NmU3czkyOG1jYg=="
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-slate-900 border border-purple-500/40 text-purple-300 hover:text-white font-bold text-xs hover:bg-slate-800 transition-all flex items-center gap-2"
            >
              <Instagram className="w-4 h-4 text-pink-400" />
              <span>@startwithaadii</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
