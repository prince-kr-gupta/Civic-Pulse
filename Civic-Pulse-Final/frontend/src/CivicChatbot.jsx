import { useState } from "react";

function CivicChatbot({ issues = [], setPage }) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");

  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Hi! 👋 I'm Civic Pulse Assistant. How can I help you?"
    }
  ]);

  const getReply = (question) => {
    const q = question.toLowerCase();

    // Reporting
    if (
      q.includes("report") ||
      q.includes("complaint") ||
      q.includes("problem")
    ) {
      return "You can report a civic problem by opening the Report Issue page. Add the issue title, category, description and location.";
    }

    // Tracking
    if (
      q.includes("track") ||
      q.includes("status")
    ) {
      return "You can track your complaint from the Track page using your Civic Issue ID.";
    }

    // Map
    if (
      q.includes("map") ||
      q.includes("nearby") ||
      q.includes("location")
    ) {
      return "You can explore reported civic problems on the Civic Map. Click an issue marker to see its details.";
    }

    // Garbage
    if (q.includes("garbage") || q.includes("waste")) {
      const garbageIssues = issues.filter(
        (issue) =>
          issue.category?.toLowerCase() === "garbage"
      );

      if (garbageIssues.length > 0) {
        return `I found ${garbageIssues.length} garbage-related issue(s). The latest status is ${garbageIssues[0].status}.`;
      }

      return "I couldn't find any garbage-related issues right now.";
    }

    // Streetlight
    if (
      q.includes("streetlight") ||
      q.includes("street light")
    ) {
      const streetIssues = issues.filter(
        (issue) =>
          issue.category?.toLowerCase() === "streetlight"
      );

      if (streetIssues.length > 0) {
        return `There are ${streetIssues.length} streetlight issue(s) in the system.`;
      }

      return "I couldn't find any streetlight issues.";
    }

    // Resolved
    if (
      q.includes("resolved") ||
      q.includes("solved")
    ) {
      const resolved = issues.filter(
        (issue) =>
          issue.status === "Resolved" ||
          issue.status === "Closed"
      );

      return `${resolved.length} issue(s) are currently resolved or closed.`;
    }

    // In progress
    if (
      q.includes("progress") ||
      q.includes("working")
    ) {
      const active = issues.filter(
        (issue) =>
          issue.status === "In Progress"
      );

      return `${active.length} issue(s) are currently in progress.`;
    }

    // Total
    if (
      q.includes("how many") ||
      q.includes("total") ||
      q.includes("issues")
    ) {
      return `Civic Pulse currently has ${issues.length} issue(s) in the system.`;
    }

    // Greeting
    if (
      q.includes("hello") ||
      q.includes("hi") ||
      q.includes("hey")
    ) {
      return "Hello! 👋 I can help you report an issue, track a complaint, explore the civic map, or check issue statuses.";
    }

    return "I can help with reporting issues, tracking complaints, checking statuses, finding civic problems, and exploring the Civic Map.";
  };


  const sendMessage = (text = input) => {
    const question = text.trim();

    if (!question) return;

    const reply = getReply(question);

    setMessages((prev) => [
      ...prev,
      {
        from: "user",
        text: question
      },
      {
        from: "bot",
        text: reply
      }
    ]);

    setInput("");
  };


  const quickAction = (text) => {
    sendMessage(text);
  };


  return (
    <>
      {/* CHAT WINDOW */}

      {open && (
        <div className="civic-chatbot">

          <div className="chat-header">

            <div>
              <strong>Civic Pulse AI</strong>
              <span>Online • Civic Assistant</span>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="chat-close"
            >
              ×
            </button>

          </div>


          <div className="chat-messages">

            {messages.map((message, index) => (
              <div
                key={index}
                className={`chat-message ${message.from}`}
              >
                {message.text}
              </div>
            ))}

          </div>


          {/* QUICK ACTIONS */}

          <div className="chat-quick-actions">

            <button
              onClick={() =>
                quickAction("How do I report an issue?")
              }
            >
              📝 Report issue
            </button>

            <button
              onClick={() =>
                quickAction("How can I track my complaint?")
              }
            >
              🔎 Track complaint
            </button>

            <button
              onClick={() =>
                quickAction("Show me the civic map")
              }
            >
              🗺️ Civic map
            </button>

          </div>


          {/* INPUT */}

          <div className="chat-input">

            <input
              value={input}
              onChange={(e) =>
                setInput(e.target.value)
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
              placeholder="Ask Civic Pulse..."
            />

            <button
              onClick={() => sendMessage()}
            >
              →
            </button>

          </div>

        </div>
      )}


      {/* FLOATING BUTTON */}

      <button
        className="chat-floating-button"
        onClick={() => setOpen(!open)}
        aria-label="Open Civic Pulse Assistant"
      >
        {open ? "×" : "💬"}
      </button>
    </>
  );
}

export default CivicChatbot;