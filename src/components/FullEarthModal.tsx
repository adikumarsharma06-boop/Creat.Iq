import React, { useState } from 'react';
import { X, Globe2, Sparkles, Navigation, Cpu, Users, Zap, Maximize2, ShieldCheck, Compass } from 'lucide-react';
import { SpaceGlobe } from './3d/SpaceGlobe';
import { useEcosystem } from '../context/EcosystemContext';

interface FullEarthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FullEarthModal: React.FC<FullEarthModalProps> = ({ isOpen, onClose }) => {
  const { activeCreatorsCount, globalHubsCount } = useEcosystem();
  const [selectedHub, setSelectedHub] = useState<string>('Tokyo Hub');

  if (!isOpen) return null;

  const hubDetails: Record<string, { lat: string; lng: string; creators: number; activeProjects: string[]; status: string }> = {
    'Tokyo Hub': { lat: '35.6762° N', lng: '139.6503° E', creators: 420, activeProjects: ['AI Robotics Neural Net', 'Automated Quantum Trading Bot'], status: 'Optimal (12ms latency)' },
    'San Francisco Hub': { lat: '37.7749° N', lng: '122.4194° W', creators: 580, activeProjects: ['LLM Generative Agent', 'Silicon Valley AI Incubator'], status: 'Optimal (8ms latency)' },
    'London Hub': { lat: '51.5074° N', lng: '0.1278° W', creators: 310, activeProjects: ['FinTech Fraud Detection', 'Autonomous Logistics Matrix'], status: 'Active (18ms latency)' },
    'Singapore Hub': { lat: '1.3521° N', lng: '103.8198° E', creators: 290, activeProjects: ['APAC Smart City AI', 'Cross-Border Payments AI'], status: 'Optimal (14ms latency)' },
    'Berlin Hub': { lat: '52.5200° N', lng: '13.4050° E', creators: 260, activeProjects: ['Green Energy AI Grid', 'Creative Music Synthesizer'], status: 'Active (22ms latency)' },
    'Bengaluru Hub': { lat: '12.9716° N', lng: '77.5946° E', creators: 490, activeProjects: ['Deep Learning Code Generator', 'SaaS AI Builder Engine'], status: 'Optimal (16ms latency)' },
  };

  const currentDetails = hubDetails[selectedHub] || hubDetails['Tokyo Hub'];

  return (
    <div className="fixed inset-0 z-[80] bg-slate-950/95 backdrop-blur-2xl flex flex-col animate-in fade-in duration-300 overflow-hidden">
      
      {/* Header Bar */}
      <div className="px-6 py-4 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between shrink-0 z-20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600 p-0.5 shadow-xl shadow-cyan-950/50">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <Globe2 className="w-5 h-5 text-cyan-400 animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-extrabold text-white">Full 3D Earth Globe Matrix</h2>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                LIVE ORBIT
              </span>
            </div>
            <p className="text-xs text-slate-400">Interactive 3D Space View with Global Creatiq Network Mesh</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="p-2.5 rounded-2xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Full Screen View */}
      <div className="flex-1 relative flex flex-col lg:flex-row overflow-hidden">
        
        {/* Left Interactive Node Panel */}
        <div className="lg:w-80 bg-slate-950/80 border-r border-slate-800/80 p-5 space-y-4 overflow-y-auto z-10 shrink-0 backdrop-blur-md">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
            <Navigation className="w-4 h-4" />
            <span>Select Global Hub Node</span>
          </div>

          <div className="space-y-2">
            {Object.keys(hubDetails).map((hub) => (
              <button
                key={hub}
                onClick={() => setSelectedHub(hub)}
                className={`w-full p-3 rounded-2xl text-left transition-all flex items-center justify-between ${
                  selectedHub === hub
                    ? 'bg-gradient-to-r from-cyan-950/90 to-purple-950/90 border border-cyan-500/50 text-white shadow-xl'
                    : 'bg-slate-900/50 border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <div>
                  <div className="font-bold text-xs text-slate-200">{hub}</div>
                  <div className="text-[10px] text-slate-500 font-mono">{hubDetails[hub].lat} • {hubDetails[hub].lng}</div>
                </div>
                {selectedHub === hub && (
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                )}
              </button>
            ))}
          </div>

          {/* Selected Hub Telemetry Box */}
          <div className="bg-slate-900/90 border border-cyan-500/30 rounded-2xl p-4 space-y-3 text-xs">
            <div className="font-bold text-white flex items-center justify-between">
              <span>{selectedHub} Telemetry</span>
              <span className="text-[10px] font-mono text-emerald-400">{currentDetails.status}</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
              <div className="bg-slate-950 p-2 rounded-xl border border-slate-800">
                <span className="text-slate-500 block text-[9px]">CREATORS</span>
                <span className="text-cyan-300 font-bold">{currentDetails.creators} Members</span>
              </div>
              <div className="bg-slate-950 p-2 rounded-xl border border-slate-800">
                <span className="text-slate-500 block text-[9px]">COORDINATES</span>
                <span className="text-purple-300 font-bold truncate">{currentDetails.lat}</span>
              </div>
            </div>

            <div>
              <span className="text-slate-400 text-[10px] block font-semibold mb-1">ACTIVE NODE PROJECTS</span>
              <ul className="space-y-1">
                {currentDetails.activeProjects.map((p, idx) => (
                  <li key={idx} className="text-[11px] text-slate-300 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Center 3D Earth Globe Canvas Area */}
        <div className="flex-1 relative w-full h-full flex items-center justify-center">
          <SpaceGlobe className="w-full h-full" onSelectNode={(node) => setSelectedHub(node)} />

          {/* Bottom Floating Stats Overlay */}
          <div className="absolute bottom-6 left-6 right-6 md:left-auto md:right-8 bg-slate-950/80 backdrop-blur-md border border-slate-800 rounded-2xl p-4 text-xs text-slate-300 max-w-md shadow-2xl space-y-2 pointer-events-none z-10">
            <div className="flex items-center gap-2 font-mono font-bold text-cyan-300">
              <Compass className="w-4 h-4 text-cyan-400" />
              <span>Creatiq Neural Earth Protocol</span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Drag to spin the 3D Earth in 360°. Click any glowing pulse node to stream live AI task memory and connect with creators globally.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};
