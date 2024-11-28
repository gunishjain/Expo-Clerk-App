import { View, StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'
import { Link , Redirect } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React from 'react'

export default function App() {
    return <Redirect href="/(auth)/login" />;
    
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#fff',
  }
})