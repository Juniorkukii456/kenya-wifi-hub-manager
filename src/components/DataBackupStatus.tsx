import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Database, 
  Shield, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Download,
  Upload,
  HardDrive,
  Wifi
} from "lucide-react";

interface BackupEntry {
  id: string;
  name: string;
  size: string;
  date: string;
  type: "automatic" | "manual" | "pre-update";
  status: "completed" | "in-progress" | "failed";
  integrity: "verified" | "pending" | "failed";
}

export const DataBackupStatus = () => {
  const backups: BackupEntry[] = [
    {
      id: "1",
      name: "Pre-update backup v2.4.1",
      size: "127 MB",
      date: "2024-01-10 14:30",
      type: "pre-update",
      status: "completed",
      integrity: "verified"
    },
    {
      id: "2", 
      name: "Daily automatic backup",
      size: "124 MB",
      date: "2024-01-10 03:00",
      type: "automatic",
      status: "completed", 
      integrity: "verified"
    },
    {
      id: "3",
      name: "Manual backup - Config changes",
      size: "89 MB", 
      date: "2024-01-09 16:45",
      type: "manual",
      status: "completed",
      integrity: "verified"
    }
  ];

  const getStatusIcon = (status: BackupEntry["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "in-progress":
        return <Clock className="h-4 w-4 text-orange-500" />;
      case "failed":
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
    }
  };

  const getTypeColor = (type: BackupEntry["type"]) => {
    switch (type) {
      case "automatic":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "manual":
        return "bg-green-100 text-green-800 border-green-200";
      case "pre-update":
        return "bg-purple-100 text-purple-800 border-purple-200";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          Data Backup Status
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Backup Overview */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="space-y-1">
            <p className="text-muted-foreground">Last Backup</p>
            <p className="font-medium">2 hours ago</p>
          </div>
          <div className="space-y-1">
            <p className="text-muted-foreground">Total Size</p>
            <p className="font-medium">1.2 GB</p>
          </div>
          <div className="space-y-1">
            <p className="text-muted-foreground">Retention</p>
            <p className="font-medium">30 days</p>
          </div>
          <div className="space-y-1">
            <p className="text-muted-foreground">Auto Backup</p>
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              <span className="font-medium">Active</span>
            </div>
          </div>
        </div>

        {/* Storage Status */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Storage Used</span>
            <span className="font-medium">1.2GB / 5GB</span>
          </div>
          <Progress value={24} className="h-2" />
        </div>

        {/* Data Protection Status */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Data Protection</h4>
          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-3 w-3 text-green-500" />
              <span>User accounts & profiles</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-3 w-3 text-green-500" />
              <span>Usage statistics & analytics</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-3 w-3 text-green-500" />
              <span>Revenue & payment records</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-3 w-3 text-green-500" />
              <span>Network configuration</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-3 w-3 text-green-500" />
              <span>System settings</span>
            </div>
          </div>
        </div>

        {/* Recent Backups */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Recent Backups</h4>
          <div className="space-y-2">
            {backups.slice(0, 3).map((backup) => (
              <div key={backup.id} className="flex items-center justify-between p-2 border rounded text-xs">
                <div className="flex items-center gap-2">
                  {getStatusIcon(backup.status)}
                  <div>
                    <p className="font-medium">{backup.name}</p>
                    <p className="text-muted-foreground">{backup.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${getTypeColor(backup.type)}`}
                  >
                    {backup.type}
                  </Badge>
                  <p className="text-muted-foreground mt-1">{backup.size}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" size="sm" className="text-xs">
            <Upload className="h-3 w-3 mr-1" />
            Create Backup
          </Button>
          <Button variant="outline" size="sm" className="text-xs">
            <Download className="h-3 w-3 mr-1" />
            Restore Data
          </Button>
        </div>

        {/* Data Validation Status */}
        <div className="border rounded-lg p-3 bg-muted/30">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Data Integrity Check</span>
          </div>
          <div className="space-y-1 text-xs">
            <div className="flex items-center justify-between">
              <span>Last Validation:</span>
              <span className="text-green-600">2 hours ago ✓</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Records Verified:</span>
              <span>847,234 / 847,234</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Integrity Score:</span>
              <span className="text-green-600 font-medium">100%</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};