import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Plus,
  Calendar,
  Heart,
  MessageCircle,
  Share2,
  MoreHorizontal,
  Image,
  Video,
  Link2,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";

const platforms = [
  { name: "Instagram", icon: Instagram, followers: "24.5K", growth: 5.2, color: "from-purple-500 to-pink-500" },
  { name: "LinkedIn", icon: Linkedin, followers: "12.8K", growth: 8.1, color: "from-sky-500 to-blue-600" },
  { name: "Twitter", icon: Twitter, followers: "8.2K", growth: -1.2, color: "from-foreground/80 to-foreground" },
  { name: "Facebook", icon: Facebook, followers: "45.1K", growth: 2.8, color: "from-blue-500 to-blue-700" },
];

const scheduledPosts = [
  {
    id: "1",
    platform: "instagram",
    content: "Exciting news! We're launching our new feature that will revolutionize how you manage...",
    media: "image",
    scheduledFor: "Today, 2:00 PM",
    engagement: { likes: 0, comments: 0, shares: 0 },
    status: "scheduled",
  },
  {
    id: "2",
    platform: "linkedin",
    content: "5 proven strategies to increase your marketing ROI in 2024. Thread 🧵",
    media: "carousel",
    scheduledFor: "Today, 4:30 PM",
    engagement: { likes: 0, comments: 0, shares: 0 },
    status: "scheduled",
  },
  {
    id: "3",
    platform: "twitter",
    content: "Just shipped a major update to our analytics dashboard. Check it out! 📊",
    media: "video",
    scheduledFor: "Tomorrow, 9:00 AM",
    engagement: { likes: 0, comments: 0, shares: 0 },
    status: "draft",
  },
  {
    id: "4",
    platform: "facebook",
    content: "Customer spotlight: How @CompanyX increased their conversion rate by 150%...",
    media: "link",
    scheduledFor: "Tomorrow, 12:00 PM",
    engagement: { likes: 0, comments: 0, shares: 0 },
    status: "scheduled",
  },
];

const recentPosts = [
  {
    id: "1",
    platform: "instagram",
    content: "Behind the scenes of our team building session! 🎉",
    postedAt: "2 hours ago",
    engagement: { likes: 342, comments: 28, shares: 12 },
  },
  {
    id: "2",
    platform: "linkedin",
    content: "We're hiring! Join our growing team of marketing professionals...",
    postedAt: "5 hours ago",
    engagement: { likes: 189, comments: 45, shares: 67 },
  },
  {
    id: "3",
    platform: "twitter",
    content: "Quick tip: Always A/B test your email subject lines. Small changes = big results!",
    postedAt: "1 day ago",
    engagement: { likes: 156, comments: 8, shares: 34 },
  },
];

const platformIcons = {
  facebook: Facebook,
  instagram: Instagram,
  linkedin: Linkedin,
  twitter: Twitter,
};

const platformColors = {
  facebook: "bg-blue-600",
  instagram: "bg-gradient-to-br from-purple-600 to-pink-500",
  linkedin: "bg-sky-600",
  twitter: "bg-foreground",
};

const mediaIcons = {
  image: Image,
  video: Video,
  carousel: Image,
  link: Link2,
};

const SocialMedia = () => {
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
            <h1 className="text-2xl font-bold">Social Media</h1>
            <p className="text-muted-foreground">
              Manage and schedule posts across all your social platforms.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="gap-2">
              <Calendar className="h-4 w-4" />
              Content Calendar
            </Button>
            <Button variant="gradient" className="gap-2">
              <Plus className="h-4 w-4" />
              Create Post
            </Button>
          </div>
        </motion.div>

        {/* Platform Overview */}
        <div className="grid gap-4 md:grid-cols-4">
          {platforms.map((platform, index) => {
            const Icon = platform.icon;
            return (
              <motion.div
                key={platform.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card variant="interactive">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div
                        className={cn(
                          "h-12 w-12 rounded-xl bg-gradient-to-br flex items-center justify-center",
                          platform.color
                        )}
                      >
                        <Icon className="h-6 w-6 text-foreground" />
                      </div>
                      <div
                        className={cn(
                          "flex items-center gap-1 text-sm font-medium",
                          platform.growth > 0 ? "text-success" : "text-destructive"
                        )}
                      >
                        <TrendingUp className={cn("h-4 w-4", platform.growth < 0 && "rotate-180")} />
                        {platform.growth > 0 && "+"}
                        {platform.growth}%
                      </div>
                    </div>
                    <div className="mt-4">
                      <p className="text-2xl font-bold">{platform.followers}</p>
                      <p className="text-sm text-muted-foreground">{platform.name} Followers</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Content Tabs */}
        <Tabs defaultValue="scheduled" className="space-y-6">
          <TabsList className="bg-muted/50">
            <TabsTrigger value="scheduled">Scheduled ({scheduledPosts.length})</TabsTrigger>
            <TabsTrigger value="recent">Recent Posts</TabsTrigger>
            <TabsTrigger value="drafts">Drafts</TabsTrigger>
          </TabsList>

          <TabsContent value="scheduled" className="space-y-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid gap-4 lg:grid-cols-2"
            >
              {scheduledPosts.map((post, index) => {
                const PlatformIcon = platformIcons[post.platform as keyof typeof platformIcons];
                const MediaIcon = mediaIcons[post.media as keyof typeof mediaIcons];
                return (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card variant="elevated" className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="p-5">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-10 w-10">
                                <AvatarFallback
                                  className={cn(platformColors[post.platform as keyof typeof platformColors])}
                                >
                                  <PlatformIcon className="h-5 w-5 text-foreground" />
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium capitalize">{post.platform}</p>
                                <p className="text-xs text-muted-foreground">{post.scheduledFor}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge
                                className={cn(
                                  "text-xs",
                                  post.status === "scheduled"
                                    ? "bg-success/10 text-success"
                                    : "bg-muted text-muted-foreground"
                                )}
                              >
                                {post.status}
                              </Badge>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          <p className="text-sm text-foreground mb-4">{post.content}</p>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <MediaIcon className="h-4 w-4" />
                            <span className="text-xs capitalize">{post.media}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          </TabsContent>

          <TabsContent value="recent" className="space-y-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid gap-4 lg:grid-cols-2">
              {recentPosts.map((post, index) => {
                const PlatformIcon = platformIcons[post.platform as keyof typeof platformIcons];
                return (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card variant="elevated">
                      <CardContent className="p-5">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarFallback
                                className={cn(platformColors[post.platform as keyof typeof platformColors])}
                              >
                                <PlatformIcon className="h-5 w-5 text-foreground" />
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium capitalize">{post.platform}</p>
                              <p className="text-xs text-muted-foreground">{post.postedAt}</p>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-foreground mb-4">{post.content}</p>
                        <div className="flex items-center gap-6 text-muted-foreground">
                          <div className="flex items-center gap-1.5">
                            <Heart className="h-4 w-4" />
                            <span className="text-sm">{post.engagement.likes}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <MessageCircle className="h-4 w-4" />
                            <span className="text-sm">{post.engagement.comments}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Share2 className="h-4 w-4" />
                            <span className="text-sm">{post.engagement.shares}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          </TabsContent>

          <TabsContent value="drafts">
            <Card variant="elevated">
              <CardContent className="p-12 text-center">
                <p className="text-muted-foreground">No drafts yet. Create your first post!</p>
                <Button variant="gradient" className="mt-4 gap-2">
                  <Plus className="h-4 w-4" />
                  Create Post
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default SocialMedia;
