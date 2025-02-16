import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const CompareProduct = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Back</Text>
      </View>

      {/* Product Comparison Section */}
      <View style={styles.comparisonContainer}>
        {/* Left Product */}
        <View style={styles.productCard}>
          <Image
            source={{ uri: 'https://images.openfoodfacts.org/images/products/489/703/669/1427/front_en.25.400.jpg' }}
            style={styles.productImage}
          />
          <Text style={styles.productName}>Monster Energy Drink 350ml</Text>
          <Text style={styles.productBrand}>Brand: Monster</Text>
        </View>

        <Text style={styles.vsText}>Vs</Text>

        {/* Right Product */}
        <View style={styles.productCard}>
          <Image
            source={{ uri: 'https://images.openfoodfacts.org/images/products/90415470/front_en.11.400.jpg' }}
            style={styles.productImage}
          />
          <Text style={styles.productName}>Red Bull Energy Drink 350ml</Text>
          <Text style={styles.productBrand}>Brand: Red Bull</Text>
        </View>
      </View>

      {/* Score Details Section */}
      <View style={styles.scoreComparisonContainer}>
        <View style={styles.scoreCard}>
          <Text style={styles.scoreLabel}>Rank: 10</Text>
          <Text style={styles.scoreLabel}>Nutrition Score: E</Text>
          <Text style={styles.scoreLabel}>Additives: 5</Text>
        </View>

        <View style={styles.scoreCard}>
          <Text style={styles.scoreLabel}>Rank: 1</Text>
          <Text style={styles.scoreLabel}>Nutrition Score: C</Text>
          <Text style={styles.scoreLabel}>Additives: 3</Text>
        </View>
      </View>

      {/* Nutrition Comparison Section */}
      {/* Nutrient Levels Tags Section */}
      <View style={styles.nutrientLevelsContainer}>
        <Text style={styles.sectionTitle}>Nutrient Levels</Text>

        <View style={styles.nutrientComparisonContainer}>
            {/* Salt Example */}
            <View style={styles.nutrientComparisonCard}>
                <Text style={styles.leftProductDetail}>High</Text>
                <Text style={styles.nutrientName}>Salt</Text>
                <Text style={styles.rightProductDetail}>Medium</Text>
            </View>

            {/* Saturated Fat Example */}
            <View style={styles.nutrientComparisonCard}>
                <Text style={styles.leftProductDetail}>Medium</Text>
                <Text style={styles.nutrientName}>Fat</Text>
                <Text style={styles.rightProductDetail}>Low</Text>
            </View>

            <View style={styles.nutrientComparisonCard}>
                <Text style={styles.leftProductDetail}>Medium</Text>
                <Text style={styles.nutrientName}>Saturated Fat</Text>
                <Text style={styles.rightProductDetail}>Low</Text>
            </View>

            <View style={styles.nutrientComparisonCard}>
                <Text style={styles.leftProductDetail}>Medium</Text>
                <Text style={styles.nutrientName}>Sugar</Text>
                <Text style={styles.rightProductDetail}>Low</Text>
            </View>

        </View>  
     </View>

      
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F9F6EC',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#2B7A0B',
      padding: 10,
    },
    headerText: {
      fontSize: 18,
      color: '#FFF',
      marginHorizontal: 10,
    },
    comparisonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      padding: 20,
      backgroundColor: '#F9F6EC',
      alignItems: 'center',
    },
    productCard: {
      width: '45%',
      alignItems: 'center',
      padding: 10,
      backgroundColor: '#FFF',
      borderRadius: 12,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 1 },
      shadowRadius: 4,
      elevation: 2,
    },
    productImage: {
      width: 120,
      height: 150,
      borderRadius: 10,
      resizeMode: 'contain',
    },
    productName: {
      fontWeight: 'bold',
      marginTop: 5,
      textAlign: 'center',
      fontSize: 16,
      color: '#2B7A0B',
    },
    productBrand: {
      color: '#595959',
      textAlign: 'center',
      fontSize: 14,
    },
    vsText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#333',
      paddingHorizontal: 10,
      alignSelf: 'center',
    },
    scoreComparisonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      padding: 5,
    },
    scoreCard: {
      width: '45%',
      alignItems: 'center',
      padding: 15,
      backgroundColor: '#FFF',
      borderRadius: 12,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 1 },
      shadowRadius: 4,
      elevation: 2,
    },
    scoreLabel: {
      fontWeight: 'bold',
      color: '#000',
      marginBottom: 5,
      textAlign: 'center',
    },
    nutrientLevelsContainer: {
      padding: 20,
    },

    sectionTitle: {
  fontSize: 18,
  fontWeight: 'bold',
  color: '#2B7A0B', // Green color
  textAlign: 'center',
  marginBottom: 10, // Add spacing below the title
},

      nutrientComparisonCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#FFF',
        borderRadius: 12,
        padding: 15,
        marginBottom: 5,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 4,
        elevation: 2,
      },
      
      nutrientName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#black',
        textAlign: 'center',
        flex: 2, // Gives it more space for a centered look
      },
      
      leftProductDetail: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#E74C3C', // Red for left product
        flex: 1,
        textAlign: 'left',
      },
      
      rightProductDetail: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#27AE60', // Green for right product
        flex: 1,
        textAlign: 'right',
      },
      
  });

export default CompareProduct;
