import { FlatList, StyleSheet, ScrollView } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { Text, View } from "@/components/Themed";
import React, { useState, useEffect } from "react";
import { db } from "@/FirebaseConfig";
import { collection, addDoc, getDocs, onSnapshot, deleteDoc, doc } from "firebase/firestore";

export default function TabTwoScreen() {
  const [userName, setUserName] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "ReactUser"), (snapshot) => {
      const docs = [];
      snapshot.forEach((doc) => {
        docs.push({ id: doc.id, ...doc.data() });
        console.log(doc.id, " => ", doc.data());
      });
      setData(docs);
    });

    // Unsubscribe from the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  const addUser = async () => {
    const userObj = {
      name: userName,
    };

    await addDoc(collection(db, "ReactUser"), userObj)
      .then((docRef) => {
        setUserName("");
        console.log("Document written with ID: ", docRef.id);
      })
      .catch((error) => {
        console.error("Error adding document: ", error.message);
      });
  };

  const showNames = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "ReactUser"));
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ id: doc.id, ...doc.data() });
        console.log(doc.id, " => ", doc.data());
      });
      setData(docs);
    } catch (e) {
      console.error("Error getting documents: ", e.message);
    }
  };

  const deleteUser = async (id) => {
    console.log("Delete button pressed for item ID:", id);
    try {
      await deleteDoc(doc(db, "ReactUser", id));
      console.log("Document deleted successfully");
    } catch (error) {
      console.error("Error deleting document:", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContain}>
        <Text style={styles.title}>Add your name to mailing list</Text>
        <TextInput
          autoCapitalize="none"
          value={userName}
          placeholder="Add Persons Name"
          onChangeText={(text) => setUserName(text)}
          style={styles.input}
        />
        <Button style={styles.button} mode="contained" onPress={addUser}>
          <Text style={styles.red}>Add Person</Text>
        </Button>
        <Button style={styles.button} mode="contained" onPress={showNames}>
          <Text style={styles.red}>Show Names</Text>
        </Button>
      </View>
      {/* Need to add a delete button to delete the name from the list */}
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.inputContain}>
            <Text style={styles.text}>{item.name}</Text>
            <Button style={styles.inputBtn} mode="outlined" onPress={() => deleteUser(item.id)}>
              <Text style={styles.white}>Delete</Text>
            </Button>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FB2943"
  },
  formContain: {
    width: "80%",
    marginTop: "70%",
    backgroundColor: "#FB2943",
  },
  red: {
    color: "#FB2943"
  },
  white: {
    color: "#FFF"
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    color: "#FFF",
    marginBottom: 20
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  button: {
    backgroundColor: "#FFF",
    marginTop: 20
  },
  text: {
    fontSize: 15,
    textAlign: "center",
    color: "#FB2943"
  },
  input: {
    backgroundColor: "#fee6e9"
  },
  inputContain: {
    backgroundColor: "#FFF",
    width: 200,
    marginTop: 25,
    textAlign: "center",
    padding: 15
  },
  inputBtn: {
    marginTop: 10,
    backgroundColor: "#FB2943",
  }
});
