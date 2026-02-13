import { LogOut, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/AuthContext";

const roleLabels: Record<string, string> = {
  calling_agent: "Calling Agent",
  lead_taker: "Lead Taker",
  kam: "KAM",
  admin: "Admin",
};

export function TopBar() {
  const { user, userRole, signOut } = useAuth();

  return (
    <header className="h-14 border-b bg-card flex items-center gap-2 px-4 shrink-0">
      <SidebarTrigger className="-ml-1" />

      <div className="hidden md:flex items-center gap-2 ml-2">
        <span className="font-semibold text-sm text-primary">Premium HoReCa CRM</span>
      </div>

      <div className="flex-1 max-w-md mx-4 hidden md:block">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search prospects, leads, orders..." className="pl-9 h-9 text-sm" />
        </div>
      </div>

      <div className="flex items-center gap-1 ml-auto">
        <div className="hidden sm:flex items-center gap-2 ml-2 pl-2 border-l">
          <div className="text-right">
            <p className="text-xs font-medium truncate max-w-[120px]">{user?.email}</p>
            <Badge variant="outline" className="text-[10px] h-4 px-1">
              {userRole ? roleLabels[userRole] : "User"}
            </Badge>
          </div>
          <Button variant="ghost" size="icon" onClick={signOut} title="Sign Out">
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
