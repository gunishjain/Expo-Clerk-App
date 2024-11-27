import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text,Alert } from "react-native";
import { Button } from "@rneui/themed";
import { useRouter } from "expo-router";
import styles from "./styles/loginStyle";
import { Ionicons } from '@expo/vector-icons';
import { useForm, Controller } from 'react-hook-form';
import { useSignIn } from '@clerk/clerk-expo';


const Login = () => {
  const router = useRouter();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const { signIn, setActive, isLoaded } = useSignIn();

  
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = async (data) => {
    console.log(data);

        if (!isLoaded) {
          return;
        }
        try {
          const completeSignIn = await signIn.create({
            identifier: data.email,    
            password: data.password   
          });

          // This indicates the user is signed in
          await setActive({ session: completeSignIn.createdSessionId });
        } catch (err) {
          alert(err.errors[0].message);
        } 



    // router.push("login");
  };

  return (
    <View style={styles.container}>        
      <View style={styles.formContainer}>
        <Text style={styles.heading}>Login</Text>

        <Controller
          control={control}
          rules={{
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address'
            }
          }}
          name="email"
          render={({ field: { onChange, value } }) => (
            <>
              <TextInput
                placeholder="Email"
                value={value}
                onChangeText={onChange}
                keyboardType="email-address"
                autoCapitalize="none"
                style={[styles.inputTextField, errors.email && styles.errorInput]}
              />
              {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}
            </>
          )}
        />

        <Controller
          control={control}
          rules={{
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters'
            }
          }}
          name="password"
          render={({ field: { onChange, value } }) => (
            <>
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="Password"
                  value={value}
                  onChangeText={onChange}
                  secureTextEntry={!isPasswordVisible}
                  style={[styles.inputPassField, errors.password && styles.errorInput]}
                />
                <TouchableOpacity
                  onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                  style={styles.iconContainer}
                >
                  <Ionicons
                    name={isPasswordVisible ? 'eye' : 'eye-off'}
                    size={24}
                    color="gray"
                  />
                </TouchableOpacity>
              </View>
              {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}
            </>
          )}
        />

        <TouchableOpacity onPress={() => router.push("/forgot-password")}>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/personal-details")}>
          <Text style={styles.forgotPassword}>Register</Text>
        </TouchableOpacity>

        <Button
          title="Login"
          onPress={handleSubmit(onSubmit)}
          containerStyle={styles.buttonContainer}
          buttonStyle={styles.button}
        />
      </View>
    </View>
  );
};

export default Login;
