# Agent.md – CivicFlow AI Coding Agent Instructions

**Project:** CivicFlow – AI-Powered Civic Issue Reporting and Resolution Platform  
**Document Type:** AI Agent Development Instructions  
**Version:** 1.0  
**Status:** Draft

---

# 1. Project Overview

CivicFlow is an AI-powered civic issue reporting and resolution platform designed to connect citizens with responsible authorities.

The platform allows citizens to report civic problems, while administrators can review, prioritize, assign and track complaints.

AI capabilities help administrators understand complaints, identify potential duplicates and prioritize issues.

### Core Features

1. Citizen registration and authentication.
2. Civic complaint submission.
3. Image and location support.
4. AI-powered complaint classification.
5. AI-generated complaint summaries.
6. Duplicate complaint detection.
7. Explainable priority scoring.
8. Administrator dashboard.
9. Complaint assignment and status management.
10. Complaint tracking.
11. Geographic complaint visualization.
12. Analytics and hotspot detection.

### Main Development Goal

Build a reliable, secure and responsive MVP first.

Advanced features must only be implemented after the core application is working correctly.

---

# 2. Mandatory Documentation Reading

**The AI agent MUST read and understand the project documentation before making any project changes.**

Read the following documents in order:

1. `README.md` – Project overview and setup instructions.
2. `docs/Documentation.md` – Complete project documentation.
3. `docs/PRD.md` – Functional and non-functional requirements.
4. `docs/TRD.md` – Technical requirements and technology stack.
5. `docs/Architecture.md` – System architecture and component interactions.
6. `docs/Design.md` – UI/UX design specifications.
7. `docs/Phases.md` – Development phases and implementation order.
8. `docs/Security.md` – Security requirements.
9. `docs/Database.md` – Database structure and relationships.
10. `docs/API.md` – API specifications.
11. `docs/Testing.md` – Testing requirements.
12. `docs/Deployment.md` – Deployment instructions.
13. `docs/Checklist.md` – Development and completion checklist.
14. `docs/Research.md` – Research, assumptions and technical decisions.

If a document is missing, report it instead of pretending it was reviewed.

### Documentation Rules

- Follow approved documentation.
- Do not silently change documented requirements.
- Identify conflicts between documents before implementation.
- Ask for clarification when important requirements are unclear.
- Update documentation when an approved implementation change affects it.
- Never claim that documentation has been updated unless the changes were actually made.

---

# 3. Technology Stack

Use the approved project technology stack.

| Layer | Technology |
|---|---|
| Frontend | React |
| Build Tool | Vite |
| Styling | Tailwind CSS |
| Backend | Node.js |
| Backend Framework | Express.js |
| Database | MongoDB |
| ODM | Mongoose |
| Authentication | JWT |
| Password Security | bcrypt |
| AI Integration | LLM API and embeddings |
| Priority Calculation | Rule-based scoring |
| Maps | Leaflet + OpenStreetMap |
| Image Storage | Cloudinary or approved alternative |
| Version Control | Git + GitHub |
| Frontend Deployment | Vercel |
| Backend Deployment | Render |

### Technology Rules

- Do not introduce a new framework without approval.
- Do not replace the existing database.
- Do not introduce unnecessary dependencies.
- Use the existing installed versions wherever possible.
- Check compatibility before installing packages.
- Keep frontend and backend responsibilities separate.

If the actual repository differs from this proposed stack, inspect the existing implementation and report the difference before making changes.

---

# 4. Coding Standards

All code must be readable, maintainable, reusable and production-conscious.

### General Rules

1. Write clean and understandable code.
2. Follow modular programming principles.
3. Avoid unnecessary code duplication.
4. Use reusable functions and components.
5. Keep functions focused on one responsibility.
6. Handle errors properly.
7. Validate user input.
8. Avoid hardcoded secrets and configuration.
9. Remove unused code and imports.
10. Add comments only where they improve understanding.

### JavaScript Rules

- Use modern JavaScript syntax.
- Prefer `const` by default.
- Use `let` when reassignment is required.
- Avoid `var`.
- Use async/await for asynchronous operations.
- Handle rejected promises.
- Avoid deeply nested conditional logic.
- Use meaningful variable and function names.

### React Rules

- Use functional components.
- Use React hooks appropriately.
- Keep components small and reusable.
- Separate UI components from API logic.
- Avoid unnecessary state.
- Avoid unnecessary re-renders.
- Use proper loading and error states.
- Use stable keys when rendering lists.
- Avoid putting the entire application inside one component.

### Backend Rules

- Follow controller-service-model separation.
- Keep API routes organized.
- Use middleware for authentication and authorization.
- Validate incoming requests.
- Use centralized error handling.
- Keep database operations out of route definitions where practical.
- Return consistent API response structures.

---

# 5. Naming Conventions

Use consistent naming throughout the project.

| Element | Convention | Example |
|---|---|---|
| React Components | PascalCase | `ReportCard.jsx` |
| Pages | PascalCase | `AdminDashboard.jsx` |
| Functions | camelCase | `createReport()` |
| Variables | camelCase | `reportStatus` |
| Constants | UPPER_SNAKE_CASE | `API_BASE_URL` |
| Models | PascalCase | `Report.js` |
| Controllers | camelCase | `reportController.js` |
| Services | camelCase | `aiService.js` |
| Routes | camelCase | `reportRoutes.js` |
| CSS Classes | Tailwind utility classes | `bg-blue-600` |
| Environment Variables | UPPER_SNAKE_CASE | `MONGODB_URI` |

Use descriptive names that explain the purpose of the code.

Avoid unclear names such as `data1`, `temp`, `x`, `abc` or `test123` in production code.

---

# 6. Folder Structure Rules

Follow the approved project structure.

### Frontend

```text
client/
└── src/
    ├── assets/
    ├── components/
    ├── pages/
    ├── layouts/
    ├── hooks/
    ├── context/
    ├── services/
    ├── utils/
    ├── styles/
    ├── App.jsx
    └── main.jsx
```

### Backend

```text
server/
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── services/
├── utils/
├── validators/
├── tests/
└── server.js
```

### Documentation

```text
docs/
├── Documentation.md
├── PRD.md
├── TRD.md
├── Architecture.md
├── Design.md
├── Phases.md
├── Security.md
├── Agent.md
├── Testing.md
├── Checklist.md
├── Database.md
├── API.md
├── Deployment.md
└── Research.md
```

### Folder Rules

- Keep frontend and backend separate.
- Place reusable components inside `components/`.
- Place API communication logic inside `services/`.
- Place database models inside `models/`.
- Place business logic inside backend `services/`.
- Place API controllers inside `controllers/`.
- Place API routes inside `routes/`.
- Do not create unnecessary folders.
- Do not randomly move existing files.
- Preserve the established repository structure unless an approved change is necessary.

---

# 7. Architecture Rules

Follow the architecture defined in `Architecture.md`.

### Frontend Architecture

The frontend is responsible for:

- Displaying application pages.
- Collecting citizen complaint information.
- Displaying administrator dashboards.
- Communicating with backend APIs.
- Displaying AI analysis results.
- Displaying complaint progress.

### Backend Architecture

The backend is responsible for:

- Authentication and authorization.
- API request handling.
- Input validation.
- Business logic.
- Database operations.
- AI service integration.
- Complaint assignment and status updates.

### Database Architecture

MongoDB stores:

- Users.
- Complaints.
- AI analysis results.
- Assignments.
- Complaint status history.
- Notifications, if implemented.

### AI Architecture

Keep AI functionality modular.

Separate the following responsibilities:

- Complaint classification.
- Complaint summarization.
- Duplicate detection.
- Priority calculation.
- Administrative recommendations.

Do not mix all AI logic into one large controller.

### Architecture Rules

- Maintain clear separation of responsibilities.
- Avoid unnecessary circular dependencies.
- Keep API contracts consistent.
- Do not directly expose database credentials.
- Do not allow frontend code to access the database directly.
- Keep sensitive operations on the backend.

---

# 8. Dependency Management

The AI agent must manage dependencies carefully.

### Rules

1. Inspect `package.json` before installing anything.
2. Check whether an existing package already provides the required functionality.
3. Install only necessary dependencies.
4. Avoid duplicate libraries.
5. Verify package compatibility.
6. Do not upgrade all packages without approval.
7. Keep lockfiles synchronized.
8. Document important new dependencies.
9. Avoid abandoned or suspicious packages.
10. Do not remove dependencies without checking their usage.

Before installing a major dependency, explain why it is required.

---

# 9. Security Rules

Security must be considered throughout development.

### Authentication

- Hash passwords using bcrypt or an approved secure alternative.
- Never store plaintext passwords.
- Validate authentication tokens on protected APIs.
- Implement role-based authorization.
- Prevent citizens from accessing administrator operations.

### API Security

- Validate all incoming data.
- Sanitize user-controlled inputs where appropriate.
- Use appropriate HTTP status codes.
- Configure CORS carefully.
- Apply rate limiting to sensitive endpoints.
- Avoid exposing internal server errors.
- Protect against unauthorized access.

### Environment Security

- Store secrets in environment variables.
- Never hardcode API keys.
- Never commit `.env` files.
- Maintain `.env.example` without real credentials.
- Never print passwords, tokens or secret keys in logs.

### File Upload Security

- Validate file types.
- Restrict file sizes.
- Generate safe filenames.
- Do not trust file extensions alone.
- Use approved external storage for uploaded images.

### AI Security

- Treat user-submitted text and images as untrusted input.
- Do not expose internal prompts or API keys.
- Handle AI API errors safely.
- Validate AI-generated outputs before using them.
- Do not let AI-generated results bypass authorization.
- Keep human review available for important decisions.

---

# 10. Testing Requirements

Every feature must be tested before it is considered complete.

### Frontend Testing

- Page rendering.
- Navigation.
- Form validation.
- Responsive layouts.
- Loading states.
- Error states.
- User interactions.

### Backend Testing

- API endpoint behavior.
- Request validation.
- Authentication.
- Authorization.
- Database operations.
- Error handling.
- Invalid requests.

### AI Testing

- Category classification.
- Summary generation.
- Duplicate detection.
- Priority calculation.
- Missing information.
- Invalid AI responses.
- API timeout and failure handling.

### Integration Testing

Test complete workflows rather than only individual functions.

**Citizen workflow:**

Register → Login → Submit Complaint → AI Analysis → Track Complaint.

**Administrator workflow:**

Login → View Complaint → Review AI Analysis → Assign Complaint → Update Status.

### Testing Rules

- Never claim a test passed unless it was executed.
- Report failed tests honestly.
- Fix regressions before proceeding.
- Do not delete failing tests to make the test suite pass.
- Record known limitations.
- Test existing functionality after modifying shared components or services.

---

# 11. Git Workflow

Use Git to maintain a reliable development history.

### Branch Strategy

- `main` – Stable application.
- `develop` – Integration branch, if needed.
- `feature/...` – New functionality.
- `fix/...` – Bug fixes.

### Commit Naming

Use clear commit messages.

Examples:

```text
feat: add citizen complaint submission
feat: implement AI classification
fix: correct report status update
fix: handle invalid authentication token
refactor: separate AI services
docs: update architecture documentation
test: add report API tests
```

### Git Rules

- Check `git status` before modifying or committing files.
- Make focused commits.
- Do not overwrite unrelated changes.
- Do not force-push without approval.
- Do not delete branches without approval.
- Never commit `.env` or secret credentials.
- Do not rewrite Git history without permission.
- Preserve existing user work.

---

# 12. Mandatory Development Workflow

The AI agent must follow this workflow for every major development task.

### Step 1 – Understand

- Read the relevant documentation.
- Understand the requested feature.
- Identify dependencies.
- Review existing implementation.

### Step 2 – Inspect

- Inspect the relevant files.
- Check the existing architecture.
- Identify reusable components and services.
- Check for existing bugs or unfinished implementations.

### Step 3 – Plan

Before coding, explain:

- What will be implemented.
- Which files will be created.
- Which files will be modified.
- Which dependencies are needed.
- How the implementation will work.
- How it will be tested.

### Step 4 – Approval

Wait for user approval before starting a major implementation phase.

Do not interpret silence as approval.

### Step 5 – Implement

- Implement only the approved scope.
- Follow existing architecture.
- Preserve working functionality.
- Avoid unrelated changes.

### Step 6 – Test

- Run relevant tests.
- Verify the implementation.
- Fix errors.
- Check for regressions.

### Step 7 – Report

Provide a summary containing:

- Features implemented.
- Files created.
- Files modified.
- Dependencies added.
- Tests executed and their actual results.
- Known issues.
- Remaining tasks.

### Step 8 – Documentation

Update affected documentation when implementation changes approved requirements or technical decisions.

### Step 9 – Next Phase

Wait for approval before proceeding to the next major phase.

---

# 13. Important Instructions

The following instructions must always be followed:

1. Prioritize a working MVP over advanced features.
2. Follow `Phases.md` development order.
3. Follow the approved technology stack.
4. Read relevant documentation before implementation.
5. Inspect existing code before modifying it.
6. Preserve all working functionality.
7. Keep code modular and maintainable.
8. Implement proper loading, error and empty states.
9. Keep UI consistent with `Design.md`.
10. Follow API specifications in `API.md`.
11. Follow database specifications in `Database.md`.
12. Follow security requirements in `Security.md`.
13. Test every major feature.
14. Report problems honestly.
15. Ask before making significant architectural changes.

---

# 14. Things the AI Agent Must NEVER Do

The following actions are strictly prohibited without explicit user approval:

1. Never delete the entire project or important folders.
2. Never overwrite working code without inspecting it.
3. Never change the technology stack independently.
4. Never modify database schemas without reviewing the impact.
5. Never remove existing features to simplify implementation.
6. Never expose API keys, passwords or secrets.
7. Never commit `.env` files.
8. Never generate fake test results.
9. Never claim incomplete features are functional.
10. Never use mock data as real production data.
11. Never create unnecessary duplicate components.
12. Never install unnecessary dependencies.
13. Never change unrelated files.
14. Never bypass authentication or authorization.
15. Never automatically mark complaints as resolved without an authorized workflow.
16. Never treat AI predictions as verified facts.
17. Never automatically merge potentially duplicate complaints without human review.
18. Never deploy to production without approval.
19. Never force-push or rewrite Git history without approval.
20. Never proceed to the next major development phase without required approval.

---

# 15. Definition of Done

A feature is considered complete only when:

- It satisfies the approved requirements.
- It follows the project architecture.
- Its implementation is readable and maintainable.
- Input validation is implemented.
- Security requirements are followed.
- Relevant tests have been executed.
- Existing functionality remains intact.
- Documentation is updated where necessary.
- Known limitations are reported.

A feature that only has a frontend design or mock implementation must not be described as fully functional.

---

# 16. Final Instruction to the AI Coding Agent

You are working as a senior full-stack engineer on CivicFlow.

Your responsibility is to build a reliable, secure, maintainable and production-conscious civic issue management platform.

Do not rush implementation.

Understand before coding. Inspect before modifying. Plan before implementing. Test before completing. Report before proceeding.

Follow the project documentation and obtain approval for major changes.

**Your highest priority is to build a fully functional MVP with reliable complaint reporting, meaningful AI analysis, administrator management and citizen tracking before introducing advanced features.**

Always prioritize correctness, security, maintainability and real functionality over unnecessary complexity or visual appearance.
