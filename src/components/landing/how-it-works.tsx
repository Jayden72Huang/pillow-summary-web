"use client";

const steps = [
  {
    step: "01",
    title: "Set Your Goal",
    description: '"I want to learn React in 30 days" or "Understand AI basics"',
    color: "text-soft-blue",
    dot: "bg-soft-blue",
  },
  {
    step: "02",
    title: "Save Content",
    description:
      "Paste URLs throughout the day — articles, videos, tweets, anything",
    color: "text-soft-pink",
    dot: "bg-soft-pink",
  },
  {
    step: "03",
    title: "AI Analyzes",
    description:
      "We score relevance, extract insights, and organize by your goal",
    color: "text-soft-gold",
    dot: "bg-soft-gold",
  },
  {
    step: "04",
    title: "Read Your Brief",
    description:
      "Every evening, a 3-minute knowledge brief with only what matters",
    color: "text-soft-blue",
    dot: "bg-soft-blue",
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
              className="flex items-start gap-4 p-6 rounded-2xl bg-card/30 border border-border"
            >
              <div className={`w-2 h-2 rounded-full ${item.dot} mt-2 shrink-0`} />
              <div>
                <div className={`text-xs font-mono ${item.color} mb-1`}>
                  STEP {item.step}
                </div>
                <h3 className="text-base font-semibold mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
