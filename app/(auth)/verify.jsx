import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity} from "react-native";
import { Button } from "@rneui/themed";
import { useRouter } from "expo-router";
import { styles } from "./styles/verifyStyles";


const Verify = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    emailOTP: "",
    phoneOTP: "",
  });



  return (
    <View style={styles.container}>

      <View style={styles.formContainer}>

      <Text style={styles.message}>
        We’ve sent an OTP to your email (
        <Text style={styles.boldText}>johndoe@gmail.com</Text>) and phone (
        <Text style={styles.boldText}>+91949529632</Text>). Please enter the OTP below to verify your account.
      </Text>
      <TouchableOpacity>
        <Text style={styles.resendLink}>Didn’t receive the code? Resend</Text>
      </TouchableOpacity>



          <TextInput
            placeholder="Email OTP"
            value={formData.emailOTP}
            onChangeText={(text) => setFormData({ ...formData, emailOTP: text })}
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.inputTextField}
          />

          <TextInput
            placeholder="Phone OTP"
            value={formData.phoneOTP}
            onChangeText={(text) => setFormData({ ...formData, phoneOTP: text })}
            keyboardType="phone-pad"
            style={styles.inputTextField}
          />

          <View style={styles.flRow}>

                <Button
                  title="Back"
                  onPress={() => router.back()}
                  containerStyle={styles.buttonContainer}
                  buttonStyle={styles.button}
                  titleStyle={styles.buttonTitle}
                />

                <Button
                  title="Verify"
                  onPress={() => router.push("professional-details")}
                  containerStyle={styles.buttonContainer}
                  buttonStyle={styles.button}
                  titleStyle={styles.buttonTitle}
                />

        </View>
                          
    </View>
    </View>
  );
};

export default Verify;
