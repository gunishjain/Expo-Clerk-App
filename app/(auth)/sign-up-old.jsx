import React, { useState } from "react";
import { View, StyleSheet, Platform, ScrollView } from "react-native";
import { Button, CheckBox } from "@rneui/themed";
import { useRouter } from "expo-router";
import { Text } from "react-native";
import CustomInput from "../components/CustomInput";
import DatePickerField from "../components/DatePicker";
import { styles } from "./personalDetailsStyles";
import countries from "../utils/countryCodes";
import { Picker } from "@react-native-picker/picker";

const SignUp = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
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
  });

  const [showPassword, setShowPassword] = useState(false);
  const [selectedCountryCode, setSelectedCountryCode] = useState();

  const genderOptions = [
    { label: "Select Gender", value: "" },
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Other", value: "other" },
  ];

  const professionOptions = [
    { label: "Select Profession", value: "" },
    { label: "Doctor", value: "doctor" },
    { label: "Nurse", value: "nurse" },
    { label: "Pharmacist", value: "pharmacist" },
    { label: "Other Healthcare Professional", value: "other" },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formContainer}>
        <CustomInput
          placeholder="Email"
          value={formData.email}
          onChangeText={(text) => setFormData({ ...formData, email: text })}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <View style={styles.phoneContainer}>
          <Picker
            selectedValue={selectedCountryCode}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedCountryCode(itemValue)
            }
            style={styles.countryCodePicker}
          >
            <Picker.Item label="Java" value="java" />
            <Picker.Item label="JavaScript" value="js" />
          </Picker>

          <CustomInput
            placeholder="Phone Number"
            value={formData.phone}
            onChangeText={(text) => setFormData({ ...formData, phone: text })}
            keyboardType="phone-pad"
            containerStyle={styles.phoneInput}
          />
        </View>

        <CustomInput
          placeholder="Password"
          value={formData.password}
          onChangeText={(text) => setFormData({ ...formData, password: text })}
          isPassword={true}
          secureTextEntry={!showPassword}
          rightIcon={{
            type: "feather",
            name: showPassword ? "eye-off" : "eye",
            color: "#999",
            size: 20,
            onPress: () => setShowPassword(!showPassword),
          }}
        />

        <View style={styles.row}>
          <CustomInput
            placeholder="First Name"
            value={formData.firstName}
            onChangeText={(text) =>
              setFormData({ ...formData, firstName: text })
            }
            containerStyle={styles.halfInput}
          />
          <CustomInput
            placeholder="Last Name"
            value={formData.lastName}
            onChangeText={(text) =>
              setFormData({ ...formData, lastName: text })
            }
            containerStyle={styles.halfInput}
          />
        </View>

        <View style={styles.row}>
          {/* <View style={[styles.pickerContainer, styles.halfInput]}>
            <Picker
              selectedValue={formData.gender}
              onValueChange={(itemValue) =>
                setFormData({ ...formData, gender: itemValue })
              }
              style={styles.picker}
              dropdownIconColor="#666"
            >
              {genderOptions.map((option) => (
                <Picker.Item
                  key={option.value}
                  label={option.label}
                  value={option.value}
                />
              ))}
            </Picker>
          </View> */}

          <CustomInput
            placeholder="Zipcode"
            value={formData.zipcode}
            onChangeText={(text) => setFormData({ ...formData, zipcode: text })}
            containerStyle={styles.halfInput}
            keyboardType="numeric"
            maxLength={6}
          />
        </View>

        <DatePickerField
          label="Date of Birth (DD/MM/YYYY)"
          onDateChange={(date) => setFormData({ ...formData, dob: date })}
          containerStyle={styles.input}
        />

        {/* <View style={[styles.pickerContainer, styles.input]}>
          <Picker
            selectedValue={formData.profession}
            onValueChange={(itemValue) =>
              setFormData({ ...formData, profession: itemValue })
            }
            style={styles.picker}
            dropdownIconColor="#666"
          >
            {professionOptions.map((option) => (
              <Picker.Item
                key={option.value}
                label={option.label}
                value={option.value}
              />
            ))}
          </Picker>
        </View> */}

        <CheckBox
          title={
            <Text style={styles.checkboxText}>
              By checking this box, you are confirming that you have read and
              agree to our <Text style={styles.linkText}>Terms of Use</Text>,{" "}
              <Text style={styles.linkText}>Privacy Policy</Text>
            </Text>
          }
          checked={formData.termsAccepted}
          onPress={() =>
            setFormData({ ...formData, termsAccepted: !formData.termsAccepted })
          }
          containerStyle={styles.checkbox}
        />

        <Button
          title="Register"
          onPress={() => router.push("/auth/verify")}
          containerStyle={styles.buttonContainer}
          buttonStyle={styles.button}
        />
      </View>
    </ScrollView>
  );
};

export default SignUp;
