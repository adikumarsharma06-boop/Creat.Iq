import React, { useState } from 'react';
import {
  CheckCircle2, XCircle, ShieldCheck, Zap, Layers, Sparkles, Calculator,
  DollarSign, Clock, Users, ArrowRight
} from 'lucide-react';

export const WhyCreatiq: React.FC = () => {
  const [weeklyHours, setWeeklyHours] = useState<number>(15);
  const [currentToolSpend, setCurrentToolSpend] = useState<number>(2500);

  // ROI Calculator Math (in INR ₹)
  const timeSavedPerMonth = Math.round(weeklyHours * 0.6 * 4.3);
  const moneySavedPerYear = Math.max(0, (currentToolSpend - 499) * 12);

  return (
    <section id="why" className="py-24 bg-slate-950 relative overflow-hidden border-t border-slate-900">
      {/* Background Atmosphere Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-r from-cyan-600/10 via-purple-600/10 to-blue-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            Why Choose Creatiq Ecosystem
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Stop Fragmenting Your Work.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
              Unify Everything.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            See how Creatiq replaces 8+ disconnected software subscriptions with one intuitive, community-backed platform.
          </p>
        </div>

        {/* Comparison Matrix Table */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-xl mb-20">
          <div className="p-6 bg-slate-950 border-b border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-white">Creatiq vs Traditional Tool Stack</h3>
              <p className="text-xs text-slate-400">Comparison based on standard creator and student workflows</p>
            </div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 font-mono">
              <span>Save ~₹24,000/year per user</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/60 text-slate-400 uppercase font-mono border-b border-slate-800">
                <tr>
                  <th className="p-4 sm:p-5">Feature & Capability</th>
                  <th className="p-4 sm:p-5 text-cyan-300 font-bold bg-cyan-950/40">Creatiq All-in-One</th>
                  <th className="p-4 sm:p-5 text-slate-400">Traditional Stack</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                <tr>
                  <td className="p-4 sm:p-5 font-bold text-white">Number of Subscriptions</td>
                  <td className="p-4 sm:p-5 bg-cyan-950/20 font-bold text-cyan-300">1 Unified Subscription</td>
                  <td className="p-4 sm:p-5 text-slate-400">5 - 8 Separate Subscriptions</td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-bold text-white">Integrated AI Engines</td>
                  <td className="p-4 sm:p-5 bg-cyan-950/20 font-bold text-cyan-300">15 Specialized Tools</td>
                  <td className="p-4 sm:p-5 text-slate-400">1 or 2 Basic Models</td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-bold text-white">Interactive Learning Paths</td>
                  <td className="p-4 sm:p-5 bg-cyan-950/20 font-bold text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Included with Tutors & Certificates
                  </td>
                  <td className="p-4 sm:p-5 text-slate-400 flex items-center gap-1.5">
                    <XCircle className="w-4 h-4 text-rose-400" /> Paid Third-Party Courses
                  </td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-bold text-white">Global Community & Teammates</td>
                  <td className="p-4 sm:p-5 bg-cyan-950/20 font-bold text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Built-in Squads & Hackathons
                  </td>
                  <td className="p-4 sm:p-5 text-slate-400 flex items-center gap-1.5">
                    <XCircle className="w-4 h-4 text-rose-400" /> Isolated Single-User App
                  </td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-bold text-white">Unified Workspace & Notes</td>
                  <td className="p-4 sm:p-5 bg-cyan-950/20 font-bold text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Auto-Synced Knowledge Vault
                  </td>
                  <td className="p-4 sm:p-5 text-slate-400 flex items-center gap-1.5">
                    <XCircle className="w-4 h-4 text-rose-400" /> Copy-Pasting Across Tabs
                  </td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-bold text-white">Learning Curve for Beginners</td>
                  <td className="p-4 sm:p-5 bg-cyan-950/20 font-bold text-cyan-300">Human-Friendly (0 Jargon)</td>
                  <td className="p-4 sm:p-5 text-slate-400">Complex Prompt Engineering Required</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Interactive ROI Time-Saver Calculator */}
        <div className="bg-gradient-to-r from-slate-900 via-cyan-950/60 to-purple-950/60 border border-cyan-500/30 rounded-3xl p-8 md:p-12 backdrop-blur-2xl">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
              <Calculator className="w-3.5 h-3.5 text-cyan-400" />
              Interactive ROI & Time-Saver Estimator
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Calculate Your Personal Time & Money Savings
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Adjust the sliders below based on your current weekly tasks and software expenses.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Sliders Input Column */}
            <div className="lg:col-span-7 space-y-6 bg-slate-950/80 p-6 rounded-2xl border border-slate-800">
              
              {/* Slider 1: Weekly Work Hours */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-300">Hours spent on research, writing, coding & tasks per week:</span>
                  <span className="text-cyan-400 font-mono text-sm">{weeklyHours} hrs/week</span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={60}
                  step={5}
                  value={weeklyHours}
                  onChange={(e) => setWeeklyHours(Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>

              {/* Slider 2: Current Monthly Spend */}
              <div className="space-y-2 pt-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-300">Current monthly spend on separate AI/Software tools:</span>
                  <span className="text-purple-400 font-mono text-sm">₹{currentToolSpend}/month</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={10000}
                  step={200}
                  value={currentToolSpend}
                  onChange={(e) => setCurrentToolSpend(Number(e.target.value))}
                  className="w-full accent-purple-400 cursor-pointer"
                />
              </div>

            </div>

            {/* Calculated Output Column */}
            <div className="lg:col-span-5 bg-slate-950 border border-cyan-500/40 rounded-2xl p-6 text-center space-y-6 shadow-xl">
              <div>
                <span className="text-xs uppercase font-mono text-slate-400 font-bold block mb-1">
                  Estimated Time Saved
                </span>
                <div className="text-3xl sm:text-4xl font-extrabold text-cyan-400 font-mono">
                  ~{timeSavedPerMonth} Hours / mo
                </div>
                <p className="text-[11px] text-slate-400 mt-1">Reclaimed for creative work, rest or building projects.</p>
              </div>

              <div className="pt-4 border-t border-slate-800">
                <span className="text-xs uppercase font-mono text-slate-400 font-bold block mb-1">
                  Estimated Yearly Money Saved
                </span>
                <div className="text-3xl sm:text-4xl font-extrabold text-purple-400 font-mono">
                  ₹{moneySavedPerYear.toLocaleString('en-IN')} / yr
                </div>
                <p className="text-[11px] text-slate-400 mt-1">Compared to maintaining a fragmented tool stack.</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
