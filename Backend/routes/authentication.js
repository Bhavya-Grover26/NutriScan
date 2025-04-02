const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const router = express.Router();
const mongoose = require("mongoose");
const SECRET_KEY = "yourertyjhgfdertyu"; // Temporarily hardcode this

const User = mongoose.model("User");


// Register Route
router.post("/register", async (req, res) => {
    const { name, email, password, phone } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            phone
        });

        await newUser.save();

        // Create a JWT token
        const token = jwt.sign({ userId: newUser._id }, SECRET_KEY, {
            expiresIn: "7d",
        });

        res.status(201).json({ 
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            phone: newUser.phone,
            token
        });

    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ message: "Registration failed" });
    }
});

// Login Route
router.post("/login", async (req, res) => {
    const { name, password } = req.body;

    try {
        const user = await User.findOne({ name });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Compare hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }

        // Generate a JWT token
        const token = jwt.sign({ userId: user._id }, SECRET_KEY, {
            expiresIn: "7d",
        });

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            token
        });

    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ message: "Login failed" });
    }
});

// Middleware to Verify Token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1]; // Extract token from "Bearer <token>"

  try {
    const decoded = jwt.verify(token, SECRET_KEY); // Ensure correct secret key
    req.user = decoded; // Attach user data to request
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid Token", error: error.message });
  }
};

router.get("/user-info", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("name email");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error fetching user info:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router; // ✅ Export only the router
module.exports.verifyToken = verifyToken; // ✅ Export the verifyToken separately
