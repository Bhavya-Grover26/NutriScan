// routes/history.js or in your app.js

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { verifyToken } = require("./authentication"); // JWT middleware

const History = mongoose.model("History");

// POST route to save scan (protected)
router.post("/history", verifyToken, async (req, res) => {
  try {
    const userId = req.user.userId; // Extracted from token
    const { scanned_product_id, nutrient_levels_tags } = req.body;

    if (!scanned_product_id) {
      return res.status(400).json({ message: "scanned_product_id is required" });
    }

    const scan = new History({
      user: userId,
      scanned_product_id,
      nutrient_levels_tags: nutrient_levels_tags || [],
    });

    await scan.save();
    res.status(201).json({ message: "Scan saved successfully", scan });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// GET route to retrieve scans (protected)
router.get("/history", verifyToken, async (req, res) => {
  try {
    const userId = req.user.userId;

    const entries = await History.find(
      { user: userId },
      "scanned_product_id nutrient_levels_tags"
    );

    const formatted = entries.map(entry => {
      const tags = entry.nutrient_levels_tags || [];
      return {
        scanned_product_id: entry.scanned_product_id,
        tag1: tags[0] || null,
        tag2: tags[1] || null,
        tag3: tags[2] || null,
        tag4: tags[3] || null,
      };
    });

    res.json(formatted);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

module.exports = router;