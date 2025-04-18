import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, ActivityIndicator } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { useNavigation } from '@react-navigation/native';
import BottomNavBar from './BottomNavBar';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const screenWidth = Dimensions.get("window").width;

const nutrientLevelMap = {
  low: 0,
  moderate: 1,
  high: 2,
};

const nutrientKeys = ["fat", "saturated-fat", "sugars", "salt"];

const nutrientLabels = {
  "fat": "Fat",
  "saturated-fat": "Saturated Fat",
  "sugars": "Sugars",
  "salt": "Salt"
};

const ProductHistory = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const fetchScannedData = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      if (!token) {
        console.warn("No token found.");
        setLoading(false);
        return;
      }

      const response = await axios.get("https://nutriscan-production.up.railway.app/history", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Raw /history response:", response.data);

      const formatted = response.data.map(entry => {
        const tags = [entry.tag1, entry.tag2, entry.tag3, entry.tag4].filter(Boolean);
        return {
          scanned_product_id: entry.scanned_product_id,
          nutrient_levels_tags: tags,
        };
      });

      setData(formatted);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchScannedData();
  }, []);

  const getAggregatedData = () => {
    const aggregated = {
      "fat": [0, 0, 0], // low, moderate, high
      "saturated-fat": [0, 0, 0],
      "sugars": [0, 0, 0],
      "salt": [0, 0, 0]
    };

    data.forEach(product => {
      product.nutrient_levels_tags.forEach(tag => {
        const cleaned = tag.replace('en:', '');
        const match = cleaned.match(/^(.+?)-in-(low|moderate|high)-quantity$/);
        if (!match) return;

        const nutrient = match[1];
        const level = match[2];

        if (nutrientKeys.includes(nutrient)) {
          const index = nutrientLevelMap[level.toLowerCase()];
          aggregated[nutrient][index]++;
        }
      });
    });

    return aggregated;
  };

  const aggregatedData = getAggregatedData();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Your Nutrient Intake Summary</Text>
      </View>
      <View style={styles.productCountContainer}>
  <Text style={styles.productCountText}>
    Total Products Saved/ Consumed: {data.length}
  </Text>
  <View style={styles.nutrientInfoContainer}>
  <Text style={styles.nutrientInfoText}>
  Based on your scanned products, this summary highlights how often you're consuming nutrients. It helps you track whether your overall intake is low, moderate, or high — giving you better insight into your dietary habits.
</Text>

  </View>
</View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {loading ? (
          <ActivityIndicator size="large" color="#1B623B" />
        ) : (
          nutrientKeys.map((key, idx) => (
            <View key={idx} style={styles.chartContainer}>
              <Text style={styles.chartTitle}>{nutrientLabels[key]}</Text>
              <BarChart
  data={{
    labels: ['Low', 'Moderate', 'High'],
    datasets: [
      {
        data: aggregatedData[key],
        colors: [
          (opacity = 1) => `rgba(34, 139, 34, ${opacity})`,      // Green for Low
          (opacity = 1) => `rgba(255, 215, 0, ${opacity})`,      // Yellow for Moderate
          (opacity = 1) => `rgba(220, 20, 60, ${opacity})`,      // Red for High
        ],
      },
    ],
  }}
  width={screenWidth - 40}
  height={220}
  fromZero
  segments={3}
  chartConfig={{
    backgroundColor: '#f8f8f8',
    backgroundGradientFrom: '#e6f2e6',
    backgroundGradientTo: '#d0e7d0',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Default text color
    labelColor: () => '#333',
    propsForBackgroundLines: {
      stroke: '#ccc',
    },
  }}
  style={styles.chart}
  verticalLabelRotation={0}
  withCustomBarColorFromData={true}
  flatColor={false}
/>

            </View>
          ))
        )}
      </ScrollView>

      <BottomNavBar style={styles.bottomNav} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1B623B',
    padding: 10,
  },
  headerText: {
    fontSize: 18,
    color: '#FFF',
    marginHorizontal: 10,
    flexShrink: 1
  },
  scrollContent: {
    padding: 10,
    paddingBottom: 80
  },
  chartContainer: {
    marginBottom: 30,
    alignItems: 'center'
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 10,
    color: '#1B623B'
  },
  chart: {
    borderRadius: 16
  },
  noDataText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#888',
    marginTop: 20,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0
  },
  productCountContainer: {
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 5,
  },
  
  productCountText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
    fontWeight: 'bold',
  },
  nutrientInfoContainer: {
    marginTop: 10,
    padding: 12,
    backgroundColor: '#f0f9f4',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#d6eadf',
  },
  
  nutrientInfoText: {
    fontSize: 14,
    color: '#1B623B',
    textAlign: 'center',
    lineHeight: 20,
    fontWeight: '400'
  }
  
  
});

export default ProductHistory;
