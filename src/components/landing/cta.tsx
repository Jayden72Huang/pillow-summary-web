"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTA({ onTryDemo }: { onTryDemo: () => void }) {
  return (
    <section className="py-24 px-6">
      <div className="max-w-2xl mx-auto text-center relative">
        <div className="absolute inset-0 -m-12 bg-gradient-to-br from-soft-blue/5 via-soft-pink/5 to-soft-gold/5 rounded-3xl blur-2xl" />
        <div className="relative">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Your &quot;read later&quot; graveyard ends here.
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Join the waitlist for early access, or try the demo right now to see
            how AI turns saved articles into real knowledge.
          </p>
          <Button
            size="lg"
            className="bg-foreground text-background hover:bg-foreground/90 text-base px-8 py-6 rounded-full font-medium"
            onClick={onTryDemo}
          >
            Try the Demo
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          <p className="text-sm text-muted-foreground mt-6">
            Free to try. No signup required.
          </p>
        </div>
      </div>
    </section>
  );
}
