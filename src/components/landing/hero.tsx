"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero({ onTryDemo }: { onTryDemo: () => void }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-gradient-to-br from-soft-blue/20 via-soft-pink/15 to-soft-gold/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[10%] left-[10%] w-[400px] h-[400px] bg-soft-pink/10 rounded-full blur-[80px]" />
        <div className="absolute bottom-[20%] right-[10%] w-[300px] h-[300px] bg-soft-blue/8 rounded-full blur-[80px]" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-soft-blue/20 bg-soft-blue/5 mb-10">
          <div className="w-1.5 h-1.5 rounded-full bg-soft-blue animate-pulse" />
          <span className="text-xs text-soft-blue/80 tracking-wide uppercase">
            Your bedtime learning companion
          </span>
        </div>

        <h1 className="text-5xl md:text-[5.5rem] font-bold tracking-tight leading-[1.05] mb-8">
          <span className="text-foreground">Stop saving.</span>
          <br />
          <span className="bg-gradient-to-r from-soft-blue via-soft-pink to-soft-gold bg-clip-text text-transparent">
            Start learning.
          </span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-12 leading-relaxed">
          Set a learning goal. Save articles throughout the day. Get a personalized{" "}
          <span className="text-foreground font-medium">
            3-minute AI knowledge brief
          </span>{" "}
          every evening.
        </p>

        <div className="flex flex-col items-center gap-4">
          <Button
            size="lg"
            className="relative bg-foreground text-background hover:bg-foreground/90 text-base px-8 py-6 rounded-full font-medium shadow-[0_0_40px_rgba(255,255,255,0.1)]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onTryDemo}
          >
            Try it now — paste any URL
            <ArrowRight
              className={`w-4 h-4 ml-2 transition-transform ${isHovered ? "translate-x-1" : ""}`}
            />
          </Button>
          <span className="text-xs text-muted-foreground">
            No signup required &middot; Free
          </span>
        </div>

        <div className="mt-24 grid grid-cols-3 gap-8 max-w-sm mx-auto">
          {[
            { label: "Set Goals", value: "Focus" },
            { label: "AI Brief", value: "3 min" },
            { label: "Daily Habit", value: "Streak" },
          ].map(({ label, value }) => (
            <div key={label} className="text-center">
              <div className="text-2xl font-bold text-foreground">{value}</div>
              <div className="text-xs text-muted-foreground mt-1">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
