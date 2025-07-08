import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  Download, 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Database,
  GitBranch,
  Monitor,
  FileText,
  RefreshCw,
  Play,
  Pause,
  RotateCcw
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { VersionControl } from "./VersionControl";
import { DataBackupStatus } from "./DataBackupStatus";
import { UpdateProgress } from "./UpdateProgress";
import { SystemHealth } from "./SystemHealth";

interface UpdateStatus {
  id: string;
  version: string;
  status: "available" | "downloading" | "installing" | "completed" | "failed";
  progress: number;
  description: string;
  timestamp: string;
  critical: boolean;
}

export const SystemUpdate = () => {
  const { toast } = useToast();
  const [currentVersion] = useState("2.4.1");
  const [updateInProgress, setUpdateInProgress] = useState(false);
  const [selectedUpdate, setSelectedUpdate] = useState<UpdateStatus | null>(null);

  const availableUpdates: UpdateStatus[] = [
    {
      id: "1",
      version: "2.5.0",
      status: "available",
      progress: 0,
      description: "Enhanced M-PESA integration, improved user analytics dashboard, and performance optimizations",
      timestamp: "2024-01-15",
      critical: false
    },
    {
      id: "2", 
      version: "2.4.2",
      status: "available",
      progress: 0,
      description: "Critical security patch for WiFi authentication and data protection",
      timestamp: "2024-01-12",
      critical: true
    }
  ];

  const handleUpdateStart = (update: UpdateStatus) => {
    setSelectedUpdate(update);
    setUpdateInProgress(true);
    
    toast({
      title: "Update Initiated",
      description: `Starting update to version ${update.version}. System backup in progress...`,
    });
  };

  const handleRollback = () => {
    toast({
      title: "Rollback Initiated",
      description: "Rolling back to previous stable version. Data integrity preserved.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">System Update Management</h2>
          <p className="text-muted-foreground">
            Manage platform updates with zero data loss • Current version: {currentVersion}
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-primary/10">
            <Monitor className="h-3 w-3 mr-1" />
            Production Environment
          </Badge>
          <Button variant="outline" size="sm">
            <FileText className="h-4 w-4 mr-2" />
            Documentation
          </Button>
        </div>
      </div>

      {/* System Health Overview */}
      <SystemHealth />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Available Updates */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="h-5 w-5" />
                Available Updates
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {availableUpdates.map((update) => (
                <div key={update.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <h4 className="font-semibold">Version {update.version}</h4>
                      {update.critical && (
                        <Badge variant="destructive" className="text-xs">
                          <AlertTriangle className="h-3 w-3 mr-1" />
                          Critical
                        </Badge>
                      )}
                      <Badge variant="secondary" className="text-xs">
                        <Clock className="h-3 w-3 mr-1" />
                        {update.timestamp}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        disabled={updateInProgress}
                      >
                        <FileText className="h-4 w-4 mr-1" />
                        Preview
                      </Button>
                      <Button 
                        size="sm"
                        onClick={() => handleUpdateStart(update)}
                        disabled={updateInProgress}
                        className={update.critical ? "bg-destructive hover:bg-destructive/90" : ""}
                      >
                        <Play className="h-4 w-4 mr-1" />
                        Install
                      </Button>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground">
                    {update.description}
                  </p>
                  
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Shield className="h-3 w-3" />
                      Data integrity verified
                    </div>
                    <div className="flex items-center gap-1">
                      <Database className="h-3 w-3" />
                      Backup compatible
                    </div>
                    <div className="flex items-center gap-1">
                      <GitBranch className="h-3 w-3" />
                      Rollback ready
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Update Progress */}
          {updateInProgress && selectedUpdate && (
            <UpdateProgress 
              update={selectedUpdate}
              onComplete={() => setUpdateInProgress(false)}
              onError={() => setUpdateInProgress(false)}
            />
          )}

          {/* Version Control */}
          <VersionControl currentVersion={currentVersion} />
        </div>

        {/* Side Panel */}
        <div className="space-y-4">
          {/* Data Backup Status */}
          <DataBackupStatus />

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start"
                disabled={updateInProgress}
              >
                <Database className="h-4 w-4 mr-2" />
                Create Backup
              </Button>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start"
                onClick={handleRollback}
                disabled={updateInProgress}
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Rollback Version
              </Button>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start"
                disabled={updateInProgress}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Check Updates
              </Button>
            </CardContent>
          </Card>

          {/* Update History */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Recent Updates</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <div>
                  <p className="font-medium">v2.4.1</p>
                  <p className="text-xs text-muted-foreground">Jan 10, 2024</p>
                </div>
                <Badge variant="default" className="text-xs">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Active
                </Badge>
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between text-sm">
                <div>
                  <p className="font-medium">v2.4.0</p>
                  <p className="text-xs text-muted-foreground">Jan 5, 2024</p>
                </div>
                <Badge variant="secondary" className="text-xs">
                  Previous
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};