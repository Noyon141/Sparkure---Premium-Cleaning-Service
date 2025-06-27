import { AuthProvider } from "@/components/auth/auth-provider";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import ScrollToTop from "@/components/ScrollToTop";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SmoothScroll } from "@/components/ui/smooth-scroll";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900", "300", "600", "800"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "Sparkure - Premium Cleaning Services",
  description:
    "Where Clean Meets Cure. Premium on-demand cleaning services for homes, vehicles, and offices.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${dmSans.className}`} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <SmoothScroll>
              <div className="flex min-h-screen flex-col" id="root">
                <Header />
                <main className="flex-1 bg-background">{children}</main>
                <Footer />
                <ScrollToTop />
              </div>
            </SmoothScroll>
            <Toaster position="bottom-center" />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
