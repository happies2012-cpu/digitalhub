import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Tables } from '@/integrations/supabase/types';
import { AnalyticsOverview, EventsChart } from '@/components/analytics';
import { UsageStats } from '@/components/usage';
import {
  Users,
  CreditCard,
  TrendingUp,
  Activity,
  Search,
  MoreHorizontal,
  Shield,
  UserCheck,
  DollarSign,
  BarChart3,
  Settings,
} from 'lucide-react';

type Profile = Tables<'profiles'>;
type Subscription = Tables<'subscriptions'>;
type UserRole = Tables<'user_roles'>;

interface UserData {
  id: string;
  email: string;
  full_name: string;
  created_at: string;
  role: string;
  subscription_status: string;
}

const Admin = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState<UserData[]>([]);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeSubscriptions: 0,
    revenue: 0,
    growthRate: 0,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch profiles
      const { data: profiles } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      // Fetch subscriptions
      const { data: subs } = await supabase
        .from('subscriptions')
        .select('*');

      // Fetch user roles
      const { data: roles } = await supabase
        .from('user_roles')
        .select('*');

      if (profiles) {
        const usersWithRoles: UserData[] = profiles.map(profile => ({
          id: profile.id,
          email: profile.email || '',
          full_name: profile.full_name || 'Unknown',
          created_at: profile.created_at,
          role: roles?.find(r => r.user_id === profile.user_id)?.role || 'user',
          subscription_status: subs?.find(s => s.user_id === profile.user_id)?.status || 'inactive',
        }));
        setUsers(usersWithRoles);
      }

      if (subs) {
        setSubscriptions(subs);
      }

      // Calculate stats
      setStats({
        totalUsers: profiles?.length || 0,
        activeSubscriptions: subs?.filter(s => s.status === 'active').length || 0,
        revenue: calculateRevenue(subs || []),
        growthRate: 12.5,
      });

    } catch (error) {
      console.error('Error fetching admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateRevenue = (subs: Subscription[]) => {
    return subs
      .filter(s => s.status === 'active')
      .reduce((sum, s) => sum + (s.plan_price || 0), 0);
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">Admin Dashboard</h1>
              <Badge className="bg-primary/10 text-primary">Admin</Badge>
            </div>
            <p className="text-muted-foreground">
              Manage users, subscriptions, and platform analytics.
            </p>
          </div>
          <Button variant="gradient" className="gap-2">
            <Settings className="h-4 w-4" />
            Platform Settings
          </Button>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0 }}>
            <Card variant="metric">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Users</p>
                    <p className="text-2xl font-bold">{stats.totalUsers}</p>
                    <p className="text-xs text-success">+{stats.growthRate}% this month</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card variant="metric">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-success/10 flex items-center justify-center">
                    <UserCheck className="h-6 w-6 text-success" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Active Subscriptions</p>
                    <p className="text-2xl font-bold">{stats.activeSubscriptions}</p>
                    <p className="text-xs text-muted-foreground">
                      {stats.totalUsers > 0 ? Math.round((stats.activeSubscriptions / stats.totalUsers) * 100) : 0}% conversion
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card variant="metric">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                    <DollarSign className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Monthly Revenue</p>
                    <p className="text-2xl font-bold">₹{stats.revenue.toLocaleString()}</p>
                    <p className="text-xs text-success">+18% vs last month</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card variant="metric">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-warning/10 flex items-center justify-center">
                    <Activity className="h-6 w-6 text-warning" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Active Sessions</p>
                    <p className="text-2xl font-bold">48</p>
                    <p className="text-xs text-muted-foreground">Real-time</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="bg-muted/50">
            <TabsTrigger value="users" className="gap-2">
              <Users className="h-4 w-4" />
              Users
            </TabsTrigger>
            <TabsTrigger value="subscriptions" className="gap-2">
              <CreditCard className="h-4 w-4" />
              Subscriptions
            </TabsTrigger>
            <TabsTrigger value="analytics" className="gap-2">
              <BarChart3 className="h-4 w-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="usage" className="gap-2">
              <Activity className="h-4 w-4" />
              Usage
            </TabsTrigger>
          </TabsList>

          <TabsContent value="users">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Card variant="elevated">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>All Users</CardTitle>
                    <div className="relative w-64">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input placeholder="Search users..." className="pl-10 h-9" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="flex items-center justify-center py-12">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    </div>
                  ) : users.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                      No users found
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {users.map((userData, index) => (
                        <motion.div
                          key={userData.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.05 * index }}
                          className="p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <Avatar className="h-10 w-10">
                                <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-primary-foreground text-sm font-semibold">
                                  {getInitials(userData.full_name)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="flex items-center gap-2">
                                  <p className="font-medium">{userData.full_name}</p>
                                  {userData.role === 'admin' && (
                                    <Badge className="bg-primary/10 text-primary text-xs">
                                      <Shield className="h-3 w-3 mr-1" />
                                      Admin
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-sm text-muted-foreground">{userData.email}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-6">
                              <div className="text-center">
                                <p className="text-xs text-muted-foreground">Status</p>
                                <Badge
                                  className={
                                    userData.subscription_status === 'active'
                                      ? 'bg-success/10 text-success'
                                      : 'bg-muted text-muted-foreground'
                                  }
                                >
                                  {userData.subscription_status}
                                </Badge>
                              </div>
                              <div className="text-center">
                                <p className="text-xs text-muted-foreground">Joined</p>
                                <p className="text-sm font-medium">
                                  {new Date(userData.created_at).toLocaleDateString()}
                                </p>
                              </div>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="subscriptions">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Card variant="elevated">
                <CardHeader>
                  <CardTitle>Subscription Management</CardTitle>
                  <CardDescription>View and manage all active subscriptions</CardDescription>
                </CardHeader>
                <CardContent>
                  {subscriptions.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                      No subscriptions found
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {subscriptions.map((sub, index) => (
                        <motion.div
                          key={sub.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.05 * index }}
                          className="p-4 rounded-lg bg-muted/30"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium capitalize">{sub.plan_name} Plan</p>
                              <p className="text-sm text-muted-foreground">₹{sub.plan_price.toLocaleString()}/month</p>
                            </div>
                            <div className="flex items-center gap-4">
                              <Badge
                                className={
                                  sub.status === 'active'
                                    ? 'bg-success/10 text-success'
                                    : 'bg-warning/10 text-warning'
                                }
                              >
                                {sub.status || 'pending'}
                              </Badge>
                              <p className="text-sm text-muted-foreground">
                                {sub.ends_at ? `Expires: ${new Date(sub.ends_at).toLocaleDateString()}` : 'No expiry'}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="analytics">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <AnalyticsOverview />
              <EventsChart />
            </motion.div>
          </TabsContent>

          <TabsContent value="usage">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <UsageStats />
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Admin;
