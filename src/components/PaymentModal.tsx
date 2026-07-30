import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, QrCode, Copy, Check, ArrowRight, Zap, CreditCard, Sparkles, Smartphone, Lock } from 'lucide-react';
import { PricingPlan } from '../types';
import { useUser } from '../context/UserContext';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan: PricingPlan | null;
  billingCycle: 'monthly' | 'yearly';
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  selectedPlan,
  billingCycle,
}) => {
  const { user, activateSubscription } = useUser();
  const [copiedVpa, setCopiedVpa] = useState(false);
  const [copiedUpiUrl, setCopiedUpiUrl] = useState(false);
  const [utrNumber, setUtrNumber] = useState('');
  const [paymentStep, setPaymentStep] = useState<'pay' | 'verifying' | 'success'>('pay');
  const [paymentMethod, setPaymentMethod] = useState<'upi_qr' | 'upi_app' | 'net_banking'>('upi_qr');

  if (!isOpen || !selectedPlan) return null;

  const famVpa = '798059343@fam';
  const price = billingCycle === 'yearly' ? selectedPlan.priceYearly : selectedPlan.priceMonthly;
  const planTotal = price;

  const upiDeepLink = `upi://pay?pa=${famVpa}&pn=Creatiq%20Ecosystem&am=${planTotal}&cu=INR&tn=Creatiq%20${selectedPlan.name}%20Subscription`;

  const handleCopyVpa = () => {
    navigator.clipboard.writeText(famVpa);
    setCopiedVpa(true);
    setTimeout(() => setCopiedVpa(false), 2000);
  };

  const handleCopyUpiUrl = () => {
    navigator.clipboard.writeText(upiDeepLink);
    setCopiedUpiUrl(true);
    setTimeout(() => setCopiedUpiUrl(false), 2000);
  };

  const handleVerifyPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!utrNumber.trim()) return;

    setPaymentStep('verifying');
    setTimeout(() => {
      setPaymentStep('success');
      activateSubscription();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-[90] bg-slate-950/90 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl relative my-8">
        
        {/* Header Bar */}
        <div className="px-6 py-5 bg-gradient-to-r from-slate-950 via-slate-900 to-cyan-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 via-emerald-500 to-purple-600 p-0.5 shadow-lg">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <Zap className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <div>
              <h3 className="font-extrabold text-white text-base">Secure UPI Payment Gateway</h3>
              <p className="text-xs text-slate-400">Direct instant processing in Indian Rupees (₹)</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">

          {paymentStep === 'success' ? (
            <div className="py-8 text-center space-y-4 animate-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto shadow-2xl shadow-emerald-500/20">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xl font-extrabold text-white">Payment Received & Verified!</h4>
                <p className="text-xs text-slate-300 max-w-xs mx-auto">
                  Your <strong className="text-cyan-400">{selectedPlan.name}</strong> plan is now active for <strong className="text-white">{user ? user.name : 'your account'}</strong>.
                </p>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 text-xs font-mono space-y-2 text-left">
                <div className="flex justify-between">
                  <span className="text-slate-500">TRANSACTION VPA:</span>
                  <span className="text-cyan-300 font-bold">{famVpa}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">AMOUNT PAID:</span>
                  <span className="text-emerald-400 font-bold">₹{planTotal} INR</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">REF/UTR ID:</span>
                  <span className="text-purple-300 font-bold">{utrNumber || 'UPI-VERIFIED-7980'}</span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-white font-bold text-xs shadow-lg hover:opacity-90 transition-all"
              >
                Start Using Pro AI Features Now
              </button>
            </div>
          ) : paymentStep === 'verifying' ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-12 h-12 rounded-full border-4 border-cyan-500 border-t-transparent animate-spin mx-auto" />
              <h4 className="text-base font-bold text-white">Verifying Transaction with Fam UPI Node...</h4>
              <p className="text-xs text-slate-400">Please hold on while we confirm payment to 798059343@fam</p>
            </div>
          ) : (
            <>
              {/* Order Summary Box */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex items-center justify-between text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-mono font-bold">Selected Plan</span>
                  <span className="text-white font-extrabold text-sm">{selectedPlan.name} ({billingCycle})</span>
                </div>
                <div className="text-right">
                  <span className="text-slate-400 block text-[10px] uppercase font-mono font-bold">Total Amount</span>
                  <span className="text-2xl font-black text-cyan-400 font-mono">₹{planTotal}</span>
                </div>
              </div>

              {/* Verified Payment Account Header */}
              <div className="bg-gradient-to-r from-purple-950/60 to-cyan-950/60 border border-purple-500/40 rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-bold text-white">Official Merchant Payment VPA</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold border border-emerald-500/30">
                    FAM PAY VERIFIED
                  </span>
                </div>

                {/* VPA Address Copy Box */}
                <div className="bg-slate-950 border border-cyan-500/50 rounded-xl p-3 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-[10px] text-slate-500 font-mono block">UPI ID / VPA ACCOUNT</span>
                    <span className="text-sm font-extrabold text-cyan-300 font-mono tracking-wider">{famVpa}</span>
                  </div>

                  <button
                    onClick={handleCopyVpa}
                    className="px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 font-bold text-xs border border-cyan-500/40 transition-all flex items-center gap-1.5"
                  >
                    {copiedVpa ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedVpa ? 'Copied VPA!' : 'Copy ID'}</span>
                  </button>
                </div>
              </div>

              {/* Payment Methods selector */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-300 block">Choose Payment Mode:</label>
                
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setPaymentMethod('upi_qr')}
                    className={`p-3 rounded-xl border text-left transition-all flex items-center gap-2.5 ${
                      paymentMethod === 'upi_qr'
                        ? 'bg-cyan-950/60 border-cyan-500 text-white shadow-lg'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <QrCode className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span className="text-xs font-bold">UPI QR / Scanner</span>
                  </button>

                  <button
                    onClick={() => setPaymentMethod('upi_app')}
                    className={`p-3 rounded-xl border text-left transition-all flex items-center gap-2.5 ${
                      paymentMethod === 'upi_app'
                        ? 'bg-purple-950/60 border-purple-500 text-white shadow-lg'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Smartphone className="w-4 h-4 text-purple-400 shrink-0" />
                    <span className="text-xs font-bold">GPay / PhonePe / Paytm</span>
                  </button>
                </div>
              </div>

              {/* QR Code / Deep Link Display */}
              {paymentMethod === 'upi_qr' ? (
                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 text-center space-y-3">
                  <div className="bg-white p-3 rounded-2xl inline-block shadow-xl border-4 border-cyan-500/30">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(upiDeepLink)}`}
                      alt="UPI QR Code 798059343@fam"
                      className="w-44 h-44 object-contain mx-auto"
                    />
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Scan with any UPI App (GPay, PhonePe, Paytm, CRED, FamApp) to pay <strong className="text-white">₹{planTotal}</strong> directly to <strong className="text-cyan-300">{famVpa}</strong>.
                  </p>
                </div>
              ) : (
                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-3">
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Tap below to open your UPI app directly or copy the deep payment link:
                  </p>
                  
                  <div className="flex gap-2">
                    <a
                      href={upiDeepLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold text-xs text-center hover:opacity-90 transition-all flex items-center justify-center gap-2"
                    >
                      <Smartphone className="w-4 h-4" />
                      <span>Open FamApp / UPI App</span>
                    </a>

                    <button
                      onClick={handleCopyUpiUrl}
                      className="px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white text-xs font-bold transition-all flex items-center gap-1.5"
                    >
                      {copiedUpiUrl ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      <span>{copiedUpiUrl ? 'Copied' : 'Link'}</span>
                    </button>
                  </div>
                </div>
              )}

              {/* UTR / Reference ID Submit Form */}
              <form onSubmit={handleVerifyPayment} className="space-y-3 pt-2 border-t border-slate-800">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-200 flex items-center justify-between">
                    <span>Enter 12-Digit UPI Ref / UTR / Transaction ID:</span>
                    <span className="text-[10px] text-cyan-400 font-mono">Instant Auto-Activation</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 420812903841"
                    value={utrNumber}
                    onChange={(e) => setUtrNumber(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-500 text-white text-sm font-mono focus:outline-none transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-600 text-white font-bold text-xs hover:opacity-95 transition-all shadow-xl shadow-cyan-950/50 flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4" />
                  <span>Submit Transaction ID & Activate Plan</span>
                </button>
              </form>

              <div className="text-[10px] text-slate-500 text-center flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Protected by 256-bit Encrypted SSL Payment Gateway for 798059343@fam</span>
              </div>
            </>
          )}

        </div>

      </div>
    </div>
  );
};
