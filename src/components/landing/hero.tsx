"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero({ onTryDemo }: { onTryDemo: () => void }) {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
      {/* Decorative teal shape */}
      <div className="absolute top-[12%] right-[8%] w-[180px] h-[220px] md:w-[260px] md:h-[320px] bg-earth-teal rounded-[40%_60%_50%_40%/60%_40%_60%_40%] opacity-80 rotate-12" />
      {/* Small orange square accent */}
      <div className="absolute bottom-[18%] left-[10%] w-12 h-12 md:w-16 md:h-16 bg-earth-orange" />

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <div className="mb-8">
          <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-foreground/40">
            Your bedtime learning companion
          </span>
        </div>

        <h1 className="font-stencil text-[4rem] md:text-[8rem] lg:text-[10rem] leading-[0.9] tracking-tight mb-10 text-foreground">
          Stop saving.
          <br />
          Start
          <br />
          learning.
        </h1>

        <div className="max-w-md mb-12">
          <p className="text-foreground/50 leading-relaxed">
            Set a learning goal. Save articles throughout the day.
            Get a personalized{" "}
            <span className="text-foreground font-medium">
              3-minute AI knowledge brief
            </span>{" "}
            every evening.
          </p>
        </div>

        <div className="flex items-center gap-6">
          <Button
            size="lg"
            className="bg-foreground text-background hover:bg-foreground/85 text-sm px-7 py-5 rounded-none font-mono tracking-[0.1em] uppercase"
            onClick={onTryDemo}
          >
            Try it now
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          <span className="font-mono text-[10px] tracking-[0.1em] uppercase text-foreground/30">
            No signup · Free
          </span>
        </div>

        <div className="mt-24 flex items-end gap-12 md:gap-16">
          {[
            { value: "Focus", label: "Set Goals" },
            { value: "3 min", label: "AI Brief" },
            { value: "Streak", label: "Daily Habit" },
          ].map(({ value, label }) => (
            <div key={label}>
              <div className="font-stencil text-3xl md:text-4xl text-foreground/80">
                {value}
              </div>
              <div className="font-mono text-[9px] tracking-[0.15em] uppercase text-foreground/35 mt-1">
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-6 right-6 font-mono text-[10px] tracking-wider text-foreground/25">
        01 / 05
      </div>
    </section>
  );
}
