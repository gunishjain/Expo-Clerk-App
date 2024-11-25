import React, { useState } from "react";
import { View,ScrollView , TextInput, TouchableOpacity} from "react-native";
import { Button, CheckBox } from "@rneui/themed";
import { useRouter } from "expo-router";
import { Text } from "react-native";
import DatePickerField from "../components/DatePicker";
import { styles } from "./styles/personalDetailsStyles";
import countries from "../utils/countryCodes";
import SelectDropdown from 'react-native-select-dropdown'
import { Ionicons } from '@expo/vector-icons'; // Or use another icon library of your choice


const PersonalDetails = () => {
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

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [selectedCountryCode, setSelectedCountryCode] = useState();

  const genderOptions = [
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

            <SelectDropdown
              data={countries}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index);
              }}
              renderButton={(selectedItem, isOpen) => {
                return (
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
                );
              }}
              renderItem={(item, index, isSelected) => {
                return (
                  <View
                    style={{
                      ...styles.dropdownItemStyle,
                      ...(isSelected && { backgroundColor: '#D2D9DF' }),
                    }}
                  >
                    <Text style={styles.dropdownItemTxtStyle}>
                      {`${item.flag} ${item.dial_code}`}
                    </Text>
                  </View>
                );
              }}
              showsVerticalScrollIndicator={false}
              dropdownStyle={styles.dropdownMenuStyle}
            />

          <TextInput
            placeholder="Phone Number"
            value={formData.phone}
            onChangeText={(text) => setFormData({ ...formData, phone: text })}
            keyboardType="phone-pad"
            style={styles.phonenumber}
          />


        </View>

        {/* <TextInput
          placeholder="Password"
          value={formData.password}
          onChangeText={(text) => setFormData({ ...formData, password: text })}
          keyboardType="text"
          style={styles.inputTextField}
        /> */}

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

                    <SelectDropdown
                        data={genderOptions}
                        onSelect={(selectedItem, index) => {
                          console.log(selectedItem, index);
                        }}
                        renderButton={(selectedItem, isOpen) => {
                          return (
                            <View style={styles.genderPicker}>
                              <Text style={styles.dropdownButtonTxtStyle}>
                              {selectedItem ? selectedItem.label : 'Select Gender'}
                              </Text>
                              <Text style={styles.dropdownButtonArrowStyle}>
                                {isOpen ? '▲' : '▼'}
                              </Text>
                            </View>
                          );
                        }}
                        renderItem={(item, index, isSelected) => {
                          return (
                            <View
                              style={{
                                ...styles.dropdownItemStyle,
                                ...(isSelected && { backgroundColor: '#D2D9DF' }),
                              }}
                            >
                              <Text style={styles.dropdownItemTxtStyle}>
                              {item.label}
                              </Text>
                            </View>
                          );
                        }}
                        showsVerticalScrollIndicator={false}
                        dropdownStyle={styles.dropdownMenuStyle}
                      />

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

        {/* <View style={styles.professionPicker}>
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
        </View> */}

                    <SelectDropdown
                        data={professionOptions}
                        onSelect={(selectedItem, index) => {
                          console.log(selectedItem, index);
                        }}
                        renderButton={(selectedItem, isOpen) => {
                          return (
                            <View style={styles.genderPicker}>
                              <Text style={styles.dropdownButtonTxtStyle}>
                              {selectedItem ? selectedItem.label : 'Select Profession'}
                              </Text>
                              <Text style={styles.dropdownButtonArrowStyle}>
                                {isOpen ? '▲' : '▼'}
                              </Text>
                            </View>
                          );
                        }}
                        renderItem={(item, index, isSelected) => {
                          return (
                            <View
                              style={{
                                ...styles.dropdownItemStyle,
                                ...(isSelected && { backgroundColor: '#D2D9DF' }),
                              }}
                            >
                              <Text style={styles.dropdownItemTxtStyle}>
                              {item.label}
                              </Text>
                            </View>
                          );
                        }}
                        showsVerticalScrollIndicator={false}
                        dropdownStyle={styles.dropdownMenuStyle}
                      />

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
              onPress={() => router.push("verify")}
              containerStyle={styles.buttonContainer}
              buttonStyle={styles.button}
            />

        
      </View>
    </ScrollView>
  );
};

export default PersonalDetails;
