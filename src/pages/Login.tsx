import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Wifi, 
  Lock, 
  User, 
  Phone, 
  CreditCard,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userForm, setUserForm] = useState({
    phone: "",
    voucher: ""
  });
  const [adminForm, setAdminForm] = useState({
    email: "",
    password: ""
  });
  const { toast } = useToast();

  const handleUserLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (userForm.phone && userForm.voucher) {
        toast({
          title: "WiFi Access Granted",
          description: `Welcome! Your voucher ${userForm.voucher} has been activated.`,
        });
        // In a real app, you'd redirect or grant network access
      } else {
        toast({
          title: "Login Failed",
          description: "Please enter both phone number and voucher code.",
          variant: "destructive"
        });
      }
      setIsLoading(false);
    }, 2000);
  };

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (adminForm.email === "admin@kenyawifi.com" && adminForm.password === "admin123") {
        toast({
          title: "Admin Access Granted",
          description: "Welcome to the admin dashboard!",
        });
        // In a real app, you'd redirect to the dashboard
        window.location.href = "/";
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid email or password.",
          variant: "destructive"
        });
      }
      setIsLoading(false);
    }, 1500);
  };

  const quickConnect = (plan: string, price: string) => {
    toast({
      title: "Quick Connect",
      description: `Redirecting to M-PESA payment for ${plan} (${price})...`,
    });
    // In a real app, this would integrate with M-PESA API
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <Wifi className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold">Kenya WiFi Hub</h1>
          </div>
          <p className="text-muted-foreground">Fast, reliable internet for everyone</p>
          <Badge variant="default" className="bg-primary">
            🇰🇪 Made in Kenya
          </Badge>
        </div>

        {/* Quick Connect Options */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Quick Connect
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              className="w-full justify-between"
              onClick={() => quickConnect("1 Hour Access", "KES 50")}
            >
              <span>1 Hour - KES 50</span>
              <span className="text-xs">via M-PESA</span>
            </Button>
            <Button 
              className="w-full justify-between"
              onClick={() => quickConnect("Daily Access", "KES 200")}
            >
              <span>24 Hours - KES 200</span>
              <span className="text-xs">via M-PESA</span>
            </Button>
            <Button 
              className="w-full justify-between"
              onClick={() => quickConnect("Weekly Access", "KES 1000")}
            >
              <span>7 Days - KES 1,000</span>
              <span className="text-xs">via M-PESA</span>
            </Button>
          </CardContent>
        </Card>

        {/* Login Tabs */}
        <Card>
          <CardContent className="p-0">
            <Tabs defaultValue="user" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="user">User Login</TabsTrigger>
                <TabsTrigger value="admin">Admin Login</TabsTrigger>
              </TabsList>
              
              <TabsContent value="user" className="p-6 space-y-4">
                <div className="text-center space-y-2">
                  <User className="h-8 w-8 text-primary mx-auto" />
                  <h3 className="text-lg font-semibold">Already have a voucher?</h3>
                  <p className="text-sm text-muted-foreground">Enter your details to connect</p>
                </div>
                
                <form onSubmit={handleUserLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+254712345678"
                        value={userForm.phone}
                        onChange={(e) => setUserForm({ ...userForm, phone: e.target.value })}
                        className="pl-9"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="voucher">Voucher Code</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="voucher"
                        type="text"
                        placeholder="KE8X9K2L"
                        value={userForm.voucher}
                        onChange={(e) => setUserForm({ ...userForm, voucher: e.target.value })}
                        className="pl-9 font-mono"
                      />
                    </div>
                  </div>
                  
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Connecting..." : "Connect to WiFi"}
                  </Button>
                </form>
                
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">
                    Need help? Call +254700123456
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="admin" className="p-6 space-y-4">
                <div className="text-center space-y-2">
                  <Lock className="h-8 w-8 text-primary mx-auto" />
                  <h3 className="text-lg font-semibold">Admin Dashboard</h3>
                  <p className="text-sm text-muted-foreground">Manage your WiFi business</p>
                </div>
                
                <form onSubmit={handleAdminLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="admin@kenyawifi.com"
                      value={adminForm.email}
                      onChange={(e) => setAdminForm({ ...adminForm, email: e.target.value })}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={adminForm.password}
                      onChange={(e) => setAdminForm({ ...adminForm, password: e.target.value })}
                    />
                  </div>
                  
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                </form>
                
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">
                    Demo: admin@kenyawifi.com / admin123
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Network Status */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">Network Status</span>
              </div>
              <Badge variant="default" className="bg-green-500">
                Online • 99.8% uptime
              </Badge>
            </div>
            <div className="mt-2 text-xs text-muted-foreground">
              Speed: 50 Mbps • Connected Users: 12/50
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};