"use client";

import { useState } from "react";
import { ArrowRight, Moon, Sparkles, Target } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero({ onTryDemo }: { onTryDemo: () => void }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-violet/5 via-transparent to-transparent" />
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-amber/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-violet/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/60 border border-border mb-8">
          <Moon className="w-4 h-4 text-amber" />
          <span className="text-sm text-muted-foreground">
            Your bedtime learning companion
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
          <span className="text-foreground">Stop saving.</span>
          <br />
          <span className="bg-gradient-to-r from-amber to-amber/70 bg-clip-text text-transparent">
            Start learning.
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-4">
          Set a learning goal. Save articles throughout the day.
          <br />
          Get a personalized{" "}
          <span className="text-foreground font-medium">
            3-minute AI knowledge brief
          </span>{" "}
          every evening.
        </p>

        <p className="text-base text-muted-foreground/70 mb-10">
          No more &quot;read later&quot; graveyards. Actually learn what you
          save.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            size="lg"
            className="bg-amber text-amber-foreground hover:bg-amber/90 text-lg px-8 py-6 rounded-xl font-semibold"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onTryDemo}
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Try it now — paste any URL
            <ArrowRight
              className={`w-5 h-5 ml-2 transition-transform ${isHovered ? "translate-x-1" : ""}`}
            />
          </Button>
          <p className="text-sm text-muted-foreground">
            No signup required. Free.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
          {[
            { icon: Target, label: "Set Goals", value: "Focus" },
            { icon: Sparkles, label: "AI Brief", value: "3 min" },
            { icon: Moon, label: "Daily Habit", value: "Streak" },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-secondary/60 border border-border mb-3">
                <Icon className="w-5 h-5 text-amber" />
              </div>
              <div className="text-sm font-medium text-foreground">{value}</div>
              <div className="text-xs text-muted-foreground">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
