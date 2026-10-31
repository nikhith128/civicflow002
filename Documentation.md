# CivicFlow – Project Documentation

> Hackathon: PromptWars x ASTRA – "From Complaints to Action" (AI for Civic Impact)
> Format: Solo, 8 hours, working prototype + 5-minute demo
> Status: Draft v1 (awaiting approval)

---

## 1. Project Overview

**CivicFlow** is an AI-powered web platform that turns scattered citizen complaints (waterlogging, damaged roads, overflowing bins, broken streetlights, disrupted services) into **prioritized, explainable and trackable action**.

It is not just a complaint box. It understands each report, detects duplicates and patterns, shows hotspots on a map, and helps a decision-maker decide **what to fix first, and why**. Citizens can follow their report from submission to resolution.

---

## 2. Problem Background

- Reports reach authorities through many channels (calls, messages, social media, walk-ins).
- The same issue is often reported many times (duplicates).
- Urgent hazards sit in the same queue as routine requests.
- Decision-makers cannot easily tell what needs attention first.
- Recurring problems and area-level patterns are hard to spot by reading a list.
- Citizens rarely see what happened to their complaint.

---

## 3. Proposed Solution

A mobile-friendly web app covering the full report lifecycle:

| Stage | What CivicFlow does |
|---|---|
| 1. Capture | Citizen submits text and/or image, picks a category, gives a location (map pin, address or coordinates) in under a minute. |
| 2. Understand | AI categorizes, summarizes, flags likely duplicates and assigns a priority with a plain-language explanation. |
| 3. Reveal | Map and dashboard show reports, hotspots, clusters and recurring problems. |
| 4. Act | Officers review, assign and move reports through a workflow; citizens see live status. |

### AI approach (hybrid, explainable)

- **Categorization and summarization:** LLM with a rule-based (keyword) fallback.
- **Duplicate detection:** text similarity (embeddings or TF-IDF) combined with geographic distance.
- **Priority scoring:** transparent weighted score (urgency, safety risk, potential impact, duplicate count, age) with the contributing factors shown to the user.
- **Hotspot/cluster detection:** distance-based clustering (e.g., DBSCAN) over report locations and categories.
- **Action brief:** short decision-maker summary generated from the top-priority reports and clusters.

The final choice of exact methods is made in `TRD.md`.

---

## 4. Project Scope

### In scope (MVP)
- Report submission form (mobile-first) with category, text, optional image, location.
- AI pipeline: category, summary, duplicate flag, priority score + explanation.
- Map and dashboard with hotspot/cluster insight.
- Officer view: review, assign, change status.
- Citizen tracking view with status timeline.
- Synthetic dataset of 30–50 reports (with deliberate duplicates, a few urgent safety issues, at least one geographic cluster).
- README, Limitations and Honesty note, demo script.

### Out of scope (for this hackathon)
- Real integrations with municipal systems, SMS, WhatsApp or social media.
- Production-grade authentication and user management.
- Real personal data.
- Native mobile apps.
- Multi-city / multi-language support.

---

## 5. Target Users

| User | Needs |
|---|---|
| **Citizen** | Report quickly from a phone; know the status of the complaint. |
| **Officer / field coordinator** | See a prioritized queue, assign work, update status. |
| **Decision-maker** | See hotspots and an action brief to decide what to fix first. |
| **Hackathon judges** | See one complete, honest, working user journey in ~5 minutes. |

---

## 6. Main Features

1. Quick report form (text and/or image, category, map pin/address/coordinates).
2. AI auto-categorization.
3. AI report summary.
4. Duplicate detection with linking/merging.
5. Explainable priority score (factors shown in plain language).
6. Map view with markers colored by priority/status.
7. Dashboard with category counts, status counts and trends.
8. Hotspot/cluster detection.
9. Action brief for decision-makers.
10. Assignment and status workflow (Submitted → Reviewed → Assigned → In Progress → Resolved).
11. Citizen tracking page with status history.

---

## 7. Expected Outcomes

By the end of the 8-hour window:

- A working, demonstrable prototype (hosted link or runnable locally).
- A complete demo journey: submit a report → see AI processing and reasoning → see a hotspot/cluster or action brief → assign and resolve → see the status from the citizen side.
- A source repository with README (setup, architecture, AI approach).
- A Limitations and Honesty note (what is real, what is mocked, where the AI can be wrong, next steps).

---

## 8. Limitations and Assumptions

### Assumptions
- Single fictional/sample city or ward, with synthetic data.
- Role switching (citizen vs officer) is used for the demo instead of real authentication, and it is labelled as such.
- One LLM provider with free or low-cost access is available; a rule-based fallback exists if it fails.
- Development happens on a laptop with VS Code (Android tools are a fallback only).

### Known limitations (to be stated honestly in the final note)
- AI categorization and priority can be wrong, especially for vague or short reports.
- Duplicate detection may miss duplicates or over-merge similar but separate issues.
- Image analysis is limited; anything not truly analysed will be labelled as such.
- Synthetic data does not reflect real-world volume or messiness.
- Any mocked component (e.g., notifications, assignment to real staff) will be clearly labelled "mocked".

---

## 9. Documentation Map

| File | Purpose |
|---|---|
| Documentation.md | This file: overall explanation |
| PRD.md | Requirements, user stories, priorities |
| TRD.md | Tech stack and specifications |
| Architecture.md | System design and folder structure |
| Design.md | UI/UX design |
| Phases.md | Phase-by-phase build plan |
| Security.md | Security approach |
| Agent.md | Rules for AI coding agents |
| Testing.md | Test strategy |
| Checklist.md | Progress tracker |
| Database.md / API.md / Deployment.md | Created because the project is moderately complex |
