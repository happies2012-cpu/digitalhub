import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { CampaignPerformance } from "@/components/analytics/CampaignPerformance";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";
import {
  Download,
  Calendar,
  Users,
  MousePointerClick,
  TrendingUp,
  DollarSign,
} from "lucide-react";

const trafficData = [
  { name: "Mon", organic: 4000, paid: 2400, social: 1200 },
  { name: "Tue", organic: 3000, paid: 1398, social: 900 },
  { name: "Wed", organic: 5000, paid: 3800, social: 1500 },
  { name: "Thu", organic: 4500, paid: 2800, social: 1100 },
  { name: "Fri", organic: 6000, paid: 4500, social: 2000 },
  { name: "Sat", organic: 5500, paid: 3800, social: 1800 },
  { name: "Sun", organic: 7000, paid: 5200, social: 2400 },
];

const conversionData = [
  { name: "Week 1", conversions: 240, revenue: 12400 },
  { name: "Week 2", conversions: 198, revenue: 9800 },
  { name: "Week 3", conversions: 320, revenue: 15800 },
  { name: "Week 4", conversions: 450, revenue: 22400 },
];

const channelData = [
  { name: "Organic Search", value: 42, color: "hsl(190, 95%, 55%)" },
  { name: "Paid Ads", value: 28, color: "hsl(260, 80%, 60%)" },
  { name: "Social Media", value: 18, color: "hsl(160, 70%, 45%)" },
  { name: "Direct", value: 12, color: "hsl(35, 90%, 55%)" },
];

const Analytics = () => {
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
            <h1 className="text-2xl font-bold">Analytics</h1>
            <p className="text-muted-foreground">
              Deep dive into your marketing performance data.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="gap-2">
              <Calendar className="h-4 w-4" />
              Last 7 Days
            </Button>
            <Button variant="gradient" className="gap-2">
              <Download className="h-4 w-4" />
              Export Report
            </Button>
          </div>
        </motion.div>

        {/* Overview Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0 }}>
            <Card variant="metric">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Visitors</p>
                    <p className="text-2xl font-bold">48,392</p>
                    <p className="text-xs text-success">+8.2% vs last week</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card variant="metric">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                    <MousePointerClick className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Conversions</p>
                    <p className="text-2xl font-bold">1,208</p>
                    <p className="text-xs text-success">+12.5% vs last week</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card variant="metric">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-success/10 flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-success" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Conversion Rate</p>
                    <p className="text-2xl font-bold">2.49%</p>
                    <p className="text-xs text-success">+0.3% vs last week</p>
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
                    <DollarSign className="h-6 w-6 text-warning" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Revenue</p>
                    <p className="text-2xl font-bold">$60,400</p>
                    <p className="text-xs text-success">+15.8% vs last week</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Charts Container */}
        <div className="space-y-6">
          <CampaignPerformance />

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Traffic Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2"
            >
              <Card variant="elevated">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Traffic by Source</CardTitle>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-primary" />
                        <span className="text-muted-foreground">Organic</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-secondary" />
                        <span className="text-muted-foreground">Paid</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-success" />
                        <span className="text-muted-foreground">Social</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={trafficData}>
                        <defs>
                          <linearGradient id="colorOrganic" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(190, 95%, 55%)" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="hsl(190, 95%, 55%)" stopOpacity={0} />
                          </linearGradient>
                          <linearGradient id="colorPaid" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(260, 80%, 60%)" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="hsl(260, 80%, 60%)" stopOpacity={0} />
                          </linearGradient>
                          <linearGradient id="colorSocial" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(160, 70%, 45%)" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="hsl(160, 70%, 45%)" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 40%, 16%)" />
                        <XAxis dataKey="name" stroke="hsl(215, 20%, 55%)" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="hsl(215, 20%, 55%)" fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(222, 47%, 8%)",
                            border: "1px solid hsl(222, 40%, 16%)",
                            borderRadius: "0.75rem",
                            color: "hsl(210, 40%, 98%)",
                          }}
                        />
                        <Area type="monotone" dataKey="organic" stroke="hsl(190, 95%, 55%)" strokeWidth={2} fillOpacity={1} fill="url(#colorOrganic)" />
                        <Area type="monotone" dataKey="paid" stroke="hsl(260, 80%, 60%)" strokeWidth={2} fillOpacity={1} fill="url(#colorPaid)" />
                        <Area type="monotone" dataKey="social" stroke="hsl(160, 70%, 45%)" strokeWidth={2} fillOpacity={1} fill="url(#colorSocial)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Channel Breakdown */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card variant="elevated">
                <CardHeader>
                  <CardTitle>Channel Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={channelData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={4}
                          dataKey="value"
                        >
                          {channelData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(222, 47%, 8%)",
                            border: "1px solid hsl(222, 40%, 16%)",
                            borderRadius: "0.75rem",
                            color: "hsl(210, 40%, 98%)",
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-4 space-y-2">
                    {channelData.map((channel) => (
                      <div key={channel.name} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full" style={{ backgroundColor: channel.color }} />
                          <span className="text-muted-foreground">{channel.name}</span>
                        </div>
                        <span className="font-medium">{channel.value}%</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Conversions Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card variant="elevated">
              <CardHeader>
                <CardTitle>Conversions & Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={conversionData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 40%, 16%)" />
                      <XAxis dataKey="name" stroke="hsl(215, 20%, 55%)" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis yAxisId="left" stroke="hsl(215, 20%, 55%)" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis yAxisId="right" orientation="right" stroke="hsl(215, 20%, 55%)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value / 1000}k`} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(222, 47%, 8%)",
                          border: "1px solid hsl(222, 40%, 16%)",
                          borderRadius: "0.75rem",
                          color: "hsl(210, 40%, 98%)",
                        }}
                      />
                      <Bar yAxisId="left" dataKey="conversions" fill="hsl(190, 95%, 55%)" radius={[4, 4, 0, 0]} />
                      <Bar yAxisId="right" dataKey="revenue" fill="hsl(260, 80%, 60%)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
