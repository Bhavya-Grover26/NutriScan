import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Alert,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SignupScreen({ navigation }) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // Email validation using a regular expression
  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Basic phone number validation
  function validatePhone(phone) {
    const phoneRegex = /^[0-9]{10}$/; // Adjust as needed
    return phoneRegex.test(phone);
  }

  async function handleSubmit() {
    if (!name || !email || !password || !phone) {
      Alert.alert("Missing Fields", "All fields are required.");
      return;
    }
  
    if (!validateEmail(email)) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }
  
    if (!validatePhone(phone)) {
      Alert.alert("Invalid Phone Number", "Enter a valid 10-digit phone number.");
      return;
    }
  
    const userData = { name, email, password, phone };
  
    try {
      const response = await fetch("http://192.168.1.10:5001/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
  
      const data = await response.json();
  
      if (response.status === 400) {
        Alert.alert("Error", data.message || "User already exists.");
        return;
      }
  
      if (response.status === 201 && data.token) {
        console.log("🔹 Received Token from Backend:", data.token);
  
        // Store the token
        await AsyncStorage.setItem("authToken", data.token);
        const storedToken = await AsyncStorage.getItem("authToken");
        console.log("✅ Token Stored in AsyncStorage:", storedToken);
  
        Alert.alert("Success", "Registration successful!", [
          {
            text: "OK",
            onPress: () =>
              navigation.navigate("PreferenceAllergen", { user: data }),
          },
        ]);
      } else {
        Alert.alert("Error", "Registration failed.");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      Alert.alert("Error", "An error occurred while registering.");
    }
  }
  

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>New Account</Text>

      <View style={styles.whiteCard}>
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Full Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your full name"
            placeholderTextColor="#6C757D"
            value={name}
            onChangeText={setName}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            keyboardType="email-address"
            placeholderTextColor="#6C757D"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Phone Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Phone number"
            keyboardType="phone-pad"
            placeholderTextColor="#6C757D"
            value={phone}
            onChangeText={setPhone}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.inputPassword}
              placeholder="Enter your password"
              secureTextEntry={!passwordVisible}
              placeholderTextColor="#6C757D"
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              onPress={() => setPasswordVisible(!passwordVisible)}
            >
              <Ionicons
                name={passwordVisible ? "eye" : "eye-off"}
                size={20}
                color="#6C757D"
              />
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.agreementText}>
          By continuing, you agree to Terms of Use and Privacy Policy.
        </Text>

        <TouchableOpacity style={styles.signupButton} onPress={handleSubmit}>
          <Text style={styles.signupButtonText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.loginText}>
            Already have an account?{" "}
            <Text style={styles.loginLink}>Log In</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFBEA" },
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
  inputGroup: { marginBottom: 10 },
  inputLabel: { fontSize: 14, color: "#000", marginBottom: 5 },
  input: {
    backgroundColor: "#FFF4C4",
    padding: 12,
    borderRadius: 8,
    fontSize: 14,
    color: "#000",
  },
  inputPassword: {
    flex: 1,
    backgroundColor: "#FFF4C4",
    padding: 12,
    fontSize: 14,
    color: "#000",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF4C4",
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  agreementText: { fontSize: 12, color: "#6C757D", textAlign: "center", marginBottom: 7 },
  signupButton: { backgroundColor: "#1B623B", padding: 15, borderRadius: 8, alignItems: "center", marginBottom: 7 },
  signupButtonText: { color: "#FFF", fontSize: 16, fontWeight: "bold" },
  loginText: { textAlign: "center", color: "#6C757D" },
  loginLink: { color: "#1B623B", fontWeight: "bold" },
});
