import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import BottomNavBar from './BottomNavBar';

export default function HomeScreen({ navigation }) {
  console.log('HomeScreen Loaded');

  const handleScanBarcode = () => {
    console.log("Scan Barcode button clicked");
  };

  const handleCompareProduct = () => {
    console.log("Compare Product button clicked");
    navigation.navigate('Compare');  
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>
      <View style={styles.buttonContainer}>
        <Button title="Scan Barcode" onPress={handleScanBarcode} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Compare Product" onPress={handleCompareProduct} />
      </View>
      <View style={{ height: 60, width: '100%' }}>
        <BottomNavBar />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 28,
    color: 'red',
    marginBottom: 20,
  },
  buttonContainer: {
    width: '80%',
    marginVertical: 10,
  },
});
