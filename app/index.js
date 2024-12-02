import { View, StyleSheet } from 'react-native'
import { Link , Redirect } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import ProfileTest from './(public)/profileTest'; 



export default function App() {
  return  <ProfileTest />;
  
    
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#fff',
  }
})