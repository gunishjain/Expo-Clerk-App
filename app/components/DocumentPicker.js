import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import * as DocumentPicker from "expo-document-picker";

const DocumentPickerComponent = ({onFileSelect,identifier}) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*'
      });

      if (!result.canceled) {
        const fileInfo = {
          uri: result.assets[0].uri,
          name: result.assets[0].name
        };
        setSelectedFile(fileInfo);
        onFileSelect(fileInfo, identifier);
      }
    } catch (error) {
      console.error("Error picking document:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.dropZone}>
        <TouchableOpacity style={styles.browseButton} onPress={pickDocument}>
          <Text style={styles.browseButtonText}>Browse files</Text>
        </TouchableOpacity>
        {selectedFile && (
          <Text style={styles.fileName}>
            Selected: {selectedFile.name}
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "bold",
  },
  dropZone: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
    alignItems: "center",
  },
  browseButton: {
    backgroundColor: "#f5f5f5",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  browseButtonText: {
    color: "#000",
  },
  fileName: {
    marginTop: 10,
    color: "#555",
  },
  optionalLabel: {
    fontSize: 12,
    color: "#666",
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: "#ccc",
  },
  saveButton: {
    backgroundColor: "#4CAF50",
  },
  buttonText: {
    color: "#fff",
  },
});

export default DocumentPickerComponent;
