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
      <Text style={styles.header}>Sign In or Create An Account</Text>
      <TextInput
        autoCapitalize="none"
        value={email}
        keyboardType="email-address"
        placeholder="Email Address..."
        onChangeText={(text) => setEmail(text)}
        style={styles.input}
      />
      <TextInput
        value={password}
        secureTextEntry={true}
        placeholder="Password..."
        onChangeText={(text) => setPassword(text)}
        style={styles.input}
      />
      <Button style={styles.button} mode="text" onPress={signUp}>
        <Text style={styles.black}>Sign Up</Text>
      </Button>
      <Button style={styles.button} mode="text" onPress={signIn}>
        <Text style={styles.black}>Sign In</Text>
      </Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFF",
    justifyContent: "center",
  },
  button: {
      padding: 5,
      borderRadius: 50,
      marginTop: 20,
      backgroundColor: "#FB2943",
  },
  input: {
    marginTop: 5,
    marginBottom: 15,
    backgroundColor: "#fee6e9"
  },
  header: {
    color: "#FB2943",
    fontSize: 20,
    textAlign: "center",
    marginBottom: 8,
    fontWeight: "bold",
  },
  black: {
    color: "#000"
  }
});
