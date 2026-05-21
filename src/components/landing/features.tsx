"use client";

import {
  Target,
  Link2,
  BrainCircuit,
  TrendingUp,
  Clock,
  Shield,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const features: { icon: LucideIcon; title: string; description: string; gradient: string }[] = [
  {
    icon: Target,
    title: "Goal-Driven Reading",
    description:
      'Set what you want to learn. Every saved article is scored by how relevant it is to YOUR goal.',
    gradient: "from-soft-blue/20 to-soft-blue/5",
  },
  {
    icon: BrainCircuit,
    title: "AI Daily Brief",
    description:
      "Every evening, get a 3-minute knowledge brief. AI extracts the key insights organized around your goal.",
    gradient: "from-soft-pink/20 to-soft-pink/5",
  },
  {
    icon: Link2,
    title: "Save From Anywhere",
    description:
      "Paste a URL and we'll extract, summarize, and score it. Articles, YouTube, tweets, newsletters — anything.",
    gradient: "from-soft-gold/20 to-soft-gold/5",
  },
  {
    icon: TrendingUp,
    title: "Learning Streaks",
    description:
      "Build a daily reading habit with gentle streak tracking. See your knowledge grow over time.",
    gradient: "from-soft-blue/20 to-soft-blue/5",
  },
  {
    icon: Clock,
    title: "Bedtime Mode",
    description:
      "Designed for your wind-down routine. Calm typography, distraction-free reading experience.",
    gradient: "from-soft-pink/20 to-soft-pink/5",
  },
  {
    icon: Shield,
    title: "Your Data, Your Control",
    description:
      "Export anytime. Your highlights, notes, and progress are always yours.",
    gradient: "from-soft-gold/20 to-soft-gold/5",
  },
];

export function Features() {
  return (
    <section id="features" className="py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-5">
            Not another read-later app.
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            AI that understands what you&apos;re trying to learn.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className={`group relative p-6 rounded-2xl bg-gradient-to-b ${feature.gradient} border border-white/[0.06] hover:border-white/[0.12] transition-all duration-500`}
            >
              <div className="w-10 h-10 rounded-xl bg-white/[0.06] flex items-center justify-center mb-4">
                <feature.icon className="w-5 h-5 text-foreground/70" />
              </div>
              <h3 className="text-base font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
