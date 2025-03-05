import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView , Image} from "react-native";
import { IconButton } from 'react-native-paper';
import BottomNavBar from "./BottomNavBar";


const ProductDetailsScreen = () => {
  const [activeTab, setActiveTab] = useState('Overview');
  const product = {
    name: "Chips saveur barbecue—Lay's 135 g",
    barcode: "3168930164661",
    brand: "Lay's",
    ingredients:
      "potatoes (62%), vegetable oils (sunflower, rapeseed, maize in variable proportions), barbecue flavouring base (sugar, salt, maltodextrin, flavouring including soy), dextrose, paprika, onion powder, tomato powder, garlic powder, acidity regulators (malic acid, citric acid), colour (paprika extract), smoke flavouring.",
    scores: {
      nova: { label: "4", description: "Ultra Processed Food", color: "#E03B3B" },
      nutri: { label: "D", description: "Poor Nutritional Quality", color: "#F1C40F" },
      eco: { label: "B", description: "Low Environmental Impact", color: "#2ECC71" },
      packaging: { label: "M", description: "Medium Impact", color: "#A569BD" },
    },
  };

  const nutrients = [
    { label: "Fat in high quantity (28%)", color: "#E74C3C" }, 
    { label: "Saturated fat in moderate quantity (3.1%)", color: "#F4C542" }, 
    { label: "Sugars in low quantity (2.8%)", color: "#8BC34A" }, 
    { label: "Salt in moderate quantity (1.1%)", color: "#F4C542" },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Scan the Barcode</Text>
        <TouchableOpacity style={styles.closeButton}>
           <IconButton icon="close" size={24} color="white"  />
        </TouchableOpacity>
      </View>

      {/* Success Message */}
      <View style={styles.successMessage}>
        <Text style={styles.successText}> Hurray, we scanned the product!</Text>
      </View>
      <ScrollView style={styles.productContainer}>

      {/* Product Card */}
      <View style={styles.productCard}>
        {/* Product Image */}
        <Image
          source={{ uri: 'https://images.openfoodfacts.org/images/products/000/009/016/2602/front_en.90.400.jpg' }} // Replace with actual image
          style={styles.productImage}
        />
        
        {/* Product Info */}
        <View style={styles.productInfo}>
          <View style={styles.topRow}>
 
            <Text style={styles.productName}>Kurkure - Green Chutney Style</Text>
          </View>
          <Text style={styles.brandName}>PepsiCo, Inc.</Text>

          {/* Badges */}
          <View style={styles.badgeContainer}>
            <Text style={styles.badBadge}>Bad</Text>
            <View style={styles.scoreBadge}>
              <Text style={styles.scoreText}>10/100</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.tabs}>
        {['Overview', 'Ingredient', 'Nutrition'].map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.infocontainer}>
      {/* Nutrients Info */}
      {nutrients.map((item, index) => (
        <View key={index} style={styles.nutrientRow}>
          <View style={[styles.dot, { backgroundColor: item.color }]} />
          <Text style={styles.nutrientText}>{item.label}</Text>
        </View>
      ))}

      {/* Allergen Warning */}
      <View style={styles.allergenContainer}>
        <IconButton icon="alert-outline" size={28} color="white" />
        <Text style={styles.allergenText}> Allergens: Soybeans</Text>
      </View>
    </View>
    <View style={styles.suggestedSection}>
        <Text style={styles.suggestedTitle}>Compare Products</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.suggestedList}>
          <View style={styles.suggestedItem}>
            <Image source={{ uri: 'https://images.openfoodfacts.org/images/products/890/176/409/2206/front_en.3.400.jpg' }} style={styles.suggestedImage} />
            <Text style={styles.suggestedText}>Dnv appalam papad</Text>
          </View>
          <View style={styles.suggestedItem}>
            <Image source={{ uri: 'https://images.openfoodfacts.org/images/products/950/110/153/0003/front_en.26.400.jpg' }} style={styles.suggestedImage} />
            <Text style={styles.suggestedText}>Another Product</Text>
          </View>
        </ScrollView>
      </View>
        
      </ScrollView>
      <BottomNavBar/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F5F5" },

  header: { 
    backgroundColor: "#2D2D2D", 
    paddingVertical: 15, 
    paddingHorizontal: 20, 
    flexDirection: "row", 
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: 
  { color: "white", fontSize: 18, fontWeight: "bold" 
  },
  closeButton: { position: "absolute", left: 20, top: "50%", transform: [{ translateY: -14 }] },

  successMessage: { backgroundColor: "#DFF2BF", padding: 10, borderRadius: 10, margin: 15 },
  successText: { color: "#4F8A10", fontSize: 16, fontWeight: "bold" },

  productCard: {
    backgroundColor: "#fff",
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    elevation: 2,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  productImage: {
    width: 100,
    height: 120,
    borderRadius: 8,
  },
  productInfo: {
    flex: 1,
    marginLeft: 16,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  vegIcon: {
    marginRight: 6,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    flexShrink: 1,
  },
  brandName: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  badgeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  badBadge: {
    backgroundColor: "#FF4C4C",
    color: "#fff",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 14,
    fontWeight: "bold",
  },
  scoreBadge: {
    backgroundColor: "#FF4C4C",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginLeft: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  scoreText: {
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 4,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginHorizontal: 16,
    paddingVertical: 8,
  },
  tab: {
    padding: 10,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#FF8C00',
  },
  activeTabText: {
    fontWeight: 'bold',
  },
  infocontainer: {
    backgroundColor: "#FFF",
    padding: 16,
    borderRadius: 10,
    marginTop: 10,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  nutrientRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 10,
  },
  nutrientText: {
    fontSize: 14,
    color: "#555",
  },
  allergenContainer: {
    marginTop: 1,
    backgroundColor: "#E74C3C",
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  allergenText: {
    color: "white",
    fontSize: 14,
    alignItems: "center",
    fontWeight: "bold",
  },
  suggestedSection: {
    marginBottom: 200,
    padding: 14,
  },
  suggestedTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  suggestedList: {
    flexDirection: 'row',
    marginTop: 8,
  },
  suggestedItem: {
    marginRight: 12,
    alignItems: 'center',
  },
  suggestedImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  suggestedText: {
    fontSize: 12,
    textAlign: 'center',
  },
  saveButton: { backgroundColor: "#27AE60", padding: 15, borderRadius: 10, alignItems: "center", marginTop: 10 },
  saveButtonText: { color: "white", fontSize: 16, fontWeight: "bold" },
});

export default ProductDetailsScreen;
