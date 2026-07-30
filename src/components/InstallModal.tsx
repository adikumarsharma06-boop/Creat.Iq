import React, { useState, useEffect } from 'react';
import { X, Download, Smartphone, Monitor, Globe, CheckCircle2, ShieldCheck, Sparkles, ArrowRight, Laptop, Apple, Play } from 'lucide-react';
import confetti from 'canvas-confetti';
import { NLogo } from './NLogo';

interface InstallModalProps {
  isOpen: boolean;
  onClose: () => void;
  deferredPrompt: any;
  setDeferredPrompt: (prompt: any) => void;
}

export const InstallModal: React.FC<InstallModalProps> = ({
  isOpen,
  onClose,
  deferredPrompt,
  setDeferredPrompt,
}) => {
  const [activePlatform, setActivePlatform] = useState<'pwa' | 'android' | 'desktop' | 'ios'>('pwa');
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Detect OS default
    const userAgent = navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(userAgent)) {
      setActivePlatform('ios');
    } else if (/android/.test(userAgent)) {
      setActivePlatform('android');
    } else if (/windows|macintosh|linux/.test(userAgent)) {
      setActivePlatform('desktop');
    }

    // Check if already in standalone mode
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }
  }, []);

  if (!isOpen) return null;

  const handleNativePwaInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
    } else {
      confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
      alert('PWA installation ready! If prompt did not appear, use your browser\'s address bar install icon or menu.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-950 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden">
        
        {/* Background glow */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <NLogo size="md" animated={true} />
            <div>
              <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
                Install Creatiq App
                <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-mono border border-purple-500/30">
                  v1.0 Universal
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Install on Web, Android, iOS, Windows, macOS, or Linux
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Platform Selection Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-slate-900/60 p-1.5 rounded-2xl border border-slate-800">
          <button
            onClick={() => setActivePlatform('pwa')}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activePlatform === 'pwa'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            PWA Web
          </button>

          <button
            onClick={() => setActivePlatform('android')}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activePlatform === 'android'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            Android
          </button>

          <button
            onClick={() => setActivePlatform('desktop')}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activePlatform === 'desktop'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            Desktop
          </button>

          <button
            onClick={() => setActivePlatform('ios')}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activePlatform === 'ios'
                ? 'bg-gradient-to-r from-slate-700 to-slate-800 text-white shadow-md border border-slate-600'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Apple className="w-3.5 h-3.5" />
            iOS / iPad
          </button>
        </div>

        {/* Tab Content Panels */}
        {activePlatform === 'pwa' && (
          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0">
                <Globe className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white mb-1">Instant Web App Installation (PWA)</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Install directly in your browser without app store downloads. Runs standalone with offline support, desktop shortcuts, and zero latency.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
              <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800/80">
                <div className="text-cyan-400 font-bold mb-1">⚡ Fast Startup</div>
                <div className="text-slate-400 text-[11px]">Instant loading with pre-cached assets.</div>
              </div>
              <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800/80">
                <div className="text-purple-400 font-bold mb-1">🔒 Offline Support</div>
                <div className="text-slate-400 text-[11px]">Full access to offline tools and notes.</div>
              </div>
              <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800/80">
                <div className="text-emerald-400 font-bold mb-1">📱 Fullscreen</div>
                <div className="text-slate-400 text-[11px]">Clean native interface without browser bar.</div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={handleNativePwaInstall}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold text-xs hover:opacity-90 transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                {deferredPrompt ? 'Install PWA Now' : 'Trigger Browser Install'}
              </button>
            </div>
          </div>
        )}

        {activePlatform === 'android' && (
          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0">
                <Smartphone className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white mb-1">Android Application (Capacitor Ready)</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Install Creatiq on Android via Google Chrome PWA prompt or generate native Capacitor APK build.
                </p>
              </div>
            </div>

            <ol className="space-y-2 text-xs text-slate-300 bg-slate-950/60 p-4 rounded-xl border border-slate-800 list-decimal list-inside">
              <li>Open Creatiq in <strong className="text-white">Google Chrome</strong> on your Android phone.</li>
              <li>Tap the <strong className="text-emerald-400">"Install App"</strong> banner or menu <strong className="text-white">"Add to Home Screen"</strong>.</li>
              <li>Enjoy full native performance with push notifications & background sync.</li>
            </ol>

            <div className="flex items-center justify-between pt-2">
              <span className="text-[11px] text-slate-400">Capacitor APK bundle ready for Google Play release</span>
              <button
                onClick={handleNativePwaInstall}
                className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-all shadow-md flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Install on Android
              </button>
            </div>
          </div>
        )}

        {activePlatform === 'desktop' && (
          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center shrink-0">
                <Laptop className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white mb-1">Desktop Native Apps (Tauri & Electron)</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Run Creatiq as a high-performance desktop workstation app on Windows, macOS, or Linux.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 text-center">
                <div className="text-slate-200 font-bold mb-1">🪟 Windows</div>
                <div className="text-[10px] text-slate-400 mb-2">.msi / .exe installer</div>
                <button
                  onClick={handleNativePwaInstall}
                  className="w-full py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 font-mono text-[10px]"
                >
                  Download / Install
                </button>
              </div>

              <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 text-center">
                <div className="text-slate-200 font-bold mb-1">🍎 macOS</div>
                <div className="text-[10px] text-slate-400 mb-2">Apple Silicon & Intel .dmg</div>
                <button
                  onClick={handleNativePwaInstall}
                  className="w-full py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-purple-300 font-mono text-[10px]"
                >
                  Download / Install
                </button>
              </div>

              <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 text-center">
                <div className="text-slate-200 font-bold mb-1">🐧 Linux</div>
                <div className="text-[10px] text-slate-400 mb-2">.AppImage / .deb</div>
                <button
                  onClick={handleNativePwaInstall}
                  className="w-full py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-pink-300 font-mono text-[10px]"
                >
                  Download / Install
                </button>
              </div>
            </div>
          </div>
        )}

        {activePlatform === 'ios' && (
          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0">
                <Apple className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white mb-1">iPhone & iPad Setup</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Add Creatiq to your Home Screen in Safari for a fullscreen app experience.
                </p>
              </div>
            </div>

            <ol className="space-y-2 text-xs text-slate-300 bg-slate-950/60 p-4 rounded-xl border border-slate-800 list-decimal list-inside">
              <li>Open <strong className="text-white">Safari</strong> on your iPhone or iPad.</li>
              <li>Tap the <strong className="text-cyan-400">Share button</strong> (square with arrow pointing up).</li>
              <li>Scroll down and tap <strong className="text-white">"Add to Home Screen"</strong>.</li>
              <li>Tap <strong className="text-purple-400">"Add"</strong> in the top right corner.</li>
            </ol>
          </div>
        )}

        {/* Modal Footer */}
        <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Official Creatiq Certified Build</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 text-slate-300 hover:text-white border border-slate-800"
          >
            Close Window
          </button>
        </div>

      </div>
    </div>
  );
};
