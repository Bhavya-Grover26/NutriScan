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

export default function LoginScreen({ navigation }) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleLogin = async () => {
    if (!name || !password) {
      Alert.alert("Error", "Please enter both name and password.");
      return;
    }
  
    try {
      const response = await fetch("http://192.168.0.112:5001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          password: password,
        }),
      });
  
      // Check if the response is valid JSON
      const text = await response.text();  // Read the raw response
  
      try {
        const data = JSON.parse(text);  // Try to parse as JSON
        
        if (data.status === "ok") {
          Alert.alert("Success", "You are logged in!");
          navigation.navigate("Home");
        } else {
          Alert.alert("Error", data.message || "Invalid credentials");
        }
      } catch (parseError) {
        Alert.alert("Error", "Invalid response from server");
        console.error("Response was not JSON:", text);
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred while logging in.");
      console.error("Login error:", error);
    }
  };
  

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Log In</Text>
      <View style={styles.whiteCard}>
        <Text style={styles.welcometitle}>Welcome</Text>
        <Text style={styles.welcomeText}>
          Log in to access personalized nutritional insights, allergen alerts,
          and smart product comparisons. Let’s help you make healthier and safer
          food choices effortlessly!
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            placeholderTextColor="#6C757D"
            value={name}
            onChangeText={setName}
          />
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.inputPassword}
              placeholder="Password"
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

        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Forgot Password</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Log In</Text>
        </TouchableOpacity>

        <Text style={styles.orText}>or sign up with</Text>
        <View style={styles.socialButtons}>
          <TouchableOpacity style={styles.socialButton}>
            <Ionicons name="logo-google" size={24} color="#4CAF50" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Ionicons name="logo-facebook" size={24} color="#4CAF50" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Ionicons name="finger-print" size={24} color="#4CAF50" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text style={styles.signupText}>
            Don’t have an account? <Text style={styles.signupLink}>Sign Up</Text>
          </Text>
        </TouchableOpacity>
      </View>

      {/* Green curved rectangle */}
      <View style={styles.greenRectangle}></View>
    </SafeAreaView>
  );
}

const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
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
  welcomeText: {
    fontSize: 14,
    color: "#5A5A5A",
    textAlign: "left",
    marginBottom: 30,
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
  forgotPassword: {
    textAlign: "right",
    color: "#1B623B",
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: "#1B623B",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  loginButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  orText: {
    textAlign: "center",
    marginBottom: 10,
    color: "#6C757D",
  },
  socialButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  socialButton: {
    backgroundColor: "#FFF4C4",
    padding: 13,
    borderRadius: 50,
  },
  signupText: {
    textAlign: "center",
    color: "black",
  },
  signupLink: {
    color: "#1B623B",
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
