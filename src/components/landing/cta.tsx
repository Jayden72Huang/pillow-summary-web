"use client";

import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTA({ onTryDemo }: { onTryDemo: () => void }) {
  return (
    <section className="py-24 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <div className="bg-gradient-to-br from-card via-card to-amber/5 border border-amber/20 rounded-3xl p-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Your &quot;read later&quot; graveyard ends here.
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Join the waitlist for early access, or try the demo right now to see
            how AI turns saved articles into real knowledge.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="bg-amber text-amber-foreground hover:bg-amber/90 text-lg px-8 py-6 rounded-xl font-semibold"
              onClick={onTryDemo}
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Try the Demo
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-6">
            Free to try. No signup required.
          </p>
        </div>
      </div>
    </section>
  );
}
