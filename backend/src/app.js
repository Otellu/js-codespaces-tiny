const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const postsRoutes = require("./routes/postsRoutes.js");
const voteRoutes = require("./routes/upvoteRoute.js");
const logger = require("./middleware/logger.js");

dotenv.config();

const app = express();

// Permissive CORS configuration: allow any origin and credentials
const corsOptions = {
  // Reflect the request Origin header, allowing all origins including non-browser clients
  origin: true,
  // Allow cookies/authorization headers
  credentials: true,
  // Allow all common methods
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  // Accept any requested headers
  allowedHeaders: ["*"],
  // Expose all headers to the browser
  exposedHeaders: ["*"],
  // Cache preflight responses for a day
  maxAge: 86400,
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(logger);

// Global OPTIONS handler for preflight requests, using the same permissive CORS config
app.options("*", cors(corsOptions));

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || "development",
  });
});

// Routes
app.use("/api/posts", postsRoutes);
app.use("api/upvote", voteRoutes);

const PORT = process.env.PORT || 5000;

// Import the new database configuration
const { connectDB } = require("./config/database");

// Connect to database and start server
connectDB()
  .then((dbInfo) => {
    console.log(`Connected to ${dbInfo.type} database`);
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      if (process.env.CODESPACES === "true") {
        console.log(
          `Codespaces detected - API available at: https://${process.env.CODESPACE_NAME}-${PORT}.${process.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN}`
        );
      }
    });
  })
  .catch((err) => {
    console.error("Database connection error:", err);
    process.exit(1);
  });
