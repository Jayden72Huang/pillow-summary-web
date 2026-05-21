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

const features: { icon: LucideIcon; title: string; description: string; color: string; iconColor: string }[] = [
  {
    icon: Target,
    title: "Goal-Driven Reading",
    description: "Every saved article is scored by how relevant it is to YOUR goal.",
    color: "bg-earth-teal",
    iconColor: "text-earth-teal-foreground",
  },
  {
    icon: BrainCircuit,
    title: "AI Daily Brief",
    description: "Every evening, a 3-minute knowledge brief with key insights.",
    color: "bg-earth-rose",
    iconColor: "text-earth-rose-foreground",
  },
  {
    icon: Link2,
    title: "Save From Anywhere",
    description: "Articles, YouTube, tweets, newsletters — paste any URL.",
    color: "bg-earth-olive",
    iconColor: "text-earth-olive-foreground",
  },
  {
    icon: TrendingUp,
    title: "Learning Streaks",
    description: "Build a daily reading habit with gentle streak tracking.",
    color: "bg-earth-orange",
    iconColor: "text-earth-orange-foreground",
  },
  {
    icon: Clock,
    title: "Bedtime Mode",
    description: "Calm typography, distraction-free reading experience.",
    color: "bg-earth-navy",
    iconColor: "text-earth-navy-foreground",
  },
  {
    icon: Shield,
    title: "Your Data",
    description: "Export anytime. Your highlights and progress are always yours.",
    color: "bg-earth-teal",
    iconColor: "text-earth-teal-foreground",
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 px-6 border-t border-foreground/10">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-end justify-between mb-14">
          <div>
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-foreground/35 block mb-4">
              Features
            </span>
            <h2 className="font-stencil text-4xl md:text-6xl text-foreground">
              Not another
              <br />
              read-later app.
            </h2>
          </div>
          <span className="font-mono text-[10px] tracking-wider text-foreground/25 hidden md:block">
            02 / 05
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className={`${feature.color} p-6 md:p-8 group transition-all duration-300 hover:scale-[1.02]`}
            >
              <feature.icon className={`w-6 h-6 ${feature.iconColor} mb-6 opacity-70`} />
              <h3 className={`font-stencil text-xl md:text-2xl ${feature.iconColor} mb-2`}>
                {feature.title}
              </h3>
              <p className={`text-sm ${feature.iconColor} opacity-60 leading-relaxed`}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
