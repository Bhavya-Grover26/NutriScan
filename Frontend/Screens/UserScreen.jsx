import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
  TextInput,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "react-native-vector-icons/Ionicons";
import BottomNavBar from "./BottomNavBar";

function UserProfileScreen({ navigation }) {
  const [userData, setUserData] = useState(null);
  const [preferences, setPreferences] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newEntry, setNewEntry] = useState("");
  const [editKey, setEditKey] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        if (!token) {
          Alert.alert("Error", "User not authenticated.");
          navigation.navigate("Login");
          return;
        }

        const userResponse = await fetch("https://nutriscan-production.up.railway.app/user-info", {
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

  useEffect(() => {
    if (!isEditing && preferences) {
      AsyncStorage.setItem("userPreferences", JSON.stringify(preferences));
    }
  }, [isEditing]);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("authToken");
      navigation.replace("Login");
    } catch (error) {
      console.error("Logout error:", error);
      Alert.alert("Error", "Failed to log out. Please try again.");
    }
  };

  const handleRemove = (key, value) => {
    const updated = preferences[key].filter((item) => item !== value);
    setPreferences({ ...preferences, [key]: updated });
  };

  const handleAdd = () => {
    if (newEntry && editKey) {
      const updated = [...preferences[editKey], newEntry.trim()];
      setPreferences({ ...preferences, [editKey]: updated });
      setNewEntry("");
      setEditKey("");
    }
  };

  const renderEditableSection = (title, key) => (
    <View>
      <Text style={styles.sectionTitle}>{title}</Text>
      {preferences[key].length > 0 ? (
        preferences[key].map((item, index) => (
          <View key={index} style={styles.chip}>
            <Text>{item}</Text>
            {isEditing && (
              <TouchableOpacity onPress={() => handleRemove(key, item)}>
                <Text style={styles.removeIcon}>❌</Text>
              </TouchableOpacity>
            )}
          </View>
        ))
      ) : (
        <Text style={styles.userInfo}>None</Text>
      )}

      {isEditing && (
        <>
          <TouchableOpacity onPress={() => setEditKey(key)}>
            <Text style={styles.addText}>+ Add to {title}</Text>
          </TouchableOpacity>
          {editKey === key && (
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder={`Add new to ${title}`}
                value={newEntry}
                onChangeText={setNewEntry}
              />
              <TouchableOpacity onPress={handleAdd}>
                <Ionicons name="add-circle" size={24} color="#4CAF50" />
              </TouchableOpacity>
            </View>
          )}
        </>
      )}
    </View>
  );

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

        <TouchableOpacity
          onPress={() => setIsEditing(!isEditing)}
          style={[styles.logoutButton, { backgroundColor: isEditing ? "#4CAF50" : "#1B623B" }]}
        >
          <Ionicons name={isEditing ? "checkmark" : "create-outline"} size={20} color="white" />
          <Text style={styles.logoutButtonText}>
            {isEditing ? "Save Changes" : "Edit Preferences"}
          </Text>
        </TouchableOpacity>

        {preferences ? (
          <>
            {renderEditableSection("Allergens", "allergen")}
            {renderEditableSection("Diet", "selectedDiets")}
            {renderEditableSection("Selected Additives", "selectedAdditives")}
            {renderEditableSection("Ingredients Avoided", "selectedIngredients")}
          </>
        ) : (
          <Text style={styles.loadingText}>Loading preferences...</Text>
        )}

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color="white" />
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>

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
  chip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e0f2f1",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 10,
    marginTop: 6,
  },
  removeIcon: {
    marginLeft: 8,
    color: "#D32F2F",
    fontSize: 16,
  },
  addText: {
    color: "#1976D2",
    marginTop: 10,
    fontWeight: "600",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 6,
  },
  input: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    padding: 4,
    marginRight: 10,
  },
});

export default UserProfileScreen;
