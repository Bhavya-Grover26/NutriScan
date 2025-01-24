import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
} from "react-native";

import Ionicons from "react-native-vector-icons/Ionicons";

export default function SignupScreen({ navigation }) {
  const [passwordVisible, setPasswordVisible] = React.useState(false);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Text style={styles.title}>New Account</Text>

      {/* White Card */}
      <View style={styles.whiteCard}>
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Full Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your full name"
            placeholderTextColor="#6C757D"
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

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            keyboardType="email-address"
            placeholderTextColor="#6C757D"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Mobile Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your mobile number"
            keyboardType="phone-pad"
            placeholderTextColor="#6C757D"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Date of Birth</Text>
          <TextInput
            style={styles.input}
            placeholder="DD / MM / YYYY"
            placeholderTextColor="#6C757D"
          />
        </View>

        <Text style={styles.agreementText}>
          By continuing, you agree to Terms of Use and Privacy Policy.
        </Text>

        <TouchableOpacity style={styles.signupButton}>
          <Text style={styles.signupButtonText}>Sign Up</Text>
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

        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.loginText}>
            Already have an account? <Text style={styles.loginLink}>Log In</Text>
          </Text>
        </TouchableOpacity>
      </View>

      {/* Green Curved Rectangle */}
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
  inputGroup: {
    marginBottom: 10,
  },
  inputLabel: {
    fontSize: 14,
    color: "#000",
    marginBottom: 5,
  },
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
  agreementText: {
    fontSize: 12,
    color: "#6C757D",
    textAlign: "center",
    marginBottom: 7,
  },
  signupButton: {
    backgroundColor: "#1B623B",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 7,
  },
  signupButtonText: {
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
    padding: 8,
    borderRadius: 50,
  },
  loginText: {
    textAlign: "center",
    color: "#6C757D",
  },
  loginLink: {
    color: "#1B623B",
    fontWeight: "bold",
  },
  greenRectangle: {
    position: "absolute",
    bottom: 0,
    width: width,
    height: height * 0.02,
    backgroundColor: "#1B623B",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
});
