import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { IconButton } from 'react-native-paper';

const BarcodeScan1 = () => {
  // Dummy Product Data
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
        <Text style={styles.successText}>✅ Hurray, we scanned the product!</Text>
      </View>

      {/* Product Details */}
      <ScrollView style={styles.productContainer}>
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.ingredients}>{product.ingredients}</Text>

        {/* Scores */}
        <View style={styles.scoresContainer}>
          {Object.entries(product.scores).map(([key, score]) => (
            <View key={key} style={[styles.scoreBox, { backgroundColor: score.color }]}>
              <Text style={styles.scoreLabel}>{score.label}</Text>
              <Text style={styles.scoreDescription}>{score.description}</Text>
            </View>
          ))}
        </View>

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save product</Text>
        </TouchableOpacity>
      </ScrollView>
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
  headerText: { color: "white", fontSize: 18, fontWeight: "bold" },
  closeButton: { position: "absolute", left: 20, top: "50%", transform: [{ translateY: -14 }] },

  successMessage: { backgroundColor: "#DFF2BF", padding: 10, borderRadius: 10, margin: 15 },
  successText: { color: "#4F8A10", fontSize: 16, fontWeight: "bold" },

  productContainer: { flex: 1, padding: 20, backgroundColor: "white", borderRadius: 10, margin: 10 },
  productName: { fontSize: 18, fontWeight: "bold", marginBottom: 8 },
  ingredients: { fontSize: 14, color: "#666", marginBottom: 15 },

  scoresContainer: { flexDirection: "row", justifyContent: "space-between", marginBottom: 15 },
  scoreBox: { width: "22%", padding: 10, borderRadius: 8, alignItems: "center" },
  scoreLabel: { fontSize: 18, fontWeight: "bold", color: "white" },
  scoreDescription: { fontSize: 12, color: "white", textAlign: "center" },

  saveButton: { backgroundColor: "#27AE60", padding: 15, borderRadius: 10, alignItems: "center", marginTop: 10 },
  saveButtonText: { color: "white", fontSize: 16, fontWeight: "bold" },
});

export default BarcodeScan1;
