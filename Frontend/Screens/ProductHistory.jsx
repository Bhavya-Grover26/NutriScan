import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, ActivityIndicator } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { useNavigation } from '@react-navigation/native';
import BottomNavBar from './BottomNavBar';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const screenWidth = Dimensions.get("window").width;

const nutrientLevelMap = {
  low: 1,
  moderate: 2,
  high: 3,
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

  const getProductChartData = (product) => {
    const productNutrients = {};

    product.nutrient_levels_tags.forEach(tag => {
      const cleaned = tag.replace('en:', '');
      const match = cleaned.match(/^(.+?)-in-(low|moderate|high)-quantity$/);
      if (!match) return;

      const name = match[1];
      const level = match[2];
      const value = nutrientLevelMap[level.toLowerCase()] || 0;

      productNutrients[name] = value;
    });

    const labels = nutrientKeys.map(k => nutrientLabels[k]);
    const values = nutrientKeys.map(k => productNutrients[k] || 0);

    return {
      labels,
      datasets: [{ data: values }]
    };
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Nutrient Levels for Scanned Products</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {loading ? (
          <ActivityIndicator size="large" color="#1B623B" />
        ) : data.length === 0 ? (
          <Text style={styles.noDataText}>No scanned products found.</Text>
        ) : (
          data.map((product, index) => (
            <View key={index} style={styles.chartContainer}>
              <Text style={styles.chartTitle}>{product.scanned_product_id}</Text>
              <BarChart
                data={getProductChartData(product)}
                width={screenWidth - 40}
                height={220}
                fromZero
                segments={3} // Only 3 Y-axis labels (1, 2, 3)
                chartConfig={{
                  backgroundColor: '#f8f8f8',
                  backgroundGradientFrom: '#e6f2e6',
                  backgroundGradientTo: '#d0e7d0',
                  decimalPlaces: 0,
                  color: (opacity = 1) => `rgba(27, 98, 59, ${opacity})`,
                  labelColor: () => '#333',
                  propsForBackgroundLines: {
                    stroke: '#ccc',
                  },
                }}
                verticalLabelRotation={30}
                style={styles.chart}
                yAxisLabel=""
                yLabelsOffset={10}
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
  }
});

export default ProductHistory;
