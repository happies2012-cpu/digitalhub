import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Search,
  TrendingUp,
  TrendingDown,
  ExternalLink,
  RefreshCw,
  Plus,
  Globe,
  Link2,
  FileText,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

const keywords = [
  { keyword: "digital marketing software", position: 3, prevPosition: 5, volume: "14.8K", difficulty: 67 },
  { keyword: "marketing automation tools", position: 7, prevPosition: 8, volume: "22.1K", difficulty: 72 },
  { keyword: "seo optimization platform", position: 12, prevPosition: 9, volume: "9.5K", difficulty: 58 },
  { keyword: "social media management", position: 5, prevPosition: 5, volume: "31.2K", difficulty: 81 },
  { keyword: "email campaign software", position: 8, prevPosition: 11, volume: "18.4K", difficulty: 63 },
  { keyword: "analytics dashboard tool", position: 15, prevPosition: 18, volume: "7.2K", difficulty: 45 },
];

const siteAudit = [
  { label: "Missing Meta Descriptions", count: 12, severity: "warning" },
  { label: "Broken Links", count: 3, severity: "error" },
  { label: "Missing Alt Tags", count: 28, severity: "warning" },
  { label: "Slow Loading Pages", count: 5, severity: "error" },
];

const backlinks = [
  { domain: "techcrunch.com", da: 94, links: 3, type: "dofollow" },
  { domain: "forbes.com", da: 95, links: 1, type: "dofollow" },
  { domain: "medium.com", da: 89, links: 8, type: "nofollow" },
  { domain: "producthunt.com", da: 87, links: 2, type: "dofollow" },
];

const SEO = () => {
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
            <h1 className="text-2xl font-bold">SEO Management</h1>
            <p className="text-muted-foreground">
              Track keywords, analyze backlinks, and optimize your content.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Refresh Data
            </Button>
            <Button variant="gradient" className="gap-2">
              <Plus className="h-4 w-4" />
              Add Keywords
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
                    <Globe className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Domain Authority</p>
                    <p className="text-2xl font-bold">68</p>
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
                    <Link2 className="h-6 w-6 text-success" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Backlinks</p>
                    <p className="text-2xl font-bold">1,247</p>
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
                    <Search className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Keywords Tracked</p>
                    <p className="text-2xl font-bold">156</p>
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
                    <FileText className="h-6 w-6 text-warning" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Pages Indexed</p>
                    <p className="text-2xl font-bold">89</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Keywords Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card variant="elevated">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Keyword Rankings</CardTitle>
                  <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input placeholder="Search keywords..." className="pl-10 h-9" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {keywords.map((kw, index) => {
                    const change = kw.prevPosition - kw.position;
                    return (
                      <motion.div
                        key={kw.keyword}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.05 * index }}
                        className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex-1">
                          <p className="font-medium">{kw.keyword}</p>
                          <p className="text-sm text-muted-foreground">{kw.volume} monthly searches</p>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="text-center">
                            <p className="text-xs text-muted-foreground mb-1">Difficulty</p>
                            <Progress value={kw.difficulty} className="w-16 h-2" />
                          </div>
                          <div className="w-16 text-center">
                            <p className="text-xs text-muted-foreground mb-1">Position</p>
                            <p className="text-xl font-bold">#{kw.position}</p>
                          </div>
                          <div className="flex items-center gap-1 w-16">
                            {change > 0 ? (
                              <TrendingUp className="h-4 w-4 text-success" />
                            ) : change < 0 ? (
                              <TrendingDown className="h-4 w-4 text-destructive" />
                            ) : null}
                            <span
                              className={cn(
                                "font-medium",
                                change > 0 && "text-success",
                                change < 0 && "text-destructive",
                                change === 0 && "text-muted-foreground"
                              )}
                            >
                              {change > 0 && "+"}
                              {change !== 0 ? change : "-"}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Side Cards */}
          <div className="space-y-6">
            {/* Site Audit */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card variant="elevated">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-warning" />
                    Site Audit Issues
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {siteAudit.map((issue) => (
                      <div
                        key={issue.label}
                        className="flex items-center justify-between p-3 rounded-lg bg-muted/30"
                      >
                        <span className="text-sm">{issue.label}</span>
                        <Badge
                          className={cn(
                            "text-xs",
                            issue.severity === "error"
                              ? "bg-destructive/10 text-destructive"
                              : "bg-warning/10 text-warning"
                          )}
                        >
                          {issue.count}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Backlinks */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card variant="elevated">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Top Backlinks</CardTitle>
                    <button className="text-sm text-primary hover:text-primary/80 flex items-center gap-1">
                      View all
                      <ExternalLink className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {backlinks.map((link) => (
                      <div
                        key={link.domain}
                        className="flex items-center justify-between p-3 rounded-lg bg-muted/30"
                      >
                        <div>
                          <p className="font-medium text-sm">{link.domain}</p>
                          <p className="text-xs text-muted-foreground">
                            DA: {link.da} · {link.links} links
                          </p>
                        </div>
                        <Badge
                          variant="outline"
                          className={cn(
                            "text-xs",
                            link.type === "dofollow"
                              ? "border-success/50 text-success"
                              : "border-muted-foreground/50"
                          )}
                        >
                          {link.type}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SEO;
