"use client";

const steps = [
  {
    step: "01",
    title: "Set Your Goal",
    description: '"I want to learn React in 30 days" or "Understand AI basics"',
    color: "bg-soft-blue",
  },
  {
    step: "02",
    title: "Save Content",
    description: "Paste URLs throughout the day — articles, videos, tweets, anything",
    color: "bg-soft-pink",
  },
  {
    step: "03",
    title: "AI Analyzes",
    description: "We score relevance, extract insights, and organize by your goal",
    color: "bg-soft-gold",
  },
  {
    step: "04",
    title: "Read Your Brief",
    description: "Every evening, a 3-minute knowledge brief with only what matters",
    color: "bg-soft-blue",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-28 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-soft-pink/[0.03] to-transparent" />
      <div className="max-w-3xl mx-auto relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-5">
            How it works
          </h2>
          <p className="text-lg text-muted-foreground">
            From chaos to focused learning in 4 steps.
          </p>
        </div>

        <div className="space-y-6">
          {steps.map((item) => (
            <div
              key={item.step}
              className="flex items-start gap-6 p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.04] transition-colors"
            >
              <div className="flex flex-col items-center gap-2 shrink-0">
                <div className={`w-3 h-3 rounded-full ${item.color}`} />
                <span className="text-[10px] font-mono text-muted-foreground">{item.step}</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
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
