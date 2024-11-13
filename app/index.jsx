import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React, { useState, useEffect } from "react";
import { auth } from "../FirebaseConfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { router } from "expo-router";
import { TextInput, Button } from "react-native-paper";

export default function index() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      if (user) router.replace("/(tabs)");
    } catch (error) {
      console.log(error);
      alert("Failed to sign in" + error.message);
    }
  };

  const signUp = async () => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      if (user) router.replace("/(tabs)");
    } catch (error) {
      console.log(error);
      alert("Failed to sign in" + error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>Sign In or Create Account</Text>
      <TextInput
        autoCapitalize="none"
        value={email}
        keyboardType="email-address"
        placeholder="Email Address..."
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        value={password}
        secureTextEntry={true}
        placeholder="Password..."
        onChangeText={(text) => setPassword(text)}
      />
      <Button mode="outlined" onPress={signUp}>
        <Text>Sign Up</Text>
      </Button>
      <Button mode="outlined" onPress={signIn}>
        <Text>Sign In</Text>
      </Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
});
