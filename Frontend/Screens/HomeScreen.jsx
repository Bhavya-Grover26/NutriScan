import React, { useEffect, useState } from "react";
import { 
  View, Text, FlatList, Image, TextInput, ActivityIndicator, 
  StyleSheet, ScrollView, TouchableOpacity
} from "react-native";
import BottomNavBar from "./BottomNavBar";
import { useNavigation, useRoute } from '@react-navigation/native';

const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const navigation = useNavigation();
  

  useEffect(() => {
    fetch("http://192.168.1.10:5001/products") 
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="green" style={styles.loader} />;
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header Section */}
        <View style={styles.header}>
          <TextInput 
            style={styles.searchInput} 
            placeholder="Search" 
            value={search} 
            onChangeText={(text) => setSearch(text)}
          />
          <Text style={styles.greeting}>Good Morning</Text>
        </View>

        {/* Category Section */}
        <View style={styles.categoryContainer}>
          {["Chips", "Soft Drink", "Chocolate", "Juice", "Cereal"].map((category, index) => (
            <View key={index} style={styles.categoryItem}>
              <Text style={styles.categoryText}>{category}</Text>
            </View>
          ))}
        </View>

        {/* Discover Section */}
        <Text style={styles.sectionTitle}>Discover</Text>
        <FlatList
          data={products}
          keyExtractor={(item) => item._id}
          horizontal
          renderItem={({ item }) => (
            <View style={styles.productCard}>
              <Image source={{ uri: item.image_url }} style={styles.productImage} />
              <Text style={styles.productName}>{item.product_name}</Text>
            </View>
          )}
          contentContainerStyle={{ paddingHorizontal: 10 }}
        />

        {/* Info Cards Section */}
        {/* Info Cards Section */}
<View style={styles.infoContainer}>
  <View style={styles.row}>
    <View style={styles.infoBox}>
      <Text style={styles.infoTitle}>Nutri-Score</Text>
      <Text style={styles.infoText}>Helps you check nutritional quality at a glance.</Text>
    </View>
    <View style={styles.infoBox}>
      <Text style={styles.infoTitle}>NOVA Score</Text>
      <Text style={styles.infoText}>Ranks food based on its level of processing.</Text>
    </View>
  </View>

  <View style={styles.row}>
    <View style={styles.infoBox}>
      <Text style={styles.infoTitle}>Eco-Score</Text>
      <Text style={styles.infoText}>Shows environmental impact of food products.</Text>
    </View>
    <View style={styles.infoBox}>
      <Text style={styles.infoTitle}>Scan Product</Text>
      <TouchableOpacity style={styles.scanButton} onPress={() => navigation.navigate("Scanner")}>
        <Text style={styles.scanButtonText}>Scan</Text>
      </TouchableOpacity>
    </View>
  </View>
</View>


        {/* See More Section */}
        <Text style={styles.sectionTitle}>See more</Text>
        <FlatList
          data={products}
          keyExtractor={(item) => item._id}
          numColumns={2}
          renderItem={({ item }) => (
            <View style={styles.seeMoreCard}>
              <Image source={{ uri: item.image_url }} style={styles.seeMoreImage} />
              <Text style={styles.seeMoreText}>{item.product_name}</Text>
            </View>
          )}
          contentContainerStyle={{ paddingHorizontal: 10 }}
        />
      </ScrollView>

      {/* Sticky Bottom Navigation */}
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
    backgroundColor: "#FFF7E4"
  },
  searchInput: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    height: 40,
    marginBottom: 10,
  },
  greeting: { fontSize: 24, fontWeight: "bold", color: "#2D6A4F" },
  categoryContainer: { 
    flexDirection: "row", 
    justifyContent: "space-around", 
    padding: 10,
    marginTop: 10,
  },
  categoryItem: { 
    backgroundColor: "#E8F5E9", 
    padding: 10, 
    borderRadius: 10,
  },
  categoryText: { fontSize: 14, fontWeight: "bold" },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginVertical: 10, marginLeft: 15 },
  loader: { flex: 1, justifyContent: "center" },
  productCard: { 
    marginRight: 15, 
    alignItems: "center", 
    backgroundColor: "#fff", 
    padding: 10, 
    borderRadius: 10 
  },
  productImage: { 
    width: 100, 
    height: 100, 
    borderRadius: 10, 
    resizeMode: 'contain' 
  },
  productName: { 
    fontSize: 14, 
    fontWeight: "bold", 
    marginTop: 5, 
    textAlign: "center" 
  },
  infoContainer: { 
    flexDirection: "column", 
    alignItems: "center",
    padding: 8
  },
  row: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    width: "100%", 
    marginBottom: 10 
  },
  infoBox: { 
    flex: 1, 
    backgroundColor: "#D4EDDA", 
    padding: 15, 
    borderRadius: 10, 
    marginHorizontal: 5, 
    alignItems: "center",
    justifyContent: "center"
  },
  infoTitle: { fontSize: 16, fontWeight: "bold", color: "#2D6A4F", textAlign: "center" },
  infoText: { fontSize: 12, color: "#6C757D", marginTop: 5, textAlign: "center" },
  
  // Scan button styles
  scanButton: {
    backgroundColor: "#FFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10
  },
  scanButtonText: {
    color: "#2D6A4F",
    fontSize: 14,
    fontWeight: "bold",
  },
  
  seeMoreCard: { 
    flex: 1, 
    backgroundColor: "#fff", 
    padding: 10, 
    margin: 5, 
    borderRadius: 10, 
    alignItems: "center" 
  },
  seeMoreImage: { width: 100, height: 100, borderRadius: 10 },
  seeMoreText: { fontSize: 14, fontWeight: "bold", marginTop: 5, textAlign: "center" },
});

export default HomeScreen;
