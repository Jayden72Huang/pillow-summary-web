"use client";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-background/90 backdrop-blur-sm border-b border-foreground/10">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <span className="font-mono text-[11px] tracking-[0.15em] uppercase text-foreground/60">
          Pillow Summary
        </span>
        <div className="hidden sm:flex items-center gap-8">
          <a
            href="#features"
            className="font-mono text-[11px] tracking-[0.1em] uppercase text-foreground/40 hover:text-foreground transition-colors"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="font-mono text-[11px] tracking-[0.1em] uppercase text-foreground/40 hover:text-foreground transition-colors"
          >
            Process
          </a>
          <a
            href="#demo"
            className="font-mono text-[11px] tracking-[0.1em] uppercase text-earth-teal hover:text-earth-teal/70 transition-colors"
          >
            Try Demo
          </a>
        </div>
      </div>
    </nav>
  );
}
