const mongoose = require("mongoose");

const SpecificCategorySchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  cluster_name: String,
  products: [
    {
      _id: String,
      product_name: String,
      Rank: Number,
      image_url: String,
      brands: String,
    },
  ],
});

module.exports = mongoose.model("Category", SpecificCategorySchema, "product_comparison"); // Replace with actual collection name
