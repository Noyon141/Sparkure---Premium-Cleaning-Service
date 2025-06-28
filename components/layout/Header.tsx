"use client";

import { AnimatedButton } from "@/components/ui/animated-button";
import { AnimatedWrapper } from "@/components/ui/animated-wrapper";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { authService } from "@/lib/auth-service";
import { useAuth } from "@/lib/hooks/use-auth";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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

const mobileItems = [
  {
    label: "Home",
    href: "/",
  },
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
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const handleSignOut = async () => {
    try {
      await authService.signOut();
      logout();
      toast.success("Signed out successfully");
      // Force redirect to home page
      router.push("/");
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

          {/* Mobile menu button and menu */}
          <div className="md:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <AnimatedButton
                  variant="ghost"
                  size="icon"
                  className="text-neutral hover:text-primary"
                  aria-label="Open menu"
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
              </SheetTrigger>
              <SheetContent side="right" className="p-0 pt-10 w-2/3 max-w-xs ">
                <SheetTitle className="sr-only">Menu</SheetTitle>
                <nav className="flex flex-col gap-2 p-6">
                  {mobileItems.map((item) => (
                    <AnimatedWrapper key={item.href} animation="slide">
                      <Link
                        href={item.href}
                        className={cn(
                          pathname === item.href
                            ? "text-primary font-semibold"
                            : "text-muted-foreground",
                          "block py-2 text-lg hover:text-primary transition-colors"
                        )}
                        onClick={() => setOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </AnimatedWrapper>
                  ))}
                  <div className="mt-4 flex flex-col gap-2">
                    {!isLoading &&
                      (isAuthenticated ? (
                        <>
                          <AnimatedWrapper animation="slide">
                            <span className="text-neutral mb-2 block">
                              Welcome, {user?.fullName}
                            </span>
                          </AnimatedWrapper>
                          <AnimatedWrapper animation="slide">
                            <Link href={getDashboardLink()}>
                              <AnimatedButton
                                variant="outline"
                                className="w-full border-primary/20 hover:border-primary/40 mb-2"
                                onClick={() => setOpen(false)}
                              >
                                Dashboard
                              </AnimatedButton>
                            </Link>
                          </AnimatedWrapper>
                          <AnimatedWrapper animation="slide">
                            <AnimatedButton
                              variant="outline"
                              onClick={() => {
                                setOpen(false);
                                handleSignOut();
                              }}
                              className="w-full border-primary/20 hover:border-primary/40"
                            >
                              Sign out
                            </AnimatedButton>
                          </AnimatedWrapper>
                        </>
                      ) : (
                        <>
                          <AnimatedWrapper animation="slide">
                            <Link href="/sign-in">
                              <AnimatedButton
                                variant="outline"
                                className="w-full border-primary/20 hover:border-primary/40 mb-2"
                                onClick={() => setOpen(false)}
                              >
                                Sign in
                              </AnimatedButton>
                            </Link>
                          </AnimatedWrapper>
                          <AnimatedWrapper animation="slide">
                            <Link href="/sign-up">
                              <AnimatedButton
                                className="w-full bg-primary hover:bg-primary/90 mb-2"
                                onClick={() => setOpen(false)}
                              >
                                Sign up
                              </AnimatedButton>
                            </Link>
                          </AnimatedWrapper>
                          <div className="flex gap-2 items-center justify-center">
                            <AnimatedWrapper animation="slide">
                              <Link href="/employee/sign-in" className="flex-1">
                                <AnimatedButton
                                  variant="outline"
                                  size="sm"
                                  className="w-full border-blue-500/20 hover:border-blue-500/40 text-blue-500"
                                  onClick={() => setOpen(false)}
                                >
                                  Employee
                                </AnimatedButton>
                              </Link>
                            </AnimatedWrapper>
                            <AnimatedWrapper animation="slide">
                              <Link href="/admin/sign-in" className="flex-1">
                                <AnimatedButton
                                  variant="outline"
                                  size="sm"
                                  className="w-full border-red-500/20 hover:border-red-500/40 text-red-500"
                                  onClick={() => setOpen(false)}
                                >
                                  Admin
                                </AnimatedButton>
                              </Link>
                            </AnimatedWrapper>
                          </div>
                        </>
                      ))}
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </header>
  );
}
