import { BackupSnapshot, UserActivityEvent } from '../types';
import { UserActivityTracker } from './UserActivityTracker';

type BackupSubscriber = (snapshot: BackupSnapshot) => void;

class AutoBackupUtilityService {
  private readonly STORAGE_KEY = 'creatiq_auto_backups';
  private readonly SETTINGS_KEY = 'creatiq_backup_settings';
  private subscribers: Set<BackupSubscriber> = new Set();
  private timerId: number | null = null;
  private eventCounter = 0;

  private isAutoEnabled = true;
  private intervalMinutes = 5; // default 5 mins
  private eventThreshold = 5;  // default backup every 5 events

  constructor() {
    this.loadSettings();

    if (typeof window !== 'undefined') {
      // Subscribe to UserActivityTracker events to check event-based auto backup threshold
      UserActivityTracker.subscribe((event: UserActivityEvent) => {
        if (!this.isAutoEnabled) return;
        this.eventCounter++;
        if (this.eventCounter >= this.eventThreshold) {
          this.eventCounter = 0;
          this.createBackup('event_threshold', `Automated backup triggered after ${this.eventThreshold} activity events`);
        }
      });

      // Start periodic timer
      this.restartTimer();
    }
  }

  private loadSettings(): void {
    try {
      const saved = localStorage.getItem(this.SETTINGS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        this.isAutoEnabled = parsed.isAutoEnabled ?? true;
        this.intervalMinutes = parsed.intervalMinutes ?? 5;
        this.eventThreshold = parsed.eventThreshold ?? 5;
      }
    } catch {
      // Use defaults
    }
  }

  public saveSettings(isAutoEnabled: boolean, intervalMinutes: number, eventThreshold: number): void {
    this.isAutoEnabled = isAutoEnabled;
    this.intervalMinutes = intervalMinutes;
    this.eventThreshold = eventThreshold;

    try {
      localStorage.setItem(
        this.SETTINGS_KEY,
        JSON.stringify({ isAutoEnabled, intervalMinutes, eventThreshold })
      );
    } catch (err) {
      console.warn('Could not save backup settings:', err);
    }

    this.restartTimer();
  }

  public getSettings() {
    return {
      isAutoEnabled: this.isAutoEnabled,
      intervalMinutes: this.intervalMinutes,
      eventThreshold: this.eventThreshold,
    };
  }

  private restartTimer(): void {
    if (typeof window === 'undefined') return;

    if (this.timerId !== null) {
      window.clearInterval(this.timerId);
      this.timerId = null;
    }

    if (this.isAutoEnabled && this.intervalMinutes > 0) {
      const ms = this.intervalMinutes * 60 * 1000;
      this.timerId = window.setInterval(() => {
        this.createBackup('auto_scheduled', `Scheduled background auto-backup (${this.intervalMinutes}m interval)`);
      }, ms);
    }
  }

  /**
   * Get all stored backup snapshots
   */
  public getBackups(): BackupSnapshot[] {
    try {
      const saved = localStorage.getItem(this.STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  }

  /**
   * Generate a structured backup snapshot
   */
  public createBackup(
    triggerType: 'auto_scheduled' | 'event_threshold' | 'manual' = 'manual',
    notes?: string
  ): BackupSnapshot {
    const activityLogs = UserActivityTracker.getActivities();

    // Fetch user context if stored locally
    let user = { name: 'Creator User', email: 'user@creatiq.ai', role: 'Full-Stack AI Builder' };
    try {
      const storedUser = localStorage.getItem('creatiq_user_profile');
      if (storedUser) {
        const u = JSON.parse(storedUser);
        user = {
          name: u.name || user.name,
          email: u.email || user.email,
          role: u.role || user.role,
        };
      }
    } catch {
      // Fallback
    }

    const timestamp = new Date().toISOString();
    const backupId = `bkp-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;

    // Build structured payloads formatted for integrations
    const structuredObject = {
      backupMeta: {
        id: backupId,
        timestamp,
        triggerType,
        notes: notes || 'Automated activity log and project snapshot',
        version: '2.4.0',
      },
      user,
      metrics: {
        totalEventsLogged: activityLogs.length,
        lastActiveTimestamp: activityLogs[activityLogs.length - 1]?.timestamp || timestamp,
      },
      activityLogs,
    };

    const json = JSON.stringify(structuredObject, null, 2);
    const dataSizeKb = parseFloat((new Blob([json]).size / 1024).toFixed(2));

    // Structured Markdown for Notion API sync
    const notionMarkdown = `# 🚀 Creatiq AI Automated Backup (${new Date(timestamp).toLocaleDateString()})

- **Backup ID:** \`${backupId}\`
- **Trigger Mode:** \`${triggerType.toUpperCase()}\`
- **User:** ${user.name} (${user.email})
- **Role:** ${user.role}
- **Logged Events:** ${activityLogs.length} events
- **Snapshot Size:** ${dataSizeKb} KB

---

### 📊 Recent Activity Log Trail
${activityLogs.slice(-10).map((act) => `- [${act.type.toUpperCase()}] **${act.action}** (${new Date(act.timestamp).toLocaleTimeString()}) - ${act.details || 'N/A'}`).join('\n')}

---
*Ready for Notion Database Webhook Import*`;

    // Formatted text for WhatsApp API / wa.me link
    const whatsAppText = `*Creatiq AI Auto-Backup* 📦
*ID:* ${backupId}
*User:* ${user.name}
*Trigger:* ${triggerType}
*Logged Events:* ${activityLogs.length}
*Time:* ${new Date(timestamp).toLocaleTimeString()}
_Encrypted & Formatted for WhatsApp API_`;

    // HTML/PlainText body for Email API integration
    const emailBody = `Creatiq AI Studio - Automated Backup Snapshot

Backup Reference: ${backupId}
Date: ${new Date(timestamp).toLocaleString()}
User: ${user.name} (${user.email})
Trigger Type: ${triggerType}

Summary:
- Total Logged Events: ${activityLogs.length}
- Storage Size: ${dataSizeKb} KB

Latest Events:
${activityLogs.slice(-5).map(e => `• [${e.timestamp}] ${e.action}: ${e.details || ''}`).join('\n')}

This snapshot is formatted for API transmission to Notion, Email, and WhatsApp integration endpoints.`;

    const snapshot: BackupSnapshot = {
      id: backupId,
      timestamp,
      triggerType,
      dataSizeKb,
      eventsCount: activityLogs.length,
      user,
      payloads: {
        json,
        notionMarkdown,
        whatsAppText,
        emailBody,
      },
    };

    const currentBackups = this.getBackups();
    // Keep up to 25 latest backups
    const updatedBackups = [snapshot, ...currentBackups].slice(0, 25);

    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedBackups));
    } catch (err) {
      console.warn('Error saving backup snapshot:', err);
    }

    // Log this backup event in tracker (without causing infinite loop)
    if (triggerType === 'manual') {
      UserActivityTracker.logDataExported(`Automated Backup Utility (${triggerType})`);
    }

    // Notify UI subscribers
    this.notifySubscribers(snapshot);

    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('creatiq_backup_created', { detail: snapshot })
      );
    }

    return snapshot;
  }

  public clearBackups(): void {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
    } catch (err) {
      console.error('Failed to clear backups:', err);
    }
  }

  public subscribe(subscriber: BackupSubscriber): () => void {
    this.subscribers.add(subscriber);
    return () => {
      this.subscribers.delete(subscriber);
    };
  }

  private notifySubscribers(snapshot: BackupSnapshot) {
    this.subscribers.forEach((sub) => {
      try {
        sub(snapshot);
      } catch (err) {
        console.error('Error in backup subscriber callback:', err);
      }
    });
  }
}

export const AutoBackupUtility = new AutoBackupUtilityService();
