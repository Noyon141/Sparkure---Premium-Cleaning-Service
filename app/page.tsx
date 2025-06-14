import Hero from "@/components/Hero";
import Process from "@/components/Process";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import { PageTransitionWrapper } from "@/components/ui/page-transition-wrapper";

export default function Home() {
  return (
    <PageTransitionWrapper>
      <main className="flex flex-col min-h-screen container mx-auto">
        <Hero />
        <Process />
        <Services />
        <Testimonials />
      </main>
    </PageTransitionWrapper>
  );
}
