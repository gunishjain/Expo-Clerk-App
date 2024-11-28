import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert} from "react-native";
import { Button } from "@rneui/themed";
import { useRouter,useLocalSearchParams } from "expo-router";
import styles from "./styles/verifyStyles";
import { useSignUp } from "@clerk/clerk-expo";
import Spinner from 'react-native-loading-spinner-overlay';
import axios from "axios";


const Verify = () => {
  const { email, phone } = useLocalSearchParams();

  console.log('Email:', email); 
  console.log('Phone:', phone); 


  const OTP_CONFIG = {
    username: "Xcelotp",
    password: "!P3Bg*1s",
    source: "XLSRVY",
    otplen: "6",
    exptime: "600",
    entityid: "1601100000000017697",
    tempid: "1607100000000233745",
  };

  const VERIFY_CONFIG = {
    username: "Xcelotp",
    password: "!P3Bg*1s",
    
  };


  const router = useRouter();
  const [formData, setFormData] = useState({
    emailOTP: "",
    phoneOTP: "",
  });

  const { isLoaded, signUp, setActive } = useSignUp();
  const [loading, setLoading] = useState(false);

 

  const handleOtpSend = async (phoneNumber) => {
    let messageText =
      "Dear User,Your OTP for Token App is %m. This is valid for 10 min, please do not share it with anyone.Team Market-Xcel";
    if (!phoneNumber) {
      console.error("Phone number is required");
      return false;
    }
   
    const params = {
      ...OTP_CONFIG,
      msisdn: phoneNumber,
      msg: messageText,
    };
   
    const queryString = new URLSearchParams(params).toString();
   
    try {
      const response = await axios.get(`https://sms6.rmlconnect.net/OtpApi/otpgenerate?${queryString}`);
      if (response.status === 200) {
        return true;
      } else {
        console.error("Failed to send OTP");
        return false;
      }
    } catch (error) {
      console.error("Error sending OTP:", error.message || error);
      return false;
    }
  };

//////////////////////////////////////////

const resendBothOTPs = async () => {
  if (!isLoaded) return;
  
  setLoading(true);

  try {
    // Resend Email OTP
    await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
    console.log('Email OTP sent successfully');

    // Resend Phone OTP using existing handleOtpSend function
    const phoneOTPSent = await handleOtpSend(phone.replace('+', ''));

    if (phoneOTPSent) {
      Alert.alert('Success', 'Both email and phone OTPs have been resent successfully.');
      console.log('Both OTPs sent successfully');
    } else {
      Alert.alert('Partial Success', 'Email OTP sent, but there was an issue sending the phone OTP.');
      console.warn('Phone OTP sending failed');
    }
  } catch (err) {
    console.error('Error resending OTPs:', err);
    Alert.alert(
      'Error', 
      'Failed to resend verification codes. Please try again.'
    );
  } finally {
    setLoading(false);
  }
};

const verifyPhoneOTP = async (phoneOTP) => {
  const otpValue = parseInt(phoneOTP, 10);
  
  if (isNaN(otpValue)) {
    console.error('Invalid OTP format');
    return false;
  }

  // Remove +91 from phone number
  const cleanPhoneNumber = phone.replace('+91', '');

  const params = {
    ...VERIFY_CONFIG,
    msisdn: cleanPhoneNumber,
    otp: otpValue,
  };

  const queryString = new URLSearchParams(params).toString();
  const requestUrl = `https://sms6.rmlconnect.net/OtpApi/checkotp?${queryString}`;

  // Log request details
  console.log('OTP Verification Request:', {
    url: requestUrl,
    parameters: params,
    originalPhone: phone,
    cleanedPhone: cleanPhoneNumber
  });

  try {
    const response = await axios.get(requestUrl);
    
    // Log complete response
    console.log('OTP Verification Response:', {
      status: response.status,
      statusText: response.statusText,
      data: response.data,
      headers: response.headers
    });

    if (response.status === 200) {
      const responseData = String(response.data);
      const isValidOTP = responseData.includes('101');
      
      if (isValidOTP) {
        console.log('Phone OTP validated successfully (Response code: 101)');
        return true;
      } else {
        console.error('Phone OTP validation failed. Response:', responseData);
        return false;
      }
    } else {
      console.error("Failed to Validate OTP - Status:", response.status);
      return false;
    }
  } catch (error) {
    console.error("Error verifying OTP:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });
    return false;
  }
};

const verifyBothOTPs = async (data) => {
  if (!isLoaded) {
    return;
  }

  setLoading(true);

  try {
    // First, verify phone OTP
    const isPhoneOTPValid = await verifyPhoneOTP(data.phoneOTP);

    if (!isPhoneOTPValid) {
      Alert.alert('Verification Failed', 'Invalid phone OTP');
      return;
    }

    // Then verify email OTP
    let completedSignUp;
    try {
      completedSignUp = await signUp.attemptEmailAddressVerification({
        code: data.emailOTP,
      });
    } catch (emailErr) {
      Alert.alert('Email Verification Failed', emailErr.errors[0].message);
      return;
    }

    // If both verifications are successful, set active session
    await setActive({ session: completedSignUp.createdSessionId });

    // Navigate to next screen or home
    router.replace('/home');
  } catch (err) {
    Alert.alert('Verification Error', err.message);
  } finally {
    setLoading(false);
  }
};



  



  return (
    <View style={styles.container}>

      <Spinner visible={loading} />
  

      <View style={styles.formContainer}>

      <Text style={styles.message}>
        We’ve sent an OTP to your email (
        <Text style={styles.boldText}>{email}</Text>) and phone (
        <Text style={styles.boldText}>{phone}</Text>). Please enter the OTP below to verify your account.
      </Text>
      <TouchableOpacity onPress={resendBothOTPs}>
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
                  onPress={() => verifyBothOTPs(formData)}
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
