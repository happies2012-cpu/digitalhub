import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Mail,
  Send,
  Users,
  TrendingUp,
  Clock,
  Eye,
  MousePointerClick,
  FileText,
  MoreHorizontal,
} from "lucide-react";
import { cn } from "@/lib/utils";

const emailCampaigns = [
  {
    id: "1",
    name: "Weekly Newsletter",
    status: "sent",
    sentAt: "Dec 15, 2024",
    recipients: 12500,
    openRate: 42.5,
    clickRate: 8.2,
    unsubscribes: 12,
  },
  {
    id: "2",
    name: "Product Launch Announcement",
    status: "scheduled",
    scheduledFor: "Dec 20, 2024",
    recipients: 8900,
    openRate: 0,
    clickRate: 0,
    unsubscribes: 0,
  },
  {
    id: "3",
    name: "Holiday Sale Promotion",
    status: "sent",
    sentAt: "Dec 10, 2024",
    recipients: 15200,
    openRate: 38.7,
    clickRate: 12.4,
    unsubscribes: 23,
  },
  {
    id: "4",
    name: "Customer Re-engagement",
    status: "draft",
    recipients: 3400,
    openRate: 0,
    clickRate: 0,
    unsubscribes: 0,
  },
];

const automations = [
  { name: "Welcome Series", status: "active", triggers: 245, conversions: 89 },
  { name: "Abandoned Cart", status: "active", triggers: 156, conversions: 42 },
  { name: "Post-Purchase Follow-up", status: "active", triggers: 892, conversions: 234 },
  { name: "Win-back Campaign", status: "paused", triggers: 67, conversions: 12 },
];

const EmailMarketing = () => {
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
            <h1 className="text-2xl font-bold">Email Marketing</h1>
            <p className="text-muted-foreground">
              Create and manage email campaigns and automations.
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
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Subscribers</p>
                    <p className="text-2xl font-bold">24,589</p>
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
                    <Eye className="h-6 w-6 text-success" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Avg. Open Rate</p>
                    <p className="text-2xl font-bold">38.4%</p>
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
                    <MousePointerClick className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Avg. Click Rate</p>
                    <p className="text-2xl font-bold">6.8%</p>
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
                    <Send className="h-6 w-6 text-warning" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Emails Sent</p>
                    <p className="text-2xl font-bold">156K</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Email Campaigns */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card variant="elevated">
              <CardHeader>
                <CardTitle>Recent Campaigns</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {emailCampaigns.map((campaign, index) => (
                    <motion.div
                      key={campaign.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * index }}
                      className="p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Mail className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{campaign.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {campaign.recipients.toLocaleString()} recipients
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            className={cn(
                              "text-xs",
                              campaign.status === "sent" && "bg-success/10 text-success",
                              campaign.status === "scheduled" && "bg-primary/10 text-primary",
                              campaign.status === "draft" && "bg-muted text-muted-foreground"
                            )}
                          >
                            {campaign.status === "scheduled" && <Clock className="h-3 w-3 mr-1" />}
                            {campaign.status}
                          </Badge>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      {campaign.status === "sent" && (
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground mb-1">Open Rate</p>
                            <p className="font-semibold">{campaign.openRate}%</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground mb-1">Click Rate</p>
                            <p className="font-semibold">{campaign.clickRate}%</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground mb-1">Sent</p>
                            <p className="font-semibold">{campaign.sentAt}</p>
                          </div>
                        </div>
                      )}
                      {campaign.status === "scheduled" && (
                        <p className="text-sm text-muted-foreground">
                          Scheduled for {campaign.scheduledFor}
                        </p>
                      )}
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Automations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card variant="elevated">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Automations</CardTitle>
                  <Button variant="ghost" size="sm" className="gap-1">
                    <Plus className="h-4 w-4" />
                    Add
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {automations.map((automation, index) => (
                    <motion.div
                      key={automation.name}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * index }}
                      className="p-4 rounded-lg bg-muted/30"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium text-sm">{automation.name}</p>
                        <Badge
                          className={cn(
                            "text-xs",
                            automation.status === "active"
                              ? "bg-success/10 text-success"
                              : "bg-warning/10 text-warning"
                          )}
                        >
                          {automation.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>{automation.triggers} triggers</span>
                        <span>{automation.conversions} conversions</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EmailMarketing;
