import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getPlatformAnalytics } from '@/lib/analytics/queries';
import { TrendingUp, Users, Activity, BarChart3 } from 'lucide-react';

export const AnalyticsOverview = () => {
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      const data = await getPlatformAnalytics(30);
      setAnalytics(data);
    } catch (error) {
      console.error('Failed to load analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} variant="metric">
            <CardContent className="p-6">
              <div className="animate-pulse space-y-3">
                <div className="h-12 w-12 rounded-xl bg-muted" />
                <div className="h-4 w-20 bg-muted rounded" />
                <div className="h-8 w-16 bg-muted rounded" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const stats = [
    {
      title: 'Total Users',
      value: analytics?.total_users || 0,
      icon: Users,
      color: 'primary',
      trend: '+12%',
    },
    {
      title: 'Active Users',
      value: analytics?.active_users || 0,
      icon: Activity,
      color: 'success',
      trend: '+8%',
    },
    {
      title: 'Total Events',
      value: analytics?.total_events || 0,
      icon: BarChart3,
      color: 'secondary',
      trend: '+24%',
    },
    {
      title: 'Engagement Rate',
      value: analytics?.total_users > 0
        ? `${Math.round((analytics?.active_users / analytics?.total_users) * 100)}%`
        : '0%',
      icon: TrendingUp,
      color: 'warning',
      trend: '+5%',
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card variant="metric">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className={`h-12 w-12 rounded-xl bg-${stat.color}/10 flex items-center justify-center`}>
                  <stat.icon className={`h-6 w-6 text-${stat.color}`} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-success">{stat.trend} this month</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};
