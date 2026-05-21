import { NextRequest, NextResponse } from "next/server";

// --- Multi-provider config ---
// Set AI_PROVIDER env var to: "anthropic" | "openai" | "deepseek" | "stepfun"
// Then set the corresponding API key env var.

interface ProviderConfig {
  apiUrl: string;
  apiKey: string | undefined;
  model: string;
  headers: () => Record<string, string>;
  parseResponse: (data: Record<string, unknown>) => string;
}

function getProvider(): ProviderConfig | null {
  const provider = (process.env.AI_PROVIDER || "auto").toLowerCase();

  const providers: Record<string, () => ProviderConfig> = {
    anthropic: () => ({
      apiUrl: "https://api.anthropic.com/v1/messages",
      apiKey: process.env.ANTHROPIC_API_KEY,
      model: process.env.AI_MODEL || "claude-sonnet-4-20250514",
      headers: () => ({
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY!,
        "anthropic-version": "2023-06-01",
      }),
      parseResponse: (data) => {
        const content = data.content as Array<{ text: string }>;
        return content[0].text;
      },
    }),
    openai: () => ({
      apiUrl: process.env.OPENAI_BASE_URL || "https://api.openai.com/v1/chat/completions",
      apiKey: process.env.OPENAI_API_KEY,
      model: process.env.AI_MODEL || "gpt-4o",
      headers: () => ({
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      }),
      parseResponse: (data) => {
        const choices = data.choices as Array<{ message: { content: string } }>;
        return choices[0].message.content;
      },
    }),
    deepseek: () => ({
      apiUrl: "https://api.deepseek.com/chat/completions",
      apiKey: process.env.DEEPSEEK_API_KEY,
      model: process.env.AI_MODEL || "deepseek-chat",
      headers: () => ({
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
      }),
      parseResponse: (data) => {
        const choices = data.choices as Array<{ message: { content: string } }>;
        return choices[0].message.content;
      },
    }),
    stepfun: () => ({
      apiUrl: "https://api.stepfun.com/v1/chat/completions",
      apiKey: process.env.STEPFUN_API_KEY,
      model: process.env.AI_MODEL || "step-2-16k",
      headers: () => ({
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.STEPFUN_API_KEY}`,
      }),
      parseResponse: (data) => {
        const choices = data.choices as Array<{ message: { content: string } }>;
        return choices[0].message.content;
      },
    }),
  };

  if (provider === "auto") {
    if (process.env.DEEPSEEK_API_KEY) return providers.deepseek();
    if (process.env.OPENAI_API_KEY) return providers.openai();
    if (process.env.STEPFUN_API_KEY) return providers.stepfun();
    if (process.env.ANTHROPIC_API_KEY) return providers.anthropic();
    return null;
  }

  const factory = providers[provider];
  if (!factory) return null;
  const config = factory();
  return config.apiKey ? config : null;
}

const SUMMARY_PROMPT = (goal: string, url: string, platform: string, content: string) => `You are an AI reading assistant. Analyze this article and provide a summary tailored to the user's learning goal.

User's learning goal: "${goal}"
Article URL: ${url}
Platform: ${platform}

Article content:
${content}

Respond in this exact JSON format (no markdown, no code fences, just raw JSON):
{
  "title": "Article title (extract from content or URL)",
  "summary": "2-3 sentence summary focused on how this content relates to the user's learning goal. Be specific and actionable.",
  "keyInsights": ["insight 1 relevant to the goal", "insight 2", "insight 3"],
  "relevanceScore": 75,
  "readTime": "5 min"
}

Rules:
- relevanceScore: 0-100, how relevant this article is to the user's goal
- keyInsights: 2-4 specific takeaways that help with the goal
- readTime: estimated original article read time
- summary: focus on WHY this matters for the user's specific goal
- Be concise but insightful`;

function detectPlatform(url: string): string {
  const host = new URL(url).hostname.toLowerCase();
  if (host.includes("youtube.com") || host.includes("youtu.be")) return "YouTube";
  if (host.includes("twitter.com") || host.includes("x.com")) return "X / Twitter";
  if (host.includes("medium.com")) return "Medium";
  if (host.includes("reddit.com")) return "Reddit";
  if (host.includes("substack.com") || host.includes("beehiiv.com")) return "Newsletter";
  if (host.includes("github.com")) return "GitHub";
  if (host.includes("arxiv.org")) return "arXiv";
  return new URL(url).hostname.replace("www.", "");
}

async function fetchPageContent(url: string): Promise<string> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);

  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; PillowSummary/1.0; +https://pillowsummary.com)",
        Accept: "text/html,application/xhtml+xml,*/*",
      },
      signal: controller.signal,
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const html = await res.text();
    const text = html
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
      .replace(/<nav[^>]*>[\s\S]*?<\/nav>/gi, "")
      .replace(/<footer[^>]*>[\s\S]*?<\/footer>/gi, "")
      .replace(/<header[^>]*>[\s\S]*?<\/header>/gi, "")
      .replace(/<[^>]+>/g, " ")
      .replace(/&nbsp;/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/\s+/g, " ")
      .trim();

    return text.slice(0, 8000);
  } finally {
    clearTimeout(timeout);
  }
}

interface SummaryResult {
  title: string;
  summary: string;
  keyInsights: string[];
  relevanceScore: number;
  readTime: string;
}

async function callAI(
  content: string,
  goal: string,
  url: string,
  platform: string,
  provider: ProviderConfig
): Promise<SummaryResult> {
  const prompt = SUMMARY_PROMPT(goal, url, platform, content);

  let body: string;
  if (provider.apiUrl.includes("anthropic.com")) {
    body = JSON.stringify({
      model: provider.model,
      max_tokens: 1024,
      messages: [{ role: "user", content: prompt }],
    });
  } else {
    body = JSON.stringify({
      model: provider.model,
      max_tokens: 1024,
      temperature: 0.3,
      messages: [{ role: "user", content: prompt }],
    });
  }

  const res = await fetch(provider.apiUrl, {
    method: "POST",
    headers: provider.headers(),
    body,
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`AI API error (${res.status}): ${err.slice(0, 200)}`);
  }

  const data = await res.json();
  const text = provider.parseResponse(data);

  try {
    return JSON.parse(text);
  } catch {
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) return JSON.parse(jsonMatch[0]);
    throw new Error("Failed to parse AI response");
  }
}

function generateFallbackSummary(
  content: string,
  goal: string,
  url: string,
  platform: string
): SummaryResult {
  const words = content.split(/\s+/).length;
  const readTime = `${Math.max(1, Math.round(words / 200))} min`;

  const titleMatch = content.match(/^(.{10,80}?)[\.\!\?\n]/);
  const title = titleMatch
    ? titleMatch[1].trim()
    : new URL(url).pathname.split("/").pop() || "Untitled";

  const goalWords = goal.toLowerCase().split(/\s+/);
  const contentLower = content.toLowerCase();
  let matchCount = 0;
  for (const w of goalWords) {
    if (w.length > 3 && contentLower.includes(w)) matchCount++;
  }
  const relevanceScore = Math.min(
    95,
    Math.max(20, Math.round((matchCount / Math.max(goalWords.length, 1)) * 80 + 15))
  );

  return {
    title,
    summary: `This ${platform} content covers topics that may relate to your goal of "${goal}". The article contains approximately ${words} words of content. For a detailed AI-powered analysis, please set one of: DEEPSEEK_API_KEY, OPENAI_API_KEY, STEPFUN_API_KEY, or ANTHROPIC_API_KEY.`,
    keyInsights: [
      "Content has been fetched and is ready for analysis",
      `Estimated ${readTime} read time`,
      `Preliminary relevance score: ${relevanceScore}%`,
    ],
    relevanceScore,
    readTime,
  };
}

export async function POST(req: NextRequest) {
  try {
    const { url, goal } = await req.json();

    if (!url || !goal) {
      return NextResponse.json({ error: "URL and goal are required" }, { status: 400 });
    }

    let parsedUrl: URL;
    try {
      parsedUrl = new URL(url);
    } catch {
      return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
    }

    const platform = detectPlatform(parsedUrl.toString());
    const content = await fetchPageContent(parsedUrl.toString());

    if (!content || content.length < 50) {
      return NextResponse.json(
        { error: "Could not extract content from this URL" },
        { status: 422 }
      );
    }

    const provider = getProvider();
    let result: SummaryResult;

    if (provider) {
      result = await callAI(content, goal, parsedUrl.toString(), platform, provider);
    } else {
      result = generateFallbackSummary(content, goal, parsedUrl.toString(), platform);
    }

    return NextResponse.json({ ...result, platform });
  } catch (error) {
    console.error("Summarize error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to analyze URL" },
      { status: 500 }
    );
  }
}
