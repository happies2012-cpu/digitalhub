import { ReactNode } from "react";
import { DashboardSidebar } from "./DashboardSidebar";
import { DashboardHeader } from "./DashboardHeader";

interface DashboardLayoutProps {
  children: ReactNode;
}

import { OnboardingWizard } from "@/components/onboarding/OnboardingWizard";
import { ChatWidget } from "@/components/support/ChatWidget";

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar />
      <div className="pl-[240px] transition-all duration-200">
        <DashboardHeader />
        <main className="p-6">{children}</main>
      </div>
      <OnboardingWizard />
      <ChatWidget />
    </div>
  );
}
