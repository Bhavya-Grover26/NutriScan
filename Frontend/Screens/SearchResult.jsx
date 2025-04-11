import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import BottomNavBar from "./BottomNavBar";
import { IconButton } from "react-native-paper";


const SearchResults = ({ route, navigation }) => {
  const { searchQuery } = route.params;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await fetch(`https://nutriscan-production.up.railway.app/search?query=${searchQuery}`);
        const text = await response.text(); // log raw response
        console.log("Raw response:", text);

        try {
          const data = JSON.parse(text);
          if (Array.isArray(data)) {
            setProducts(data);
          } else {
            setProducts([]);
          }
        } catch (err) {
          console.error("JSON Parse error:", err.message);
          setProducts([]);
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [searchQuery]);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#2D6A4F" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
            <TouchableOpacity style={styles.closeButton}>
                    <IconButton 
                  icon="keyboard-backspace" 
                  size={24} 
                  color="white" 
                  onPress={() => navigation.goBack()} 
                />        </TouchableOpacity>
          <Text style={styles.greeting}>Search Results for "{searchQuery}"</Text>
        </View>

        {products.length === 0 ? (
          <Text style={{ textAlign: "center", fontSize: 16, marginTop: 30, color: "#6C757D" }}>
            No products found for your search.
          </Text>
        ) : (
          <>
            <Text style={styles.sectionTitle}>Discover</Text>
            <FlatList
              data={products}
              keyExtractor={(item) => item._id}
              numColumns={2}  // This sets two products per row
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    console.log("Navigating with barcode:", item._id);
                    navigation.navigate("BarcodeScan1", { barcode: item._id });
                  }}
                  style={styles.productCard}
                >
                  <Image source={{ uri: item.image_url }} style={styles.productImage} />
                  <Text style={styles.productName}>{item.product_name}</Text>
                </TouchableOpacity>
              )}
              contentContainerStyle={{ paddingHorizontal: 10 }}
            />
          </>
        )}
      </ScrollView>
      <BottomNavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#f8f8f8", 
  },
  scrollContent: {
    paddingBottom: 60, // Prevents content from being cut off behind the navbar
  },
  header: { 
    padding: 20, 
    backgroundColor: "#FFF7E4",
  },
  greeting: { 
    fontSize: 20, 
    fontWeight: "bold", 
    color: "#2D6A4F",
    marginLeft: 60,
  },
  sectionTitle: { 
    fontSize: 18, 
    fontWeight: "bold", 
    marginVertical: 10, 
    marginLeft: 15,
  },
  loader: { 
    flex: 1, 
    justifyContent: "center",
  },
  productCard: { 
    flex: 1, // Allows the product card to scale and fit two items per row
    margin: 10, 
    alignItems: "center", 
    backgroundColor: "#fff", 
    padding: 10, 
    borderRadius: 10,
  },
  productImage: { 
    width: 100, 
    height: 100, 
    borderRadius: 10, 
    resizeMode: 'contain',
  },
  productName: { 
    fontSize: 14, 
    fontWeight: "bold", 
    marginTop: 5, 
    textAlign: "center",
  },
  closeButton: { position: "absolute", left: 20, marginTop:7 },
});

export default SearchResults;
