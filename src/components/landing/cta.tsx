"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTA({ onTryDemo }: { onTryDemo: () => void }) {
  return (
    <section className="py-28 px-6">
      <div className="max-w-3xl mx-auto relative">
        <div className="absolute inset-0 bg-gradient-to-br from-soft-blue/10 via-soft-pink/8 to-soft-gold/6 rounded-3xl blur-xl" />
        <div className="relative bg-white/[0.02] border border-white/[0.08] rounded-3xl p-16 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-5">
            Your &quot;read later&quot; graveyard
            <br />
            <span className="bg-gradient-to-r from-soft-blue to-soft-pink bg-clip-text text-transparent">
              ends here.
            </span>
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-lg mx-auto">
            Try the demo right now to see how AI turns saved articles into real knowledge.
          </p>
          <Button
            size="lg"
            className="bg-foreground text-background hover:bg-foreground/90 text-base px-8 py-6 rounded-full font-medium shadow-[0_0_40px_rgba(255,255,255,0.1)]"
            onClick={onTryDemo}
          >
            Try the Demo
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          <p className="text-sm text-muted-foreground mt-6">
            Free to try &middot; No signup required
          </p>
        </div>
      </div>
    </section>
  );
}
