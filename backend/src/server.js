const dns = require("node:dns");

dns.setServers([
  "1.1.1.1",
  "8.8.8.8",
]);

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");

const { connectDB } = require("./config/db");
const issueRoutes = require("./routes/issueRoutes");
const authRoutes = require("./routes/authRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const { notFound, errorHandler } = require("./middleware/error");

const app = express();
const PORT = Number(process.env.PORT) || 5000;

/*
 * ============================================================
 * CORS CONFIGURATION
 * ============================================================
 */

const allowedOrigins = (
  process.env.CLIENT_ORIGIN ||
  "http://localhost:5173,http://localhost:5174"
)
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

function isAllowedOrigin(origin) {
  // Allow requests that don't contain an Origin header.
  // Useful for server-to-server requests and health checks.
  if (!origin) {
    return true;
  }

  // Allow explicitly configured origins.
  if (allowedOrigins.includes(origin)) {
    return true;
  }

  // Allow the main production Vercel domain.
  if (origin === "https://civicpulse-black-seven.vercel.app") {
  return true;
}

  // Allow Civic Pulse Vercel preview deployments.
  //
  // Example:
  // https://civicpulse-5wqe8jps6-destroyer6.vercel.app
  //
  if (
    /^https:\/\/civicpulse-[a-z0-9-]+-destroyer6\.vercel\.app$/i.test(origin)
  ) {
    return true;
  }

  return false;
}

app.use(
  cors({
    origin(origin, callback) {
      if (isAllowedOrigin(origin)) {
        return callback(null, true);
      }

      console.warn(`CORS blocked origin: ${origin}`);

      return callback(new Error("CORS origin not allowed."));
    },

    methods: [
      "GET",
      "POST",
      "PUT",
      "PATCH",
      "DELETE",
      "OPTIONS",
    ],

    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],

    credentials: true,
  })
);

/*
 * ============================================================
 * MIDDLEWARE
 * ============================================================
 */

app.use(helmet());

app.use(
  express.json({
    limit: "1mb",
  })
);

app.use(morgan("dev"));

/*
 * ============================================================
 * STATIC UPLOADS
 * ============================================================
 */

app.use(
  "/uploads",
  express.static(path.join(process.cwd(), "uploads"))
);

/*
 * ============================================================
 * ROOT ROUTE
 * ============================================================
 */

app.get("/", (req, res) => {
  res.json({
    name: "Civic Pulse API",
    status: "ok",
  });
});

app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    database: "connected",
  });
});
app.use("/api/auth", authRoutes);

app.use("/api/issues", issueRoutes);

app.use("/api/uploads", uploadRoutes);
app.use(notFound);

app.use(errorHandler);
async function start() {
  try {
    await connectDB();

    app.listen(PORT, "0.0.0.0", () => {
      console.log(
        `Civic Pulse API running on port ${PORT}`
      );
    });
  } catch (error) {
    console.error(
      "Failed to start server:",
      error.message
    );

    process.exit(1);
  }
}
if (require.main === module) {
  start();
}

module.exports = app;