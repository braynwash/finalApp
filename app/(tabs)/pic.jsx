import React, { useState } from "react";
import { View, Button, Image, StyleSheet, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";

const TakePictureScreen = () => {
  const [image, setImage] = useState(null);

  const takePicture = async () => {
    // Request camera permissions
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Camera permission is required to take a picture.");
      return;
    }

    // Launch camera
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true, // Allow cropping
      quality: 1, // Maximum image quality
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const saveToCameraRoll = async () => {
    if (!image) {
      Alert.alert("No Image", "Please take a picture first!");
      return;
    }

    // Request media library permissions
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== "granted") {
      alert("Media library permission is required to save the image.");
      return;
    }

    try {
      await MediaLibrary.saveToLibraryAsync(image);
      Alert.alert("Success", "Image saved to camera roll!");
    } catch (error) {
      Alert.alert("Error", "Failed to save image.");
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Take a Picture" onPress={takePicture} />
      {image && <Image source={{ uri: image }} style={styles.image} />}
      {image && (
        <Button title="Save to Camera Roll" onPress={saveToCameraRoll} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  image: {
    marginTop: 20,
    width: 200,
    height: 200,
    borderRadius: 10,
  },
});

export default TakePictureScreen;
