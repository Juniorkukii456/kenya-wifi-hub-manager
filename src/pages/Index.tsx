import { DashboardHeader } from "@/components/DashboardHeader";
import { DashboardStats } from "@/components/DashboardStats";
import { ActiveUsers } from "@/components/ActiveUsers";
import { RecentActivity } from "@/components/RecentActivity";
import { Navigation } from "@/components/Navigation";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Navigation />
      <div className="container mx-auto px-4 py-6 space-y-6 lg:pl-72">
        {/* Header */}
        <DashboardHeader />
        
        {/* Stats Overview */}
        <DashboardStats />
        
        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Active Users - Takes 2 columns */}
          <div className="lg:col-span-2">
            <ActiveUsers />
          </div>
          
          {/* Recent Activity - Takes 1 column */}
          <div className="lg:col-span-1">
            <RecentActivity />
          </div>
        </div>
        
        {/* Footer */}
        <div className="flex items-center justify-between pt-6 border-t">
          <p className="text-sm text-muted-foreground">
            Kenya WiFi Hub Manager • Built for Kenyan entrepreneurs
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>🇰🇪 Made in Kenya</span>
            <span>•</span>
            <span>Powered by M-PESA</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
