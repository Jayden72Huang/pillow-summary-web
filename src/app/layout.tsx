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

export const metadata: Metadata = {
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
      "Set a learning goal. Save articles. Get a 3-minute AI knowledge brief daily.",
    type: "website",
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
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
