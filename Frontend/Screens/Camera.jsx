import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Alert, ActivityIndicator, TouchableOpacity, TextInput } from "react-native";
import { Camera, useCameraDevices, useCodeScanner } from "react-native-vision-camera";
import axios from "axios";
import { useNavigation } from '@react-navigation/native';  // Import useNavigation

const Scanner = () => {
    const navigation = useNavigation();
    const [scannedBarcode, setScannedBarcode] = useState(null);
    const [manualBarcode, setManualBarcode] = useState("");
    const [loading, setLoading] = useState(false);
    const [cameraPermission, setCameraPermission] = useState(null);
    const [refresh, setRefresh] = useState(false);

    const devices = useCameraDevices();
    const device = devices.front;

    useEffect(() => {
        (async () => {
            const status = await Camera.getCameraPermissionStatus();
            if (status !== "authorized") {
                const permission = await Camera.requestCameraPermission();
                setCameraPermission(permission);
                if (permission === "authorized") {
                    setRefresh(prev => !prev);
                }
            } else {
                setCameraPermission("authorized");
            }
        })();
    }, []);

    const requestCameraPermission = async () => {
        const permission = await Camera.requestCameraPermission();
        setCameraPermission(permission);
        if (permission !== "authorized") {
            Alert.alert(
                "Camera Permission Denied",
                "Please enable camera access in settings to scan barcodes.",
                [{ text: "OK" }]
            );
        }
    };

    const codeScanner = useCodeScanner({
        codeTypes: ["qr", "ean-13"],
        onCodeScanned: (codes) => {
            if (codes.length > 0 && !scannedBarcode) {
                const barcodeData = codes[0].value;
                setScannedBarcode(barcodeData);
                fetchProductDetails(barcodeData);
            }
        }
    });

    const fetchProductDetails = async (barcode) => {
        setLoading(true);
        try {
            const response = await axios.get(`http://192.168.0.112:5000/scan?barcode=${barcode}`);
            Alert.alert("Product Details", JSON.stringify(response.data, null, 2));
        } catch (error) {
            Alert.alert("Error", "Failed to fetch product details");
        }
        setLoading(false);
    };

    const checkBarcodeInDatabase = async (barcode) => {
      if (!barcode) {
          Alert.alert("Invalid Input", "Please enter a barcode.");
          return;
      }

      setLoading(true);
      try {
          const response = await axios.get(`http://192.168.1.10:5000/check_barcode?barcode=${barcode}`);
          console.log("API Response:", response.data); // Debugging

          if (response.data.exists === true) {
              navigation.navigate("BarcodeScan1", { barcode });
          } else {
              Alert.alert("Not Found", "The scanned barcode does not exist in our database.");
          }
      } catch (error) {
          console.error("API Error:", error.response ? error.response.data : error.message);
          Alert.alert("Error", "Failed to check barcode.");
      }
      setLoading(false);
  };

    if (cameraPermission === null) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <View style={styles.container}>
            {cameraPermission === "authorized" && device ? (
                <Camera
                    style={StyleSheet.absoluteFill}
                    device={device}
                    isActive={true}
                    codeScanner={codeScanner}
                />
            ) : (
                <View style={styles.permissionContainer}>
                    <Text style={styles.permissionText}>Camera permission is required to scan barcodes.</Text>
                    <TouchableOpacity onPress={requestCameraPermission} style={styles.permissionButton}>
                        <Text style={styles.buttonText}>Grant Permission</Text>
                    </TouchableOpacity>
                </View>
            )}
            {loading && <ActivityIndicator size="large" color="#ffffff" style={styles.loader} />}
            {scannedBarcode && <Text style={styles.barcodeText}>Scanned: {scannedBarcode}</Text>}
            <TextInput
                style={styles.input}
                placeholder="Enter barcode manually"
                placeholderTextColor="#ccc"
                value={manualBarcode}
                onChangeText={setManualBarcode}
                keyboardType="numeric"
            />
            <TouchableOpacity onPress={() => checkBarcodeInDatabase(manualBarcode)} style={styles.scanButton}>
                <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
    },
    barcodeText: {
        position: "absolute",
        bottom: 50,
        color: "white",
        fontSize: 20,
        backgroundColor: "rgba(0,0,0,0.5)",
        padding: 10,
        borderRadius: 10,
    },
    loader: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: [{ translateX: -25 }, { translateY: -25 }],
    },
    permissionContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000",
        padding: 20,
    },
    permissionText: {
        color: "white",
        fontSize: 18,
        textAlign: "center",
        marginBottom: 20,
    },
    permissionButton: {
        backgroundColor: "#1E90FF",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    input: {
        width: "80%",
        height: 50,
        backgroundColor: "#222",
        color: "white",
        fontSize: 18,
        textAlign: "center",
        borderRadius: 10,
        marginVertical: 10,
        paddingHorizontal: 10,
    },
    scanButton: {
        backgroundColor: "#1E90FF",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
});

export default Scanner;
