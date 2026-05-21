"use client";

import { useState, useRef, useEffect } from "react";
import {
  Sparkles,
  Link2,
  Target,
  Loader2,
  CheckCircle2,
  ArrowRight,
  Flame,
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
      const res = await fetch("/api/summarize", {
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

  const handleCopy = () => {
    if (!result) return;
    const text = `${result.title}\n\n${result.summary}\n\nKey Insights:\n${result.keyInsights.map((i) => `- ${i}`).join("\n")}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setUrl("");
    setResult(null);
    setStep("url");
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald bg-emerald/10 border-emerald/30";
    if (score >= 50) return "text-amber bg-amber/10 border-amber/30";
    return "text-muted-foreground bg-secondary border-border";
  };

  return (
    <section
      id="demo"
      ref={demoRef}
      className="py-24 px-6 bg-gradient-to-b from-transparent via-card/30 to-transparent"
    >
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <Badge
            variant="outline"
            className="mb-4 border-amber/30 text-amber"
          >
            <Sparkles className="w-3 h-3 mr-1" />
            Live Demo
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            See it in action
          </h2>
          <p className="text-muted-foreground">
            Set a goal, paste a URL, and watch AI extract what matters.
          </p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-8 shadow-2xl shadow-black/20">
          {step === "goal" && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber/10">
                  <Target className="w-4 h-4 text-amber" />
                </div>
                <h3 className="font-semibold">
                  Step 1: What do you want to learn?
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {presetGoals.map((g) => (
                  <button
                    key={g}
                    onClick={() => handleSetGoal(g)}
                    className="p-3 text-left text-sm rounded-xl border border-border hover:border-amber/40 hover:bg-amber/5 transition-all"
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
                    className="absolute right-1 top-1 bg-amber text-amber-foreground hover:bg-amber/90"
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
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-violet/10">
                  <Link2 className="w-4 h-4 text-violet" />
                </div>
                <h3 className="font-semibold">
                  Step 2: Paste an article URL
                </h3>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground bg-secondary/40 rounded-lg px-3 py-2">
                <Target className="w-4 h-4 text-amber shrink-0" />
                <span>
                  Your goal:{" "}
                  <span className="text-foreground font-medium">{goal}</span>
                </span>
                <button
                  onClick={() => setStep("goal")}
                  className="ml-auto text-xs text-amber hover:underline"
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
                  className="absolute right-1 top-1 bg-amber text-amber-foreground hover:bg-amber/90"
                  onClick={handleAnalyze}
                  disabled={!url.trim() || isAnalyzing}
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3 h-3 mr-1" />
                      Summarize
                    </>
                  )}
                </Button>
              </div>

              {isAnalyzing && (
                <div className="flex items-center justify-center gap-3 py-8">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full border-2 border-amber/20 border-t-amber animate-spin" />
                    <Sparkles className="w-5 h-5 text-amber absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
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
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald/10">
                    <CheckCircle2 className="w-4 h-4 text-emerald" />
                  </div>
                  <h3 className="font-semibold">Your AI Brief</h3>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopy}
                    className="p-2 rounded-lg hover:bg-secondary transition-colors"
                    title="Copy summary"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-emerald" />
                    ) : (
                      <Copy className="w-4 h-4 text-muted-foreground" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground bg-secondary/40 rounded-lg px-3 py-2">
                <Target className="w-4 h-4 text-amber shrink-0" />
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
                      {result.relevanceScore}% match
                    </div>
                  )}
                </div>

                <p className="text-muted-foreground leading-relaxed">
                  {result.summary}
                </p>

                {result.keyInsights.length > 0 && (
                  <div className="space-y-2">
                    <h5 className="text-sm font-medium text-foreground">
                      Key Insights for Your Goal:
                    </h5>
                    <ul className="space-y-2">
                      {result.keyInsights.map((insight, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <Flame className="w-4 h-4 text-amber shrink-0 mt-0.5" />
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
                  Imagine this for every article, every day, tailored to your
                  goal.
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
