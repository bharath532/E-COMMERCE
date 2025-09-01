import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, "Config", "config.env") });

const app = express();

// Middlewares
app.use(
  cors({
    origin: [
      "http://localhost:5173",       // Local frontend
      "https://e-commerce-chi-three-57.vercel.app", // Vercel frontend
      "https://e-commerce-2dgi.onrender.com" // Add Render frontend when deployed
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// Routes
import authRoutes from "./routes/auth.js";
import cartRoutes from "./routes/cart.js";

app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Test Route
app.get("/", (req, res) => {
  res.send("API is working!");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
