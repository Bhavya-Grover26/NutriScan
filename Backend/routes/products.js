const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Product = require("../models/Product"); // Import Product model

// Route to fetch first 6 products from MongoDB
router.get("/products", async (req, res) => {
  try {
    const products = await Product.aggregate([
      { $sample: { size: 10 } }, // Randomly select 10 products
      { 
        $project: { 
          product_name: 1, 
          image_url: 1, 
          _id: 1
        } 
      }
    ]);

    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


module.exports = router;
