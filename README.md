```
🚦 CIVIC PULSE

Report. Track. Resolve.
A transparent, trackable, and accountable platform for reporting and resolving civic issues.

🏆 Hackathon: Prasunethon 2.0
👥 Team: Destroyer
💡 Project: CIVIC PULSE

🌍 What is CIVIC PULSE?

CIVIC PULSE is a civic issue reporting and resolution platform designed to improve communication between citizens and local authorities.

Instead of treating a complaint as just a form submission, CIVIC PULSE treats every report as a trackable case with a visible lifecycle.

🔄 Core Workflow

Report → Verify → Assign → Resolve → Verify Resolution → Close

💬 Our goal: If a citizen takes the time to report a problem, they should be able to see what happens to that report.

🚨 The Problem

Everyday civic problems can directly affect people's safety, health, and quality of life.

Examples include:

💡 Broken streetlights

🗑️ Overflowing garbage

🛣️ Damaged roads

🚰 Water-supply problems

🌧️ Blocked drainage

The challenge is not only how to report an issue, but what happens after the report is submitted.

Citizens may not know:

🔎 Whether the complaint was seen

✅ Whether it was verified

👤 Who is responsible for it

📊 What its current status is

⏳ When it will be resolved

CIVIC PULSE addresses this visibility gap.

💡 Our Solution

CIVIC PULSE creates a structured bridge between citizens and authorities.

👤 Citizen Portal

Citizens can:

🔐 Register and authenticate

📝 Report civic issues

🏷️ Select issue categories

📍 Add the exact issue location

📸 Upload supporting evidence

🆔 Receive a unique issue ID

📊 Track issue progress

🔔 View resolution updates

🏛️ Authority Dashboard

Authorities can:

📋 View reported issues

🔍 Verify complaints

🚨 Prioritize important issues

👤 Assign issues to responsible personnel

🔄 Update issue status

🛠️ Add resolution updates

📸 Upload resolution proof

📈 View basic analytics

🗺️ Visualize issues geographically

✨ Key Features

Feature

Purpose

🔐 Authentication

Secure citizen and authority access

📝 Issue Reporting

Submit civic problems with relevant details

🏷️ Categorization

Organize issues by civic category

📍 Location Mapping

Identify exactly where an issue exists

📸 Evidence Upload

Support complaints with images/media

🆔 Unique Issue ID

Make every complaint independently trackable

📊 Status Tracking

Show citizens what is happening with their report

🏛️ Authority Dashboard

Centralized complaint management

🔍 Verification

Validate submitted complaints

🚨 Prioritization

Help authorities handle important issues first

👤 Assignment

Route issues to responsible personnel

🛠️ Resolution Updates

Record progress toward solving an issue

✅ Resolution Verification

Confirm that the reported problem was addressed

📈 Analytics

Understand recurring civic problems

🗺️ Issue Visualization

View reported issues based on location

🤖 AI — Used Where It Actually Helps

CIVIC PULSE does not aim to add AI just for the sake of having an AI feature.

AI can assist with:

🏷️ Automatic issue categorization

📝 Complaint summarization

🚨 Smarter issue prioritization

🔁 Duplicate complaint detection

🔍 AI-assisted verification

The prototype will prioritize AI features that provide genuine value to the civic workflow.

🛠️ Technology Stack

Layer

Technology

🎨 Frontend

React.js, HTML, Tailwind CSS

⚙️ Backend

Node.js

🗄️ Database

MongoDB

🤖 AI

Python, Google Gemini API

🗺️ Maps & Location

Google Maps API

☁️ Cloud & Authentication

Firebase / AWS

🏗️ Project Architecture

                         ┌─────────────────────┐
                         │       CITIZEN       │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │   REACT FRONTEND    │
                         │   UI + MAPS + AUTH   │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │    NODE.JS API      │
                         │  Business Logic     │
                         └──────┬───────┬──────┘
                                │       │
                    ┌───────────┘       └───────────┐
                    ▼                               ▼
          ┌─────────────────┐             ┌─────────────────┐
          │    MONGODB      │             │  AI SERVICES    │
          │ Issues / Users  │             │ Gemini / Python │
          └─────────────────┘             └─────────────────┘

                         ┌─────────────────────┐
                         │ AUTHORITY DASHBOARD │
                         └─────────────────────┘

🔄 Issue Lifecycle

┌────────┐
│ REPORT │  👤 Citizen submits issue
└───┬────┘
    ↓
┌────────┐
│ VERIFY │  🔍 Authority verifies complaint
└───┬────┘
    ↓
┌────────┐
│ ASSIGN │  👤 Issue assigned to responsible authority
└───┬────┘
    ↓
┌─────────┐
│ RESOLVE │  🛠️ Issue is addressed
└───┬─────┘
    ↓
┌─────────────────┐
│ VERIFY RESOLUTION│  ✅ Resolution is verified
└────────┬────────┘
         ↓
     ┌───────┐
     │ CLOSE │  🏁 Case completed
     └───────┘

📁 Project Structure

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
│   │   │   │   ├── citizen/
│   │   │   │   └── authority/
│   │   │   │
│   │   │   ├── pages/
│   │   │   ├── services/
│   │   │   ├── context/
│   │   │   ├── utils/
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
│   │   │   ├── controllers/
│   │   │   ├── models/
│   │   │   ├── routes/
│   │   │   ├── middleware/
│   │   │   ├── services/
│   │   │   └── server.js
│   │   ├── package.json
│   │   └── .env.example
│   │
│   ├── ai/
│   │   ├── categorization/
│   │   ├── summarization/
│   │   ├── requirements.txt
│   │   └── README.md
│   │
│   └── database/
│       ├── schemas/
│       └── seed/
│
├── DEMO/
│   ├── screenshots/
│   ├── demo-video/
│   └── demo-script.md
│
└── .github/
    └── workflows/
        └── deploy.yml

🎯 MVP Roadmap

Phase 1 — Foundation

Set up React frontend

Set up Node.js backend

Connect MongoDB

Configure authentication

Create basic UI

Phase 2 — Citizen Module

Citizen registration/login

Report issue form

Category selection

Location selection

Evidence upload

Unique issue ID

My Issues page

Issue tracking

Phase 3 — Authority Module

Authority dashboard

Issue verification

Issue prioritization

Issue assignment

Status management

Resolution updates

Resolution verification

Phase 4 — Intelligence & Analytics

AI categorization

AI summarization

Basic analytics

Location-based visualization

Phase 5 — Demo & Submission

End-to-end testing

Security review

Screenshots

Demo video

PPT

Final documentation

🔐 Security Principles

Security should be considered throughout the prototype.

🔑 Keep API keys and secrets outside the repository

🛡️ Use authentication and role-based authorization

✅ Validate input on the server

📁 Validate uploaded files

🔒 Protect sensitive user information

🚫 Never expose secrets in frontend code

🗄️ Apply database access controls

⚠️ Return safe error messages without exposing internal details

🌐 Protect backend APIs from unauthorized access

Never commit .env files or API keys to GitHub.

📊 Expected Impact

👥 Citizens

Easier issue reporting

Better visibility after reporting

Trackable complaint lifecycle

Greater transparency

Better confidence in civic reporting

🏛️ Authorities

Centralized issue management

Structured prioritization

Easier assignment and tracking

Better understanding of recurring issues

Improved resource prioritization

🌆 Community

More transparent civic communication

Better visibility into local problems

Data-driven civic decision making

Stronger citizen participation

🚀 Future Scope

The platform can grow beyond the prototype into a broader city-level civic management system.

Possible future improvements:

🧠 Smarter issue prioritization

🔁 Duplicate complaint detection

🤖 AI-assisted verification

📈 Authority performance analytics

🗺️ City-level civic dashboards

📊 Advanced civic data insights

🏙️ Expansion to additional civic departments

🎥 Prototype Demonstration

The demo should tell one complete story rather than showing disconnected screens.

Suggested Demo Flow

👤 Citizen Login
       ↓
📝 Report Civic Issue
       ↓
📍 Select Location
       ↓
📸 Upload Evidence
       ↓
🆔 Receive Issue ID
       ↓
🏛️ Authority Dashboard
       ↓
🔍 Verify
       ↓
🚨 Prioritize
       ↓
👤 Assign
       ↓
🛠️ Resolve
       ↓
✅ Verify Resolution
       ↓
🏁 Close
       ↓
👤 Citizen Sees Final Status

📚 Documentation

Detailed documentation is maintained inside the DOCUMENTATION/ directory:

📄 Project-Overview.md — Project concept and objectives

🏗️ System-Architecture.md — System architecture

🔌 API-Documentation.md — Backend API documentation

🗄️ Database-Design.md — Database structure

🔐 Security.md — Security considerations

🚀 Future-Scope.md — Future improvements

📸 Demo Assets

The DEMO/ directory contains:

🖼️ screenshots/ — Prototype screenshots

🎬 demo-video/ — Demonstration video

🗣️ demo-script.md — Demo presentation script

👥 Team Destroyer

Member

Role

Prince Kumar Gupta

Team Leader

Arkendu Kundu

Team Member

Archit Pande

Team Member

📜 Project Status

🚧 Prototype / MVP in Development

The immediate objective is to build a working, understandable, and demonstrable MVP that clearly shows the complete civic complaint journey from reporting to resolution.

❤️ Our Vision

CIVIC PULSE is not intended to be just another complaint form.

We want to build a system where:

A citizen reports a problem → the system tracks it → authorities act on it → the resolution becomes visible.

Technology should not only collect complaints.
It should help make the process of solving them visible, trackable, and accountable.

🏆 Built by Team Destroyer

CIVIC PULSE — Report. Track. Resolve.
```
