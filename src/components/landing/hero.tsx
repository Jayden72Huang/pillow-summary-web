"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero({ onTryDemo }: { onTryDemo: () => void }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-soft-blue/8 via-soft-pink/5 to-transparent" />
        <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-soft-blue/8 rounded-full blur-[120px]" />
        <div className="absolute top-20 right-1/4 w-[400px] h-[400px] bg-soft-pink/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-32 left-1/3 w-[300px] h-[300px] bg-soft-gold/6 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <p className="text-sm text-soft-blue tracking-widest uppercase mb-8">
          Your bedtime learning companion
        </p>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
          <span className="text-foreground">Stop saving.</span>
          <br />
          <span className="bg-gradient-to-r from-soft-blue via-soft-pink to-soft-gold bg-clip-text text-transparent">
            Start learning.
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-4 leading-relaxed">
          Set a learning goal. Save articles throughout the day.
          <br />
          Get a personalized{" "}
          <span className="text-foreground font-medium">
            3-minute AI knowledge brief
          </span>{" "}
          every evening.
        </p>

        <p className="text-sm text-muted-foreground mb-12">
          No more &quot;read later&quot; graveyards. Actually learn what you
          save.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            size="lg"
            className="bg-foreground text-background hover:bg-foreground/90 text-base px-8 py-6 rounded-full font-medium"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onTryDemo}
          >
            Try it now — paste any URL
            <ArrowRight
              className={`w-4 h-4 ml-2 transition-transform ${isHovered ? "translate-x-1" : ""}`}
            />
          </Button>
          <p className="text-sm text-muted-foreground">
            No signup required. Free.
          </p>
        </div>

        <div className="mt-20 flex items-center justify-center gap-16">
          {[
            { label: "Set Goals", value: "Focus" },
            { label: "AI Brief", value: "3 min" },
            { label: "Daily Habit", value: "Streak" },
          ].map(({ label, value }) => (
            <div key={label} className="text-center">
              <div className="text-lg font-semibold text-foreground">
                {value}
              </div>
              <div className="text-xs text-muted-foreground mt-1">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
