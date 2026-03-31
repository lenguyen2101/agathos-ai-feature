import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Agathos AI - Modern Onboarding & Digital Receptionist",
  description: "A professional AI-powered support and onboarding platform for Agathos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
