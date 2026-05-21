"use client";

import {
  Target,
  Link2,
  BrainCircuit,
  TrendingUp,
  Clock,
  Shield,
} from "lucide-react";

const features = [
  {
    icon: Target,
    title: "Goal-Driven Reading",
    description:
      'Set what you want to learn. Every saved article is scored by how relevant it is to YOUR goal. No more "save everything, read nothing."',
    color: "text-amber",
    bg: "bg-amber/10",
  },
  {
    icon: BrainCircuit,
    title: "AI Daily Brief",
    description:
      "Every evening, get a 3-minute knowledge brief. AI extracts the key insights from everything you saved today, organized around your goal.",
    color: "text-violet",
    bg: "bg-violet/10",
  },
  {
    icon: Link2,
    title: "Save From Anywhere",
    description:
      "Paste a URL and we'll extract, summarize, and score it instantly. Works with articles, YouTube videos, tweets, newsletters — anything.",
    color: "text-emerald",
    bg: "bg-emerald/10",
  },
  {
    icon: TrendingUp,
    title: "Learning Streaks",
    description:
      "Build a daily reading habit with gentle streak tracking. See your knowledge grow over time with progress visualization.",
    color: "text-amber",
    bg: "bg-amber/10",
  },
  {
    icon: Clock,
    title: "Bedtime Mode",
    description:
      "Designed for your wind-down routine. Warm colors, calm typography, distraction-free. Like a bedtime story, but for your brain.",
    color: "text-violet",
    bg: "bg-violet/10",
  },
  {
    icon: Shield,
    title: "Your Data, Your Control",
    description:
      "After Pocket & Omnivore shut down, we know trust matters. Export anytime. Your highlights, notes, and progress are always yours.",
    color: "text-emerald",
    bg: "bg-emerald/10",
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Not another read-later app.
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Pillow Summary turns passive saving into active learning — with AI
            that understands what you&apos;re trying to learn.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group p-6 rounded-2xl bg-card border border-border hover:border-amber/30 transition-all duration-300"
            >
              <div
                className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${feature.bg} mb-4`}
              >
                <feature.icon className={`w-6 h-6 ${feature.color}`} />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
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
