const express = require("express");
const router = express.Router();
const mongoose=require("mongoose");

const User=mongoose.model("User")
const Preference = mongoose.model("Preference");

// POST route to save user preferences
router.post("/preferences", async (req, res) => {
  try {
    const { userId, allergen, additive, diet, ingredient, nutrition } = req.body;

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create new preference
    const newPreference = new Preference({
        user: userId,
        allergen,
        selectedAdditives: additive,
        selectedDiets: diet,
        selectedIngredients: ingredient,
        selectedNutritions: nutrition,
      });
      

    // Save to database
    await newPreference.save();
    res.status(201).json({ message: "Preferences saved successfully", newPreference });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

module.exports = router;
