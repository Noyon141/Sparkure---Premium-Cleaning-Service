"use client";

import { AnimatedButton } from "@/components/ui/animated-button";
import { AnimatedWrapper } from "@/components/ui/animated-wrapper";
import { authService } from "@/lib/auth-service";
import { useAuth } from "@/lib/hooks/use-auth";
import Link from "next/link";
import { toast } from "sonner";

const items = [
  {
    label: "Services",
    href: "/services",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

export function Header() {
  const { user, isAuthenticated, logout, isLoading } = useAuth();

  const handleSignOut = async () => {
    try {
      await authService.signOut();
      logout();
      toast.success("Signed out successfully");
      // RouteGuard will handle the redirect to home page
    } catch (error) {
      console.error("Sign out error:", error);
      toast.error("Failed to sign out");
    }
  };

  const getDashboardLink = () => {
    if (!user) return "/dashboard";
    switch (user.role) {
      case "ADMIN":
        return "/admin";
      case "EMPLOYEE":
        return "/employee";
      default:
        return "/dashboard";
    }
  };

  return (
    <header className="border-b border-primary/10">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <AnimatedWrapper animation="fade">
            <Link href="/" className="text-2xl font-bold text-primary">
              Sparkure
            </Link>
          </AnimatedWrapper>

          <div className="hidden md:flex items-center space-x-6">
            {items.map((item) => (
              <AnimatedWrapper
                key={item.href}
                animation="slide"
                className="transition-colors"
              >
                <Link
                  href={item.href}
                  className="text-neutral hover:text-primary"
                >
                  {item.label}
                </Link>
              </AnimatedWrapper>
            ))}

            {!isLoading && (
              <>
                {isAuthenticated ? (
                  <div className="flex items-center space-x-4">
                    <AnimatedWrapper animation="slide">
                      <span className="text-neutral">
                        Welcome, {user?.fullName}
                      </span>
                    </AnimatedWrapper>
                    <AnimatedWrapper animation="slide">
                      <Link href={getDashboardLink()}>
                        <AnimatedButton
                          variant="outline"
                          className="border-primary/20 hover:border-primary/40"
                        >
                          Dashboard
                        </AnimatedButton>
                      </Link>
                    </AnimatedWrapper>
                    <AnimatedWrapper animation="slide">
                      <AnimatedButton
                        variant="outline"
                        onClick={handleSignOut}
                        className="border-primary/20 hover:border-primary/40"
                      >
                        Sign out
                      </AnimatedButton>
                    </AnimatedWrapper>
                  </div>
                ) : (
                  <>
                    <AnimatedWrapper animation="slide">
                      <Link href="/sign-in">
                        <AnimatedButton
                          variant="outline"
                          className="border-primary/20 hover:border-primary/40"
                        >
                          Sign in
                        </AnimatedButton>
                      </Link>
                    </AnimatedWrapper>
                    <AnimatedWrapper animation="slide">
                      <Link href="/sign-up">
                        <AnimatedButton className="bg-primary hover:bg-primary/90">
                          Sign up
                        </AnimatedButton>
                      </Link>
                    </AnimatedWrapper>
                    <div className="flex items-center space-x-2">
                      <AnimatedWrapper animation="slide">
                        <Link href="/employee/sign-in">
                          <AnimatedButton
                            variant="outline"
                            size="sm"
                            className="border-blue-500/20 hover:border-blue-500/40 text-blue-500"
                          >
                            Employee
                          </AnimatedButton>
                        </Link>
                      </AnimatedWrapper>
                      <AnimatedWrapper animation="slide">
                        <Link href="/admin/sign-in">
                          <AnimatedButton
                            variant="outline"
                            size="sm"
                            className="border-red-500/20 hover:border-red-500/40 text-red-500"
                          >
                            Admin
                          </AnimatedButton>
                        </Link>
                      </AnimatedWrapper>
                    </div>
                  </>
                )}
              </>
            )}
          </div>

          {/* Mobile menu button - you can implement mobile menu later */}
          <div className="md:hidden">
            <AnimatedButton
              variant="ghost"
              size="icon"
              className="text-neutral hover:text-primary"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            </AnimatedButton>
          </div>
        </nav>
      </div>
    </header>
  );
}
