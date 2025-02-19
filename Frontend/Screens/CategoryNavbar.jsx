import React, { useState } from 'react';
import { View, Text, TextInput, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';

const categories = [
  { key: 'all', name: 'All', icon: 'format-list-bulleted' },
  { key: 'carbonated-soda', name: 'Soda', icon: 'bottle-soda-classic' },
  { key: 'bread', name: 'Bread', icon: 'bread-slice' },
  { key: 'cheese', name: 'Cheese', icon: 'cheese' },
  { key: 'coffee', name: 'Coffee', icon: 'coffee-outline' },
  { key: 'cookies', name: 'Cookie', icon: 'cookie' },
  { key: 'chips', name: 'Chips', icon: 'baguette' },
];

const products = [
  {
    id: '1',
    name: 'The health factory zero maida bun - pack of 2',
    brand: 'The Health Factory',
    score: '100/100',
    image: 'https://example.com/bread-image1.jpg',
  },
  {
    id: '2',
    name: 'The health factory zero maida protein bread',
    brand: 'The Health Factory',
    score: '100/100',
    image: 'https://example.com/bread-image2.jpg',
  },
  // Add more products as necessary
];

const SpecificCategories = () => {
  const [selectedCategory, setSelectedCategory] = useState('bread');

  return (


      <View style={styles.mainContent}>
        {/* Left Category Nav */}
        <ScrollView style={styles.navbar}>
  {categories.map((category) => (
    <View>
   <TouchableOpacity
   key={category.key}
   style={[
     styles.categoryButton,
     selectedCategory === category.key && styles.activeCategory,
   ]}
   onPress={() => setSelectedCategory(category.key)}
 >
   <IconButton
     icon={category.icon}
     size={24}
     color="#FFF"
   />
 </TouchableOpacity>
 <Text
   style={[
     styles.categoryText,
     selectedCategory === category.key && styles.activeCategoryText,
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
        icon: {
          
          marginBottom: 20,
        },
        categoryText: {
          fontSize: 12,
          color: '#333',
          textAlign: 'center',
        },
        activeCategoryText: {
          color: '#FFF',
        },
        categoryButton: {
          marginLeft: 10,
          padding: 10,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 50, // Ensures a circular shape
          backgroundColor: '#D3D3D3', // Light grey for default
          marginBottom: 8,
          width: 50, // Consistent size
          height: 50,
        },
        activeCategory: {
          backgroundColor: '#2B7A0B', // green for active
          borderRadius: 50, // Circular
        },
 

      
  container: {
    flex: 1,
    backgroundColor: '#F8F5E8',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#2E7D32',
  },
  backButton: {
    fontSize: 16,
    color: '#FFF',
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 10,
    borderRadius: 25,
    height: 40,
  },
  mainContent: {
    flex: 1,
    flexDirection: 'row',
  },

 

  productSection: {
    flex: 1,
    padding: 10,
  },
  bannerContainer: {
    width: '150%',
    height: 150,
    marginBottom: 10,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  productCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    elevation: 2,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
  },
  productDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  productBrand: {
    fontSize: 14,
    color: '#666',
  },
  productScore: {
    fontSize: 14,
    color: '#2E7D32',
  },
});

export default SpecificCategories;