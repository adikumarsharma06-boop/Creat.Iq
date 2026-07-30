import React, { useState } from 'react';
import { PRICING_PLANS } from '../data/mockData';
import { PricingPlan } from '../types';
import { CheckCircle2, Sparkles, Zap, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';

interface PricingProps {
  onSelectPlan: (plan: PricingPlan) => void;
}

export const Pricing: React.FC<PricingProps> = ({ onSelectPlan }) => {
  const [isYearly, setIsYearly] = useState<boolean>(true);

  return (
    <section id="pricing" className="py-24 bg-slate-950 relative overflow-hidden border-t border-slate-900">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-r from-cyan-600/15 via-blue-600/10 to-purple-600/15 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            Simple, Transparent Pricing
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Invest in Your Growth.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
              No Hidden Fees.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Start completely free or upgrade to unlock unlimited AI generation, deep research, verified certificates, and private community squads.
          </p>

          {/* Monthly / Yearly Billing Toggle */}
          <div className="pt-4 flex items-center justify-center gap-3">
            <span className={`text-xs font-bold ${!isYearly ? 'text-white' : 'text-slate-400'}`}>
              Monthly Billing
            </span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className="relative w-14 h-8 rounded-full bg-slate-900 border border-slate-700 p-1 transition-colors"
            >
              <div
                className={`w-6 h-6 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 shadow-md transition-transform ${
                  isYearly ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
            <span className={`text-xs font-bold flex items-center gap-1.5 ${isYearly ? 'text-white' : 'text-slate-400'}`}>
              Yearly Billing
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-extrabold border border-emerald-500/30">
                SAVE 20%
              </span>
            </span>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {PRICING_PLANS.map((plan) => {
            const price = isYearly ? plan.priceYearly : plan.priceMonthly;

            return (
              <div
                key={plan.id}
                className={`relative rounded-3xl p-8 backdrop-blur-xl transition-all flex flex-col justify-between ${
                  plan.popular
                    ? 'bg-gradient-to-b from-slate-900 via-slate-900/90 to-cyan-950/40 border-2 border-cyan-500 shadow-2xl shadow-cyan-950/50 scale-105 z-20'
                    : 'bg-slate-900/60 border border-slate-800 hover:border-slate-700'
                }`}
              >
                {/* Popular Ribbon */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-extrabold text-[10px] uppercase tracking-wider shadow-lg">
                    MOST POPULAR FOR CREATORS
                  </div>
                )}

                <div>
                  {/* Plan Name & Tagline */}
                  <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
                  <p className="text-xs text-slate-400 min-h-[32px] mb-6">{plan.tagline}</p>

                  {/* Price */}
                  <div className="flex items-baseline gap-1 mb-6 pb-6 border-b border-slate-800">
                    <span className="text-4xl sm:text-5xl font-extrabold text-white font-mono">
                      ₹{price}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">/ month</span>
                    {isYearly && price > 0 && (
                      <span className="text-[10px] text-slate-500 block font-mono ml-auto">
                        billed annually
                      </span>
                    )}
                  </div>

                  {/* AI Credits & Community Access Highlights */}
                  <div className="space-y-2 mb-6 text-xs font-mono">
                    <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                      <span className="text-slate-400">AI Credits:</span>
                      <span className="text-cyan-300 font-bold">{plan.aiCredits}</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                      <span className="text-slate-400">Community:</span>
                      <span className="text-purple-300 font-bold">{plan.communityAccess}</span>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="space-y-3 mb-8 text-xs">
                    <span className="text-[10px] uppercase font-mono font-bold text-slate-400 block mb-2">
                      Included Capabilities:
                    </span>
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => onSelectPlan(plan)}
                  className={`w-full py-3.5 rounded-xl font-bold text-xs transition-all shadow-lg flex items-center justify-center gap-2 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white hover:opacity-95 shadow-cyan-950/50'
                      : 'bg-slate-900 hover:bg-slate-800 text-white border border-slate-700'
                  }`}
                >
                  <span>{plan.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

              </div>
            );
          })}
        </div>

        {/* Money-back Guarantee Banner */}
        <div className="mt-12 text-center text-xs text-slate-400 flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>14-day 100% money-back guarantee. No questions asked. Cancel anytime in 1 click.</span>
        </div>

      </div>
    </section>
  );
};
