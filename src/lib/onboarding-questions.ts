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
  // SECTION 1: TYPE SELECTION
  {
    id: "onboarding-type",
    question: "How are you starting your project today?",
    type: "dropdown",
    options: ["As an Individual", "As an Organisation"],
    section: "Type Selection",
    required: true
  },

  // SECTION 2A: ORGANIZATION DETAILS
  {
    id: "org-name",
    question: "What is the name of your organization?",
    type: "text",
    placeholder: "Enter official organization name",
    section: "Organization Details",
    dependsOn: { questionId: "onboarding-type", value: "As an Organisation" },
    required: true
  },
  {
    id: "org-country",
    question: "In which country is your organization incorporated?",
    type: "dropdown",
    options: ["Singapore", "Malaysia", "Indonesia", "Thailand", "Philippines", "Others"],
    section: "Organization Details",
    dependsOn: { questionId: "onboarding-type", value: "As an Organisation" },
    required: true
  },
  {
    id: "is-charity",
    question: "Is your organization a registered charity/non-profit?",
    type: "yes-no",
    section: "Organization Details",
    dependsOn: { questionId: "onboarding-type", value: "As an Organisation" },
    required: true
  },
  {
    id: "org-nature",
    question: "What is the nature of your organization's work?",
    type: "textarea",
    placeholder: "E.g. Healthcare, Education, Poverty Alleviation...",
    section: "Organization Details",
    dependsOn: { questionId: "onboarding-type", value: "As an Organisation" }
  },
  {
    id: "org-size",
    question: "What is the size of your organization?",
    type: "dropdown",
    options: ["1-5", "5-10", "10-25", "25-50", "Over 50"],
    section: "Organization Details",
    dependsOn: { questionId: "onboarding-type", value: "As an Organisation" }
  },

  // SECTION 2B: INDIVIDUAL DETAILS
  {
    id: "user-name",
    question: "What is your full name?",
    type: "text",
    section: "Individual Details",
    dependsOn: { questionId: "onboarding-type", value: "As an Individual" },
    required: true
  },
  {
    id: "user-residence",
    question: "What is your country of residence?",
    type: "dropdown",
    options: ["Singapore", "Others"],
    section: "Individual Details",
    dependsOn: { questionId: "onboarding-type", value: "As an Individual" }
  },

  // SECTION 3: COMPLIANCE
  {
    id: "sanctions-check",
    question: "Are there any sanctions or adverse media on your organization or its owners?",
    type: "yes-no",
    section: "Compliance & Risk",
    redFlagValue: "Yes",
    required: true
  },
  {
    id: "pep-check",
    question: "Are there any Politically Exposed Persons (PEPs) involved in your project?",
    type: "yes-no",
    section: "Compliance & Risk",
    redFlagValue: "Yes",
    required: true
  },

  // SECTION 4: PROJECT DETAILS
  {
    id: "project-title",
    question: "What is the title of your project?",
    type: "text",
    placeholder: "A catchy name for your cause",
    section: "Project Overview",
    required: true
  },
  {
    id: "project-goal",
    question: "What is your fundraising goal (in SGD)?",
    type: "text",
    placeholder: "e.g. 10000",
    section: "Fundraising",
    required: true
  },
  {
    id: "fund-usage",
    question: "Please provide a brief breakdown of how the funds will be used.",
    type: "textarea",
    section: "Fundraising",
    required: true
  },

  // SECTION 5: DISBURSEMENT
  {
    id: "bank-account-name",
    question: "What is the official name on the bank account?",
    type: "text",
    section: "Disbursement Setup",
    required: true
  },
  {
    id: "love-gift-ack",
    question: "Do you agree to the default 10% love gift to Agathos to support platform operations?",
    type: "yes-no",
    section: "Final Steps",
    required: true
  }
];
