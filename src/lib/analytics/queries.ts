import { supabase } from '@/integrations/supabase/client';
import { requireAdmin } from '@/lib/auth/requireAdmin';

export interface AnalyticsEvent {
  event_type: string;
  event_name: string;
  properties?: Record<string, any>;
  session_id?: string;
}

/**
 * Track analytics event
 */
export async function trackEvent(event: AnalyticsEvent): Promise<void> {
  try {
    const { data: { user } } = await supabase.auth.getUser();

    const { error } = await supabase
      .from('analytics_events')
      .insert({
        event_type: event.event_type,
        event_name: event.event_name,
        user_id: user?.id || null,
        session_id: event.session_id || null,
        properties: event.properties || {},
      });

    if (error) {
      console.error('Failed to track event:', error);
    }
  } catch (error) {
    console.error('Analytics tracking error:', error);
  }
}

/**
 * Get platform analytics (admin only)
 */
export async function getPlatformAnalytics(daysBack: number = 30) {
  await requireAdmin();

  const { data, error } = await supabase
    .rpc('get_platform_analytics', { days_back: daysBack });

  if (error) {
    throw error;
  }

  return data;
}

/**
 * Get user statistics
 */
export async function getUserStats(userId: string) {
  const { data, error } = await supabase
    .rpc('get_user_stats', { target_user_id: userId });

  if (error) {
    throw error;
  }

  return data;
}

/**
 * Get recent events (admin only)
 */
export async function getRecentEvents(limit: number = 100) {
  await requireAdmin();

  const { data, error } = await supabase
    .from('analytics_events')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    throw error;
  }

  return data;
}
