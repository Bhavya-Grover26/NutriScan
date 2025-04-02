import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import { StyleSheet, View, Dimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const { width, height } = Dimensions.get("window");

const HomeRoute = () => <Text style={styles.routeText}>Home</Text>;
const RecentsRoute = () => <Text style={styles.routeText}>Recents</Text>;
const BarcodeScanRoute = () => <Text style={styles.routeText}>Barcode Scan</Text>;
const ChartRoute = () => <Text style={styles.routeText}>Chart</Text>;
const UserRoute = () => <Text style={styles.routeText}>User</Text>;
const CompareRoute = () => <Text style={styles.routeText}>Compare</Text>;


const BottomNavBar = () => {
  const navigation = useNavigation();
  const route = useRoute(); // Get the current screen
  const [index, setIndex] = React.useState(0);

  const routes = [
    { key: 'home', title: 'Home', focusedIcon: 'home' },
    { key: 'recents', title: 'Recents', focusedIcon: 'history' },
    { key: 'barcodeScan', title: 'Scan', focusedIcon: 'barcode-scan' },
    { key: 'compare', title: 'Compare', focusedIcon: 'compare-horizontal' },
    { key: 'user', title: 'User', focusedIcon: 'account' },
  ];

  const renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
    recents: RecentsRoute,
    barcodeScan: BarcodeScanRoute,
    compare: CompareRoute,
    user: UserRoute, // Add this line
    
  });

  // Detect screen changes and update the active tab accordingly
  React.useEffect(() => {
    if (route.name === 'Home') setIndex(0);
    else if (route.name === 'Recents') setIndex(1);
    else if (route.name === 'Scanner') setIndex(2);
    else if (route.name === 'Categories' || route.name === 'SpecificCategories') setIndex(3);
    else if (route.name === 'PreferenceAdditive'|| route.name === 'PreferenceDiet' || route.name === 'PreferenceAllergen' || route.name === 'PreferenceIngredient' || route.name === 'PreferenceNutrition' ) setIndex(4);
  }, [route.name]);

  const handleTabChange = (newIndex) => {
    setIndex(newIndex); // Update tab index

    switch (routes[newIndex].key) {
      case 'home':
        navigation.navigate('Home');
        break;
      case 'barcodeScan':
        navigation.navigate('Scanner');
        break;
      case 'compare':
        navigation.navigate('Categories');
        break;
      case 'user':
        navigation.navigate('PreferenceAdditive');
        break;
      default:
        break;
    }
  };

  return (
    <View style={styles.container}>
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={handleTabChange}
        renderScene={renderScene}
        barStyle={{ backgroundColor: "#1B623B" }}
        activeColor="white"
        inactiveColor="white"
        shifting={false}
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
    height: height * 0.069,
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
