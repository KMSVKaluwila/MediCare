import { Link, useLocation } from "react-router-dom";
import { Activity, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Patient Registration", path: "/patient-registration" },
  { name: "Doctor Registration", path: "/doctor-registration" },
  { name: "Book Appointment", path: "/book-appointment" },
  { name: "Manage Appointments", path: "/manage-appointments" },
  { name: "Feedback", path: "/feedback" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
        <div className="container flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2">
            <Activity className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-primary">MediCare</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path}>
                <Button
                  variant={location.pathname === item.path ? "default" : "ghost"}
                  size="sm"
                  className="text-sm"
                >
                  {item.name}
                </Button>
              </Link>
            ))}
          </nav>

          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <nav className="flex flex-col gap-2 mt-8">
                {navItems.map((item) => (
                  <Link key={item.path} to={item.path}>
                    <Button
                      variant={location.pathname === item.path ? "default" : "ghost"}
                      className="w-full justify-start"
                    >
                      {item.name}
                    </Button>
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <main className="container px-4 py-8">{children}</main>

      <footer className="mt-auto border-t bg-card">
        <div className="container px-4 py-6 text-center text-sm text-muted-foreground">
          <p>© 2025 MediCare Appointment System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
