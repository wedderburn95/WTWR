require("dotenv").config({
  path: process.env.NODE_ENV === "production" ? ".env.production" : ".env",
});

const cors = require("cors");
const mongoose = require("mongoose");
const express = require("express");
const { errors: celebrateErrors } = require("celebrate");
const errorHandler = require("./middlewares/errorHandler");
const mainRouter = require("./routes/index");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const app = express();
const logger = console;
const { PORT = 3001, MONGO_URI } = process.env;

// 🔹 Log environment for debugging
logger.log(`🚀 Environment: ${process.env.NODE_ENV}`);
logger.log(`📡 Using Mongo URI: ${MONGO_URI ? "Loaded ✅" : "Missing ❌"}`);

// 🔹 Log CORS origins for debugging
app.use(requestLogger);

// ✅ CORS configuration
const allowedOrigins = [
  "http://localhost:3000",
  "https://wtwr-six.vercel.app",
  "https://wtwr-git-main-williams-projects-c348079e.vercel.app",
  "https://wtwr-lpbh8y6a0-williams-projects-c348079e.vercel.app",
];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  const vercelRegex = /\.vercel\.app$/;

  if (allowedOrigins.includes(origin) || vercelRegex.test(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }

  res.header(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,PATCH,DELETE,OPTIONS"
  );
  res.header("Access-Control-Allow-Headers", "Content-Type,Authorization");
  res.header("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

// 🔹 Simple test endpoint
app.get("/", (req, res) => {
  res.send("✅ WTWR API is live!");
});

// 🔹 Connect to MongoDB (Render/Atlas)
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => logger.log("✅ Connected to MongoDB Atlas"))
  .catch((e) => logger.error("❌ DB connection error:", e));

app.use(express.json());

// 🔹 Main routes
app.use("/", mainRouter);

// 🔹 Error logging and handling
app.use(errorLogger);
app.use(celebrateErrors());
app.use(errorHandler);

// 🔹 Start server
app.listen(PORT, "0.0.0.0", () => {
  logger.log(`🚀 Server running on port ${PORT}`);
});
