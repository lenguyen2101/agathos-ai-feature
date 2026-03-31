"use client";

import { useState } from "react";

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

// Terminal dots component
const TerminalDots = () => (
    <div className="flex items-center gap-1.5">
        <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
        <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
        <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
    </div>
);

const steps = [
    {
        title: "Navigate to project",
        command: "cd",
        args: "your-project",
        copyable: false,
    },
    {
        title: "Install the kit",
        command: "npx",
        args: "@vudovn/antigravity-kit init",
        copyable: true,
    },
    {
        title: "Start coding",
        command: "# Ready!",
        args: "Skills auto-apply",
        copyable: false,
        isComment: true,
    },
];

export default function HowItWorks() {
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

    const handleCopy = async (command: string, args: string, index: number) => {
        await navigator.clipboard.writeText(`${command} ${args}`);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    return (
        <section id="how-it-works" className="section relative overflow-hidden">
            <div className="container-content relative z-10">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <p className="text-[#c084fc] font-mono text-sm mb-3 tracking-wider">// QUICK START</p>
                    <h2 className="heading-lg mb-4">
                        Get Started in <span className="text-[#22c55e]">3 Steps</span>
                    </h2>
                    <p className="text-body max-w-xl mx-auto">
                        One command to unlock 35+ expert skills for your AI coding assistant.
                    </p>
                </div>

                {/* Terminal Window */}
                <div className="max-w-2xl mx-auto">
                    {/* Terminal Header */}
                    <div className="bg-[#1e1e1e] rounded-t-xl px-4 py-3 flex items-center justify-between border-b border-[#333]">
                        <TerminalDots />
                        <span className="text-[#6b7280] text-sm font-mono">Terminal</span>
                        <div className="w-12" /> {/* Spacer for balance */}
                    </div>

                    {/* Terminal Body */}
                    <div className="bg-[#0d0d0d] rounded-b-xl p-6 font-mono text-sm border border-t-0 border-[#333]">
                        {steps.map((step, index) => (
                            <div
                                key={index}
                                className={`group flex items-start gap-3 ${index !== steps.length - 1 ? 'mb-4' : ''
                                    }`}
                            >
                                {/* Line number */}
                                <span className="text-[#4a5568] select-none w-6 text-right shrink-0">
                                    {index + 1}
                                </span>

                                {/* Command line */}
                                <div className="flex-1 flex items-center gap-2">
                                    {/* Prompt symbol */}
                                    <span className="text-[#22c55e]">$</span>

                                    {/* Command */}
                                    <span className={step.isComment ? "text-[#6b7280]" : "text-[#c084fc]"}>
                                        {step.command}
                                    </span>

                                    {/* Arguments */}
                                    <span className={step.isComment ? "text-[#6b7280]" : "text-[#f8fafc]"}>
                                        {step.args}
                                    </span>

                                    {/* Copy button */}
                                    {step.copyable && (
                                        <button
                                            onClick={() => handleCopy(step.command, step.args, index)}
                                            className="ml-auto opacity-0 group-hover:opacity-100 p-1.5 rounded hover:bg-white/10 transition-all text-[#6b7280] hover:text-[#c084fc] cursor-pointer"
                                            aria-label="Copy to clipboard"
                                        >
                                            {copiedIndex === index ? (
                                                <span className="text-[#22c55e]"><CheckIcon /></span>
                                            ) : (
                                                <CopyIcon />
                                            )}
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}

                        {/* Cursor blink */}
                        <div className="flex items-center gap-3 mt-4">
                            <span className="text-[#4a5568] select-none w-6 text-right shrink-0">4</span>
                            <span className="text-[#22c55e]">$</span>
                            <span className="w-2 h-5 bg-[#22c55e] animate-pulse" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
