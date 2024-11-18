import { View, StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'
import { Link } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { PaperProvider } from 'react-native-paper'

export default function App() {
  return (
    <PaperProvider>
    <View style={styles.container}>
      <Text variant="displayLarge">Xcel Med Connect</Text>
      <StatusBar style='auto'/>
      <Link href="/sign-up" style={{color: 'blue'}}>Go To Register</Link>
    </View>
    </PaperProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#fff',
  }
})