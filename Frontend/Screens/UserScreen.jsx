import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "react-native-vector-icons/Ionicons";
import BottomNavBar from "./BottomNavBar";

function UserProfileScreen({ navigation }) {
  const [userData, setUserData] = useState(null);
  const [preferences, setPreferences] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        if (!token) {
          Alert.alert("Error", "User not authenticated.");
          navigation.navigate("Login");
          return;
        }

        // Fetch user details using the stored token
        const userResponse = await fetch("http://192.168.1.10:5001/user-info", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!userResponse.ok) {
          console.error("User fetch error");
          Alert.alert("Error", "Failed to retrieve user details.");
          return;
        }

        const userInfo = await userResponse.json();
        setUserData(userInfo);

        // Retrieve stored preferences from AsyncStorage
        const storedPreferences = await AsyncStorage.getItem("userPreferences");
        if (storedPreferences) {
          setPreferences(JSON.parse(storedPreferences));
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        Alert.alert("Error", "Something went wrong while loading profile.");
      }
    };

    fetchUserData();
  }, []);

  // Logout Function
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("authToken"); // Remove token
      navigation.replace("Login"); // Navigate to Login screen
    } catch (error) {
      console.error("Logout error:", error);
      Alert.alert("Error", "Failed to log out. Please try again.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>User Profile</Text>
      <ScrollView style={styles.whiteCard}>
        {userData ? (
          <>
            <Text style={styles.userInfo}>
              <Ionicons name="person" size={18} color="#2E7D32" />{" "}
              <Text style={styles.boldText}>Name:</Text> {userData.name}
            </Text>
            <Text style={styles.userInfo}>
              <Ionicons name="mail" size={18} color="#2E7D32" />{" "}
              <Text style={styles.boldText}>Email:</Text> {userData.email}
            </Text>
          </>
        ) : (
          <Text style={styles.loadingText}>Loading user details...</Text>
        )}

        {preferences ? (
          <>
            <Text style={styles.sectionTitle}>Preferences</Text>
            <Text style={styles.userInfo}>
              <Ionicons name="alert-circle" size={18} color="#D32F2F" />{" "}
              <Text style={styles.boldText}>Allergens:</Text>{" "}
              {preferences.allergen.length > 0
                ? preferences.allergen.join(", ")
                : "None"}
            </Text>
            <Text style={styles.userInfo}>
              <Ionicons name="leaf" size={18} color="#388E3C" />{" "}
              <Text style={styles.boldText}>Diet:</Text>{" "}
              {preferences.selectedDiets.length > 0
                ? preferences.selectedDiets.join(", ")
                : "No preference"}
            </Text>
            <Text style={styles.userInfo}>
              <Ionicons name="flask" size={18} color="#FF9800" />{" "}
              <Text style={styles.boldText}>Selected Additives:</Text>{" "}
              {preferences.selectedAdditives.length > 0
                ? preferences.selectedAdditives.join(", ")
                : "None"}
            </Text>
            <Text style={styles.userInfo}>
              <Ionicons name="nutrition" size={18} color="#1976D2" />{" "}
              <Text style={styles.boldText}>Ingredients Avoided:</Text>{" "}
              {preferences.selectedIngredients.length > 0
                ? preferences.selectedIngredients.join(", ")
                : "None"}
            </Text>
          </>
        ) : (
          <Text style={styles.loadingText}>Loading preferences...</Text>
        )}
              <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={20} color="white" />
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
      </ScrollView>

      {/* Logout Button */}


      <BottomNavBar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFBEA",
  },
  title: {
    fontSize: 28,
    marginTop: 40,
    fontWeight: "bold",
    color: "#2E7D32",
    textAlign: "center",
  },
  whiteCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    marginTop: 20,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1B623B",
    marginTop: 15,
  },
  userInfo: {
    fontSize: 16,
    color: "#333",
    marginTop: 10,
  },
  boldText: {
    fontWeight: "bold",
    color: "#000",
  },
  loadingText: {
    textAlign: "center",
    color: "#777",
    marginTop: 20,
  },
  logoutButton: {
    backgroundColor: "#D32F2F",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    margin: 20,
  },
  logoutButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
});

export default UserProfileScreen;
