import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  Plus,
  Search,
  Building2,
  Users,
  DollarSign,
  TrendingUp,
  MoreHorizontal,
  Mail,
  Phone,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";

const clients = [
  {
    id: "1",
    name: "TechCorp Industries",
    logo: "TC",
    email: "contact@techcorp.com",
    phone: "+1 (555) 123-4567",
    campaigns: 5,
    monthlySpend: 15000,
    status: "active",
    growth: 12.5,
  },
  {
    id: "2",
    name: "GreenLife Wellness",
    logo: "GL",
    email: "hello@greenlife.com",
    phone: "+1 (555) 234-5678",
    campaigns: 3,
    monthlySpend: 8500,
    status: "active",
    growth: 8.2,
  },
  {
    id: "3",
    name: "Urban Eats Co.",
    logo: "UE",
    email: "team@urbaneats.com",
    phone: "+1 (555) 345-6789",
    campaigns: 7,
    monthlySpend: 22000,
    status: "active",
    growth: -2.1,
  },
  {
    id: "4",
    name: "FitPro Studios",
    logo: "FP",
    email: "info@fitpro.com",
    phone: "+1 (555) 456-7890",
    campaigns: 2,
    monthlySpend: 5000,
    status: "pending",
    growth: 0,
  },
  {
    id: "5",
    name: "Coastal Properties",
    logo: "CP",
    email: "sales@coastal.com",
    phone: "+1 (555) 567-8901",
    campaigns: 4,
    monthlySpend: 12000,
    status: "active",
    growth: 15.8,
  },
];

const Clients = () => {
  const totalClients = clients.length;
  const activeClients = clients.filter((c) => c.status === "active").length;
  const totalSpend = clients.reduce((sum, c) => sum + c.monthlySpend, 0);
  const totalCampaigns = clients.reduce((sum, c) => sum + c.campaigns, 0);

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
            <h1 className="text-2xl font-bold">Clients</h1>
            <p className="text-muted-foreground">
              Manage your client accounts and access levels.
            </p>
          </div>
          <Button variant="gradient" className="gap-2">
            <Plus className="h-4 w-4" />
            Add Client
          </Button>
        </motion.div>

        {/* Overview Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0 }}>
            <Card variant="metric">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Building2 className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Clients</p>
                    <p className="text-2xl font-bold">{totalClients}</p>
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
                    <Users className="h-6 w-6 text-success" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Active Clients</p>
                    <p className="text-2xl font-bold">{activeClients}</p>
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
                    <p className="text-sm text-muted-foreground">Monthly Spend</p>
                    <p className="text-2xl font-bold">${(totalSpend / 1000).toFixed(1)}K</p>
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
                    <p className="text-sm text-muted-foreground">Total Campaigns</p>
                    <p className="text-2xl font-bold">{totalCampaigns}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Clients List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card variant="elevated">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>All Clients</CardTitle>
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder="Search clients..." className="pl-10 h-9" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {clients.map((client, index) => (
                  <motion.div
                    key={client.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * index }}
                    className="p-5 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-primary-foreground font-semibold">
                            {client.logo}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-semibold">{client.name}</p>
                            <Badge
                              className={cn(
                                "text-xs",
                                client.status === "active"
                                  ? "bg-success/10 text-success"
                                  : "bg-warning/10 text-warning"
                              )}
                            >
                              {client.status}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Mail className="h-3.5 w-3.5" />
                              {client.email}
                            </div>
                            <div className="flex items-center gap-1">
                              <Phone className="h-3.5 w-3.5" />
                              {client.phone}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-8">
                        <div className="text-center">
                          <p className="text-xs text-muted-foreground mb-1">Campaigns</p>
                          <p className="font-semibold">{client.campaigns}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-muted-foreground mb-1">Monthly Spend</p>
                          <p className="font-semibold">${client.monthlySpend.toLocaleString()}</p>
                        </div>
                        <div className="text-center w-16">
                          <p className="text-xs text-muted-foreground mb-1">Growth</p>
                          <p
                            className={cn(
                              "font-semibold",
                              client.growth > 0 && "text-success",
                              client.growth < 0 && "text-destructive",
                              client.growth === 0 && "text-muted-foreground"
                            )}
                          >
                            {client.growth > 0 && "+"}
                            {client.growth !== 0 ? `${client.growth}%` : "-"}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
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

export default Clients;
