export type QuestionType = 'text' | 'dropdown' | 'yes-no' | 'textarea' | 'multi-select' | 'upload';

export interface Question {
  id: string;
  question: string;
  type: QuestionType;
  options?: string[];
  placeholder?: string;
  section: string;
  groupId: string; // New field for grouping
  dependsOn?: {
    questionId: string;
    value: string;
  };
  redFlagValue?: string;
  required?: boolean;
}

const COUNTRY_LIST = ["Singapore", "Malaysia", "Indonesia", "Thailand", "Philippines", "Vietnam", "Cambodia", "Myanmar", "Laos", "India", "Sri Lanka", "Bangladesh", "Nepal", "Hong Kong", "Taiwan", "Japan", "South Korea", "Australia", "New Zealand", "United Kingdom", "United States", "Canada", "Others"];

const CAUSE_LIST = ["Healthcare", "Education", "Poverty Alleviation", "Arts & Culture", "Animal Welfare", "Environment", "Religious", "Disabilities", "Elderly", "Youth"];

export const onboardingQuestions: Question[] = [
  // ═══════════════════════════════════════════
  // SECTION 1: TRIAGE (1 question)
  // ═══════════════════════════════════════════
  {
    id: "onboarding-type",
    question: "How are you starting your project today?",
    type: "dropdown",
    options: ["As an Individual", "As an Organisation"],
    section: "Triage",
    groupId: "triage",
    required: true
  },

  // ═══════════════════════════════════════════
  // SECTION 2A: ORGANISATION BRANCH (20 questions)
  // ═══════════════════════════════════════════

  // --- Organisation Profile ---
  {
    id: "org-name",
    question: "What is the official name of your Organisation?",
    type: "text",
    placeholder: "Legal entity name",
    section: "Organisation Profile",
    groupId: "org-identity",
    dependsOn: { questionId: "onboarding-type", value: "As an Organisation" },
    required: true
  },
  {
    id: "org-country",
    question: "Country of Incorporation",
    type: "dropdown",
    options: COUNTRY_LIST,
    section: "Organisation Profile",
    groupId: "org-identity",
    dependsOn: { questionId: "onboarding-type", value: "As an Organisation" },
    required: true
  },
  {
    id: "is-charity",
    question: "Is your organisation a registered charity/non-profit in this country?",
    type: "yes-no",
    section: "Organisation Profile",
    groupId: "org-identity",
    dependsOn: { questionId: "onboarding-type", value: "As an Organisation" },
    required: true
  },
  {
    id: "org-nature",
    question: "What is the nature of your organisation's work?",
    type: "textarea",
    placeholder: "Detailed description of your mission and activities",
    section: "Organisation Profile",
    groupId: "org-mission",
    dependsOn: { questionId: "onboarding-type", value: "As an Organisation" },
    required: true
  },
  {
    id: "org-categories",
    question: "Main Causes Supported (Select up to 3)",
    type: "multi-select",
    options: CAUSE_LIST,
    section: "Organisation Profile",
    groupId: "org-scope",
    dependsOn: { questionId: "onboarding-type", value: "As an Organisation" }
  },
  {
    id: "org-operation-countries",
    question: "Countries of Operation",
    type: "multi-select",
    options: COUNTRY_LIST,
    section: "Organisation Profile",
    groupId: "org-scope",
    dependsOn: { questionId: "onboarding-type", value: "As an Organisation" }
  },
  {
    id: "org-size",
    question: "Size of Organisation",
    type: "dropdown",
    options: ["< 5 members", "5-10 members", "10-25 members", "25-50 members", "> 50 members"],
    section: "Organisation Profile",
    groupId: "org-scope",
    dependsOn: { questionId: "onboarding-type", value: "As an Organisation" }
  },
  {
    id: "tax-deductible",
    question: "Can you offer tax deductions to donors? (Singapore only)",
    type: "yes-no",
    section: "Organisation Profile",
    groupId: "org-scope",
    dependsOn: { questionId: "org-country", value: "Singapore" }
  },
  {
    id: "org-cause-description",
    question: "Tell us in more detail about the cause your organisation supports (max 500 words)",
    type: "textarea",
    placeholder: "Describe your organisation's mission, impact, and the communities you serve...",
    section: "Organisation Profile",
    groupId: "org-context",
    dependsOn: { questionId: "onboarding-type", value: "As an Organisation" }
  },
  {
    id: "org-other-platforms",
    question: "Has your organisation registered with other giving platforms? If so, please list them.",
    type: "text",
    placeholder: "e.g. Give.asia, GlobalGiving, GoFundMe",
    section: "Organisation Profile",
    groupId: "org-links",
    dependsOn: { questionId: "onboarding-type", value: "As an Organisation" }
  },
  {
    id: "org-website-social",
    question: "Organisation website and social media links",
    type: "textarea",
    placeholder: "Website URL, Facebook, Instagram, LinkedIn, etc. (one per line)",
    section: "Organisation Profile",
    groupId: "org-links",
    dependsOn: { questionId: "onboarding-type", value: "As an Organisation" }
  },
  {
    id: "org-referral",
    question: "How did you come to know about Agathos?",
    type: "dropdown",
    options: ["Social Media", "Word of Mouth", "Conference/Events", "Others"],
    section: "Organisation Profile",
    groupId: "org-links",
    dependsOn: { questionId: "onboarding-type", value: "As an Organisation" }
  },

  // --- Compliance Documents ---
  {
    id: "org-uen",
    question: "Company Registration Number (e.g., UEN in Singapore)",
    type: "text",
    placeholder: "Enter registration ID",
    section: "Compliance Documents",
    groupId: "compliance-1",
    dependsOn: { questionId: "onboarding-type", value: "As an Organisation" },
    required: true
  },
  {
    id: "org-cert-upload",
    question: "Upload Registration Certificate (PDF/Image)",
    type: "upload",
    section: "Compliance Documents",
    groupId: "compliance-1",
    dependsOn: { questionId: "onboarding-type", value: "As an Organisation" },
    required: true
  },
  {
    id: "org-financials-upload",
    question: "Upload latest Financial Statements or Annual Report",
    type: "upload",
    section: "Compliance Documents",
    groupId: "compliance-2",
    dependsOn: { questionId: "onboarding-type", value: "As an Organisation" },
    required: true
  },
  {
    id: "org-bank-statement-upload",
    question: "Upload a Bank Statement showing the name of the account (PDF)",
    type: "upload",
    section: "Compliance Documents",
    groupId: "compliance-2",
    dependsOn: { questionId: "onboarding-type", value: "As an Organisation" },
    required: true
  },

  // --- Risk Declaration ---
  {
    id: "sanctions-check",
    question: "Any sanctions or adverse media on company, owners, or directors?",
    type: "yes-no",
    section: "Risk Declaration",
    groupId: "risk",
    redFlagValue: "Yes",
    dependsOn: { questionId: "onboarding-type", value: "As an Organisation" },
    required: true
  },
  {
    id: "sanctions-details",
    question: "Please provide brief details about the sanctions or adverse media",
    type: "textarea",
    placeholder: "Explain the nature and status of any sanctions or adverse media...",
    section: "Risk Declaration",
    groupId: "risk",
    dependsOn: { questionId: "sanctions-check", value: "Yes" },
    required: true
  },
  {
    id: "pep-check",
    question: "Any Politically Exposed Persons (PEPs) involved?",
    type: "yes-no",
    section: "Risk Declaration",
    groupId: "risk",
    redFlagValue: "Yes",
    dependsOn: { questionId: "onboarding-type", value: "As an Organisation" },
    required: true
  },

  // ═══════════════════════════════════════════
  // SECTION 2B: INDIVIDUAL BRANCH (8 questions)
  // ═══════════════════════════════════════════
  {
    id: "user-name",
    question: "Full Name (Legal)",
    type: "text",
    section: "Personal Profile",
    groupId: "ind-profile",
    dependsOn: { questionId: "onboarding-type", value: "As an Individual" },
    required: true
  },
  {
    id: "individual-country",
    question: "Country of Residence",
    type: "dropdown",
    options: COUNTRY_LIST,
    section: "Personal Profile",
    groupId: "ind-profile",
    dependsOn: { questionId: "onboarding-type", value: "As an Individual" }
  },
  {
    id: "individual-referral",
    question: "How did you come to know about Agathos?",
    type: "dropdown",
    options: ["Social Media", "Word of Mouth", "Conference/Events", "Others"],
    section: "Personal Profile",
    groupId: "ind-profile",
    dependsOn: { questionId: "onboarding-type", value: "As an Individual" }
  },
  {
    id: "ic-upload-front",
    question: "Upload Identity Card (Front)",
    type: "upload",
    section: "Personal Profile",
    groupId: "ind-identity",
    dependsOn: { questionId: "onboarding-type", value: "As an Individual" },
    required: true
  },
  {
    id: "ic-upload-back",
    question: "Upload Identity Card (Back)",
    type: "upload",
    section: "Personal Profile",
    groupId: "ind-identity",
    dependsOn: { questionId: "onboarding-type", value: "As an Individual" },
    required: true
  },
  {
    id: "individual-causes",
    question: "Which causes are you passionate about? (Max 3)",
    type: "multi-select",
    options: CAUSE_LIST,
    section: "Personal Profile",
    groupId: "ind-mission",
    dependsOn: { questionId: "onboarding-type", value: "As an Individual" }
  },
  {
    id: "cause-connection",
    question: "How are you connected to this cause?",
    type: "dropdown",
    options: ["I run this project", "Staff or Volunteer", "Beneficiary", "Friend or Family", "Supporter", "Other"],
    section: "Personal Profile",
    groupId: "ind-mission",
    dependsOn: { questionId: "onboarding-type", value: "As an Individual" }
  },
  {
    id: "individual-website-social",
    question: "Your website and social media links",
    type: "textarea",
    placeholder: "Website URL, Facebook, Instagram, etc. (one per line)",
    section: "Personal Profile",
    groupId: "ind-social",
    dependsOn: { questionId: "onboarding-type", value: "As an Individual" }
  },

  // ═══════════════════════════════════════════
  // SECTION 3: PROJECT DETAILS — BOTH PATHS (9 questions, NO dependsOn)
  // ═══════════════════════════════════════════
  {
    id: "project-title",
    question: "Project Title",
    type: "text",
    placeholder: "Give your initiative a name",
    section: "Project Details",
    groupId: "project-identity",
    required: true
  },
  {
    id: "project-cause",
    question: "Project Cause",
    type: "dropdown",
    options: CAUSE_LIST,
    section: "Project Details",
    groupId: "project-identity",
    required: true
  },
  {
    id: "project-location",
    question: "Project Location (City, Country)",
    type: "text",
    placeholder: "City, Country (e.g. Phnom Penh, Cambodia)",
    section: "Project Details",
    groupId: "project-identity"
  },
  {
    id: "project-duration",
    question: "Project Duration",
    type: "text",
    placeholder: "e.g. Jan 2026 - Dec 2026",
    section: "Project Details",
    groupId: "project-identity"
  },
  {
    id: "project-problem",
    question: "Project Intro & Problem Statement",
    type: "textarea",
    placeholder: "Start with a compelling hook and describe the challenge...",
    section: "Project Details",
    groupId: "project-intro",
    required: true
  },
  {
    id: "project-background",
    question: "Additional background and context for your project",
    type: "textarea",
    placeholder: "Provide details about the issue or challenge. Share relevant stats, research, or testimonials to support the need.",
    section: "Project Details",
    groupId: "project-bg"
  },
  {
    id: "project-activities",
    question: "What specific actions/activities will be undertaken?",
    type: "textarea",
    placeholder: "Outline your action plan and target beneficiaries...",
    section: "Project Details",
    groupId: "project-actions"
  },
  {
    id: "cause-evidence-upload",
    question: "Upload Evidence of Cause / Approval Letter",
    type: "upload",
    section: "Project Details",
    groupId: "project-media",
    required: true
  },
  {
    id: "project-photos",
    question: "Upload photos for your project page (used in carousel)",
    type: "upload",
    section: "Project Details",
    groupId: "project-media"
  },

  // ═══════════════════════════════════════════
  // SECTION 4: FINANCIALS — BOTH PATHS (9 questions)
  // ═══════════════════════════════════════════
  {
    id: "fundraising-goal",
    question: "What is your fundraising goal (in SGD)?",
    type: "text",
    placeholder: "e.g. 25000",
    section: "Financials",
    groupId: "funding-goals",
    required: true
  },
  {
    id: "fund-breakdown",
    question: "Detailed breakdown of fund usage",
    type: "textarea",
    placeholder: "How will the money be spent? Please ensure transparency.",
    section: "Financials",
    groupId: "funding-goals",
    required: true
  },
  {
    id: "fund-excess-shortfall",
    question: "Plan for excess or shortfall in fundraising",
    type: "textarea",
    placeholder: "Where will excess funds be channelled? If the goal isn't met, how will raised funds be used?",
    section: "Financials",
    groupId: "funding-risk",
    required: true
  },
  {
    id: "bank-type",
    question: "Type of Bank Account",
    type: "dropdown",
    options: ["Personal Account", "Corporate/Organisation Account"],
    section: "Financials",
    groupId: "bank-1",
    required: true
  },
  {
    id: "bank-account-name",
    question: "Account Holder Name",
    type: "text",
    section: "Financials",
    groupId: "bank-1",
    required: true
  },
  {
    id: "bank-number",
    question: "Bank Account Number",
    type: "text",
    section: "Financials",
    groupId: "bank-1",
    required: true
  },
  {
    id: "bank-swift",
    question: "SWIFT / BIC Code",
    type: "text",
    placeholder: "e.g. DBSSSGSG",
    section: "Financials",
    groupId: "bank-2",
    required: true
  },
  {
    id: "bank-address",
    question: "Bank Address",
    type: "text",
    placeholder: "Full address of the bank branch",
    section: "Financials",
    groupId: "bank-2"
  },
  {
    id: "bank-statement-upload",
    question: "Upload Bank Statement (Proof of Ownership)",
    type: "upload",
    section: "Financials",
    groupId: "bank-2",
    required: true
  },

  // ═══════════════════════════════════════════
  // SECTION 5: FINAL REVIEW — BOTH PATHS (4 questions)
  // ═══════════════════════════════════════════
  {
    id: "love-gift-model",
    question: "Platform Support: At Agathos, we operate on a Love Gift model (typically 10% for success). Do you agree?",
    type: "yes-no",
    section: "Final Review",
    groupId: "final-checks",
    required: true
  },
  {
    id: "terms-ack",
    question: "Confirm accuracy: I am a valid representative and agree to Terms & Conditions.",
    type: "yes-no",
    section: "Final Review",
    groupId: "final-checks",
    required: true
  },
  {
    id: "project-visibility",
    question: "Project Visibility Mode",
    type: "dropdown",
    options: ["Public (Visible to all)", "Private (URL access only)", "Private with Password"],
    section: "Final Review",
    groupId: "visibility",
    required: true
  },
  {
    id: "project-password",
    question: "Set Project Password",
    type: "text",
    placeholder: "Enter a secure password for your private project",
    section: "Final Review",
    groupId: "visibility",
    dependsOn: { questionId: "project-visibility", value: "Private with Password" },
    required: true
  }
];

