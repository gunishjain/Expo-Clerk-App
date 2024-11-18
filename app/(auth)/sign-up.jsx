import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Button, CheckBox } from '@rneui/themed';
import { useRouter } from 'expo-router';
import CustomInput from '../components/CustomInput';
import ProgressStepper from '../components/ProgressStepper';
import DatePickerField from '../components/DatePicker';

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
        />
        
        <View style={styles.phoneInputContainer}>
          <View style={styles.countryCode}>
            <CustomInput
              value="+1"
              containerStyle={styles.countryCodeInput}
              editable={false}
            />
          </View>
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
          secureTextEntry
          rightIcon={{ 
            type: 'feather', 
            name: 'eye',
            color: '#999',
            size: 20
          }}
        />
        
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
          <CustomInput
            placeholder="Gender"
            value={formData.gender}
            onChangeText={(text) => setFormData({ ...formData, gender: text })}
            containerStyle={styles.halfInput}
          />
          
          <CustomInput
            placeholder="Zipcode"
            value={formData.zipcode}
            onChangeText={(text) => setFormData({ ...formData, zipcode: text })}
            containerStyle={styles.halfInput}
            keyboardType="numeric"
            maxLength={6}
          />
        </View>

        <DatePickerField label="Date of Birth (DD/MM/YYYY)" onDateChange={handleDateChange} />
        
        <CustomInput
          placeholder="Profession"
          value={formData.profession}
          onChangeText={(text) => setFormData({ ...formData, profession: text })}
          rightIcon={{ 
            type: 'feather', 
            name: 'chevron-down',
            color: '#999',
            size: 20
          }}
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
    marginBottom: 10,
  },
  halfInput: {
    width: '48%',
  },
  phoneInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  countryCode: {
    width: '25%',
  },
  phoneNumber: {
    width: '73%',
  },
  countryCodeInput: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
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
    padding: 15,
    height: 55,
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
});

export default SignUp