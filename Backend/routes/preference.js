const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { verifyToken } = require("./authentication"); // Import verifyToken middleware

const User = mongoose.model("User");
const Preference = mongoose.model("Preference");

// POST route to save user preferences (Protected Route)
router.post("/preferences", verifyToken, async (req, res) => {
  try {
    const { allergen, additive, diet, ingredient, nutrition } = req.body;
    const userId = req.user.userId; // Extract userId from decoded token

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if preferences already exist for the user
    let userPreference = await Preference.findOne({ user: userId });

    if (userPreference) {
      // Update existing preferences
      userPreference.allergen = allergen || userPreference.allergen;
      userPreference.selectedAdditives = selectedAdditives || userPreference.selectedAdditives;
      userPreference.selectedDiets = selectedDiets || userPreference.selectedDiets;
      userPreference.selectedIngredients = selectedIngredients || userPreference.selectedIngredients;
      userPreference.selectedNutritions = selectedNutritions || userPreference.selectedNutritions;

      await userPreference.save();
      return res.status(200).json({ message: "Preferences updated successfully", userPreference });
    } else {
      // Create new preference document
      userPreference = new Preference({
        user: userId,
        allergen,
        selectedAdditives: additive,
        selectedDiets: diet,
        selectedIngredients: ingredient,
        selectedNutritions: nutrition,
      });

      await userPreference.save();
      return res.status(201).json({ message: "Preferences saved successfully", userPreference });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

router.get("/user-preferences", verifyToken, async (req, res) => {
  try {
    const userPreference = await Preference.findOne({ user: req.user.userId });
    if (!userPreference) {
      return res.status(404).json({ message: "No preferences found for this user" });
    }
    res.json(userPreference);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});



module.exports = router;
