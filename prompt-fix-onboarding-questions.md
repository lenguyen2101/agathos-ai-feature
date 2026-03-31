# Task: Update `onboarding-questions.ts` — Fix missing fields & incorrect dependencies

## Context

You are working on the **Agathos AI Digital Receptionist** — a Smart Onboarding flow (Typeform-style, one question per screen) for a charitable giving platform based in Singapore. The onboarding collects information from users who want to create a project on the Agathos platform.

The source of truth is the `Create a Project.drawio.xml` flow diagram. After a detailed audit comparing the draw.io spec against the current `onboarding-questions.ts`, we found **8 missing fields**, **6 fields needing fixes**, and **1 critical structural bug**.

## Critical Bug

**Project details (Q20-24) only show for the Individual path.** The fields `project-title`, `project-location`, `project-problem`, `project-activities`, and `cause-evidence-upload` all have `dependsOn: { questionId: "onboarding-type", value: "As an Individual" }`. This means Organisation users never see project details — they jump from compliance straight to financials. **Both paths must include project details.** Remove the `dependsOn` from all project detail fields so they appear for both paths.

## Missing Fields to Add

### 1. Org additional info section (add after `tax-deductible`, before `org-uen`)

Add these 4 fields, all with `dependsOn: { questionId: "onboarding-type", value: "As an Organisation" }`:

```
- id: "org-cause-description"
  question: "Tell us in more detail about the cause your organisation supports (max 500 words)"
  type: textarea
  placeholder: "Describe your organisation's mission, impact, and the communities you serve..."
  section: "Organisation Profile"

- id: "org-other-platforms"
  question: "Has your organisation registered with other giving platforms? If so, please list them."
  type: text
  placeholder: "e.g. Give.asia, GlobalGiving, GoFundMe"
  section: "Organisation Profile"

- id: "org-website-social"
  question: "Organisation website and social media links"
  type: textarea
  placeholder: "Website URL, Facebook, Instagram, LinkedIn, etc. (one per line)"
  section: "Organisation Profile"

- id: "org-referral"
  question: "How did you come to know about Agathos?"
  type: dropdown
  options: ["Social Media", "Word of Mouth", "Conference/Events", "Others"]
  section: "Organisation Profile"
```

### 2. Org compliance — add bank statement upload (add after `org-financials-upload`)

```
- id: "org-bank-statement-upload"
  question: "Upload a Bank Statement showing the name of the account (PDF)"
  type: upload
  section: "Compliance Documents"
  dependsOn: onboarding-type = "As an Organisation"
  required: true
```

This is separate from the project-level bank statement (#30). This one is for org verification.

### 3. Sanctions detail field (add right after `sanctions-check`)

```
- id: "sanctions-details"
  question: "Please provide brief details about the sanctions or adverse media"
  type: textarea
  placeholder: "Explain the nature and status of any sanctions or adverse media..."
  section: "Risk Declaration"
  dependsOn: { questionId: "sanctions-check", value: "Yes" }
  required: true
```

### 4. Individual path — add 3 missing fields (add after `cause-connection`)

```
- id: "individual-country"
  question: "Country of Residence"
  type: dropdown
  options: [same full country list as org-country]
  section: "Personal Profile"
  dependsOn: onboarding-type = "As an Individual"

- id: "individual-website-social"
  question: "Your website and social media links"
  type: textarea
  placeholder: "Website URL, Facebook, Instagram, etc. (one per line)"
  section: "Personal Profile"
  dependsOn: onboarding-type = "As an Individual"

- id: "individual-referral"
  question: "How did you come to know about Agathos?"
  type: dropdown
  options: ["Social Media", "Word of Mouth", "Conference/Events", "Others"]
  section: "Personal Profile"
  dependsOn: onboarding-type = "As an Individual"
```

### 5. Project details — add 4 missing fields

These fields should have NO `dependsOn` (both paths need them). Insert them among the existing project fields:

```
- id: "project-cause"
  question: "Project Cause"
  type: dropdown
  options: [same cause list as org-categories / individual-causes]
  section: "Project Details"
  required: true
  → Insert AFTER project-title

- id: "project-duration"
  question: "Project Duration"
  type: text
  placeholder: "e.g. Jan 2026 - Dec 2026 (start and end date)"
  section: "Project Details"
  → Insert AFTER project-location

- id: "project-background"
  question: "Additional background and context for your project"
  type: textarea
  placeholder: "Provide details about the issue or challenge. Share relevant stats, research, or testimonials to support the need. Describe any previous efforts and their outcomes."
  section: "Project Details"
  → Insert AFTER project-problem

- id: "project-photos"
  question: "Upload photos for your project page (used in carousel)"
  type: upload
  section: "Project Details"
  → Insert AFTER cause-evidence-upload
```

### 6. Financials — add 3 missing fields

```
- id: "fund-excess-shortfall"
  question: "Plan for excess or shortfall in fundraising"
  type: textarea
  placeholder: "Where will excess funds be channelled? If the goal isn't met, how will raised funds be used?"
  section: "Financials"
  required: true
  → Insert AFTER fund-breakdown

- id: "bank-swift"
  question: "SWIFT / BIC Code"
  type: text
  placeholder: "e.g. DBSSSGSG"
  section: "Financials"
  required: true
  → Insert AFTER bank-number

- id: "bank-address"
  question: "Bank Address"
  type: text
  placeholder: "Full address of the bank branch"
  section: "Financials"
  → Insert AFTER bank-swift
```

## Fields to Fix (modify existing)

### 1. Remove `dependsOn` from project detail fields

The following fields currently have `dependsOn: { questionId: "onboarding-type", value: "As an Individual" }`. **Remove the `dependsOn` property** from all of them so they show for both Org and Individual:

- `project-title`
- `project-location`
- `project-problem`
- `project-activities`
- `cause-evidence-upload`

### 2. Expand country dropdown options

For `org-country`, `org-operation-countries`, and the new `individual-country` — replace the 6-country list with a comprehensive international list. At minimum include:

```
["Singapore", "Malaysia", "Indonesia", "Thailand", "Philippines", "Vietnam", "Cambodia", "Myanmar", "Laos", "India", "Sri Lanka", "Bangladesh", "Nepal", "Hong Kong", "Taiwan", "Japan", "South Korea", "Australia", "New Zealand", "United Kingdom", "United States", "Canada", "Others"]
```

### 3. Project Location — improve placeholder

Change the `project-location` placeholder to make it clearer:
```
placeholder: "City, Country (e.g. Phnom Penh, Cambodia)"
```

## Final Question Order

After all changes, the complete flow should be (approximately 48 questions):

**Triage (1)**
1. onboarding-type

**Org path (18 questions, shown if "As an Organisation")**
2. org-name
3. org-country
4. is-charity
5. org-nature
6. org-categories
7. org-operation-countries
8. org-size
9. tax-deductible (conditional: org-country = Singapore)
10. org-cause-description ← NEW
11. org-other-platforms ← NEW
12. org-website-social ← NEW
13. org-referral ← NEW
14. org-uen
15. org-cert-upload
16. org-financials-upload
17. org-bank-statement-upload ← NEW
18. sanctions-check
19. sanctions-details ← NEW (conditional: sanctions-check = Yes)
20. pep-check

**Individual path (8 questions, shown if "As an Individual")**
21. user-name
22. ic-upload-front
23. ic-upload-back
24. individual-causes
25. cause-connection
26. individual-country ← NEW
27. individual-website-social ← NEW
28. individual-referral ← NEW

**Project details — BOTH paths (9 questions, NO dependsOn)**
29. project-title ← FIXED: removed dependsOn
30. project-cause ← NEW
31. project-location ← FIXED: removed dependsOn
32. project-duration ← NEW
33. project-problem ← FIXED: removed dependsOn
34. project-background ← NEW
35. project-activities ← FIXED: removed dependsOn
36. cause-evidence-upload ← FIXED: removed dependsOn
37. project-photos ← NEW

**Financials — BOTH paths (9 questions)**
38. fundraising-goal
39. fund-breakdown
40. fund-excess-shortfall ← NEW
41. bank-type
42. bank-account-name
43. bank-number
44. bank-swift ← NEW
45. bank-address ← NEW
46. bank-statement-upload

**Final review — BOTH paths (4 questions)**
47. love-gift-model
48. project-visibility
49. project-password (conditional: project-visibility = "Private with Password")
50. terms-ack

## Important Notes

- Do NOT change the existing TypeScript interfaces (`QuestionType`, `Question`). Only modify the `onboardingQuestions` array.
- Do NOT change `OnboardingFlow.tsx` — it already handles all question types correctly.
- Keep all existing `id` values exactly the same — other components may reference them.
- Keep the `redFlagValue: "Yes"` on `sanctions-check` and `pep-check`.
- The `tax-deductible` field correctly depends on `org-country = "Singapore"` — keep this.
- The `project-password` field correctly depends on `project-visibility = "Private with Password"` — keep this.
- The `sanctions-details` field should depend on `sanctions-check = "Yes"`.
