import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Download, 
  Database, 
  TestTube, 
  Rocket, 
  CheckCircle, 
  AlertTriangle,
  Pause,
  RotateCcw,
  Clock,
  Shield
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UpdateStep {
  id: string;
  name: string;
  description: string;
  status: "pending" | "running" | "completed" | "failed";
  duration?: string;
  icon: React.ReactNode;
}

interface UpdateProgressProps {
  update: {
    id: string;
    version: string;
    description: string;
  };
  onComplete: () => void;
  onError: () => void;
}

export const UpdateProgress = ({ update, onComplete, onError }: UpdateProgressProps) => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  const updateSteps: UpdateStep[] = [
    {
      id: "backup",
      name: "Data Backup",
      description: "Creating comprehensive backup of all user data, settings, and configurations",
      status: "pending",
      icon: <Database className="h-4 w-4" />
    },
    {
      id: "validation",
      name: "Pre-Update Validation", 
      description: "Validating data integrity and system compatibility",
      status: "pending",
      icon: <Shield className="h-4 w-4" />
    },
    {
      id: "download",
      name: "Download Update",
      description: "Downloading and verifying update package integrity",
      status: "pending", 
      icon: <Download className="h-4 w-4" />
    },
    {
      id: "staging",
      name: "Staging Environment Test",
      description: "Testing update in isolated staging environment",
      status: "pending",
      icon: <TestTube className="h-4 w-4" />
    },
    {
      id: "deployment",
      name: "Deploy Update",
      description: "Applying update to production with zero-downtime deployment",
      status: "pending",
      icon: <Rocket className="h-4 w-4" />
    },
    {
      id: "verification",
      name: "Post-Update Verification",
      description: "Verifying all systems operational and data integrity maintained",
      status: "pending",
      icon: <CheckCircle className="h-4 w-4" />
    }
  ];

  const [steps, setSteps] = useState(updateSteps);

  useEffect(() => {
    if (isPaused) return;

    const simulateUpdate = () => {
      const interval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + 2;
          
          // Update step status based on progress
          const stepProgress = Math.floor(newProgress / (100 / steps.length));
          
          setSteps(prevSteps => 
            prevSteps.map((step, index) => ({
              ...step,
              status: index < stepProgress ? "completed" : 
                     index === stepProgress ? "running" : "pending"
            }))
          );

          setCurrentStep(stepProgress);

          // Add logs
          if (newProgress % 20 === 0) {
            const logMessages = [
              `${new Date().toLocaleTimeString()} - Backup progress: ${Math.floor(newProgress)}%`,
              `${new Date().toLocaleTimeString()} - Data validation completed for user records`,
              `${new Date().toLocaleTimeString()} - Network configuration backup verified`,
              `${new Date().toLocaleTimeString()} - Revenue data integrity confirmed`,
              `${new Date().toLocaleTimeString()} - System settings backup completed`
            ];
            
            setLogs(prev => [...prev, logMessages[Math.floor(Math.random() * logMessages.length)]]);
          }

          if (newProgress >= 100) {
            clearInterval(interval);
            onComplete();
            toast({
              title: "Update Completed Successfully",
              description: `Version ${update.version} has been installed. All data preserved.`,
            });
            return 100;
          }

          return newProgress;
        });
      }, 300);

      return () => clearInterval(interval);
    };

    const cleanup = simulateUpdate();
    return cleanup;
  }, [isPaused, update.version, onComplete, toast, steps.length]);

  const handlePause = () => {
    setIsPaused(!isPaused);
    toast({
      title: isPaused ? "Update Resumed" : "Update Paused",
      description: isPaused ? "Update process has been resumed" : "Update process has been paused safely",
    });
  };

  const handleAbort = () => {
    onError();
    toast({
      title: "Update Aborted",
      description: "Update has been safely aborted. System restored to previous state.",
      variant: "destructive"
    });
  };

  return (
    <Card className="border-primary/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Rocket className="h-5 w-5" />
              Installing Update v{update.version}
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Zero-downtime deployment with full data protection
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handlePause}
            >
              {isPaused ? (
                <>
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Resume
                </>
              ) : (
                <>
                  <Pause className="h-4 w-4 mr-1" />
                  Pause
                </>
              )}
            </Button>
            
            <Button 
              variant="destructive" 
              size="sm"
              onClick={handleAbort}
            >
              <RotateCcw className="h-4 w-4 mr-1" />
              Abort
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Overall Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Overall Progress</span>
            <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-3" />
          {isPaused && (
            <div className="flex items-center gap-2 text-sm text-orange-600">
              <Clock className="h-4 w-4" />
              <span>Update paused - safe to resume anytime</span>
            </div>
          )}
        </div>

        {/* Step Progress */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium">Update Steps</h4>
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center gap-3 p-3 border rounded-lg">
              <div className={`p-2 rounded-full ${
                step.status === "completed" ? "bg-green-100 text-green-600" :
                step.status === "running" ? "bg-blue-100 text-blue-600" :
                step.status === "failed" ? "bg-red-100 text-red-600" :
                "bg-muted text-muted-foreground"
              }`}>
                {step.icon}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-sm">{step.name}</p>
                  <Badge 
                    variant={
                      step.status === "completed" ? "default" :
                      step.status === "running" ? "secondary" :
                      step.status === "failed" ? "destructive" :
                      "outline"
                    }
                    className="text-xs"
                  >
                    {step.status === "running" && "In Progress"}
                    {step.status === "completed" && "Completed"}
                    {step.status === "failed" && "Failed"}
                    {step.status === "pending" && "Pending"}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{step.description}</p>
              </div>
              
              {step.status === "completed" && (
                <CheckCircle className="h-4 w-4 text-green-500" />
              )}
            </div>
          ))}
        </div>

        {/* Live Logs */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Live Update Logs</h4>
          <div className="bg-muted/30 rounded-lg p-3 h-32 overflow-y-auto text-xs font-mono">
            {logs.length === 0 && (
              <p className="text-muted-foreground">Update logs will appear here...</p>
            )}
            {logs.map((log, index) => (
              <div key={index} className="mb-1">
                {log}
              </div>
            ))}
          </div>
        </div>

        {/* Safety Information */}
        <div className="border rounded-lg p-3 bg-muted/30">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="h-4 w-4 text-green-600" />
            <span className="text-sm font-medium text-green-600">Data Safety Guaranteed</span>
          </div>
          <div className="text-xs text-muted-foreground space-y-1">
            <p>• All user data backed up before update begins</p>
            <p>• Zero-downtime deployment ensures continuous service</p>
            <p>• Automatic rollback available if issues detected</p>
            <p>• Real-time monitoring of data integrity throughout process</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};