const GitHubIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
);

const links = [
    { label: "Features", href: "#features" },
    { label: "Skills", href: "#skills" },
    { label: "Install", href: "#how-it-works" },
    { label: "Credits", href: "#credits" },
];

const resources = [
    { label: "Documentation", href: "https://github.com/vudovn/antigravity-kit#readme" },
    { label: "GitHub", href: "https://github.com/vudovn/antigravity-kit" },
    { label: "Issues", href: "https://github.com/vudovn/antigravity-kit/issues" },
];

export default function Footer() {
    return (
        <footer className="py-12 px-4 border-t border-[var(--color-border)]">
            <div className="max-w-5xl mx-auto">
                <div className="grid md:grid-cols-4 gap-8 mb-12">
                    {/* Brand */}
                    <div className="md:col-span-2">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="text-[#64748b] font-mono text-sm">~/</span>
                            <span className="font-mono font-semibold text-white">antigravity-kit</span>
                        </div>
                        <p className="text-sm text-[var(--color-text-secondary)] mb-4 max-w-sm">
                            A comprehensive collection of skills, rules, and workflows to supercharge your AI coding assistant.
                        </p>
                        <a
                            href="https://github.com/vudovn/antigravity-kit"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-white transition-colors"
                        >
                            <GitHubIcon />
                            <span className="text-sm">Star on GitHub</span>
                        </a>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="font-mono text-sm text-[#64748b] mb-4">Links</h4>
                        <ul className="space-y-2">
                            {links.map((link) => (
                                <li key={link.href}>
                                    <a
                                        href={link.href}
                                        className="text-sm text-[var(--color-text-secondary)] hover:text-white transition-colors"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 className="font-mono text-sm text-[#64748b] mb-4">Resources</h4>
                        <ul className="space-y-2">
                            {resources.map((link) => (
                                <li key={link.href}>
                                    <a
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-[var(--color-text-secondary)] hover:text-white transition-colors"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-[var(--color-border)]">
                    <p className="text-sm text-[#64748b]">
                        © {new Date().getFullYear()} Antigravity Kit. MIT License.
                    </p>
                    <p className="text-sm text-[#64748b]">
                        Made with <span className="text-red-500">♥</span> by{" "}
                        <a
                            href="https://github.com/vudovn"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white hover:text-[var(--color-accent)] transition-colors"
                        >
                            VudoVN
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
}
