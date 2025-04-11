const mongoose = require("mongoose");

const searchSchema = new mongoose.Schema({
  _id: String, // barcode as string
  product_name: {
    type: String,
    required: true,
  },
  image_url: String,
  ingredients: [String],
  nutrient_levels_tags: [String],
  nova_group: Number,
  categories: [String],
  // Add other fields if needed
});

module.exports = mongoose.model("Search", searchSchema, product_classification2);
