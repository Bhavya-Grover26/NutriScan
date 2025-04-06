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

export default function SplashScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    source={require("../Assets/nutriscan_splash.png")} 
                    style={styles.image}
                />
            </View>
            <TouchableOpacity
                style={styles.welcomeButton}
                onPress={() => navigation.navigate("Onboard1")}
            >
                <Text style={styles.welcomeText}>Welcome</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#204129",
        justifyContent: "center",
        alignItems: "center",
    },
    imageContainer: {
        flex: 4,
        justifyContent: "flex-end", 
        alignItems: "center",
        paddingBottom: 30, 
    },
    image: {
        width: width * 0.9,
        height: height * 0.6,
        resizeMode: "contain",
    },
    welcomeButton: {
        backgroundColor: "#f2ebcb",
        padding: 17,
        borderRadius: 8,
        width: "60%",
        alignItems: "center",
        marginBottom: 90,
    },
    welcomeText: {
        color: "#204129",
        fontSize: 20,
        fontWeight: "bold",
    },
});
