import { AnimatedWrapper } from "@/components/ui/animated-wrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageTransitionWrapper } from "@/components/ui/page-transition-wrapper";
import { Textarea } from "@/components/ui/textarea";
import { contactData } from "@/data/contacts";
import { Clock, Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
  return (
    <PageTransitionWrapper>
      <div className="container mx-auto px-4 py-12">
        <AnimatedWrapper animation="slide">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-primary mb-4">Contact Us</h1>
            <p className="text-xl text-neutral/80 max-w-2xl mx-auto">
              Get in touch with our team to discuss your cleaning needs or
              schedule a service
            </p>
          </div>
        </AnimatedWrapper>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <AnimatedWrapper animation="slide">
            <div className="bg-background p-8 rounded-2xl shadow-sm">
              <h2 className="text-3xl font-semibold text-primary mb-6">
                Send us a Message
              </h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label
                      htmlFor="firstName"
                      className="text-sm font-medium text-neutral"
                    >
                      First Name
                    </label>
                    <Input id="firstName" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="lastName"
                      className="text-sm font-medium text-neutral"
                    >
                      Last Name
                    </label>
                    <Input id="lastName" placeholder="Doe" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-neutral"
                  >
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="phone"
                    className="text-sm font-medium text-neutral"
                  >
                    Phone Number
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="message"
                    className="text-sm font-medium text-neutral"
                  >
                    Message
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Tell us about your cleaning needs..."
                    className="min-h-[150px]"
                  />
                </div>

                <Button
                  className="w-full cursor-pointer"
                  variant="secondary"
                  size="lg"
                >
                  Send Message
                </Button>
              </form>
            </div>
          </AnimatedWrapper>

          <div className="space-y-8">
            <AnimatedWrapper animation="slide" delay={0.2}>
              <div className="bg-background p-8 rounded-2xl shadow-sm">
                <h2 className="text-3xl font-semibold text-primary mb-6">
                  Contact Information
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <Mail className="w-6 h-6 text-primary mt-1" />
                    <div>
                      <h3 className="font-medium text-neutral">Email</h3>
                      <a
                        href={`mailto:${contactData.contact.email}`}
                        className="text-neutral/80 hover:text-primary transition-colors"
                      >
                        {contactData.contact.email}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <Phone className="w-6 h-6 text-primary mt-1" />
                    <div>
                      <h3 className="font-medium text-neutral">Phone</h3>
                      <a
                        href={`tel:${contactData.contact.phone}`}
                        className="text-neutral/80 hover:text-primary transition-colors"
                      >
                        {contactData.contact.phone}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <MapPin className="w-6 h-6 text-primary mt-1" />
                    <div>
                      <h3 className="font-medium text-neutral">Address</h3>
                      <p className="text-neutral/80">
                        {contactData.contact.address.street}
                        <br />
                        {contactData.contact.address.city},{" "}
                        {contactData.contact.address.state}{" "}
                        {contactData.contact.address.zip}
                        <br />
                        {contactData.contact.address.country}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <Clock className="w-6 h-6 text-primary mt-1" />
                    <div>
                      <h3 className="font-medium text-neutral">
                        Business Hours
                      </h3>
                      <p className="text-neutral/80">
                        Weekdays: {contactData.businessHours.weekdays}
                        <br />
                        Saturday: {contactData.businessHours.saturday}
                        <br />
                        Sunday: {contactData.businessHours.sunday}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedWrapper>

            <AnimatedWrapper animation="slide" delay={0.3}>
              <div className="bg-background p-8 rounded-2xl shadow-sm">
                <h2 className="text-3xl font-semibold text-primary mb-6">
                  Service Areas
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {contactData.serviceAreas.map((area, index) => (
                    <AnimatedWrapper
                      key={area.name}
                      animation="fade"
                      delay={0.1 * index}
                    >
                      <div className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                        <div>
                          <span className="text-neutral font-medium">
                            {area.name}
                          </span>
                          {area.description && (
                            <p className="text-neutral/60 text-sm mt-1">
                              {area.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </AnimatedWrapper>
                  ))}
                </div>
              </div>
            </AnimatedWrapper>
          </div>
        </div>
      </div>
    </PageTransitionWrapper>
  );
}
