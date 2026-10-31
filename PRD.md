# CivicFlow – Product Requirements Document (PRD)

> Hackathon: PromptWars x ASTRA – "From Complaints to Action"
> Status: Draft v1 (awaiting approval)
> Related: Documentation.md

---

## 1. Product Overview

CivicFlow is a mobile-friendly web platform that converts scattered citizen reports into prioritized, explainable and trackable action. It covers the full report lifecycle: **Capture → Understand → Reveal → Act**.

Three kinds of users interact with it: citizens (submit and track), officers (review, assign, resolve) and decision-makers (see hotspots and action briefs).

---

## 2. Problem Statement

Communities report waterlogging, damaged roads, overflowing bins, broken streetlights and disrupted services through many channels. As a result:

- The same issue is reported many times.
- Urgent hazards are mixed with routine requests.
- Decision-makers cannot tell what to fix first or why.
- Patterns and hotspots are invisible in a flat list.
- Citizens cannot see what happened to their complaint.

A system that only collects complaints does not solve this.

---

## 3. Goals and Objectives

| # | Goal | Objective (measurable) |
|---|---|---|
| G1 | Fast reporting | A citizen can submit a report in under 60 seconds on a phone-sized screen. |
| G2 | Understand reports | AI assigns category, summary, duplicate flag and priority to every new report. |
| G3 | Explainable decisions | Every priority score shows the factors behind it in plain language. |
| G4 | Reveal patterns | At least one hotspot/cluster is visible on the map that is hard to spot in a list. |
| G5 | Close the loop | Every report moves through a visible status workflow, and the citizen can see it. |
| G6 | Honesty | Mocked parts and AI limits are clearly labelled in the app and README. |

---

## 4. Target Audience

| User | Description | Main need |
|---|---|---|
| Citizen | Any resident reporting a local issue, mostly on a phone | Quick submission, status visibility |
| Officer | Municipal staff who triage and handle reports | Prioritized queue, assignment tools |
| Decision-maker | Supervisor or administrator | Hotspots, trends, action brief |
| Judges | Evaluate the prototype in about 5 minutes | A complete, working, honest journey |

---

## 5. Functional Requirements

### FR-1 Capture
- FR-1.1 The user can enter a text description.
- FR-1.2 The user can optionally upload an image.
- FR-1.3 At least one of text or image is required.
- FR-1.4 The user can choose a category (or leave it for AI to suggest).
- FR-1.5 The user can give a location by map pin, address text, or coordinates.
- FR-1.6 The form works on a phone-sized screen.
- FR-1.7 After submission the user receives a report ID to track the report.

### FR-2 Understand (AI pipeline)
- FR-2.1 AI assigns or confirms a category.
- FR-2.2 AI generates a short summary of the report.
- FR-2.3 The system flags likely duplicates using text similarity and location proximity, and links them to a parent report.
- FR-2.4 The system assigns a priority (Critical / High / Medium / Low) with a numeric score.
- FR-2.5 The system shows the reasoning: the factors used (e.g., safety risk, duplicate count, location, age) in plain language.
- FR-2.6 If the LLM is unavailable, a rule-based fallback runs and the report is marked "processed by fallback".

### FR-3 Reveal
- FR-3.1 A map shows all reports, with markers distinguished by priority and/or status.
- FR-3.2 A dashboard shows counts by category, status and priority.
- FR-3.3 The system detects geographic clusters/hotspots and highlights them.
- FR-3.4 The system shows recurring problems (same category repeating in the same area).
- FR-3.5 The system generates an action brief (what to fix first and why) readable in under a minute.

### FR-4 Act
- FR-4.1 Officers see a prioritized report queue.
- FR-4.2 Officers can open a report and view the AI output and explanation.
- FR-4.3 Officers can override AI category and priority (the override is recorded).
- FR-4.4 Officers can assign a report to a team or person (assignee list may be mocked and labelled).
- FR-4.5 Officers can change status: Submitted → Reviewed → Assigned → In Progress → Resolved.
- FR-4.6 Every status change is stored with a timestamp (history).
- FR-4.7 A citizen can look up a report by ID and see its current status and history.

### FR-5 Data and demo
- FR-5.1 The app ships with a synthetic dataset of 30–50 reports across multiple categories.
- FR-5.2 The dataset includes deliberate duplicates, a few urgent safety issues, and at least one geographic cluster.
- FR-5.3 No real personal data is used.

---

## 6. Non-Functional Requirements

| Area | Requirement |
|---|---|
| Performance | Report submission and AI processing completes within about 10 seconds. Dashboard loads in under 3 seconds with 50 reports. |
| Usability | Mobile-first layout; the submit form needs no more than 5 inputs; clear labels and feedback. |
| Reliability | The AI pipeline must not crash the app: on failure, use the fallback and show a notice. |
| Explainability | Every AI output (category, duplicate, priority) can be explained in plain language. |
| Security | Secrets are kept in environment variables; inputs are validated; file uploads are restricted by type and size. Details in Security.md. |
| Maintainability | Clean folder structure, documented code, and a README with setup steps. |
| Accessibility | Readable contrast, labelled form fields, and keyboard-usable controls. |
| Honesty | Mocked features are labelled "mocked" in the UI and README. |
| Portability | Runs locally with simple setup steps; a hosted link is a bonus. |

---

## 7. User Stories

### Citizen
- US-1: As a citizen, I want to report a problem with text, a photo and a location from my phone so that authorities know about it.
- US-2: As a citizen, I want to get a report ID so that I can check progress later.
- US-3: As a citizen, I want to see the status and history of my report so that I know someone is acting.
- US-4: As a citizen, I want to be told if my issue was already reported so that I am not repeating effort.

### Officer
- US-5: As an officer, I want a prioritized queue so that I handle urgent hazards first.
- US-6: As an officer, I want to see why a report has its priority so that I can trust or correct it.
- US-7: As an officer, I want duplicates grouped so that I do not handle the same issue several times.
- US-8: As an officer, I want to assign a report and update its status so that work is tracked.
- US-9: As an officer, I want to override AI category or priority so that I stay in control.

### Decision-maker
- US-10: As a decision-maker, I want a map of hotspots so that I can see problem areas at a glance.
- US-11: As a decision-maker, I want an action brief so that I can decide what to fix first in under a minute.
- US-12: As a decision-maker, I want to see recurring problems so that I can address root causes.

### Judge
- US-13: As a judge, I want to see one complete journey (submit → AI → insight → assign → citizen status) so that I can assess whether it works.
- US-14: As a judge, I want a clear statement of what is real vs mocked so that I can evaluate honestly.

---

## 8. Feature Priorities (MoSCoW)

### Must Have (MVP, required for the demo)
- Report form: text and/or image, category, location (pin, address or coordinates)
- AI categorization and summary
- Duplicate detection with linking
- Explainable priority score
- Map with reports
- Hotspot/cluster detection (at least one visible insight)
- Officer queue, assignment and status workflow
- Citizen tracking by report ID
- Synthetic dataset (30–50 reports)
- Rule-based fallback for the AI pipeline
- README and Limitations and Honesty note

### Should Have
- Action brief for decision-makers
- Dashboard charts (category, status, priority)
- Officer override of AI output
- Status history timeline
- Recurring-problem indicator
- Mobile-friendly polish

### Could Have
- Image analysis with a vision model (otherwise stored only and labelled)
- Filters and search on the queue and map
- Trend over time chart
- Simple notification preview (mocked and labelled)
- Hosted deployment link

### Won't Have (this version)
See Section 10.

---

## 9. Success Criteria

The prototype is successful if all of these are true:

1. A new report can be submitted on a phone-sized screen in under a minute.
2. The AI output (category, summary, duplicate check, priority, reasoning) is shown for the new report.
3. At least one deliberate duplicate in the dataset is correctly flagged.
4. At least one urgent safety issue ranks near the top of the queue, with a clear reason.
5. At least one geographic cluster is visible on the map and described in the action brief or dashboard.
6. A report can be assigned and moved to Resolved, and the citizen view shows the updated status.
7. The complete journey runs in about 5 minutes without errors.
8. The README and Limitations note state what is real, what is mocked and where the AI can be wrong.

---

## 10. Out-of-Scope Features

- Real integrations with municipal systems, SMS, WhatsApp, email or social media
- Production-grade authentication and role management
- Real citizen personal data
- Native mobile apps
- Multi-city, multi-language or multi-tenant support
- Payment, billing or SLA contracts
- Live field-crew GPS tracking
- Model training on real civic data
- Advanced analytics and forecasting

---

## 11. Open Points (to be settled in later documents)

- Exact AI methods and LLM provider (TRD.md)
- Database choice and schema (Architecture.md and Database.md)
- Priority scoring weights (Architecture.md)
- Sample city/ward for the synthetic data (Design.md or Database.md)
