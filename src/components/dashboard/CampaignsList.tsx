import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface Campaign {
  id: string;
  name: string;
  platform: "Google" | "Meta" | "LinkedIn" | "Twitter";
  status: "active" | "paused" | "draft";
  spend: number;
  conversions: number;
  roas: number;
  change: number;
}

const campaigns: Campaign[] = [
  {
    id: "1",
    name: "Summer Sale 2024",
    platform: "Google",
    status: "active",
    spend: 2450,
    conversions: 156,
    roas: 4.2,
    change: 12.5,
  },
  {
    id: "2",
    name: "Brand Awareness",
    platform: "Meta",
    status: "active",
    spend: 1820,
    conversions: 89,
    roas: 3.1,
    change: -2.3,
  },
  {
    id: "3",
    name: "B2B Lead Gen",
    platform: "LinkedIn",
    status: "active",
    spend: 3200,
    conversions: 42,
    roas: 5.8,
    change: 8.7,
  },
  {
    id: "4",
    name: "Product Launch",
    platform: "Google",
    status: "paused",
    spend: 890,
    conversions: 34,
    roas: 2.9,
    change: 0,
  },
];

const platformColors = {
  Google: "bg-success/10 text-success border-success/20",
  Meta: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  LinkedIn: "bg-sky-500/10 text-sky-400 border-sky-500/20",
  Twitter: "bg-foreground/10 text-foreground border-foreground/20",
};

const statusColors = {
  active: "bg-success/10 text-success",
  paused: "bg-warning/10 text-warning",
  draft: "bg-muted text-muted-foreground",
};

export function CampaignsList() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Card variant="elevated">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Active Campaigns</CardTitle>
            <button className="text-sm text-primary hover:text-primary/80 flex items-center gap-1">
              View all
              <ExternalLink className="h-3.5 w-3.5" />
            </button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {campaigns.map((campaign, index) => (
              <motion.div
                key={campaign.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
                className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{campaign.name}</span>
                      <Badge variant="outline" className={cn("text-xs", platformColors[campaign.platform])}>
                        {campaign.platform}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={cn("text-xs font-normal", statusColors[campaign.status])}>
                        {campaign.status}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        ${campaign.spend.toLocaleString()} spent
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Conversions</p>
                    <p className="font-semibold">{campaign.conversions}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">ROAS</p>
                    <p className="font-semibold">{campaign.roas}x</p>
                  </div>
                  <div className="flex items-center gap-1">
                    {campaign.change > 0 ? (
                      <TrendingUp className="h-4 w-4 text-success" />
                    ) : campaign.change < 0 ? (
                      <TrendingDown className="h-4 w-4 text-destructive" />
                    ) : null}
                    <span
                      className={cn(
                        "text-sm font-medium",
                        campaign.change > 0 && "text-success",
                        campaign.change < 0 && "text-destructive",
                        campaign.change === 0 && "text-muted-foreground"
                      )}
                    >
                      {campaign.change > 0 && "+"}
                      {campaign.change}%
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
