import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Home, 
  Users, 
  Settings, 
  CreditCard, 
  Activity,
  Menu,
  X,
  LogIn,
  Shield,
  User
} from "lucide-react";
import { useState } from "react";

const navigationItems = [
  { name: "Dashboard", path: "/", icon: Home },
  { name: "Dental Admin", path: "/dental-admin", icon: Shield },
  { name: "Patient Portal", path: "/dental-user", icon: User },
  { name: "Users", path: "/users", icon: Users },
  { name: "Vouchers", path: "/vouchers", icon: CreditCard },
  { name: "System", path: "/system", icon: Settings },
  { name: "Login", path: "/login", icon: LogIn },
];

export const Navigation = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className={`
        fixed top-0 left-0 h-full w-64 bg-background border-r border-border z-40
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:h-auto lg:w-auto lg:border-0 lg:bg-transparent
      `}>
        <div className="p-6 lg:p-0">
          {/* Logo */}
          <div className="mb-8 lg:mb-0 lg:hidden">
            <h1 className="text-xl font-bold text-primary">
              Kenya WiFi Hub
            </h1>
            <Badge variant="secondary" className="mt-1">
              Manager
            </Badge>
          </div>

          {/* Navigation Items */}
          <div className="space-y-2 lg:flex lg:space-y-0 lg:space-x-2">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`
                    flex items-center gap-3 px-3 py-2 rounded-lg transition-colors
                    ${isActive 
                      ? 'bg-primary text-primary-foreground' 
                      : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                    }
                  `}
                >
                  <Icon className="h-4 w-4" />
                  <span className="lg:hidden xl:inline">{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};