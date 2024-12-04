import React, { useState } from "react";
import { View,ScrollView , TextInput, TouchableOpacity} from "react-native";
import { Button } from "@rneui/themed";
import { useRouter } from "expo-router";
import { Text } from "react-native";
import  styles  from "./styles/professionalDetailsStyles";
import DocumentPickerComponent from '../components/DocumentPicker'



const ProfessionalDetails = () => {
  const router = useRouter();
  const [documents, setDocuments] = useState({
    resume: { file: null, name: '' },
    certificate: { file: null, name: '' }
  });

  const handleFileSelect = (file, identifier) => {
    setDocuments(prev => ({
      ...prev,
      [identifier]: {
        file: file.uri,
        name: file.name
      }
    }));
  };

  const handleSave = () => {
    router.replace("/(public)/dashboard");
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formContainer}>
        <TextInput
          placeholder="Medical License Number"
       
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.inputTextField}
        />



      <Text style={styles.message}>
        Upload Your Medical license/certificate
      </Text>

      <DocumentPickerComponent 
        onFileSelect={handleFileSelect}
        identifier="medical"
      />

      <Text style={styles.message}>
        Upload Your personal ID (Optional)
      </Text>

      <DocumentPickerComponent 
        onFileSelect={handleFileSelect}
        identifier="personal"
      />

      <Text style={styles.message}>
      This is an optional step. If you prefer to not upload your personal ID, our representative will reach out to you for verification. 
      </Text>



        <View style={styles.flRow}>

          {/* <Button
            title="Back"
            onPress={() => router.back()}
            containerStyle={styles.buttonContainer}
            buttonStyle={styles.button}
            titleStyle={styles.buttonTitle}
          /> */}

          <Button
            title="Save"
            onPress={handleSave}
            containerStyle={styles.buttonContainer}
            buttonStyle={styles.button}
            titleStyle={styles.buttonTitle}
          />

        </View>    

        
      </View>
    </ScrollView>
  );
};

export default ProfessionalDetails;
