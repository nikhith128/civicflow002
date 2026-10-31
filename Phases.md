# Phases.md – CivicFlow

**Project:** CivicFlow – AI-Powered Civic Issue Reporting and Resolution Platform  
**Document Type:** Development Phase Plan  
**Version:** 1.0  
**Status:** Draft

---

# 1. Development Strategy

CivicFlow will be developed through a structured, phase-by-phase development approach.

The development process will prioritize a functional Minimum Viable Product (MVP) before implementing advanced features.

Each phase must be completed, tested and reviewed before moving to the next phase.

### Development Priorities

- **P0 – MVP:** Essential features required for a working application.
- **P1 – Enhanced Features:** Improvements that make the platform more intelligent and useful.
- **P2 – Advanced Features:** Additional capabilities for scalability and a more complete user experience.

### Proposed Technology Stack

- Frontend: React + Vite + Tailwind CSS.
- Backend: Node.js + Express.js.
- Database: MongoDB.
- AI: LLM API, embeddings and rule-based priority scoring.
- Maps: Leaflet + OpenStreetMap.
- Authentication: JWT.
- Image Storage: Cloudinary or an equivalent service.
- Version Control: Git + GitHub.
- Deployment: Vercel + Render.

The final implementation must follow the approved TRD and Architecture documents.

---

# 2. Phase 0 – Project Planning and Environment Setup

**Priority:** P0 – MVP

### Objective

Prepare the development environment, project structure and required services before implementation.

### Features / Tasks

- Review and finalize project documentation.
- Set up GitHub repository.
- Initialize frontend and backend projects.
- Configure environment variables.
- Install required dependencies.
- Configure MongoDB connection.
- Configure frontend and backend communication.
- Establish development conventions.

### Files to Create

```
civicflow/
├── client/
├── server/
├── docs/
├── .gitignore
├── .env.example
└── README.md
```

Additional files:

- `client/package.json`
- `server/package.json`
- `client/.env.example`
- `server/.env.example`

### Dependencies

- Node.js and npm.
- Git and GitHub.
- MongoDB Atlas or local MongoDB.
- VS Code.
- Required API credentials, when applicable.

### Expected Output

A properly configured development environment with frontend and backend applications running independently.

### Testing Requirements

- Verify Node.js and npm installation.
- Verify frontend startup.
- Verify backend startup.
- Test database connectivity.
- Verify environment variables.
- Verify Git repository and initial commit.

### Completion Criteria

- Frontend runs successfully.
- Backend runs successfully.
- Database connection works.
- Project structure is established.
- No secrets are committed to GitHub.

---

# 3. Phase 1 – Frontend Foundation and UI Development

**Priority:** P0 – MVP

### Objective

Build the basic user interface and navigation structure for citizens and administrators.

### Features / Tasks

- Create landing page.
- Create login and registration pages.
- Create citizen dashboard.
- Create administrator dashboard layout.
- Create navigation bar and sidebar.
- Create reusable UI components.
- Implement responsive layouts.
- Establish color palette and typography.

### Files to Create

```
client/src/
├── components/
│   ├── Navbar.jsx
│   ├── Sidebar.jsx
│   ├── Button.jsx
│   ├── ReportCard.jsx
│   └── StatusBadge.jsx
│
├── pages/
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── CitizenDashboard.jsx
│   └── AdminDashboard.jsx
│
├── layouts/
│   ├── CitizenLayout.jsx
│   └── AdminLayout.jsx
│
├── assets/
├── styles/
│   └── index.css
├── App.jsx
└── main.jsx
```

### Dependencies

- Phase 0 completed.
- React.
- React Router.
- Tailwind CSS.
- Icon library.

### Expected Output

A responsive frontend with the main pages and navigation working.

At this stage, temporary mock data may be used for visual development and must be clearly separated from real backend data.

### Testing Requirements

- Verify page navigation.
- Verify responsive layouts.
- Check reusable components.
- Test buttons and navigation interactions.
- Check form appearance and validation.

### Completion Criteria

- All essential pages are accessible.
- Citizen and administrator layouts are separate.
- Responsive design works.
- No broken navigation links.
- UI components are reusable.

---

# 4. Phase 2 – Backend Foundation and Database Integration

**Priority:** P0 – MVP

### Objective

Develop the backend infrastructure and connect the frontend to the database.

### Features / Tasks

- Configure Express server.
- Create database connection.
- Create user model.
- Create complaint/report model.
- Implement REST API structure.
- Configure middleware.
- Implement centralized error handling.
- Connect frontend to backend APIs.

### Files to Create

```
server/
├── config/
│   └── database.js
│
├── controllers/
│   └── reportController.js
│
├── models/
│   ├── User.js
│   └── Report.js
│
├── routes/
│   ├── authRoutes.js
│   └── reportRoutes.js
│
├── middleware/
│   └── errorMiddleware.js
│
├── services/
├── utils/
├── server.js
└── package.json
```

### Dependencies

- Phase 0 completed.
- Express.js.
- Mongoose.
- dotenv.
- CORS.
- MongoDB.

### Expected Output

A functioning backend connected to MongoDB with basic API endpoints.

### Testing Requirements

- Test database connection.
- Test API health endpoint.
- Test report creation.
- Test report retrieval.
- Test invalid requests.
- Test error responses.

### Completion Criteria

- Backend APIs respond correctly.
- Database stores complaint records.
- Data can be retrieved successfully.
- Errors are handled consistently.
- Frontend can communicate with the backend.

---

# 5. Phase 3 – Authentication and User Management

**Priority:** P0 – MVP

### Objective

Implement secure authentication and role-based access for citizens and administrators.

### Features / Tasks

- Citizen registration.
- User login.
- Password hashing.
- JWT authentication.
- Authentication middleware.
- Role-based authorization.
- Protected routes.
- Logout functionality.
- User profile management.

### Files to Create or Modify

```
client/src/
├── context/
│   └── AuthContext.jsx
├── services/
│   └── authService.js
└── pages/
    ├── Login.jsx
    └── Register.jsx

server/
├── controllers/
│   └── authController.js
├── routes/
│   └── authRoutes.js
├── middleware/
│   ├── authMiddleware.js
│   └── roleMiddleware.js
└── models/
    └── User.js
```

### Dependencies

- Phase 2 completed.
- bcrypt or bcryptjs.
- jsonwebtoken.
- Authentication configuration.

### Expected Output

Citizens and administrators can securely log in and access authorized sections.

### Testing Requirements

- Test registration.
- Test login with valid credentials.
- Test incorrect passwords.
- Test expired or invalid tokens.
- Test protected routes.
- Test role-based access restrictions.

### Completion Criteria

- Authentication works correctly.
- Passwords are securely hashed.
- Unauthorized users cannot access protected APIs.
- Citizens cannot access administrator-only operations.

---

# 6. Phase 4 – Civic Complaint Reporting and Tracking

**Priority:** P0 – MVP

### Objective

Implement the complete complaint submission and tracking workflow.

### Features / Tasks

- Submit complaint title and description.
- Select complaint category.
- Upload complaint images.
- Capture or select location.
- Store complaint information.
- Generate unique complaint ID.
- Display submitted complaints.
- View individual complaint details.
- Track complaint status.
- Maintain status history.

### Files to Create or Modify

```
client/src/
├── pages/
│   ├── ReportIssue.jsx
│   ├── MyReports.jsx
│   └── ReportDetails.jsx
├── components/
│   ├── ReportForm.jsx
│   ├── ImageUpload.jsx
│   └── StatusTimeline.jsx
└── services/
    └── reportService.js

server/
├── controllers/
│   └── reportController.js
├── models/
│   ├── Report.js
│   └── StatusHistory.js
├── routes/
│   └── reportRoutes.js
└── services/
    └── imageService.js
```

### Dependencies

- Phase 3 completed.
- MongoDB.
- Image storage service.
- Location selection or geolocation functionality.

### Expected Output

Citizens can submit complaints, view their reports and track complaint progress.

### Testing Requirements

- Test complaint submission.
- Test missing and invalid fields.
- Test image upload.
- Test location information.
- Test complaint ID generation.
- Test complaint retrieval.
- Test citizen access restrictions.
- Test status history.

### Completion Criteria

- Complaint submission works end-to-end.
- Reports are stored in MongoDB.
- Citizens can view their own complaints.
- Each complaint has a unique identifier.
- Status updates are reflected in the tracking page.

---

# 7. Phase 5 – AI-Powered Complaint Intelligence

**Priority:** P0 – MVP

### Objective

Implement meaningful AI capabilities that improve complaint understanding and prioritization.

AI functionality is a core requirement of CivicFlow and must go beyond a simple chatbot.

### Features / Tasks

#### 1. Automatic Category Classification

- Analyze complaint descriptions.
- Predict the appropriate category.
- Return the predicted category and confidence where supported.

#### 2. Complaint Summarization

- Generate a short summary.
- Identify the main civic problem.
- Display the summary to administrators.

#### 3. Duplicate Detection

- Generate text embeddings or use an appropriate similarity method.
- Compare new complaints with existing reports.
- Identify potentially similar complaints.
- Display possible duplicates for human review.

#### 4. Explainable Priority Scoring

- Calculate complaint priority using defined factors.
- Consider safety risk, urgency, issue category and affected area where information is available.
- Display the priority level.
- Show the reasons behind the score.

### Files to Create or Modify

```
server/
├── services/
│   ├── aiService.js
│   ├── classificationService.js
│   ├── summaryService.js
│   ├── duplicateDetectionService.js
│   └── priorityService.js
│
├── controllers/
│   └── aiController.js
│
├── routes/
│   └── aiRoutes.js
│
└── models/
    └── AIAnalysis.js

client/src/
├── components/
│   ├── AIInsights.jsx
│   ├── PriorityIndicator.jsx
│   └── DuplicateSuggestions.jsx
```

### Dependencies

- Phase 4 completed.
- AI API or embedding model.
- Similarity calculation method.
- Defined priority scoring rules.
- Environment configuration for AI credentials.

### Expected Output

Every new complaint can be analyzed to produce useful information for administrators.

### Testing Requirements

- Test different complaint categories.
- Test short and long descriptions.
- Test duplicate and non-duplicate complaints.
- Test priority scoring.
- Test missing or incomplete information.
- Test AI API failures and timeouts.
- Verify that AI results are stored correctly.
- Verify that administrators can review AI suggestions.

### Completion Criteria

- Category classification works.
- Complaint summaries are generated.
- Potential duplicates are identified.
- Priority scores have understandable explanations.
- AI failures do not break complaint submission.
- AI outputs are clearly identified as predictions or suggestions.

---

# 8. Phase 6 – Administrator Management and Assignment

**Priority:** P0 – MVP

### Objective

Allow administrators to review complaints, assign them and manage their progress.

### Features / Tasks

- Display all complaints.
- Search and filter complaints.
- Filter by category and priority.
- View AI analysis.
- Review potential duplicates.
- Assign complaints to responsible authorities.
- Update complaint status.
- Maintain status history.
- Display assignment information.

### Files to Create or Modify

```
client/src/
├── pages/
│   ├── AdminDashboard.jsx
│   ├── ManageReports.jsx
│   └── ReportDetails.jsx
│
├── components/
│   ├── ReportTable.jsx
│   ├── AssignmentModal.jsx
│   └── StatusUpdater.jsx

server/
├── controllers/
│   ├── adminController.js
│   └── assignmentController.js
├── routes/
│   └── adminRoutes.js
├── models/
│   └── Assignment.js
└── middleware/
    └── roleMiddleware.js
```

### Dependencies

- Phase 3 completed.
- Phase 4 completed.
- Phase 5 completed.

### Expected Output

Administrators can review AI-analyzed complaints, assign them and update their progress.

### Testing Requirements

- Test complaint listing.
- Test filtering and search.
- Test assignment creation.
- Test status updates.
- Test administrator permissions.
- Test status history.
- Verify citizen tracking reflects changes.

### Completion Criteria

- Administrator dashboard displays real complaint data.
- Complaints can be assigned.
- Status updates are stored.
- Citizens can see progress.
- Unauthorized users cannot manage complaints.

---

# 9. Phase 7 – Maps, Hotspots and Analytics

**Priority:** P1 – Enhanced Features

### Objective

Provide geographical insights and analytical information about civic complaints.

### Features / Tasks

- Display complaints on an interactive map.
- Add complaint location markers.
- Filter by category.
- Filter by priority.
- Group nearby complaints.
- Identify geographical clusters.
- Display recurring issue areas.
- Show dashboard analytics.

### Files to Create or Modify

```
client/src/
├── pages/
│   ├── IssueMap.jsx
│   └── Analytics.jsx
│
├── components/
│   ├── MapView.jsx
│   ├── MapMarker.jsx
│   ├── MapFilters.jsx
│   └── AnalyticsCharts.jsx

server/
├── controllers/
│   └── analyticsController.js
├── routes/
│   └── analyticsRoutes.js
└── services/
    └── hotspotService.js
```

### Dependencies

- Phase 4 completed.
- Phase 6 completed.
- Leaflet.
- OpenStreetMap.
- Geographic complaint coordinates.

### Expected Output

Administrators can view complaint distribution, recurring problems and geographical hotspots.

### Testing Requirements

- Test map rendering.
- Test location markers.
- Test category filters.
- Test priority filters.
- Test cluster visualization.
- Test analytics using known sample data.
- Handle missing location information.

### Completion Criteria

- Map displays valid complaint locations.
- Filters work correctly.
- Geographic clusters are meaningful.
- Analytics reflect actual stored data.

---

# 10. Phase 8 – Advanced Features and User Experience Improvements

**Priority:** P2 – Advanced Features

### Objective

Improve platform usability and introduce additional capabilities after the MVP is stable.

### Features / Tasks

- Email notifications.
- In-app notifications.
- Advanced search.
- Advanced analytics.
- AI-generated administrative action briefs.
- Improved duplicate detection.
- Complaint feedback system.
- Dark mode.
- Performance improvements.
- Additional administrative tools.

### Files to Create or Modify

Depending on the selected features:

```
client/src/
├── components/
│   └── NotificationPanel.jsx
├── pages/
│   └── Settings.jsx

server/
├── services/
│   ├── notificationService.js
│   └── actionBriefService.js
└── models/
    └── Notification.js
```

### Dependencies

- Core MVP completed.
- Phase 7 completed where applicable.
- Required external services and API credentials.

### Expected Output

A more complete platform with improved usability and advanced capabilities.

### Testing Requirements

- Test notification delivery.
- Test additional AI features.
- Test advanced filters.
- Test dark mode.
- Test performance.
- Verify existing MVP features remain functional.

### Completion Criteria

- New features work correctly.
- Existing functionality is not broken.
- Additional features are documented.
- Performance and usability remain acceptable.

---

# 11. Phase 9 – Quality Assurance and Security

**Priority:** P0 – Required Before Release

### Objective

Verify the complete application and ensure it is secure, stable and ready for demonstration or deployment.

### Features / Tasks

- Frontend testing.
- Backend API testing.
- Database validation.
- Authentication testing.
- Authorization testing.
- AI output validation.
- Input validation.
- Error handling.
- Responsive testing.
- Security review.
- Performance testing.

### Files to Create or Modify

```
client/
├── tests/

server/
├── tests/

docs/
├── Testing.md
├── Security.md
└── Checklist.md
```

### Dependencies

- All required MVP phases completed.

### Expected Output

A tested and stable application with documented limitations and known issues.

### Testing Requirements

- Test the complete citizen workflow.
- Test the complete administrator workflow.
- Test complaint submission and tracking.
- Test AI classification and duplicate detection.
- Test invalid inputs.
- Test authentication and permissions.
- Test API failure scenarios.
- Test responsive layouts.
- Test database persistence.
- Check for exposed secrets and sensitive data.

### Completion Criteria

- Critical bugs are fixed.
- Essential workflows pass.
- Security issues are addressed.
- Known limitations are documented.
- No test is reported as passed without actually running it.

---

# 12. Phase 10 – Deployment and Documentation

**Priority:** P0 – Required for Release

### Objective

Deploy CivicFlow and prepare the project for demonstration and future maintenance.

### Features / Tasks

- Configure production environment variables.
- Deploy frontend.
- Deploy backend.
- Configure production database.
- Configure CORS.
- Configure image storage.
- Verify AI API connectivity.
- Update README.
- Document setup instructions.
- Prepare demonstration data.
- Prepare project demonstration.

### Files to Create or Modify

```
civicflow/
├── README.md
├── .env.example
├── docs/
│   ├── Deployment.md
│   ├── Testing.md
│   └── Research.md
└── client/
└── server/
```

### Dependencies

- Phase 9 completed.
- Hosting accounts.
- Database hosting.
- Required external service credentials.

### Expected Output

A deployed CivicFlow application with setup instructions, documentation and a working demonstration.

### Testing Requirements

- Test production frontend.
- Test production backend.
- Test database connectivity.
- Test authentication.
- Test complaint submission.
- Test AI analysis.
- Test assignment and tracking.
- Test image uploads.
- Verify production environment variables.

### Completion Criteria

- Frontend is accessible.
- Backend is operational.
- Database connection works.
- Main application workflows work in production.
- README contains setup and usage instructions.
- Demo limitations are disclosed.

---

# 13. MVP Completion Definition

The MVP is considered complete when the following essential workflow works end-to-end:

1. Citizen registers or logs in.
2. Citizen submits a civic complaint.
3. Complaint details and location are stored.
4. AI classifies the complaint.
5. AI generates a short summary.
6. Duplicate detection identifies possible similar reports.
7. Priority scoring produces an explainable result.
8. Administrator reviews the complaint.
9. Administrator assigns the complaint.
10. Administrator updates the status.
11. Citizen tracks complaint progress.

The MVP must use real database persistence and working backend APIs. Mock data may be used for development, but must not be presented as real platform activity.

---

# 14. Development Priority Summary

| Phase    | Description          | Priority |
| -------- | -------------------- | -------- |
| Phase 0  | Planning and Setup   | P0       |
| Phase 1  | Frontend Foundation  | P0       |
| Phase 2  | Backend and Database | P0       |
| Phase 3  | Authentication       | P0       |
| Phase 4  | Complaint Reporting  | P0       |
| Phase 5  | AI Intelligence      | P0       |
| Phase 6  | Admin Management     | P0       |
| Phase 7  | Maps and Analytics   | P1       |
| Phase 8  | Advanced Features    | P2       |
| Phase 9  | QA and Security      | Required |
| Phase 10 | Deployment           | Required |

---

# 15. Development Rules

1. Complete one phase before starting the next.
2. Review and test every phase.
3. Do not implement advanced features before completing the MVP.
4. Do not overwrite working code without understanding its impact.
5. Maintain consistent naming conventions and project structure.
6. Update documentation whenever architecture or implementation changes.
7. Never expose API keys or secrets.
8. Use synthetic data for demonstrations unless real data is authorized.
9. Never claim an AI feature works unless it has been implemented and tested.
10. Keep Git commits meaningful and frequent.
11. Record known bugs and limitations.
12. Obtain approval before moving to the next major development phase.

**Final Goal:** Build a fully functional CivicFlow MVP first, then progressively transform it into a reliable, intelligent and scalable civic issue management platform.
