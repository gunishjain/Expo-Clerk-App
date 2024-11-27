import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity} from "react-native";
import { Button } from "@rneui/themed";
import { useRouter,useLocalSearchParams } from "expo-router";
import styles from "./styles/verifyStyles";
import { useSignUp } from "@clerk/clerk-expo";
import Spinner from 'react-native-loading-spinner-overlay';




const Verify = () => {
  const { email, phone } = useLocalSearchParams();

  console.log('Email:', email); 
  console.log('Phone:', phone); 


  const router = useRouter();
  const [formData, setFormData] = useState({
    emailOTP: "",
    phoneOTP: "",
  });

  const { isLoaded, signUp, setActive } = useSignUp();
  const [loading, setLoading] = useState(false);

  const resendEmailCode = async () => {
    if (!isLoaded) return;
    
    try {
      setLoading(true);
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      alert("Verification code resent successfully!");
    } catch (err) {
      alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };



  const verifyEmail = async (data) => {

      if(!isLoaded){
        return;
      }

      // setLoading(true);

          try {

            const completSignUp = await signUp.attemptEmailAddressVerification({
               code: data.emailOTP,
            });

            await setActive({ session: completSignUp.createdSessionId });
          } catch (err) {
            alert(err.errors[0].message)
          } finally {
            // setLoading(false);
          }

  }
  



  return (
    <View style={styles.container}>

      <Spinner visible={loading} />
  

      <View style={styles.formContainer}>

      <Text style={styles.message}>
        We’ve sent an OTP to your email (
        <Text style={styles.boldText}>{email}</Text>) and phone (
        <Text style={styles.boldText}>{phone}</Text>). Please enter the OTP below to verify your account.
      </Text>
      <TouchableOpacity onPress={resendEmailCode}>
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
                  onPress={() => verifyEmail(formData)}
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
