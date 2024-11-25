import React, { useState } from "react";
import { View,ScrollView , TextInput, TouchableOpacity} from "react-native";
import { Button } from "@rneui/themed";
import { useRouter } from "expo-router";
import { Text } from "react-native";
import { styles } from "./styles/professionalDetailsStyles";
import DocumentPickerComponent from '../components/DocumentPicker'



const ProfessionalDetails = () => {
  const router = useRouter();

 

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

      <DocumentPickerComponent/>

      <Text style={styles.message}>
        Upload Your personal ID (Optional)
      </Text>

      <DocumentPickerComponent/>

      <Text style={styles.message}>
      This is an optional step. If you prefer to not upload your personal ID, our representative will reach out to you for verification. 
      </Text>



        <View style={styles.flRow}>

          <Button
            title="Back"
            onPress={() => router.back()}
            containerStyle={styles.buttonContainer}
            buttonStyle={styles.button}
            titleStyle={styles.buttonTitle}
          />

          <Button
            title="Save"
            onPress={() => router.push("login")}
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
