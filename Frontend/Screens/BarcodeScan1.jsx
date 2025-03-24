import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from "react-native";
import { IconButton } from "react-native-paper";
import BottomNavBar from "./BottomNavBar";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";


const ProductDetailsScreen = () => {
  const [activeTab, setActiveTab] = useState("Overview");
  const [product, setProduct] = useState(null);
  const [suggestedProducts, setSuggestedProducts] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();
  const { barcode } = route.params;

  useEffect(() => {
    // Fetch product details
    const fetchProductDetails = async () => {
      try {
        console.log("Fetching product details...");
        const response = await fetch(`http://192.168.1.10:5001/product/${barcode}`);
        const data = await response.json();
        console.log("Product details fetched:", data);
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };
  
    // Fetch similar products from the same cluster
    const fetchSuggestedProducts = async () => {
      try {
        console.log("Fetching similar products...");
        const response = await fetch(`http://192.168.1.10:5001/similar/${barcode}`);
        const data = await response.json();
        console.log("Similar products fetched:", data);
  
        // Check if the main product data exists in the response
        if (data.mainProduct) {
          console.log("Main product found in similar products:", data.mainProduct);
          // Merge the rank into the existing product object
          setProduct((prevProduct) => ({
            ...prevProduct,
            Rank: data.mainProduct.Rank,
          }));
          console.log("Updated product with rank:", {
            ...product,
            Rank: data.mainProduct.Rank,
          });
        }
  
        if (data.similarProducts) {
          console.log("Suggested products found:", data.similarProducts);
          setSuggestedProducts(data.similarProducts);
        } else {
          console.log("No suggested products found.");
          setSuggestedProducts([]);
        }
      } catch (error) {
        console.error("Error fetching suggested products:", error);
      }
    };
  
    fetchProductDetails();
    fetchSuggestedProducts();
  }, [barcode]);
  

  if (!product) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading product details...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Product Details</Text>
        <TouchableOpacity style={styles.closeButton}>
          <IconButton icon="close" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Success Message */}
      <View style={styles.successMessage}>
        <Text style={styles.successText}>Hurray, we scanned the product!</Text>
      </View>
      <ScrollView style={styles.productContainer}>

        {/* Product Card */}
        <View style={styles.productCard}>
          {/* Product Image */}
          <Image
            source={{ uri: product.image_url }}
            style={styles.productImage}
          />

          {/* Product Info */}
          <View style={styles.productInfo}>
            <Text style={styles.productName}>{product.product_name}</Text>
            <Text style={styles.brandName}>{product.brands}</Text>

            {/* Badges */}
            <View style={styles.badgeContainer}>
              <View style={styles.scoreBadge}>
                <Text style={styles.scoreText}>Rank:{product.rank}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabs}>
          {["Overview", "Ingredient", "Nutrition"].map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              style={[styles.tab, activeTab === tab && styles.activeTab]}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Ingredients Info */}
        {activeTab === "Ingredient" && (
          <View style={styles.infocontainer}>
            <Text style={styles.sectionTitle}>Ingredients:</Text>
            <Text>{product.ingredients_text}</Text>
          </View>
        )}

        {/* Nutrition Info */}
        {/* Nutrition Info */}
        {activeTab === "Nutrition" && (
          <View style={styles.infocontainer}>
            <Text style={styles.sectionTitle}>Nutritional Information:</Text>
            {product.nutrient_levels_tags.map((tag, index) => {
              let color = "green"; // Default color for "low"
              if (tag.includes("high")) {
                color = "red";
              } else if (tag.includes("medium")) {
                color = "yellow";
              }
              return (
                <View key={index} style={{ flexDirection: "row", alignItems: "center", marginVertical: 2 }}>
                  <View style={[styles.dot, { backgroundColor: color }]} />
                  <Text>{tag.replace("en:", "").replace("-", " ")}</Text>
                </View>
              );
            })}
          </View>
        )}

        {/* Suggested Products */}
        <View style={styles.suggestedSection}>
          <Text style={styles.suggestedTitle}>Compare Products</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.suggestedList}
          >
            {suggestedProducts.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.suggestedItem}
                onPress={() => navigation.navigate("Compare", { originalProduct: product, comparedProduct: item })}
              >
                <Image source={{ uri: item.image_url }} style={styles.suggestedImage} />
                <Text style={styles.suggestedText}>{item.product_name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>



      </ScrollView>
      <BottomNavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F5F5" },
  header: { backgroundColor: "#2D2D2D", padding: 15, flexDirection: "row", justifyContent: "center" },
  headerText: { color: "white", fontSize: 18, fontWeight: "bold" },
  closeButton: { position: "absolute", left: 20 },
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
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 10,
  },
  tabs: { flexDirection: "row", justifyContent: "center", marginVertical: 8 },
  tab: { padding: 10 },
  activeTab: { borderBottomWidth: 2, borderBottomColor: "#1B623B" },
  activeTabText: { fontWeight: "bold" },
  infocontainer: { padding: 16, backgroundColor: "#FFF", margin: 16, borderRadius: 10 },
  sectionTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 4 },
  suggestedSection: {
    margin: 16,
  },
  suggestedTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  suggestedList: {
    flexDirection: "row",
    paddingHorizontal: 8,
  },
  suggestedItem: {
    marginRight: 12,
    alignItems: "center",
    width: 100,
  },
  suggestedImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  suggestedText: {
    fontSize: 12,
    textAlign: "center",
    marginTop: 4,
  },
  
});

export default ProductDetailsScreen;
