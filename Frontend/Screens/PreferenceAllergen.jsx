import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BottomNavBar from './BottomNavBar';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function PreferenceAllergen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { user, preferences = {} } = route.params || {}; // Extract user and existing preferences
  console.log("Received User Data:", user); 

  const [selectedAllergens, setSelectedAllergens] = useState(preferences.allergen || []);

  const Allergens = ['Peanuts', 'Eggs', 'Fish', 'Tree Nuts', 'Wheat', 'Shellfish', 'Dairy', 'Soy', 'Sesame'];

  const toggleAllergen = (Allergen) => {
    setSelectedAllergens((prev) =>
      prev.includes(Allergen) ? prev.filter((item) => item !== Allergen) : [...prev, Allergen]
    );
  };

  // Icons for different categories
  const categories = [
    { key: 'Allergen', name: 'Allergen', icon: 'food-off' },
    { key: 'Additive', name: 'Additive', icon: 'flask-outline' },
    { key: 'Diet', name: 'Diet', icon: 'leaf' },
    { key: 'Ingredient', name: 'Ingredient', icon: 'basket' },
    { key: 'Nutrition', name: 'Nutrition', icon: 'chart-bar' },
  ];

  const handleNext = () => {
    const updatedPreferences = { ...preferences, allergen: selectedAllergens };
    navigation.navigate('PreferenceAdditive', { user, preferences: updatedPreferences });
  };

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
              onPress={() => navigation.navigate(`Preference${category.key}`, { user, preferences })}
            >
              <Icon name={category.icon} size={20} color="white" />
              <Text style={styles.categoryText}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.pageContainer}>
          <Text style={styles.description}>
            Choose the ingredients you're allergic to, and we’ll flag any products that contain them.
          </Text>

          {/* Allergen Selection */}
          <View style={styles.AllergenContainer}>
            {Allergens.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.Allergen, selectedAllergens.includes(item) && styles.AllergenSelected]}
                onPress={() => toggleAllergen(item)}
              >
                <Text style={[styles.AllergenText, selectedAllergens.includes(item) && styles.AllergenTextSelected]}>
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Severity Level */}
          <Text style={styles.severityLabel}>Severity Level</Text>
          <View style={styles.sliderContainer}>
            <Text style={styles.sliderText}>Mild</Text>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={2}
              step={0.1}
              minimumTrackTintColor="#1B623B"
              thumbTintColor="#1B623B"
            />
            <Text style={styles.sliderText}>Severe</Text>
          </View>

          {/* Next Button */}
          <TouchableOpacity style={styles.applyButton} onPress={handleNext}>
            <Text style={styles.applyButtonText}>Next</Text>
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

  // Allergen Selection
  AllergenContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' },
  Allergen: { backgroundColor: '#ADDB9D', paddingVertical: 8, paddingHorizontal: 15, borderRadius: 20, margin: 5 },
  AllergenSelected: { backgroundColor: '#1B623B' },
  AllergenText: { fontSize: 14, color: '#1B623B' },
  AllergenTextSelected: { color: 'white' },

  // Severity Section
  severityLabel: { fontSize: 16, fontWeight: 'bold', marginTop: 40, marginBottom: 8 }, 
  sliderContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 10 },
  sliderText: { fontSize: 14, color: '#333' },
  slider: { flex: 1, marginHorizontal: 5, height: 40 },

  // Apply Button
  applyButton: { backgroundColor: '#1B623B', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 20 },
  applyButtonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
});
