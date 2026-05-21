"use client";

import { useState, useRef, useEffect } from "react";
import {
  Loader2,
  CheckCircle2,
  ArrowRight,
  Copy,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface SummaryResult {
  title: string;
  summary: string;
  keyInsights: string[];
  relevanceScore: number;
  readTime: string;
  platform: string;
}

async function copyTextToClipboard(text: string): Promise<boolean> {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Fall through to the textarea fallback for iOS WKWebView.
    }
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.readOnly = true;
  textarea.style.position = "fixed";
  textarea.style.top = "0";
  textarea.style.left = "0";
  textarea.style.width = "1px";
  textarea.style.height = "1px";
  textarea.style.opacity = "0";
  textarea.style.pointerEvents = "none";

  const selection = document.getSelection();
  const previousRange =
    selection && selection.rangeCount > 0 ? selection.getRangeAt(0) : null;

  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();
  textarea.setSelectionRange(0, textarea.value.length);

  let copied = false;
  try {
    copied = document.execCommand("copy");
  } catch {
    copied = false;
  } finally {
    document.body.removeChild(textarea);
    if (selection && previousRange) {
      selection.removeAllRanges();
      selection.addRange(previousRange);
    }
  }

  return copied;
}

export function Demo() {
  const [url, setUrl] = useState("");
  const [goal, setGoal] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<SummaryResult | null>(null);
  const [step, setStep] = useState<"goal" | "url" | "result">("goal");
  const [copied, setCopied] = useState(false);
  const demoRef = useRef<HTMLDivElement>(null);

  const presetGoals = [
    "Learn React & frontend dev",
    "Understand AI & machine learning",
    "Improve writing skills",
    "Start a SaaS business",
  ];

  useEffect(() => {
    if (demoRef.current && step !== "goal") {
      demoRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [step]);

  const handleSetGoal = (g: string) => {
    setGoal(g);
    setStep("url");
  };

  const handleAnalyze = async () => {
    if (!url.trim()) return;
    setIsAnalyzing(true);

    try {
      const apiBase = process.env.NEXT_PUBLIC_API_BASE || "";
      const res = await fetch(`${apiBase}/api/summarize`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim(), goal }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setResult(data);
      setStep("result");
    } catch {
      setResult({
        title: "Unable to fetch this URL",
        summary:
          "We couldn't access this page. Try pasting a different article URL. Make sure it's a publicly accessible web page.",
        keyInsights: [
          "Try a blog post, news article, or YouTube video URL",
          "Some sites block automated access",
        ],
        relevanceScore: 0,
        readTime: "-",
        platform: "unknown",
      });
      setStep("result");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleCopy = async () => {
    if (!result) return;
    const text = `${result.title}\n\n${result.summary}\n\nKey Insights:\n${result.keyInsights.map((i) => `- ${i}`).join("\n")}`;
    const didCopy = await copyTextToClipboard(text);
    if (!didCopy) return;
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setUrl("");
    setResult(null);
    setStep("url");
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-earth-teal-foreground bg-earth-teal";
    if (score >= 50) return "text-earth-orange-foreground bg-earth-orange";
    return "text-foreground/50 bg-foreground/5";
  };

  return (
    <section
      id="demo"
      ref={demoRef}
      className="py-24 px-6 border-t border-foreground/10"
    >
      <div className="max-w-2xl mx-auto">
        <div className="flex items-end justify-between mb-14">
          <div>
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-foreground/35 block mb-4">
              Live Demo
            </span>
            <h2 className="font-stencil text-4xl md:text-6xl text-foreground">
              See it in action
            </h2>
          </div>
          <span className="font-mono text-[10px] tracking-wider text-foreground/25 hidden md:block">
            04 / 05
          </span>
        </div>

        <div className="border border-foreground/10 p-8 bg-background">
          {step === "goal" && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-earth-teal flex items-center justify-center">
                  <span className="font-stencil text-sm text-earth-teal-foreground">1</span>
                </div>
                <h3 className="font-stencil text-xl text-foreground">
                  What do you want to learn?
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {presetGoals.map((g) => (
                  <button
                    key={g}
                    onClick={() => handleSetGoal(g)}
                    className="p-3 text-left text-sm border border-foreground/10 hover:border-foreground/30 hover:bg-foreground/[0.03] transition-all text-foreground/60 hover:text-foreground"
                  >
                    {g}
                  </button>
                ))}
              </div>

              <div className="relative">
                <Input
                  placeholder="Or type your own goal..."
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && goal.trim() && handleSetGoal(goal)
                  }
                  className="pr-20 bg-transparent border-foreground/10 rounded-none text-foreground placeholder:text-foreground/25"
                />
                {goal.trim() && (
                  <Button
                    size="sm"
                    className="absolute right-1 top-1 bg-foreground text-background hover:bg-foreground/85 rounded-none font-mono text-xs tracking-wider uppercase"
                    onClick={() => handleSetGoal(goal)}
                  >
                    Next
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                )}
              </div>
            </div>
          )}

          {step === "url" && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-earth-rose flex items-center justify-center">
                  <span className="font-stencil text-sm text-earth-rose-foreground">2</span>
                </div>
                <h3 className="font-stencil text-xl text-foreground">
                  Paste an article URL
                </h3>
              </div>

              <div className="flex items-center gap-2 text-sm text-foreground/40 bg-foreground/[0.03] px-3 py-2 border border-foreground/8">
                <span>
                  Goal:{" "}
                  <span className="text-foreground/70">{goal}</span>
                </span>
                <button
                  onClick={() => setStep("goal")}
                  className="ml-auto font-mono text-[10px] tracking-wider uppercase text-earth-teal hover:text-earth-teal/70"
                >
                  Change
                </button>
              </div>

              <div className="relative">
                <Input
                  placeholder="https://example.com/article..."
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && url.trim() && handleAnalyze()
                  }
                  className="pr-28 bg-transparent border-foreground/10 rounded-none text-foreground placeholder:text-foreground/25"
                  disabled={isAnalyzing}
                />
                <Button
                  size="sm"
                  className="absolute right-1 top-1 bg-foreground text-background hover:bg-foreground/85 rounded-none font-mono text-xs tracking-wider uppercase"
                  onClick={handleAnalyze}
                  disabled={!url.trim() || isAnalyzing}
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                      Wait
                    </>
                  ) : (
                    "Summarize"
                  )}
                </Button>
              </div>

              {isAnalyzing && (
                <div className="flex items-center justify-center gap-3 py-8">
                  <div className="w-8 h-8 border-2 border-foreground/10 border-t-earth-teal animate-spin" />
                  <div className="text-left">
                    <p className="text-sm text-foreground/60">AI is reading...</p>
                    <p className="text-xs text-foreground/30">
                      Extracting key insights for your goal
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {step === "result" && result && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-earth-teal" />
                  <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-foreground/40">
                    Your AI Brief
                  </span>
                </div>
                <button
                  onClick={handleCopy}
                  className="p-2 hover:bg-foreground/5 transition-colors"
                  title="Copy summary"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-earth-teal" />
                  ) : (
                    <Copy className="w-4 h-4 text-foreground/30" />
                  )}
                </button>
              </div>

              <div className="flex items-center gap-2 text-sm text-foreground/40 bg-foreground/[0.03] px-3 py-2 border border-foreground/8">
                <span>
                  Goal:{" "}
                  <span className="text-foreground/70">{goal}</span>
                </span>
              </div>

              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h4 className="font-stencil text-2xl leading-tight text-foreground">
                      {result.title}
                    </h4>
                    <div className="flex items-center gap-2 mt-1.5">
                      {result.platform !== "unknown" && (
                        <Badge variant="secondary" className="text-[10px] font-mono tracking-wider uppercase rounded-none bg-foreground/5 text-foreground/50 border-foreground/10">
                          {result.platform}
                        </Badge>
                      )}
                      {result.readTime !== "-" && (
                        <span className="text-[11px] text-foreground/30">
                          {result.readTime} read
                        </span>
                      )}
                    </div>
                  </div>
                  {result.relevanceScore > 0 && (
                    <div
                      className={`px-3 py-1 text-sm font-mono shrink-0 ${getScoreColor(result.relevanceScore)}`}
                    >
                      {result.relevanceScore}%
                    </div>
                  )}
                </div>

                <p className="text-foreground/50 leading-relaxed text-sm">
                  {result.summary}
                </p>

                {result.keyInsights.length > 0 && (
                  <div className="space-y-2 pt-2">
                    <h5 className="font-mono text-[10px] tracking-[0.15em] uppercase text-foreground/35">
                      Key Insights
                    </h5>
                    <ul className="space-y-2">
                      {result.keyInsights.map((insight, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-sm text-foreground/50"
                        >
                          <span className="text-earth-teal shrink-0 mt-0.5">—</span>
                          <span>{insight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-foreground/8">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleReset}
                  className="border-foreground/10 text-foreground/50 hover:text-foreground hover:bg-foreground/5 rounded-none font-mono text-xs tracking-wider uppercase"
                >
                  Try another URL
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
