import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Button, CheckBox } from '@rneui/themed';
import { useRouter } from 'expo-router';
import CustomInput from '../components/CustomInput';
import ProgressStepper from '../components/ProgressStepper';
import DatePickerField from '../components/DatePicker';
import DropDown from '../components/DropDownField'
import CountryCodePicker from '../components/CountryCodePicker';
import countries from '../utils/countryCodes'


const SignUp = () => {

  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    password: '',
    firstName: '',
    lastName: '',
    gender: '',
    zipcode: '',
    dob: '',
    profession: '',
    termsAccepted: false,
  });

  const [selectedCountry, setSelectedCountry] = useState(countries[0]); // Default to first country
  const [showPassword, setShowPassword] = useState(false);

  const genderOptions = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Other', value: 'other' },
  ];

  const professionOptions = [
    { label: 'Doctor', value: 'doctor' },
    { label: 'Nurse', value: 'nurse' },
    { label: 'Pharmacist', value: 'pharmacist' },
    { label: 'Other Healthcare Professional', value: 'other' },
  ];

  const handleSubmit = () => {
    router.push('/auth/verify');
  };

  const handleDateChange = (date) => {
    console.log('Selected date:', date);
    setFormData({ ...formData, dob: date });
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <ProgressStepper currentStep={1} />
        
        <CustomInput
          placeholder="Email"
          value={formData.email}
          onChangeText={(text) => setFormData({ ...formData, email: text })}
          keyboardType="email-address"
          autoCapitalize="none"
          containerStyle={styles.fullWidthInput}
        />
        
        <View style={[styles.phoneInputContainer, styles.fullWidthInput]}>
          <CountryCodePicker
            value={selectedCountry}
            onSelect={setSelectedCountry}
            containerStyle={styles.countryCode}
          />
          <View style={styles.phoneNumber}>
            <CustomInput
              placeholder="Phone Number"
              value={formData.phone}
              onChangeText={(text) => setFormData({ ...formData, phone: text })}
              keyboardType="phone-pad"
            />
          </View>
        </View>
        
        <CustomInput
          placeholder="Password"
          value={formData.password}
          onChangeText={(text) => setFormData({ ...formData, password: text })}
          isPassword={true}
          secureTextEntry={!showPassword}
          containerStyle={styles.fullWidthInput}
          rightIcon={{ 
            type: 'feather', 
            name: showPassword ? 'eye-off' : 'eye',
            color: '#999',
            size: 20,
            onPress: () => setShowPassword(!showPassword)
          }}
        />
        

      <View></View>
        <View style={styles.row}>
          <CustomInput
            placeholder="First Name"
            value={formData.firstName}
            onChangeText={(text) => setFormData({ ...formData, firstName: text })}
            containerStyle={styles.halfInput}
          />
          
          <CustomInput
            placeholder="Last Name"
            value={formData.lastName}
            onChangeText={(text) => setFormData({ ...formData, lastName: text })}
            containerStyle={styles.halfInput}
          />
        </View>
        
        <View style={styles.row}>
          <View style={[styles.halfInput, styles.dropdownWrapper]}>
            <DropDown
              placeholder="Gender"
              value={formData.gender}
              options={genderOptions}
              onSelect={(item) => setFormData({ ...formData, gender: item.label })}
              containerStyle={styles.dropdown}
            />
          </View>
          
          <CustomInput
            placeholder="Zipcode"
            value={formData.zipcode}
            onChangeText={(text) => setFormData({ ...formData, zipcode: text })}
            containerStyle={styles.halfInput}
            keyboardType="numeric"
            maxLength={6}
          />
        </View>

        
      

        <View style={{ marginBottom: 20 }}>
          <DatePickerField label="Date of Birth (DD/MM/YYYY)" onDateChange={handleDateChange} />
        </View>

        
        
        <DropDown
          placeholder="Profession"
          value={formData.profession}
          options={professionOptions}
          onSelect={(item) => setFormData({ ...formData, profession: item.label })}
        />
        
        <CheckBox
          title="By checking this box, you are confirming that you have read and agree to our Terms of Use, Privacy Policy"
          checked={formData.termsAccepted}
          onPress={() => setFormData({ ...formData, termsAccepted: !formData.termsAccepted })}
          containerStyle={styles.checkbox}
          textStyle={styles.checkboxText}
        />
        
        <Button
          title="Register"
          onPress={handleSubmit}
          containerStyle={styles.buttonContainer}
          buttonStyle={styles.button}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  halfInput: {
    width: '48%',
    height: 50,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    height: 50,
    zIndex: 999,
  },
  countryCode: {
    width: '30%',
    height: 50,
  },
  phoneNumber: {
    width: '68%',
    height: 50,
  },
  checkbox: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    marginLeft: 0,
    marginRight: 0,
    marginTop: 15,
    marginBottom: 15,
    padding: 0,
  },
  checkboxText: {
    fontWeight: 'normal',
    fontSize: 14,
    marginLeft: 10,
    color: '#666',
  },
  buttonContainer: {
    marginTop: 10,
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#4267B2',
    borderRadius: 8,
    height: 50,
  },
  termsText: {
    fontSize: 14,
    color: '#666',
    marginTop: 15,
    marginBottom: 15,
  },
  termsLink: {
    color: '#4267B2',
    textDecorationLine: 'underline',
  },
  fullWidthInput: {
    height: 50,
    marginBottom: 16,
    width: '100%',
  },
  dropdownWrapper: {
    zIndex: 1000,
  },
  dropdown: {
    height: 50,
    width: '100%',
  },
});

export default SignUp