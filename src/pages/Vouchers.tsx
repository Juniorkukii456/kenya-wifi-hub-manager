import { VoucherManager } from "@/components/VoucherManager";

const Vouchers = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-6">
        <VoucherManager />
        
        {/* Footer */}
        <div className="flex items-center justify-between pt-6 mt-8 border-t">
          <p className="text-sm text-muted-foreground">
            Kenya WiFi Hub Manager • Voucher Management
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>🇰🇪 Made in Kenya</span>
            <span>•</span>
            <span>Digital solutions for everyone</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vouchers;