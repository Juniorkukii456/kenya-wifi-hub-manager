import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  GitBranch, 
  GitCommit, 
  Tag, 
  Calendar,
  User,
  FileText,
  Download,
  AlertCircle,
  CheckCircle
} from "lucide-react";

interface VersionControlProps {
  currentVersion: string;
}

interface VersionEntry {
  version: string;
  branch: string;
  commit: string;
  author: string;
  date: string;
  status: "stable" | "beta" | "deprecated" | "current";
  changes: string[];
  rollbackAvailable: boolean;
}

export const VersionControl = ({ currentVersion }: VersionControlProps) => {
  const versions: VersionEntry[] = [
    {
      version: "2.4.1",
      branch: "main",
      commit: "a7b8c9d",
      author: "Kenya WiFi Team",
      date: "2024-01-10",
      status: "current",
      changes: [
        "Enhanced M-PESA payment validation",
        "Improved network monitoring accuracy",
        "Fixed user session timeout issues"
      ],
      rollbackAvailable: true
    },
    {
      version: "2.4.0",
      branch: "main", 
      commit: "x1y2z3a",
      author: "Kenya WiFi Team",
      date: "2024-01-05",
      status: "stable",
      changes: [
        "New user analytics dashboard",
        "WiFi voucher system improvements",
        "Performance optimizations"
      ],
      rollbackAvailable: true
    },
    {
      version: "2.3.2",
      branch: "main",
      commit: "m4n5o6p", 
      author: "Kenya WiFi Team",
      date: "2023-12-28",
      status: "stable",
      changes: [
        "Security patches for authentication",
        "Database schema optimizations",
        "Bug fixes for revenue tracking"
      ],
      rollbackAvailable: true
    },
    {
      version: "2.3.0",
      branch: "main",
      commit: "q7r8s9t",
      author: "Kenya WiFi Team", 
      date: "2023-12-15",
      status: "deprecated",
      changes: [
        "Initial Kenya localization",
        "M-PESA integration",
        "WiFi hotspot management core"
      ],
      rollbackAvailable: false
    }
  ];

  const getStatusBadge = (status: VersionEntry["status"]) => {
    switch (status) {
      case "current":
        return (
          <Badge className="bg-primary">
            <CheckCircle className="h-3 w-3 mr-1" />
            Current
          </Badge>
        );
      case "stable":
        return (
          <Badge variant="secondary">
            <Tag className="h-3 w-3 mr-1" />
            Stable
          </Badge>
        );
      case "beta":
        return (
          <Badge variant="outline" className="border-orange-500 text-orange-500">
            <AlertCircle className="h-3 w-3 mr-1" />
            Beta
          </Badge>
        );
      case "deprecated":
        return (
          <Badge variant="destructive">
            <AlertCircle className="h-3 w-3 mr-1" />
            Deprecated
          </Badge>
        );
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <GitBranch className="h-5 w-5" />
          Version Control & Schema Management
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Track database schema versions and enable safe rollbacks
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {versions.map((version, index) => (
          <div key={version.version}>
            <div className="space-y-3">
              {/* Version Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <h4 className="font-semibold">v{version.version}</h4>
                  {getStatusBadge(version.status)}
                </div>
                
                <div className="flex items-center gap-2">
                  {version.rollbackAvailable && version.status !== "current" && (
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-1" />
                      Rollback
                    </Button>
                  )}
                  <Button variant="ghost" size="sm">
                    <FileText className="h-4 w-4 mr-1" />
                    Changelog
                  </Button>
                </div>
              </div>

              {/* Version Details */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <GitCommit className="h-4 w-4" />
                  <span>Commit: {version.commit}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <User className="h-4 w-4" />
                  <span>{version.author}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <GitBranch className="h-4 w-4" />
                  <span>Branch: {version.branch}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{version.date}</span>
                </div>
              </div>

              {/* Changes */}
              <div className="space-y-2">
                <p className="text-sm font-medium">Key Changes:</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {version.changes.map((change, changeIndex) => (
                    <li key={changeIndex} className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>{change}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Data Integrity Status */}
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1 text-green-600">
                  <CheckCircle className="h-3 w-3" />
                  <span>Schema validated</span>
                </div>
                <div className="flex items-center gap-1 text-green-600">
                  <CheckCircle className="h-3 w-3" />
                  <span>Data migration tested</span>
                </div>
                {version.rollbackAvailable && (
                  <div className="flex items-center gap-1 text-blue-600">
                    <Download className="h-3 w-3" />
                    <span>Rollback ready</span>
                  </div>
                )}
              </div>
            </div>
            
            {index < versions.length - 1 && <Separator className="mt-4" />}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};