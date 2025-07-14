import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Settings, Plus, RefreshCw, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

export const DashboardHeader = () => {
  const { toast } = useToast();

  const handleQuickAction = (action: string) => {
    switch (action) {
      case "System refresh":
        window.location.reload();
        break;
      case "New voucher creation":
        // Navigate to vouchers page
        window.location.href = "/vouchers";
        break;
      case "Notifications":
        toast({
          title: "Notifications",
          description: "You have 3 new notifications: 2 new user registrations, 1 payment received.",
        });
        break;
      default:
        toast({
          title: `${action} initiated`,
          description: `${action} process has been started successfully.`,
        });
    }
  };

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            WiFi Hub Manager
          </h1>
          <Badge variant="default" className="bg-primary">
            <Shield className="h-3 w-3 mr-1" />
            Kenya Edition
          </Badge>
        </div>
        <p className="text-muted-foreground">
          Manage your home WiFi hotspot • Serving communities across Kenya
        </p>
      </div>
      
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => handleQuickAction("System refresh")}
        >
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
        
        <Button 
          variant="gradient" 
          size="sm"
          onClick={() => handleQuickAction("New voucher creation")}
        >
          <Plus className="h-4 w-4" />
          New Voucher
        </Button>
        
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => handleQuickAction("Notifications")}
        >
          <Bell className="h-4 w-4" />
          <Badge variant="destructive" className="ml-1 px-1 py-0 text-xs">3</Badge>
        </Button>
        
        <Link to="/system">
          <Button variant="ghost" size="sm">
            <Settings className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
};