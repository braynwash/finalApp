import { StyleSheet, Image } from "react-native";
import { Button } from "react-native-paper";
import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { Link, router } from 'expo-router';
import { signOut, getAuth } from "firebase/auth";
import { useNavigation } from "expo-router";

export default function profile() {
  const auth = getAuth();
  const navigation = useNavigation();

  const signUserOut = async () => {
    try {
      await signOut(auth).then(() => {
        // when a user signs out what do we want to do
        console.log("user signed out");
        navigation.replace("index");
      });
    } catch (error) {
      console.log("error signing out: ", error);
    }
  };

    return (
      <View style={styles.container}>
      
        <View style={styles.textContain}>
          <Text style={styles.text}>You are currently logged in.</Text>
        
          <Button style={styles.button} mode="contained" onPress={signUserOut}>
          <Text style={styles.white}>Sign out</Text>
        </Button>
          
  </View>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#FFF",
    },
    title: {
      fontSize: 25,
      fontWeight: "bold",
      color: "#FFF"
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: "80%",
    },
    button: {
      marginBottom: 15,
      backgroundColor: "#FB2943",
      marginTop: 20
    },
    textContain: {
      width: "80%",
      marginBottom: 20,
      marginTop: 15,
    },
    white: {
      color: "#FFF"
    },
    text: {
      textAlign: "center",    
      fontSize: 20,
      marginBottom: 20,
      color: "#FB2943"
    },
    subtext: {
      marginTop: 10,
      textAlign: "center",
      fontSize: 16,
    },
    image: {
      height: "30%",
      width: "60%"
    }
  });