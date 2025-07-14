import { UserManagement } from "@/components/UserManagement";

const Users = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-6">
        <UserManagement />
        
        {/* Footer */}
        <div className="flex items-center justify-between pt-6 mt-8 border-t">
          <p className="text-sm text-muted-foreground">
            Kenya WiFi Hub Manager • User Management
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>🇰🇪 Made in Kenya</span>
            <span>•</span>
            <span>Empowering digital access</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;