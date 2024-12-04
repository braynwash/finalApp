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
      <View>
        <Text style={styles.title}>Tab Two</Text>
      </View>

      <View>
        <Text style={styles.title}>Add your name to mailing list</Text>
        <TextInput
          autoCapitalize="none"
          value={userName}
          placeholder="Add Persons Name"
          onChangeText={(text) => setUserName(text)}
        />
        <Button mode="contained" onPress={addUser}>
          Add Person
        </Button>
        <Button mode="contained" onPress={showNames}>
          Show Names
        </Button>
      </View>
      {/* Need to add a delete button to delete the name from the list */}
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
            <Button style={styles.btn} mode="outlined" onPress={() => deleteUser(item.id)}>
              Delete
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
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  btn: {
    marginTop: 10,
  },
});
