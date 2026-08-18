# 🚨 Civic Pulse

### Crowdsordeycyy Civic Issue Reporting & Resolution Platform

Civic Pulse is a full-stack web application that allows citizens to report civic issues such as potholes, garbage, broken streetlights, water problems, and other public infrastructure issues.

Authorities can view, manage, update, and resolve reported issues through a dedicated authority dashboard.

---

## ✨ Features

### 👤 Citizen Dashboard

* Create and submit civic complaints
* Add issue title and description
* Select issue category
* Provide issue location
* Upload supporting images
* Track submitted issues
* View issue status
* View issue history
* Receive updates about reported issues

### 🏛️ Authority Dashboard

The authority dashboard is separate from the citizen dashboard.

Authorities can:

* View reported civic issues
* Filter issues by category and status
* View issue details
* Update issue status
* Assign/manage complaints
* Track pending issues
* Track resolved issues
* Monitor civic complaints

### 🤖 AI Chatbot

Civic Pulse includes an AI-powered chatbot to help citizens:

* Understand how to report an issue
* Navigate the platform
* Get information about civic complaints
* Find useful platform features

### 📍 Location Support

Users can provide the location of a reported issue so authorities can identify where the problem exists.

### 📷 Issue Evidence

Citizens can provide supporting images while reporting an issue.

> Camera capture functionality should only be enabled when the required browser permissions and implementation are available.

### 🔐 Authentication

The platform supports authentication for users and authorities.

Authentication uses:

* JWT
* Protected backend routes
* Role-based access

---

# 🛠️ Tech Stack

## Frontend

* React.js
* Vite
* HTML
* CSS
* JavaScript
* React Components

## Backend

* Node.js
* Express.js
* REST API

## Database

* MongoDB
* MongoDB Atlas

## Authentication

* JSON Web Token (JWT)
* Password hashing

## Development Tools

* VS Code
* Git
* GitHub
* npm

---

# 📁 Project Structure

```text
Civic-Pulse/
│
├── frontend/
│   │
│   ├── public/
│   │
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   ├── citizen/
│   │   │   └── authority/
│   │   │
│   │   ├── pages/
│   │   │   ├── Home/
│   │   │   ├── Login/
│   │   │   ├── Register/
│   │   │   ├── CitizenDashboard/
│   │   │   ├── AuthorityDashboard/
│   │   │   └── ReportIssue/
│   │   │
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   │
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   └── issueController.js
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── errorMiddleware.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   └── Issue.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── issueRoutes.js
│   │
│   ├── uploads/
│   │
│   ├── .env
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
├── .gitignore
├── README.md
└── package.json
```

---

# ⚙️ Requirements

Before running Civic Pulse, install:

### Node.js

Check installation:

```bash
node --version
```

```bash
npm --version
```

Both commands should return a version number.

### VS Code

Recommended editor for development.

### MongoDB Atlas

The backend requires a MongoDB database.

---

# 🚀 Installation

## 1. Clone or Extract the Project

If using Git:

```bash
git clone <YOUR-GITHUB-REPOSITORY>
```

Then:

```bash
cd Civic-Pulse
```

If using the ZIP file:

1. Extract the ZIP.
2. Open the extracted folder in VS Code.

---

# 🔧 Backend Setup

Open a VS Code terminal:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

---

## 🔐 Configure Environment Variables

Create `.env` from `.env.example`.

### Windows

```bash
copy .env.example .env
```

Then open `.env`.

Example:

```env
PORT=5000

MONGODB_URI=your_mongodb_atlas_connection_string

JWT_SECRET=your_long_random_secret

CLIENT_ORIGIN=http://localhost:5173,http://localhost:5174
```

### Important

Never commit `.env` to GitHub.

The `.env` file contains private configuration such as:

* Database credentials
* JWT secret
* API keys

Only `.env.example` should be shared with the project.

---

# 🗄️ MongoDB Atlas Setup

The backend connects to MongoDB Atlas.

The database owner needs to:

1. Open MongoDB Atlas.
2. Open the project.
3. Go to **Security → Network Access**.
4. Add the IP address of the computer running the backend.
5. Make sure the MongoDB database user has the required permissions.
6. Copy the MongoDB connection string.
7. Put the connection string inside `.env`.

Example:

```env
MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@cluster.mongodb.net/civic-pulse
```

Do not share your actual database password publicly.

---

# ▶️ Start the Backend

Inside the `backend` directory:

```bash
npm run dev
```

Expected output:

```text
MongoDB connected
Civic Pulse API running on http://localhost:5000
```

Keep this terminal running.

---

# 🎨 Frontend Setup

Open another VS Code terminal.

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

You should see something similar to:

```text
Local: http://localhost:5173/
```

Open the displayed URL in your browser.

---

# 🖥️ Running the Complete Application

You need **two terminals**.

### Terminal 1 — Backend

```bash
cd backend
npm install
npm run dev
```

Backend:

```text
http://localhost:5000
```

### Terminal 2 — Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

# 👥 Team Member Setup

Every team member can run Civic Pulse on their own computer.

Each person needs:

```text
Node.js
VS Code
Project ZIP / Git repository
MongoDB Atlas access
```

They should:

```bash
cd backend
npm install
```

Create their local:

```text
.env
```

Then:

```bash
npm run dev
```

In another terminal:

```bash
cd frontend
npm install
npm run dev
```

---

# 🌐 Database Architecture

The application uses a shared MongoDB Atlas database.

```text
                 ┌──────────────────────┐
                 │    MongoDB Atlas     │
                 │                      │
                 │    Civic Pulse DB    │
                 └──────────┬───────────┘
                            │
              ┌─────────────┼─────────────┐
              │             │             │
              ▼             ▼             ▼
          Developer A   Developer B   Developer C
          Backend       Backend       Backend
          localhost     localhost     localhost
              │             │             │
              ▼             ▼             ▼
          Frontend       Frontend      Frontend
```

Each developer runs their own frontend and backend locally, while the database can be shared through MongoDB Atlas.

---

# 🔒 Security Guidelines

Never commit these files or values:

```text
.env
Database passwords
JWT secrets
Private API keys
Service credentials
```

Make sure `.gitignore` contains:

```gitignore
node_modules/
.env
.env.local
uploads/*
dist/
```

Use environment variables for sensitive configuration.

---

# 🧪 Testing

Before demonstrating the project, test:

### Authentication

* Register
* Login
* Logout
* Invalid credentials
* Protected routes

### Citizen Features

* Submit issue
* View issues
* View issue status
* Upload evidence
* Check issue history

### Authority Features

* Authority login
* View issues
* Filter issues
* Update issue status
* Resolve issues

### UI

* Home page
* Dashboard
* Navigation
* Dark/light mode
* Responsive layout
* Forms
* Error messages
* Loading states

---

# 🐛 Common Problems

## MongoDB connection error

Check:

```env
MONGODB_URI=...
```

Then verify:

* MongoDB username
* MongoDB password
* Database name
* MongoDB Atlas Network Access
* Internet connection

---

## `npm install` fails

Check Node.js:

```bash
node --version
```

Then try:

```bash
npm cache verify
```

and run:

```bash
npm install
```

again.

---

## Frontend shows a blank page

Check the frontend terminal for errors.

Then verify:

```bash
npm run dev
```

and open the exact URL provided by Vite.

Also check the browser's developer console for JavaScript errors.

---

## Backend is not connecting

Make sure the backend is running:

```bash
npm run dev
```

and that the terminal displays:

```text
MongoDB connected
```

---

# 📱 Browser Permissions

Some features, such as camera or location access, may require browser permission.

When prompted:

```text
Allow this site to access your camera/location?
```

choose **Allow** when the feature is required.

---

# 🎯 Future Improvements

Possible future additions:

* AI-based issue categorization
* Automatic duplicate issue detection
* Issue priority prediction
* Authority assignment automation
* Real-time notifications
* Email/SMS notifications
* Advanced analytics
* Civic issue heatmaps
* Mobile application
* Multilingual support
* Improved accessibility
* Cloud deployment

---

# 📌 Development Commands

## Backend

```bash
cd backend
npm install
npm run dev
```

## Frontend

```bash
cd frontend
npm install
npm run dev
```

---

# 🤝 Contributing

1. Create a new branch.

```bash
git checkout -b feature/your-feature
```

2. Make your changes.

3. Test the application.

4. Commit your changes.

```bash
git add .
git commit -m "Add new feature"
```

5. Push the branch.

```bash
git push origin feature/your-feature
```

6. Create a Pull Request.

---

# 📜 License

This project is developed as an educational/hackathon project.

---

# 👨‍💻 Project

## Civic Pulse

**Crowdsourced Civic Issue Reporting & Resolution Platform**

Built with:

**React + Node.js + Express + MongoDB + JWT**

> Report. Track. Resolve. Improve your city. 🚀
> <h1>Make By Team Destroyer ❤️ </h1>
<p>Prince Kumar Gupta - Team Leader</p>
<p>Archit Pande - Team Member</p>
<p>Arkendu Kundu - Team Member</p>
