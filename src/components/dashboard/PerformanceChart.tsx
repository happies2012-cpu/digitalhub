import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

const data = [
  { name: "Jan", traffic: 4000, conversions: 240, revenue: 12400 },
  { name: "Feb", traffic: 3000, conversions: 198, revenue: 9800 },
  { name: "Mar", traffic: 5000, conversions: 320, revenue: 15800 },
  { name: "Apr", traffic: 4500, conversions: 280, revenue: 14200 },
  { name: "May", traffic: 6000, conversions: 450, revenue: 22400 },
  { name: "Jun", traffic: 5500, conversions: 380, revenue: 19600 },
  { name: "Jul", traffic: 7000, conversions: 520, revenue: 26800 },
];

export function PerformanceChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card variant="elevated" className="col-span-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Performance Overview</CardTitle>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-primary" />
                <span className="text-muted-foreground">Traffic</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-secondary" />
                <span className="text-muted-foreground">Conversions</span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorTraffic" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(190, 95%, 55%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(190, 95%, 55%)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorConversions" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(260, 80%, 60%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(260, 80%, 60%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 40%, 16%)" />
                <XAxis
                  dataKey="name"
                  stroke="hsl(215, 20%, 55%)"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="hsl(215, 20%, 55%)"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value / 1000}k`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(222, 47%, 8%)",
                    border: "1px solid hsl(222, 40%, 16%)",
                    borderRadius: "0.75rem",
                    color: "hsl(210, 40%, 98%)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="traffic"
                  stroke="hsl(190, 95%, 55%)"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorTraffic)"
                />
                <Area
                  type="monotone"
                  dataKey="conversions"
                  stroke="hsl(260, 80%, 60%)"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorConversions)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
