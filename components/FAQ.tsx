"use client";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { faqData } from "@/data/faq";
import { FAQItem } from "@/types";
import { motion } from "framer-motion";
import { useState } from "react";

const Faq = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="w-full max-w-3xl mx-auto py-16 px-4 md:px-0">
      <h2 className="text-3xl md:text-4xl font-bold text-primary mb-8 text-center">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {faqData.faqs.map((faq: FAQItem, idx: number) => (
          <motion.div
            key={faq.question}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: idx * 0.08 }}
            className="bg-background rounded-xl shadow-sm overflow-hidden border border-primary/10"
          >
            <Drawer
              open={openIndex === idx}
              onOpenChange={(open) => setOpenIndex(open ? idx : null)}
            >
              <DrawerTrigger asChild>
                <button
                  className="w-full flex justify-between items-center px-6 py-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-colors group"
                  aria-expanded={openIndex === idx}
                  aria-controls={`faq-panel-${idx}`}
                  type="button"
                >
                  <span className="text-lg font-medium text-primary group-hover:text-primary/80">
                    {faq.question}
                  </span>
                  <span
                    className={`ml-4 transition-transform duration-300 ${
                      openIndex === idx ? "rotate-180" : "rotate-0"
                    }`}
                    aria-hidden
                  >
                    ▼
                  </span>
                </button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>{faq.question}</DrawerTitle>
                  <DrawerDescription className="text-neutral/80 text-base mt-2">
                    {faq.answer}
                  </DrawerDescription>
                </DrawerHeader>
                <div className="flex justify-center pb-4">
                  <DrawerClose asChild>
                    <button className="mt-4 px-6 py-2 rounded bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition">
                      Close
                    </button>
                  </DrawerClose>
                </div>
              </DrawerContent>
            </Drawer>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Faq;
