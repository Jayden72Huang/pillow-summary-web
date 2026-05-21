"use client";

import { Target, Link2, BrainCircuit, Moon } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: Target,
    title: "Set Your Goal",
    description: '"I want to learn React in 30 days" or "Understand AI basics"',
    color: "text-amber",
    bg: "bg-amber/10",
    border: "border-amber/20",
  },
  {
    step: "02",
    icon: Link2,
    title: "Save Content",
    description:
      "Paste URLs throughout the day — articles, videos, tweets, anything",
    color: "text-violet",
    bg: "bg-violet/10",
    border: "border-violet/20",
  },
  {
    step: "03",
    icon: BrainCircuit,
    title: "AI Analyzes",
    description:
      "We score relevance, extract insights, and organize by your goal",
    color: "text-emerald",
    bg: "bg-emerald/10",
    border: "border-emerald/20",
  },
  {
    step: "04",
    icon: Moon,
    title: "Read Your Brief",
    description:
      "Every evening, a 3-minute knowledge brief with only what matters",
    color: "text-amber",
    bg: "bg-amber/10",
    border: "border-amber/20",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How it works
          </h2>
          <p className="text-lg text-muted-foreground">
            From information chaos to focused learning in 4 steps.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {steps.map((item) => (
            <div
              key={item.step}
              className={`relative p-6 rounded-2xl bg-card border ${item.border} hover:border-amber/30 transition-all`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`flex items-center justify-center w-12 h-12 rounded-xl ${item.bg} shrink-0`}
                >
                  <item.icon className={`w-6 h-6 ${item.color}`} />
                </div>
                <div>
                  <div className="text-xs font-mono text-muted-foreground mb-1">
                    STEP {item.step}
                  </div>
                  <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
