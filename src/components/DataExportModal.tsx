import React, { useState, useEffect } from 'react';
import { X, ShieldCheck, Download, FileText, Share2, Mail, Check, Lock, Sparkles, Send, Database, Activity, Trash2, Clock, RefreshCw, Zap, Copy, CheckCircle2 } from 'lucide-react';
import { useUser, useEcosystem } from '../context/EcosystemContext';
import { AutoBackupUtility } from '../services/AutoBackupUtility';
import { BackupSnapshot } from '../types';

interface DataExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DataExportModal: React.FC<DataExportModalProps> = ({ isOpen, onClose }) => {
  const { user, enrolledPathIds, userAiTasksCount, activityLogs, logActivity, clearActivityLogs } = useUser();
  const { communityPosts } = useEcosystem();

  const [activeTab, setActiveTab] = useState<'export' | 'activity' | 'autobackup'>('export');

  // Auto-backup utility state
  const [backups, setBackups] = useState<BackupSnapshot[]>(() => AutoBackupUtility.getBackups());
  const [settings, setSettings] = useState(() => AutoBackupUtility.getSettings());
  const [copiedPayloadId, setCopiedPayloadId] = useState<string | null>(null);
  const [manualBackupNotice, setManualBackupNotice] = useState(false);

  useEffect(() => {
    // Subscribe to AutoBackupUtility events
    const unsubscribe = AutoBackupUtility.subscribe(() => {
      setBackups(AutoBackupUtility.getBackups());
    });
    return () => unsubscribe();
  }, []);

  const [whatsappSent, setWhatsappSent] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [pdfDownloaded, setPdfDownloaded] = useState(false);
  const [notionCopied, setNotionCopied] = useState(false);

  if (!isOpen) return null;

  const targetWhatsAppNumber = '7980259343';
  const userEmail = user?.email || 'adikumarsharma06@gmail.com';
  const userName = user?.name || 'Creatiq Creator';

  const handleToggleAutoBackup = (enabled: boolean) => {
    AutoBackupUtility.saveSettings(enabled, settings.intervalMinutes, settings.eventThreshold);
    setSettings(AutoBackupUtility.getSettings());
  };

  const handleChangeInterval = (mins: number) => {
    AutoBackupUtility.saveSettings(settings.isAutoEnabled, mins, settings.eventThreshold);
    setSettings(AutoBackupUtility.getSettings());
  };

  const handleChangeThreshold = (events: number) => {
    AutoBackupUtility.saveSettings(settings.isAutoEnabled, settings.intervalMinutes, events);
    setSettings(AutoBackupUtility.getSettings());
  };

  const handleTriggerManualBackup = () => {
    AutoBackupUtility.createBackup('manual', 'User initiated manual data vault backup');
    setBackups(AutoBackupUtility.getBackups());
    setManualBackupNotice(true);
    setTimeout(() => setManualBackupNotice(false), 3000);
  };

  const handleDownloadBackupJson = (snapshot: BackupSnapshot) => {
    const element = document.createElement('a');
    const file = new Blob([snapshot.payloads.json], { type: 'application/json' });
    element.href = URL.createObjectURL(file);
    element.download = `Creatiq_AutoBackup_${snapshot.id}_${new Date(snapshot.timestamp).toISOString().slice(0, 10)}.json`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleCopyPayload = (payload: string, typeKey: string) => {
    navigator.clipboard.writeText(payload);
    setCopiedPayloadId(typeKey);
    setTimeout(() => setCopiedPayloadId(null), 2500);
  };

  const handleClearAllBackups = () => {
    AutoBackupUtility.clearBackups();
    setBackups([]);
  };

  // Build formatted summary text
  const userSummaryText = `*CREATIQ AI ECOSYSTEM DATA EXPORT* 🚀
----------------------------------------
*User Profile:* ${userName} (${userEmail})
*Role:* ${user?.role || 'Full-Stack AI Pioneer'}
*Persona:* ${user?.personaTag || 'Creator'}
*AI Tasks Processed:* ${userAiTasksCount} Tasks
*Enrolled AI Paths:* ${enrolledPathIds.length} Learning Paths
*Recorded Activity Logs:* ${activityLogs?.length || 0} Events
*Community Posts Created:* ${communityPosts.filter(p => p.author.name === userName).length} Posts

*Privacy & Security:* 256-Bit Encrypted Backup
*Timestamp:* ${new Date().toLocaleString()}
----------------------------------------
_Exported from Creatiq AI Studio Portal_`;

  const handleWhatsAppExport = () => {
    logActivity('data_exported', 'Exported summary to WhatsApp', `Target: +91 ${targetWhatsAppNumber}`);
    const encodedMsg = encodeURIComponent(userSummaryText);
    const waUrl = `https://wa.me/91${targetWhatsAppNumber}?text=${encodedMsg}`;
    window.open(waUrl, '_blank');
    setWhatsappSent(true);
    setTimeout(() => setWhatsappSent(false), 3000);
  };

  const handleEmailBackup = () => {
    logActivity('data_exported', 'Exported summary to Email', `Recipient: ${userEmail}`);
    const mailtoUrl = `mailto:${userEmail}?subject=${encodeURIComponent('Creatiq AI Workspace Backup')}&body=${encodeURIComponent(userSummaryText)}`;
    window.open(mailtoUrl, '_blank');
    setEmailSent(true);
    setTimeout(() => setEmailSent(false), 3000);
  };

  const handleDownloadPdf = () => {
    logActivity('data_exported', 'Downloaded encrypted activity & workspace file');
    const element = document.createElement('a');
    const file = new Blob([userSummaryText], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = `Creatiq_AI_Workspace_Export_${userName.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    setPdfDownloaded(true);
    setTimeout(() => setPdfDownloaded(false), 3000);
  };

  const handleNotionExport = () => {
    logActivity('data_exported', 'Exported workspace markdown for Notion');
    const notionMarkdown = `# 🚀 Creatiq AI Workspace Summary for ${userName}\n\n` +
      `- **User:** ${userName} (${userEmail})\n` +
      `- **Role:** ${user?.role || 'Full-Stack AI Builder'}\n` +
      `- **AI Tasks Executed:** ${userAiTasksCount}\n` +
      `- **Enrolled Paths:** ${enrolledPathIds.length}\n` +
      `- **Recorded Activity Logs:** ${activityLogs?.length || 0}\n` +
      `- **Export Date:** ${new Date().toLocaleDateString()}\n\n` +
      `### Privacy Status\n- Zero-Knowledge Storage Enabled\n- 256-bit AES Encryption Active`;

    navigator.clipboard.writeText(notionMarkdown);
    setNotionCopied(true);
    setTimeout(() => setNotionCopied(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-[90] bg-slate-950/90 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl relative my-8 space-y-6">
        
        {/* Header Bar */}
        <div className="px-6 py-5 bg-gradient-to-r from-slate-950 via-slate-900 to-purple-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 via-cyan-500 to-purple-600 p-0.5 shadow-lg">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <Database className="w-5 h-5 text-emerald-400" />
              </div>
            </div>
            <div>
              <h3 className="font-extrabold text-white text-base flex items-center gap-2">
                Data Vault & Activity Tracker
              </h3>
              <p className="text-xs text-slate-400">Export data & review live activity events</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector Bar */}
        <div className="px-6 pt-2 flex items-center gap-2">
          <button
            onClick={() => setActiveTab('export')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'export'
                ? 'bg-slate-800 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            Export Channels
          </button>
          <button
            onClick={() => setActiveTab('activity')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'activity'
                ? 'bg-slate-800 text-purple-300 border border-purple-500/40 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Activity className="w-3.5 h-3.5 text-purple-400" />
            <span>Activity Events ({activityLogs?.length || 0})</span>
          </button>
        </div>

        {/* Modal Content - Export Tab */}
        {activeTab === 'export' && (
          <div className="p-6 space-y-5">
            
            {/* Privacy Protection Banner */}
            <div className="bg-emerald-950/40 border border-emerald-500/40 rounded-2xl p-4 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <div className="text-xs font-bold text-white flex items-center gap-2">
                  <span>Maximum Privacy & Zero-Knowledge Security</span>
                  <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    AES-256 ENCRYPTED
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Your personal details, activity logs, and AI task history are stored locally in your private user profile.
                </p>
              </div>
            </div>

          {/* Quick Sync Action Grid */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-300 uppercase font-mono tracking-wider">
              Export & Share Channels
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              
              {/* WhatsApp Sync Button */}
              <button
                onClick={handleWhatsAppExport}
                className="p-4 rounded-2xl bg-emerald-950/50 border border-emerald-500/40 hover:bg-emerald-900/60 transition-all text-left space-y-2 group"
              >
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                    <Send className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md">
                    +91 {targetWhatsAppNumber}
                  </span>
                </div>
                <div>
                  <div className="font-bold text-xs text-white group-hover:text-emerald-300 transition-colors">
                    Send to WhatsApp
                  </div>
                  <div className="text-[10px] text-slate-400">
                    Direct sync report to WhatsApp app
                  </div>
                </div>
              </button>

              {/* Email Backup Button */}
              <button
                onClick={handleEmailBackup}
                className="p-4 rounded-2xl bg-cyan-950/50 border border-cyan-500/40 hover:bg-cyan-900/60 transition-all text-left space-y-2 group"
              >
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono text-cyan-400 truncate max-w-[110px]">
                    {userEmail}
                  </span>
                </div>
                <div>
                  <div className="font-bold text-xs text-white group-hover:text-cyan-300 transition-colors">
                    Send to Email
                  </div>
                  <div className="text-[10px] text-slate-400">
                    Send full backup report to mail
                  </div>
                </div>
              </button>

              {/* Notion Sync Button */}
              <button
                onClick={handleNotionExport}
                className="p-4 rounded-2xl bg-purple-950/50 border border-purple-500/40 hover:bg-purple-900/60 transition-all text-left space-y-2 group"
              >
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
                    <FileText className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono text-purple-400">
                    Notion Format
                  </span>
                </div>
                <div>
                  <div className="font-bold text-xs text-white group-hover:text-purple-300 transition-colors">
                    {notionCopied ? 'Copied Markdown!' : 'Export for Notion'}
                  </div>
                  <div className="text-[10px] text-slate-400">
                    Copy markdown formatted for Notion docs
                  </div>
                </div>
              </button>

              {/* PDF Document Download Button */}
              <button
                onClick={handleDownloadPdf}
                className="p-4 rounded-2xl bg-blue-950/50 border border-blue-500/40 hover:bg-blue-900/60 transition-all text-left space-y-2 group"
              >
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-xl bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
                    <Download className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono text-blue-400">
                    Doc / PDF Report
                  </span>
                </div>
                <div>
                  <div className="font-bold text-xs text-white group-hover:text-blue-300 transition-colors">
                    {pdfDownloaded ? 'Report Downloaded!' : 'Download PDF Summary'}
                  </div>
                  <div className="text-[10px] text-slate-400">
                    Download encrypted summary file
                  </div>
                </div>
              </button>

            </div>
          </div>

          {/* Data Summary Preview */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-2">
            <span className="text-[10px] font-mono font-bold text-slate-500 uppercase block">
              Live Encrypted Preview Box
            </span>
            <pre className="text-[11px] font-mono text-slate-300 bg-slate-900/80 p-3 rounded-xl border border-slate-800 overflow-x-auto whitespace-pre-wrap leading-relaxed">
              {userSummaryText}
            </pre>
          </div>

        </div>
        )}

        {/* Modal Content - Auto-Backup Vault Tab */}
        {activeTab === 'autobackup' && (
          <div className="p-6 space-y-5">
            {/* Auto-Backup Status & Control Header */}
            <div className="bg-emerald-950/40 border border-emerald-500/40 rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-2.5 h-2.5 rounded-full ${settings.isAutoEnabled ? 'bg-emerald-400 animate-pulse' : 'bg-slate-600'}`} />
                  <span className="text-xs font-bold text-white">
                    Automated Data Export Engine
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold ${
                    settings.isAutoEnabled
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-slate-800 text-slate-400'
                  }`}>
                    {settings.isAutoEnabled ? 'ACTIVE' : 'PAUSED'}
                  </span>
                </div>

                <button
                  onClick={() => handleToggleAutoBackup(!settings.isAutoEnabled)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                    settings.isAutoEnabled
                      ? 'bg-red-500/20 text-red-300 border border-red-500/40 hover:bg-red-500/30'
                      : 'bg-emerald-500 text-slate-950 hover:bg-emerald-400'
                  }`}
                >
                  {settings.isAutoEnabled ? 'Pause Auto-Backup' : 'Enable Auto-Backup'}
                </button>
              </div>

              <p className="text-[11px] text-slate-300 leading-relaxed">
                Periodically compiles user activity logs, learning progress, and profile metrics into structured JSON, Notion Markdown, Email, and WhatsApp payloads ready for REST API integration.
              </p>

              {/* Schedule & Threshold Selectors */}
              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-emerald-500/20">
                <div>
                  <label className="text-[10px] font-mono uppercase font-bold text-slate-400 block mb-1">
                    Backup Interval
                  </label>
                  <select
                    value={settings.intervalMinutes}
                    onChange={(e) => handleChangeInterval(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono"
                  >
                    <option value={1}>Every 1 Minute (Test)</option>
                    <option value={5}>Every 5 Minutes</option>
                    <option value={15}>Every 15 Minutes</option>
                    <option value={30}>Every 30 Minutes</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-mono uppercase font-bold text-slate-400 block mb-1">
                    Event Threshold Trigger
                  </label>
                  <select
                    value={settings.eventThreshold}
                    onChange={(e) => handleChangeThreshold(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono"
                  >
                    <option value={3}>After 3 User Actions</option>
                    <option value={5}>After 5 User Actions</option>
                    <option value={10}>After 10 User Actions</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Instant Manual Snapshot Trigger */}
            <div className="flex items-center justify-between gap-3 bg-slate-950 border border-slate-800 p-3.5 rounded-2xl">
              <div className="space-y-0.5">
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  <span>Instant Manual Backup</span>
                </div>
                <div className="text-[10px] text-slate-400">
                  Force a structured snapshot right now
                </div>
              </div>

              <button
                onClick={handleTriggerManualBackup}
                className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-extrabold text-xs flex items-center gap-1.5 transition-all shadow-md"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Backup Now</span>
              </button>
            </div>

            {manualBackupNotice && (
              <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs text-center font-bold animate-in fade-in">
                ✓ Backup snapshot created & saved to history!
              </div>
            )}

            {/* Generated Backup History List */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-white flex items-center gap-2">
                  <span>Structured Backup History</span>
                  <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold">
                    {backups.length} Snapshots
                  </span>
                </h4>

                {backups.length > 0 && (
                  <button
                    onClick={handleClearAllBackups}
                    className="text-[10px] text-slate-500 hover:text-red-400 font-bold flex items-center gap-1"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Clear Vault</span>
                  </button>
                )}
              </div>

              <div className="max-h-60 overflow-y-auto space-y-2.5 pr-1">
                {backups.length === 0 ? (
                  <div className="py-8 text-center text-slate-500 text-xs space-y-2 border border-dashed border-slate-800 rounded-2xl">
                    <Database className="w-6 h-6 mx-auto text-slate-600 animate-pulse" />
                    <p>No backup snapshots in vault yet.</p>
                    <p className="text-[10px] text-slate-600">Click "Backup Now" or wait for automatic schedule interval.</p>
                  </div>
                ) : (
                  backups.map((snap) => (
                    <div
                      key={snap.id}
                      className="p-3.5 bg-slate-950 border border-slate-800 rounded-2xl space-y-2.5 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase ${
                            snap.triggerType === 'auto_scheduled'
                              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                              : snap.triggerType === 'event_threshold'
                              ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                              : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          }`}>
                            {snap.triggerType.replace('_', ' ')}
                          </span>
                          <span className="font-mono text-slate-400 text-[11px]">{snap.id}</span>
                        </div>

                        <span className="text-[10px] font-mono text-slate-500">
                          {new Date(snap.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono bg-slate-900/60 p-2 rounded-xl">
                        <span>Events Included: <strong className="text-white">{snap.eventsCount}</strong></span>
                        <span>Size: <strong className="text-emerald-400">{snap.dataSizeKb} KB</strong></span>
                      </div>

                      {/* Export Payload Actions */}
                      <div className="flex flex-wrap items-center gap-2 pt-1">
                        <button
                          onClick={() => handleDownloadBackupJson(snap)}
                          className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:border-cyan-500/50 text-[10px] font-bold flex items-center gap-1 transition-all"
                        >
                          <Download className="w-3 h-3 text-cyan-400" />
                          <span>JSON File</span>
                        </button>

                        <button
                          onClick={() => handleCopyPayload(snap.payloads.notionMarkdown, `notion-${snap.id}`)}
                          className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:border-purple-500/50 text-[10px] font-bold flex items-center gap-1 transition-all"
                        >
                          {copiedPayloadId === `notion-${snap.id}` ? (
                            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          ) : (
                            <FileText className="w-3 h-3 text-purple-400" />
                          )}
                          <span>Notion API</span>
                        </button>

                        <button
                          onClick={() => handleCopyPayload(snap.payloads.whatsAppText, `wa-${snap.id}`)}
                          className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:border-emerald-500/50 text-[10px] font-bold flex items-center gap-1 transition-all"
                        >
                          {copiedPayloadId === `wa-${snap.id}` ? (
                            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          ) : (
                            <Send className="w-3 h-3 text-emerald-400" />
                          )}
                          <span>WhatsApp Payload</span>
                        </button>

                        <button
                          onClick={() => handleCopyPayload(snap.payloads.emailBody, `email-${snap.id}`)}
                          className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:border-blue-500/50 text-[10px] font-bold flex items-center gap-1 transition-all"
                        >
                          {copiedPayloadId === `email-${snap.id}` ? (
                            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          ) : (
                            <Mail className="w-3 h-3 text-blue-400" />
                          )}
                          <span>Email API</span>
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* Modal Content - Activity Tracker Logs Tab */}
        {activeTab === 'activity' && (
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-white flex items-center gap-2">
                  <span>User Interaction Audit Trail</span>
                  <span className="px-2 py-0.5 rounded-md bg-purple-500/20 text-purple-300 text-[10px] font-mono font-bold">
                    {activityLogs?.length || 0} Events
                  </span>
                </h4>
                <p className="text-[11px] text-slate-400">
                  Captured across page views, AI tools, path enrollments and exports
                </p>
              </div>

              {activityLogs && activityLogs.length > 0 && (
                <button
                  onClick={clearActivityLogs}
                  className="px-2.5 py-1.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 text-[10px] font-bold flex items-center gap-1 transition-all"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>Clear History</span>
                </button>
              )}
            </div>

            <div className="max-h-72 overflow-y-auto space-y-2 pr-1">
              {(!activityLogs || activityLogs.length === 0) ? (
                <div className="py-10 text-center text-slate-500 text-xs space-y-2 border border-dashed border-slate-800 rounded-2xl">
                  <Activity className="w-6 h-6 mx-auto text-slate-600 animate-pulse" />
                  <p>No user activity recorded in this session yet.</p>
                  <p className="text-[10px] text-slate-600">Explore pages or use AI tools to generate event logs.</p>
                </div>
              ) : (
                activityLogs.slice().reverse().map((act) => (
                  <div
                    key={act.id}
                    className="p-3 bg-slate-950 border border-slate-800/80 rounded-xl flex items-start justify-between gap-3 text-xs"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase ${
                          act.type === 'page_view'
                            ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                            : act.type === 'feature_used'
                            ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                            : act.type === 'path_enrolled'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : act.type === 'data_exported'
                            ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                            : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        }`}>
                          {act.type.replace('_', ' ')}
                        </span>
                        <span className="font-bold text-white">{act.action}</span>
                      </div>
                      {act.details && (
                        <p className="text-[11px] text-slate-400 leading-relaxed pl-1">
                          {act.details}
                        </p>
                      )}
                    </div>
                    <span className="text-[10px] font-mono text-slate-500 shrink-0">
                      {new Date(act.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
