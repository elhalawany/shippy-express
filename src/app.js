import fs from "fs";
import path from "path";
import express from "express";
import morgan from "morgan";
import { createStream } from "rotating-file-stream";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import session from "express-session";
import passport from "passport";
import { RedisStore } from "connect-redis";

import redisClient from "./config/redis.js";
import passportConfigure from "./config/passport.js";
import errorHandler from "./middlewares/errorHandler.js";

// Initialize the Express application
const app = express();

// Middleware for security headers
app.use(helmet());

// Cors middleware to allow cross-origin requests
app.use(cors({ origin: true, credentials: true }));

// Logger middleware to log HTTP requests
if (process.env.NODE_ENV === "production") {
  // Create a rotating write stream - one log file per day
  const logStream = createStream(
    (time, index) => {
      if (!time) return "initial.log"; // fallback name

      const date = time.toISOString().slice(0, 10); // e.g., 2025-06-03
      return `${date}-log.log`;
    },
    {
      interval: "1d", // rotate daily
      path: path.join(__dirname, "logs"), // log files directory
    }
  );

  app.use(morgan("combined", { stream: logStream }));
} else {
  app.use(morgan("dev"));
}

// Middleware to parse JSON bodies and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting middleware to prevent DDoS attacks
app.use(
  rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 120, // Limit each IP to 120 requests per windowMs
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: "Too many requests, please try again later.",
  })
);

// Session management using Redis

app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    },
  })
);

// Initialize Passport for authentication
app.use(passport.initialize());
app.use(passport.session());
passportConfigure(passport);

// Routes

// Centralized error handling middleware
app.use(errorHandler);

export default app;
