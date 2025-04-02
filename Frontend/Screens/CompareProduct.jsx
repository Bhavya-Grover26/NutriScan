import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import BottomNavBar from "./BottomNavBar";

const CompareProduct = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { originalProduct, comparedProduct } = route.params;

  // Function to determine text color based on nutrient level
  const getTextColor = (level) => {
    if (level.toLowerCase().includes("high")) return "red";
    if (level.toLowerCase().includes("moderate")) return "orange";
    if (level.toLowerCase().includes("low")) return "green";
    return "black";
  };

  return (
    <>
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
      <View style={styles.header}>
      <IconButton 
        icon="arrow-left" 
        size={24} 
        color="white" 
        onPress={() => navigation.goBack()} 
      />
      <Text style={styles.headerText}>Compare Products</Text>
    </View>

        {/* Product Comparison Section */}
        <View style={styles.comparisonContainer}>
          {/* Left - Original Product */}
          <View style={styles.productCard}>
            <Image source={{ uri: originalProduct.image_url }} style={styles.productImage} />
            <Text style={styles.productName}>{originalProduct.product_name}</Text>
           
          </View>

          <Text style={styles.vsText}>Vs</Text>

          {/* Right - Compared Product */}
          <View style={styles.productCard}>
            <Image source={{ uri: comparedProduct.image_url }} style={styles.productImage} />
            <Text style={styles.productName}>{comparedProduct.product_name}</Text>
            
          </View>
        </View>

        {/* Score Details Section */}
        <View style={styles.scoreComparisonContainer}>
          <View style={styles.scoreCard}>
            <Text style={styles.scoreLabel}>Rank: {originalProduct.rank}</Text>
            <Text style={styles.scoreLabel}>Nutrition Score: {originalProduct.nutriscore_tags}</Text>
            <Text style={styles.scoreLabel}>Additives: {originalProduct.additives_tags?.length || 'N/A'}</Text>
          </View>

          <View style={styles.scoreCard}>
            <Text style={styles.scoreLabel}>Rank: {comparedProduct.Rank}</Text>
            <Text style={styles.scoreLabel}>Nutrition Score: {comparedProduct.nutriscore_tags}</Text>
            <Text style={styles.scoreLabel}>Additives: {comparedProduct.additives_tags?.length || 'N/A'}</Text>
          </View>
        </View>

        {/* Nutrient Levels Comparison */}
        <View style={styles.nutrientLevelsContainer}>
          <Text style={styles.sectionTitle}>Nutrient Levels</Text>
          <View style={styles.nutrientComparisonContainer}>
            {(Array.isArray(originalProduct.nutrient_levels_tags) && Array.isArray(comparedProduct.nutrient_levels_tags)) &&
              originalProduct.nutrient_levels_tags.length > 0 && comparedProduct.nutrient_levels_tags.length > 0 ? (
                comparedProduct.nutrient_levels_tags.map((nutrientString, index) => {
                  const formatNutrient = (nutrientString) => {
                    if (!nutrientString) return { nutrientName: 'N/A', formattedLevel: 'N/A' };
                    const cleanString = nutrientString.replace('en:', '');
                    const words = cleanString.split('-');
                    const level = words.slice(-2).join(' ');
                    const nutrientName = words.slice(0, -3).join(' ') || words[0];
                    const formattedLevel = level.replace('in-', '').replace('-quantity', '').replace(/\b\w/g, c => c.toUpperCase());
                    return { nutrientName, formattedLevel };
                  };
                  const originalNutrient = originalProduct.nutrient_levels_tags[index] ? formatNutrient(originalProduct.nutrient_levels_tags[index]) : { nutrientName: "N/A", formattedLevel: "N/A" };
                  const comparedNutrient = formatNutrient(nutrientString);

                  return (
                    <View key={index} style={styles.nutrientComparisonCard}>
                      <Text style={[styles.leftProductDetail, { color: getTextColor(originalNutrient.formattedLevel) }]}>
                        {originalNutrient.formattedLevel}
                      </Text>
                      <Text style={styles.nutrientName}>{comparedNutrient.nutrientName}</Text>
                      <Text style={[styles.rightProductDetail, { color: getTextColor(comparedNutrient.formattedLevel) }]}>
                        {comparedNutrient.formattedLevel}
                      </Text>
                    </View>
                  );
                })
              ) : (
                <Text style={{ textAlign: 'center', marginTop: 10, color: 'red' }}>
                  No nutrient level data available.
                </Text>
              )}
          </View>
        </View>
        <View style={{ height: 80 }} />
      </ScrollView>
    </View>
    <BottomNavBar />
  </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F6EC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1B623B',
    padding: 10,
  },
  headerText: {
    fontSize: 18,
    color: '#FFF',
    marginHorizontal: 10,
  },
  comparisonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 20,
    backgroundColor: '#F9F6EC',
    alignItems: 'center',
  },
  productCard: {
    width: '45%',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#FFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 2,
  },
  productImage: {
    width: 120,
    height: 150,
    borderRadius: 10,
    resizeMode: 'contain',
  },
  productName: {
    fontWeight: 'bold',
    marginTop: 5,
    textAlign: 'center',
    fontSize: 16,
    color: '#1B623B',
  },
  productBrand: {
    color: '#595959',
    textAlign: 'center',
    fontSize: 14,
  },
  vsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1B623B',
    paddingHorizontal: 10,
    alignSelf: 'center',
  },
  scoreComparisonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 5,
  },
  scoreCard: {
    width: '45%',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#FFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 2,
  },
  scoreLabel: {
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
    textAlign: 'center',
  },
  nutrientLevelsContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1B623B',
    textAlign: 'center',
    marginBottom: 10,
  },
  nutrientComparisonCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 2,
  },
  nutrientName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    flex: 2,
  },
  leftProductDetail: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#E74C3C',
    flex: 1,
    textAlign: 'left',
  },
  rightProductDetail: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#27AE60',
    flex: 1,
    textAlign: 'right',
  },
});

export default CompareProduct;
