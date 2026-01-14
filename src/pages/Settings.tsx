import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { UserProfile } from "@clerk/clerk-react";
import { dark } from "@clerk/themes";
import { useTheme } from "@/contexts/ThemeContext";

const Settings = () => {
  const { theme } = useTheme();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-1"
        >
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences.
          </p>
        </motion.div>

        <div className="flex justify-center">
          <UserProfile
            appearance={{
              baseTheme: theme === 'dark' ? dark : undefined,
              elements: {
                rootBox: "w-full max-w-4xl",
                card: "bg-card shadow-none border border-border",
                navbar: "hidden md:flex",
                navbarMobileMenuButton: "md:hidden",
                headerTitle: "text-foreground",
                headerSubtitle: "text-muted-foreground",
                profileSectionTitleText: "text-foreground",
                userPreviewMainIdentifier: "text-foreground",
                userPreviewSecondaryIdentifier: "text-muted-foreground",
              }
            }}
            routing="hash"
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
