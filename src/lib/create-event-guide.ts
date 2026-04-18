export type FieldInputType =
  | "text"
  | "textarea"
  | "rich-text"
  | "dropdown"
  | "number"
  | "date-time"
  | "toggle"
  | "upload"
  | "radio";

export interface CreateEventField {
  id: string;
  name: string;
  purpose: string;
  inputType: FieldInputType;
  required?: boolean;
  defaultValue?: string;
  limit?: string;
  options?: string[];
  conditional?: string;
  validation?: string;
  notes?: string[];
  askHint: string;
}

export interface CreateEventStep {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  skippable?: boolean;
  fields: CreateEventField[];
}

export interface CommonQuestion {
  question: string;
  askHint: string;
}

export const createEventSteps: CreateEventStep[] = [
  {
    id: "build-event-page",
    number: 1,
    title: "Build your event page",
    subtitle: "Add your event details and let attendees know what to expect.",
    fields: [
      {
        id: "event-title",
        name: "Event Title",
        purpose: "Name shown at the top of your event page.",
        inputType: "text",
        limit: "200 characters",
        askHint: "What should I write in the Event Title? Are there any best practices?",
      },
      {
        id: "banner-photo",
        name: "Banner Photo",
        purpose: "Hero image for the event page. Click the '+' area to upload.",
        inputType: "upload",
        required: true,
        validation: "Please upload banner photo",
        notes: ["You can edit your banner photo later."],
        askHint: "What image size and format should I use for the Banner Photo?",
      },
      {
        id: "event-type",
        name: "Event Type",
        purpose: "Controls who can discover and access the event.",
        inputType: "dropdown",
        required: true,
        defaultValue: "Public Event",
        options: [
          "Public Event",
          "Private – Unlisted With Password",
          "Private – Unlisted Without Password",
        ],
        askHint: "What's the difference between Public Event and the two Private options?",
      },
      {
        id: "ticketing-type",
        name: "Ticketing Type",
        purpose: "Free or paid access to the event.",
        inputType: "dropdown",
        required: true,
        defaultValue: "Paid Event",
        options: ["Free Event", "Paid Event"],
        notes: [
          "Paid Event shows a warning: 'Platform and processing fees apply for paid tickets.'",
        ],
        askHint: "What fees apply for Paid Events on Agathos?",
      },
      {
        id: "currency",
        name: "Currency",
        purpose: "Currency used for tickets and Love Gift.",
        inputType: "dropdown",
        required: true,
        defaultValue: "SGD",
        conditional: "Shown only when Ticketing Type = Paid Event.",
        askHint: "Which currencies does Agathos support for paid events?",
      },
      {
        id: "timezone",
        name: "Timezone",
        purpose: "Timezone used for start and end times.",
        inputType: "dropdown",
        required: true,
        defaultValue: "(GMT +08:00) Asia/Singapore",
        askHint: "How do I pick the right Timezone for a multi-region event?",
      },
      {
        id: "start-time",
        name: "Event Start Time",
        purpose: "When the event begins.",
        inputType: "date-time",
        required: true,
        notes: ["Format: DD/MM/YYYY HH:MM. Picker has 'Now' and 'OK' buttons."],
        askHint: "How do I set the Event Start Time correctly?",
      },
      {
        id: "end-time",
        name: "Event End Time",
        purpose: "When the event ends.",
        inputType: "date-time",
        required: true,
        validation: "Please select end time",
        askHint: "Can the Event End Time be on a different day than Start Time?",
      },
      {
        id: "about-event",
        name: "About Event",
        purpose: "Long description shown on the event page.",
        inputType: "rich-text",
        notes: [
          "WYSIWYG editor with Bold, Italic, Underline, Strikethrough, lists, tables, colors.",
          "Include programme details, theme, speakers, etc.",
        ],
        askHint: "What should I include in the About Event section?",
      },
      {
        id: "street-address",
        name: "Street Address",
        purpose: "Venue street address (part of Location).",
        inputType: "text",
        required: true,
        askHint: "What if my event is online — do I still need a Street Address?",
      },
      {
        id: "city",
        name: "City",
        purpose: "Venue city (part of Location).",
        inputType: "text",
        required: true,
        askHint: "Is the City field used for attendee discovery?",
      },
      {
        id: "state",
        name: "State / Province / Region",
        purpose: "Optional sub-region of the venue.",
        inputType: "text",
        askHint: "Do I need to fill in State / Province / Region?",
      },
      {
        id: "postal-code",
        name: "Postal Code",
        purpose: "Optional postal / ZIP code.",
        inputType: "text",
        askHint: "Is Postal Code required for all countries?",
      },
      {
        id: "country",
        name: "Country",
        purpose: "Country of the venue. Searchable dropdown with flags.",
        inputType: "dropdown",
        required: true,
        defaultValue: "Singapore",
        askHint: "Which countries can I select for my event?",
      },
    ],
  },
  {
    id: "add-ticket",
    number: 2,
    title: "Add ticket",
    subtitle: "Create tickets to grant attendees access to your event.",
    fields: [
      {
        id: "ticket-name",
        name: "Ticket name",
        purpose: "Name of the ticket (e.g. Early Bird, VIP).",
        inputType: "text",
        required: true,
        limit: "200 characters",
        askHint: "What are good examples of Ticket names?",
      },
      {
        id: "sale-start",
        name: "Sale Start Time",
        purpose: "When ticket sales begin.",
        inputType: "date-time",
        conditional:
          "Not required when the 'Start sale as soon as Event page goes live' toggle is ON.",
        askHint: "When should I set Sale Start Time vs using the live-sale toggle?",
      },
      {
        id: "sale-end",
        name: "Sale End Time",
        purpose: "When ticket sales close.",
        inputType: "date-time",
        required: true,
        askHint: "Should Sale End Time be before or after Event Start Time?",
      },
      {
        id: "sale-live-toggle",
        name: "Start sale on event page live",
        purpose:
          "When ON, tickets start selling as soon as the event page is published.",
        inputType: "toggle",
        defaultValue: "OFF",
        askHint:
          "What happens if I turn on 'Start sale of tickets as soon as Event page goes live'?",
      },
      {
        id: "quantity",
        name: "Quantity",
        purpose: "Total number of tickets available.",
        inputType: "number",
        required: true,
        askHint: "How do I decide on a ticket Quantity?",
      },
      {
        id: "price",
        name: "Price",
        purpose: "Price per ticket. Shown with currency prefix (e.g. S$).",
        inputType: "number",
        required: true,
        conditional: "Shown only when Ticketing Type = Paid Event.",
        askHint: "How do platform and processing fees affect the ticket Price I set?",
      },
      {
        id: "show-remaining-toggle",
        name: "Show remaining ticket quantity",
        purpose: "When ON, buyers see how many tickets are left.",
        inputType: "toggle",
        defaultValue: "OFF",
        askHint: "Should I enable 'Show remaining ticket quantity' for my event?",
      },
      {
        id: "ticket-description",
        name: "Description",
        purpose: "Short description of what this ticket includes.",
        inputType: "textarea",
        required: true,
        limit: "120 characters",
        askHint: "What should I put in the ticket Description?",
      },
    ],
  },
  {
    id: "registration-form",
    number: 3,
    title: "Registration Form",
    subtitle:
      "Gather additional information from your attendees during the ticket purchasing process.",
    skippable: true,
    fields: [
      {
        id: "collection-mode",
        name: "Collection mode",
        purpose: "Who provides the registration answers.",
        inputType: "radio",
        options: ["Ticket Buyer (Recommended)", "Each Attendee"],
        notes: [
          "Ticket Buyer = faster checkout; answers come from the purchaser only.",
          "Each Attendee = collect info for every ticket in the order.",
        ],
        askHint: "Should I use Ticket Buyer or Each Attendee for my registration form?",
      },
      {
        id: "question-prompt",
        name: "Question Prompt",
        purpose: "The question attendees will answer.",
        inputType: "text",
        required: true,
        limit: "200 characters",
        validation: "Please enter a question prompt.",
        askHint: "What are good example questions to ask my attendees?",
      },
      {
        id: "add-description",
        name: "Add description",
        purpose: "Optional helper text shown under the question.",
        inputType: "text",
        askHint: "When should I add a description to a registration question?",
      },
      {
        id: "answer-type",
        name: "Answer Type",
        purpose: "Format of the expected answer.",
        inputType: "dropdown",
        defaultValue: "Short Answer (max 200 chars)",
        options: [
          "Name (used for attendee search)",
          "Email (used for attendee search)",
          "Short Answer (max 200 chars)",
          "Long Answer (max 1000 chars)",
          "Single Choice",
          "Checkboxes",
          "Select From Dropdown",
        ],
        askHint: "Which Answer Type should I use for collecting dietary restrictions?",
      },
      {
        id: "required-toggle",
        name: "Required",
        purpose: "When ON, attendees must answer before checkout.",
        inputType: "toggle",
        defaultValue: "OFF",
        askHint: "Should every registration question be set to Required?",
      },
    ],
  },
  {
    id: "review-submit",
    number: 4,
    title: "Review and Submit for Approval",
    subtitle: "You can make additional edits after your event page is published.",
    fields: [],
  },
];

export const createEventFaqs: CommonQuestion[] = [
  {
    question: "Can I skip the Registration Form step?",
    askHint: "Can I skip Step 3 (Registration Form) when creating an event?",
  },
  {
    question: "Can I edit the event after submitting?",
    askHint: "Can I still edit my event details after I click Submit for Approval?",
  },
  {
    question: "What platform fees apply to paid tickets?",
    askHint: "What platform and processing fees apply to paid tickets on Agathos?",
  },
  {
    question: "How long does approval take?",
    askHint: "How long does event approval take after I click Submit?",
  },
  {
    question: "Can I add multiple ticket types?",
    askHint: "How do I create multiple ticket types (e.g. Early Bird, VIP) for one event?",
  },
  {
    question: "What's the difference between Public and Private events?",
    askHint:
      "What are the differences between Public Event, Private Unlisted With Password, and Private Unlisted Without Password?",
  },
];
