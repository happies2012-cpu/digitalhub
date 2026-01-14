import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { cn } from "@/lib/utils";

const socialPosts = [
  {
    id: "1",
    platform: "instagram",
    content: "New product launch coming soon! Stay tuned for exclusive...",
    engagement: { likes: 1245, comments: 89, shares: 34 },
    scheduledFor: "Today, 2:00 PM",
    status: "scheduled",
  },
  {
    id: "2",
    platform: "linkedin",
    content: "We're excited to announce our partnership with...",
    engagement: { likes: 567, comments: 45, shares: 123 },
    scheduledFor: "Today, 4:30 PM",
    status: "scheduled",
  },
  {
    id: "3",
    platform: "twitter",
    content: "5 tips for improving your marketing ROI this quarter...",
    engagement: { likes: 234, comments: 12, shares: 56 },
    scheduledFor: "Tomorrow, 9:00 AM",
    status: "draft",
  },
  {
    id: "4",
    platform: "facebook",
    content: "Customer success story: How Company X increased...",
    engagement: { likes: 890, comments: 67, shares: 89 },
    scheduledFor: "Tomorrow, 12:00 PM",
    status: "scheduled",
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

export function SocialMediaQueue() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <Card variant="elevated">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Upcoming Posts</CardTitle>
            <Badge variant="outline" className="text-xs">
              {socialPosts.length} scheduled
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {socialPosts.map((post, index) => {
              const Icon = platformIcons[post.platform as keyof typeof platformIcons];
              return (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                  className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer"
                >
                  <Avatar className="h-10 w-10">
                    <AvatarFallback
                      className={cn(
                        "text-foreground",
                        platformColors[post.platform as keyof typeof platformColors]
                      )}
                    >
                      <Icon className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground truncate">
                      {post.content}
                    </p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="text-xs text-muted-foreground">
                        {post.scheduledFor}
                      </span>
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
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
