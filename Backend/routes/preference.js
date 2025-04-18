const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { verifyToken } = require("./authentication");

const User = mongoose.model("User");
const Preference = mongoose.model("Preference");

// POST or PATCH route to save or update user preferences
router.post("/preferences", verifyToken, async (req, res) => {
  try {
    const { allergen, additive, diet, ingredient, nutrition, action = "replace" } = req.body;
    const userId = req.user.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let userPreference = await Preference.findOne({ user: userId });

    // Helper function to modify arrays
    const modifyArray = (original, incoming, type) => {
      if (!Array.isArray(incoming)) return original;

      const setOriginal = new Set(original || []);
      const setIncoming = new Set(incoming);

      if (type === "add") {
        return Array.from(new Set([...setOriginal, ...setIncoming]));
      } else if (type === "remove") {
        return Array.from([...setOriginal].filter((item) => !setIncoming.has(item)));
      } else {
        return incoming; // replace
      }
    };

    if (userPreference) {
      // Update based on action
      userPreference.allergen = modifyArray(userPreference.allergen, allergen, action);
      userPreference.selectedAdditives = modifyArray(userPreference.selectedAdditives, additive, action);
      userPreference.selectedDiets = modifyArray(userPreference.selectedDiets, diet, action);
      userPreference.selectedIngredients = modifyArray(userPreference.selectedIngredients, ingredient, action);
      userPreference.selectedNutritions = modifyArray(userPreference.selectedNutritions, nutrition, action);

      await userPreference.save();
      return res.status(200).json({ message: "Preferences updated", userPreference });
    } else {
      // Create new preference document (only for replace or add)
      userPreference = new Preference({
        user: userId,
        allergen: allergen || [],
        selectedAdditives: additive || [],
        selectedDiets: diet || [],
        selectedIngredients: ingredient || [],
        selectedNutritions: nutrition || [],
      });

      await userPreference.save();
      return res.status(201).json({ message: "Preferences saved successfully", userPreference });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// GET route to fetch user preferences
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
