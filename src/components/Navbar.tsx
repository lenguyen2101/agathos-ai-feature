import Link from "next/link";

const GitHubIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
);

const HeartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
        <path d="m9.653 16.915-.005-.003-.019-.01a20.759 20.759 0 0 1-1.162-.682 22.045 22.045 0 0 1-2.582-1.9C4.045 12.733 2 10.352 2 7.5a4.5 4.5 0 0 1 8-2.828A4.5 4.5 0 0 1 18 7.5c0 2.852-2.044 5.233-3.885 6.82a22.049 22.049 0 0 1-3.744 2.582l-.019.01-.005.003h-.002a.739.739 0 0 1-.69.001l-.002-.001Z" />
    </svg>
);

const navLinks = [
    { href: "#features", label: "Features" },
    { href: "#skills", label: "Skills" },
    { href: "#how-it-works", label: "Install" },
];

export default function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--color-border)]">
            <div className="bg-[var(--color-bg-navbar)] backdrop-blur-xl">
                <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/#hero" className="flex items-center gap-2 cursor-pointer group">
                        <span className="text-[#64748b] font-mono text-sm">~/</span>
                        <span className="font-mono font-semibold text-white group-hover:text-[var(--color-accent)] transition-colors">
                            antigravity-kit
                        </span>
                    </Link>

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className="px-3 py-1.5 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors cursor-pointer font-mono"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>

                    {/* Right side actions */}
                    <div className="flex items-center gap-2">
                        {/* Donate link */}
                        <a
                            href="https://img.vietqr.io/image/mbbank-0779440918-compact2.jpg"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md bg-gradient-to-r from-pink-500 to-red-500 text-white hover:from-pink-600 hover:to-red-600 transition-all cursor-pointer shadow-lg shadow-pink-500/20"
                        >
                            <HeartIcon />
                            <span>Donate</span>
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
}

