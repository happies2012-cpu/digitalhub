import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Plus,
  TrendingUp,
  TrendingDown,
  DollarSign,
  MousePointerClick,
  Eye,
  Target,
  Pause,
  Play,
  Copy,
  MoreHorizontal,
} from "lucide-react";
import { cn } from "@/lib/utils";

const campaigns = [
  {
    id: "1",
    name: "Summer Sale 2024",
    platform: "Google Ads",
    status: "active",
    budget: 5000,
    spent: 2450,
    impressions: 125000,
    clicks: 3420,
    conversions: 156,
    ctr: 2.74,
    cpc: 0.72,
    roas: 4.2,
    change: 12.5,
  },
  {
    id: "2",
    name: "Brand Awareness",
    platform: "Meta Ads",
    status: "active",
    budget: 3000,
    spent: 1820,
    impressions: 89000,
    clicks: 2100,
    conversions: 89,
    ctr: 2.36,
    cpc: 0.87,
    roas: 3.1,
    change: -2.3,
  },
  {
    id: "3",
    name: "B2B Lead Generation",
    platform: "LinkedIn Ads",
    status: "active",
    budget: 8000,
    spent: 3200,
    impressions: 45000,
    clicks: 890,
    conversions: 42,
    ctr: 1.98,
    cpc: 3.60,
    roas: 5.8,
    change: 8.7,
  },
  {
    id: "4",
    name: "Product Launch",
    platform: "Google Ads",
    status: "paused",
    budget: 2000,
    spent: 890,
    impressions: 32000,
    clicks: 780,
    conversions: 34,
    ctr: 2.44,
    cpc: 1.14,
    roas: 2.9,
    change: 0,
  },
  {
    id: "5",
    name: "Retargeting",
    platform: "Meta Ads",
    status: "active",
    budget: 1500,
    spent: 980,
    impressions: 67000,
    clicks: 2890,
    conversions: 112,
    ctr: 4.31,
    cpc: 0.34,
    roas: 6.2,
    change: 15.8,
  },
];

const platformColors = {
  "Google Ads": "bg-success/10 text-success border-success/20",
  "Meta Ads": "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "LinkedIn Ads": "bg-sky-500/10 text-sky-400 border-sky-500/20",
};

const Campaigns = () => {
  const totalSpent = campaigns.reduce((sum, c) => sum + c.spent, 0);
  const totalBudget = campaigns.reduce((sum, c) => sum + c.budget, 0);
  const totalConversions = campaigns.reduce((sum, c) => sum + c.conversions, 0);
  const totalClicks = campaigns.reduce((sum, c) => sum + c.clicks, 0);
  const avgRoas = (campaigns.reduce((sum, c) => sum + c.roas, 0) / campaigns.length).toFixed(1);

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
            <h1 className="text-2xl font-bold">Ad Campaigns</h1>
            <p className="text-muted-foreground">
              Manage and optimize your advertising campaigns across platforms.
            </p>
          </div>
          <Button variant="gradient" className="gap-2">
            <Plus className="h-4 w-4" />
            New Campaign
          </Button>
        </motion.div>

        {/* Overview Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0 }}>
            <Card variant="metric">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <DollarSign className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Spent</p>
                    <p className="text-2xl font-bold">${totalSpent.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">of ${totalBudget.toLocaleString()} budget</p>
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
                    <p className="text-sm text-muted-foreground">Total Clicks</p>
                    <p className="text-2xl font-bold">{totalClicks.toLocaleString()}</p>
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
                    <Target className="h-6 w-6 text-success" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Conversions</p>
                    <p className="text-2xl font-bold">{totalConversions}</p>
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
                    <TrendingUp className="h-6 w-6 text-warning" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Avg. ROAS</p>
                    <p className="text-2xl font-bold">{avgRoas}x</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Campaigns Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card variant="elevated">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>All Campaigns</CardTitle>
                <Tabs defaultValue="all">
                  <TabsList className="bg-muted/50">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="active">Active</TabsTrigger>
                    <TabsTrigger value="paused">Paused</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {campaigns.map((campaign, index) => (
                  <motion.div
                    key={campaign.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * index }}
                    className="p-5 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold">{campaign.name}</span>
                            <Badge
                              variant="outline"
                              className={cn("text-xs", platformColors[campaign.platform as keyof typeof platformColors])}
                            >
                              {campaign.platform}
                            </Badge>
                            <Badge
                              className={cn(
                                "text-xs",
                                campaign.status === "active"
                                  ? "bg-success/10 text-success"
                                  : "bg-warning/10 text-warning"
                              )}
                            >
                              {campaign.status}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>${campaign.spent.toLocaleString()} / ${campaign.budget.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          {campaign.status === "active" ? (
                            <Pause className="h-4 w-4" />
                          ) : (
                            <Play className="h-4 w-4" />
                          )}
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Budget Progress */}
                    <div className="mb-4">
                      <Progress value={(campaign.spent / campaign.budget) * 100} className="h-2" />
                    </div>

                    {/* Metrics Grid */}
                    <div className="grid grid-cols-6 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground mb-1">Impressions</p>
                        <p className="font-semibold">{(campaign.impressions / 1000).toFixed(0)}K</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-1">Clicks</p>
                        <p className="font-semibold">{campaign.clicks.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-1">CTR</p>
                        <p className="font-semibold">{campaign.ctr}%</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-1">CPC</p>
                        <p className="font-semibold">${campaign.cpc}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-1">Conversions</p>
                        <p className="font-semibold">{campaign.conversions}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-1">ROAS</p>
                        <div className="flex items-center gap-1">
                          <p className="font-semibold">{campaign.roas}x</p>
                          {campaign.change !== 0 && (
                            <span
                              className={cn(
                                "text-xs flex items-center",
                                campaign.change > 0 ? "text-success" : "text-destructive"
                              )}
                            >
                              {campaign.change > 0 ? (
                                <TrendingUp className="h-3 w-3" />
                              ) : (
                                <TrendingDown className="h-3 w-3" />
                              )}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Campaigns;
