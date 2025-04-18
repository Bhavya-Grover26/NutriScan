const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Product = mongoose.model("Category");

router.get("/products/:categories", async (req, res) => {
  try {
    let categories = req.params.categories;

    // Replace hyphens with spaces
    categories = categories.replace(/-/g, " ");

    // Split and format category strings
    const categoryParts = categories.split(",");
    const formattedCategories = categoryParts.map((category) => {
      const parts = category.trim().split(" ");
      return `(${parts.map((part) => `'${part}'`).join(", ")})`;
    });

    console.log("Formatted cluster_names being queried:", formattedCategories);

    // Fetch documents based on formatted cluster names
    const documents = await Product.find({ cluster_name: { $in: formattedCategories } });

    if (!documents || documents.length === 0) {
      console.log(`No products found for cluster_names: ${formattedCategories.join(", ")}`);
      return res.status(404).json({ message: "No products found" });
    }

    // Merge products
    let allProducts = [];
    documents.forEach((doc) => {
      if (doc.products && doc.products.length > 0) {
        allProducts = allProducts.concat(doc.products);
      }
    });

    console.log(`Total number of products found: ${allProducts.length}`);

    // Sort by ascending Rank
    allProducts.sort((a, b) => a.Rank - b.Rank);

    // Deduplicate based on _id OR product_name OR image_url
    const seenIds = new Set();
    const seenNames = new Set();
    const seenImages = new Set();
    const uniqueProducts = [];

    for (const product of allProducts) {
      const id = product._id?.toString();
      const name = product.product_name?.trim();
      const image = product.image_url?.trim();

      if (seenIds.has(id) || seenNames.has(name) || seenImages.has(image)) {
        continue; // skip if any field is already seen
      }

      seenIds.add(id);
      seenNames.add(name);
      seenImages.add(image);
      uniqueProducts.push(product);
    }

    // Slice top 20 unique products
    const topProducts = uniqueProducts.slice(0, 20);

    res.json(
      topProducts.map((product) => ({
        product_name: product.product_name || "Unknown",
        image_url: product.image_url || "https://via.placeholder.com/150",
        brands: product.brands || "Unknown",
        Rank: product.Rank || 0,
        _id: product._id,
      }))
    );
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
