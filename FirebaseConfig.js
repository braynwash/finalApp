// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC84eLZafNCRstZha-zE4bDCoy8OfAZzrw",
  authDomain: "final-12e85.firebaseapp.com",
  projectId: "final-12e85",
  storageBucket: "final-12e85.firebasestorage.app",
  messagingSenderId: "678077129268",
  appId: "1:678077129268:web:6b4eef6390eff532242061",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let auth;
// Initialize Firebase
if (Platform.OS === "web") {
  // For web, use a different persistence method
  auth = initializeAuth(app);
} else {
  // For mobile, use React Native AsyncStorage
  const app = initializeApp(firebaseConfig);
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
  });
}

export { auth, db };
