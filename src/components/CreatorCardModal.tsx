import React, { useState } from 'react';
import { X, Sparkles, Download, Share2, Check, ShieldCheck, Cpu, User } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useEcosystem } from '../context/EcosystemContext';

interface CreatorCardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreatorCardModal: React.FC<CreatorCardModalProps> = ({ isOpen, onClose }) => {
  const { registerCreator, user } = useEcosystem();
  const [name, setName] = useState(user ? user.name : 'Alex Rivera');
  const [role, setRole] = useState(user ? user.role : 'Full-Stack AI Builder');
  const [personaTag, setPersonaTag] = useState(user ? user.personaTag : 'Creator');
  const [badgeColor, setBadgeColor] = useState<'cyan' | 'purple' | 'emerald'>('cyan');
  const [copied, setCopied] = useState(false);

  React.useEffect(() => {
    if (user) {
      setName(user.name);
      setRole(user.role);
      setPersonaTag(user.personaTag);
    }
  }, [user, isOpen]);

  if (!isOpen) return null;

  const handleGenerateConfetti = () => {
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.5 }
    });
    registerCreator();
  };

  const handleShare = () => {
    navigator.clipboard.writeText(`Check out my Creatiq Creator Passport: ${name} (${role})`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white">Creatiq Creator Passport</h3>
              <p className="text-xs text-slate-400">Customize your official ecosystem profile badge</p>
            </div>
          </div>

          <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Creator Card Preview */}
        <div className="relative p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-cyan-500/40 shadow-xl overflow-hidden group">
          
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="flex items-center justify-between mb-6 border-b border-slate-800/80 pb-4">
            <div className="flex items-center gap-2">
              <Cpu className="w-5 h-5 text-cyan-400" />
              <span className="font-extrabold text-white text-sm tracking-tight">Creatiq Passport</span>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-mono font-bold border border-cyan-500/30">
              VERIFIED #84920
            </span>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500 to-purple-600 p-[2px] shadow-lg">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-cyan-300">
                <User className="w-7 h-7" />
              </div>
            </div>
            <div>
              <h4 className="text-lg font-bold text-white">{name || 'Your Name'}</h4>
              <p className="text-xs text-slate-400">{role || 'Your Role'}</p>
              <span className="inline-block mt-1 px-2 py-0.2 rounded bg-purple-500/20 text-purple-300 text-[10px] font-bold">
                {personaTag} Member
              </span>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono">
            <span>Global Rank: Top 5% Creator</span>
            <span className="text-emerald-400 font-bold">● Active Ecosystem Node</span>
          </div>
        </div>

        {/* Controls */}
        <div className="space-y-3 text-xs">
          <div>
            <label className="block text-slate-400 font-medium mb-1">Your Display Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500/60"
            />
          </div>

          <div>
            <label className="block text-slate-400 font-medium mb-1">Your Role or Specialization</label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500/60"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-2">
          <button
            onClick={() => {
              handleGenerateConfetti();
              handleShare();
            }}
            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold text-xs hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-lg"
          >
            {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
            <span>{copied ? 'Passport Link Copied!' : 'Generate & Share Passport'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
