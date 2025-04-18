import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from "react-native";
import { IconButton } from "react-native-paper";
import BottomNavBar from "./BottomNavBar";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage
import axios from "axios";


const ProductDetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [activeTab, setActiveTab] = useState("Overview");
  const [product, setProduct] = useState(null);
  const [suggestedProducts, setSuggestedProducts] = useState([]);
  const [token, setToken] = useState(null);
  const [preferences, setPreferences] = useState(null);
  const { barcode } = route.params;

  const normalizeWord = (word) => {
    if (word.endsWith("ies")) {
      return word.slice(0, -3) + "y"; // candies → candy
    } else if (word.endsWith("es")) {
      return word.slice(0, -2); // tomatoes → tomato
    } else if (word.endsWith("s") && !word.endsWith("ss")) {
      return word.slice(0, -1); // eggs → egg
    }
    return word;
  };

  // Function to normalize text: lowercase + singular
  const normalizeText = (text) => normalizeWord(text.toLowerCase().trim());

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("userToken");
        const storedPreferences = await AsyncStorage.getItem("userPreferences");
        
        console.log("🔹 Retrieved Token:", storedToken);
        console.log("🔹 Retrieved Preferences:", storedPreferences);
  
        if (storedToken) setToken(storedToken);
        if (storedPreferences) {
          const parsedPreferences = JSON.parse(storedPreferences);
          parsedPreferences.allergen = parsedPreferences.allergen.map(normalizeText); // Normalize allergens
          setPreferences(parsedPreferences);
        }
      } catch (error) {
        console.error("Error loading user data:", error);
      }
    };
  
    loadUserData();
  }, []);

  useEffect(() => {
    // Fetch product details
    const fetchProductDetails = async () => {
      try {
        console.log("Fetching product details...");
        const response = await fetch(`https://nutriscan-production.up.railway.app/product/${barcode}`);
        const data = await response.json();
        console.log("Product details fetched:", data);
        console.log("Received Final_Classification:", data.Final_Classification);

        // Directly use Final_Classification from data
        setProduct({
          ...data,
          overallClassification: {
            vegan: data.Final_Classification.Vegan === "Yes",
            vegetarian: data.Final_Classification.Vegetarian === "Yes",
            non_veg: data.Final_Classification["Non-Veg"] === "Yes",
            jain: data.Final_Classification.Jain === "Yes",
          },
          
        });
        const nonJainIngredients = new Set([
          "garlic", "onion", "potato", "ginger", "radish", "carrot", "beetroot", "turnip", "yam", "brinjal", 
          "eggplant", "fish oil", "sweet potato", "taro", "mushrooms", "leeks", "shallots", "spring onions", 
          "asparagus", "cabbage", "cauliflower", "broccoli", "fennel", "sprouted grains", "yeast", "vinegar", 
          "fermented foods", "alcohol", "beer", "wine", "garlic powder", "onion powder", "truffles", "meat", 
          "fish", "chicken", "eggs", "lamb", "pork", "beef", "seafood", "crab", "lobster", "shrimp", "squid", 
          "octopus", "oyster", "mussels", "clam", "gelatin", "anchovies", "caviar", "bone broth", "liver", 
          "pate", "bacon", "ham", "salami", "sausages", "turkey", "duck", "goose", "venison", "quail", 
          "frogs legs", "fish sauce", "shrimp paste", "bone marrow", "meat stock", "shellfish", "sushi", 
          "pickled herring", "steak", "roast beef", "fish roe", "tandoori chicken", "smoked salmon", 
          "beef extract", "chicken fajita", "mutton curry", "seafood paella", "chicken quesadilla", 
          "beef stir-fry", "lamb kebabs", "eggplant curry"
        ]);
        const ingredientsList = product.ingredients_text.toLowerCase().split(/\s+/);
        const containsNonJain = ingredientsList.some(ingredient => nonJainIngredients.has(ingredient));
        if (containsNonJain) {
          console.log("⚠️ Product contains non-Jain ingredients. Updating classification.");
          product.overallClassification.jain = false; // Set Jain to false
        }
        setProduct({ ...product });

      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };
  
    // Fetch similar products from the same cluster
    const fetchSuggestedProducts = async () => {
      try {
        console.log("Fetching similar products...");
        const response = await fetch(`https://nutriscan-production.up.railway.app/similar/${barcode}`);
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

  const getNovaStyle = (novaGroup) => {
    switch (novaGroup) {
      case 1:
        return { backgroundColor: "#0B6623" }; // Dark Green
      case 2:
        return { backgroundColor: "#00A86B" }; // Medium Green
      case 3:
        return { backgroundColor: "#FFD300" }; // Amber
      case 4:
        return { backgroundColor: "#C21807" }; // Red
      default:
        return { backgroundColor: "#9E9E9E" }; // Grey
    }
  };
  
  const getNutriStyle = (nutriScore) => {
    switch (nutriScore) {
      case "a":
        return { backgroundColor: "#0B6623" }; // Dark Green
      case "b":
        return { backgroundColor: "#00A86B" }; // Green
      case "c":
        return { backgroundColor: "#FFD300" }; // Yellow
      case "d":
        return { backgroundColor: "#FC6A03" }; // Orange
      case "e":
        return { backgroundColor: "#C21807" }; // Red
      default:
        return { backgroundColor: "#9E9E9E" }; // Grey
    }
  };

  const additives = {
    'Preservatives': new Set(['E200', 'E201', 'E202', 'E203', 'E210', 'E211', 'E212', 'E213', 'E214', 'E215', 'E216', 'E217', 'E218', 'E219', 
                               'E220', 'E221', 'E222', 'E223', 'E224', 'E225', 'E226', 'E227', 'E228', 'E249', 'E250', 'E251', 'E252']),
    'MSG': new Set(['E620', 'E621', 'E622', 'E623', 'E624', 'E625']),
    'Nitrates & Nitrites': new Set(['E249', 'E250', 'E251', 'E252']),
    'Artificial Colors': new Set(['E100', 'E101', 'E102', 'E110', 'E120', 'E122', 'E124', 'E129', 'E132', 'E133', 'E150a', 'E150b', 'E150c', 'E150d']),
    'Artificial Flavors': new Set(['E620', 'E621', 'E622', 'E623', 'E624', 'E625', 'E627', 'E631', 'E635']),
    'Sulfites': new Set(['E220', 'E221', 'E222', 'E223', 'E224', 'E226', 'E227'])
  };
/*
  const saveScanToHistory = async () => {
    try {

      const keys = await AsyncStorage.getAllKeys();
      console.log("Stored keys in AsyncStorage:", keys);
           
      console.log("Fetching product details...");
        const response = await fetch(`https://nutriscan-production.up.railway.app/product/${barcode}`);
        const data = await response.json();
        console.log("Product details fetched:", data);
      const storedToken = await AsyncStorage.getItem("authToken");
      console.log("🔹 Retrieved Token:", storedToken);
      const response2 = await axios.post("http://192.168.1.9:5001/history", {
        scanned_product_id: barcode,
        nutrient_levels_tags: product.nutrient_levels_tags || [],
      },
      console.log("Payload:", {
        scanned_product_id: barcode,
        nutrient_levels_tags: product.nutrient_levels_tags || [],
      }),
      console.log("API Response:", response2.data),
      alert("Product saved to history!"););
    } catch (error) {
      console.error("Save failed:", error.response2?.data || error.message);
      alert("Failed to save product.");
    }
  };
 */

  const saveScanToHistory = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      console.log("Stored keys in AsyncStorage:", keys);
  
      console.log("Fetching product details...");
      const response = await fetch(`https://nutriscan-production.up.railway.app/product/${barcode}`);
      const data = await response.json();
      console.log("Product details fetched:", data);
  
      const storedToken = await AsyncStorage.getItem("authToken");
      console.log("🔹 Retrieved Token:", storedToken);
  
      const payload = {
        scanned_product_id: barcode,
        nutrient_levels_tags: product.nutrient_levels_tags || [],
      };
  
      console.log("Payload:", payload);
  
      const response2 = await axios.post("http://192.168.1.9:5001/history", payload, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });
  
      console.log("API Response:", response2.data);
      alert("Product saved to history!");
    } catch (error) {
      console.error("Save failed:", error.response?.data || error.message);
      alert("Failed to save product.");
    }
  };
  
  
  

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
        <IconButton 
      icon="close" 
      size={24} 
      color="white" 
      onPress={() => navigation.goBack()} 
    />        </TouchableOpacity>
      </View>

      {/* Success Message */}
      <View style={styles.successMessage}>
        <Text style={styles.successText}>Hurray, we scanned the product!</Text>
      </View>
      <ScrollView 
        style={styles.scrollContainer}
        contentContainerStyle={{ paddingBottom: 70 }}  // Prevents BottomNavBar overlap
      >

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
                <Text style={styles.scoreText}>Rank: {product.rank}</Text>
  </View>
  {/*<TouchableOpacity onPress={() => console.log("Save product pressed")}>*/}
  <IconButton
    icon="bookmark" // or "bookmark" if you want filled
    size={24}
    iconColor="#C21807"
    onPress={saveScanToHistory}
    style={styles.iconButton}
  />
   {/*</TouchableOpacity>*/}
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

{/* Overview Section */}
{activeTab === "Overview" && (
    <View style={styles.overviewContainer}>
    <Text style={styles.sectionTitle}>For you:</Text>

{preferences?.selectedDiets?.length > 0 &&
  preferences.selectedDiets.map((diet) => {
    const key = diet.toLowerCase(); // Convert to lowercase for consistency
    return (
      <View
        key={key}
        style={[
          styles.dietBox,
          {
            borderColor: product.overallClassification[key] ? "#1A2421" : "#800000",
            borderWidth: 2, // Adjust thickness if needed
            backgroundColor: "transparent", // No background fill
          },
        ]}
        
      >
        <Text
          style={[
            styles.dietText,
            { color: product.overallClassification[key] ? "black" : "black" },
          ]}
        >
          {product.overallClassification[key]
            ? `The product is ${diet}.`
            : `⚠️ The product is not ${diet}.`}
        </Text>
      </View>
    );
  })}


    {/* Show unwanted additives based on user preferences */}
{/* Show unwanted additives based on user preferences */}
{/* Show unwanted additives based on user preferences */}
{(() => {
  const detectedAdditives = [];

  // Check each additive category
  preferences?.selectedAdditives?.forEach((userSelectedAdditive) => {
    if (additives[userSelectedAdditive]) {
      const matchedAdditives = product.additives_tags
        .map((additive) => additive.replace("en:", "").toUpperCase())
        .filter((code) => additives[userSelectedAdditive].has(code));

      if (matchedAdditives.length > 0) {
        detectedAdditives.push({
          category: userSelectedAdditive,
          codes: matchedAdditives,
        });
      }
    }
  });

  if (detectedAdditives.length > 0) {
    return (
      <View style={styles.additivesWarning}>
        <Text style={styles.additivesText}>⚠️ <Text style={{ fontWeight: "bold", fontStyle: "italic" }}>Detected Additives:</Text></Text>
        {detectedAdditives.map((item, index) => (
          <Text key={index} style={styles.additivesDetails}>
            {item.category}: {item.codes.join(", ")}
          </Text>
        ))}
      </View>
    );
  }
  return null;
})()}

{(() => {
  const detectedAllergens = product.ingredients_text
    .split(/\s+/)
    .map(normalizeText)
    .filter((word) => preferences?.allergen?.some((allergen) => word.includes(allergen)));

  const detectedSelectedIngredients = product.ingredients_text
    .split(/\s+/)
    .map(normalizeText)
    .filter((word) => preferences?.selectedIngredients?.some((ingredient) => word.includes(ingredient)));

  if (detectedAllergens.length > 0 || detectedSelectedIngredients.length > 0) {
    return (
      <View style={styles.allergenWarning}>
        {detectedAllergens.length > 0 && (
          <Text style={styles.allergenText}>
            ⚠️ <Text style={{ fontWeight: "bold", fontStyle: "italic" }}>Allergens: </Text>
            {detectedAllergens.join(", ")}
          </Text>
        )}
        {detectedSelectedIngredients.length > 0 && (
          <Text style={styles.selectedIngredientText}>
            ⚠️ <Text style={{ fontWeight: "bold", fontStyle: "italic" }}>Selected Ingredients Found: </Text>
            {detectedSelectedIngredients.join(", ")}
          </Text>
        )}
      </View>
    );
  }
  return null;
})()}



    <View style={styles.nutriNovaContainer}>
      <View style={[styles.novaBadge, getNovaStyle(product.nova_group)]}>
        <Text style={styles.novaText}>NOVA Group: {product.nova_group}</Text>
      </View>

      <View style={[styles.nutriBadge, getNutriStyle(product.nutriscore_tags?.[0])]}>
        <Text style={styles.nutriText}>Nutri-Score: {product.nutriscore_tags?.[0]?.toUpperCase()}</Text>
      </View>
    </View>
  </View>
)}



       

        {/* Ingredients Info */}
{activeTab === "Ingredient" && (
  <View style={styles.infocontainer}>
    <Text style={styles.sectionTitle}>Ingredients:</Text>

    {/* Detect Allergens and Show Warning Banner */}
    {(() => {
      const detectedAllergens = product.ingredients_text
        .split(/\s+/)
        .map(normalizeText)
        .filter((word) => preferences?.allergen?.some((allergen) => word.includes(allergen)));

      if (detectedAllergens.length > 0) {
        return (
          <View style={styles.allergenWarning}>
            <Text style={styles.allergenText}>
              ⚠️   <Text style={{ fontWeight: "bold", fontStyle: "italic" }}>Allergens: </Text>
              {detectedAllergens.join(", ")}
            </Text>
          </View>
        );
      }
      return null;
    })()}

    {/* Display Ingredients with Highlighted Allergens */}
    <Text>
      {product.ingredients_text.split(/\s+/).map((word, index) => {
        const normalizedWord = normalizeText(word);

        const isAllergen = preferences?.allergen?.some((allergen) =>
          normalizedWord.includes(allergen)
        );

        return (
          <Text key={index} style={isAllergen ? { color: "red", fontWeight: "bold" } : {}}>
            {word}{" "}
          </Text>
        );
      })}
    </Text>
  </View>
)}


        {/* Nutrition Info */}
        {activeTab === "Nutrition" && (
          <View style={styles.infocontainer}>
            <Text style={styles.sectionTitle}>Nutritional Information:</Text>
            {product.nutrient_levels_tags.map((tag, index) => {
              let color = "green"; // Default color for "low"
              if (tag.includes("high")) {
                color = "#C21807";
              } else if (tag.includes("moderate")) {
                color = "#FFD300";
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
  {suggestedProducts.length > 0 ? (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.suggestedList}
    >
      {suggestedProducts.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.suggestedItem}
          onPress={() =>
            navigation.navigate("Compare", {
              originalProduct: product,
              comparedProduct: item,
            })
          }
        >
          <Image
            source={{ uri: item.image_url }}
            style={styles.suggestedImage}
          />
          <Text style={styles.suggestedText}>{item.product_name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  ) : (
    <Text style={styles.noProductsText}>
      Sorry, no products to be compared in this category :(
    </Text>
  )}
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
  overviewContainer: { 
    padding: 10, 
    backgroundColor: "#FFF", 
    marginHorizontal: 12, 
    borderRadius: 10, 
    elevation: 1,
  },
  
  classificationTable: { 
    backgroundColor: "#F9F9F9",
    borderRadius: 8,
    padding: 2, 
  },
  
  tableRow: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    marginVertical: 2 
  },
  
  tableCell: { 
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent: "space-between",
    flex: 1,
    padding: 6,
  },
  
  infoRow: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    marginTop: 8 
  },
  
  infoText: { 
    fontSize: 14, 
    color: "#333" 
  },
  
  sectionTitle: { 
    fontSize: 18, 
    fontWeight: "bold", 
    marginBottom: 8, 
    color: "#333", 
    textAlign: "left" 
  },
  
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
  allergenWarning: {
    backgroundColor: "#E53935", // Red alert background
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  
  allergenText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },

  nutriNovaContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginVertical: 10,
  },
  
  novaBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  
  novaText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
  
  nutriBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  
  nutriText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
    textTransform: "uppercase",
  },

  additivesWarning: {
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#8FBC8F",  // Darker Green Border
  },
  additivesText: {
    color: "#2F6627", // Dark Green Text
    fontSize: 16,
    fontWeight: "bold",
  },
  additivesDetails: {
    color: "#2F6627", 
    fontSize: 14,
    marginLeft: 5,
  },
  
  dietBox: {
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  dietText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  additivesWarning: {
    backgroundColor: "#DFFFD6",  // Light Green Box
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#8FBC8F",  // Darker Green Border
  },
  additivesText: {
    color: "#2F6627", // Dark Green Text
    fontSize: 16,
    fontWeight: "bold",
  },
  additivesDetails: {
    color: "#2F6627", 
    fontSize: 14,
    marginLeft: 5,
  },
  noProductsText: {
    fontSize: 20,
    color: "gray",
    marginTop: 10,
    paddingHorizontal: 10,
    fontStyle: "italic",
  },
  saveIcon: {
    marginLeft: 50,
  },
  
  
  
});

export default ProductDetailsScreen;
