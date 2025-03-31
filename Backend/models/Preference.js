const mongoose = require("mongoose");

const preferenceSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  allergen: {
    type: [String],
    default: [],
  },
  selectedAdditives: {
    type: [String],
    default: [],
  },
  selectedDiets: {
    type: [String],
    default: [],
  },
  selectedIngredients: {
    type: [String],
    default: [],
  },
  selectedNutritions: {
    type: [String],
    default: [],
  },
}, { timestamps: true });

module.exports = mongoose.model("Preference", preferenceSchema, "preferences");
