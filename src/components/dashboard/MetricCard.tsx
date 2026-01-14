import { motion } from "framer-motion";
import { LucideIcon, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string;
  change: number;
  changeLabel: string;
  icon: LucideIcon;
  iconColor?: string;
  delay?: number;
}

export function MetricCard({
  title,
  value,
  change,
  changeLabel,
  icon: Icon,
  iconColor = "text-primary",
  delay = 0,
}: MetricCardProps) {
  const isPositive = change > 0;
  const isNeutral = change === 0;

  const TrendIcon = isNeutral ? Minus : isPositive ? TrendingUp : TrendingDown;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      <Card variant="metric" className="overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="space-y-3">
              <p className="text-sm font-medium text-muted-foreground">{title}</p>
              <p className="text-3xl font-bold tracking-tight">{value}</p>
              <div className="flex items-center gap-1.5">
                <span
                  className={cn(
                    "flex items-center gap-1 text-sm font-medium",
                    isNeutral && "text-muted-foreground",
                    isPositive && "text-success",
                    !isPositive && !isNeutral && "text-destructive"
                  )}
                >
                  <TrendIcon className="h-4 w-4" />
                  {isPositive && "+"}
                  {change}%
                </span>
                <span className="text-sm text-muted-foreground">{changeLabel}</span>
              </div>
            </div>
            <div
              className={cn(
                "flex h-12 w-12 items-center justify-center rounded-xl bg-muted",
                iconColor
              )}
            >
              <Icon className="h-6 w-6" />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
