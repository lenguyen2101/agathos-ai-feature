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
  title: "Antigravity Kit - AI Agent Capability Expansion Toolkit",
  description:
    "A comprehensive collection of skills, rules, and workflows to supercharge AI coding assistants for Antigravity. 35+ skills, 10 rules, 57 UI Styles, production-ready workflows.",
  keywords: [
    "AI agent",
    "Antigravity kit",
    "Antigravity skill",
    "Antigravity rule",
    "Antigravity workflow",
    "Antigravity agent",
    "Antigravity ide",
    "coding assistant",
    "skills",
    "workflows",
    "developer tools",
  ],
  authors: [{ name: "VudoVN", url: "https://github.com/vudovn" }],
  openGraph: {
    title: "Antigravity Kit - AI Agent Capability Expansion Toolkit",
    description:
      "35+ skills, 10 rules, 57 UI Styles, production-ready workflows for AI coding assistants for Antigravity.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
