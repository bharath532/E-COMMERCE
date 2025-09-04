import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/auth.js";
import cartRoutes from "./routes/cart.js";
import paymentRoutes from "./routes/payment.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "Config", "config.env") });

const app = express();

// Allowed frontend origins
app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin like Postman
    if (!origin) return callback(null, true);

    const allowedOrigins = [
      "http://localhost:5173", // local dev
      "https://e-commerce-1-lmzl.onrender.com" // deployed frontend
    ];

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS error: Origin ${origin} not allowed.`));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Preflight handler
app.options("*", cors());

app.use(express.json());
app.use(cookieParser());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/payment", paymentRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// ---------- React Build Handling ----------
// Serve frontend static files
const frontendPath = path.join(__dirname, "dist"); // or 'build' if using CRA
app.use(express.static(frontendPath));

// Test API route
app.get("/api", (req, res) => {
  res.send("API is working!");
});

// Catch-all: for React Router (Refresh Fix)
app.get("*", (req, res) => {
  res.setHeader("Content-Encoding", "identity"); // disable auto gzip
  res.sendFile(path.join(frontendPath, "index.html"));
});
// -------------------------------------------

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
