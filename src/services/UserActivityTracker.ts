import { UserActivityEvent } from '../types';

type ActivitySubscriber = (activity: UserActivityEvent) => void;

class UserActivityTrackerService {
  private readonly STORAGE_KEY = 'creatiq_activity_logs';
  private subscribers: Set<ActivitySubscriber> = new Set();

  constructor() {
    // Listen for custom window events if needed across tabs
    if (typeof window !== 'undefined') {
      window.addEventListener('storage', (e) => {
        if (e.key === 'creatiq_activity_logs' && e.newValue) {
          try {
            const logs = JSON.parse(e.newValue);
            if (logs.length > 0) {
              const latest = logs[logs.length - 1];
              this.notifySubscribers(latest);
            }
          } catch (err) {
            console.error('Error parsing storage activity logs:', err);
          }
        }
      });
    }
  }

  /**
   * Get all stored activity events from localStorage
   */
  public getActivities(): UserActivityEvent[] {
    try {
      const saved = localStorage.getItem('creatiq_activity_logs');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  }

  /**
   * Log a new activity event and persist to localStorage & trigger subscribers
   */
  public logActivity(
    type: UserActivityEvent['type'],
    action: string,
    details?: string,
    page?: string
  ): UserActivityEvent {
    const newEvent: UserActivityEvent = {
      id: `act-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      timestamp: new Date().toISOString(),
      type,
      action,
      details,
      page,
    };

    const currentLogs = this.getActivities();
    // Keep last 100 activity events to prevent bloated local storage
    const updatedLogs = [...currentLogs, newEvent].slice(-100);

    try {
      localStorage.setItem('creatiq_activity_logs', JSON.stringify(updatedLogs));
    } catch (err) {
      console.warn('Could not save activity log to localStorage:', err);
    }

    // Notify listeners
    this.notifySubscribers(newEvent);

    // Also trigger custom DOM event for decoupled subscribers
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('creatiq_activity_logged', { detail: newEvent })
      );
    }

    return newEvent;
  }

  /**
   * Helper to log page view
   */
  public logPageView(pageId: string, pageTitle?: string): UserActivityEvent {
    return this.logActivity(
      'page_view',
      `Navigated to ${pageTitle || pageId}`,
      `User viewed section: ${pageId}`,
      pageId
    );
  }

  /**
   * Helper to log AI feature usage
   */
  public logFeatureUsed(featureTitle: string, details?: string, page?: string): UserActivityEvent {
    return this.logActivity(
      'feature_used',
      `Used AI Tool: ${featureTitle}`,
      details,
      page || 'tools'
    );
  }

  /**
   * Helper to log learning path enrollment
   */
  public logPathEnrollment(pathTitle: string, pathId: string): UserActivityEvent {
    return this.logActivity(
      'path_enrolled',
      `Enrolled in Path: ${pathTitle}`,
      `Learning Path ID: ${pathId}`,
      'learning'
    );
  }

  /**
   * Helper to log plan selection / checkout attempt
   */
  public logPlanSelected(planName: string, amount?: number): UserActivityEvent {
    return this.logActivity(
      'plan_selected',
      `Selected Subscription Plan: ${planName}`,
      amount ? `Amount: ₹${amount}` : undefined,
      'pricing'
    );
  }

  /**
   * Helper to log data export
   */
  public logDataExported(channel: string): UserActivityEvent {
    return this.logActivity(
      'data_exported',
      `Exported User Data via ${channel}`,
      `Channel: ${channel}`,
      'data_vault'
    );
  }

  /**
   * Clear all stored activity history
   */
  public clearActivities(): void {
    try {
      localStorage.removeItem('creatiq_activity_logs');
    } catch (err) {
      console.error('Failed to clear activity logs:', err);
    }
  }

  /**
   * Subscribe to real-time activity events
   */
  public subscribe(subscriber: ActivitySubscriber): () => void {
    this.subscribers.add(subscriber);
    return () => {
      this.subscribers.delete(subscriber);
    };
  }

  private notifySubscribers(event: UserActivityEvent) {
    this.subscribers.forEach((sub) => {
      try {
        sub(event);
      } catch (err) {
        console.error('Error in activity subscriber callback:', err);
      }
    });
  }
}

export const UserActivityTracker = new UserActivityTrackerService();
