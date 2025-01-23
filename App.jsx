import React, { useState } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

// Screens
const HomeScreen = ({ navigation }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Home Screen</Text>
    <Button title="Open Drawer" onPress={() => navigation.toggleDrawer()} />
  </View>
);

const ProfileScreen = ({ navigation }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Profile Screen</Text>
    <Button title="Open Drawer" onPress={() => navigation.toggleDrawer()} />
  </View>
);

// Drawer Context
const DrawerContext = React.createContext();

function DrawerProvider({ children }) {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => setDrawerOpen(!isDrawerOpen);

  return (
    <DrawerContext.Provider value={{ isDrawerOpen, toggleDrawer }}>
      {children}
    </DrawerContext.Provider>
  );
}

// Custom Drawer Layout
function AppLayout() {
  const { isDrawerOpen, toggleDrawer } = React.useContext(DrawerContext);
  const [currentScreen, setCurrentScreen] = useState('Home');

  const renderScreen = () => {
    if (currentScreen === 'Home') return <HomeScreen navigation={{ toggleDrawer }} />;
    if (currentScreen === 'Profile') return <ProfileScreen navigation={{ toggleDrawer }} />;
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Main Screen Content */}
      {renderScreen()}

      {/* Custom Drawer */}
      {isDrawerOpen && (
        <View style={styles.drawer}>
          <TouchableOpacity onPress={() => { toggleDrawer(); setCurrentScreen('Home'); }}>
            <Text style={styles.drawerItem}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { toggleDrawer(); setCurrentScreen('Profile'); }}>
            <Text style={styles.drawerItem}>Profile</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

export default function App() {
  return (
    <DrawerProvider>
      <NavigationContainer>
        <AppLayout />
      </NavigationContainer>
    </DrawerProvider>
  );
}

// Styles
const styles = StyleSheet.create({
  drawer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 200,
    height: '100%',
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  drawerItem: {
    fontSize: 18,
    marginVertical: 10,
  },
});