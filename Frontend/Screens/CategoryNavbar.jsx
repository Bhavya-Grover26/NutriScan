import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';

const categories = [
  { key: 'all', clusterName: 'all', name: 'All', icon: 'format-list-bulleted' },
  { key: 'carbonated-soda', clusterName: 'beverages carbonated', name: 'Soda', icon: 'bottle-soda-classic' },
  { key: 'bread', clusterName: "bread cereals", name: 'Bread', icon: 'bread-slice' },
  { key: 'cheese', clusterName: 'cheeses cream', name: 'Cheese', icon: 'cheese' },
  { key: 'coffee',   clusterName: ['beverages coffees', 'coffee coffees', 'beverages coffee'] , name: 'Coffee', icon: 'coffee-outline' },
  { key: 'cookies', clusterName: ['biscuits snack', 'biscuits snack'], name: 'Cookie', icon: 'cookie' },
  { key: 'popcorn', clusterName: 'snack popcorn', name: 'Popcorn', icon: 'popcorn' },
  { key: 'fish', clusterName: ['fish meal', 'frozen fish', 'canned fish', 'smoked fish', 'fish breaded', 'fish fishes'], name: 'Fish', icon: 'fish' },
];

const CategoryNavbar = ({ onCategorySelect }) => {
    const [selectedCategory, setSelectedCategory] = useState(categories[0].clusterName);
  
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
                  selectedCategory === category.clusterName && styles.activeCategory,
                ]}
                onPress={() => handleCategorySelect(category.clusterName)}
              >
                <IconButton icon={category.icon} size={24} color="#FFF" />
              </TouchableOpacity>
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === category.clusterName && styles.activeCategoryText,
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

export default CategoryNavbar;