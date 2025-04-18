import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BottomNavBar from './BottomNavBar';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function PreferenceAdditive() {
  const route = useRoute();
  const navigation = useNavigation();
  const [selectedAdditives, setSelectedAdditives] = useState([]);
  const { user, preferences = {} } = route.params || {};
  const [avoidanceLevel, setAvoidanceLevel] = useState(1);

  const Additives = ['Preservatives', 'MSG', 'Nitrates', 'Artificial Colors', 'Artificial Flavors', 'Sulfites'];

  const toggleAdditive = (Additive) => {
    if (selectedAdditives.includes(Additive)) {
      setSelectedAdditives(selectedAdditives.filter(item => item !== Additive));
    } else {
      setSelectedAdditives([...selectedAdditives, Additive]);
    }
  };


  const handleApply = async () => {
    try {
      const updatedPreferences = { 
        ...preferences, 
        selectedAdditives, 
      };

      // Save updated preferences locally
      await AsyncStorage.setItem("userPreferences", JSON.stringify(updatedPreferences));

      // Navigate to the next preference page
      navigation.navigate('PreferenceDiet', { user, preferences: updatedPreferences });

    } catch (error) {
      console.error("Error saving preferences locally:", error);
    }
  };
  console.log("Received Data in PreferenceAdditive:", route.params);



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

        <View style={styles.categoryContainer}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.key}
              style={styles.categoryButton}
              onPress={() => navigation.navigate(`Preference${category.key}`, route.params)}
            >
              <View
  style={[
    category.key === 'Additive' ? styles.activeIconWrapper : styles.inactiveIconWrapper,
  ]}
>
  <Icon
    name={category.icon}
    size={20}
    color="white"
  />
</View>

              <Text style={styles.categoryText}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.pageContainer}>
          <Text style={styles.description}>
            Select the additives you want to avoid, and we’ll make sure to highlight any products that include them.
          </Text>

          <View style={styles.AdditiveContainer}>
            {Additives.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.Additive, selectedAdditives.includes(item) && styles.AdditiveSelected]}
                onPress={() => toggleAdditive(item)}
              >
                <Text style={[styles.AdditiveText, selectedAdditives.includes(item) && styles.AdditiveTextSelected]}>
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.severityLabel}>Avoidance Preference</Text>
          <View style={styles.sliderContainer}>
            <Text style={styles.sliderText}>Occasionally Avoid</Text>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={2}
              step={0.1}
              value={avoidanceLevel}
              onValueChange={setAvoidanceLevel}
              minimumTrackTintColor="#1B623B"
              thumbTintColor="#1B623B"
            />
            <Text style={styles.sliderText}>Strictly Avoid</Text>
          </View>

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

  // Additive Selection
  AdditiveContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' },
  Additive: { backgroundColor: '#ADDB9D', paddingVertical: 8, paddingHorizontal: 15, borderRadius: 20, margin: 5 },
  AdditiveSelected: { backgroundColor: '#1B623B' },
  AdditiveText: { fontSize: 14, color: '#1B623B' },
  AdditiveTextSelected: { color: 'white' },

  // Severity Section
  severityLabel: { fontSize: 16, fontWeight: 'bold', marginTop: 40, marginBottom: 8 }, 
  sliderContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 10 },
  sliderText: { fontSize: 14, color: '#333' },
  slider: { flex: 1, marginHorizontal: 5, height: 40 },

  // Apply Button
  applyButton: { backgroundColor: '#1B623B', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 20 },
  activeIconWrapper: {
    backgroundColor: '#CBDCCB',
    padding: 10,
    borderRadius: 25,
  },
  
  inactiveIconWrapper: {
    padding: 8,
    borderRadius: 25,
  },
  
});
