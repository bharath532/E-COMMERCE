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

    const hashedPassword = await bcrypt.hash(password, 8);
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
  const { email, password } = req.body;

  // Minimal validation (fast)
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required"
    });
  }

  try {
    // 🔥 Fetch only required fields
    const user = await User.findOne(
      { email },
      "_id username email password"
    );

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    // 🔐 bcrypt (cannot avoid, but clean)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({
        success: false,
        message: "Server configuration error"
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });

  } catch (err) {
    console.error("Login Error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
});


export default router;
