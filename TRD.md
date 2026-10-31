# CivicFlow – Technical Requirements Document (TRD)

> Hackathon: PromptWars x ASTRA – "From Complaints to Action"
> Status: Draft v1 (awaiting approval)
> Related: PRD.md, Documentation.md

---

## 1. Technology Stack (Summary)

| Layer | Choice | Why |
|---|---|---|
| Runtime | Node.js (LTS) | Same ecosystem as FinanceAI; one language front to back |
| Backend | Express | Simple, well known, fast to build |
| Database | MongoDB Atlas (free tier) + Mongoose | Persistent storage; avoids data loss on host restarts |
| Frontend | HTML + CSS + vanilla JavaScript (no build step) | No bundler, works on laptop and Android fallback |
| Map | Leaflet + OpenStreetMap tiles | Free, no API key |
| Charts | Chart.js | Simple dashboard charts |
| AI (LLM) | Google Gemini API | Already used in FinanceAI; free tier available |
| AI (non-LLM) | Own code: TF-IDF/cosine similarity, haversine distance, DBSCAN, weighted priority score | Explainable, works offline as fallback |
| Hosting | Render (backend + static frontend) | Already used for FinanceAI |

**Design principle:** the app must still work, with reduced AI quality, if Gemini is unavailable. Every LLM step has a rule-based fallback.

---

## 2. Programming Languages

- JavaScript (ES2022+) for backend and frontend
- HTML5, CSS3
- JSON for data and seed files
- Markdown for documentation

---

## 3. Frameworks and Libraries

### Backend (npm)
| Package | Purpose |
|---|---|
| express | HTTP server and routing |
| mongoose | MongoDB models and queries |
| dotenv | Load environment variables locally |
| multer (memory storage) | Receive image uploads |
| helmet | Basic security headers |
| express-rate-limit | Limit abuse of submit and AI endpoints |
| cors | Only if frontend and API are on different origins |
| @google/genai (or the current official Gemini SDK) | Gemini calls; the exact package name is to be confirmed at install time |

### Frontend (loaded via CDN, versions pinned)
| Library | Purpose |
|---|---|
| Leaflet | Interactive map, markers, circles |
| Chart.js | Dashboard charts |

### Written by us (no dependency)
- Haversine distance
- DBSCAN clustering
- TF-IDF + cosine similarity (fallback for duplicates)
- Priority scoring and explanation builder

### Deliberately avoided
- Frontend frameworks (React/Vue), bundlers, ORMs beyond Mongoose, heavy ML packages. These add setup risk inside an 8-hour window.

---

## 4. Development Tools

| Tool | Use |
|---|---|
| VS Code | Main editor (laptop) |
| Git + GitHub | Version control and repository |
| Node.js + npm | Run and install |
| MongoDB Atlas dashboard / Compass (optional) | Inspect data |
| Postman or curl (optional) | API testing |
| Browser DevTools (mobile emulation) | Test phone-sized layout |
| Google AI Studio | Create the Gemini API key |
| Termux + Qamar IDE (Android) | Fallback only if the laptop is unavailable |

---

## 5. Hardware and Software Requirements

### Hardware (development)
- Laptop with at least 8 GB RAM and a stable internet connection (the Acer laptop is more than enough; no GPU is needed)
- Phone or browser mobile emulation to test the citizen view

### Software
- Windows 10/11 (or equivalent) with Node.js and Git installed
- Modern browser (Chrome, Edge or Firefox, current version)
- Internet access for Gemini, MongoDB Atlas and map tiles

### Demo environment
- Primary: hosted link on Render
- Backup: run locally with `npm start` in case of network or hosting issues

---

## 6. Technical Specifications

### 6.1 Report processing flow
1. Client sends report (text and/or image, category, lat/lng or address).
2. Server validates input (Section 6.7).
3. AI pipeline runs: categorize → summarize → duplicate check → priority.
4. Report and AI output are saved.
5. Client receives report ID and the AI explanation.

### 6.2 Categories (initial list)
Waterlogging/Drainage, Road Damage, Garbage/Waste, Streetlight, Water Supply, Electricity/Power, Public Safety Hazard, Other.

### 6.3 Categorization and summary
- **Primary:** Gemini returns structured JSON (category, summary, urgency signals) following a strict schema in the prompt.
- **Fallback:** keyword rules per category; summary = first sentence(s) trimmed to a maximum length.
- The result stores `aiSource: "gemini" | "fallback"` so the UI can show which one was used.
- Model name is read from an environment variable (`GEMINI_MODEL`), not hard-coded.

### 6.4 Duplicate detection
- Candidate set: existing open reports of the same or related category within a radius (default 150 m, configurable).
- Text similarity: embeddings via Gemini if available, otherwise TF-IDF cosine similarity.
- A report is flagged as a likely duplicate if distance and similarity both pass thresholds (initial values to be tuned on the synthetic data).
- Output: `duplicateOf` (parent report ID), similarity score and a plain-language reason. Duplicates are linked, not deleted.

### 6.5 Priority scoring (explainable)
Weighted score from 0 to 100, built from visible factors:

| Factor | Idea |
|---|---|
| Safety risk | Keywords/LLM flag (e.g., open manhole, live wire, flooding near school) |
| Category base severity | Predefined per category |
| Duplicate/report count | More reports of the same issue raise priority |
| Cluster membership | Part of a detected hotspot raises priority |
| Age | Unresolved reports gain priority over time |

Labels: Critical, High, Medium, Low (thresholds set in code). The explanation lists each factor and its contribution. Exact weights go in Architecture.md.

### 6.6 Hotspot/cluster detection
- DBSCAN over report coordinates (haversine distance), default radius around 200–300 m and a minimum of 3 reports, both configurable.
- Each cluster stores centre, radius, report count, dominant categories and a short description.
- Recurring problem = same category repeating inside the same cluster or area.

### 6.7 Input validation and limits
- Text: maximum 1000 characters.
- Image: JPEG/PNG/WebP only, maximum 2 MB (stored in the database as base64 or as a binary field, because host disks are not persistent; mark this decision in Architecture.md).
- Coordinates: latitude −90 to 90, longitude −180 to 180.
- Category: must be from the allowed list.
- All inputs are sanitized before storage and before display.

### 6.8 Status workflow
`Submitted → Reviewed → Assigned → In Progress → Resolved`
Each change is stored in a history array with a timestamp and actor role.

### 6.9 Access model (prototype)
- Citizen: no login; tracks by report ID.
- Officer/decision-maker views: protected by a simple shared passcode from an environment variable. This is a demo gate and not real authentication; it will be labelled that way in the UI and README.

### 6.10 Action brief
Gemini receives the top-priority reports and clusters (compact JSON) and returns a short brief. Fallback: a template-based brief generated from the same data.

### 6.11 Performance targets
- Report submission including AI: about 10 seconds maximum
- Dashboard and map load: under 3 seconds with 50 reports
- LLM timeout: 8 seconds, then fall back automatically

---

## 7. Third-Party Services

| Service | Use | Notes |
|---|---|---|
| Google Gemini API | Categorization, summary, embeddings, action brief, optional image understanding | Free tier has rate limits; key stays in `.env` |
| MongoDB Atlas | Database | Free shared tier; allow the host's IP (or 0.0.0.0/0 for the demo only, noted in Security.md) |
| OpenStreetMap tiles | Map background | Follow the tile usage policy; keep usage light |
| Nominatim (optional) | Address to coordinates | Strict rate limit; the map pin and coordinates are the primary location input, address search is optional |
| Render | Hosting | Free tier sleeps when idle, so the first request can be slow; open the app before the demo |
| GitHub | Repository | Never commit `.env` |

---

## 8. Dependencies and Risks

| Risk | Mitigation |
|---|---|
| Gemini rate limit or downtime | Fallback rules + TF-IDF; `aiSource` shown in the UI |
| Render cold start during the demo | Warm up the app beforehand; local backup ready |
| Atlas connection issues | Test the connection string early; keep a seed script for quick restore |
| Wrong duplicate/priority output | Officer override; limitations note |
| CDN or map tile failure | Test the demo on the same network; keep a local run as backup |
| Image analysis not reliable | Store only and label as "not analysed" unless implemented and tested |

---

## 9. Version Requirements

| Item | Requirement |
|---|---|
| Node.js | Current LTS (22.x recommended; minimum 20.x) |
| npm | Bundled with the chosen Node version |
| Express | 4.x (pinned in package.json) |
| Mongoose | 8.x |
| Leaflet | 1.9.x (pinned CDN link) |
| Chart.js | 4.x (pinned CDN link) |
| MongoDB Atlas | Free (M0) cluster |
| Browsers | Latest Chrome, Edge, Firefox; Chrome on Android |
| Gemini model | Set in `GEMINI_MODEL`; verify in Google AI Studio what is available to your key |

Exact package versions will be recorded in `package.json` and `package-lock.json` during Stage 3 (environment setup); anything not yet verified is marked "to be confirmed".

---

## 10. Environment Variables (names only; no values in the repository)

| Variable | Purpose |
|---|---|
| `PORT` | Server port |
| `MONGODB_URI` | Atlas connection string |
| `GEMINI_API_KEY` | Gemini access |
| `GEMINI_MODEL` | Model name for text tasks |
| `OFFICER_PASSCODE` | Demo gate for officer/decision-maker views |
| `NODE_ENV` | `development` or `production` |

A `.env.example` with placeholders will be committed; the real `.env` is git-ignored.

---

## 11. Open Points (for Architecture.md and later)

- Final priority weights and thresholds
- Duplicate radius and similarity thresholds (tuned on the synthetic data)
- Whether to store images in MongoDB or skip images in the hosted demo
- Final folder structure
