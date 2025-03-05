import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import { StyleSheet, View, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';  // Import useNavigation

const { width, height } = Dimensions.get("window");

const HomeRoute = () => <Text style={styles.routeText}>Home</Text>;
const RecentsRoute = () => <Text style={styles.routeText}>Recents</Text>;
const BarcodeScanRoute = () => <Text style={styles.routeText}>Barcode Scan</Text>;
const ChartRoute = () => <Text style={styles.routeText}>Chart</Text>;

const BottomNavBar = () => {
  const navigation = useNavigation();  // Access navigation using useNavigation hook
  const [index, setIndex] = React.useState(0);

  const handleCategories = () => {
    console.log("Compare Product button clicked");
    navigation.navigate('Categories');  // Navigate to the "Categories" screen
  };

  const [routes] = React.useState([
    { key: 'home', title: 'Home', focusedIcon: 'home' },
    { key: 'recents', title: 'Recents', focusedIcon: 'history' },
    { key: 'barcodeScan', title: 'Scan', focusedIcon: 'barcode-scan' },
    { key: 'compare', title: 'Compare', focusedIcon: 'compare-horizontal' },
    { key: 'chart', title: 'Chart', focusedIcon: 'chart-bar' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
    recents: RecentsRoute,
    barcodeScan: BarcodeScanRoute,
    chart: ChartRoute,
  });

  const handleTabChange = (newIndex) => {
    if (newIndex === 3) {  // "Compare" tab index
      handleCategories();  // Trigger handleCategories
    } else {
      setIndex(newIndex);  // Set the index for other tabs
    }
  };

  return (
    <View style={styles.container}>
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={handleTabChange}
        renderScene={renderScene}
        barStyle={{ backgroundColor: "#1B623B" }} // Set navbar background color
        activeColor="white" // Active icon color
        inactiveColor="white" // Inactive icon color
        shifting={false} // Keep background consistent
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    position: "absolute",
    bottom: 0,
    width: width,
    height: height * 0.07,
    backgroundColor: "#1B623B",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  routeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1B623B',
    textAlign: 'center',
    padding: 20,
  },
});

export default BottomNavBar;