import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { PerformanceChart } from "@/components/dashboard/PerformanceChart";
import { CampaignsList } from "@/components/dashboard/CampaignsList";
import { SEOOverview } from "@/components/dashboard/SEOOverview";
import { SocialMediaQueue } from "@/components/dashboard/SocialMediaQueue";
import { DollarSign, Users, MousePointerClick, TrendingUp } from "lucide-react";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-1"
        >
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening with your campaigns.
          </p>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Total Revenue"
            value="$124,563"
            change={12.5}
            changeLabel="vs last month"
            icon={DollarSign}
            iconColor="text-success"
            delay={0}
          />
          <MetricCard
            title="Total Visitors"
            value="48,392"
            change={8.2}
            changeLabel="vs last month"
            icon={Users}
            iconColor="text-primary"
            delay={0.1}
          />
          <MetricCard
            title="Conversions"
            value="2,845"
            change={-2.4}
            changeLabel="vs last month"
            icon={MousePointerClick}
            iconColor="text-secondary"
            delay={0.2}
          />
          <MetricCard
            title="ROAS"
            value="4.2x"
            change={15.3}
            changeLabel="vs last month"
            icon={TrendingUp}
            iconColor="text-warning"
            delay={0.3}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Performance Chart - Takes 2 columns */}
          <div className="lg:col-span-2">
            <PerformanceChart />
          </div>

          {/* SEO Overview - Takes 1 column */}
          <div className="lg:col-span-1">
            <SEOOverview />
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid gap-6 lg:grid-cols-2">
          <CampaignsList />
          <SocialMediaQueue />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
