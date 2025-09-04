import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// ================================
// Helper: Validate Request Body
// ================================
const validateLogin = (body) => {
  if (!body.email || !body.password) {
    return "Email and password are required";
  }
  return null;
};

const validateRegister = (body) => {
  if (!body.username || !body.email || !body.password) {
    return "Username, email, and password are required";
  }
  return null;
};

// ================================
// Register (old logic intact + validation & logging)
// ================================
router.post("/register", async (req, res) => {
  console.log("Register request body:", req.body);

  const validationError = validateRegister(req.body);
  if (validationError) {
    return res.status(400).json({ success: false, message: validationError });
  }

  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    console.log("New user registered:", email);

    // Old response intact
    return res.status(201).json({ success: true, message: "Registration successful" });
  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ================================
// Login (old logic intact + validation, logging & safe bcrypt/jwt)
// ================================
router.post("/login", async (req, res) => {
  console.log("Login request body:", req.body);

  const validationError = validateLogin(req.body);
  if (validationError) {
    return res.status(400).json({ success: false, message: validationError });
  }

  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    console.log("Fetched user:", user);

    if (!user) {
      console.warn("Login failed: User not found:", email);
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    // Safe bcrypt comparison
    let isMatch = false;
    try {
      isMatch = await bcrypt.compare(password, user.password);
    } catch (err) {
      console.error("Bcrypt compare error:", err);
      return res.status(500).json({ success: false, message: "Password comparison failed" });
    }

    if (!isMatch) {
      console.warn("Login failed: Wrong password for:", email);
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET not set in environment!");
      return res.status(500).json({ success: false, message: "Server configuration error" });
    }

    // Old JWT logic intact
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    const userData = { id: user._id, username: user.username, email: user.email };

    console.log("Login successful for:", email);
    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: userData
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
