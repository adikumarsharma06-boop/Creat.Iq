import React from 'react';
import { X, Lock, Sparkles, CheckCircle2, Zap, ArrowRight, ShieldCheck, Crown } from 'lucide-react';
import { AIFeature } from '../types';

interface SubscriptionLockModalProps {
  isOpen: boolean;
  onClose: () => void;
  feature: AIFeature | null;
  onBuySubscription: () => void;
}

export const SubscriptionLockModal: React.FC<SubscriptionLockModalProps> = ({
  isOpen,
  onClose,
  feature,
  onBuySubscription,
}) => {
  if (!isOpen || !feature) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-slate-950/80 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full overflow-hidden shadow-2xl relative my-8 text-slate-100">
        
        {/* Top Glowing Header Accent */}
        <div className="h-2 bg-gradient-to-r from-amber-500 via-purple-500 to-cyan-500 w-full" />

        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 space-y-6 text-center">
          
          {/* Lock Icon Badge */}
          <div className="relative inline-block mx-auto mt-2">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-amber-500/20 via-purple-500/20 to-cyan-500/20 border border-amber-500/40 p-0.5 shadow-2xl flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[22px] flex items-center justify-center text-amber-400">
                <Lock className="w-10 h-10 animate-pulse" />
              </div>
            </div>
            <span className="absolute -bottom-2 -right-2 px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-950 font-black text-[10px] uppercase shadow-lg flex items-center gap-1">
              <Crown className="w-3 h-3" /> PRO
            </span>
          </div>

          {/* Heading */}
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold">
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              Top 8 Most Used AI Tool • Pro Subscription Required
            </div>

            <h3 className="text-2xl font-black text-white tracking-tight">
              {feature.title} is Locked!
            </h3>

            <p className="text-xs text-slate-300 leading-relaxed max-w-sm mx-auto">
              First <strong className="text-amber-300 font-extrabold">buy a subscription</strong> to unlock and use <strong className="text-white">{feature.title}</strong> and all top 8 most used AI capabilities.
            </p>
          </div>

          {/* Tool Feature Snapshot Box */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 text-left space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-400 border-b border-slate-800/80 pb-2">
              <span className="text-cyan-400">{feature.subtitle}</span>
              <span className="text-slate-500 text-[10px]">{feature.stats}</span>
            </div>
            <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
              {feature.description}
            </p>
          </div>

          {/* Pro Benefits Checklist */}
          <div className="bg-gradient-to-br from-amber-950/30 via-slate-950 to-cyan-950/30 border border-amber-500/20 rounded-2xl p-4 space-y-2.5 text-left text-xs">
            <div className="font-extrabold text-amber-300 text-xs flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>What you get with Pro Subscription:</span>
            </div>

            <ul className="space-y-2 text-slate-300 text-xs">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Unlimited access to <strong>all 8 locked top tools</strong></span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>AI Chat, Coding, Deep Web Research & 4K Image Gen</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Verified Learning Certificates & VIP Creator Hub</span>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-2">
            <button
              onClick={() => {
                onClose();
                onBuySubscription();
              }}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-cyan-500 to-purple-600 hover:from-amber-400 hover:to-purple-500 text-slate-950 font-black text-sm shadow-xl shadow-amber-950/40 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4 fill-slate-950" />
              <span>Buy Subscription Now (Starting at ₹99/mo)</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-xl text-xs text-slate-400 hover:text-white hover:bg-slate-800 transition-colors font-medium"
            >
              Maybe Later
            </button>
          </div>

          <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-500">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Instant activation via UPI / GPay / PhonePe / QR Code</span>
          </div>

        </div>

      </div>
    </div>
  );
};
