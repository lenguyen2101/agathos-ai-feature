// Feature icons
const CodeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path fillRule="evenodd" d="M14.447 3.026a.75.75 0 0 1 .527.921l-4.5 16.5a.75.75 0 0 1-1.448-.394l4.5-16.5a.75.75 0 0 1 .921-.527ZM16.72 6.22a.75.75 0 0 1 1.06 0l5.25 5.25a.75.75 0 0 1 0 1.06l-5.25 5.25a.75.75 0 1 1-1.06-1.06L21.44 12l-4.72-4.72a.75.75 0 0 1 0-1.06Zm-9.44 0a.75.75 0 0 1 0 1.06L2.56 12l4.72 4.72a.75.75 0 0 1-1.06 1.06L.97 12.53a.75.75 0 0 1 0-1.06l5.25-5.25a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
    </svg>
);

const StackIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M11.644 1.59a.75.75 0 0 1 .712 0l9.75 5.25a.75.75 0 0 1 0 1.32l-9.75 5.25a.75.75 0 0 1-.712 0l-9.75-5.25a.75.75 0 0 1 0-1.32l9.75-5.25Z" />
        <path d="m3.265 10.602 7.668 4.129a2.25 2.25 0 0 0 2.134 0l7.668-4.13 1.37.739a.75.75 0 0 1 0 1.32l-9.75 5.25a.75.75 0 0 1-.71 0l-9.75-5.25a.75.75 0 0 1 0-1.32l1.37-.738Z" />
        <path d="m10.933 19.231-7.668-4.13-1.37.739a.75.75 0 0 0 0 1.32l9.75 5.25c.221.12.489.12.71 0l9.75-5.25a.75.75 0 0 0 0-1.32l-1.37-.738-7.668 4.13a2.25 2.25 0 0 1-2.134-.001Z" />
    </svg>
);

const BugIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path fillRule="evenodd" d="M8.478 1.6a.75.75 0 0 1 .273 1.026 3.72 3.72 0 0 0-.425 1.121c.058.058.118.114.18.168A4.491 4.491 0 0 1 12 2.25a4.491 4.491 0 0 1 3.497 1.668c.06-.054.12-.11.178-.167a3.717 3.717 0 0 0-.426-1.125.75.75 0 1 1 1.298-.752 5.22 5.22 0 0 1 .671 2.046.75.75 0 0 1-.187.582c-.241.27-.505.52-.787.749a4.494 4.494 0 0 1 .216 2.1c-.106.792-.753 1.649-1.46 1.649-.707 0-1.354-.857-1.46-1.65a4.494 4.494 0 0 1 .216-2.099c-.281-.23-.545-.48-.786-.75a.75.75 0 0 1-.187-.581 5.22 5.22 0 0 1 .67-2.047.75.75 0 0 1 1.027-.273ZM9.75 6.75a.75.75 0 0 0 0 1.5h.008a.75.75 0 0 0 0-1.5H9.75Zm3.75 0a.75.75 0 0 0 0 1.5h.007a.75.75 0 0 0 0-1.5h-.007ZM7.251 10.314a.75.75 0 0 1 0 1.06l-.126.127a2.25 2.25 0 0 0-.657 1.59v.286a2.25 2.25 0 0 0 .657 1.59l.126.127a.75.75 0 0 1-1.06 1.06l-.127-.126a3.75 3.75 0 0 1-1.096-2.65v-.286a3.75 3.75 0 0 1 1.096-2.651l.127-.127a.75.75 0 0 1 1.06 0Zm9.499 0a.75.75 0 0 1 1.06 0l.127.127a3.75 3.75 0 0 1 1.096 2.65v.286a3.75 3.75 0 0 1-1.096 2.651l-.127.127a.75.75 0 0 1-1.06-1.061l.126-.127a2.25 2.25 0 0 0 .657-1.59v-.286a2.25 2.25 0 0 0-.657-1.59l-.126-.127a.75.75 0 0 1 0-1.06Zm-7.5 3.186a.75.75 0 0 1 0 1.5h-.007a.75.75 0 0 1 0-1.5h.007Zm4.5 0a.75.75 0 0 1 0 1.5h-.008a.75.75 0 0 1 0-1.5h.008ZM12 16.5a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-1.5 0v-3a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
    </svg>
);

const DocumentIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path fillRule="evenodd" d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0 0 16.5 9h-1.875a1.875 1.875 0 0 1-1.875-1.875V5.25A3.75 3.75 0 0 0 9 1.5H5.625ZM7.5 15a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 7.5 15Zm.75 2.25a.75.75 0 0 0 0 1.5H12a.75.75 0 0 0 0-1.5H8.25Z" clipRule="evenodd" />
        <path d="M12.971 1.816A5.23 5.23 0 0 1 14.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 0 1 3.434 1.279 9.768 9.768 0 0 0-6.963-6.963Z" />
    </svg>
);

const PaletteIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path fillRule="evenodd" d="M20.599 1.5c-.376 0-.743.111-1.055.32l-5.08 3.385a18.747 18.747 0 0 0-3.471 2.987 10.04 10.04 0 0 1 4.815 4.815 18.748 18.748 0 0 0 2.987-3.472l3.386-5.079A1.902 1.902 0 0 0 20.599 1.5Zm-8.3 14.025a18.76 18.76 0 0 0 1.896-1.207 8.026 8.026 0 0 0-4.513-4.513A18.75 18.75 0 0 0 8.475 11.7l-.278.5a5.26 5.26 0 0 1 3.601 3.602l.5-.278ZM6.75 13.5A3.75 3.75 0 0 0 3 17.25a1.5 1.5 0 0 1-1.601 1.497.75.75 0 0 0-.7 1.123 5.25 5.25 0 0 0 9.8-2.62 3.75 3.75 0 0 0-3.75-3.75Z" clipRule="evenodd" />
    </svg>
);

const features = [
    {
        icon: <CodeIcon />,
        title: "Super-Coder Skills",
        description: "Directives that help the Agent write Clean Code, following SOLID and DRY principles from the first output.",
        color: "#c084fc",
        tags: ["Clean Code", "SOLID", "DRY"],
    },
    {
        icon: <StackIcon />,
        title: "Tech-Stack Specifics",
        description: "Specialized skills for Modern Web (React/Next.js, Node/NestJS, Tailwind CSS, ...) – areas where default Agents often fall short.",
        color: "#22c55e",
        tags: ["React", "Next.js", "NestJS", "..."],
    },
    {
        icon: <BugIcon />,
        title: "QA & Debugging",
        description: "Automate error review workflows and write proper Unit Tests.",
        color: "#f97316",
        tags: ["Unit Test", "Debug", "QA"],
    },
    {
        icon: <DocumentIcon />,
        title: "Documentation Auto",
        description: "Transform code into technical documentation with a single command.",
        color: "#3b82f6",
        tags: ["Auto Docs", "README", "API Docs"],
    },
    {
        icon: <PaletteIcon />,
        title: "Design Intelligence",
        description: "Integrates diverse UI style library from UI UX Pro Max.",
        color: "#ec4899",
        tags: ["50+ Styles", "21 Palettes", "UI/UX"],
    },
    {
        icon: null, // Coming soon
        title: "Coming Soon",
        description: "More features are on the way. Stay tuned for updates!",
        color: "#64748b",
        tags: ["TBD"],
        comingSoon: true,
    },
];

export default function Features() {
    return (
        <section id="features" className="py-20 px-4 border-t border-[var(--color-border)]">
            <div className="max-w-5xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <p className="text-[#c084fc] font-mono text-sm mb-3">// FEATURES</p>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        What&apos;s in the <span className="text-[#22c55e]">Kit?</span>
                    </h2>
                    <p className="text-[var(--color-text-secondary)] max-w-xl mx-auto">
                        A comprehensive toolkit to supercharge your AI coding assistant.
                    </p>
                </div>

                {/* Feature Cards Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className={`group p-6 rounded-xl transition-all ${feature.comingSoon
                                    ? "border-2 border-dashed border-[var(--color-border)] bg-transparent opacity-60"
                                    : "bg-[var(--color-bg-card)] border border-[var(--color-border)] hover:border-[var(--color-border-hover)]"
                                }`}
                        >
                            {/* Icon */}
                            <div
                                className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                                style={{
                                    backgroundColor: `${feature.color}15`,
                                    color: feature.color
                                }}
                            >
                                {feature.comingSoon ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                        <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                                    </svg>
                                ) : feature.icon}
                            </div>

                            {/* Title */}
                            <h3 className="text-lg font-semibold text-white mb-2">
                                {feature.title}
                            </h3>

                            {/* Description */}
                            <p className="text-sm text-[var(--color-text-secondary)] mb-4 leading-relaxed">
                                {feature.description}
                            </p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-1.5">
                                {feature.tags.map((tag, i) => (
                                    <span
                                        key={i}
                                        className="text-xs px-2 py-0.5 rounded bg-[#1e1e1e] font-mono"
                                        style={{ color: feature.color }}
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
