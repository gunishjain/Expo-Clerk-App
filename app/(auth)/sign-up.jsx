import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import Checkbox from 'expo-checkbox';

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
  const [selectedCountryCode, setSelectedCountryCode] = useState("+1");
  const [showDatePicker, setShowDatePicker] = useState(false);

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
    <ScrollView className="flex-1 bg-white">
      <View className="px-4 py-8">
        {/* Email */}
        <TextInput
          className="w-full h-12 px-4 bg-gray-100 rounded-lg mb-6"
          placeholder="Email"
          value={formData.email}
          onChangeText={(text) => setFormData({ ...formData, email: text })}
          keyboardType="email-address"
        />

        {/* Phone Number */}
        <View className="flex-row space-x-2 mb-6">
          <View className="w-20">
            <View className="h-12 bg-gray-100 rounded-lg justify-center overflow-hidden">
              <Picker
                selectedValue={selectedCountryCode}
                onValueChange={(itemValue) => setSelectedCountryCode(itemValue)}
                className="h-12 -mt-3"
              >
                <Picker.Item label="🇺🇸 +1" value="+1" />
                <Picker.Item label="🇮🇳 +91" value="+91" />
                <Picker.Item label="🇬🇧 +44" value="+44" />
                <Picker.Item label="🇦🇺 +61" value="+61" />
                <Picker.Item label="🇨🇦 +1" value="+1" />
              </Picker>
            </View>
          </View>
          <TextInput
            className="flex-1 h-12 px-4 bg-gray-100 rounded-lg"
            placeholder="Phone Number"
            value={formData.phone}
            onChangeText={(text) => setFormData({ ...formData, phone: text })}
            keyboardType="phone-pad"
          />
        </View>

        {/* Password */}
        <View className="relative">
          <TextInput
            className="w-full h-12 px-4 bg-gray-100 rounded-lg"
            placeholder="Password"
            value={formData.password}
            onChangeText={(text) => setFormData({ ...formData, password: text })}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity 
            className="absolute right-4 top-3"
            onPress={() => setShowPassword(!showPassword)}
          >
            <MaterialIcons 
              name={showPassword ? "visibility" : "visibility-off"} 
              size={24} 
              color="gray" 
            />
          </TouchableOpacity>
        </View>

        {/* Name Fields */}
        <View className="flex-row space-x-2">
          <TextInput
            className="flex-1 h-12 px-4 bg-gray-100 rounded-lg"
            placeholder="First Name"
            value={formData.firstName}
            onChangeText={(text) => setFormData({ ...formData, firstName: text })}
          />
          <TextInput
            className="flex-1 h-12 px-4 bg-gray-100 rounded-lg"
            placeholder="Last Name"
            value={formData.lastName}
            onChangeText={(text) => setFormData({ ...formData, lastName: text })}
          />
        </View>

        {/* Gender and Zipcode */}
        <View className="flex-row space-x-2">
          <View className="flex-1">
            <TouchableOpacity 
              className="h-12 bg-gray-100 rounded-lg px-4 justify-center"
            >
              <Text className="text-gray-500">Gender</Text>
            </TouchableOpacity>
          </View>
          <TextInput
            className="flex-1 h-12 px-4 bg-gray-100 rounded-lg"
            placeholder="Zipcode"
            value={formData.zipcode}
            onChangeText={(text) => setFormData({ ...formData, zipcode: text })}
            keyboardType="numeric"
          />
        </View>

        {/* Date of Birth */}
        <TouchableOpacity 
          className="w-full h-12 px-4 bg-gray-100 rounded-lg justify-center"
          onPress={() => setShowDatePicker(true)}
        >
          <Text className="text-gray-500">
            {formData.dob || "Date of Birth (DD/MM/YYYY)"}
          </Text>
        </TouchableOpacity>
        
        {showDatePicker && (
          <DateTimePicker
            value={new Date()}
            mode="date"
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) {
                setFormData({ 
                  ...formData, 
                  dob: selectedDate.toLocaleDateString() 
                });
              }
            }}
          />
        )}

        {/* Profession */}
        <TouchableOpacity 
          className="w-full h-12 px-4 bg-gray-100 rounded-lg justify-center"
        >
          <Text className="text-gray-500">Profession</Text>
        </TouchableOpacity>

        {/* Terms and Conditions */}
        <View className="flex-row items-start space-x-2 mt-4">
          <Checkbox
            value={formData.termsAccepted}
            onValueChange={(value) => 
              setFormData({ ...formData, termsAccepted: value })
            }
            color={formData.termsAccepted ? '#2563eb' : undefined}
          />
          <Text className="flex-1 text-sm text-gray-600">
            By checking this box, you are confirming that you have read and agree to our{' '}
            <Text className="text-blue-600 underline">Terms of Use</Text>,{' '}
            <Text className="text-blue-600 underline">Privacy Policy</Text>
          </Text>
        </View>

        {/* Register Button */}
        <TouchableOpacity 
          className="w-full h-12 bg-blue-600 rounded-lg items-center justify-center mt-6"
          onPress={() => {
            // Handle registration
          }}
        >
          <Text className="text-white font-semibold">Register</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SignUp;