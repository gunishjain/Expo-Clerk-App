import React, { useState } from "react";
import { View, ScrollView, TextInput, TouchableOpacity , Alert} from "react-native";
import { Button, CheckBox } from "@rneui/themed";
import { useRouter } from "expo-router";
import { Text } from "react-native";
import DatePickerField from "../components/DatePicker";
import styles from "./styles/personalDetailsStyles";
import countries from "../utils/countryCodes";
import {genderOptions ,  professionOptions } from "../utils/util"
import { useSignUp } from "@clerk/clerk-expo";
import SelectDropdown from 'react-native-select-dropdown'
import { Ionicons } from '@expo/vector-icons';
import { useForm, Controller } from "react-hook-form";
import axios from 'axios';


const PersonalDetails = () => {
  const router = useRouter();
  const { control, handleSubmit, formState: { errors }, setValue, watch } = useForm({
    defaultValues: {
      email: "",
      phone: "",
      password: "",
      firstName: "",
      lastName: "",
      gender: "",
      zipcode: "",
      dob: "",
      profession: "",
      termsAccepted: false,
      countryCode: "+91",
    }
  });

  const { isLoaded, signUp, setActive } = useSignUp();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);


  const API_USERNAME = 'Xcelotp';
  const API_PASSWORD = '!P3Bg*1s';
  const API_BASE_URL = 'https://sms6.rmlconnect.net';

  const OTP_CONFIG = {
    username: "Xcelotp",
    password: "!P3Bg*1s",
    source: "XLSRVY",
    otplen: "6",
    exptime: "600",
    entityid: "1601100000000017697",
    tempid: "1607100000000233745",
  };

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

  const sendPhoneOTP = async (phoneNumber) => {
    try {


      const messageParts = [
        'Dear User, Your OTP for Token App is ',
        '%m',  // Keep this exactly as %m
        '. This is valid for 10 min, please do not share it with anyone. Team Market-Xcel'
      ];
      
      const messageTemplate = messageParts.map((part, index) => 
        index === 1 ? part : encodeURIComponent(part)
      ).join('');
  
      console.log('Message being sent:', messageTemplate);
      
      const response = await axios.get(`${API_BASE_URL}/OtpApi/otpgenerate`, {
        params: {
          username: API_USERNAME,
          password: API_PASSWORD,
          msisdn: phoneNumber, // Remove '+' from phone number
          msg: messageTemplate,
          source: 'XLSRVY',
          otplen: 6,
          exptime: 600 // 5 minutes expiration
        }
      });

      if (response && response.data) {
        console.log('OTP API Response:', response.data); // For debugging
        
        // Convert response to string if it isn't already
        const responseStr = String(response.data);
        
        // Check if response starts with '1701'
        // This will match successful responses like "1701|MSISDN:MessageID"
        return responseStr.startsWith('1701');
      }
      return false;
    } catch (err) {
      console.error('Error sending phone OTP:', err);
      console.error('Error response:', err.response?.data);
      return false;
    }
  };


  const clerkSubmit = async (data) => {

    if(!isLoaded){
      return;
    }

    setLoading(true);


    try {


      // Prepare full phone number with country code
      const fullPhoneNumber = data.phone;

      // First, try to send phone OTP
      const isPhoneOTPSent = await handleOtpSend(fullPhoneNumber);

      if (!isPhoneOTPSent) {
        Alert.alert('OTP Error', 'Failed to send phone OTP. Please try again.');
        setLoading(false);
        return;
      }



      // Start the sign up process
      const signUpAttempt = await signUp.create({
        emailAddress: data.email,
        password: data.password
      });

      // Send email verification code
      await signUpAttempt.prepareEmailAddressVerification({ strategy: "email_code" });

          // Navigate to verification page
          router.push({
            pathname: "verify",
            params: { 
              email: data.email,
              phone: `${data.countryCode}${data.phone}` // Including country code with phone
            }
          });
        } catch (err) {
          console.error("Error during sign up:", err.message);
          Alert.alert('Registration Error', err.message);
        } finally {
          setLoading(false);
        }
      };



  


  return (
    <ScrollView style={styles.container}>
      <View style={styles.formContainer}>
        <Controller
          control={control}
          name="email"
          rules={{
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address"
            }
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder="Email"
              value={value}
              onChangeText={onChange}
              keyboardType="email-address"
              autoCapitalize="none"
              style={[styles.inputTextField, errors.email && styles.errorInput]}
            />
          )}
        />
        {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}

        <View style={styles.phoneContainer}>
          <Controller
            control={control}
            name="countryCode"
            rules={{ required: "Country code is required" }}
            render={({ field: { onChange, value } }) => (
              <SelectDropdown
                data={countries}
                onSelect={(selectedItem) => {
                  onChange(selectedItem.dial_code);
                }}
                renderButton={(selectedItem, isOpen) => (
                  <View style={styles.dropdownCountry}>
                    <Text style={styles.dropdownButtonTxtStyle}>
                      {selectedItem
                        ? `${selectedItem.flag} ${selectedItem.dial_code}`
                        : 'Select'}
                    </Text>
                    <Text style={styles.dropdownButtonArrowStyle}>
                      {isOpen ? '▲' : '▼'}
                    </Text>
                  </View>
                )}
                renderItem={(item, index, isSelected) => (
                  <View style={{
                    ...styles.dropdownItemStyle,
                    ...(isSelected && { backgroundColor: '#D2D9DF' }),
                  }}>
                    <Text style={styles.dropdownItemTxtStyle}>
                      {`${item.flag} ${item.dial_code}`}
                    </Text>
                  </View>
                )}
                showsVerticalScrollIndicator={false}
                dropdownStyle={styles.dropdownMenuStyle}
              />
            )}
          />

          <Controller
            control={control}
            name="phone"
            rules={{
              required: "Phone number is required",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Please enter a valid 10-digit phone number"
              }
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder="Phone Number"
                value={value}
                onChangeText={onChange}
                keyboardType="phone-pad"
                style={[styles.phonenumber, errors.phone && styles.errorInput]}
              />
            )}
          />
        </View>
        {errors.phone && <Text style={styles.errorText}>{errors.phone.message}</Text>}

        <View style={styles.inputContainer}>
          <Controller
            control={control}
            name="password"
            rules={{
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters"
              }
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder="Password"
                value={value}
                onChangeText={onChange}
                secureTextEntry={!isPasswordVisible}
                style={[styles.inputPassField, errors.password && styles.errorInput]}
              />
            )}
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

        <View style={styles.flRow}>
          <Controller
            control={control}
            name="firstName"
            rules={{ required: "First name is required" }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder="First Name"
                value={value}
                onChangeText={onChange}
                style={[styles.firstName, errors.firstName && styles.errorInput]}
              />
            )}
          />
          <Controller
            control={control}
            name="lastName"
            rules={{ required: "Last name is required" }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder="Last Name"
                value={value}
                onChangeText={onChange}
                style={[styles.lastName, errors.lastName && styles.errorInput]}
              />
            )}
          />
        </View>
        {errors.firstName && <Text style={styles.errorText}>{errors.firstName.message}</Text>}
        {errors.lastName && <Text style={styles.errorText}>{errors.lastName.message}</Text>}

        <View style={styles.flRow}>
          <Controller
            control={control}
            name="gender"
            rules={{ required: "Gender is required" }}
            render={({ field: { onChange, value } }) => (
              <SelectDropdown
                data={genderOptions}
                onSelect={(selectedItem) => onChange(selectedItem.value)}
                renderButton={(selectedItem, isOpen) => (
                  <View style={styles.genderPicker}>
                    <Text style={styles.dropdownButtonTxtStyle}>
                      {selectedItem ? selectedItem.label : 'Select Gender'}
                    </Text>
                    <Text style={styles.dropdownButtonArrowStyle}>
                      {isOpen ? '▲' : '▼'}
                    </Text>
                  </View>
                )}
                renderItem={(item, index, isSelected) => (
                  <View style={{
                    ...styles.dropdownItemStyle,
                    ...(isSelected && { backgroundColor: '#D2D9DF' }),
                  }}>
                    <Text style={styles.dropdownItemTxtStyle}>
                      {item.label}
                    </Text>
                  </View>
                )}
                showsVerticalScrollIndicator={false}
                dropdownStyle={styles.dropdownMenuStyle}
              />
            )}
          />

          <Controller
            control={control}
            name="zipcode"
            rules={{
              required: "Zipcode is required",
              pattern: {
                value: /^[0-9]{6}$/,
                message: "Please enter a valid 6-digit zipcode"
              }
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder="Zipcode"
                value={value}
                onChangeText={onChange}
                keyboardType="numeric"
                style={[styles.lastName, errors.zipcode && styles.errorInput]}
              />
            )}
          />
        </View>
        {errors.gender && <Text style={styles.errorText}>{errors.gender.message}</Text>}
        {errors.zipcode && <Text style={styles.errorText}>{errors.zipcode.message}</Text>}

        <Controller
          control={control}
          name="dob"
          rules={{ 
            required: "Date of birth is required",
            validate: (value) => {
              // Parse the date string (DD/MM/YYYY format)
              const [day, month, year] = value.split('/');
              const dob = new Date(year, month - 1, day);
              
              // Calculate age
              const today = new Date();
              let age = today.getFullYear() - dob.getFullYear();
              const monthDiff = today.getMonth() - dob.getMonth();
              
              if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
                age--;
              }
              
              return age >= 18 || "You must be 18 or older to register";
            }
          }}
          render={({ field: { onChange } }) => (
            <DatePickerField
              label="Date of Birth (DD/MM/YYYY)"
              onDateChange={(date) => {
                const dateObj = new Date(date);
                const day = String(dateObj.getDate()).padStart(2, '0');
                const month = String(dateObj.getMonth() + 1).padStart(2, '0');
                const year = dateObj.getFullYear();
                const formattedDate = `${day}/${month}/${year}`; 
                onChange(formattedDate);
              }}
              style={{
                container: { marginBottom: 20 },
                text: { color: 'black' },
              }}
              mode="date"
            />
          )}
        />
        {errors.dob && <Text style={styles.errorText}>{errors.dob.message}</Text>}

        <Controller
          control={control}
          name="profession"
          rules={{ required: "Profession is required" }}
          render={({ field: { onChange, value } }) => (
            <SelectDropdown
              data={professionOptions}
              onSelect={(selectedItem) => onChange(selectedItem.value)}
              renderButton={(selectedItem, isOpen) => (
                <View style={styles.genderPicker}>
                  <Text style={styles.dropdownButtonTxtStyle}>
                    {selectedItem ? selectedItem.label : 'Select Profession'}
                  </Text>
                  <Text style={styles.dropdownButtonArrowStyle}>
                    {isOpen ? '▲' : '▼'}
                  </Text>
                </View>
              )}
              renderItem={(item, index, isSelected) => (
                <View style={{
                  ...styles.dropdownItemStyle,
                  ...(isSelected && { backgroundColor: '#D2D9DF' }),
                }}>
                  <Text style={styles.dropdownItemTxtStyle}>
                    {item.label}
                  </Text>
                </View>
              )}
              showsVerticalScrollIndicator={false}
              dropdownStyle={styles.dropdownMenuStyle}
            />
          )}
        />
        {errors.profession && <Text style={styles.errorText}>{errors.profession.message}</Text>}

        <View style={styles.toc}>
          <Controller
            control={control}
            name="termsAccepted"
            rules={{ required: "You must accept the terms and conditions" }}
            render={({ field: { onChange, value } }) => (
              <CheckBox
                title={
                  <Text style={styles.checkboxText}>
                    By checking this box, you are confirming that you have read and
                    agree to our <Text style={styles.linkText}>Terms of Use</Text>,{" "}
                    <Text style={styles.linkText}>Privacy Policy</Text>
                  </Text>
                }
                checked={value}
                onPress={() => onChange(!value)}
              />
            )}
          />
        </View>
        {errors.termsAccepted && <Text style={styles.errorText}>{errors.termsAccepted.message}</Text>}

        <Button
          title="Register"
          onPress={handleSubmit((data) => {
            if (!data.termsAccepted) {
              Alert.alert('Error', 'Please accept the terms and conditions to continue');
              return;
            }
            console.log('Form Data:', data);
            clerkSubmit(data);
          })}
          containerStyle={styles.buttonContainer}
          buttonStyle={styles.button}
          loading={loading}
          disabled={loading}
        />
      </View>
    </ScrollView>
  );
};

export default PersonalDetails;
