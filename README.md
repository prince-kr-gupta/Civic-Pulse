🏙️ Civic Pulse

Smart Civic Issue Reporting & Resolution Platform

Report. Track. Resolve. — Building a transparent bridge between citizens and civic authorities.

🏆 Prasunethon 2.0 · Team Destroyer

<p>🌐 **Live Demo:** https://civicpulse-black-seven.vercel.app/</p>
<p>💻 **Source Code:** https://github.com/prince-kr-gupta/Civic-Pulse</p>

🚀 Overview

Civic Pulse is a full-stack civic issue reporting and resolution platform designed to make communication between citizens and local authorities more transparent, trackable, and efficient.

Citizens can report civic problems, monitor their complaints, view issue locations on a civic map, and track the complete resolution journey.

Authorities receive dedicated access for managing reported issues and updating their status, creating a structured workflow from reporting to resolution.

❗ Problem Statement

Every day, citizens encounter problems such as:

🛣️ Damaged roads and potholes

🗑️ Garbage overflow

💡 Broken streetlights

💧 Water and drainage problems

🏗️ Damaged public infrastructure

The bigger problem is often not just reporting an issue — it is knowing what happens after it is reported.

Traditional complaint systems may provide limited visibility into:

Whether the complaint was received

Whether it was verified

Who is responsible for handling it

What its current status is

Whether it was actually resolved

This creates a communication and accountability gap between citizens and civic authorities.

💡 Our Solution

Civic Pulse creates a digital workflow connecting citizens and authorities.

Citizen Reports Issue
        ↓
Issue Stored & Identified
        ↓
Authority Reviews Issue
        ↓
Issue Verified
        ↓
Authority Assigned
        ↓
Work In Progress
        ↓
Issue Resolved / Closed
        ↓
Citizen Tracks Complete Progress

Instead of a complaint disappearing after submission, Civic Pulse gives users visibility throughout its lifecycle.

✨ Key Features

👤 Citizen Portal

Citizens can:

Register and securely log in

Report new civic issues

Provide issue category, description and location

View their submitted complaints

Track issue status and resolution progress

View assigned authority information

Explore civic issues through the Civic Map

🏛️ Authority Portal

Authorities have dedicated access to:

Review reported civic issues

Monitor active complaints

Update issue status

Manage the resolution workflow

Track pending and resolved issues

🔐 Public registration is Citizen-only. Authority accounts cannot be created through normal public registration.

📍 Civic Issue Tracking

Each complaint receives a unique issue ID and progresses through a structured lifecycle.

Reported → Verified → Assigned → In Progress → Resolved → Closed

Users can follow this progress instead of losing visibility after submitting a complaint.

🗺️ Interactive Civic Map

Reported civic problems can be explored geographically through the Civic Issue Map, making it easier to understand where issues are occurring across the community.

🤖 Civic Pulse AI Assistant

Civic Pulse includes an integrated assistant that helps users navigate key platform actions such as:

Reporting an issue

Tracking a complaint

Accessing the Civic Map

🌙 Modern Responsive UI

Civic Pulse provides a clean interface with:

Light and dark themes

Responsive layouts

Citizen-focused navigation

Visual issue status indicators

Resolution progress tracking

📸 Application Preview

🏠 Civic Pulse Home



The landing page introduces the platform and provides quick access to civic reporting, tracking and other major functionality.

👤 Citizen Dashboard



The Citizen Dashboard provides an overview of submitted complaints, their current status, resolved issues and quick access to reporting.

🗺️ Civic Issue Map



The Civic Map provides a geographical view of reported civic problems along with issue information and current status.

🛠️ Technology Stack

Layer

Technologies

Frontend

React.js, Vite, JavaScript, HTML5, CSS3

Backend

Node.js, Express.js

Database

MongoDB Atlas, Mongoose

Authentication

JWT, bcrypt/bcryptjs

API

REST API

Frontend Deployment

Vercel

Backend Deployment

Render

Version Control

Git & GitHub

🏗️ System Architecture

                    ┌─────────────────────┐
                    │       Citizens      │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   React + Vite UI   │
                    │      Vercel         │
                    └──────────┬──────────┘
                               │
                          HTTPS / REST
                               │
                               ▼
                    ┌─────────────────────┐
                    │ Node.js + Express   │
                    │       Render        │
                    └──────────┬──────────┘
                               │
                            Mongoose
                               │
                               ▼
                    ┌─────────────────────┐
                    │    MongoDB Atlas    │
                    │   Cloud Database    │
                    └─────────────────────┘
                               ▲
                               │
                    ┌──────────┴──────────┐
                    │ Authority Workflow  │
                    └─────────────────────┘

Architecture Flow

React/Vite Frontend → REST API → Express Backend → Mongoose → MongoDB Atlas

The frontend and backend are independently deployed, allowing the application layers to be maintained and scaled separately.

🗄️ Database Design

Civic Pulse uses MongoDB Atlas as its cloud-hosted database and Mongoose for data modelling.

User

User
├── Name
├── Email
├── Password Hash
└── Role

Civic Issue

Issue
├── Issue ID
├── Title
├── Description
├── Category
├── Location
├── Priority
├── Status
├── Reporter
├── Assigned Authority
└── Timestamps

This structure allows each complaint to remain connected with its reporter, location and resolution state.

🔌 Backend & API

The Node.js/Express backend handles the core application logic.

It is responsible for:

Citizen registration

Authentication

JWT verification

Role-based authorization

Civic issue creation

Issue retrieval

Issue status management

Database communication

Production CORS configuration

Production communication follows:

Browser
   ↓
Vercel Frontend
   ↓
REST API
   ↓
Render Backend
   ↓
MongoDB Atlas

🔐 Authentication & Security

Civic Pulse implements several backend security measures:

🔑 JWT-based authentication

🔒 Password hashing

🛡️ Protected API routes

👥 Role-based access control

🏛️ Restricted authority registration

🌐 Production CORS configuration

🔐 Environment-variable-based secrets

Sensitive values such as:

MONGODB_URI
JWT_SECRET

are kept outside the source code and should never be committed to GitHub.

🔑 Login Credentials

🏛️ Authority Login

Use the following credentials to log in as an authority:

Name: Authority

Email: authority@civic-pulse.com

Password: Authority@123

Role: authority

👤 Citizen Login

To log in as a citizen:

Create your username.

Use your own email.

Set your password.

Create your account.

⚙️ Run Locally

Prerequisites

Install:

Node.js

npm

Git

MongoDB Atlas account

1. Clone the Repository

git clone https://github.com/prince-kr-gupta/Civic-Pulse.git
cd Civic-Pulse

2. Configure Backend

cd backend
npm install

Create:

backend/.env

Add:

MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secure_jwt_secret
PORT=5000
CLIENT_ORIGIN=http://localhost:5173

Start the backend:

npm run dev

3. Configure Frontend

Open another terminal:

cd frontend
npm install

Create:

frontend/.env

Add:

VITE_API_URL=http://localhost:5000/api

Start the frontend:

npm run dev

The Vite application will normally be available at:

http://localhost:5173

☁️ Production Deployment

Civic Pulse is deployed using a separated cloud architecture.

Frontend — Vercel

The React/Vite frontend is deployed using Vercel.

🌐 Production:
https://civicpulse-black-seven.vercel.app/

Backend — Render

The Node.js + Express API runs as a Render Web Service.

Production secrets and configuration are provided through Render environment variables.

Database — MongoDB Atlas

The production backend communicates with a cloud-hosted MongoDB Atlas database through Mongoose.

                 PRODUCTION

 User
   │
   ▼
Vercel
React + Vite
   │
   ▼
Render
Node + Express
   │
   ▼
MongoDB Atlas

📈 Scalability

Civic Pulse follows a separated frontend, backend and database architecture.

Frontend → Vercel
Backend  → Render
Database → MongoDB Atlas


This separation allows each layer to evolve independently.

For larger municipal deployments, the architecture can be extended with:

* Cloud object storage for issue evidence
* Caching
* Load balancing
* Background processing
* Real-time notifications
* Department-based routing
* Dedicated production infrastructure

---

## 🌱 Future Scope

Civic Pulse can be extended with:

* 🤖 AI-based issue categorization
* 📸 Image-based civic issue detection
* 🔔 Real-time complaint notifications
* 📧 Email/SMS status updates
* 🔥 Civic issue heatmaps
* 🔍 Duplicate complaint detection
* ⚡ Automatic priority estimation
* 🏛️ Automatic department assignment
* ⭐ Citizen feedback after resolution
* 🌐 Multilingual support
* 🏙️ Integration with municipal systems

---

## 🌍 Potential Impact

Civic Pulse aims to transform civic reporting from a one-way complaint mechanism into a transparent resolution workflow.

### For Citizens

**Easy Reporting → Transparent Tracking → Better Visibility**

### For Authorities

**Structured Reports → Centralized Management → Better Resolution Tracking**

### For Communities

**Greater Transparency → Improved Accountability → Better Civic Services**

---

# 🏆 Prasunethon 2.0

Civic Pulse is developed by **Team Destroyer** for **Prasunethon 2.0**.

The project demonstrates a deployable full-stack approach to improving communication and transparency between citizens and civic authorities.

---

## 👥 Team Destroyer

| Team Member            | Role           |
| ---------------------- | -------------- |
| **Prince Kumar Gupta** | 👑 Team Leader |
| **Archit Pande**       | Team Member    |
| **Arkendu Kundu**      | Team Member    |

---

## 🔗 Project Links

🌐 **Live Application**
https://civicpulse-black-seven.vercel.app/

💻 **GitHub Repository**
https://github.com/prince-kr-gupta/Civic-Pulse

---

## 📦 Prasunethon 2.0 Submission

Our submission consists of:

* ✅ Complete source code
* ✅ Technical documentation
* ✅ Deployed working application
* ✅ Project presentation / pitch deck
* ✅ Product demo video

---

<div align="center">

# 🏙️ Civic Pulse

### Report. Track. Resolve.

**Making civic reporting transparent, trackable and accountable.**

Developed by **Team Destroyer** for **Prasunethon 2.0**

</div>
