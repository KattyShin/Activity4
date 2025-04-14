"use client";

import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";

import * as Updates from "expo-updates";

export default function App() {
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState({ name: "", course: "" });

  async function onFetchUpdateAsync() {
    try {
      const update = await Updates.checkForUpdateAsync();

      if (update.isAvailable) {
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();
      }
    } catch (error) {
      console.error("Error fetching latest Expo update:", error);
      if (error instanceof Error) {
        alert(`Error fetching latest Expo update: ${error.message}`);
      } else {
        alert(
          "An unknown error occurred while fetching the latest Expo update."
        );
      }
    }
  }

  useEffect(() => {
    onFetchUpdateAsync();
  }, []);

  const handleSubmit = () => {
    if (name === "" || course === "") {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
    Alert.alert("Are you sure you want to Submit?", undefined, [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Confirm",
        onPress: () => {
          setSubmittedData({ name, course });
          setSubmitted(true);
          setName("");
          setCourse("");
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Register</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your name"
              value={name}
              onChangeText={setName}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Course</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your course"
              value={course}
              onChangeText={setCourse}
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>

          {submitted && (
            <View style={styles.displayContainer}>
              <Text style={styles.displayTitle}>Submitted Information</Text>
              <View style={styles.displayItem}>
                <Text style={styles.displayLabel}>Your name is </Text>
                <Text style={styles.displayValue}> {submittedData.name} </Text>
                <Text style={styles.displayValue}>{submittedData.name}</Text>
                <Text style={styles.displayLabel}> and you are fom </Text>
                <Text style={styles.displayValue}>{submittedData.course}</Text>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e6f2ff",
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
  },
  formContainer: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#4682B4",
  },
  inputContainer: {
    width: "100%",
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: "#4682B4",
  },
  input: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#b3d9ff",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    width: "100%",
  },
  button: {
    backgroundColor: "#80b3ff", // Medium pastel blue
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 10,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  displayContainer: {
    marginTop: 30,
    padding: 15,
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#b3d9ff",
    width: "100%",
  },
  displayTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#4682B4",
    textAlign: "center",
  },
  displayItem: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",

    marginBottom: 10,
  },
  displayLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4682B4",
  },
  displayValue: {
    fontSize: 16,
    color: "#80b3ff",
  },
});
