"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTA({ onTryDemo }: { onTryDemo: () => void }) {
  return (
    <section className="py-24 px-6 border-t border-foreground/10">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-end justify-between mb-14">
          <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-foreground/35">
            Get Started
          </span>
          <span className="font-mono text-[10px] tracking-wider text-foreground/25 hidden md:block">
            05 / 05
          </span>
        </div>

        <div className="bg-earth-navy p-12 md:p-20 relative overflow-hidden">
          {/* Decorative accent */}
          <div className="absolute top-8 right-8 w-14 h-14 bg-earth-orange" />

          <h2 className="font-stencil text-4xl md:text-7xl text-earth-navy-foreground mb-6 max-w-xl leading-[0.95]">
            Your &quot;read later&quot; graveyard ends here.
          </h2>
          <p className="text-earth-navy-foreground/50 mb-10 max-w-md">
            Try the demo right now to see how AI turns saved articles into real knowledge.
          </p>
          <div className="flex items-center gap-6">
            <Button
              size="lg"
              className="bg-earth-navy-foreground text-earth-navy hover:bg-earth-navy-foreground/90 text-sm px-7 py-5 rounded-none font-mono tracking-[0.1em] uppercase"
              onClick={onTryDemo}
            >
              Try the Demo
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <span className="font-mono text-[10px] tracking-[0.1em] uppercase text-earth-navy-foreground/30">
              Free · No signup
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
