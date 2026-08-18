const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

function tokenFor(user) {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET is missing.");

  return jwt.sign(
    { sub: user._id.toString(), role: user.role },
    secret,
    { expiresIn: "7d" }
  );
}

function publicUser(user) {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role
  };
}

async function register(req, res, next) {
  try {
    const { name, email, password, role = "citizen" } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required."
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must contain at least 6 characters."
      });
    }

    const safeRole = role === "authority" ? "authority" : "citizen";

    const exists = await User.findOne({
      email: email.toLowerCase().trim()
    });

    if (exists) {
      return res.status(409).json({
        message: "An account with this email already exists."
      });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await User.create({
      name,
      email,
      passwordHash,
      role: safeRole
    });

    res.status(201).json({
      token: tokenFor(user),
      user: publicUser(user)
    });
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required."
      });
    }

    const user = await User.findOne({
      email: email.toLowerCase().trim()
    }).select("+passwordHash");

    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return res.status(401).json({
        message: "Invalid email or password."
      });
    }

    res.json({
      token: tokenFor(user),
      user: publicUser(user)
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { register, login };
