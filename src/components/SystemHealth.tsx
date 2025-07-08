import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Activity, 
  Database, 
  Server, 
  Wifi, 
  Shield, 
  Clock,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  HardDrive,
  Cpu,
  MemoryStick
} from "lucide-react";

interface HealthMetric {
  name: string;
  value: number;
  status: "healthy" | "warning" | "critical";
  unit: string;
  icon: React.ReactNode;
  description: string;
}

export const SystemHealth = () => {
  const healthMetrics: HealthMetric[] = [
    {
      name: "System Uptime",
      value: 99.9,
      status: "healthy",
      unit: "%",
      icon: <Clock className="h-4 w-4" />,
      description: "Network availability over last 30 days"
    },
    {
      name: "Database Performance", 
      value: 95,
      status: "healthy",
      unit: "%",
      icon: <Database className="h-4 w-4" />,
      description: "Query response time and data integrity"
    },
    {
      name: "API Response Time",
      value: 240,
      status: "healthy", 
      unit: "ms",
      icon: <Server className="h-4 w-4" />,
      description: "Average API endpoint response time"
    },
    {
      name: "Network Bandwidth",
      value: 78,
      status: "warning",
      unit: "%",
      icon: <Wifi className="h-4 w-4" />,
      description: "Current bandwidth utilization"
    },
    {
      name: "Security Score",
      value: 98,
      status: "healthy",
      unit: "%", 
      icon: <Shield className="h-4 w-4" />,
      description: "Overall security and compliance rating"
    },
    {
      name: "Data Integrity",
      value: 100,
      status: "healthy",
      unit: "%",
      icon: <CheckCircle className="h-4 w-4" />,
      description: "User data consistency and validation"
    }
  ];

  const systemResources = [
    {
      name: "CPU Usage",
      value: 45,
      icon: <Cpu className="h-4 w-4" />,
      color: "bg-blue-500"
    },
    {
      name: "Memory",
      value: 62,
      icon: <MemoryStick className="h-4 w-4" />,
      color: "bg-green-500"
    },
    {
      name: "Storage",
      value: 34,
      icon: <HardDrive className="h-4 w-4" />,
      color: "bg-purple-500"
    }
  ];

  const getStatusBadge = (status: HealthMetric["status"]) => {
    switch (status) {
      case "healthy":
        return (
          <Badge className="bg-green-100 text-green-800 border-green-200">
            <CheckCircle className="h-3 w-3 mr-1" />
            Healthy
          </Badge>
        );
      case "warning":
        return (
          <Badge className="bg-orange-100 text-orange-800 border-orange-200">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Warning
          </Badge>
        );
      case "critical":
        return (
          <Badge variant="destructive">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Critical
          </Badge>
        );
    }
  };

  const getStatusColor = (status: HealthMetric["status"]) => {
    switch (status) {
      case "healthy":
        return "text-green-600";
      case "warning":
        return "text-orange-600";
      case "critical":
        return "text-red-600";
    }
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {/* Overall System Status */}
      <Card className="md:col-span-2 lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            System Health Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {healthMetrics.map((metric) => (
              <div key={metric.name} className="flex items-center justify-between p-2 border rounded">
                <div className="flex items-center gap-3">
                  <div className={`p-1 rounded ${getStatusColor(metric.status)}`}>
                    {metric.icon}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{metric.name}</p>
                    <p className="text-xs text-muted-foreground">{metric.description}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className={`font-semibold ${getStatusColor(metric.status)}`}>
                    {metric.value}{metric.unit}
                  </span>
                  {getStatusBadge(metric.status)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Resource Usage */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Resource Usage
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {systemResources.map((resource) => (
            <div key={resource.name} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  {resource.icon}
                  <span>{resource.name}</span>
                </div>
                <span className="font-medium">{resource.value}%</span>
              </div>
              <Progress value={resource.value} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Update Readiness */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Update Readiness
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm">System Stability</span>
            <Badge className="bg-green-100 text-green-800">
              <CheckCircle className="h-3 w-3 mr-1" />
              Ready
            </Badge>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm">Backup Status</span>
            <Badge className="bg-green-100 text-green-800">
              <CheckCircle className="h-3 w-3 mr-1" />
              Current
            </Badge>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm">Resource Availability</span>
            <Badge className="bg-green-100 text-green-800">
              <CheckCircle className="h-3 w-3 mr-1" />
              Sufficient
            </Badge>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm">Network Connectivity</span>
            <Badge className="bg-green-100 text-green-800">
              <CheckCircle className="h-3 w-3 mr-1" />
              Stable
            </Badge>
          </div>

          <div className="pt-2 border-t">
            <div className="flex items-center gap-2 text-sm text-green-600">
              <CheckCircle className="h-4 w-4" />
              <span className="font-medium">System ready for updates</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              All pre-update checks passed successfully
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};