import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  Image,
  PermissionsAndroid,
  Platform,
} from "react-native";
import { launchCamera } from "react-native-image-picker";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import BottomNavBar from "./BottomNavBar";

const Scanner = () => {
  const navigation = useNavigation();
  const [scannedBarcode, setScannedBarcode] = useState(null);
  const [manualBarcode, setManualBarcode] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);

  const requestCameraPermission = async () => {
    if (Platform.OS === "android") {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: "Camera Permission",
            message: "App needs camera permission",
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else {
      return true;
    }
  };

  const openCamera = async () => {
    const isPermitted = await requestCameraPermission();
    if (!isPermitted && Platform.Version <= 33) {
      Alert.alert(
        "Permission Denied",
        "Camera access is required to scan barcodes."
      );
      return;
    }

    let options = {
      mediaType: "photo",
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      saveToPhotos: false,
    };

    launchCamera(options, async (response) => {
      if (response.didCancel) {
        console.log("User cancelled camera");
        return;
      } else if (response.errorCode) {
        console.error("Camera error: ", response.errorMessage);
        Alert.alert("Error", response.errorMessage);
        return;
      } else if (response.assets && response.assets.length > 0) {
        const { uri } = response.assets[0];
        setImage({ uri });
        await uploadImageToBackend(uri);
      }
    });
  };

  const uploadImageToBackend = async (uri) => {
    const formData = new FormData();
    formData.append("image", {
      uri,
      name: "photo.jpg",
      type: "image/jpeg",
    });

    try {
      setLoading(true);
      const response = await axios.post(
        "https://nutriscan-production-f5ec.up.railway.app/upload_image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const { barcode } = response.data;
      setScannedBarcode(barcode);
      checkBarcodeInDatabase(barcode);
    } catch (error) {
      console.error("Image Upload Error:", error);
      Alert.alert("Error", "Could not detect barcode.");
    } finally {
      setLoading(false);
    }
  };

  const checkBarcodeInDatabase = async (barcode) => {
    if (!barcode) {
      Alert.alert("Invalid Input", "Please enter a barcode.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(
        `https://nutriscan-production-f5ec.up.railway.app/check_barcode?barcode=${barcode}`
      );
      if (response.data.exists === true) {
        navigation.navigate("BarcodeScan1", { barcode });
      } else {
        Alert.alert("Not Found", "The scanned barcode does not exist in our database.");
      }
    } catch (error) {
      console.error("API Error:", error);
      Alert.alert("Error", "Failed to check barcode.");
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={openCamera} style={styles.cameraButton}>
        <Text style={styles.buttonText}>Open Camera</Text>
      </TouchableOpacity>

      {image && (
        <Image
          source={image}
          style={{ width: 300, height: 300, borderRadius: 10, marginTop: 20 }}
        />
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

      <BottomNavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "black",
    paddingTop: 50,
  },
  cameraButton: {
    backgroundColor: "#1B623B",
    paddingVertical: 10,
    paddingHorizontal: 60,
    borderRadius: 10,
  },
  barcodeText: {
    marginTop: 10,
    color: "white",
    fontSize: 20,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 10,
    borderRadius: 10,
  },
  loader: {
    marginTop: 20,
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
    marginVertical: 30,
    paddingHorizontal: 10,
  },
  scanButton: {
    backgroundColor: "#1B623B",
    paddingVertical: 10,
    borderRadius: 10,
    paddingHorizontal: 60,
    marginBottom: 50,
  },
});

export default Scanner;