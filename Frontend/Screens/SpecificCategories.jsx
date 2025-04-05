import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';
import { useRoute , useNavigation} from '@react-navigation/native';
import CategoryNavbar from './CategoryNavbar';
import BottomNavBar from "./BottomNavBar";

const SpecificCategories = () => {
  const route = useRoute();
  const initialCategory = route.params?.category || ['bread'];
  console.log("Received categories:", initialCategory);
    const [selectedCategory, setSelectedCategory] = useState(initialCategory);
    const navigation = useNavigation();
  const [categoryItems, setCategoryItems] = useState([]);

  // Fetch products when the selected category changes
  useEffect(() => {
    if (selectedCategory) {
      fetchCategoryProducts(selectedCategory);
    }
  }, [selectedCategory]);

const fetchCategoryProducts = async (categories) => {
  try {
    let formattedCategories;

    // Check if categories is an array or a string
    if (Array.isArray(categories)) {
      formattedCategories = categories
        .map((cat) => cat.trim().replace(/\s+/g, '-'))  // Format each category string
        .join(','); // Join array items by commas for multi-category support
    } else {
      formattedCategories = categories.trim().replace(/\s+/g, '-'); // Format a single category
    }

    // Fetch data from the API
    const response = await fetch(`https://nutriscan-production.up.railway.app/products/${formattedCategories}`);
    console.log('Fetching products from URL:', response.url); // Log the request URL

    const data = await response.json();
    console.log("API Response:", JSON.stringify(data, null, 2));

    // Ensure data is an array
    if (!Array.isArray(data)) {
      console.warn('Unexpected API response:', data);
      setCategoryItems([]);
      return;
    }

    setCategoryItems(data);
  } catch (error) {
    console.error('Error fetching category products:', error);
  }
};

return (
  <View style={styles.container}>
    <View style={styles.navbar}>
      <CategoryNavbar 
        onCategorySelect={setSelectedCategory} 
        currentCategory={selectedCategory} 
      />
    </View>

    <View style={styles.contentWrapper}>
      <View style={styles.uppercontent}></View>
      <View style={styles.header}>
        <IconButton icon="" size={24} onPress={() => {}} />
        <Text style={styles.headerTitle}>Categories</Text>
        <IconButton icon="" size={24} onPress={() => {}} />
      </View>

      <View style={styles.maincontent}>
        <ScrollView style={styles.listContainer}>
          {categoryItems.map((item, index) => (
                <TouchableOpacity 
                key={index} 
                style={styles.breadItem}
                onPress={() => {
                  console.log("Navigating with barcode:", item._id); // Debugging
                  navigation.navigate("BarcodeScan1", { barcode: item._id });
                }}
              >
              <Image style={styles.breadImage} source={{ uri: item.image_url }} />
              <View style={styles.breadInfo}>
                <Text style={styles.breadTitle}>{item.product_name}</Text>
                <Text style={styles.breadBrand}>{item.brands}</Text>
              </View>
              <View style={styles.ratingContainer}>
                <Text style={styles.ratingText}>{item.Rank}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>

    <BottomNavBar />
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
    marginTop: 50,
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
    backgroundColor: '#1B623B',
    height: 60,
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
    color: '#fff',
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
    backgroundColor: '#1B623B',
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
