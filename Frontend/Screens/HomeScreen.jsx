import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

function HomeScreen() {
  console.log('HomeScreen Loaded');
  
  const handleScanBarcode = () => {
    console.log("Scan Barcode button clicked");
  };

  const handleCompareProduct = () => {
    console.log("Compare Product button clicked");
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
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

export default HomeScreen;
