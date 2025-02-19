import React from 'react';
import { View, Text, TextInput, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';
import CategoryNavbar from './CategoryNavbar';

const SpecificCategories = () => {
  const breadItems = [
    { name: 'The health factory zero maida bun - pack of 2', brand: 'The Health Factory' },
    { name: 'The health factory zero maida protein bread', brand: 'The Health Factory' },
    { name: 'The health factory zero maida bombay pav', brand: 'The Health Factory' },
    { name: 'The health factory zero maida multigrain bread', brand: 'The Health Factory' },
    { name: 'The health factory zero maida whole wheat', brand: 'The Health Factory' },
  ];

  return (
    <View style={styles.container}>
      {/* Fixed Navbar */}
      <View style={styles.navbar}>
        <CategoryNavbar />
      </View>

      {/* Right Side Content */}
      <View style={styles.contentWrapper}>
        {/* Header Section (Independent of Navbar) */}
        <View style={styles.uppercontent}>
        </View>
        <View style={styles.header}>
          <IconButton icon="arrow-left" size={24} onPress={() => {}} />
          <Text style={styles.headerTitle}>Bread</Text>
          <IconButton icon="bell-outline" size={24} onPress={() => {}} />
        </View>

        {/* Search Section */}
        <View style={styles.searchContainer}>
          <TextInput style={styles.searchInput} placeholder="Search..." />
          <IconButton icon="barcode-scan" size={24} onPress={() => {}} />
        </View>
       

        {/* Main Scrollable Content */}
        <View style={styles.maincontent}>
 

          {/* Bread List */}
          <ScrollView style={styles.listContainer}>
            {breadItems.map((item, index) => (
              <View key={index} style={styles.breadItem}>
                <Image style={styles.breadImage} source={{ uri: 'https://images.openfoodfacts.org/images/products/890/606/545/0069/front_en.3.400.jpg' }} />
                <View style={styles.breadInfo}>
                  <Text style={styles.breadTitle}>{item.name}</Text>
                  <Text style={styles.breadBrand}>{item.brand}</Text>
                </View>
                <View style={styles.ratingContainer}>
                  <Text style={styles.ratingText}>100/100</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
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
    height: 120, // Height to cover both the header and search bar
    position: 'absolute', // Ensure it stays in the background
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
  infoBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFEDD5',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  infoImage: {
    width: 40,
    height: 40,
    marginRight: 8,
  },
  infoText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoSubText: {
    fontSize: 14,
    color: '#F7941D',
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
