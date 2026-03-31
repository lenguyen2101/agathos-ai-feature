// External link icon
const ExternalLinkIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
        <path fillRule="evenodd" d="M4.25 5.5a.75.75 0 0 0-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 0 0 .75-.75v-4a.75.75 0 0 1 1.5 0v4A2.25 2.25 0 0 1 12.75 17h-8.5A2.25 2.25 0 0 1 2 14.75v-8.5A2.25 2.25 0 0 1 4.25 4h5a.75.75 0 0 1 0 1.5h-5Z" clipRule="evenodd" />
        <path fillRule="evenodd" d="M6.194 12.753a.75.75 0 0 0 1.06.053L16.5 4.44v2.81a.75.75 0 0 0 1.5 0v-4.5a.75.75 0 0 0-.75-.75h-4.5a.75.75 0 0 0 0 1.5h2.553l-9.056 8.194a.75.75 0 0 0-.053 1.06Z" clipRule="evenodd" />
    </svg>
);

const credits = [
    {
        name: "UI UX Pro Max",
        description: "Design Intelligence - 50 styles, 21 palettes, 50 font pairings",
        link: "https://ui-ux-pro-max-skill.nextlevelbuilder.io/",
        badge: "Design",
        icon: "/images/ux-ui-pro-max.svg"
    },
    {
        name: "ClaudeKit",
        description: "Production-ready AI subagents and workflows",
        link: "https://claudekit.cc/",
        badge: "AI",
        icon: "/images/claudekit.png"
    },
];

export default function Credits() {
    return (
        <section id="credits" className="py-20 px-4 border-t border-[var(--color-border)]">
            <div className="max-w-3xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <p className="text-[#c084fc] font-mono text-sm mb-3">// CREDITS</p>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Built upon <span className="text-[#22c55e]">amazing</span> tools
                    </h2>
                    <p className="text-[var(--color-text-secondary)]">
                        Special thanks to the creators of these projects.
                    </p>
                </div>

                {/* Credit Cards */}
                <div className="grid md:grid-cols-2 gap-4">
                    {credits.map((credit, index) => (
                        <a
                            key={index}
                            href={credit.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group p-5 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-all cursor-pointer"
                        >
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center gap-2">
                                    <span className="text-white font-medium flex items-center gap-2">
                                        <img src={credit.icon} alt={credit.name} className="w-6 h-6" />
                                        {credit.name}
                                    </span>
                                    <span className="text-xs px-2 py-0.5 rounded bg-[#1e1e1e] text-[#64748b] font-mono">
                                        {credit.badge}
                                    </span>
                                </div>
                                <ExternalLinkIcon />
                            </div>
                            <p className="text-sm text-[var(--color-text-secondary)]">
                                {credit.description}
                            </p>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}
