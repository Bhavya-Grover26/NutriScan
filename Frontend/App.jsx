import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './Screens/LoginScreen';
import SignupScreen from './Screens/SignupScreen';
import Onboarding1 from './Screens/Onboarding1';  
import Onboarding2 from './Screens/Onboarding2'; 
import Onboarding3 from './Screens/Onboarding3'; 
import Onboarding4 from './Screens/Onboarding4'; 
import HomeScreen from './Screens/HomeScreen';
import CompareProduct from './Screens/CompareProduct';
import BottomNavBar from './Screens/BottomNavBar';
import Categories from './Screens/Categories';
import SpecificCategories from './Screens/SpecificCategories';
import Scanner from './Screens/Camera';
import BarcodeScan1 from './Screens/BarcodeScan1';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Onboard1"
          component={Onboarding1}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Onboard2"
          component={Onboarding2}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="Onboard3"
          component={Onboarding3}
          options={{ headerShown: false }}
        /> 
        <Stack.Screen
          name="Onboard4"
          component={Onboarding4}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        /> 
        <Stack.Screen
          name="Signup"
          component={SignupScreen}
          options={{ headerShown: false }}
        />  
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />  
        <Stack.Screen
          name="Compare"
          component={CompareProduct}
          options={{ headerShown: false }}
        />  
        <Stack.Screen
          name="Bottombar"
          component={BottomNavBar}
          options={{ headerShown: false }}
        />  
        <Stack.Screen
          name="Categories"
          component={Categories}
          options={{ headerShown: false }}
        />  
        <Stack.Screen
          name="SpecificCategories"
          component={SpecificCategories}
          options={{ headerShown: false }}
        />  
        <Stack.Screen
          name="Scanner"
          component={Scanner}
          options={{ headerShown: false }}
        />  
        <Stack.Screen
          name="BarcodeScan1"
          component={BarcodeScan1}
          options={{ headerShown: false }}
        />  
      </Stack.Navigator>
    </NavigationContainer>
  );
}
