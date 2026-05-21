"use client";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <span className="font-semibold text-lg tracking-tight">
          Pillow Summary
        </span>
        <div className="hidden sm:flex items-center gap-8">
          <a
            href="#features"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            How it works
          </a>
          <a
            href="#demo"
            className="text-sm text-soft-blue hover:text-soft-blue/80 font-medium transition-colors"
          >
            Try Demo
          </a>
        </div>
      </div>
    </nav>
  );
}
