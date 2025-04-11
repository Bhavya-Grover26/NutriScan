const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Search = require("../models/Search");

router.get("/search", async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ error: "Search query is required" });
    }

    const results = await Search.find({
      $or: [
        { _id: query }, // search by barcode
        { product_name: { $regex: query, $options: "i" } }, // case-insensitive match
      ],
    }).limit(20); // limit for performance

    if (results.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    res.json(results);
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
