const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Models
const ProductClassification = mongoose.model("BarcodeInfo");
const ProductComparison = mongoose.model("ProductComparison");

// GET router to fetch similar products by barcode
// GET router to fetch similar products by barcode
// GET router to fetch similar products by barcode
// GET router to fetch similar products by barcode
// GET router to fetch similar products by barcode
router.get("/similar/:barcode", async (req, res) => {
    const barcode = req.params.barcode;

    try {
        // Step 1: Find the cluster that contains the product with the given barcode
        const comparison = await ProductComparison.findOne({ "products._id": barcode });

        if (!comparison) {
            return res.status(404).json({ message: "Product not found in any cluster" });
        }

        // Step 2: Extract the cluster name and all products in that cluster
        const clusterName = comparison.cluster_name;
        let similarProducts = comparison.products
            .filter(product => product._id !== barcode)   // Exclude the current product
            .sort((a, b) => a.Rank - b.Rank)               // Sort products by Rank (ascending)
            .slice(0, 5);                                  // Take top 5 ranked products

        // Step 3: Return the top 5 similar products as the response
        console.log("Cluster Name:", clusterName);
        console.log("Similar Products:", similarProducts);
        res.status(200).json({ clusterName, similarProducts });
    } catch (error) {
        console.error("Error fetching similar products:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
});





// GET router to fetch product details by barcode
router.get("/product/:barcode", async (req, res) => {
    const barcode = req.params.barcode;

    try {
        // Find the product by barcode (assuming barcode is stored as _id)
        const product = await ProductClassification.findOne({ _id: barcode });

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Mapping the product details to the response
        const productDetails = {
            product_name: product.product_name,
            image_url: product.image_url,
            ingredients_text: product.ingredients_text,
            brands: product.brands,
            nutriscore_tags: product.nutriscore_tags,
            nutrient_levels_tags: product.nutrient_levels_tags,
            nova_group: product.nova_group,
            additives_tags: product.additives_tags,
            allergens_tags: product.allergens_tags,
            classification: product.classification,
            Final_Classification: product.Final_Classification,
        };
        console.log("Fetched product details:", product);
        console.log("Final_Classification:", product.Final_Classification);
        
        // Find comparison data from product_comparison collection
        const comparison = await ProductComparison.findOne({ "products._id": barcode });

        if (comparison) {
            const productInComparison = comparison.products.find(
                (item) => item._id === barcode
            );

            if (productInComparison) {
                productDetails.rank = productInComparison.Rank;
                productDetails.cluster_name = comparison.cluster_name;
            }
        }

        res.status(200).json(productDetails);
    } catch (error) {
        console.error("Error fetching product details:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
