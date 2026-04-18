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
    id: "create-event-flow",
    title: "Creating an Event",
    description: "Step-by-step flow for creating a new event (play.agathos.be/events/create).",
    content: [
      "The Create Event flow has 4 steps shown in a stepper at the top. Navigation buttons: Back/Previous, Next (with validation), Save (draft), Submit (only on Step 4).",

      "Step 1 — Build your event page. Fields:",
      "- Event Title: text, up to 200 characters.",
      "- Banner Photo*: click the '+' area to upload. Error if empty: 'Please upload banner photo'. Note: 'You can edit your banner photo later'.",
      "- Event Type*: dropdown. Default: Public Event. Options: Public Event, Private – Unlisted With Password, Private – Unlisted Without Password.",
      "- Ticketing Type*: dropdown. Default: Paid Event. Options: Free Event, Paid Event. For Paid Event, a warning shows: 'Platform and processing fees apply for paid tickets.'",
      "- Currency* (only when Paid Event): searchable dropdown. Default: SGD.",
      "- Timezone*: searchable dropdown. Default: (GMT +08:00) Asia/Singapore.",
      "- Event Start Time*: date-time picker with Now and OK buttons. Format: DD/MM/YYYY HH:MM.",
      "- Event End Time*: date-time picker. Error if empty: 'Please select end time'.",
      "- About Event: rich text editor (WYSIWYG) with Bold, Italic, Underline, Strikethrough, lists, tables, etc. Optional.",
      "- Location — Street Address*, City*, State/Province/Region (optional), Postal Code (optional), Country* (searchable dropdown with flags, default: Singapore).",

      "Step 2 — Add ticket. Each ticket appears as an accordion (Ticket 1, Ticket 2, ...). Use '+ Add ticket' to add more. Fields per ticket:",
      "- Ticket name*: text, up to 200 characters.",
      "- Sale Start Time: date-time picker. Not required if the toggle 'Start sale of tickets as soon as Event page goes live' is ON.",
      "- Sale End Time*: date-time picker.",
      "- Toggle: 'Start sale of tickets as soon as Event page goes live' (default OFF). When ON, Sale Start Time is disabled/not required.",
      "- Quantity*: number input.",
      "- Price* (only when Paid Event): number input with currency prefix (e.g., S$).",
      "- Toggle: 'Show remaining ticket quantity' (default OFF).",
      "- Description*: textarea, up to 120 characters.",

      "Step 3 — Registration Form (optional; can be skipped). Collect additional info during checkout.",
      "- Collection mode (radio): 'Ticket Buyer' (Recommended, faster checkout) or 'Each Attendee' (per-ticket info).",
      "- Each question has: Question Prompt* (text, up to 200 characters; error if empty: 'Please enter a question prompt.'), optional '+ Add description', Answer Type dropdown (default: Short Answer (max 200 chars); options: Name, Email, Short Answer, Long Answer (max 1000 chars), Single Choice, Checkboxes, Select From Dropdown), Required toggle (default OFF), and a 3-dot menu for actions.",
      "- Use the 'Add Question' button to add more questions.",

      "Step 4 — Review and Submit for Approval. Shows banner, event type, ticketing type, start/end time, title, about event, location with Google Maps, tickets, and registration form. Click Submit (blue button with upload icon) to send for admin review. Note: 'You can make additional edits after your event page is published.'",

      "Required fields summary:",
      "- Step 1: Banner Photo, Event Type, Ticketing Type, Currency (if Paid), Timezone, Event Start Time, Event End Time, Street Address, City, Country.",
      "- Step 2: Ticket name, Sale End Time, Quantity, Price (if Paid), Description.",
      "- Step 3: Question Prompt (for any question created).",
      "- Step 4: No input fields — review only."
    ],
    icon: "🎟️"
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
