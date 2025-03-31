import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';

const categories = [
  { key: 'carbonated-soda', clusterName: 'beverages carbonated', name: 'Soda', icon: 'bottle-soda-classic' },
  { key: 'bread', clusterName: "bread cereals", name: 'Bread', icon: 'bread-slice' },
  { key: 'cheese', clusterName: 'cheeses cream', name: 'Cheese', icon: 'cheese' },
  { key: 'coffee',   clusterName: ['beverages coffees', 'coffee coffees', 'beverages coffee'] , name: 'Coffee', icon: 'coffee-outline' },
  { key: 'cookies', clusterName: ['biscuits snack', 'biscuits snack'], name: 'Cookie', icon: 'cookie' },
  { key: 'popcorn', clusterName: 'snack popcorn', name: 'Popcorn', icon: 'popcorn' },
  { key: 'chips', clusterName: 'snack crisps', name: 'Chips', icon: 'chili-mild' },
  { key: 'chocolates', clusterName: 'chocolate dark', name: 'Candy', icon: 'candy' },
  { key: 'cereals', clusterName: ['cereals breakfast', 'chocolate puffed'], name: 'Cereals', icon: 'barley' },
  { key: 'sauce', clusterName: 'sauces', name: 'Sauce', icon: 'soy-sauce' },
  { key: 'fish', clusterName: ['fish meal', 'frozen fish', 'canned fish', 'smoked fish', 'fish breaded', 'fish fishes'], name: 'Fish', icon: 'fish' },
];

const CategoryNavbar = ({ onCategorySelect, currentCategory }) => {
  const [selectedCategory, setSelectedCategory] = useState(currentCategory);

  useEffect(() => {
    // Notify parent component about the selected category
    onCategorySelect(selectedCategory);
  }, [selectedCategory]);

  const handleCategorySelect = (categoryCluster) => {
    // If clusterName is an array, join it with commas
    const formattedCluster = Array.isArray(categoryCluster)
      ? categoryCluster.map((name) => name.replace(/\s/g, "-")).join(",")
      : categoryCluster.replace(/\s/g, "-");

    setSelectedCategory(formattedCluster);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.navbar}>
        {categories.map((category) => (
          <View key={category.key}>
            <TouchableOpacity
              style={[
                styles.categoryButton,
                selectedCategory === (Array.isArray(category.clusterName) 
                  ? category.clusterName.map((name) => name.replace(/\s/g, "-")).join(",") 
                  : category.clusterName.replace(/\s/g, "-")) && styles.activeCategory,
              ]}
              onPress={() => handleCategorySelect(category.clusterName)}
            >
              <IconButton icon={category.icon} size={24} color="#FFF" />
            </TouchableOpacity>
            <Text
              style={[
                styles.categoryText,
                selectedCategory === (Array.isArray(category.clusterName) 
                  ? category.clusterName.map((name) => name.replace(/\s/g, "-")).join(",") 
                  : category.clusterName.replace(/\s/g, "-")) && styles.activeCategoryText,
              ]}
            >
              {category.name}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F5E8',
  },
  navbar: {
    flexDirection: 'column',
    paddingTop: 1,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#fff',
  },
  categoryButton: {
    margin: 6,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    backgroundColor: '#D3D3D3', // Light grey for default
    width: 45,
    height: 45,
    elevation: 3, // Add subtle shadow for better depth perception
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeCategory: {
    backgroundColor: '#F8F5E8', // green for active
    borderRadius: 50, // Circular
  },
  categoryText: {
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
    marginTop: 4, // Added space between icon and text
  },
  activeCategoryText: {
    color: '#2B7A0B', // White for active category text
  },
  icon: {
    marginBottom: 4, // Ensuring space between icon and button border
  },

  // Top bar styles
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#2E7D32',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  backButton: {
    fontSize: 16,
    color: '#FFF',
    marginRight: 10,
  },

  // Search bar styles
  searchInput: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 10,
    borderRadius: 25,
    height: 40,
    marginVertical: 10,
    elevation: 2,
  },

  // Product section and banners
  productSection: {
    flex: 1,
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  bannerContainer: {
    width: '100%',
    height: 150,
    marginBottom: 10,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 4, // subtle shadow for banner container
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 12,
  },

  // Product cards
  productCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
    resizeMode: 'contain',
  },
  productDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  productBrand: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  productScore: {
    fontSize: 14,
    color: '#2E7D32',
    fontWeight: 'bold',
  },
});


export default CategoryNavbar;