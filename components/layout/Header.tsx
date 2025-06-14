import { AnimatedButton } from "@/components/ui/animated-button";
import { AnimatedWrapper } from "@/components/ui/animated-wrapper";
import Link from "next/link";

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
