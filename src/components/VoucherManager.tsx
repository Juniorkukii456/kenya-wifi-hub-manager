import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Plus, 
  Download, 
  Eye, 
  Copy, 
  Trash2,
  Calendar,
  Clock,
  DollarSign,
  Users
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Voucher {
  id: string;
  code: string;
  plan: string;
  price: string;
  duration: string;
  status: "active" | "used" | "expired";
  createdDate: string;
  usedDate?: string;
  usedBy?: string;
}

const mockVouchers: Voucher[] = [
  {
    id: "1",
    code: "KE8X9K2L",
    plan: "Daily Access",
    price: "KES 200",
    duration: "24 hours",
    status: "used",
    createdDate: "2024-01-15",
    usedDate: "2024-01-15",
    usedBy: "John Mwangi"
  },
  {
    id: "2",
    code: "KE5M3N7P",
    plan: "Hourly Access",
    price: "KES 50",
    duration: "1 hour",
    status: "active",
    createdDate: "2024-01-16"
  },
  {
    id: "3",
    code: "KE1Q4R8T",
    plan: "Weekly Access",
    price: "KES 1000",
    duration: "7 days",
    status: "expired",
    createdDate: "2024-01-10"
  },
  {
    id: "4",
    code: "KE9Y6U2I",
    plan: "Daily Access",
    price: "KES 200",
    duration: "24 hours",
    status: "active",
    createdDate: "2024-01-16"
  }
];

const plans = [
  { id: "hourly", name: "Hourly Access", price: "KES 50", duration: "1 hour" },
  { id: "daily", name: "Daily Access", price: "KES 200", duration: "24 hours" },
  { id: "weekly", name: "Weekly Access", price: "KES 1000", duration: "7 days" },
  { id: "monthly", name: "Monthly Access", price: "KES 3500", duration: "30 days" }
];

export const VoucherManager = () => {
  const [selectedPlan, setSelectedPlan] = useState(plans[0]);
  const [quantity, setQuantity] = useState(1);
  const [vouchers, setVouchers] = useState<Voucher[]>(mockVouchers);
  const { toast } = useToast();

  const generateVouchers = () => {
    const newVouchers: Voucher[] = [];
    
    for (let i = 0; i < quantity; i++) {
      const voucherCode = `KE${Math.random().toString(36).substr(2, 8).toUpperCase()}`;
      newVouchers.push({
        id: `new-${Date.now()}-${i}`,
        code: voucherCode,
        plan: selectedPlan.name,
        price: selectedPlan.price,
        duration: selectedPlan.duration,
        status: "active",
        createdDate: new Date().toISOString().split('T')[0]
      });
    }

    setVouchers([...newVouchers, ...vouchers]);
    
    toast({
      title: "Vouchers Generated",
      description: `Successfully generated ${quantity} ${selectedPlan.name} voucher${quantity > 1 ? 's' : ''}.`,
    });
  };

  const copyVoucher = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Voucher Copied",
      description: `Voucher code ${code} copied to clipboard.`,
    });
  };

  const deleteVoucher = (id: string) => {
    setVouchers(vouchers.filter(v => v.id !== id));
    toast({
      title: "Voucher Deleted",
      description: "Voucher has been permanently deleted.",
    });
  };

  const exportVouchers = () => {
    const activeVouchers = vouchers.filter(v => v.status === "active");
    const csvContent = "Voucher Code,Plan,Price,Duration,Created Date\n" +
      activeVouchers.map(v => `${v.code},${v.plan},${v.price},${v.duration},${v.createdDate}`).join("\n");
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'wifi-vouchers.csv';
    a.click();
    
    toast({
      title: "Export Complete",
      description: `Exported ${activeVouchers.length} active vouchers to CSV.`,
    });
  };

  const getStatusBadge = (status: Voucher["status"]) => {
    switch (status) {
      case "active":
        return <Badge variant="default">Active</Badge>;
      case "used":
        return <Badge variant="secondary">Used</Badge>;
      case "expired":
        return <Badge variant="destructive">Expired</Badge>;
      default:
        return null;
    }
  };

  const stats = {
    total: vouchers.length,
    active: vouchers.filter(v => v.status === "active").length,
    used: vouchers.filter(v => v.status === "used").length,
    expired: vouchers.filter(v => v.status === "expired").length,
    revenue: vouchers
      .filter(v => v.status === "used")
      .reduce((sum, v) => sum + parseInt(v.price.replace(/[^\d]/g, '')), 0)
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Total Vouchers</p>
                <p className="text-xl font-bold">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Active</p>
                <p className="text-xl font-bold text-green-500">{stats.active}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Used</p>
                <p className="text-xl font-bold text-blue-500">{stats.used}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-red-500" />
              <div>
                <p className="text-sm text-muted-foreground">Expired</p>
                <p className="text-xl font-bold text-red-500">{stats.expired}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Revenue</p>
                <p className="text-xl font-bold">KES {stats.revenue.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="generate" className="space-y-4">
        <TabsList>
          <TabsTrigger value="generate">Generate Vouchers</TabsTrigger>
          <TabsTrigger value="manage">Manage Vouchers</TabsTrigger>
        </TabsList>

        <TabsContent value="generate">
          <Card>
            <CardHeader>
              <CardTitle>Generate New Vouchers</CardTitle>
              <p className="text-sm text-muted-foreground">
                Create new WiFi access vouchers for your customers
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <label className="text-sm font-medium mb-2 block">Select Plan</label>
                  <Select value={selectedPlan.id} onValueChange={(value) => {
                    const plan = plans.find(p => p.id === value);
                    if (plan) setSelectedPlan(plan);
                  }}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {plans.map((plan) => (
                        <SelectItem key={plan.id} value={plan.id}>
                          {plan.name} - {plan.price}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Quantity</label>
                  <Input
                    type="number"
                    min="1"
                    max="100"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  />
                </div>
                
                <div className="flex items-end">
                  <Button onClick={generateVouchers} className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Generate Vouchers
                  </Button>
                </div>
              </div>
              
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-medium mb-2">Preview:</h4>
                <p className="text-sm text-muted-foreground">
                  Plan: <span className="font-medium">{selectedPlan.name}</span> | 
                  Price: <span className="font-medium">{selectedPlan.price}</span> | 
                  Duration: <span className="font-medium">{selectedPlan.duration}</span> | 
                  Quantity: <span className="font-medium">{quantity}</span>
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="manage">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Manage Vouchers</CardTitle>
                <p className="text-sm text-muted-foreground">
                  View and manage all generated vouchers
                </p>
              </div>
              <Button onClick={exportVouchers} variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {vouchers.map((voucher) => (
                  <div key={voucher.id} className="flex items-center justify-between p-4 rounded-lg border bg-card">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-mono font-bold text-lg">{voucher.code}</span>
                        {getStatusBadge(voucher.status)}
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                        <div>
                          <span className="font-medium">Plan:</span> {voucher.plan}
                        </div>
                        <div>
                          <span className="font-medium">Price:</span> {voucher.price}
                        </div>
                        <div>
                          <span className="font-medium">Duration:</span> {voucher.duration}
                        </div>
                        <div>
                          <span className="font-medium">Created:</span> {voucher.createdDate}
                        </div>
                      </div>
                      
                      {voucher.usedBy && (
                        <div className="mt-2 text-sm text-muted-foreground">
                          <span className="font-medium">Used by:</span> {voucher.usedBy} on {voucher.usedDate}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyVoucher(voucher.code)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteVoucher(voucher.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};