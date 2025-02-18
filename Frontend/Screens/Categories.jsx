import React from 'react';
import { View, Text, TextInput, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

const Categories = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.headerText}>Compare Products by Categories</Text>
      
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#999"
        />
      </View>

      {/* Scrollable Category List */}
      <ScrollView style={styles.categoryList}>
        {/* Category 1: Chips */}
        <TouchableOpacity style={styles.categoryCard}>
          <Image
            source={{ uri: 'https://c8.alamy.com/comp/KA04E4/crisps-on-display-in-a-supermarket-KA04E4.jpg' }}
            style={styles.categoryImage}
          />
          <View style={styles.categoryTextContainer}>
            <Text style={styles.categoryTitle}>Chips</Text>
            <Text style={styles.categoryDescription}>
              Compare the nutritional profiles of various chip brands to find the healthiest option for your snacking needs!
            </Text>
          </View>
        </TouchableOpacity>

        {/* Category 2: Ketchups */}
        <TouchableOpacity style={styles.categoryCard}>
          <Image
            source={{ uri: 'https://c8.alamy.com/comp/E2JY6R/shelf-with-food-in-a-supermarket-ketchup-and-other-sauces-E2JY6R.jpg' }}
            style={styles.categoryImage}
          />
          <View style={styles.categoryTextContainer}>
            <Text style={styles.categoryTitle}>Ketchups</Text>
            <Text style={styles.categoryDescription}>
              Explore and compare the nutritional content of different ketchup brands to choose the best option for your diet!
            </Text>
          </View>
        </TouchableOpacity>

        {/* Category 3: Carbonated Drinks */}
        <TouchableOpacity style={styles.categoryCard}>
          <Image
            source={{ uri: 'https://c8.alamy.com/comp/DE4DMK/soft-drink-cans-bottles-possible-tax-on-some-sugary-high-sugar-content-DE4DMK.jpg' }}
            style={styles.categoryImage}
          />
          <View style={styles.categoryTextContainer}>
            <Text style={styles.categoryTitle}>Carbonated Drinks</Text>
            <Text style={styles.categoryDescription}>
              Discover and compare the sugar and calorie content of various carbonated drinks to make healthier beverage choices!
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F5E8',
    padding: 16,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: '#2E7D32',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    paddingHorizontal: 16,
    marginBottom: 16,
    borderColor: '#DCDCDC',
    borderWidth: 1,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: '#333',
  },
  categoryList: {
    flex: 1,
  },
  categoryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 2,
  },
  categoryImage: {
    width: '100%',
    height: 150,
  },
  categoryTextContainer: {
    padding: 12,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2F4F2F',
    marginBottom: 8,
  },
  categoryDescription: {
    fontSize: 14,
    color: '#555',
  },
});

export default Categories;
