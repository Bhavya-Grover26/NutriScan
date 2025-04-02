import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  Dimensions,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function UpdateUserScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleUpdate = async () => {
    if (!name || !email || !password) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch("http://192.168.1.10:5001/update-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
        }),
      });

      const data = await response.json();
      if (data.status === "ok") {
        Alert.alert("Success", "User details updated successfully!");
        navigation.navigate("Home");
      } else {
        Alert.alert("Error", data.message || "Update failed");
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred while updating.");
      console.error("Update error:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Update Details</Text>
      <View style={styles.whiteCard}>
        <Text style={styles.welcometitle}>Edit Profile</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            placeholderTextColor="#6C757D"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#6C757D"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.inputPassword}
              placeholder="New Password"
              secureTextEntry={!passwordVisible}
              placeholderTextColor="#6C757D"
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
              <Ionicons name={passwordVisible ? "eye" : "eye-off"} size={20} color="#6C757D" />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
          <Text style={styles.updateButtonText}>Update</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.greenRectangle}></View>
    </SafeAreaView>
  );
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFBEA",
  },
  whiteCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    marginTop: 75,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    marginTop: 40,
    fontWeight: "bold",
    color: "#2E7D32",
    textAlign: "center",
  },
  welcometitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    textAlign: "left",
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#FFF4C4",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    fontSize: 16,
    color: "#000",
  },
  inputPassword: {
    flex: 1,
    backgroundColor: "#FFF4C4",
    padding: 12,
    fontSize: 16,
    color: "#000",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF4C4",
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  updateButton: {
    backgroundColor: "#1B623B",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  updateButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  greenRectangle: {
    position: "absolute",
    bottom: 0,
    width: width,
    height: height * 0.07,
    backgroundColor: "#1B623B",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
});
