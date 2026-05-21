"use client";

import { Moon } from "lucide-react";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Moon className="w-5 h-5 text-amber" />
          <span className="font-semibold text-lg">Pillow Summary</span>
        </div>
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
            className="text-sm text-amber hover:text-amber/80 font-medium transition-colors"
          >
            Try Demo
          </a>
        </div>
      </div>
    </nav>
  );
}
