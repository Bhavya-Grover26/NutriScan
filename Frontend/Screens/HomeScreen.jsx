import React, { useEffect, useState } from "react";
import { 
  View, Text, FlatList, Image, TextInput, ActivityIndicator, 
  StyleSheet, ScrollView, 
  TouchableOpacity
} from "react-native";

const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://192.168.29.51:5001/products") // Replace with your actual backend URL
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
    <ScrollView style={styles.container}>
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
      <View style={styles.infoContainer}>
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Nutri-Score</Text>
          <Text style={styles.infoText}>Helps you check nutritional quality at a glance.</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>NOVA Score</Text>
          <Text style={styles.infoText}>Ranks food based on its level of processing.</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Eco-Score</Text>
          <Text style={styles.infoText}>Shows environmental impact of food products.</Text>
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
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f8f8" },
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
  subText: { fontSize: 14, color: "#6C757D", marginBottom: 10 },
  
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 15,
  },
  actionButton: {
    flex: 1,
    backgroundColor: "#C8E6C9", // Slightly darker green than the category section
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  actionButtonText: {
    color: "#2D6A4F",
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 14,
  },

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
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center",
    padding: 10 
  },
  infoBox: { 
    flex: 1, 
    backgroundColor: "#D4EDDA", 
    padding: 15, 
    borderRadius: 10, 
    marginHorizontal: 5 
  },
  infoTitle: { fontSize: 16, fontWeight: "bold", color: "#2D6A4F" },
  infoText: { fontSize: 12, color: "#6C757D", marginTop: 5 },

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
