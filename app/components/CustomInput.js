import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Input } from '@rneui/themed';

const CustomInput = ({ placeholder, secureTextEntry, leftIcon, ...props }) => (
  <Input
    placeholder={placeholder}
    secureTextEntry={secureTextEntry}
    leftIcon={leftIcon}
    containerStyle={styles.inputContainer}
    inputContainerStyle={styles.input}
    {...props}
  />
);

const styles = StyleSheet.create({
  inputContainer: {
    paddingHorizontal: 0,
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 10,
    borderBottomWidth: 0,
  },
});

export default CustomInput