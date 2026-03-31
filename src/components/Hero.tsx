"use client";

import { useState, useEffect } from "react";

// Icons
const CopyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
        <path d="M7 3.5A1.5 1.5 0 0 1 8.5 2h3.879a1.5 1.5 0 0 1 1.06.44l3.122 3.12A1.5 1.5 0 0 1 17 6.622V12.5a1.5 1.5 0 0 1-1.5 1.5h-1v-3.379a3 3 0 0 0-.879-2.121L10.5 5.379A3 3 0 0 0 8.379 4.5H7v-1Z" />
        <path d="M4.5 6A1.5 1.5 0 0 0 3 7.5v9A1.5 1.5 0 0 0 4.5 18h7a1.5 1.5 0 0 0 1.5-1.5v-5.879a1.5 1.5 0 0 0-.44-1.06L9.44 6.439A1.5 1.5 0 0 0 8.378 6H4.5Z" />
    </svg>
);

const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
    </svg>
);

const ArrowRightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
        <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
    </svg>
);

const GitHubIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
);

// Terminal dots
const TerminalDots = () => (
    <div className="flex items-center gap-1.5">
        <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
        <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
        <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
    </div>
);

export default function Hero() {
    const [copied, setCopied] = useState(false);
    const [scrollY, setScrollY] = useState(0);
    const [typedText, setTypedText] = useState("");
    const [showCursor, setShowCursor] = useState(true);
    const installCommand = "npx @vudovn/antigravity-kit init";
    const fullCommand = "@vudovn/antigravity-kit init";

    // Parallax scroll effect
    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Typing effect
    useEffect(() => {
        let index = 0;
        const timer = setInterval(() => {
            if (index <= fullCommand.length) {
                setTypedText(fullCommand.slice(0, index));
                index++;
            } else {
                setShowCursor(false);
                clearInterval(timer);
            }
        }, 80);
        return () => clearInterval(timer);
    }, []);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(installCommand);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section id="hero" className="min-h-screen flex items-center justify-center pt-14 pb-16 px-4 relative overflow-hidden">
            {/* Aurora Background Effect */}
            <div className="aurora-blob aurora-blob-1" />
            <div className="aurora-blob aurora-blob-2" />
            <div className="aurora-blob aurora-blob-3" />

            {/* Floating Tags - Scattered randomly with parallax */}
            {/* Top area */}
            <div className="hidden lg:block absolute top-[15%] left-[5%] animate-float" style={{ transform: `translateY(${scrollY * 0.1}px)` }}>
                <div className="px-3 py-1.5 rounded-full bg-[#c084fc]/10 border border-[#c084fc]/30 backdrop-blur-sm">
                    <span className="text-xs font-medium text-[#c084fc]">Clean Code</span>
                </div>
            </div>

            <div className="hidden xl:block absolute top-[12%] left-[18%] animate-float" style={{ animationDelay: '2.2s' }}>
                <div className="px-3 py-1.5 rounded-full bg-[#a855f7]/10 border border-[#a855f7]/30 backdrop-blur-sm">
                    <span className="text-xs font-medium text-[#a855f7]">TypeScript</span>
                </div>
            </div>

            <div className="hidden lg:block absolute top-[18%] right-[8%] animate-float" style={{ animationDelay: '0.5s', transform: `translateY(${scrollY * -0.15}px)` }}>
                <div className="px-3 py-1.5 rounded-full bg-[#22d3ee]/10 border border-[#22d3ee]/30 backdrop-blur-sm">
                    <span className="text-xs font-medium text-[#22d3ee]">React</span>
                </div>
            </div>

            <div className="hidden xl:block absolute top-[10%] right-[22%] animate-float" style={{ animationDelay: '3.8s' }}>
                <div className="px-3 py-1.5 rounded-full bg-[#84cc16]/10 border border-[#84cc16]/30 backdrop-blur-sm">
                    <span className="text-xs font-medium text-[#84cc16]">Prisma</span>
                </div>
            </div>

            {/* Upper middle */}
            <div className="hidden lg:block absolute top-[30%] left-[3%] animate-float" style={{ animationDelay: '1.5s' }}>
                <div className="px-3 py-1.5 rounded-full bg-[#22c55e]/10 border border-[#22c55e]/30 backdrop-blur-sm">
                    <span className="text-xs font-medium text-[#22c55e]">SOLID</span>
                </div>
            </div>

            <div className="hidden 2xl:block absolute top-[25%] left-[12%] animate-float" style={{ animationDelay: '4.5s' }}>
                <div className="px-3 py-1.5 rounded-full bg-[#06b6d4]/10 border border-[#06b6d4]/30 backdrop-blur-sm">
                    <span className="text-xs font-medium text-[#06b6d4]">Debug</span>
                </div>
            </div>

            <div className="hidden lg:block absolute top-[28%] right-[5%] animate-float" style={{ animationDelay: '2s' }}>
                <div className="px-3 py-1.5 rounded-full bg-[#f8fafc]/10 border border-[#f8fafc]/30 backdrop-blur-sm">
                    <span className="text-xs font-medium text-[#f8fafc]">Next.js</span>
                </div>
            </div>

            <div className="hidden xl:block absolute top-[35%] right-[15%] animate-float" style={{ animationDelay: '0.8s' }}>
                <div className="px-3 py-1.5 rounded-full bg-[#f43f5e]/10 border border-[#f43f5e]/30 backdrop-blur-sm">
                    <span className="text-xs font-medium text-[#f43f5e]">API Docs</span>
                </div>
            </div>

            {/* Middle area */}
            <div className="hidden lg:block absolute top-[45%] left-[2%] animate-float" style={{ animationDelay: '3s' }}>
                <div className="px-3 py-1.5 rounded-full bg-[#3b82f6]/10 border border-[#3b82f6]/30 backdrop-blur-sm">
                    <span className="text-xs font-medium text-[#3b82f6]">DRY</span>
                </div>
            </div>

            <div className="hidden 2xl:block absolute top-[50%] left-[10%] animate-float" style={{ animationDelay: '1.2s' }}>
                <div className="px-3 py-1.5 rounded-full bg-[#8b5cf6]/10 border border-[#8b5cf6]/30 backdrop-blur-sm">
                    <span className="text-xs font-medium text-[#8b5cf6]">50+ Styles</span>
                </div>
            </div>

            <div className="hidden lg:block absolute top-[48%] right-[3%] animate-float" style={{ animationDelay: '1s' }}>
                <div className="px-3 py-1.5 rounded-full bg-[#ec4899]/10 border border-[#ec4899]/30 backdrop-blur-sm">
                    <span className="text-xs font-medium text-[#ec4899]">UI/UX</span>
                </div>
            </div>

            {/* Lower middle */}
            <div className="hidden lg:block absolute bottom-[35%] left-[6%] animate-float" style={{ animationDelay: '2.5s' }}>
                <div className="px-3 py-1.5 rounded-full bg-[#f97316]/10 border border-[#f97316]/30 backdrop-blur-sm">
                    <span className="text-xs font-medium text-[#f97316]">Unit Test</span>
                </div>
            </div>

            <div className="hidden xl:block absolute bottom-[40%] left-[15%] animate-float" style={{ animationDelay: '4s' }}>
                <div className="px-3 py-1.5 rounded-full bg-[#14b8a6]/10 border border-[#14b8a6]/30 backdrop-blur-sm">
                    <span className="text-xs font-medium text-[#14b8a6]">Auto Docs</span>
                </div>
            </div>

            <div className="hidden lg:block absolute bottom-[38%] right-[6%] animate-float" style={{ animationDelay: '3.5s' }}>
                <div className="px-3 py-1.5 rounded-full bg-[#eab308]/10 border border-[#eab308]/30 backdrop-blur-sm">
                    <span className="text-xs font-medium text-[#eab308]">NestJS</span>
                </div>
            </div>

            <div className="hidden 2xl:block absolute bottom-[32%] right-[18%] animate-float" style={{ animationDelay: '0.3s' }}>
                <div className="px-3 py-1.5 rounded-full bg-[#0ea5e9]/10 border border-[#0ea5e9]/30 backdrop-blur-sm">
                    <span className="text-xs font-medium text-[#0ea5e9]">Docker</span>
                </div>
            </div>

            {/* Bottom area */}
            <div className="hidden lg:block absolute bottom-[22%] left-[4%] animate-float" style={{ animationDelay: '1.8s' }}>
                <div className="px-3 py-1.5 rounded-full bg-[#10b981]/10 border border-[#10b981]/30 backdrop-blur-sm">
                    <span className="text-xs font-medium text-[#10b981]">QA</span>
                </div>
            </div>

            <div className="hidden xl:block absolute bottom-[18%] left-[12%] animate-float" style={{ animationDelay: '2.8s' }}>
                <div className="px-3 py-1.5 rounded-full bg-[#d946ef]/10 border border-[#d946ef]/30 backdrop-blur-sm">
                    <span className="text-xs font-medium text-[#d946ef]">21 Palettes</span>
                </div>
            </div>

            <div className="hidden lg:block absolute bottom-[20%] right-[4%] animate-float" style={{ animationDelay: '4.2s' }}>
                <div className="px-3 py-1.5 rounded-full bg-[#6366f1]/10 border border-[#6366f1]/30 backdrop-blur-sm">
                    <span className="text-xs font-medium text-[#6366f1]">README</span>
                </div>
            </div>

            <div className="hidden 2xl:block absolute bottom-[12%] right-[20%] animate-float" style={{ animationDelay: '1.5s' }}>
                <div className="px-3 py-1.5 rounded-full bg-[#fb923c]/10 border border-[#fb923c]/30 backdrop-blur-sm">
                    <span className="text-xs font-medium text-[#fb923c]">Tailwind</span>
                </div>
            </div>

            <div className="max-w-4xl mx-auto text-center relative z-10">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-bg-card)] border border-[var(--color-border)] mb-8">
                    <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
                    <span className="text-sm text-[var(--color-text-secondary)] font-mono">AI Agent Toolkit for Antigravity IDE</span>
                </div>

                {/* Headline */}
                <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                    <span className="animate-gradient-text">Supercharge</span> your AI
                    <br />
                    coding assistant
                </h1>

                {/* Subheadline */}
                <p className="text-lg md:text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto mb-10">
                    A collection of <span className="text-[#22c55e]">35+ Skills</span>,{" "}
                    <span className="text-[#3b82f6]">Rules</span>, and{" "}
                    <span className="text-[#f97316]">UI Style</span> to transform
                    your AI agent into a domain expert.
                </p>

                {/* Install Command */}
                <div className="max-w-lg mx-auto mb-8">
                    <div className="bg-[#0d0d0d] rounded-lg border border-[var(--color-border)] overflow-hidden">
                        {/* Terminal Header */}
                        <div className="px-4 py-2.5 border-b border-[var(--color-border)] flex items-center justify-between">
                            <TerminalDots />
                            <span className="text-xs text-[#64748b] font-mono">Terminal</span>
                            <div className="w-10" />
                        </div>

                        {/* Command with typing effect */}
                        <div className="p-4 flex items-center justify-between gap-4">
                            <code className="font-mono text-sm md:text-base">
                                <span className="text-[#22c55e]">$</span>{" "}
                                <span className="text-[#c084fc]">npx</span>{" "}
                                <span className="text-white">{typedText}</span>
                                {showCursor && <span className="typing-cursor" />}
                            </code>
                            <button
                                onClick={handleCopy}
                                className="p-2 rounded-md hover:bg-white/10 transition-colors text-[#64748b] hover:text-[#c084fc] cursor-pointer"
                                aria-label="Copy to clipboard"
                            >
                                {copied ? (
                                    <span className="text-[#22c55e]"><CheckIcon /></span>
                                ) : (
                                    <CopyIcon />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
                    <a
                        href="#how-it-works"
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#c084fc] hover:bg-[#d8b4fe] text-black font-medium rounded-lg transition-colors cursor-pointer"
                    >
                        Get Started
                        <ArrowRightIcon />
                    </a>
                    <a
                        href="https://github.com/vudovn/antigravity-kit"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-transparent border border-[var(--color-border)] hover:border-[var(--color-accent)] text-white font-medium rounded-lg transition-colors cursor-pointer"
                    >
                        <GitHubIcon />
                        View on GitHub
                    </a>
                </div>

                {/* Mobile Tags - only visible on smaller screens */}
                <div className="flex flex-wrap justify-center gap-2 max-w-sm mx-auto lg:hidden">
                    <span className="px-3 py-1.5 rounded-full bg-[#c084fc]/10 border border-[#c084fc]/30 text-xs font-medium text-[#c084fc]">Clean Code</span>
                    <span className="px-3 py-1.5 rounded-full bg-[#22c55e]/10 border border-[#22c55e]/30 text-xs font-medium text-[#22c55e]">SOLID</span>
                    <span className="px-3 py-1.5 rounded-full bg-[#22d3ee]/10 border border-[#22d3ee]/30 text-xs font-medium text-[#22d3ee]">React</span>
                    <span className="px-3 py-1.5 rounded-full bg-[#ec4899]/10 border border-[#ec4899]/30 text-xs font-medium text-[#ec4899]">UI/UX</span>
                </div>
            </div>
        </section>
    );
}
