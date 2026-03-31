export interface KnowledgeTopic {
  id: string;
  title: string;
  description: string;
  content: string[];
  icon: string;
}

export const knowledgeTopics: KnowledgeTopic[] = [
  {
    id: "what-is-agathos",
    title: "About Agathos",
    description: "Learn about our mission and why we built this platform.",
    content: [
      "Agathos is an independent Software-as-a-Service (SaaS) platform, privately supported by the Agathos Investments Pte Ltd group.",
      "We empower ministries, missions, and impact-driven organizations with tools to effectively connect and engage with their stakeholders.",
      "Our portfolio includes event management, software licensing, consultancy, and donor/volunteer management."
    ],
    icon: "💡"
  },
  {
    id: "project-verification",
    title: "Project Verification",
    description: "How we ensure every project on Agathos is legitimate.",
    content: [
      "Every project undergoes a thorough verification process by the Agathos team.",
      "This includes interviews with project owners, vetting of supporting documentation, and detailed plans for fund usage.",
      "Agathos is NOT a charity and does not hold any funds on behalf of project owners; funds are channeled directly to them."
    ],
    icon: "🛡️"
  },
  {
    id: "trustmark-system",
    title: "The Agathos TrustMark",
    description: "Our gold standard for transparency and accountability.",
    content: [
      "Projects meeting our gold standard are awarded the Agathos TrustMark.",
      "Criteria include: 1. Mission & Alignment, 2. Organisational Integrity, 3. Financial Transparency.",
      "4. Site Visits & Verification, 5. Impact Measurement & Reporting, 6. Ethical & Legal Compliance."
    ],
    icon: "🛡️"
  },
  {
    id: "payment-methods",
    title: "Payment & Fees",
    description: "Everything you need to know about monetary contributions.",
    content: [
      "International: Credit/Debit cards (MasterCard/Visa) and Cryptocurrency.",
      "Singapore: PayNow and Secure Funds Transfer service.",
      "Agathos does not charge platform fees for donations. However, payment service providers apply a small fee (0.8% - 3.9%).",
      "Cryptocurrency is supported through TripleA, a MAS-licensed provider."
    ],
    icon: "💰"
  },
  {
    id: "event-management",
    title: "Events FAQ",
    description: "Learn how to host and manage events on the Agathos platform.",
    content: [
      "Three accessibility modes: Public, Private (via URL), and Private with Password.",
      "Free events have no platform fees. Paid events have a 2% platform fee + processing fees.",
      "Features include: Ticketing, QR code check-ins, manual attendance tracking, and CSV exports.",
      "Organizers can gather custom responses (e.g., dietary restrictions) from attendees during the checkout process."
    ],
    icon: "🚀"
  },
  {
    id: "attendance-tracking",
    title: "Attendee & Growth",
    description: "How to track success and manage your event database.",
    content: [
      "QR code scanning is available under 'Manage Event' for ticket check-ins.",
      "Custom CSV exports allow organizers to manage attendance lists manually.",
      "Organizers can notify ticket holders automatically if event details (date, time, venue) are updated.",
      "All ticket holders must have an account on Agathos for security and tracking purposes."
    ],
    icon: "📑"
  }
];
