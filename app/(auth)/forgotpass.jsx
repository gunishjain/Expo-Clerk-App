import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text,Alert } from "react-native";
import { Button } from "@rneui/themed";
import { useRouter } from "expo-router";
import { Stack } from 'expo-router';

import styles from "./styles/forgotPassStyle";

import { useSignIn } from '@clerk/clerk-expo';


const ForgotPassword = () =>  {


const [emailAddress, setEmailAddress] = useState('');
const [password, setPassword] = useState('');
const [code, setCode] = useState('');
const [successfulCreation, setSuccessfulCreation] = useState(false);
const { signIn, setActive } = useSignIn();
const router = useRouter();


// Request a passowrd reset code by email
const onRequestReset = async () => {
  try {
    await signIn.create({
      strategy: 'reset_password_email_code',
      identifier: emailAddress,
    });
    setSuccessfulCreation(true);
  } catch (err) {
    alert(err.errors[0].message);
  }
};

// Reset the password with the code and the new password
const onReset = async () => {
  try {
    const result = await signIn.attemptFirstFactor({
      strategy: 'reset_password_email_code',
      code,
      password,
    });
    console.log(result);
    alert('Password reset successfully');

    // Set the user session active, which will log in the user automatically
    await setActive({ session: result.createdSessionId });
  } catch (err) {
    alert(err.errors[0].message);
  }
};

return (
  <View style={styles.container}>

    <View style={styles.formContainer}>

  
    <Stack.Screen options={{ headerBackVisible: !successfulCreation,headerShown: false }} />

    {!successfulCreation && (
      <>
        <TextInput autoCapitalize="none" placeholder="email here" value={emailAddress} onChangeText={setEmailAddress} style={styles.inputTextField} />

        <Button onPress={onRequestReset} 
                title="Send Reset Email" 
                color={'#6c47ff'}  
                containerStyle={styles.buttonContainer}
                buttonStyle={styles.button}>
        </Button>
      </>
    )}
    <TouchableOpacity onPress={() => router.push("/login")}>
          <Text style={styles.forgotPassword}>Login</Text>
        </TouchableOpacity>

    {successfulCreation && (
      <>
        <View>
          <TextInput value={code} placeholder="Code..." style={styles.inputTextField} onChangeText={setCode} />
          <TextInput placeholder="New password" value={password} onChangeText={setPassword} secureTextEntry style={styles.inputTextField} />
        </View>
        <Button onPress={onReset} title="Set new Password" color={'#6c47ff'}></Button>
      </>
    )}

    </View>
  </View>
);
};

  
export default ForgotPassword;
