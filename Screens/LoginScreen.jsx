import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Log In</Text>
      <View style={styles.card}>
        <Text style={styles.welcome}>Welcome</Text>
        <Text style={styles.description}>
          Log in to access personalized nutritional insights, allergen alerts, and smart product
          comparisons. Let’s help you make healthier and safer food choices effortlessly!
        </Text>
        <Text style={styles.label}>Email or Mobile Number</Text>
        <TextInput
          style={styles.input}
          placeholder="@gmail.com"
          placeholderTextColor="#9A7F6E"
          value={email}
          onChangeText={setEmail}
        />
        <Text style={styles.label}>Password</Text>
        <View >
          <TextInput
            style={styles.input}
            placeholder="************"
            placeholderTextColor="#9A7F6E"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeIcon}
          >
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.forgotPassword}>
          <Text style={styles.forgotPasswordText}>Forgot Password</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
        <Text style={styles.orText}>or sign up with</Text>
        <View style={styles.socialIcons}>
          <TouchableOpacity>
            <Text>G</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>Fb</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>👆</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <Text style={styles.signUp}>
            Don’t have an account? <Text style={styles.signUpLink}>Sign Up</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8E1',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  heading: {
    fontSize: 32,
    color: '#1A5E20',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    width: '90%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  welcome: {
    fontSize: 24,
    color: '#5D4037',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#5D4037',
    marginBottom: 20,
    lineHeight: 20,
  },
  label: {
    fontSize: 14,
    color: '#5D4037',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#F4E1AF',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginBottom: 15,
    color: '#3E2723',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: '#1B5E20',
    fontSize: 14,
  },
  button: {
    backgroundColor: '#1B5E20',
    borderRadius: 50,
    paddingVertical: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  orText: {
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 14,
    color: '#5D4037',
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  signUp: {
    textAlign: 'center',
    fontSize: 14,
    color: '#5D4037',
  },
  signUpLink: {
    color: '#1B5E20',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
