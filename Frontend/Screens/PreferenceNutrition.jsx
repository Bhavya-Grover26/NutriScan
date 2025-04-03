import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BottomNavBar from './BottomNavBar';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PreferenceNutrition() {
  const [selectedNutritions, setSelectedNutritions] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();
  const { user, preferences = {} } = route.params || {};

  const Nutritions = ['High Protein', 'Low Carb', 'High Fiber', 'Low Cholesterol', 'Low Fat', 'Low Sodium'];

  const toggleNutrition = (Nutrition) => {
    if (selectedNutritions.includes(Nutrition)) {
      setSelectedNutritions(selectedNutritions.filter(item => item !== Nutrition));
    } else {
      setSelectedNutritions([...selectedNutritions, Nutrition]);
    }
  };

  const handleApply = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken"); 
      const storedPreferences = await AsyncStorage.getItem("userPreferences"); 
  
      console.log("🔹 Token being sent:", token); 
      console.log("🔹 Stored Preferences:", storedPreferences);
  
      if (!token || !storedPreferences) {
        console.error("❌ Missing token or preferences data");
        alert("Error retrieving preferences. Please try again.");
        return;
      }
  
      const preferencesData = JSON.parse(storedPreferences);
  
      // Ensure nutrition is added
      preferencesData.selectedNutritions = selectedNutritions; 
  
      const requestBody = {
        allergen: preferencesData.allergen || [],
        additive: preferencesData.selectedAdditives || [],
        diet: preferencesData.selectedDiets || [],
        ingredient: preferencesData.selectedIngredients || [],
        nutrition: preferencesData.selectedNutritions || [],
      };
  
      console.log("🔹 Data being sent to server:", requestBody);
  
      const response = await fetch("https://nutriscan-production.up.railway.app/preferences", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, 
        },
        body: JSON.stringify(requestBody),
      });
  
      const data = await response.json();
      console.log("🔹 Server Response:", data);
  
      if (response.ok) {
        console.log("Preferences saved successfully:", data);
        alert("Preferences saved successfully!");
        await AsyncStorage.setItem("userPreferences", JSON.stringify(preferencesData));  
        navigation.navigate("Home");
      } else {
        console.error("Failed to save preferences:", data.message);
        alert("Failed to save preferences. Try again.");
      }
    } catch (error) {
      console.error("Error submitting preferences:", error);
      alert("Network error while saving preferences.");
    }
  };
  
  
  
  console.log("Received Data in PreferenceNutrition:", route.params);
  
  
  
  // Icons for different categories
  const categories = [
    { key: 'Allergen', name: 'Allergen', icon: 'food-off' },
    { key: 'Additive', name: 'Additive', icon: 'flask-outline' },
    { key: 'Diet', name: 'Diet', icon: 'leaf' },
    { key: 'Ingredient', name: 'Ingredient', icon: 'basket' },
    { key: 'Nutrition', name: 'Nutrition', icon: 'chart-bar' },
  ];

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>My Preferences</Text>
        </View>

        {/* Category Selection */}
        <View style={styles.categoryContainer}>
      {categories.map((category) => (
        <TouchableOpacity
          key={category.key}
          style={styles.categoryButton}
          onPress={() => navigation.navigate(`Preference${category.key}`)}
        >
          <Icon name={category.icon} size={20} color="white" />
          <Text style={styles.categoryText}>{category.name}</Text>
        </TouchableOpacity>
      ))}
    </View>

        <View style={styles.pageContainer}>
          <Text style={styles.description}>
          Indicate your nutritional goals, and we’ll recommend products that align with your health and dietary preferences.
          </Text>

          {/* Nutrition Selection */}
          <View style={styles.NutritionContainer}>
            {Nutritions.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.Nutrition, selectedNutritions.includes(item) && styles.NutritionSelected]}
                onPress={() => toggleNutrition(item)}
              >
                <Text style={[styles.NutritionText, selectedNutritions.includes(item) && styles.NutritionTextSelected]}>
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Importance */}
          <Text style={styles.severityLabel}>Importance</Text>
          <View style={styles.sliderContainer}>
            <Text style={styles.sliderText}>Nice to Have</Text>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={2}
              step={0.1}
              minimumTrackTintColor="#1B623B"
              thumbTintColor="#1B623B"
            />
            <Text style={styles.sliderText}>Essential</Text>
          </View>

          {/* Apply Button */}
          <TouchableOpacity 
            style={styles.applyButton} 
            onPress={handleApply}
          >
            <Text style={styles.applyButtonText}>Apply</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
      <BottomNavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF4D6' },
  header: { alignItems: 'center', marginVertical: 40 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#1B623B' },

  // Category Section
  categoryContainer: {
    flexDirection: 'row',
    backgroundColor: '#1B623B',
    paddingVertical: 25,
    justifyContent: 'space-around',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  categoryButton: { alignItems: 'center', paddingHorizontal: 10 },
  selectedCategoryButton: { borderBottomWidth: 2, borderBottomColor: 'white' },
  categoryText: { fontSize: 14, color: 'white', marginTop: 5 },

  pageContainer: { backgroundColor: 'white', padding: 45, borderTopLeftRadius: 20, borderTopRightRadius: 20 },
  description: { textAlign: 'center', fontSize: 14, marginBottom: 15, color: '#333' },

  // Nutrition Selection
  NutritionContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' },
  Nutrition: { backgroundColor: '#ADDB9D', paddingVertical: 8, paddingHorizontal: 15, borderRadius: 20, margin: 5 },
  NutritionSelected: { backgroundColor: '#1B623B' },
  NutritionText: { fontSize: 14, color: '#1B623B' },
  NutritionTextSelected: { color: 'white' },

  // Severity Section
  severityLabel: { fontSize: 16, fontWeight: 'bold', marginTop: 40, marginBottom: 8 }, 
  sliderContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 10 },
  sliderText: { fontSize: 14, color: '#333' },
  slider: { flex: 1, marginHorizontal: 5, height: 40 },

  // Apply Button
  applyButton: { backgroundColor: '#1B623B', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 20 },
  applyButtonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
});
