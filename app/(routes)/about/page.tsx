import { AnimatedWrapper } from "@/components/ui/animated-wrapper";
import { PageTransitionWrapper } from "@/components/ui/page-transition-wrapper";

export default function AboutPage() {
  return (
    <PageTransitionWrapper>
      <div className="container mx-auto px-4 py-12">
        <AnimatedWrapper animation="slide">
          <h1 className="text-5xl font-bold text-primary mb-4 text-center">
            About Sparkure
          </h1>
          <p className="text-xl text-neutral/80 text-center mb-12 max-w-2xl mx-auto">
            Transforming spaces with premium cleaning solutions and exceptional
            service
          </p>
        </AnimatedWrapper>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <AnimatedWrapper animation="slide">
            <div className="space-y-6">
              <h2 className="text-3xl font-semibold text-primary">Our Story</h2>
              <p className="text-lg text-neutral leading-relaxed">
                Founded with a vision to revolutionize the cleaning industry,
                Sparkure emerged from a simple yet powerful idea: cleaning
                should be more than just a service—it should be an experience
                that brings comfort and wellness to your space.
              </p>
              <p className="text-lg text-neutral leading-relaxed">
                Our journey began with a commitment to excellence and a passion
                for creating pristine environments that enhance the quality of
                life for our clients.
              </p>
            </div>
          </AnimatedWrapper>

          <AnimatedWrapper animation="slide" delay={0.2}>
            <div className="space-y-6">
              <h2 className="text-3xl font-semibold text-primary">
                Our Mission
              </h2>
              <p className="text-lg text-neutral leading-relaxed">
                To provide exceptional cleaning services that not only clean but
                also create a healthy and comfortable environment for our
                clients. We strive to be the benchmark of excellence in the
                cleaning industry.
              </p>
              <p className="text-lg text-neutral leading-relaxed">
                Every service we provide is infused with our commitment to
                quality, attention to detail, and dedication to customer
                satisfaction.
              </p>
            </div>
          </AnimatedWrapper>
        </div>

        <AnimatedWrapper animation="slide">
          <div className="bg-primary/5 rounded-2xl p-8 mb-16">
            <h2 className="text-3xl font-semibold text-primary mb-6 text-center">
              Our Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Excellence",
                  description:
                    "We maintain the highest standards in every aspect of our service delivery.",
                },
                {
                  title: "Integrity",
                  description:
                    "We operate with honesty, transparency, and ethical business practices.",
                },
                {
                  title: "Innovation",
                  description:
                    "We continuously evolve our methods and services to meet modern needs.",
                },
              ].map((value, index) => (
                <AnimatedWrapper
                  key={value.title}
                  animation="fade"
                  delay={index * 0.2}
                >
                  <div className="text-center p-6 bg-background rounded-xl shadow-sm">
                    <h3 className="text-xl font-semibold text-primary mb-3">
                      {value.title}
                    </h3>
                    <p className="text-neutral">{value.description}</p>
                  </div>
                </AnimatedWrapper>
              ))}
            </div>
          </div>
        </AnimatedWrapper>

        <AnimatedWrapper animation="slide">
          <div className="text-center">
            <h2 className="text-3xl font-semibold text-primary mb-6">
              Why Choose Sparkure?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "Expert Team",
                  description: "Highly trained and professional staff",
                },
                {
                  title: "Eco-Friendly",
                  description: "Sustainable cleaning solutions",
                },
                {
                  title: "24/7 Support",
                  description: "Round-the-clock customer service",
                },
                {
                  title: "Satisfaction Guaranteed",
                  description: "100% customer satisfaction promise",
                },
              ].map((feature, index) => (
                <AnimatedWrapper
                  key={feature.title}
                  animation="fade"
                  delay={index * 0.1}
                >
                  <div className="p-6 bg-background rounded-xl shadow-sm">
                    <h3 className="text-xl font-semibold text-primary mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-neutral">{feature.description}</p>
                  </div>
                </AnimatedWrapper>
              ))}
            </div>
          </div>
        </AnimatedWrapper>
      </div>
    </PageTransitionWrapper>
  );
}
