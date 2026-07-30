import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Menu, X, Rocket, Users, BookOpen, Layout, Cpu, ArrowRight, ShieldCheck, Search, Download, User, LogOut, LogIn, ChevronDown, Globe2, Database } from 'lucide-react';
import { useEcosystem } from '../context/EcosystemContext';
import { NLogo } from './NLogo';

interface NavbarProps {
  activePage: string;
  setActivePage: (page: string) => void;
  onOpenSandbox: () => void;
  onOpenCreatorCard: () => void;
  onOpenDemo: () => void;
  onOpenInstallModal: () => void;
  onOpenFullEarth?: () => void;
  onOpenDataExport?: () => void;
  onOpenStartupTerms?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activePage,
  setActivePage,
  onOpenSandbox,
  onOpenCreatorCard,
  onOpenDemo,
  onOpenInstallModal,
  onOpenFullEarth,
  onOpenDataExport,
  onOpenStartupTerms,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const { activeCreatorsCount, globalHubsCount, user, openAuthModal, logout } = useEcosystem();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Overview' },
    { id: 'tools', label: 'AI Features' },
    { id: 'community', label: 'Community' },
    { id: 'learning', label: 'Learning Hub' },
    { id: 'workspaces', label: 'Workspace' },
    { id: 'pricing', label: 'Pricing' },
  ];

  return (
    <>
      {/* Top Notification / Stats Banner */}
      <div className="bg-gradient-to-r from-cyan-950 via-slate-950 to-purple-950 text-slate-300 text-xs py-2 px-4 border-b border-cyan-500/20">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 font-semibold text-[10px] border border-cyan-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              LIVE ECOSYSTEM
            </span>
            <span className="hidden sm:inline text-slate-300">
              ⚡ <strong className="text-white">{activeCreatorsCount}</strong> creators active right now across {globalHubsCount} global hubs
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs shrink-0">
            <button
              onClick={onOpenDemo}
              className="hover:text-cyan-300 flex items-center gap-1 transition-colors"
            >
              <Rocket className="w-3.5 h-3.5 text-cyan-400" />
              Watch Demo (2 mins)
            </button>
            <button
              onClick={onOpenCreatorCard}
              className="text-purple-300 hover:text-purple-200 font-medium flex items-center gap-1 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              Generate Creator Card
            </button>
          </div>
        </div>
      </div>

      {/* Main Glass Header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-slate-950/85 backdrop-blur-xl border-b border-slate-800/80 shadow-2xl shadow-cyan-950/20 py-3'
            : 'bg-slate-950/40 backdrop-blur-md border-b border-slate-800/30 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => {
              setActivePage('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-3 group text-left"
          >
            <NLogo size="md" animated={true} />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold tracking-tight text-white font-sans">
                  c.<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 font-mono">iq</span>
                  <span className="text-slate-100 font-sans ml-1">Creatiq</span>
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  c.iq v3.0
                </span>
              </div>
              <p className="text-[10px] text-indigo-300/80 tracking-wider font-medium uppercase -mt-0.5 hidden sm:block">
                Dark Blue & Purple Core AI
              </p>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-2 text-xs font-semibold">
            {navLinks.map((link) => {
              const isActive = activePage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => {
                    setActivePage(link.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`px-3 py-1.5 rounded-xl transition-colors relative ${
                    isActive
                      ? 'text-cyan-300 font-bold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="navbar-active-bg"
                      className="absolute inset-0 bg-slate-900 border border-cyan-500/40 rounded-xl shadow-sm -z-10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="navbar-active-line"
                      className="absolute bottom-0 left-2 right-2 h-[2px] bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-2.5">
            {onOpenStartupTerms && (
              <button
                onClick={onOpenStartupTerms}
                className="px-3 py-2 rounded-xl text-xs font-semibold text-purple-300 bg-slate-900 border border-purple-500/40 hover:bg-purple-950/60 transition-all shadow-sm flex items-center gap-1.5"
                title="View Startup Core Terms & How It Works"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                <span>Core Terms</span>
              </button>
            )}

            {onOpenDataExport && (
              <button
                onClick={onOpenDataExport}
                className="px-3 py-2 rounded-xl text-xs font-semibold text-emerald-300 bg-slate-900 border border-emerald-500/40 hover:bg-emerald-950/60 transition-all shadow-sm flex items-center gap-1.5"
                title="Export Data & Backup Vault"
              >
                <Database className="w-3.5 h-3.5 text-emerald-400" />
                <span>Backup Data</span>
              </button>
            )}

            <button
              onClick={onOpenSandbox}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold text-cyan-300 bg-cyan-950/60 border border-cyan-500/40 hover:bg-cyan-900/50 hover:border-cyan-400 transition-all shadow-sm flex items-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              AI Sandbox
            </button>

            {/* Account Profile or Sign In */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-500/50 transition-all text-xs text-slate-200"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-6 h-6 rounded-full bg-slate-800 object-cover border border-cyan-500/40"
                  />
                  <div className="text-left hidden md:block leading-tight">
                    <div className="font-bold text-white max-w-[100px] truncate">{user.name}</div>
                    <div className="text-[10px] text-cyan-400 font-mono">{user.badge}</div>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {/* User Profile Dropdown */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl p-3 z-50 space-y-2 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="p-2 bg-slate-900/80 rounded-xl border border-slate-800 space-y-1">
                      <div className="font-bold text-white text-xs">{user.name}</div>
                      <div className="text-[10px] text-slate-400 truncate">{user.email}</div>
                      <div className="inline-block px-1.5 py-0.5 rounded text-[9px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                        {user.role}
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onOpenCreatorCard();
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-300 hover:text-cyan-300 hover:bg-slate-900 rounded-xl flex items-center gap-2 transition-colors"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                      View Creator Card
                    </button>

                    {onOpenDataExport && (
                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          onOpenDataExport();
                        }}
                        className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-300 hover:text-emerald-300 hover:bg-slate-900 rounded-xl flex items-center gap-2 transition-colors"
                      >
                        <Database className="w-3.5 h-3.5 text-emerald-400" />
                        Data Backup & Sync
                      </button>
                    )}

                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        logout();
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-semibold text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 rounded-xl flex items-center gap-2 transition-colors"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => openAuthModal('login')}
                className="px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-cyan-600 hover:opacity-90 transition-all shadow-lg flex items-center gap-1.5"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </button>
            )}
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-300 hover:text-white rounded-lg bg-slate-900/60 border border-slate-800"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-cyan-400" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-slate-950/95 border-b border-slate-800 backdrop-blur-2xl px-4 pt-3 pb-6 mt-3 space-y-3 animate-in slide-in-from-top-4 duration-200">
            <div className="grid grid-cols-2 gap-2 pb-2 border-b border-slate-800">
              {navLinks.map((link) => {
                const isActive = activePage === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => {
                      setActivePage(link.id);
                      setMobileMenuOpen(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`px-3 py-2 text-xs font-bold rounded-xl text-left transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-cyan-950 to-purple-950 border border-cyan-500/40 text-cyan-300'
                        : 'text-slate-300 hover:text-white hover:bg-slate-900'
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
            </div>

            <div className="flex flex-col gap-2 pt-2">
              {user ? (
                <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full border border-cyan-500/40" />
                    <div>
                      <div className="font-bold text-white text-xs">{user.name}</div>
                      <div className="text-[10px] text-cyan-400 font-mono">{user.role}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      logout();
                    }}
                    className="p-1.5 rounded-lg bg-rose-950/60 text-rose-400 hover:text-rose-300"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openAuthModal('login');
                  }}
                  className="w-full py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-cyan-600 flex items-center justify-center gap-2"
                >
                  <LogIn className="w-4 h-4" />
                  Sign In / Create Account
                </button>
              )}

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSandbox();
                }}
                className="w-full py-2.5 rounded-xl text-xs font-semibold text-cyan-300 bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-cyan-400" />
                Launch Live AI Sandbox
              </button>

              <a
                href="#pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-cyan-500 to-purple-600 flex items-center justify-center gap-2 shadow-lg shadow-purple-900/40"
              >
                Start Free Platform Account
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
