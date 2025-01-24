import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
} from "react-native";

export default function Onboarding3({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      {/* Background Image */}
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: "https://www.cosmeticsdesign-europe.com/resizer/v2/6YWLWD2WFNJB3ENOU53E2B4JPU.jpg?auth=f35fedd1bac2b89cae25faff3eed6c026dc90f3080857e73a38a121a982b3b40&width=683&height=512&smart=true",
          }}
          style={styles.image}
        />
        <TouchableOpacity
          style={styles.skipButton}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.contentContainer}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>🤔</Text>
        </View>
        <Text style={styles.title}>Compare and Decide Smarter</Text>
        <Text style={styles.description}>
        Effortlessly compare products side-by-side to find the best fit for your health goals and dietary preferences, all in one convenient app.
        </Text>

        {/* Progress Indicator */}
        <View style={styles.progressContainer}>
          <View style={styles.progressDot} />
          <View style={styles.progressDot} />
          <View style={[styles.progressDot, styles.activeDot]} />
          <View style={styles.progressDot} />
        </View>

        {/* Next Button */}
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => navigation.navigate("Onboard4")} 
        >
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFBEA",
  },
  imageContainer: {
    flex: 1.2,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  skipButton: {
    position: "absolute",
    top: 20,
    right: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  skipText: {
    color: "#1B623B",
    fontWeight: "bold",
    fontSize: 14,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
  },
  iconContainer: {
    backgroundColor: "#E6F4EA",
    padding: 15,
    borderRadius: 50,
    marginBottom: 15,
  },
  icon: {
    fontSize: 28,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2E7D32",
    textAlign: "center",
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: "#5A5A5A",
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 20,
  },
  progressContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  progressDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#E0E0E0",
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: "#1B623B",
  },
  nextButton: {
    backgroundColor: "#1B623B",
    padding: 15,
    borderRadius: 8,
    width: "60%",
    alignItems: "center",
  },
  nextButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
