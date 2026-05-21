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
    color: "text-soft-blue",
  },
  {
    icon: BrainCircuit,
    title: "AI Daily Brief",
    description:
      "Every evening, get a 3-minute knowledge brief. AI extracts the key insights from everything you saved today, organized around your goal.",
    color: "text-soft-pink",
  },
  {
    icon: Link2,
    title: "Save From Anywhere",
    description:
      "Paste a URL and we'll extract, summarize, and score it instantly. Works with articles, YouTube videos, tweets, newsletters — anything.",
    color: "text-soft-gold",
  },
  {
    icon: TrendingUp,
    title: "Learning Streaks",
    description:
      "Build a daily reading habit with gentle streak tracking. See your knowledge grow over time with progress visualization.",
    color: "text-soft-blue",
  },
  {
    icon: Clock,
    title: "Bedtime Mode",
    description:
      "Designed for your wind-down routine. Calm typography, distraction-free. Like a bedtime story, but for your brain.",
    color: "text-soft-pink",
  },
  {
    icon: Shield,
    title: "Your Data, Your Control",
    description:
      "After Pocket & Omnivore shut down, we know trust matters. Export anytime. Your highlights, notes, and progress are always yours.",
    color: "text-soft-gold",
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="p-6 rounded-2xl bg-card/50 border border-border hover:border-soft-blue/20 transition-all duration-300"
            >
              <feature.icon className={`w-5 h-5 ${feature.color} mb-4`} />
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
