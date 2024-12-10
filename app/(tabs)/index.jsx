import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
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
      <Text style={styles.title}>Tab One</Text>
      <View>
        <Text>In order to sign out press the button below.</Text>
        <Button mode="contained" onPress={signUserOut}>
          Sign out
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
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  button: {
    marginBottom: 15,
  }
});
