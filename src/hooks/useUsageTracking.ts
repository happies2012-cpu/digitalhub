import { useCallback } from 'react';
import { logUsage, UsageLogEntry } from '@/lib/usage/logger';
import { trackEvent, AnalyticsEvent } from '@/lib/analytics/queries';

export function useUsageTracking() {
  const trackUsage = useCallback(async (entry: UsageLogEntry) => {
    await logUsage(entry);
  }, []);

  const trackAnalytics = useCallback(async (event: AnalyticsEvent) => {
    await trackEvent(event);
  }, []);

  const trackPageView = useCallback(async (pageName: string) => {
    await Promise.all([
      logUsage({ action: 'page_view', resource: pageName }),
      trackEvent({
        event_type: 'navigation',
        event_name: 'page_view',
        properties: { page: pageName },
      }),
    ]);
  }, []);

  return {
    trackUsage,
    trackAnalytics,
    trackPageView,
  };
}
