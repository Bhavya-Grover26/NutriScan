const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  _id: String,
  product_name: String,
  image_url: String,
  ingredients_text: String,
  brands: String,
  nutriscore_tags: [String],
  nutrient_levels_tags: [String],
  nova_group: Number
});

// Ensure it fetches from "product_classification" collection
module.exports = mongoose.model("Product", ProductSchema, "product_classification2");
