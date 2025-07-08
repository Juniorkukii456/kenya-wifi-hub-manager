import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { CreditCard, UserPlus, Wifi, WifiOff, AlertCircle, CheckCircle } from "lucide-react";

interface Activity {
  id: string;
  type: "payment" | "login" | "logout" | "voucher" | "alert";
  user: string;
  description: string;
  amount?: string;
  timestamp: string;
  status: "success" | "failed" | "pending";
}

const mockActivities: Activity[] = [
  {
    id: "1",
    type: "payment",
    user: "John Mwangi",
    description: "M-PESA payment received",
    amount: "KES 200",
    timestamp: "2 minutes ago",
    status: "success"
  },
  {
    id: "2",
    type: "login",
    user: "Grace Wanjiku",
    description: "Connected to WiFi",
    timestamp: "5 minutes ago",
    status: "success"
  },
  {
    id: "3",
    type: "voucher",
    user: "Admin",
    description: "Generated 5 daily vouchers",
    timestamp: "10 minutes ago",
    status: "success"
  },
  {
    id: "4",
    type: "payment",
    user: "Peter Kiprotich",
    description: "Payment failed - insufficient balance",
    amount: "KES 50",
    timestamp: "15 minutes ago",
    status: "failed"
  },
  {
    id: "5",
    type: "logout",
    user: "Mary Akinyi",
    description: "Disconnected - session expired",
    timestamp: "18 minutes ago",
    status: "success"
  },
  {
    id: "6",
    type: "alert",
    user: "System",
    description: "High bandwidth usage detected",
    timestamp: "25 minutes ago",
    status: "pending"
  }
];

const ActivityIcon = ({ type, status }: { type: Activity["type"], status: Activity["status"] }) => {
  const getIcon = () => {
    switch (type) {
      case "payment":
        return <CreditCard className="h-4 w-4" />;
      case "login":
        return <Wifi className="h-4 w-4" />;
      case "logout":
        return <WifiOff className="h-4 w-4" />;
      case "voucher":
        return <UserPlus className="h-4 w-4" />;
      case "alert":
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <CheckCircle className="h-4 w-4" />;
    }
  };

  const getColor = () => {
    if (status === "failed") return "text-destructive";
    if (status === "pending") return "text-orange-500";
    if (type === "payment") return "text-primary";
    if (type === "login") return "text-green-500";
    return "text-muted-foreground";
  };

  return (
    <div className={`p-2 rounded-full bg-background ${getColor()}`}>
      {getIcon()}
    </div>
  );
};

export const RecentActivity = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Latest system events and user actions
          </p>
        </div>
        <Button variant="outline" size="sm">
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockActivities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg border bg-card hover:shadow-sm transition-shadow">
              <ActivityIcon type={activity.type} status={activity.status} />
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-sm">{activity.user}</p>
                  <span className="text-xs text-muted-foreground">{activity.timestamp}</span>
                </div>
                
                <p className="text-sm text-muted-foreground mt-1">{activity.description}</p>
                
                <div className="flex items-center justify-between mt-2">
                  {activity.amount && (
                    <Badge variant="outline" className="text-xs">
                      {activity.amount}
                    </Badge>
                  )}
                  
                  <Badge 
                    variant={
                      activity.status === "success" ? "default" : 
                      activity.status === "failed" ? "destructive" : 
                      "secondary"
                    }
                    className="text-xs ml-auto"
                  >
                    {activity.status === "success" && <CheckCircle className="h-3 w-3 mr-1" />}
                    {activity.status === "failed" && <AlertCircle className="h-3 w-3 mr-1" />}
                    {activity.status}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};