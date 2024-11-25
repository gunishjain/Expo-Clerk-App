import React, { useState } from "react";
import { View , TextInput, TouchableOpacity, Text} from "react-native";
import { Button } from "@rneui/themed";
import { useRouter } from "expo-router";
import { styles } from "./styles/loginStyle";
import { Ionicons } from '@expo/vector-icons'; 

 
const Login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  


  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>

      <Text style={styles.heading}>Login</Text>


        <TextInput
          placeholder="Email"
          value={formData.email}
          onChangeText={(text) => setFormData({ ...formData, email: text })}
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.inputTextField}
        />

            <View style={styles.inputContainer}>
                  <TextInput
                    placeholder="Password"
                    value={formData.password}
                    onChangeText={(text) => setFormData({ ...formData, password: text })}
                    secureTextEntry={!isPasswordVisible}
                    style={styles.inputPassField}
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

                <TouchableOpacity onPress={() => router.push("/forgot-password")}>
                     <Text style={styles.forgotPassword}>Forgot Password?</Text>
                </TouchableOpacity>

        
        <Button
              title="Login"
              onPress={() => router.push("login")}
              containerStyle={styles.buttonContainer}
              buttonStyle={styles.button}
            />

        
      </View>
    </View>
  );
};

export default Login;
