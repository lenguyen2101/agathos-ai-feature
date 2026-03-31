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
    title: "Organization & Verification",
    description: "Official guide to creating and verifying your organization.",
    content: [
      "Process to Create an Organization Page:",
      "1. Log in to Agathos and click your user profile (top-right).",
      "2. Select 'Manage Pages' from the dropdown menu.",
      "3. Click '+ Create Organization' in the bottom-left panel.",
      "4. Provide Details: Country of incorporation, charity status, and operating countries.",
      "5. Upload Documents: Registration Cert, Financial Statements (if app.), and Bank Statement.",
      "6. Risk Declaration: Disclose any sanctions or Politically Exposed Persons (PEPs).",
      "7. Submit: Review takes up to 5 business days. Status updates appear under 'Manage Pages' or via the notification bell.",
      "Statuses: 'Submission Received', 'Revisions Required' (needs edits), or 'Draft' (not yet submitted)."
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
      "Love Gift Model: Agathos operates on a 10% 'Love Gift' basis for successful projects to sustain the platform.",
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
    title: "Managing Roles",
    description: "How to manage users and ownership of your organization.",
    content: [
      "Organization Roles:",
      "- Owner: Full management of organization and all projects/events (1 per Org).",
      "- Admin: Manages specific project/event pages (1 per Project/Event).",
      "- Event Check-in: Assist with scanning tickets and registration (Multiple per event).",
      "Action: To add users, go to 'Team & Roles' and click '+ Add User'.",
      "Ownership Transfer: Owners can transfer their role to another user via the '3-dot menu'. This is irreversible; the previous owner becomes an Admin."
    ],
    icon: "📑"
  }
];
