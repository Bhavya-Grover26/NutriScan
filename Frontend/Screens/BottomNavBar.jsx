import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import { StyleSheet, View, Dimensions } from 'react-native';

const { width, height } = Dimensions.get("window");

const HomeRoute = () => <Text style={styles.routeText}>Home</Text>;
const RecentsRoute = () => <Text style={styles.routeText}>Recents</Text>;
const BarcodeScanRoute = () => <Text style={styles.routeText}>Barcode Scan</Text>;
const CompareRoute = () => <Text style={styles.routeText}>Compare</Text>;
const ChartRoute = () => <Text style={styles.routeText}>Chart</Text>;

const BottomNavBar = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'home', title: 'Home', focusedIcon: 'home' },
    { key: 'recents', title: 'Recents', focusedIcon: 'history' },
    { key: 'barcodeScan', title: 'Scan', focusedIcon: 'barcode-scan' },
    { key: 'compare', title: 'Compare', focusedIcon: 'compare-horizontal' }, // You can change the icon to fit your app
    { key: 'chart', title: 'Chart', focusedIcon: 'chart-bar' },
  ]);

const renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
    recents: RecentsRoute,
    barcodeScan: BarcodeScanRoute,
    compare: CompareRoute,
    chart: ChartRoute,
  });

  return (
    <View style={styles.container}>
      <View style={styles.greenRectangle} />
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
        style={styles.bottomNav}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end', // Ensure BottomNavigation is at the bottom
    position: "absolute",
    bottom: 0,
    width: width,
    height: height * 0.07,
    backgroundColor: "#1B623B", // Your desired green color
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  bottomNav: {
    backgroundColor: "transparent", // Make BottomNavigation background transparent so the green rectangle shows
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
