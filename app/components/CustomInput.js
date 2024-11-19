import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Input } from '@rneui/themed';

const CustomInput = ({
  placeholder,
  secureTextEntry,
  leftIcon,
  inputBoxStyle,
  inputContStyle, // Style for the container box
  textInputStyle, // Style for the input field
  ...props
}) => (
  <Input
    placeholder={placeholder}
    secureTextEntry={secureTextEntry}
    leftIcon={leftIcon}
    containerStyle={[styles.defaultContainerStyle, inputBoxStyle]} // Combine default and custom styles
    inputContainerStyle={[styles.defaultInputStyle, inputContStyle]} // Combine default and custom styles
    inputStyle={[styles.defaultInputStyle, textInputStyle]}
    {...props}
  />
);

const styles = StyleSheet.create({
  defaultContainerStyle: {
    paddingHorizontal: 0, // Default container box styling
  },
  defaultInputStyle: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 15,
    borderBottomWidth: 0,
  },
  defaultInputTextStyle: {
    textAlign: 'left', // Aligns text inside the input box to the right
  },
});

export default CustomInput;
