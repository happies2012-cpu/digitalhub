-- Usage logs table
CREATE TABLE IF NOT EXISTS public.usage_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  action TEXT NOT NULL,
  resource TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Analytics events table
CREATE TABLE IF NOT EXISTS public.analytics_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type TEXT NOT NULL,
  event_name TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  session_id TEXT,
  properties JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_usage_logs_user_id ON public.usage_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_usage_logs_created_at ON public.usage_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_usage_logs_action ON public.usage_logs(action);
CREATE INDEX IF NOT EXISTS idx_analytics_events_user_id ON public.analytics_events(user_id);
CREATE INDEX IF NOT EXISTS idx_analytics_events_created_at ON public.analytics_events(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_events_type ON public.analytics_events(event_type);

-- Enable RLS
ALTER TABLE public.usage_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;

-- RLS Policies for usage_logs
CREATE POLICY "Users can view their own usage logs"
  ON public.usage_logs FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "System can insert usage logs"
  ON public.usage_logs FOR INSERT
  WITH CHECK (true);

-- RLS Policies for analytics_events
CREATE POLICY "Admins can view all analytics"
  ON public.analytics_events FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "System can insert analytics events"
  ON public.analytics_events FOR INSERT
  WITH CHECK (true);

-- Function to get user statistics
CREATE OR REPLACE FUNCTION public.get_user_stats(target_user_id UUID)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result JSON;
BEGIN
  SELECT json_build_object(
    'total_actions', COUNT(*),
    'last_activity', MAX(created_at),
    'top_actions', (
      SELECT json_agg(action_stats)
      FROM (
        SELECT action, COUNT(*) as count
        FROM public.usage_logs
        WHERE user_id = target_user_id
        GROUP BY action
        ORDER BY count DESC
        LIMIT 5
      ) action_stats
    )
  )
  INTO result
  FROM public.usage_logs
  WHERE user_id = target_user_id;
  
  RETURN result;
END;
$$;

-- Function to get platform analytics
CREATE OR REPLACE FUNCTION public.get_platform_analytics(days_back INTEGER DEFAULT 30)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result JSON;
BEGIN
  -- Check if user is admin
  IF NOT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid() AND role = 'admin'
  ) THEN
    RAISE EXCEPTION 'Unauthorized: Admin access required';
  END IF;

  SELECT json_build_object(
    'total_users', (SELECT COUNT(*) FROM public.profiles),
    'active_users', (
      SELECT COUNT(DISTINCT user_id)
      FROM public.usage_logs
      WHERE created_at > now() - (days_back || ' days')::interval
    ),
    'total_events', (
      SELECT COUNT(*)
      FROM public.analytics_events
      WHERE created_at > now() - (days_back || ' days')::interval
    ),
    'events_by_type', (
      SELECT json_object_agg(event_type, count)
      FROM (
        SELECT event_type, COUNT(*) as count
        FROM public.analytics_events
        WHERE created_at > now() - (days_back || ' days')::interval
        GROUP BY event_type
      ) event_counts
    ),
    'daily_active_users', (
      SELECT json_agg(daily_stats)
      FROM (
        SELECT 
          DATE(created_at) as date,
          COUNT(DISTINCT user_id) as users
        FROM public.usage_logs
        WHERE created_at > now() - (days_back || ' days')::interval
        GROUP BY DATE(created_at)
        ORDER BY date DESC
      ) daily_stats
    )
  )
  INTO result;
  
  RETURN result;
END;
$$;
