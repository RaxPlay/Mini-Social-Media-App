import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { pool } from "../../config/db.js";
import cookieParser from "cookie-parser";
import { protect } from "../../middleware/protect.js";

const router = express.Router();

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "Strict",
  maxAge: 30 * 24 * 60 * 60 * 1000,
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

//Register
router.post("/signup", async (req, res) => {
  const { username, email, password, date_of_birth } = req.body;

  if (!username || !email || !password || !date_of_birth) {
    return res.status(400).json({ message: "Provide required fields" });
  }

  const userExists = await pool.query(
    "SELECT * FROM users WHERE email = $1 OR username = $2",
    [email, username]
  );

  if (userExists.rows.length > 0) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await pool.query(
    "INSERT INTO users(username, email, password, date_of_birth) VALUES ($1, $2, $3, $4) RETURNING id, username, email, date_of_birth",
    [username, email, hashedPassword, date_of_birth],
  );

  const token = generateToken(newUser.rows[0].id);

  res.cookie("token", token, cookieOptions);

  return res.status(201).json({ user: newUser.rows[0] });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Provide required fields" });
  }

  const user = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);

  if (user.rows.length === 0) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const userData = user.rows[0];

  const passwordMatch = await bcrypt.compare(password, userData.password);

  if (!passwordMatch) {
    return res.status(400).json({ message: "Incorrect Password" });
  }

  const token = generateToken(userData.id);

  res.cookie("token", token, cookieOptions);

  res.json({
    user: {
      id: userData.id,
      username: userData.username,
      email: userData.email,
      date_of_birth: userData.date_of_birth,
    },
  });
});

router.get("/me", protect, async (req, res) => {
  res.json(req.user);
});

router.post("/logout", (req, res) => {
  res.cookie("token", "", { ...cookieOptions, maxAge: 1 });
  res.json({ message: "Logged out successfully." });
});

export default router;
