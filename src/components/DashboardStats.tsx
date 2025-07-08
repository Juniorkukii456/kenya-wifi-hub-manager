import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wifi, Users, DollarSign, Activity, Clock, Smartphone } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  trend: "up" | "down" | "neutral";
}

const StatsCard = ({ title, value, change, icon, trend }: StatsCardProps) => (
  <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      <div className="text-primary">{icon}</div>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold text-foreground">{value}</div>
      <Badge 
        variant={trend === "up" ? "default" : trend === "down" ? "destructive" : "secondary"}
        className="mt-2 text-xs"
      >
        {change}
      </Badge>
    </CardContent>
  </Card>
);

export const DashboardStats = () => {
  const stats = [
    {
      title: "Active Users",
      value: "12",
      change: "+3 from yesterday",
      icon: <Users className="h-4 w-4" />,
      trend: "up" as const
    },
    {
      title: "Daily Revenue",
      value: "KES 2,400",
      change: "+15% from yesterday",
      icon: <DollarSign className="h-4 w-4" />,
      trend: "up" as const
    },
    {
      title: "Data Used",
      value: "8.5 GB",
      change: "Normal usage",
      icon: <Activity className="h-4 w-4" />,
      trend: "neutral" as const
    },
    {
      title: "Network Status",
      value: "Online",
      change: "99.8% uptime",
      icon: <Wifi className="h-4 w-4" />,
      trend: "up" as const
    },
    {
      title: "Avg. Session",
      value: "2.5 hrs",
      change: "+0.3 hrs from avg",
      icon: <Clock className="h-4 w-4" />,
      trend: "up" as const
    },
    {
      title: "Connected Devices",
      value: "18",
      change: "Peak: 22 devices",
      icon: <Smartphone className="h-4 w-4" />,
      trend: "neutral" as const
    }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat, index) => (
        <StatsCard key={index} {...stat} />
      ))}
    </div>
  );
};