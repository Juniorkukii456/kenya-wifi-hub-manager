import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Search, 
  Filter, 
  UserPlus, 
  Smartphone, 
  Laptop, 
  Tablet, 
  Wifi, 
  WifiOff,
  Ban,
  RotateCcw,
  DollarSign
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface User {
  id: string;
  name: string;
  phone: string;
  device: "mobile" | "laptop" | "tablet";
  status: "active" | "inactive" | "blocked";
  dataUsed: string;
  timeRemaining: string;
  plan: string;
  totalSpent: string;
  joinDate: string;
}

const allUsers: User[] = [
  {
    id: "1",
    name: "John Mwangi",
    phone: "+254712345678",
    device: "mobile",
    status: "active",
    dataUsed: "340 MB",
    timeRemaining: "4h 20m",
    plan: "Daily KES 200",
    totalSpent: "KES 4,200",
    joinDate: "2024-01-15"
  },
  {
    id: "2", 
    name: "Grace Wanjiku",
    phone: "+254798765432",
    device: "laptop",
    status: "active",
    dataUsed: "1.2 GB",
    timeRemaining: "2h 15m",
    plan: "Daily KES 200",
    totalSpent: "KES 8,400",
    joinDate: "2024-02-03"
  },
  {
    id: "3",
    name: "Peter Kiprotich",
    phone: "+254723456789",
    device: "tablet", 
    status: "inactive",
    dataUsed: "0 MB",
    timeRemaining: "Expired",
    plan: "Hourly KES 50",
    totalSpent: "KES 1,850",
    joinDate: "2024-01-28"
  },
  {
    id: "4",
    name: "Mary Akinyi",
    phone: "+254734567890",
    device: "mobile",
    status: "active",
    dataUsed: "890 MB",
    timeRemaining: "6h 45m",
    plan: "Daily KES 200",
    totalSpent: "KES 6,600",
    joinDate: "2024-02-10"
  },
  {
    id: "5",
    name: "David Ochieng",
    phone: "+254756789012",
    device: "laptop",
    status: "blocked",
    dataUsed: "0 MB",
    timeRemaining: "Blocked",
    plan: "Daily KES 200",
    totalSpent: "KES 2,400",
    joinDate: "2024-01-20"
  },
  {
    id: "6",
    name: "Sarah Njeri",
    phone: "+254767890123",
    device: "mobile",
    status: "active",
    dataUsed: "567 MB",
    timeRemaining: "3h 30m",
    plan: "Daily KES 200",
    totalSpent: "KES 5,200",
    joinDate: "2024-02-05"
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

export const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive" | "blocked">("all");
  const { toast } = useToast();

  const filteredUsers = allUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.phone.includes(searchTerm);
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleUserAction = (action: string, user: User) => {
    let newStatus = user.status;
    let actionDescription = "";

    switch (action) {
      case "block":
        newStatus = "blocked";
        actionDescription = `${user.name} has been blocked from the network.`;
        break;
      case "unblock":
        newStatus = "active";
        actionDescription = `${user.name} has been unblocked and can access the network.`;
        break;
      case "reset":
        actionDescription = `${user.name}'s session has been reset.`;
        break;
      case "extend":
        actionDescription = `${user.name}'s session has been extended by 2 hours.`;
        break;
      default:
        actionDescription = `Action ${action} performed on ${user.name}.`;
    }

    toast({
      title: "User Action",
      description: actionDescription,
    });
  };

  const getStatusBadge = (status: User["status"]) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="default" className="text-xs">
            <Wifi className="h-3 w-3 mr-1" />
            Online
          </Badge>
        );
      case "inactive":
        return (
          <Badge variant="secondary" className="text-xs">
            <WifiOff className="h-3 w-3 mr-1" />
            Offline
          </Badge>
        );
      case "blocked":
        return (
          <Badge variant="destructive" className="text-xs">
            <Ban className="h-3 w-3 mr-1" />
            Blocked
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-semibold">User Management</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Manage all users and their access to the WiFi network
            </p>
          </div>
          <Button 
            onClick={() => toast({
              title: "Add User",
              description: "New user registration form would open here.",
            })}
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Add User
          </Button>
        </div>
        
        {/* Search and Filter */}
        <div className="flex gap-4 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex gap-2">
            {["all", "active", "inactive", "blocked"].map((status) => (
              <Button
                key={status}
                variant={statusFilter === status ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter(status as any)}
              >
                <Filter className="h-4 w-4 mr-1" />
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {filteredUsers.map((user) => (
            <div key={user.id} className="flex items-center justify-between p-4 rounded-lg border bg-card hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {user.name.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium">{user.name}</p>
                    <DeviceIcon device={user.device} />
                    {getStatusBadge(user.status)}
                  </div>
                  
                  <p className="text-sm text-muted-foreground">{user.phone}</p>
                  
                  <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                    <span>Data: {user.dataUsed}</span>
                    <span>Time: {user.timeRemaining}</span>
                    <Badge variant="outline" className="text-xs">
                      {user.plan}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <DollarSign className="h-3 w-3" />
                      Total: {user.totalSpent}
                    </span>
                    <span>Joined: {new Date(user.joinDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2">
                {user.status === "blocked" ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleUserAction("unblock", user)}
                  >
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleUserAction("block", user)}
                  >
                    <Ban className="h-4 w-4" />
                  </Button>
                )}
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleUserAction("reset", user)}
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleUserAction("extend", user)}
                >
                  +2h
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        {filteredUsers.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No users found matching your criteria.
          </div>
        )}
      </CardContent>
    </Card>
  );
};