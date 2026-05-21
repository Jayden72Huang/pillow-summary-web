import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover" as const,
  themeColor: "#1a1a2e",
};

export const metadata: Metadata = {
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Pillow Summary",
  },
  title: "Pillow Summary - AI Daily Knowledge Brief",
  description:
    "Stop saving articles you'll never read. Set a learning goal, and get a personalized 3-minute AI knowledge brief every day.",
  keywords: [
    "AI summary",
    "read later",
    "knowledge brief",
    "learning goals",
    "content digest",
    "Pocket alternative",
    "AI reading assistant",
  ],
  openGraph: {
    title: "Pillow Summary - Stop Saving. Start Learning.",
    description:
      "Set a learning goal. Save articles. Get a 3-minute AI knowledge brief daily. The smart alternative to Pocket & Omnivore.",
    type: "website",
    siteName: "Pillow Summary",
    url: "https://pillow-summary-web.vercel.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pillow Summary - Stop Saving. Start Learning.",
    description:
      "Your read-later graveyard ends here. AI reads your saved articles and gives you a 3-min daily brief.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col env-safe-area">{children}</body>
    </html>
  );
}
