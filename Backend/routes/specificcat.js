const express=require("express");
const router = express.Router()
const mongoose=require("mongoose");

const Product = mongoose.model('Category');

router.get("/products/bread", async (req, res) => {
    try {
      const data = await Product.findOne({ cluster_name: "('bread', 'cereals')" });
  
      if (!data || !data.products) {
        return res.status(404).json({ message: "No products found" });
      }
  
      // Sort products by Rank in ascending order
      const sortedProducts = data.products.sort((a, b) => a.Rank - b.Rank);
  
      // Get top 20 unique ranks
      const uniqueRanks = [...new Set(sortedProducts.map((p) => p.Rank))].slice(0, 20);
  
      // Filter products that have these top 20 ranks
      const topProducts = sortedProducts.filter((p) => uniqueRanks.includes(p.Rank));
  
      // Return formatted response
      res.json(
        topProducts.map((product) => ({
          product_name: product.product_name,
          image_url: product.image_url,
          brands: product.brands,
          Rank: product.Rank,
        }))
      );
    } catch (error) {
      console.error("Error fetching bread products:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  module.exports = router;