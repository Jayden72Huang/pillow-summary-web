import { Moon } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-border">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Moon className="w-4 h-4 text-amber" />
          <span className="text-sm font-medium">Pillow Summary</span>
        </div>
        <p className="text-sm text-muted-foreground">
          Stop saving. Start learning. Built with AI.
        </p>
      </div>
    </footer>
  );
}
