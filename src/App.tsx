import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { EcosystemEngineProvider } from './context/EcosystemEngineContext';
import { UserProvider } from './context/UserContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { WhatIsCreatiq } from './components/WhatIsCreatiq';
import { AIFeatures } from './components/AIFeatures';
import { CommunityHub } from './components/CommunityHub';
import { LearningHub } from './components/LearningHub';
import { WorkspaceShowcase } from './components/WorkspaceShowcase';
import { WhyCreatiq } from './components/WhyCreatiq';
import { Testimonials } from './components/Testimonials';
import { Pricing } from './components/Pricing';
import { FAQ } from './components/FAQ';
import { SocialConnectHighlight } from './components/SocialConnectHighlight';
import { Footer } from './components/Footer';

// Modals
import { AISandboxModal } from './components/AISandboxModal';
import { CreatorCardModal } from './components/CreatorCardModal';
import { DemoVideoModal } from './components/DemoVideoModal';
import { CertificateModal } from './components/CertificateModal';
import { InstallModal } from './components/InstallModal';
import { AuthModal } from './components/AuthModal';
import { FullEarthModal } from './components/FullEarthModal';
import { PaymentModal } from './components/PaymentModal';
import { DataExportModal } from './components/DataExportModal';
import { StartupCoreTermsModal } from './components/StartupCoreTermsModal';
import { FounderBox } from './components/FounderBox';
import { MvpLaunchSection } from './components/MvpLaunchSection';
import { GrowthRoadmap } from './components/GrowthRoadmap';
import { MouseFollower } from './components/MouseFollower';
import { CreatiqSplashLoader } from './components/CreatiqSplashLoader';
import { AutoFadeToast } from './components/AutoFadeToast';

import { AIFeature, LearningPath, PricingPlan } from './types';
import { AI_FEATURES, PRICING_PLANS } from './data/mockData';
import { ArrowRight, ArrowLeft, Sparkles, Zap, Users, BookOpen, Layout, CreditCard, Compass, ChevronRight } from 'lucide-react';
import { UserActivityTracker } from './services/UserActivityTracker';

export default function App() {
  const [activePage, setActivePage] = useState<string>('home');

  const [isSandboxOpen, setIsSandboxOpen] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<AIFeature>(AI_FEATURES[0]);

  const [isCreatorCardOpen, setIsCreatorCardOpen] = useState(false);
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [isFullEarthOpen, setIsFullEarthOpen] = useState(false);
  const [isDataExportOpen, setIsDataExportOpen] = useState(false);
  const [isStartupTermsOpen, setIsStartupTermsOpen] = useState(false);

  const [selectedPathForCert, setSelectedPathForCert] = useState<LearningPath | null>(null);
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);

  // PWA Install State
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallModalOpen, setIsInstallModalOpen] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  // Track page transitions
  useEffect(() => {
    const title = pageSequence.find((p) => p.id === activePage)?.title || activePage;
    UserActivityTracker.logPageView(activePage, title);
  }, [activePage]);

  const handleOpenSandboxWithFeature = (feature: AIFeature) => {
    UserActivityTracker.logFeatureUsed(feature.title, `Category: ${feature.category}`, activePage);
    setSelectedFeature(feature);
    setIsSandboxOpen(true);
  };

  const handleOpenCertificateModal = (path: LearningPath) => {
    UserActivityTracker.logActivity('modal_opened', `Viewed Certificate for ${path.title}`, `Level: ${path.level}`);
    setSelectedPathForCert(path);
    setIsCertModalOpen(true);
  };

  const [selectedPlanForPayment, setSelectedPlanForPayment] = useState<PricingPlan | null>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const handleSelectPlan = (plan: PricingPlan) => {
    UserActivityTracker.logPlanSelected(plan.name, plan.priceMonthly);
    setSelectedPlanForPayment(plan);
    setIsPaymentModalOpen(true);
  };

  const goToPage = (pageId: string) => {
    setActivePage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Helper page order for sequential navigation
  const pageSequence = [
    { id: 'home', title: 'Home Overview' },
    { id: 'tools', title: '15 Core AI Tools' },
    { id: 'community', title: 'Creator Community' },
    { id: 'learning', title: 'Learning Hub & Certs' },
    { id: 'workspaces', title: 'Workspace & ROI' },
    { id: 'pricing', title: 'Pricing & FAQs' },
  ];

  const currentPageIndex = pageSequence.findIndex((p) => p.id === activePage);
  const prevPage = currentPageIndex > 0 ? pageSequence[currentPageIndex - 1] : null;
  const nextPage = currentPageIndex < pageSequence.length - 1 ? pageSequence[currentPageIndex + 1] : pageSequence[0];

  return (
    <UserProvider>
      <EcosystemEngineProvider>
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950 overflow-x-hidden">
          
          {/* Mouse Follower Glow Point Effect */}
          <MouseFollower />

          {/* Top Navbar */}
          <Navbar
            activePage={activePage}
            setActivePage={setActivePage}
            onOpenSandbox={() => setIsSandboxOpen(true)}
            onOpenCreatorCard={() => setIsCreatorCardOpen(true)}
            onOpenDemo={() => setIsDemoOpen(true)}
            onOpenInstallModal={() => setIsInstallModalOpen(true)}
            onOpenFullEarth={() => setIsFullEarthOpen(true)}
            onOpenDataExport={() => setIsDataExportOpen(true)}
            onOpenStartupTerms={() => setIsStartupTermsOpen(true)}
          />

          {/* Main Content Area - Render Active Page with Subtle Slide-Up Fade-In Transition */}
          <main className="min-h-[75vh] overflow-hidden relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePage}
                initial={{ opacity: 0, y: 28, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -16, filter: 'blur(4px)' }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="w-full"
              >
                {/* PAGE 1: HOME OVERVIEW */}
                {activePage === 'home' && (
                  <div>
                    <Hero
                      onOpenSandbox={() => setIsSandboxOpen(true)}
                      onOpenCreatorCard={() => setIsCreatorCardOpen(true)}
                    />

                    <WhatIsCreatiq />

                    {/* Founder Story Box */}
                    <FounderBox />

                    {/* Sub-Page Directory Hub */}
                    <section className="py-16 bg-slate-950 border-t border-slate-900 relative overflow-hidden">
                      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
                          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
                            <Compass className="w-3.5 h-3.5 text-cyan-400" />
                            Ecosystem Page Directory
                          </div>
                          <h3 className="text-2xl sm:text-4xl font-extrabold text-white">
                            Explore Creatiq Pages
                          </h3>
                          <p className="text-sm text-slate-400">
                            Click any page below to navigate directly to dedicated tools, community hubs, or learning modules.
                          </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                          <button
                            onClick={() => goToPage('tools')}
                            className="bg-slate-900/60 border border-slate-800 hover:border-cyan-500/50 p-6 rounded-2xl text-left transition-all hover:-translate-y-1 group flex flex-col justify-between"
                          >
                            <div className="space-y-3">
                              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300">
                                <Zap className="w-5 h-5" />
                              </div>
                              <h4 className="text-lg font-bold text-white group-hover:text-cyan-300">15 Core AI Tools Page</h4>
                              <p className="text-xs text-slate-400 leading-relaxed">
                                Full-stack code generators, pitch advisors, research summarizers, and interactive live sandboxes.
                              </p>
                            </div>
                            <div className="pt-4 flex items-center gap-2 text-xs font-bold text-cyan-400">
                              <span>Open AI Tools Page</span>
                              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                            </div>
                          </button>

                          <button
                            onClick={() => goToPage('community')}
                            className="bg-slate-900/60 border border-slate-800 hover:border-purple-500/50 p-6 rounded-2xl text-left transition-all hover:-translate-y-1 group flex flex-col justify-between"
                          >
                            <div className="space-y-3">
                              <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-300">
                                <Users className="w-5 h-5" />
                              </div>
                              <h4 className="text-lg font-bold text-white group-hover:text-purple-300">Creator Community Hub Page</h4>
                              <p className="text-xs text-slate-400 leading-relaxed">
                                Connect with 2,400+ active creators across 18 global hubs, hackathons, and creator passports.
                              </p>
                            </div>
                            <div className="pt-4 flex items-center gap-2 text-xs font-bold text-purple-400">
                              <span>Open Community Page</span>
                              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                            </div>
                          </button>

                          <button
                            onClick={() => goToPage('learning')}
                            className="bg-slate-900/60 border border-slate-800 hover:border-emerald-500/50 p-6 rounded-2xl text-left transition-all hover:-translate-y-1 group flex flex-col justify-between"
                          >
                            <div className="space-y-3">
                              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-300">
                                <BookOpen className="w-5 h-5" />
                              </div>
                              <h4 className="text-lg font-bold text-white group-hover:text-emerald-300">Learning Hub & Certifications Page</h4>
                              <p className="text-xs text-slate-400 leading-relaxed">
                                Step-by-step AI prompt engineering, web development tracks, capstone challenges, and digital certificates.
                              </p>
                            </div>
                            <div className="pt-4 flex items-center gap-2 text-xs font-bold text-emerald-400">
                              <span>Open Learning Page</span>
                              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                            </div>
                          </button>

                          <button
                            onClick={() => goToPage('workspaces')}
                            className="bg-slate-900/60 border border-slate-800 hover:border-blue-500/50 p-6 rounded-2xl text-left transition-all hover:-translate-y-1 group flex flex-col justify-between"
                          >
                            <div className="space-y-3">
                              <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-300">
                                <Layout className="w-5 h-5" />
                              </div>
                              <h4 className="text-lg font-bold text-white group-hover:text-blue-300">Workspace Matrix Page</h4>
                              <p className="text-xs text-slate-400 leading-relaxed">
                                Custom AI personas and memory configurations tailored for students, freelancers, startups, and labs.
                              </p>
                            </div>
                            <div className="pt-4 flex items-center gap-2 text-xs font-bold text-blue-400">
                              <span>Open Workspaces Page</span>
                              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                            </div>
                          </button>

                          <button
                            onClick={() => goToPage('pricing')}
                            className="bg-slate-900/60 border border-slate-800 hover:border-amber-500/50 p-6 rounded-2xl text-left transition-all hover:-translate-y-1 group flex flex-col justify-between md:col-span-2 lg:col-span-2"
                          >
                            <div className="space-y-3">
                              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300">
                                <CreditCard className="w-5 h-5" />
                              </div>
                              <h4 className="text-lg font-bold text-white group-hover:text-amber-300">Plans, Pricing (₹) & FAQs Page</h4>
                              <p className="text-xs text-slate-400 leading-relaxed">
                                Affordable pricing plans starting at ₹499/month with UPI payment integration and ROI calculator.
                              </p>
                            </div>
                            <div className="pt-4 flex items-center gap-2 text-xs font-bold text-amber-400">
                              <span>Open Pricing & FAQs Page</span>
                              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                            </div>
                          </button>
                        </div>
                      </div>
                    </section>

                    {/* Startup Growth & MVP Roadmap */}
                    <GrowthRoadmap />
                  </div>
                )}

                {/* PAGE 2: AI FEATURES & SANDBOX */}
                {activePage === 'tools' && (
                  <div>
                    <AIFeatures
                      onSelectFeatureForSandbox={handleOpenSandboxWithFeature}
                      onOpenPaymentModal={() => handleSelectPlan(PRICING_PLANS[1])}
                    />
                  </div>
                )}

                {/* PAGE 3: COMMUNITY HUB */}
                {activePage === 'community' && (
                  <div>
                    <CommunityHub onOpenCreatorCard={() => setIsCreatorCardOpen(true)} />
                  </div>
                )}

                {/* PAGE 4: LEARNING HUB */}
                {activePage === 'learning' && (
                  <div>
                    <LearningHub onOpenCertificateModal={handleOpenCertificateModal} />
                  </div>
                )}

                {/* PAGE 5: WORKSPACE SHOWCASE & WHY CREATIQ */}
                {activePage === 'workspaces' && (
                  <div>
                    <WorkspaceShowcase />
                    <WhyCreatiq />
                  </div>
                )}

                {/* PAGE 6: PRICING, TESTIMONIALS & FAQ */}
                {activePage === 'pricing' && (
                  <div>
                    <Pricing onSelectPlan={handleSelectPlan} />
                    <Testimonials />
                    <FAQ />
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </main>

          {/* Highlighted Social Connect Hub */}
          <SocialConnectHighlight />

          {/* Sequential Page Navigation Controls Footer Bar */}
          <section className="bg-slate-900 border-t border-b border-slate-800 py-6 px-4 sm:px-6 lg:px-8 relative z-20">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
              
              {/* Previous Page Button */}
              {prevPage ? (
                <button
                  onClick={() => goToPage(prevPage.id)}
                  className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-slate-950 border border-slate-800 hover:border-cyan-500/50 text-slate-300 hover:text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md"
                >
                  <ArrowLeft className="w-4 h-4 text-cyan-400" />
                  <span>Previous Page: {prevPage.title}</span>
                </button>
              ) : (
                <div className="hidden sm:block text-xs font-mono text-slate-500">Page 1 of 6: Home Overview</div>
              )}

              {/* Page Selector Tabs */}
              <div className="flex items-center gap-1 overflow-x-auto max-w-full py-1">
                {pageSequence.map((p, idx) => {
                  const isActive = activePage === p.id;
                  return (
                    <button
                      key={p.id}
                      onClick={() => goToPage(p.id)}
                      className={`px-3 py-1.5 rounded-xl text-[11px] font-bold whitespace-nowrap transition-colors relative ${
                        isActive
                          ? 'text-white font-extrabold'
                          : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="footer-active-tab-bg"
                          className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 rounded-xl shadow-md -z-10"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                      <span>{idx + 1}. {p.title}</span>
                    </button>
                  );
                })}
              </div>

              {/* Next Page Button */}
              <button
                onClick={() => goToPage(nextPage.id)}
                className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white font-bold text-xs hover:opacity-90 flex items-center justify-center gap-2 transition-all shadow-lg shadow-cyan-950/50 group shrink-0"
              >
                <span>Next Page: {nextPage.title}</span>
                <ChevronRight className="w-4 h-4 text-cyan-300 group-hover:translate-x-1 transition-transform" />
              </button>

            </div>
          </section>

          {/* MVP Launch Announcement Banner Section */}
          <MvpLaunchSection onOpenDataExport={() => setIsDataExportOpen(true)} />

          {/* Footer */}
          <Footer onOpenStartupTerms={() => setIsStartupTermsOpen(true)} />

          {/* Interactive Modals */}
          <AISandboxModal
            isOpen={isSandboxOpen}
            onClose={() => setIsSandboxOpen(false)}
            initialFeature={selectedFeature}
            onOpenPaymentModal={() => handleSelectPlan(PRICING_PLANS[1])}
          />

          <CreatorCardModal
            isOpen={isCreatorCardOpen}
            onClose={() => setIsCreatorCardOpen(false)}
          />

          <DemoVideoModal
            isOpen={isDemoOpen}
            onClose={() => setIsDemoOpen(false)}
            onOpenSandbox={() => setIsSandboxOpen(true)}
          />

          <CertificateModal
            isOpen={isCertModalOpen}
            onClose={() => setIsCertModalOpen(false)}
            path={selectedPathForCert}
          />

          <InstallModal
            isOpen={isInstallModalOpen}
            onClose={() => setIsInstallModalOpen(false)}
            deferredPrompt={deferredPrompt}
            setDeferredPrompt={setDeferredPrompt}
          />

          <FullEarthModal
            isOpen={isFullEarthOpen}
            onClose={() => setIsFullEarthOpen(false)}
          />

          <PaymentModal
            isOpen={isPaymentModalOpen}
            onClose={() => setIsPaymentModalOpen(false)}
            selectedPlan={selectedPlanForPayment}
            billingCycle="monthly"
          />

          <DataExportModal
            isOpen={isDataExportOpen}
            onClose={() => setIsDataExportOpen(false)}
          />

          <StartupCoreTermsModal
            isOpen={isStartupTermsOpen}
            onClose={() => setIsStartupTermsOpen(false)}
          />

          {/* Creatiq ID Account Modal */}
          <AuthModal />

          {/* Global 5-Second Auto-Fading Status Toast */}
          <AutoFadeToast />

          {/* Space-Themed Initial Loading Splash */}
          <CreatiqSplashLoader autoHideDuration={2200} />

        </div>
      </EcosystemEngineProvider>
    </UserProvider>
  );
}
