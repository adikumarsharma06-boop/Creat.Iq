import React from 'react';
import { LearningPath } from '../types';
import { X, Award, ShieldCheck, CheckCircle2, Download, Share2, Sparkles, User } from 'lucide-react';
import { useUser } from '../context/EcosystemContext';
import { NLogo } from './NLogo';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  path: LearningPath | null;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ isOpen, onClose, path }) => {
  const { user } = useUser();

  if (!isOpen || !path) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-purple-400" />
            <h3 className="text-base font-extrabold text-white">Verified Digital Certificate Preview</h3>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Certificate Graphic Card */}
        <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border-2 border-purple-500/50 shadow-2xl text-center space-y-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="flex justify-center">
            <NLogo size="lg" animated={true} />
          </div>

          <span className="text-[10px] font-mono uppercase tracking-widest text-indigo-300 font-bold block">
            Creatiq Ecosystem Accreditation • N-Engine Verified
          </span>

          <h3 className="text-2xl font-extrabold text-white tracking-tight">
            {path.certificateTitle}
          </h3>

          <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-xl max-w-sm mx-auto flex items-center justify-center gap-2">
            <User className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-bold text-white">Awarded To: {user ? user.name : 'Verified Creator'}</span>
            <span className="text-[10px] text-cyan-400 font-mono">({user ? user.role : 'AI Pioneer'})</span>
          </div>

          <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
            Issued upon mastering <strong className="text-white">{path.title}</strong>, completing {path.projectsCount} capstone AI projects, and passing verified AI tutor assessments.
          </p>

          <div className="pt-4 border-t border-slate-800/80 grid grid-cols-2 gap-4 text-left text-xs font-mono">
            <div>
              <span className="text-slate-500 text-[10px] block">VERIFICATION ID</span>
              <span className="text-cyan-300 font-bold">CRT-9482-AI</span>
            </div>
            <div>
              <span className="text-slate-500 text-[10px] block">VERIFIED SKILLS</span>
              <span className="text-slate-300">{path.skills.slice(0, 2).join(', ')}</span>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => {
              const recipientName = user ? user.name : 'Verified Creator';
              navigator.clipboard.writeText(`Creatiq Certificate awarded to ${recipientName}: ${path.certificateTitle}`);
              alert('Certificate verification link copied to clipboard!');
            }}
            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-bold text-xs hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-lg"
          >
            <Share2 className="w-4 h-4" />
            <span>Add Certificate to LinkedIn / Resume</span>
          </button>
        </div>

      </div>
    </div>
  );
};
