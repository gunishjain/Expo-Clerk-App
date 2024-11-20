import React, { useState } from "react";
import { View, StyleSheet, Platform, ScrollView , TextInput} from "react-native";
import { Button, CheckBox } from "@rneui/themed";
import { useRouter } from "expo-router";
import { Text } from "react-native";
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
        <TextInput
          placeholder="Email"
          value={formData.email}
          onChangeText={(text) => setFormData({ ...formData, email: text })}
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.inputTextField}
        />

        <View style={styles.phoneContainer}>

          <View style={styles.countryCodePicker}>
            <Picker
             selectedValue={selectedCountryCode}
             onValueChange={(itemValue) => setSelectedCountryCode(itemValue)}
              style={{ height: 40, width: 40, fontSize: 12 }}
              >
                <Picker.Item label="Select" value="" />
                      {countries.map((country) => (
                        <Picker.Item
                          key={country.code}
                          label={`${country.flag} ${country.dial_code}`}
                          value={country.dial_code}
                        />
                      ))}
          </Picker>
          </View>
          

          <TextInput
            placeholder="Phone Number"
            value={formData.phone}
            onChangeText={(text) => setFormData({ ...formData, phone: text })}
            keyboardType="phone-pad"
            style={styles.phonenumber}
          />


        </View>

        <TextInput
          placeholder="Password"
          value={formData.password}
          onChangeText={(text) => setFormData({ ...formData, password: text })}
          keyboardType="text"
          style={styles.inputTextField}
        />

        <View style={styles.flRow}>
          
              <TextInput
                placeholder="First Name"
                value={formData.firstName}
                onChangeText={(text) =>
                  setFormData({ ...formData, firstName: text })
                }
                style={styles.firstName}
                
              />
              <TextInput
                placeholder="Last Name"
                value={formData.lastName}
                onChangeText={(text) =>
                  setFormData({ ...formData, lastName: text })
                }
                style={styles.lastName}
              />

        </View>

        <View style={styles.flRow}>


          <View style={styles.firstName}>
                <Picker
                  selectedValue={formData.gender}
                  onValueChange={(itemValue) =>
                    setFormData({ ...formData, gender: itemValue })
                  }
                  
                >
                  {genderOptions.map((option) => (
                    <Picker.Item
                      key={option.value}
                      label={option.label}
                      value={option.value}
                    />
                  ))}
                </Picker>
          </View>

          <TextInput
            placeholder="Zipcode"
            value={formData.zipcode}
            onChangeText={(text) => setFormData({ ...formData, zipcode: text })}
            keyboardType="numeric"
            style={styles.lastName}
           
          />
        </View>

        <DatePickerField
          label="Date of Birth (DD/MM/YYYY)"
          onDateChange={(date) => setFormData({ ...formData, dob: date })}
          style={{
            container: { marginBottom: 20 },
            text: { color: 'black' },
          }}
        />

        <View style={styles.professionPicker}>
          <Picker
            selectedValue={formData.profession}
            onValueChange={(itemValue) =>
              setFormData({ ...formData, profession: itemValue })
            }
            
          >
            {professionOptions.map((option) => (
              <Picker.Item
                key={option.value}
                label={option.label}
                value={option.value}
              />
            ))}
          </Picker>
        </View>

        <View style={styles.toc}>

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
            // containerStyle={styles.checkbox}
          />

        </View>

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
