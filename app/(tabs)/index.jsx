import { StyleSheet, Image } from "react-native";
import { Button } from "react-native-paper";
import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { Link, router } from 'expo-router';
import { signOut, getAuth } from "firebase/auth";
import { useNavigation } from "expo-router";

export default function TabOneScreen() {
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
      <Image style={styles.image} source={require("../../assets/images/list.png")}/>
      <Text style={styles.title}>BERRY-GOOD LISTS</Text>
      <View style={styles.textContain}>
        <Text style={styles.text}>We're here to help you make lists that are the <Text style={styles.white}>berry</Text> best.</Text>
        <Text style={styles.subtext}>Get started with your own list at our To-Do page.</Text>
      
        
        <Button style={styles.button} mode="contained" onPress={() => router.push("list")}>
          <Text style={styles.red}>Create a To-do List</Text>
        </Button>
        <Text style={styles.subtext}>Looking to sign out?</Text>
        <Button style={styles.button} mode="contained" onPress={signUserOut}>
          <Text style={styles.red}>Sign out</Text>
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
    backgroundColor: "#FB2943",
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
    backgroundColor: "#FFF",
    marginTop: 20
  },
  red: {
    color: "#FB2943"
  },
  white: {
    color: "#FFF"
  },
  textContain: {
    width: "90%",
    backgroundColor: "#FB2943",
    marginBottom: 20,
    marginTop: 15,
  },
  text: {
    textAlign: "center",    
    fontSize: 20,
    marginBottom: 20,
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
