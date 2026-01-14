import { supabase } from '@/integrations/supabase/client';
import { getCurrentUser } from '@/lib/auth/requireAuth';

export interface UsageLogEntry {
  action: string;
  resource?: string;
  metadata?: Record<string, any>;
}

/**
 * Log user action
 */
export async function logUsage(entry: UsageLogEntry): Promise<void> {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      console.warn('Cannot log usage: User not authenticated');
      return;
    }

    const { error } = await supabase
      .from('usage_logs')
      .insert({
        user_id: user.id,
        action: entry.action,
        resource: entry.resource,
        metadata: entry.metadata || {},
        ip_address: null, // Could be populated from request headers
        user_agent: navigator.userAgent,
      });

    if (error) {
      console.error('Failed to log usage:', error);
    }
  } catch (error) {
    console.error('Usage logging error:', error);
  }
}

/**
 * Log multiple actions in batch
 */
export async function logUsageBatch(entries: UsageLogEntry[]): Promise<void> {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      console.warn('Cannot log usage: User not authenticated');
      return;
    }

    const logs = entries.map(entry => ({
      user_id: user.id,
      action: entry.action,
      resource: entry.resource,
      metadata: entry.metadata || {},
      user_agent: navigator.userAgent,
    }));

    const { error } = await supabase
      .from('usage_logs')
      .insert(logs);

    if (error) {
      console.error('Failed to log usage batch:', error);
    }
  } catch (error) {
    console.error('Usage logging error:', error);
  }
}

/**
 * Get user's usage history
 */
export async function getUserUsageHistory(limit: number = 50) {
  const user = await getCurrentUser();
  
  if (!user) {
    throw new Error('User not authenticated');
  }

  const { data, error } = await supabase
    .from('usage_logs')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    throw error;
  }

  return data;
}
