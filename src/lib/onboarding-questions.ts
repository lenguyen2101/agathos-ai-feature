export type QuestionType = 'text' | 'dropdown' | 'yes-no' | 'textarea' | 'multi-select' | 'upload';

export interface Question {
  id: string;
  question: string;
  type: QuestionType;
  options?: string[];
  placeholder?: string;
  section: string;
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
    dependsOn: { questionId: "onboarding-type", value: "As an Organisation" },
    required: true
  },
  {
    id: "org-country",
    question: "Country of Incorporation",
    type: "dropdown",
    options: COUNTRY_LIST,
    section: "Organisation Profile",
    dependsOn: { questionId: "onboarding-type", value: "As an Organisation" },
    required: true
  },
  {
    id: "is-charity",
    question: "Is your organisation a registered charity/non-profit in this country?",
    type: "yes-no",
    section: "Organisation Profile",
    dependsOn: { questionId: "onboarding-type", value: "As an Organisation" },
    required: true
  },
  {
    id: "org-nature",
    question: "What is the nature of your organisation's work?",
    type: "textarea",
    placeholder: "Detailed description of your mission and activities",
    section: "Organisation Profile",
    dependsOn: { questionId: "onboarding-type", value: "As an Organisation" },
    required: true
  },
  {
    id: "org-categories",
    question: "Main Causes Supported (Select up to 3)",
    type: "multi-select",
    options: CAUSE_LIST,
    section: "Organisation Profile",
    dependsOn: { questionId: "onboarding-type", value: "As an Organisation" }
  },
  {
    id: "org-operation-countries",
    question: "Countries of Operation",
    type: "multi-select",
    options: COUNTRY_LIST,
    section: "Organisation Profile",
    dependsOn: { questionId: "onboarding-type", value: "As an Organisation" }
  },
  {
    id: "org-size",
    question: "Size of Organisation",
    type: "dropdown",
    options: ["< 5 members", "5-10 members", "10-25 members", "25-50 members", "> 50 members"],
    section: "Organisation Profile",
    dependsOn: { questionId: "onboarding-type", value: "As an Organisation" }
  },
  {
    id: "tax-deductible",
    question: "Can you offer tax deductions to donors? (Singapore only)",
    type: "yes-no",
    section: "Organisation Profile",
    dependsOn: { questionId: "org-country", value: "Singapore" }
  },
  // NEW: 4 additional org profile fields
  {
    id: "org-cause-description",
    question: "Tell us in more detail about the cause your organisation supports (max 500 words)",
    type: "textarea",
    placeholder: "Describe your organisation's mission, impact, and the communities you serve...",
    section: "Organisation Profile",
    dependsOn: { questionId: "onboarding-type", value: "As an Organisation" }
  },
  {
    id: "org-other-platforms",
    question: "Has your organisation registered with other giving platforms? If so, please list them.",
    type: "text",
    placeholder: "e.g. Give.asia, GlobalGiving, GoFundMe",
    section: "Organisation Profile",
    dependsOn: { questionId: "onboarding-type", value: "As an Organisation" }
  },
  {
    id: "org-website-social",
    question: "Organisation website and social media links",
    type: "textarea",
    placeholder: "Website URL, Facebook, Instagram, LinkedIn, etc. (one per line)",
    section: "Organisation Profile",
    dependsOn: { questionId: "onboarding-type", value: "As an Organisation" }
  },
  {
    id: "org-referral",
    question: "How did you come to know about Agathos?",
    type: "dropdown",
    options: ["Social Media", "Word of Mouth", "Conference/Events", "Others"],
    section: "Organisation Profile",
    dependsOn: { questionId: "onboarding-type", value: "As an Organisation" }
  },

  // --- Compliance Documents ---
  {
    id: "org-uen",
    question: "Company Registration Number (e.g., UEN in Singapore)",
    type: "text",
    placeholder: "Enter registration ID",
    section: "Compliance Documents",
    dependsOn: { questionId: "onboarding-type", value: "As an Organisation" },
    required: true
  },
  {
    id: "org-cert-upload",
    question: "Upload Registration Certificate (PDF/Image)",
    type: "upload",
    section: "Compliance Documents",
    dependsOn: { questionId: "onboarding-type", value: "As an Organisation" },
    required: true
  },
  {
    id: "org-financials-upload",
    question: "Upload latest Financial Statements or Annual Report",
    type: "upload",
    section: "Compliance Documents",
    dependsOn: { questionId: "onboarding-type", value: "As an Organisation" },
    required: true
  },
  // NEW: Org bank statement upload
  {
    id: "org-bank-statement-upload",
    question: "Upload a Bank Statement showing the name of the account (PDF)",
    type: "upload",
    section: "Compliance Documents",
    dependsOn: { questionId: "onboarding-type", value: "As an Organisation" },
    required: true
  },

  // --- Risk Declaration ---
  {
    id: "sanctions-check",
    question: "Any sanctions or adverse media on company, owners, or directors?",
    type: "yes-no",
    section: "Risk Declaration",
    redFlagValue: "Yes",
    dependsOn: { questionId: "onboarding-type", value: "As an Organisation" },
    required: true
  },
  // NEW: Sanctions detail (conditional)
  {
    id: "sanctions-details",
    question: "Please provide brief details about the sanctions or adverse media",
    type: "textarea",
    placeholder: "Explain the nature and status of any sanctions or adverse media...",
    section: "Risk Declaration",
    dependsOn: { questionId: "sanctions-check", value: "Yes" },
    required: true
  },
  {
    id: "pep-check",
    question: "Any Politically Exposed Persons (PEPs) involved?",
    type: "yes-no",
    section: "Risk Declaration",
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
    dependsOn: { questionId: "onboarding-type", value: "As an Individual" },
    required: true
  },
  {
    id: "ic-upload-front",
    question: "Upload Identity Card (Front)",
    type: "upload",
    section: "Personal Profile",
    dependsOn: { questionId: "onboarding-type", value: "As an Individual" },
    required: true
  },
  {
    id: "ic-upload-back",
    question: "Upload Identity Card (Back)",
    type: "upload",
    section: "Personal Profile",
    dependsOn: { questionId: "onboarding-type", value: "As an Individual" },
    required: true
  },
  {
    id: "individual-causes",
    question: "Which causes are you passionate about? (Max 3)",
    type: "multi-select",
    options: CAUSE_LIST,
    section: "Personal Profile",
    dependsOn: { questionId: "onboarding-type", value: "As an Individual" }
  },
  {
    id: "cause-connection",
    question: "How are you connected to this cause?",
    type: "dropdown",
    options: ["I run this project", "Staff or Volunteer", "Beneficiary", "Friend or Family", "Supporter", "Other"],
    section: "Personal Profile",
    dependsOn: { questionId: "onboarding-type", value: "As an Individual" }
  },
  // NEW: 3 individual profile fields
  {
    id: "individual-country",
    question: "Country of Residence",
    type: "dropdown",
    options: COUNTRY_LIST,
    section: "Personal Profile",
    dependsOn: { questionId: "onboarding-type", value: "As an Individual" }
  },
  {
    id: "individual-website-social",
    question: "Your website and social media links",
    type: "textarea",
    placeholder: "Website URL, Facebook, Instagram, etc. (one per line)",
    section: "Personal Profile",
    dependsOn: { questionId: "onboarding-type", value: "As an Individual" }
  },
  {
    id: "individual-referral",
    question: "How did you come to know about Agathos?",
    type: "dropdown",
    options: ["Social Media", "Word of Mouth", "Conference/Events", "Others"],
    section: "Personal Profile",
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
    required: true
  },
  // NEW: Project Cause
  {
    id: "project-cause",
    question: "Project Cause",
    type: "dropdown",
    options: CAUSE_LIST,
    section: "Project Details",
    required: true
  },
  {
    id: "project-location",
    question: "Project Location (City, Country)",
    type: "text",
    placeholder: "City, Country (e.g. Phnom Penh, Cambodia)",
    section: "Project Details"
  },
  // NEW: Project Duration
  {
    id: "project-duration",
    question: "Project Duration",
    type: "text",
    placeholder: "e.g. Jan 2026 - Dec 2026 (start and end date)",
    section: "Project Details"
  },
  {
    id: "project-problem",
    question: "Project Intro & Problem Statement",
    type: "textarea",
    placeholder: "Start with a compelling hook and describe the challenge...",
    section: "Project Details",
    required: true
  },
  // NEW: Project Background
  {
    id: "project-background",
    question: "Additional background and context for your project",
    type: "textarea",
    placeholder: "Provide details about the issue or challenge. Share relevant stats, research, or testimonials to support the need. Describe any previous efforts and their outcomes.",
    section: "Project Details"
  },
  {
    id: "project-activities",
    question: "What specific actions/activities will be undertaken?",
    type: "textarea",
    placeholder: "Outline your action plan and target beneficiaries...",
    section: "Project Details"
  },
  {
    id: "cause-evidence-upload",
    question: "Upload Evidence of Cause / Approval Letter",
    type: "upload",
    section: "Project Details",
    required: true
  },
  // NEW: Project Photos
  {
    id: "project-photos",
    question: "Upload photos for your project page (used in carousel)",
    type: "upload",
    section: "Project Details"
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
    required: true
  },
  {
    id: "fund-breakdown",
    question: "Detailed breakdown of fund usage",
    type: "textarea",
    placeholder: "How will the money be spent? Please ensure transparency.",
    section: "Financials",
    required: true
  },
  // NEW: Excess/Shortfall plan
  {
    id: "fund-excess-shortfall",
    question: "Plan for excess or shortfall in fundraising",
    type: "textarea",
    placeholder: "Where will excess funds be channelled? If the goal isn't met, how will raised funds be used?",
    section: "Financials",
    required: true
  },
  {
    id: "bank-type",
    question: "Type of Bank Account",
    type: "dropdown",
    options: ["Personal Account", "Corporate/Organisation Account"],
    section: "Financials",
    required: true
  },
  {
    id: "bank-account-name",
    question: "Account Holder Name",
    type: "text",
    section: "Financials",
    required: true
  },
  {
    id: "bank-number",
    question: "Bank Account Number",
    type: "text",
    section: "Financials",
    required: true
  },
  // NEW: SWIFT code
  {
    id: "bank-swift",
    question: "SWIFT / BIC Code",
    type: "text",
    placeholder: "e.g. DBSSSGSG",
    section: "Financials",
    required: true
  },
  // NEW: Bank Address
  {
    id: "bank-address",
    question: "Bank Address",
    type: "text",
    placeholder: "Full address of the bank branch",
    section: "Financials"
  },
  {
    id: "bank-statement-upload",
    question: "Upload Bank Statement (Proof of Ownership)",
    type: "upload",
    section: "Financials",
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
    required: true
  },
  {
    id: "project-visibility",
    question: "Project Visibility Mode",
    type: "dropdown",
    options: ["Public (Visible to all)", "Private (URL access only)", "Private with Password"],
    section: "Final Review",
    required: true
  },
  {
    id: "project-password",
    question: "Set Project Password",
    type: "text",
    placeholder: "Enter a secure password for your private project",
    section: "Final Review",
    dependsOn: { questionId: "project-visibility", value: "Private with Password" },
    required: true
  },
  {
    id: "terms-ack",
    question: "Confirm accuracy: I am a valid representative and agree to Terms & Conditions.",
    type: "yes-no",
    section: "Final Review",
    required: true
  }
];
