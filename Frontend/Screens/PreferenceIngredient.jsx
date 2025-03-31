import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BottomNavBar from './BottomNavBar';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function PreferenceIngredient() {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();
  const Ingredients = ['Lactose', 'Corn', 'Legumes', 'Gluten', 'Yeast', 'Citrus', 'Fructose', 'Garlic/Onions'];

  const toggleIngredient = (Ingredient) => {
    if (selectedIngredients.includes(Ingredient)) {
      setSelectedIngredients(selectedIngredients.filter(item => item !== Ingredient));
    } else {
      setSelectedIngredients([...selectedIngredients, Ingredient]);
    }
  };
  const handleApply = () => {
    const preferences = {
      ...route.params,
      selectedIngredients,
    };
    navigation.navigate('PreferenceNutrition', preferences);
  };
  console.log("Received Data in PreferenceIngredient:", route.params);

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
          Mark the ingredients that you’re sensitive to, and we’ll alert you to any potential triggers in your selected products.
          </Text>

          {/* Ingredient Selection */}
          <View style={styles.IngredientContainer}>
            {Ingredients.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.Ingredient, selectedIngredients.includes(item) && styles.IngredientSelected]}
                onPress={() => toggleIngredient(item)}
              >
                <Text style={[styles.IngredientText, selectedIngredients.includes(item) && styles.IngredientTextSelected]}>
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Sensitivity Level */}
          <Text style={styles.severityLabel}>Sensitivity Level</Text>
          <View style={styles.sliderContainer}>
            <Text style={styles.sliderText}>Low</Text>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={2}
              step={0.1}
              minimumTrackTintColor="#1B623B"
              thumbTintColor="#1B623B"
            />
            <Text style={styles.sliderText}>High</Text>
          </View>

          {/* Apply Button */}
          <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
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

  // Ingredient Selection
  IngredientContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' },
  Ingredient: { backgroundColor: '#ADDB9D', paddingVertical: 8, paddingHorizontal: 15, borderRadius: 20, margin: 5 },
  IngredientSelected: { backgroundColor: '#1B623B' },
  IngredientText: { fontSize: 14, color: '#1B623B' },
  IngredientTextSelected: { color: 'white' },

  // Severity Section
  severityLabel: { fontSize: 16, fontWeight: 'bold', marginTop: 40, marginBottom: 8 }, 
  sliderContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 10 },
  sliderText: { fontSize: 14, color: '#333' },
  slider: { flex: 1, marginHorizontal: 5, height: 40 },

  // Apply Button
  applyButton: { backgroundColor: '#1B623B', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 20 },
  applyButtonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
});
