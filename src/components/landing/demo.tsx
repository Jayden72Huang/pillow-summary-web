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
    if (score >= 80) return "text-soft-blue bg-soft-blue/10 border-soft-blue/30";
    if (score >= 50) return "text-soft-gold bg-soft-gold/10 border-soft-gold/30";
    return "text-muted-foreground bg-secondary border-border";
  };

  return (
    <section
      id="demo"
      ref={demoRef}
      className="py-24 px-6"
    >
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <Badge
            variant="outline"
            className="mb-4 border-soft-blue/30 text-soft-blue"
          >
            Live Demo
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            See it in action
          </h2>
          <p className="text-muted-foreground">
            Set a goal, paste a URL, and watch AI extract what matters.
          </p>
        </div>

        <div className="bg-card/50 border border-border rounded-2xl p-8 backdrop-blur-sm">
          {step === "goal" && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-6 h-6 rounded-full bg-soft-blue/20 flex items-center justify-center">
                  <span className="text-xs font-mono text-soft-blue">1</span>
                </div>
                <h3 className="font-semibold">
                  What do you want to learn?
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {presetGoals.map((g) => (
                  <button
                    key={g}
                    onClick={() => handleSetGoal(g)}
                    className="p-3 text-left text-sm rounded-xl border border-border hover:border-soft-blue/30 hover:bg-soft-blue/5 transition-all"
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
                  className="pr-20 bg-secondary/50 border-border"
                />
                {goal.trim() && (
                  <Button
                    size="sm"
                    className="absolute right-1 top-1 bg-foreground text-background hover:bg-foreground/90"
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
                <div className="w-6 h-6 rounded-full bg-soft-pink/20 flex items-center justify-center">
                  <span className="text-xs font-mono text-soft-pink">2</span>
                </div>
                <h3 className="font-semibold">
                  Paste an article URL
                </h3>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground bg-secondary/40 rounded-lg px-3 py-2">
                <span>
                  Your goal:{" "}
                  <span className="text-foreground font-medium">{goal}</span>
                </span>
                <button
                  onClick={() => setStep("goal")}
                  className="ml-auto text-xs text-soft-blue hover:underline"
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
                  className="pr-28 bg-secondary/50 border-border"
                  disabled={isAnalyzing}
                />
                <Button
                  size="sm"
                  className="absolute right-1 top-1 bg-foreground text-background hover:bg-foreground/90"
                  onClick={handleAnalyze}
                  disabled={!url.trim() || isAnalyzing}
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    "Summarize"
                  )}
                </Button>
              </div>

              {isAnalyzing && (
                <div className="flex items-center justify-center gap-3 py-8">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full border-2 border-soft-blue/20 border-t-soft-blue animate-spin" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium">AI is reading...</p>
                    <p className="text-xs text-muted-foreground">
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
                  <CheckCircle2 className="w-4 h-4 text-soft-blue" />
                  <h3 className="font-semibold">Your AI Brief</h3>
                </div>
                <button
                  onClick={handleCopy}
                  className="p-2 rounded-lg hover:bg-secondary transition-colors"
                  title="Copy summary"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-soft-blue" />
                  ) : (
                    <Copy className="w-4 h-4 text-muted-foreground" />
                  )}
                </button>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground bg-secondary/40 rounded-lg px-3 py-2">
                <span>
                  Goal:{" "}
                  <span className="text-foreground font-medium">{goal}</span>
                </span>
              </div>

              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h4 className="font-semibold text-lg leading-tight">
                      {result.title}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      {result.platform !== "unknown" && (
                        <Badge variant="secondary" className="text-xs">
                          {result.platform}
                        </Badge>
                      )}
                      {result.readTime !== "-" && (
                        <span className="text-xs text-muted-foreground">
                          {result.readTime} read
                        </span>
                      )}
                    </div>
                  </div>
                  {result.relevanceScore > 0 && (
                    <div
                      className={`px-3 py-1 rounded-lg border text-sm font-semibold shrink-0 ${getScoreColor(result.relevanceScore)}`}
                    >
                      {result.relevanceScore}%
                    </div>
                  )}
                </div>

                <p className="text-muted-foreground leading-relaxed">
                  {result.summary}
                </p>

                {result.keyInsights.length > 0 && (
                  <div className="space-y-2">
                    <h5 className="text-sm font-medium text-foreground">
                      Key Insights
                    </h5>
                    <ul className="space-y-2">
                      {result.keyInsights.map((insight, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <span className="text-soft-blue shrink-0">—</span>
                          <span>{insight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleReset}
                  className="border-border"
                >
                  Try another URL
                </Button>
                <span className="text-xs text-muted-foreground">
                  Imagine this for every article, every day.
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
