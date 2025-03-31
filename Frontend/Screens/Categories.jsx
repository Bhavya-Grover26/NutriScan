import React from 'react';
import { View, Text, TextInput, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import BottomNavBar from "./BottomNavBar";


const Categories = () => {
  const navigation = useNavigation();
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
        {/* Category 1: Bread */}
        <TouchableOpacity style={styles.categoryCard}
          onPress={() => navigation.navigate('SpecificCategories', { category: 'bread-cereals' })}>
          <Image
            source={{ uri: 'https://www.supermarketperimeter.com/ext/resources/2023/08/21/AdobeStock_198186611.jpg?height=667&t=1692630520&width=1080' }}
            style={styles.categoryImage}
          />
          <View style={styles.categoryTextContainer}>
            <View style={styles.categoryHeader}>
              <Text style={styles.categoryTitle}>Bread</Text>
              <IconButton
                icon="chevron-right"
                size={24}
                color="#2F4F2F"
              />
            </View>
            <Text style={styles.categoryDescription}>
               Compare different bread options based on fiber, whole grains, and added sugars to find the best fit for your diet.
            </Text>
          </View>
        </TouchableOpacity>

        {/* Category 2: Cheese */}
        <TouchableOpacity style={styles.categoryCard}
        onPress={() => navigation.navigate('SpecificCategories', { category: 'cheeses-cream' })}>
          <Image
            source={{ uri: 'https://gilbertsfresh.com.au/wp-content/uploads/2020/10/Cheese-Dairy-PAGE-Gilberts_180920_055-768x512.jpg' }}
            style={styles.categoryImage}
          />
          <View style={styles.categoryTextContainer}>
            <View style={styles.categoryHeader}>
              <Text style={styles.categoryTitle}>Cheese</Text>
              <IconButton
                icon="chevron-right"
                size={24}
                color="#2F4F2F"
              />
            </View>
            <Text style={styles.categoryDescription}>
            Analyze various cheese types based on fat content, protein levels, and additives to make an informed choice.
            </Text>
          </View>
        </TouchableOpacity>
        {/* Category 3: Carbonated Drinks */}
        <TouchableOpacity style={styles.categoryCard}
        onPress={() => navigation.navigate('SpecificCategories', { category: 'beverages-carbonated' })}>
          <Image
            source={{ uri: 'https://c8.alamy.com/comp/DE4DMK/soft-drink-cans-bottles-possible-tax-on-some-sugary-high-sugar-content-DE4DMK.jpg' }}
            style={styles.categoryImage}
          />
          <View style={styles.categoryTextContainer}>
            <View style={styles.categoryHeader}>
              <Text style={styles.categoryTitle}>Carbonated Drinks</Text>
              <IconButton
                icon="chevron-right"
                size={24}
                color="#2F4F2F"
              />
            </View>
            <Text style={styles.categoryDescription}>
              Discover and compare the sugar and calorie content of various carbonated drinks to make healthier beverage choices!
            </Text>
          </View>
        </TouchableOpacity>
                {/* Category 4: Coffee Drinks */}
                <TouchableOpacity style={styles.categoryCard}
                onPress={() => navigation.navigate('SpecificCategories', { category: ['beverages-coffee', 'coffee-coffees' , 'beverages-coffees']})}>
          <Image
            source={{ uri: 'https://c8.alamy.com/comp/2C9J59C/coffee-packings-in-a-supermarket-2C9J59C.jpg' }}
            style={styles.categoryImage}
          />
          <View style={styles.categoryTextContainer}>
            <View style={styles.categoryHeader}>
              <Text style={styles.categoryTitle}>Coffees</Text>
              <IconButton
                icon="chevron-right"
                size={24}
                color="#2F4F2F"
              />
            </View>
            <Text style={styles.categoryDescription}>
              Find the best coffee options by comparing caffeine levels, sugar content, and added flavors.
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
      <BottomNavBar/>
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
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
