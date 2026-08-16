CIVIC-PULSE/
│
├── README.md
├── LICENSE
├── .gitignore
│
├── PPT/
│   └── CIVIC-PULSE_Presentation.pptx
│
├── DOCUMENTATION/
│   ├── Project-Overview.md
│   ├── System-Architecture.md
│   ├── API-Documentation.md
│   ├── Database-Design.md
│   ├── Security.md
│   └── Future-Scope.md
│
├── PROTOTYPE/
│   │
│   ├── frontend/
│   │   ├── public/
│   │   │   ├── images/
│   │   │   ├── icons/
│   │   │   └── favicon.ico
│   │   │
│   │   ├── src/
│   │   │   ├── assets/
│   │   │   │   ├── images/
│   │   │   │   ├── icons/
│   │   │   │   └── fonts/
│   │   │   │
│   │   │   ├── components/
│   │   │   │   ├── common/
│   │   │   │   │   ├── Navbar.jsx
│   │   │   │   │   ├── Footer.jsx
│   │   │   │   │   ├── Button.jsx
│   │   │   │   │   ├── Modal.jsx
│   │   │   │   │   ├── Loader.jsx
│   │   │   │   │   └── ErrorMessage.jsx
│   │   │   │   │
│   │   │   │   ├── citizen/
│   │   │   │   │   ├── IssueCard.jsx
│   │   │   │   │   ├── IssueForm.jsx
│   │   │   │   │   ├── IssueTracker.jsx
│   │   │   │   │   └── IssueMap.jsx
│   │   │   │   │
│   │   │   │   └── authority/
│   │   │   │       ├── IssueTable.jsx
│   │   │   │       ├── IssueDetails.jsx
│   │   │   │       ├── AssignIssue.jsx
│   │   │   │       ├── StatusManager.jsx
│   │   │   │       └── Analytics.jsx
│   │   │   │
│   │   │   ├── pages/
│   │   │   │   ├── Home.jsx
│   │   │   │   ├── Login.jsx
│   │   │   │   ├── Register.jsx
│   │   │   │   ├── ReportIssue.jsx
│   │   │   │   ├── MyIssues.jsx
│   │   │   │   ├── IssueDetails.jsx
│   │   │   │   ├── AuthorityDashboard.jsx
│   │   │   │   └── NotFound.jsx
│   │   │   │
│   │   │   ├── services/
│   │   │   │   ├── api.js
│   │   │   │   ├── auth.js
│   │   │   │   ├── maps.js
│   │   │   │   └── ai.js
│   │   │   │
│   │   │   ├── context/
│   │   │   │   ├── AuthContext.jsx
│   │   │   │   └── IssueContext.jsx
│   │   │   │
│   │   │   ├── utils/
│   │   │   │   ├── validators.js
│   │   │   │   └── helpers.js
│   │   │   │
│   │   │   ├── App.jsx
│   │   │   ├── main.jsx
│   │   │   └── index.css
│   │   │
│   │   ├── package.json
│   │   ├── vite.config.js
│   │   └── .env.example
│   │
│   ├── backend/
│   │   ├── src/
│   │   │   ├── config/
│   │   │   │   ├── db.js
│   │   │   │   └── env.js
│   │   │   │
│   │   │   ├── controllers/
│   │   │   │   ├── authController.js
│   │   │   │   ├── issueController.js
│   │   │   │   ├── authorityController.js
│   │   │   │   └── analyticsController.js
│   │   │   │
│   │   │   ├── models/
│   │   │   │   ├── User.js
│   │   │   │   ├── Issue.js
│   │   │   │   └── Authority.js
│   │   │   │
│   │   │   ├── routes/
│   │   │   │   ├── authRoutes.js
│   │   │   │   ├── issueRoutes.js
│   │   │   │   ├── authorityRoutes.js
│   │   │   │   └── analyticsRoutes.js
│   │   │   │
│   │   │   ├── middleware/
│   │   │   │   ├── authMiddleware.js
│   │   │   │   ├── roleMiddleware.js
│   │   │   │   └── errorMiddleware.js
│   │   │   │
│   │   │   ├── services/
│   │   │   │   ├── aiService.js
│   │   │   │   ├── mapsService.js
│   │   │   │   └── notificationService.js
│   │   │   │
│   │   │   └── server.js
│   │   │
│   │   ├── package.json
│   │   └── .env.example
│   │
│   ├── ai/
│   │   ├── categorization/
│   │   │   └── classifier.py
│   │   ├── summarization/
│   │   │   └── summarizer.py
│   │   ├── requirements.txt
│   │   └── README.md
│   │
│   └── database/
│       ├── schemas/
│       │   ├── User-schema.md
│       │   └── Issue-schema.md
│       └── seed/
│           └── sample-data.js
│
├── DEMO/
│   ├── screenshots/
│   ├── demo-video/
│   └── demo-script.md
│
└── .github/
    └── workflows/
        └── deploy.yml
