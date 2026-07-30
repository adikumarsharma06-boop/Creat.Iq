import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe2, Users, Radio, Sparkles, Navigation, Search, CheckCircle2, ArrowRight, Zap, Shield, ChevronRight, X } from 'lucide-react';
import { useEcosystem } from '../context/EcosystemContext';

export interface GlobalHub {
  id: string;
  city: string;
  country: string;
  flag: string;
  region: 'Americas' | 'Europe' | 'Asia-Pacific' | 'Middle East & Africa';
  x: number; // SVG viewBox coordinate X (0-1000)
  y: number; // SVG viewBox coordinate Y (0-500)
  activeUsers: number;
  activeProjects: string[];
  latency: string;
  status: 'Optimal' | 'Active' | 'High Traffic';
  squadLead: string;
}

export const GLOBAL_HUBS: GlobalHub[] = [
  {
    id: 'sf',
    city: 'San Francisco',
    country: 'USA',
    flag: '🇺🇸',
    region: 'Americas',
    x: 170,
    y: 175,
    activeUsers: 580,
    activeProjects: ['Generative LLM Agent Studio', 'Silicon Valley Founder Incubator'],
    latency: '8ms',
    status: 'Optimal',
    squadLead: 'Alex Chen'
  },
  {
    id: 'nyc',
    city: 'New York',
    country: 'USA',
    flag: '🇺🇸',
    region: 'Americas',
    x: 275,
    y: 165,
    activeUsers: 410,
    activeProjects: ['FinTech AI Trading Models', 'Creative Neural Design Lab'],
    latency: '11ms',
    status: 'Optimal',
    squadLead: 'Sarah Jenkins'
  },
  {
    id: 'toronto',
    city: 'Toronto',
    country: 'Canada',
    flag: '🇨🇦',
    region: 'Americas',
    x: 255,
    y: 140,
    activeUsers: 230,
    activeProjects: ['Medical Vision AI', 'Quantum AI Research'],
    latency: '14ms',
    status: 'Active',
    squadLead: 'Liam Patel'
  },
  {
    id: 'austin',
    city: 'Austin',
    country: 'USA',
    flag: '🇺🇸',
    region: 'Americas',
    x: 215,
    y: 205,
    activeUsers: 190,
    activeProjects: ['Autonomous Hardware AI', 'Prompt Matrix Engine'],
    latency: '12ms',
    status: 'Optimal',
    squadLead: 'Marcus Vance'
  },
  {
    id: 'mexico',
    city: 'Mexico City',
    country: 'Mexico',
    flag: '🇲🇽',
    region: 'Americas',
    x: 205,
    y: 235,
    activeUsers: 160,
    activeProjects: ['LATAM EdTech AI Hub', 'Voice AI Translation'],
    latency: '24ms',
    status: 'Active',
    squadLead: 'Sofia Ramirez'
  },
  {
    id: 'saopaulo',
    city: 'São Paulo',
    country: 'Brazil',
    flag: '🇧🇷',
    region: 'Americas',
    x: 350,
    y: 355,
    activeUsers: 200,
    activeProjects: ['AgriTech AI Sensor Grid', 'FinTech Credit Models'],
    latency: '28ms',
    status: 'Active',
    squadLead: 'Lucas Silva'
  },
  {
    id: 'london',
    city: 'London',
    country: 'UK',
    flag: '🇬🇧',
    region: 'Europe',
    x: 475,
    y: 135,
    activeUsers: 310,
    activeProjects: ['FinTech Fraud Detection AI', 'Autonomous Logistics Matrix'],
    latency: '18ms',
    status: 'Active',
    squadLead: 'Oliver Smith'
  },
  {
    id: 'berlin',
    city: 'Berlin',
    country: 'Germany',
    flag: '🇩🇪',
    region: 'Europe',
    x: 520,
    y: 130,
    activeUsers: 260,
    activeProjects: ['Green Energy AI Grid', 'Generative Audio Synthesizer'],
    latency: '22ms',
    status: 'Active',
    squadLead: 'Hannah Weber'
  },
  {
    id: 'paris',
    city: 'Paris',
    country: 'France',
    flag: '🇫🇷',
    region: 'Europe',
    x: 490,
    y: 148,
    activeUsers: 240,
    activeProjects: ['Fashion Generative Design', 'AI Ethics & Policy Framework'],
    latency: '19ms',
    status: 'Optimal',
    squadLead: 'Julien Dupont'
  },
  {
    id: 'zurich',
    city: 'Zurich',
    country: 'Switzerland',
    flag: '🇨🇭',
    region: 'Europe',
    x: 508,
    y: 142,
    activeUsers: 180,
    activeProjects: ['Precision Robotics AI', 'BioInformatics Models'],
    latency: '16ms',
    status: 'Optimal',
    squadLead: 'Elena Rossi'
  },
  {
    id: 'telaviv',
    city: 'Tel Aviv',
    country: 'Israel',
    flag: '🇮🇱',
    region: 'Middle East & Africa',
    x: 585,
    y: 195,
    activeUsers: 220,
    activeProjects: ['CyberSecurity AI Defense', 'Computer Vision Suite'],
    latency: '21ms',
    status: 'Active',
    squadLead: 'Ariel Katz'
  },
  {
    id: 'dubai',
    city: 'Dubai',
    country: 'UAE',
    flag: '🇦🇪',
    region: 'Middle East & Africa',
    x: 625,
    y: 215,
    activeUsers: 275,
    activeProjects: ['Smart City AI Operating System', 'Web3 & AI Nexus'],
    latency: '15ms',
    status: 'Optimal',
    squadLead: 'Tariq Al-Mansoor'
  },
  {
    id: 'capetown',
    city: 'Cape Town',
    country: 'South Africa',
    flag: '🇿🇦',
    region: 'Middle East & Africa',
    x: 535,
    y: 390,
    activeUsers: 150,
    activeProjects: ['Solar Energy Forecasting AI', 'Mobile First AI Tutor'],
    latency: '32ms',
    status: 'Active',
    squadLead: 'Kagiso Mokoena'
  },
  {
    id: 'bengaluru',
    city: 'Bengaluru',
    country: 'India',
    flag: '🇮🇳',
    region: 'Asia-Pacific',
    x: 700,
    y: 245,
    activeUsers: 490,
    activeProjects: ['Deep Learning Code Generator', 'SaaS AI Builder Engine'],
    latency: '16ms',
    status: 'Optimal',
    squadLead: 'Aditya Sharma'
  },
  {
    id: 'singapore',
    city: 'Singapore',
    country: 'Singapore',
    flag: '🇸🇬',
    region: 'Asia-Pacific',
    x: 780,
    y: 280,
    activeUsers: 290,
    activeProjects: ['APAC Smart City AI Grid', 'Cross-Border AI Payments'],
    latency: '14ms',
    status: 'Optimal',
    squadLead: 'Mei Ling Tan'
  },
  {
    id: 'tokyo',
    city: 'Tokyo',
    country: 'Japan',
    flag: '🇯🇵',
    region: 'Asia-Pacific',
    x: 855,
    y: 180,
    activeUsers: 420,
    activeProjects: ['AI Robotics Neural Net', 'Automated Quantum Trading Bot'],
    latency: '12ms',
    status: 'Optimal',
    squadLead: 'Kenji Sato'
  },
  {
    id: 'seoul',
    city: 'Seoul',
    country: 'South Korea',
    flag: '🇰🇷',
    region: 'Asia-Pacific',
    x: 830,
    y: 175,
    activeUsers: 310,
    activeProjects: ['Autonomous Gaming NPC AI', 'Semiconductor AI Design'],
    latency: '13ms',
    status: 'Optimal',
    squadLead: 'Min-Jae Park'
  },
  {
    id: 'sydney',
    city: 'Sydney',
    country: 'Australia',
    flag: '🇦🇺',
    region: 'Asia-Pacific',
    x: 890,
    y: 385,
    activeUsers: 210,
    activeProjects: ['Climate Risk AI Predictor', 'Oceanic Ecosystem Monitor'],
    latency: '25ms',
    status: 'Active',
    squadLead: 'Chloe Hemsworth'
  }
];

// Connecting Arcs between major hubs
const NETWORK_CONNECTIONS = [
  { from: 'tokyo', to: 'sf' },
  { from: 'sf', to: 'nyc' },
  { from: 'nyc', to: 'london' },
  { from: 'london', to: 'berlin' },
  { from: 'london', to: 'bengaluru' },
  { from: 'bengaluru', to: 'singapore' },
  { from: 'singapore', to: 'tokyo' },
  { from: 'bengaluru', to: 'dubai' },
  { from: 'sf', to: 'austin' },
  { from: 'nyc', to: 'toronto' },
  { from: 'austin', to: 'mexico' },
  { from: 'mexico', to: 'saopaulo' },
  { from: 'london', to: 'paris' },
  { from: 'paris', to: 'zurich' },
  { from: 'dubai', to: 'telaviv' },
  { from: 'dubai', to: 'capetown' },
  { from: 'tokyo', to: 'seoul' },
  { from: 'singapore', to: 'sydney' }
];

export const GlobalCreatorMap: React.FC = () => {
  const { showToast } = useEcosystem();
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [activeHub, setActiveHub] = useState<GlobalHub | null>(GLOBAL_HUBS[13]); // Default Bengaluru
  const [hoveredHub, setHoveredHub] = useState<GlobalHub | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const regions = ['All', 'Americas', 'Europe', 'Asia-Pacific', 'Middle East & Africa'];

  const filteredHubs = GLOBAL_HUBS.filter((hub) => {
    const matchesRegion = selectedRegion === 'All' || hub.region === selectedRegion;
    const matchesSearch =
      searchQuery === '' ||
      hub.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hub.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hub.activeProjects.some((p) => p.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesRegion && matchesSearch;
  });

  const displayHub = hoveredHub || activeHub || GLOBAL_HUBS[0];

  const totalUsers = GLOBAL_HUBS.reduce((acc, h) => acc + h.activeUsers, 0);

  const handleJoinSquad = (hub: GlobalHub) => {
    window.open('https://chat.whatsapp.com/GSALFIw58U0829qCZ3LVUJ', '_blank', 'noopener,noreferrer');
    if (showToast) {
      showToast(
        `Joining ${hub.city} Squad! 🚀`,
        `Redirecting to official Creatiq WhatsApp group for ${hub.city}, ${hub.country}.`
      );
    }
  };

  return (
    <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-5 sm:p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
      
      {/* Background Decorative Mesh Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Header & Controls */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6 relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold mb-2">
            <Globe2 className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>18 GLOBAL AI CREATOR HUBS</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Interactive Global Creator Network
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Hover or tap any of the <span className="text-cyan-400 font-bold">18 global hubs</span> to inspect live active member counts & ongoing AI projects.
          </p>
        </div>

        {/* Search & Stats Badge */}
        <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
          <div className="relative flex-1 lg:w-56">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search 18 hubs or projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-8 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/60"
            />
          </div>

          <div className="px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono font-bold text-emerald-400 flex items-center gap-1.5 shrink-0">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>{totalUsers.toLocaleString()} Members Active</span>
          </div>
        </div>
      </div>

      {/* Region Selector Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none relative z-10">
        {regions.map((region) => {
          const count =
            region === 'All'
              ? GLOBAL_HUBS.length
              : GLOBAL_HUBS.filter((h) => h.region === region).length;
          return (
            <button
              key={region}
              onClick={() => setSelectedRegion(region)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedRegion === region
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-950/50'
                  : 'bg-slate-950/60 text-slate-400 hover:text-white border border-slate-800/80 hover:bg-slate-800/50'
              }`}
            >
              <span>{region}</span>
              <span className="ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] bg-slate-800/80 text-cyan-300 font-mono">
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Map SVG Viewport + Interactive Floating Info Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-10">
        
        {/* SVG World Map Vector Overlay (8 Cols) */}
        <div className="lg:col-span-8 bg-slate-950/90 border border-slate-800/90 rounded-2xl p-3 sm:p-5 relative overflow-hidden group shadow-inner">
          
          {/* Subtle Grid Background Lines */}
          <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

          {/* SVG Map Container */}
          <div className="relative w-full aspect-[2/1] min-h-[260px] sm:min-h-[340px]">
            <svg
              viewBox="0 0 1000 500"
              className="w-full h-full select-none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Glow Filter for Nodes */}
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>

                {/* Arc Gradient */}
                <linearGradient id="arcGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#a855f7" stopOpacity="0.8" />
                </linearGradient>
              </defs>

              {/* Simplified Continent Silhouette Outlines */}
              <g fill="#1e293b" opacity="0.45" stroke="#334155" strokeWidth="0.8">
                {/* North America */}
                <path d="M 120 80 Q 200 60 300 90 T 320 220 Q 250 260 180 230 Q 120 180 120 80 Z" />
                {/* South America */}
                <path d="M 290 280 Q 380 290 390 380 T 330 460 Q 280 400 290 280 Z" />
                {/* Europe */}
                <path d="M 450 80 Q 550 70 570 160 T 460 180 Q 430 130 450 80 Z" />
                {/* Africa */}
                <path d="M 450 200 Q 580 200 580 320 T 520 420 Q 440 340 450 200 Z" />
                {/* Asia */}
                <path d="M 580 80 Q 880 70 900 220 T 680 280 Q 580 200 580 80 Z" />
                {/* Australia */}
                <path d="M 820 340 Q 920 330 920 420 T 830 430 Q 800 380 820 340 Z" />
              </g>

              {/* Network Connections (Arcs between major hubs) */}
              <g stroke="url(#arcGrad)" strokeWidth="1" fill="none" opacity="0.5">
                {NETWORK_CONNECTIONS.map((conn, idx) => {
                  const source = GLOBAL_HUBS.find((h) => h.id === conn.from);
                  const target = GLOBAL_HUBS.find((h) => h.id === conn.to);
                  if (!source || !target) return null;

                  const isHighlighted =
                    displayHub?.id === source.id || displayHub?.id === target.id;

                  // Curved control point for curved arc
                  const midX = (source.x + target.x) / 2;
                  const midY = (source.y + target.y) / 2 - 40;

                  return (
                    <path
                      key={`${conn.from}-${conn.to}-${idx}`}
                      d={`M ${source.x} ${source.y} Q ${midX} ${midY} ${target.x} ${target.y}`}
                      stroke={isHighlighted ? '#06b6d4' : '#3b82f6'}
                      strokeWidth={isHighlighted ? 2.5 : 1}
                      strokeDasharray={isHighlighted ? 'none' : '4,4'}
                      opacity={isHighlighted ? 0.95 : 0.35}
                      className="transition-all duration-300"
                    />
                  );
                })}
              </g>

              {/* 18 Global Hub SVG Markers & Pulse Animation */}
              {GLOBAL_HUBS.map((hub) => {
                const isSelected = displayHub?.id === hub.id;
                const isFilteredOut =
                  (selectedRegion !== 'All' && hub.region !== selectedRegion) ||
                  (searchQuery !== '' && !filteredHubs.some((f) => f.id === hub.id));

                if (isFilteredOut) {
                  return (
                    <circle
                      key={hub.id}
                      cx={hub.x}
                      cy={hub.y}
                      r="3"
                      fill="#475569"
                      opacity="0.25"
                    />
                  );
                }

                return (
                  <g
                    key={hub.id}
                    className="cursor-pointer group/node"
                    onMouseEnter={() => setHoveredHub(hub)}
                    onMouseLeave={() => setHoveredHub(null)}
                    onClick={() => setActiveHub(hub)}
                  >
                    {/* Outer Pulse Effect */}
                    <circle
                      cx={hub.x}
                      cy={hub.y}
                      r={isSelected ? '16' : '10'}
                      fill={isSelected ? '#06b6d4' : '#3b82f6'}
                      opacity={isSelected ? '0.35' : '0.15'}
                      className="animate-ping"
                    />

                    {/* Outer Ring */}
                    <circle
                      cx={hub.x}
                      cy={hub.y}
                      r={isSelected ? '9' : '6'}
                      fill="none"
                      stroke={isSelected ? '#22d3ee' : '#60a5fa'}
                      strokeWidth={isSelected ? '2' : '1.5'}
                      filter="url(#glow)"
                    />

                    {/* Core Point */}
                    <circle
                      cx={hub.x}
                      cy={hub.y}
                      r={isSelected ? '5' : '3.5'}
                      fill={isSelected ? '#ffffff' : '#38bdf8'}
                    />

                    {/* City Label Tag */}
                    <text
                      x={hub.x}
                      y={hub.y - 12}
                      textAnchor="middle"
                      fill={isSelected ? '#22d3ee' : '#94a3b8'}
                      fontSize={isSelected ? '11' : '9'}
                      fontWeight={isSelected ? 'bold' : 'normal'}
                      fontFamily="monospace"
                      className="pointer-events-none transition-all"
                    >
                      {hub.city}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Live Orbit Status Floating Badge */}
            <div className="absolute bottom-3 left-3 bg-slate-900/90 border border-slate-800 rounded-xl px-3 py-1.5 backdrop-blur-md flex items-center gap-2 text-[10px] font-mono text-slate-300">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>Live Mesh Active • 18 Global Nodes Synchronized</span>
            </div>
          </div>
        </div>

        {/* Selected Hub Detail Card (4 Cols) */}
        <div className="lg:col-span-4 bg-slate-950/90 border border-cyan-500/40 rounded-2xl p-5 shadow-2xl relative overflow-hidden backdrop-blur-2xl flex flex-col justify-between min-h-[340px]">
          
          <div className="space-y-4">
            
            {/* Hub Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">{displayHub.flag}</span>
                <div>
                  <h4 className="text-lg font-black text-white flex items-center gap-1.5">
                    <span>{displayHub.city}</span>
                    <span className="text-xs font-mono font-normal text-slate-400">
                      ({displayHub.country})
                    </span>
                  </h4>
                  <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-wider">
                    {displayHub.region} Hub
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 inline-flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {displayHub.status}
                </span>
                <div className="text-[10px] font-mono text-slate-400 mt-1">
                  {displayHub.latency} ping
                </div>
              </div>
            </div>

            {/* Active Members Metric */}
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800/80 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-bold text-slate-300">Active Creators</span>
              </div>
              <div className="text-right">
                <span className="text-lg font-black text-cyan-300 font-mono">
                  {displayHub.activeUsers}
                </span>
                <span className="text-[10px] text-slate-500 block">
                  {((displayHub.activeUsers / totalUsers) * 100).toFixed(1)}% of global mesh
                </span>
              </div>
            </div>

            {/* Squad Leader */}
            <div className="text-xs text-slate-300 flex items-center justify-between p-2.5 rounded-xl bg-slate-900/40 border border-slate-800/50">
              <span className="text-slate-400 font-mono">Regional Squad Lead:</span>
              <span className="font-bold text-purple-300 flex items-center gap-1">
                <Zap className="w-3 h-3 text-purple-400" />
                {displayHub.squadLead}
              </span>
            </div>

            {/* Active Projects List */}
            <div className="space-y-2">
              <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                Top Active AI Projects
              </span>
              <div className="space-y-1.5">
                {displayHub.activeProjects.map((proj, idx) => (
                  <div
                    key={idx}
                    className="p-2 rounded-lg bg-slate-900/60 border border-slate-800 text-xs text-slate-200 flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span className="truncate">{proj}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Action Button */}
          <div className="mt-5 pt-3 border-t border-slate-800">
            <button
              onClick={() => handleJoinSquad(displayHub)}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white font-bold text-xs hover:opacity-95 transition-all shadow-lg shadow-cyan-950/60 flex items-center justify-center gap-2 cursor-pointer group"
            >
              <span>Join {displayHub.city} Regional Squad</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>

      </div>

      {/* Grid List of All 18 Hubs Quick Cards (Accordion or Grid view) */}
      <div className="mt-8 pt-6 border-t border-slate-800/80">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
            All 18 Global Creator Hubs Directory
          </span>
          <span className="text-xs text-cyan-400 font-mono">
            Showing {filteredHubs.length} of 18 Hubs
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {filteredHubs.map((hub) => {
            const isSelected = displayHub.id === hub.id;
            return (
              <button
                key={hub.id}
                onClick={() => setActiveHub(hub)}
                className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-cyan-950/40 border-cyan-500/60 shadow-md shadow-cyan-950/50'
                    : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-base">{hub.flag}</span>
                  <span className="text-[10px] font-mono font-bold text-cyan-400">
                    {hub.activeUsers}
                  </span>
                </div>
                <div className="text-xs font-bold text-white truncate">{hub.city}</div>
                <div className="text-[10px] text-slate-400 truncate">{hub.country}</div>
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
};
