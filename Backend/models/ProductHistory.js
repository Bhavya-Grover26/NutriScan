const mongoose = require('mongoose');
// History Schema
const historySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    scanned_product_id: {
      type: String,
      required: true,
    },
    nutrient_levels_tags: [String],
  });
  
  module.exports = mongoose.model("History", historySchema, "History");