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

export const onboardingQuestions: Question[] = [
  // SECTION 1: MASTER BRANCH
  {
    id: "onboarding-type",
    question: "How are you starting your project today?",
    type: "dropdown",
    options: ["As an Individual", "As an Organisation"],
    section: "Triage",
    required: true
  },

  // SECTION 2A: ORGANISATION BRANCH
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
    options: ["Singapore", "Malaysia", "Indonesia", "Thailand", "Philippines", "Others"],
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
    options: ["Healthcare", "Education", "Poverty Alleviation", "Arts & Culture", "Animal Welfare", "Environment", "Religious", "Disabilities", "Elderly", "Youth"],
    section: "Organisation Profile",
    dependsOn: { questionId: "onboarding-type", value: "As an Organisation" }
  },
  {
    id: "org-operation-countries",
    question: "Countries of Operation",
    type: "multi-select",
    options: ["Singapore", "Malaysia", "Indonesia", "Thailand", "Philippines", "Others"],
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
  {
    id: "sanctions-check",
    question: "Any sanctions or adverse media on company, owners, or directors?",
    type: "yes-no",
    section: "Risk Declaration",
    redFlagValue: "Yes",
    dependsOn: { questionId: "onboarding-type", value: "As an Organisation" },
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

  // SECTION 2B: INDIVIDUAL BRANCH
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
    options: ["Healthcare", "Education", "Social Services", "Arts", "Environment", "Overseas Missions", "Local Community"],
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
  {
    id: "project-title",
    question: "Project Title",
    type: "text",
    placeholder: "Give your initiative a name",
    section: "Project Details",
    dependsOn: { questionId: "onboarding-type", value: "As an Individual" },
    required: true
  },
  {
    id: "project-location",
    question: "Project Location (City, Country)",
    type: "text",
    placeholder: "Where will this take place?",
    section: "Project Details",
    dependsOn: { questionId: "onboarding-type", value: "As an Individual" }
  },
  {
    id: "project-problem",
    question: "Project Intro & Problem Statement",
    type: "textarea",
    placeholder: "Start with a compelling hook and describe the challenge...",
    section: "Project Details",
    dependsOn: { questionId: "onboarding-type", value: "As an Individual" },
    required: true
  },
  {
    id: "project-activities",
    question: "What specific actions/activities will be undertaken?",
    type: "textarea",
    placeholder: "Outline your action plan and target beneficiaries...",
    section: "Project Details",
    dependsOn: { questionId: "onboarding-type", value: "As an Individual" }
  },
  {
    id: "cause-evidence-upload",
    question: "Upload Evidence of Cause / Approval Letter",
    type: "upload",
    section: "Project Details",
    dependsOn: { questionId: "onboarding-type", value: "As an Individual" },
    required: true
  },

  // SHARED FINANCIAL SECTION
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
  {
    id: "bank-statement-upload",
    question: "Upload Bank Statement (Proof of Ownership)",
    type: "upload",
    section: "Financials",
    required: true
  },

  // FINAL BRANCH
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
