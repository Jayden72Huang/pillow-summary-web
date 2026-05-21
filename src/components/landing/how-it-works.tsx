"use client";

const steps = [
  {
    num: "1",
    title: "Set your goal",
    description: "\"I want to learn React in 30 days\" or \"Understand AI basics.\" A direction makes all the difference.",
    color: "bg-earth-teal text-earth-teal-foreground",
  },
  {
    num: "2",
    title: "Save content",
    description: "Paste URLs throughout the day — articles, videos, tweets, anything you stumble upon.",
    color: "bg-earth-rose text-earth-rose-foreground",
  },
  {
    num: "3",
    title: "AI analyzes",
    description: "We score relevance, extract insights, and organize everything by your goal.",
    color: "bg-earth-olive text-earth-olive-foreground",
  },
  {
    num: "4",
    title: "Read your brief",
    description: "Every evening, a 3-minute knowledge brief with only what matters. Nothing else.",
    color: "bg-earth-orange text-earth-orange-foreground",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-6 border-t border-foreground/10">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-end justify-between mb-14">
          <div>
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-foreground/35 block mb-4">
              Process
            </span>
            <h2 className="font-stencil text-4xl md:text-6xl text-foreground">
              How it works
            </h2>
          </div>
          <span className="font-mono text-[10px] tracking-wider text-foreground/25 hidden md:block">
            03 / 05
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {steps.map((step) => (
            <div
              key={step.num}
              className={`${step.color} p-6 md:p-8 flex flex-col justify-between min-h-[280px] md:min-h-[360px] transition-all duration-300 hover:scale-[1.02]`}
            >
              <span className="font-stencil text-[5rem] md:text-[7rem] leading-none opacity-30">
                {step.num}
              </span>
              <div>
                <h3 className="font-stencil text-xl md:text-2xl mb-2">
                  {step.title}
                </h3>
                <p className="text-sm opacity-60 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
