const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
 
const Product = mongoose.model("Category");

router.get("/products/:categories", async (req, res) => {
    try {
      let categories = req.params.categories;
  
      // Step 1: Replace hyphens with spaces
      categories = categories.replace(/-/g, " ");
  
      // Step 2: Split the categories into individual cluster names
      const categoryParts = categories.split(",");
      const formattedCategories = categoryParts.map((category) => {
        const parts = category.trim().split(" ");
        return `(${parts.map((part) => `'${part}'`).join(", ")})`;
      });
  
      // Log the formatted cluster names being queried
      console.log("Formatted cluster_names being queried:", formattedCategories);
  
      // Fetch documents matching any of the formatted cluster names
      const documents = await Product.find({ cluster_name: { $in: formattedCategories } });
  
      if (!documents || documents.length === 0) {
        console.log(`No products found for cluster_names: ${formattedCategories.join(", ")}`);
        return res.status(404).json({ message: "No products found" });
      }
  
      // Merge all products from the found documents
      let allProducts = [];
      documents.forEach((doc) => {
        if (doc.products && doc.products.length > 0) {
          allProducts = allProducts.concat(doc.products);
        }
      });
  
      // Log the number of products found
      console.log(`Total number of products found: ${allProducts.length}`);
  
      // Sort products by Rank in ascending order
      const sortedProducts = allProducts.sort((a, b) => a.Rank - b.Rank);
  
      // Get top 20 unique ranks
      const uniqueRanks = [...new Set(sortedProducts.map((p) => p.Rank))].slice(0, 20);
  
      // Filter products that have these top 20 ranks
      const topProducts = sortedProducts.filter((p) => uniqueRanks.includes(p.Rank));
  
      // Return formatted response
      res.json(
        topProducts.map((product) => ({
          product_name: product.product_name || "Unknown",
          image_url: product.image_url || "https://via.placeholder.com/150",
          brands: product.brands || "Unknown",
          Rank: product.Rank || 0,
        }))
      );
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  

module.exports = router;
