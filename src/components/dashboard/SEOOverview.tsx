import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface SEOMetric {
  label: string;
  value: number;
  max: number;
  color: string;
}

const seoMetrics: SEOMetric[] = [
  { label: "Domain Authority", value: 68, max: 100, color: "bg-primary" },
  { label: "Page Speed Score", value: 85, max: 100, color: "bg-success" },
  { label: "Core Web Vitals", value: 72, max: 100, color: "bg-secondary" },
  { label: "Mobile Friendly", value: 95, max: 100, color: "bg-primary" },
];

const keywords = [
  { keyword: "digital marketing platform", position: 3, change: 2, volume: "12.5K" },
  { keyword: "seo management tool", position: 7, change: -1, volume: "8.2K" },
  { keyword: "social media scheduler", position: 12, change: 5, volume: "15.8K" },
  { keyword: "marketing automation", position: 5, change: 0, volume: "22.1K" },
];

export function SEOOverview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <Card variant="elevated">
        <CardHeader>
          <CardTitle>SEO Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Metrics */}
          <div className="space-y-4">
            {seoMetrics.map((metric, index) => (
              <div key={metric.label} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{metric.label}</span>
                  <span className="font-medium">{metric.value}/{metric.max}</span>
                </div>
                <Progress value={metric.value} className="h-2" />
              </div>
            ))}
          </div>

          {/* Keywords */}
          <div className="pt-4 border-t border-border">
            <h4 className="text-sm font-medium mb-4">Top Keywords</h4>
            <div className="space-y-3">
              {keywords.map((kw) => (
                <div
                  key={kw.keyword}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-muted-foreground truncate max-w-[180px]">
                    {kw.keyword}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground">{kw.volume}</span>
                    <span className="font-medium w-8 text-right">#{kw.position}</span>
                    <span
                      className={`text-xs w-8 text-right ${
                        kw.change > 0
                          ? "text-success"
                          : kw.change < 0
                          ? "text-destructive"
                          : "text-muted-foreground"
                      }`}
                    >
                      {kw.change > 0 && "+"}
                      {kw.change !== 0 ? kw.change : "-"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
