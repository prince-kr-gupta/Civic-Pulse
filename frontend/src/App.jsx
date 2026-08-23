import { useEffect, useRef, useState } from "react";
import CivicMap from "./CivicMap";
import CivicChatbot from "./CivicChatbot";

import {
  MapPin,
  ShieldCheck,
  ArrowRight,
  FileText,
  Clock,
  CheckCircle,
  AlertTriangle,
  LogOut,
  Search,
  ChevronRight
} from "lucide-react";

import "./App.css";
import { api } from "./services/api";

const initialIssues = [
  {
    id: "CIVIC-1042",
    title: "Broken Streetlight",
    category: "Streetlight",
    description: "Streetlight near the main gate is not working.",
    location: "Main Gate, Guna",
    priority: "High",
    status: "In Progress",
    reportedBy: "Demo Citizen",
    date: "18 Aug 2026"
  },
  {
    id: "CIVIC-1037",
    title: "Garbage Overflow",
    category: "Garbage",
    description: "Garbage bins are overflowing near the road.",
    location: "Civil Lines, Guna",
    priority: "Medium",
    status: "Verified",
    reportedBy: "Demo Citizen",
    date: "17 Aug 2026"
  },
  {
    id: "CIVIC-1029",
    title: "Road Pothole",
    category: "Road",
    description: "Large pothole causing problems for vehicles.",
    location: "AB Road, Guna",
    priority: "Critical",
    status: "Resolved",
    reportedBy: "Demo Citizen",
    date: "15 Aug 2026"
  }
];

const lifecycle = [
  "Reported",
  "Verified",
  "Assigned",
  "In Progress",
  "Resolved",
  "Closed"
];

function App() {
  const [page, setPage] = useState("home");

  const [theme, setTheme] = useState(
    () => localStorage.getItem("civic-theme") || "dark"
  );

  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem("civic-user");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [issues, setIssues] = useState(initialIssues);
  const [apiError, setApiError] = useState("");

  const [selectedIssue, setSelectedIssue] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const loadIssues = async () => {
      try {
        const data = await api.getIssues();
        if (!cancelled && Array.isArray(data)) {
          setIssues(data);
          setApiError("");
        }
      } catch {
        if (!cancelled) {
          setApiError("Backend unavailable. Showing demo data.");
        }
      } finally {
      }
    };

    loadIssues();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.body.dataset.theme = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme((currentTheme) => {
      const newTheme =
        currentTheme === "dark" ? "light" : "dark";

      localStorage.setItem("civic-theme", newTheme);

      return newTheme;
    });
  };

  const login = ({ name, email, role, token }) => {
    const nextUser = {
      name: name.trim(),
      email: email?.trim().toLowerCase() || "",
      role: role === "authority" ? "authority" : "citizen"
    };

    if (token) {
      localStorage.setItem("civic-token", token);
    }

    setUser(nextUser);
    localStorage.setItem("civic-user", JSON.stringify(nextUser));
    setPage(nextUser.role === "authority" ? "authority" : "dashboard");
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("civic-user");
    localStorage.removeItem("civic-token");
    setPage("home");
  };

  const openIssue = (issue) => {
    setSelectedIssue(issue);
    setPage("track");
  };

  const addIssue = async (issue) => {
    const optimisticIssue = {
      ...issue,
      _id: issue.id,
      id: issue.id
    };

    setIssues((current) => [optimisticIssue, ...current]);
    setSelectedIssue(optimisticIssue);
    setPage("track");

 try {
  const saved = await api.createIssue(optimisticIssue);

  setIssues((current) =>
    current.map((item) =>
      item.id === optimisticIssue.id ? saved : item
    )
  );

  setSelectedIssue(saved);
  setApiError("");
} catch (error) {
  setApiError(
    error?.message || "Unable to save issue to the server."
  );
}
  };

  const updateIssueStatus = async (id, newStatus) => {
    setIssues((current) =>
      current.map((issue) =>
        issue.id === id ? { ...issue, status: newStatus } : issue
      )
    );

    setSelectedIssue((current) =>
      current && current.id === id
        ? { ...current, status: newStatus }
        : current
    );

    try {
      const updated = await api.updateIssue(id, { status: newStatus });
      setIssues((current) =>
        current.map((issue) => issue.id === id ? updated : issue)
      );
      setSelectedIssue((current) =>
        current && current.id === id ? updated : current
      );
    } catch {
      setApiError("Status changed locally; backend update failed.");
    }
  };

  return (
    <div className={`app ${theme}-theme`}>

      {/* NAVBAR */}

      <nav className="navbar">

        <div
  className="logo"
  onClick={() => setPage("home")}
  style={{ cursor: "pointer" }}
>
  <img
    src="/civic-logo.png"
    alt="civic issue"
    className="civic-logo"
  />
</div>

        <div className="nav-links">

          <button onClick={() => setPage("home")}>
            Home
          </button>

          <button onClick={() => setPage("dashboard")}>
            Dashboard
          </button>

          <button onClick={() => setPage("report")}>
            Report Issue
          </button>

          <button onClick={() => setPage("track")}>
            Track
          </button>

          <button onClick={() => setPage("map")}>
            Civic Map
          </button>

          {user?.role === "authority" && (
            <button onClick={() => setPage("authority")}>
              Authority
            </button>
          )}

        </div>

        <button
          className="theme-toggle"
          onClick={toggleTheme}
          title="Toggle theme"
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </button>

        {user ? (
          <button
            className="login-btn"
            onClick={logout}
          >
            <LogOut size={15} />
            Logout
          </button>
        ) : (
          <button
            className="login-btn"
            onClick={() => setPage("login")}
          >
            Login
          </button>
        )}

      </nav>

      {apiError && (
        <div className="api-notice" role="status">
          {apiError}
        </div>
      )}

      {/* =========================
          PAGES
      ========================= */}

      {page === "home" && (
        <Home
          setPage={setPage}
          issues={issues}
          openIssue={openIssue}
        />
      )}

      {page === "login" && (
        <Login
          login={login}
          setPage={setPage}
        />
      )}

      {page === "dashboard" && (
        <CitizenDashboard
          user={user}
          issues={issues}
          setPage={setPage}
          openIssue={openIssue}
        />
      )}

      {page === "report" && (
        <ReportIssue
          user={user}
          addIssue={addIssue}
        />
      )}

      {page === "track" && (
        <TrackIssue
          issue={selectedIssue || issues[0]}
          setPage={setPage}
        />
      )}

      {page === "authority" && user?.role === "authority" && (
        <AuthorityDashboard
          issues={issues}
          updateIssueStatus={updateIssueStatus}
          openIssue={openIssue}
        />
      )}

      {page === "authority" && user?.role !== "authority" && (
        <CitizenDashboard
          user={user}
          issues={issues}
          setPage={setPage}
          openIssue={openIssue}
        />
      )}

      {page === "map" && (
        <CivicMap
          issues={issues}
          theme={theme}
        />
      )}


      {/* FOOTER */}

      <footer>
  <img 
    src="/civic-logo.png" 
    alt="civic pulse" 
    className="footer-logo" 
  />

        <p>Report. Track. Resolve.</p>

        <span>
          Built by Team Destroyer • Prasunethon 2.0
        </span>
      </footer>


      {/* CHATBOT */}

      <CivicChatbot
        issues={issues}
        setPage={setPage}
      />

    </div>
  );
}


/* =========================
   HOME
========================= */

function Home({ setPage, issues, openIssue }) {

  const totalIssues = issues.length + 1240;

  const resolvedIssues =
    issues.filter(
      (issue) =>
        issue.status === "Resolved" ||
        issue.status === "Closed"
    ).length + 982;

  const activeIssues =
    issues.filter(
      (issue) =>
        issue.status !== "Resolved" &&
        issue.status !== "Closed"
    ).length + 210;

  return (
    <>

      {/* HERO */}

      <section className="home-hero">

        <div className="home-hero-content">

          <div className="badge">
            <ShieldCheck size={16} />
            SMART CIVIC REPORTING PLATFORM
          </div>

          <h1>
            Civic problems
            <br />
            shouldn't disappear
            <br />
            after you press
            <span> Submit.</span>
          </h1>

          <p>
            Report local problems, track what happens next,
            and see how authorities respond — all in one
            transparent civic platform.
          </p>

          <div className="hero-buttons">

            <button
              className="primary-btn"
              onClick={() => setPage("report")}
            >
              Report a Civic Issue
              <ArrowRight size={18} />
            </button>

            <button
              className="secondary-btn"
              onClick={() => setPage("track")}
            >
              Track an Issue
              <Search size={17} />
            </button>

          </div>

          <div className="hero-trust">

            <div>
              <CheckCircle size={16} />
              <span>Transparent</span>
            </div>

            <div>
              <CheckCircle size={16} />
              <span>Trackable</span>
            </div>

            <div>
              <CheckCircle size={16} />
              <span>Accountable</span>
            </div>

          </div>

        </div>


        {/* HERO VISUAL */}

        <div className="home-hero-visual">

          <div className="floating-card card-top">

            <div className="floating-icon green">
              ✓
            </div>

            <div>
              <strong>Issue Resolved</strong>
              <span>CIVIC-1039</span>
            </div>

          </div>


          <div className="main-status-card">

            <div className="status-card-header">

              <div>

                <span className="small-text">
                  LIVE ISSUE
                </span>

                <h3>
                  Garbage Overflow
                </h3>

              </div>

              <span className="status">
                In Progress
              </span>

            </div>


            <div className="status-location">
              <MapPin size={17} />
              Civil Lines, Guna
            </div>


            <div className="status-description">
              Waste bins are overflowing near
              the main road and require collection.
            </div>


            <div className="home-progress">

              <div className="home-progress-head">
                <span>Resolution Progress</span>
                <strong>60%</strong>
              </div>

              <div className="home-progress-bar">
                <span></span>
              </div>

            </div>


            <div className="mini-timeline">

              <div className="mini-step done">
                <div>✓</div>
                <span>Reported</span>
              </div>

              <div className="mini-line done"></div>

              <div className="mini-step done">
                <div>✓</div>
                <span>Verified</span>
              </div>

              <div className="mini-line done"></div>

              <div className="mini-step active">
                <div>3</div>
                <span>Assigned</span>
              </div>

              <div className="mini-line"></div>

              <div className="mini-step">
                <div>4</div>
                <span>Resolved</span>
              </div>

            </div>


            <div className="authority-mini">

              <div className="authority-avatar">
                🏛️
              </div>

              <div>
                <strong>
                  Municipal Sanitation Dept.
                </strong>

                <span>
                  Assigned authority
                </span>
              </div>

              <CheckCircle
                size={20}
                className="verified-icon"
              />

            </div>

          </div>


          <div className="floating-card card-bottom">

            <div className="floating-icon blue">
              📍
            </div>

            <div>
              <strong>Location Verified</strong>
              <span>Guna Municipal Area</span>
            </div>

          </div>

        </div>

      </section>


      {/* STATISTICS */}

      <section className="home-stats">

        <div className="home-stat">
          <strong>
            {totalIssues.toLocaleString()}+
          </strong>
          <span>Issues Reported</span>
        </div>

        <div className="home-stat">
          <strong>
            {resolvedIssues.toLocaleString()}+
          </strong>
          <span>Issues Resolved</span>
        </div>

        <div className="home-stat">
          <strong>
            {activeIssues.toLocaleString()}
          </strong>
          <span>Currently Active</span>
        </div>

        <div className="home-stat">
          <strong>94%</strong>
          <span>Resolution Rate</span>
        </div>

      </section>


      {/* RECENT ISSUES */}

      <section className="recent-section">

        <div className="recent-heading">

          <div>

            <span className="section-label">
              COMMUNITY REPORTS
            </span>

            <h2>
              What's happening around you?
            </h2>

            <p>
              See reported civic problems and
              follow their progress.
            </p>

          </div>

          <button
            className="secondary-btn"
            onClick={() => setPage("map")}
          >
            Explore Civic Map
            <MapPin size={17} />
          </button>

        </div>


        <div className="recent-grid">

          {issues.slice(0, 3).map((issue) => (

            <div
              className="recent-card"
              key={issue.id}
              onClick={() => openIssue(issue)}
            >

              <div className="recent-top">

                <span className="issue-id">
                  {issue.id}
                </span>

                <span className="status">
                  {issue.status}
                </span>

              </div>


              <div className="recent-icon">

                {issue.category === "Garbage" && "🗑️"}

                {issue.category === "Road" && "🛣️"}

                {issue.category === "Streetlight" && "💡"}

                {issue.category === "Water Supply" && "🚰"}

                {issue.category === "Drainage" && "🌧️"}

                {issue.category === "Electricity" && "⚡"}

                {![
                  "Garbage",
                  "Road",
                  "Streetlight",
                  "Water Supply",
                  "Drainage",
                  "Electricity"
                ].includes(issue.category) && "🚨"}

              </div>


              <h3>
                {issue.title}
              </h3>

              <p>
                {issue.description}
              </p>


              <div className="recent-location">
                <MapPin size={14} />
                {issue.location}
              </div>


              <div className="recent-footer">

                <span>
                  {issue.priority} Priority
                </span>

                <span>
                  Track Issue →
                </span>

              </div>

            </div>

          ))}

        </div>

      </section>


      {/* HOW IT WORKS */}

      <section className="home-how">

        <div className="section-heading">

          <span>
            SIMPLE. TRANSPARENT. TRACKABLE.
          </span>

          <h2>
            From report to resolution
          </h2>

          <p>
            Your complaint shouldn't disappear into
            a system you can't see.
          </p>

        </div>


        <div className="home-flow">

          <HomeFlow
            number="01"
            icon="📝"
            title="Report"
            text="Tell us what happened and where."
          />

          <div className="flow-arrow">→</div>

          <HomeFlow
            number="02"
            icon="🔍"
            title="Verify"
            text="Authorities verify the complaint."
          />

          <div className="flow-arrow">→</div>

          <HomeFlow
            number="03"
            icon="🏛️"
            title="Assign"
            text="The right department takes ownership."
          />

          <div className="flow-arrow">→</div>

          <HomeFlow
            number="04"
            icon="🛠️"
            title="Resolve"
            text="Work gets done and evidence is added."
          />

          <div className="flow-arrow">→</div>

          <HomeFlow
            number="05"
            icon="✅"
            title="Close"
            text="Resolution is verified and visible."
          />

        </div>

      </section>


      {/* WHY CIVIC PULSE */}

      <section className="why-section">

        <div className="why-content">

          <span className="section-label">
            WHY CIVIC PULSE?
          </span>

          <h2>
            We don't just collect complaints.
            <span> We make them visible.</span>
          </h2>

          <p>
            Traditional complaint systems often stop
            at "submitted". Civic Pulse focuses on what
            happens after that.
          </p>

          <button
            className="primary-btn"
            onClick={() => setPage("report")}
          >
            Report Your First Issue
            <ArrowRight size={18} />
          </button>

        </div>


        <div className="why-grid">

          <WhyCard
            icon="👁️"
            title="Transparent"
            text="Citizens can see exactly what is happening."
          />

          <WhyCard
            icon="📊"
            title="Trackable"
            text="Every complaint receives a unique issue ID."
          />

          <WhyCard
            icon="🏛️"
            title="Accountable"
            text="Issues are assigned to responsible departments."
          />

          <WhyCard
            icon="🤖"
            title="AI Assisted"
            text="AI can help categorize, prioritize and detect duplicates."
          />

        </div>

      </section>


      {/* FINAL CTA */}

      <section className="final-cta">

        <div>

          <span>
            SEE A PROBLEM?
          </span>

          <h2>
            Don't just complain.
            <br />
            Make it trackable.
          </h2>

          <p>
            Report a civic issue and follow it from
            submission to resolution.
          </p>

        </div>

        <button
          className="primary-btn"
          onClick={() => setPage("report")}
        >
          Report a Civic Issue
          <ArrowRight size={18} />
        </button>

      </section>

    </>
  );
}


/* =========================
   HOME FLOW
========================= */

function HomeFlow({
  number,
  icon,
  title,
  text
}) {
  return (
    <div className="home-flow-item">

      <span>
        {number}
      </span>

      <div className="home-flow-icon">
        {icon}
      </div>

      <h3>
        {title}
      </h3>

      <p>
        {text}
      </p>

    </div>
  );
}


/* =========================
   WHY CARD
========================= */

function WhyCard({
  icon,
  title,
  text
}) {
  return (
    <div className="why-card">

      <div className="why-icon">
        {icon}
      </div>

      <div>

        <h3>
          {title}
        </h3>

        <p>
          {text}
        </p>

      </div>

    </div>
  );
}


/* =========================
   STEP
========================= */

function Step({
  number,
  icon,
  title,
  text
}) {
  return (
    <div className="step">

      <span className="step-number">
        {number}
      </span>

      <div className="step-icon">
        {icon}
      </div>

      <h3>{title}</h3>

      <p>{text}</p>

    </div>
  );
}


/* =========================
   LOGIN
========================= */

function Login({
  login,
  setPage
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const role = "citizen";
  const [mode, setMode] = useState("login");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Enter your email and password.");
      return;
    }

    if (mode === "register" && !name.trim()) {
      setError("Enter your name.");
      return;
    }

    setBusy(true);

    try {
      const endpoint = mode === "login"
        ? "/auth/login"
        : "/auth/register";

      const baseUrl =
  import.meta.env.VITE_API_URL ||
  "https://civic-pulse-v6eu.onrender.com/api";

      const response = await fetch(`${baseUrl}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(
          mode === "login"
            ? { email, password }
            : { name, email, password,}
        )
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message || "Authentication failed."
        );
      }

      await login({
        name: data.user.name,
        email: data.user.email,
        role: data.user.role,
        token: data.token
      });
    } catch (error) {
      setError(
        error.message ||
        "Unable to connect to the server."
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="auth-page">
      <form
        className="auth-card"
        onSubmit={handleSubmit}
      >
       <div className="auth-icon">
  <img
    src="/civic-logo.png"
    alt="civic issue"
    className="auth-logo"
  />
</div>

        <h1>
          {mode === "login"
            ? "Welcome to Civic Pulse"
            : "Create your Civic Pulse account"}
        </h1>

        <p>
          {mode === "login"
            ? "Login to continue"
            : "Create an account to report and track issues."}
        </p>

        {mode === "register" && (
          <>
            <label>Name</label>

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              autoComplete="name"
            />
          </>
        )}

        <label>Email</label>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          autoComplete="email"
        />

        <label>Password</label>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="At least 6 characters"
          minLength={6}
          autoComplete={
            mode === "login"
              ? "current-password"
              : "new-password"
          }
        />

        {mode === "register" && (
  <div className="citizen-only-message">
    Account type: <strong>Citizen</strong>
  </div>
)}

        {error && (
          <div className="auth-error" role="alert">
            {error}
          </div>
        )}

        <button
          className="primary-btn"
          type="submit"
          disabled={busy}
        >
          {busy
            ? "Please wait..."
            : mode === "login"
            ? "Login →"
            : "Create Account →"}
        </button>

        <button
          type="button"
          className="back-btn"
          onClick={() => {
            setMode(
              mode === "login"
                ? "register"
                : "login"
            );
            setError("");
          }}
        >
          {mode === "login"
            ? "Create a new account"
            : "Already have an account? Login"}
        </button>

        <button
          type="button"
          className="back-btn"
          onClick={() => setPage("home")}
        >
          ← Back to Home
        </button>
      </form>
    </main>
  );
}


/* =========================
   CITIZEN DASHBOARD
========================= */

function CitizenDashboard({
  user,
  issues,
  setPage,
  openIssue
}) {

  const myIssues = issues || [];

  const pending = myIssues.filter(
    (issue) =>
      issue.status === "Reported" ||
      issue.status === "Pending"
  ).length;

  const inProgress = myIssues.filter(
    (issue) =>
      issue.status === "In Progress"
  ).length;

  const resolved = myIssues.filter(
    (issue) =>
      issue.status === "Resolved" ||
      issue.status === "Closed"
  ).length;

  return (
    <main className="dashboard authority-dashboard">

      <section className="dashboard-header">

        <div>

          <span className="section-label">
            CITIZEN PORTAL
          </span>

          <h1>
            Hello, {user?.name || "Citizen"} 👋
          </h1>

          <p>
            Track your civic complaints and see what
            happens after you report an issue.
          </p>

        </div>

        <button
          className="primary-btn"
          onClick={() => setPage("report")}
        >
          + Report New Issue
        </button>

      </section>


      <section className="dashboard-stats">

        <div className="stat-card">
          <span>Total Issues</span>
          <strong>{myIssues.length}</strong>
          <small>All your reports</small>
        </div>

        <div className="stat-card">
          <span>Pending</span>
          <strong>{pending}</strong>
          <small>Awaiting verification</small>
        </div>

        <div className="stat-card">
          <span>In Progress</span>
          <strong>{inProgress}</strong>
          <small>Being worked on</small>
        </div>

        <div className="stat-card">
          <span>Resolved</span>
          <strong>{resolved}</strong>
          <small>Successfully completed</small>
        </div>

      </section>


      <section className="dashboard-section">

        <div className="dashboard-section-header">

          <div>

            <span className="section-label">
              YOUR REPORTS
            </span>

            <h2>
              Recent Issues
            </h2>

          </div>

          <button
            className="text-btn"
            onClick={() => setPage("track")}
          >
            Track an Issue →
          </button>

        </div>


        {myIssues.length === 0 ? (

          <div className="empty-dashboard">

            <div className="empty-icon">
              📋
            </div>

            <h3>
              No issues reported yet
            </h3>

            <p>
              Report your first civic issue and
              start tracking its progress.
            </p>

            <button
              className="primary-btn"
              onClick={() => setPage("report")}
            >
              Report an Issue →
            </button>

          </div>

        ) : (

          <div className="dashboard-issues">

            {myIssues.slice(0, 5).map((issue) => (

              <div
                className="dashboard-issue"
                key={issue.id}
                onClick={() => openIssue(issue)}
              >

                <div className="dashboard-issue-icon">

                  {issue.category === "Garbage"
                    ? "🗑️"
                    : issue.category === "Road"
                    ? "🛣️"
                    : issue.category === "Water"
                    ? "🚰"
                    : issue.category === "Streetlight"
                    ? "💡"
                    : "⚠️"}

                </div>


                <div className="dashboard-issue-info">

                  <div className="issue-title-row">

                    <h3>
                      {issue.title || "Civic Issue"}
                    </h3>

                    <span
                      className={`status-badge ${String(
                        issue.status || ""
                      )
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                    >
                      {issue.status || "Reported"}
                    </span>

                  </div>

                  <p>
                    {issue.description ||
                      "No description available."}
                  </p>

                  <span className="issue-location">
                    📍 {issue.location || "Location not provided"}
                  </span>

                </div>

                <div className="dashboard-issue-arrow">
                  →
                </div>

              </div>

            ))}

          </div>

        )}

      </section>


      <section className="dashboard-section">

        <span className="section-label">
          QUICK ACTIONS
        </span>

        <h2>
          What would you like to do?
        </h2>

        <div className="quick-actions">

          <button
            className="quick-action"
            onClick={() => setPage("report")}
          >
            <span>📝</span>

            <div>
              <strong>Report an Issue</strong>
              <p>
                Submit a new civic complaint
              </p>
            </div>

            <span>→</span>
          </button>


          <button
            className="quick-action"
            onClick={() => setPage("track")}
          >
            <span>🔎</span>

            <div>
              <strong>Track an Issue</strong>
              <p>
                Check your complaint status
              </p>
            </div>

            <span>→</span>
          </button>


          <button
            className="quick-action"
            onClick={() => setPage("map")}
          >
            <span>🗺️</span>

            <div>
              <strong>Explore Civic Map</strong>
              <p>
                View reported problems nearby
              </p>
            </div>

            <span>→</span>
          </button>

        </div>

      </section>

    </main>
  );
}


/* =========================
   STAT
========================= */

function Stat({
  icon,
  number,
  label
}) {

  return (
    <div className="stat-card">

      <div className="stat-icon">
        {icon}
      </div>

      <div>

        <strong>{number}</strong>

        <span>{label}</span>

      </div>

    </div>
  );
}


/* =========================
   ISSUE CARD
========================= */

/* =========================
   REPORT ISSUE
========================= */

function ReportIssue({
  user,
  addIssue
}) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Road");
  const [priority, setPriority] = useState("Medium");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [evidence, setEvidence] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [cameraOpen, setCameraOpen] = useState(false);
  const [cameraError, setCameraError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const videoRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const setPhoto = (file) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setCameraError("Please choose an image file.");
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      setCameraError("Image must be smaller than 8 MB.");
      return;
    }

    setEvidence(file);
    setCameraError("");

    setPreviewUrl((oldUrl) => {
      if (oldUrl) URL.revokeObjectURL(oldUrl);
      return URL.createObjectURL(file);
    });
  };

 const startCamera = async () => {
  setCameraError("");

  if (!navigator.mediaDevices?.getUserMedia) {
    setCameraError(
      "Camera access is not supported. Please use HTTPS or localhost."
    );
    return;
  }

  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: { ideal: "environment" },
        width: { ideal: 1280 },
        height: { ideal: 720 }
      },
      audio: false
    });

    streamRef.current = stream;
    setCameraOpen(true);

    setTimeout(() => {
      if (videoRef.current && streamRef.current) {
        videoRef.current.srcObject = streamRef.current;
      }
    }, 100);
  } catch (error) {
    console.error("Camera error:", error);

    if (error?.name === "NotAllowedError") {
      setCameraError(
        "Camera permission was denied. Please allow camera access in your browser."
      );
    } else if (error?.name === "NotFoundError") {
      setCameraError("No camera was found on this device.");
    } else {
      setCameraError(
        "Unable to open the camera. Please check your camera permissions."
      );
    }
  }
};

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setCameraOpen(false);
  };

  const capturePhoto = () => {
    const video = videoRef.current;

   if (!video) {
  setCameraError("Camera preview is unavailable.");
  return;
}

if (!video.videoWidth || !video.videoHeight) {
  setCameraError(
    "Camera is still loading. Wait a moment and try again."
  );
  return;
}

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext("2d");
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(
      (blob) => {
        if (!blob) {
          setCameraError("Could not capture the image.");
          return;
        }

        const file = new File(
          [blob],
          `civic-capture-${Date.now()}.jpg`,
          { type: "image/jpeg" }
        );

        setPhoto(file);
        stopCamera();
      },
      "image/jpeg",
      0.88
    );
  };

  const submitIssue = async (e) => {
    e.preventDefault();

   if (!title.trim() || !description.trim() || !location.trim()) {
  setCameraError(
    "Please fill the title, description and exact location."
  );
  return;
}

if (title.trim().length < 3) {
  setCameraError("Issue title must be at least 3 characters.");
  return;
}

if (description.trim().length < 5) {
  setCameraError("Description must be at least 5 characters.");
  return;
}

setCameraError("");
setSubmitting(true);

    try {
      let uploadedEvidence = null;

      if (evidence) {
        try {
          uploadedEvidence = await api.uploadEvidence(evidence);
        } catch {
          uploadedEvidence = {
            name: evidence.name,
            type: evidence.type,
            size: evidence.size
          };
        }
      }

      const issue = {
        id: `CIVIC-${Date.now().toString().slice(-6)}`,
        title: title.trim(),
        category,
        description: description.trim(),
        location: location.trim(),
        priority,
        status: "Reported",
        reportedBy: user?.name || "Citizen",
        date: new Date().toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric"
        }),
       evidence: uploadedEvidence?.url || null
      };

      await addIssue(issue);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="report-page">

      <div className="report-header">
        <div>
          <span className="section-label">
            CITIZEN REPORTING
          </span>

          <h1>
            Report a Civic Issue
          </h1>

          <p>
            Help improve your community by reporting a
            problem. We'll make it trackable from report
            to resolution.
          </p>
        </div>

        <div className="report-security">
          🔒
          <span>Your report is secure</span>
        </div>
      </div>

      <div className="report-layout">

        <form
          className="report-form"
          onSubmit={submitIssue}
        >

          <div className="form-section">
            <div className="form-section-title">
              <span>01</span>

              <div>
                <h2>Issue Details</h2>
                <p>Tell us what problem you found.</p>
              </div>
            </div>

            <label>
              Issue Title <span>*</span>
            </label>

            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Broken streetlight near hostel"
              minLength={3}
              maxLength={100}
              required
            />

            <div className="form-row">

              <div>
                <label>
                  Category <span>*</span>
                </label>

                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option>Road</option>
                  <option>Garbage</option>
                  <option>Streetlight</option>
                  <option>Water Supply</option>
                  <option>Drainage</option>
                  <option>Electricity</option>
                </select>
              </div>

              <div>
                <label>Priority</label>

                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                  <option>Critical</option>
                </select>
              </div>

            </div>

            <label>
              Description <span>*</span>
            </label>

            <textarea
              rows="6"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the problem clearly. Mention what happened, how serious it is, and how it affects people..."
              minLength={5}
              maxLength={500}
              required
          
            />

            <div className="character-count">
              {description.length}/500
            </div>
          </div>


          <div className="form-section">

            <div className="form-section-title">
              <span>02</span>

              <div>
                <h2>Issue Location</h2>
                <p>Where is the problem located?</p>
              </div>
            </div>

            <label>
              Exact Location <span>*</span>
            </label>

            <div className="input-with-icon">
              <span>📍</span>

              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. JUET Main Gate, Guna"
                required
              />
            </div>

            <div className="location-tip">
              💡 Be as specific as possible so authorities
              can find the issue quickly.
            </div>
          </div>


          <div className="form-section">

            <div className="form-section-title">
              <span>03</span>

              <div>
                <h2>Supporting Evidence</h2>
                <p>Add a photo from your device or camera.</p>
              </div>
            </div>

            <div className="evidence-actions">

              <label className="evidence-button">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files?.[0])}
                />
                📁 Choose Photo
              </label>

              <button
                type="button"
                className="evidence-button"
                onClick={startCamera}
              >
                📷 Capture with Camera
              </button>

            </div>

            {cameraError && (
              <p className="camera-error" role="alert">
                {cameraError}
              </p>
            )}

            {previewUrl && (
              <div className="evidence-preview">
                <img
                  src={previewUrl}
                  alt="Selected civic issue evidence"
                />

                <div>
                  <strong>{evidence?.name}</strong>

                  <button
                    type="button"
                    className="remove-photo"
                    onClick={() => {
                      setEvidence(null);
                      setPreviewUrl((oldUrl) => {
                        if (oldUrl) URL.revokeObjectURL(oldUrl);
                        return "";
                      });
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            )}

            {cameraOpen && (
              <div
                className="camera-modal"
                role="dialog"
                aria-modal="true"
                aria-label="Capture civic issue photo"
              >
                <div className="camera-card">

                  <div className="camera-header">
                    <div>
                      <strong>Capture Evidence</strong>
                      <span>Point the camera at the issue.</span>
                    </div>

                    <button
                      type="button"
                      className="camera-close"
                      onClick={stopCamera}
                    >
                      ×
                    </button>
                  </div>

                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="camera-video"
                  />

                  <div className="camera-controls">
                    <button
                      type="button"
                      className="secondary-btn"
                      onClick={stopCamera}
                    >
                      Cancel
                    </button>

                    <button
                      type="button"
                      className="primary-btn"
                      onClick={capturePhoto}
                    >
                      📷 Capture
                    </button>
                  </div>

                </div>
              </div>
            )}

          </div>


          <div className="form-submit">

            <div>
              <strong>Ready to report?</strong>

              <span>
                Your complaint will receive a unique
                tracking ID.
              </span>
            </div>

            <button
              className="primary-btn"
              type="submit"
              disabled={submitting}
            >
              {submitting ? "Submitting..." : "Submit Issue"}
              {!submitting && <ArrowRight size={18} />}
            </button>

          </div>

        </form>


        <aside className="report-sidebar">

          <div className="report-preview">
            <span className="small-text">
              WHAT HAPPENS NEXT?
            </span>

            <h2>
              Your report becomes a trackable case.
            </h2>

            <div className="report-flow">

              <div className="report-flow-item">
                <div>📝</div>
                <span>Report</span>
              </div>

              <div className="report-flow-line"></div>

              <div className="report-flow-item">
                <div>🔍</div>
                <span>Verify</span>
              </div>

              <div className="report-flow-line"></div>

              <div className="report-flow-item">
                <div>🏛️</div>
                <span>Assign</span>
              </div>

              <div className="report-flow-line"></div>

              <div className="report-flow-item">
                <div>🛠️</div>
                <span>Resolve</span>
              </div>

            </div>
          </div>

          <div className="report-help">

            <div className="report-help-icon">
              💙
            </div>

            <div>
              <strong>Make your report useful</strong>

              <p>
                Include a clear description,
                accurate location and supporting
                photo whenever possible.
              </p>
            </div>

          </div>

          <div className="report-demo-card">

            <span className="small-text">
              SAMPLE ISSUE ID
            </span>

            <strong>CIVIC-1045</strong>

            <p>
              Every report receives a unique ID
              that citizens can use to track progress.
            </p>

          </div>

        </aside>

      </div>

    </main>
  );
}


/* =========================
   TRACK ISSUE
========================= */

function TrackIssue({
  issue,
  setPage
}) {

  const currentIssue = issue || {
    id: "CIVIC-1045",
    title: "Garbage Overflow",
    category: "Garbage",
    description:
      "Waste bins are overflowing near the main road and require collection.",
    location: "Civil Lines, Guna",
    status: "In Progress",
    priority: "High",
    assignedTo: "Municipal Sanitation Dept.",
    reportedBy: "Citizen",
    date: "18 Aug 2026"
  };

  const status =
    currentIssue.status || "Reported";

  const steps = [
    {
      name: "Reported",
      icon: "📝"
    },
    {
      name: "Verified",
      icon: "🔍"
    },
    {
      name: "Assigned",
      icon: "👤"
    },
    {
      name: "In Progress",
      icon: "🛠️"
    },
    {
      name: "Resolved",
      icon: "✅"
    },
    {
      name: "Closed",
      icon: "🏁"
    }
  ];

  const statusIndex = {
    Reported: 0,
    Pending: 0,
    Verified: 1,
    Assigned: 2,
    "In Progress": 3,
    Resolved: 4,
    Closed: 5
  };

  const currentStep =
    statusIndex[status] ?? 0;

  const progress =
    Math.round(
      (currentStep / (steps.length - 1)) * 100
    );

  return (
    <main className="track-page">

      <section className="track-header">

        <div>

          <span className="section-label">
            ISSUE TRACKING
          </span>

          <h1>
            Track Your Issue
          </h1>

          <p>
            Follow every step from your report
            to final resolution.
          </p>

        </div>

        <button
          className="secondary-btn"
          onClick={() => setPage("dashboard")}
        >
          ← Back to Dashboard
        </button>

      </section>


      <section className="track-id-card">

        <div>

          <span>
            ISSUE ID
          </span>

          <strong>
            {currentIssue.id}
          </strong>

        </div>

        <div
          className={`track-status ${status
            .toLowerCase()
            .replace(/\s+/g, "-")}`}
        >
          {status}
        </div>

      </section>


      <section className="track-layout">

        <div className="track-main">

          <div className="track-card">

            <div className="track-card-header">

              <div>

                <span className="small-text">
                  REPORTED ISSUE
                </span>

                <h2>
                  {currentIssue.title}
                </h2>

              </div>

              <span className="category-badge">
                {currentIssue.category}
              </span>

            </div>


            <p className="track-description">
              {currentIssue.description}
            </p>


            <div className="track-details">

              <div>
                <span>📍 Location</span>
                <strong>
                  {currentIssue.location}
                </strong>
              </div>

              <div>
                <span>⚠️ Priority</span>
                <strong>
                  {currentIssue.priority || "Medium"}
                </strong>
              </div>

              <div>
                <span>📅 Reported</span>
                <strong>
                  {currentIssue.date || "Recently"}
                </strong>
              </div>

            </div>

          </div>


          <div className="track-card">

            <div className="track-progress-header">

              <div>

                <span className="small-text">
                  RESOLUTION PROGRESS
                </span>

                <h2>
                  {status}
                </h2>

              </div>

              <strong>
                {progress}%
              </strong>

            </div>


            <div className="track-progress-bar">

              <div
                style={{
                  width: `${progress}%`
                }}
              />

            </div>


            <div className="issue-timeline">

              {steps.map((step, index) => {

                const completed =
                  index < currentStep;

                const active =
                  index === currentStep;

                return (
                  <div
                    className={`timeline-step ${
                      completed
                        ? "completed"
                        : ""
                    } ${
                      active
                        ? "active"
                        : ""
                    }`}
                    key={step.name}
                  >

                    <div className="timeline-icon">
                      {completed
                        ? "✓"
                        : step.icon}
                    </div>

                    <span>
                      {step.name}
                    </span>

                    {index <
                      steps.length - 1 && (
                      <div
                        className={`timeline-line ${
                          completed
                            ? "completed"
                            : ""
                        }`}
                      />
                    )}

                  </div>
                );
              })}

            </div>

          </div>


          <div className="track-card">

            <div className="track-card-title">

              <span className="small-text">
                ACTIVITY
              </span>

              <h2>
                Issue Updates
              </h2>

            </div>


            <div className="activity-list">

              <div className="activity-item">

                <div className="activity-dot">
                  ✓
                </div>

                <div>

                  <strong>
                    Issue reported
                  </strong>

                  <p>
                    Your complaint was successfully
                    submitted to Civic Pulse.
                  </p>

                  <span>
                    Today · Citizen
                  </span>

                </div>

              </div>


              {currentStep >= 1 && (
                <div className="activity-item">

                  <div className="activity-dot">
                    ✓
                  </div>

                  <div>

                    <strong>
                      Complaint verified
                    </strong>

                    <p>
                      The authority verified the
                      submitted complaint.
                    </p>

                    <span>
                      Today · Authority
                    </span>

                  </div>

                </div>
              )}


              {currentStep >= 2 && (
                <div className="activity-item">

                  <div className="activity-dot">
                    ✓
                  </div>

                  <div>

                    <strong>
                      Issue assigned
                    </strong>

                    <p>
                      The issue has been assigned
                      to the responsible department.
                    </p>

                    <span>
                      Today · Authority
                    </span>

                  </div>

                </div>
              )}


              {currentStep >= 3 && (
                <div className="activity-item">

                  <div className="activity-dot active">
                    🛠️
                  </div>

                  <div>

                    <strong>
                      Resolution in progress
                    </strong>

                    <p>
                      The responsible team is
                      currently working on the issue.
                    </p>

                    <span>
                      Today · Assigned Authority
                    </span>

                  </div>

                </div>
              )}


              {currentStep >= 4 && (
                <div className="activity-item">

                  <div className="activity-dot">
                    ✓
                  </div>

                  <div>

                    <strong>
                      Issue resolved
                    </strong>

                    <p>
                      The reported civic problem
                      has been addressed.
                    </p>

                    <span>
                      Today · Authority
                    </span>

                  </div>

                </div>
              )}

            </div>

          </div>

        </div>


        <aside className="track-sidebar">

          <div className="track-side-card">

            <span className="small-text">
              CURRENT STATUS
            </span>

            <div className="big-status">
              {status}
            </div>

            <p>
              Your issue is being handled by
              the responsible authority.
            </p>

          </div>


          <div className="track-side-card">

            <span className="small-text">
              ASSIGNED AUTHORITY
            </span>

            <div className="authority-profile">

              <div className="authority-avatar">
                🏛️
              </div>

              <div>

                <strong>
                  {currentIssue.assignedTo ||
                    "Municipal Authority"}
                </strong>

                <span>
                  Assigned department
                </span>

              </div>

            </div>

          </div>


          <div className="track-side-card">

            <span className="small-text">
              ISSUE LOCATION
            </span>

            <div className="track-location">
              📍
              <strong>
                {currentIssue.location}
              </strong>
            </div>

            <div className="fake-map-small">

              <span>📍</span>

              <p>
                Issue location
              </p>

            </div>

          </div>


          <div className="track-help">

            <span>
              💡
            </span>

            <div>

              <strong>
                Keep your Issue ID
              </strong>

              <p>
                Use {currentIssue.id} whenever
                you want to check this complaint.
              </p>

            </div>

          </div>

        </aside>

      </section>

    </main>
  );
}


/* =========================
   AUTHORITY DASHBOARD
========================= */

function AuthorityDashboard({
  issues,
  updateIssueStatus,
  openIssue
}) {

  return (
    <main className="dashboard">

      <span className="section-label">
        AUTHORITY PORTAL
      </span>

      <h1>
        Civic Operations
      </h1>

      <p>
        Manage, verify and resolve reported civic issues.
      </p>


      <div className="stats-grid">

        <Stat
          icon={<FileText />}
          number={issues.length}
          label="Total Issues"
        />

        <Stat
          icon={<AlertTriangle />}
          number={
            issues.filter(
              (i) => i.status === "Reported"
            ).length
          }
          label="Pending"
        />

        <Stat
          icon={<Clock />}
          number={
            issues.filter(
              (i) =>
                i.status === "In Progress"
            ).length
          }
          label="In Progress"
        />

        <Stat
          icon={<CheckCircle />}
          number={
            issues.filter(
              (i) =>
                i.status === "Resolved" ||
                i.status === "Closed"
            ).length
          }
          label="Resolved"
        />

      </div>


      <div className="authority-table-card">

        <h2>
          Reported Issues
        </h2>

        <table>

          <thead>

            <tr>
              <th>ID</th>
              <th>Issue</th>
              <th>Category</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Action</th>
            </tr>

          </thead>

          <tbody>

            {issues.map((issue) => (

              <tr key={issue.id}>

                <td>{issue.id}</td>

                <td>{issue.title}</td>

                <td>{issue.category}</td>

                <td>{issue.priority}</td>

                <td>

                  <span className="status">
                    {issue.status}
                  </span>

                </td>

                <td>

                  <button
                    className="table-action"
                    onClick={() =>
                      openIssue(issue)
                    }
                  >
                    View
                    <ChevronRight size={14} />
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>


        <div className="authority-actions">

          <h3>
            Demo Controls
          </h3>

          <p>
            Select an issue and update its lifecycle
            for the hackathon demonstration.
          </p>


          {issues.map((issue) => (

            <div
              className="authority-control"
              key={issue.id}
            >

              <div>

                <strong>
                  {issue.id}
                </strong>

                <span>
                  {issue.title} — {issue.status}
                </span>

              </div>


              <div className="status-buttons">

                {lifecycle.map((status) => (

                  <button
                    key={status}
                    className={
                      issue.status === status
                        ? "selected-status"
                        : ""
                    }
                    onClick={() =>
                      updateIssueStatus(
                        issue.id,
                        status
                      )
                    }
                  >
                    {status}
                  </button>

                ))}

              </div>

            </div>

          ))}

        </div>

      </div>

    </main>
  );
}


export default App;
