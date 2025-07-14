import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MoreHorizontal, Smartphone, Laptop, Tablet, Wifi, WifiOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface User {
  id: string;
  name: string;
  phone: string;
  device: "mobile" | "laptop" | "tablet";
  status: "active" | "inactive";
  dataUsed: string;
  timeRemaining: string;
  plan: string;
}

const mockUsers: User[] = [
  {
    id: "1",
    name: "John Mwangi",
    phone: "+254712345678",
    device: "mobile",
    status: "active",
    dataUsed: "340 MB",
    timeRemaining: "4h 20m",
    plan: "Daily KES 200"
  },
  {
    id: "2", 
    name: "Grace Wanjiku",
    phone: "+254798765432",
    device: "laptop",
    status: "active",
    dataUsed: "1.2 GB",
    timeRemaining: "2h 15m",
    plan: "Daily KES 200"
  },
  {
    id: "3",
    name: "Peter Kiprotich",
    phone: "+254723456789",
    device: "tablet", 
    status: "inactive",
    dataUsed: "0 MB",
    timeRemaining: "Expired",
    plan: "Hourly KES 50"
  },
  {
    id: "4",
    name: "Mary Akinyi",
    phone: "+254734567890",
    device: "mobile",
    status: "active",
    dataUsed: "890 MB",
    timeRemaining: "6h 45m",
    plan: "Daily KES 200"
  }
];

const DeviceIcon = ({ device }: { device: User["device"] }) => {
  switch (device) {
    case "mobile":
      return <Smartphone className="h-4 w-4" />;
    case "laptop":
      return <Laptop className="h-4 w-4" />;
    case "tablet":
      return <Tablet className="h-4 w-4" />;
    default:
      return <Smartphone className="h-4 w-4" />;
  }
};

export const ActiveUsers = () => {
  const { toast } = useToast();

  const handleUserAction = (action: string, userName: string) => {
    toast({
      title: `User ${action}`,
      description: `${userName} has been ${action.toLowerCase()}.`,
    });
  };

  return (
    <Card className="col-span-2">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg font-semibold">Active Users</CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            {mockUsers.filter(u => u.status === "active").length} of {mockUsers.length} users online
          </p>
        </div>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => toast({
            title: "All Users",
            description: `Viewing all ${mockUsers.length} registered users.`,
          })}
        >
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockUsers.map((user) => (
            <div key={user.id} className="flex items-center justify-between p-3 rounded-lg border bg-card hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {user.name.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-sm">{user.name}</p>
                    <DeviceIcon device={user.device} />
                    <Badge 
                      variant={user.status === "active" ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {user.status === "active" ? (
                        <>
                          <Wifi className="h-3 w-3 mr-1" />
                          Online
                        </>
                      ) : (
                        <>
                          <WifiOff className="h-3 w-3 mr-1" />
                          Offline
                        </>
                      )}
                    </Badge>
                  </div>
                  
                  <p className="text-xs text-muted-foreground">{user.phone}</p>
                  
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-muted-foreground">
                      Data: {user.dataUsed}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Time: {user.timeRemaining}
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {user.plan}
                    </Badge>
                  </div>
                </div>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleUserAction("refreshed", user.name)}
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};