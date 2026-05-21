export function Footer() {
  return (
    <footer className="py-8 px-6 border-t border-foreground/10">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-earth-teal" />
          <span className="font-mono text-[11px] tracking-[0.15em] uppercase text-foreground/40">
            Pillow Summary
          </span>
        </div>
        <p className="font-mono text-[10px] tracking-wider text-foreground/25">
          {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
