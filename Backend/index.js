import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "Config", "config.env") });

const app = express();

// CORS setup
app.use(cors({
  origin: "https://e-commerce-1-lmzl.onrender.com",
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type","Authorization"],
  credentials: true
}));
app.options("*", cors());


// Handle preflight OPTIONS requests

app.use(express.json());
app.use(cookieParser());

// Routes
import authRoutes from "./routes/auth.js";
import cartRoutes from "./routes/cart.js";

// app.use("/api/auth", authRoutes);
// app.use("/api/cart", cartRoutes);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

app.get("/", (req, res) => {
  res.send("API is working!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
