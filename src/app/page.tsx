"use client";

import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Demo } from "@/components/landing/demo";
import { CTA } from "@/components/landing/cta";
import { Footer } from "@/components/landing/footer";

export default function Home() {
  const scrollToDemo = () => {
    document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="pt-16">
      <Navbar />
      <Hero onTryDemo={scrollToDemo} />
      <Features />
      <HowItWorks />
      <Demo />
      <CTA onTryDemo={scrollToDemo} />
      <Footer />
    </main>
  );
}
