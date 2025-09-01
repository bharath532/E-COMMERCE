// index.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

// Fix __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Load environment variables
dotenv.config({ path: path.join(__dirname, "Config", "config.env") });

const app = express();

// ✅ Middlewares
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://e-commerce-chi-three-57.vercel.app",
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// ✅ Routes (use import instead of require)
import authRoutes from "./routes/auth.js";
import cartRoutes from "./routes/cart.js";

app.use("/", authRoutes);
app.use("/api/cart", cartRoutes);

// ✅ MongoDB connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("✅ DB Connected"))
  .catch((err) => console.error("❌ DB Connection Error:", err));

// ✅ Test route
app.get("/", (req, res) => {
  res.send("API is working");
});

// ✅ Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
