import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';
import CategoryNavbar from './CategoryNavbar';
import BottomNavBar from "./BottomNavBar";


const SpecificCategories = () => {
  const [selectedCategory, setSelectedCategory] = useState("bread");
  const [categoryItems, setCategoryItems] = useState([]);

  useEffect(() => {
    if (selectedCategory) {
      fetchCategoryProducts(selectedCategory);
    }
  }, [selectedCategory]);

  const fetchCategoryProducts = async (category) => {
    try {
      const formattedCategory = category
  .split(" ")                  // Split category into individual words
  .map((part) => part.trim())  // Trim each word
  .join("-");                  // Join with hyphens to form "bread-cereals"
      const response = await fetch(`http://192.168.0.112:5001/products/${formattedCategory}`);
      console.log("Fetching products from URL:", response);

      const data = await response.json();

      if (!Array.isArray(data)) {
        console.warn("Unexpected API response:", data);
        setCategoryItems([]);
        return;
      }

      setCategoryItems(data);
    } catch (error) {
      console.error("Error fetching category products:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        {/* Pass the setSelectedCategory callback to CategoryNavbar */}
        <CategoryNavbar onCategorySelect={setSelectedCategory} />
      </View>

      <View style={styles.contentWrapper}>
        <View style={styles.uppercontent}></View>
        <View style={styles.header}>
          <IconButton icon="arrow-left" size={24} onPress={() => {}} />
          <Text style={styles.headerTitle}>{selectedCategory}</Text>
          <IconButton icon="bell-outline" size={24} onPress={() => {}} />
        </View>

        <View style={styles.searchContainer}>
          <TextInput style={styles.searchInput} placeholder="Search..." />
          <IconButton icon="barcode-scan" size={24} onPress={() => {}} />
        </View>

        <View style={styles.maincontent}>
          <ScrollView style={styles.listContainer}>
            {categoryItems.map((item, index) => (
              <View key={index} style={styles.breadItem}>
                <Image style={styles.breadImage} source={{ uri: item.image_url }} />
                <View style={styles.breadInfo}>
                  <Text style={styles.breadTitle}>{item.product_name}</Text>
                  <Text style={styles.breadBrand}>{item.brands}</Text>
                </View>
                <View style={styles.ratingContainer}>
                  <Text style={styles.ratingText}>{item.Rank}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
      <BottomNavBar/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
  },
  navbar: {
    marginTop: 120,
    width: 70,
    backgroundColor: '#fff',
    elevation: 5,
    alignItems: 'center',
    paddingVertical: 20,
  },
  contentWrapper: {
    flex: 1, 
    paddingHorizontal: 16, 
  },
  uppercontent: {
    backgroundColor: 'green',
    height: 120,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    marginHorizontal: -80,
  },
  header: {
    flexDirection: 'row',
    left: -80,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
    marginLeft: 15,
    marginHorizontal: -80,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  searchContainer: {
    flexDirection: 'row',
    left: -80,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 10,
    height: 40,
    marginLeft: 15,
    marginHorizontal: -80,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  maincontent: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
  },
  breadItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    elevation: 2,
  },
  breadImage: {
    width: 60,
    height: 90,
    borderRadius: 8,
    marginRight: 12,
    resizeMode: 'contain',
  },
  breadInfo: {
    flex: 1,
  },
  breadTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  breadBrand: {
    fontSize: 14,
    color: '#666',
  },
  ratingContainer: {
    backgroundColor: '#4CAF50',
    borderRadius: 16,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  ratingText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default SpecificCategories;
