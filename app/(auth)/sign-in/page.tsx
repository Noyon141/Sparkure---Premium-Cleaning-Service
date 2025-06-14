import { SignInForm } from "@/components/auth/sign-in-form";
import { AnimatedWrapper } from "@/components/ui/animated-wrapper";
import { Card } from "@/components/ui/card";

export default function SignInPage() {
  return (
    <AnimatedWrapper>
      <div className="min-h-screen flex items-center justify-center bg-primary/10 relative overflow-hidden">
        {/* Background gradient effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />

        <AnimatedWrapper
          className="w-full max-w-xl z-10 px-4"
          animation="slide"
          delay={0.5}
        >
          <Card className="p-8 md:p-12 bg-background/50 backdrop-blur-sm border-primary/10">
            <SignInForm />
          </Card>
        </AnimatedWrapper>
      </div>
    </AnimatedWrapper>
  );
}
