import { View, StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'
import { Link } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React from 'react'

export default function App() {
  return (
    <View style={styles.container}>
      <Text variant="displayLarge">Xcel Med Connect</Text>
      <StatusBar style='auto'/>
      <Link href="/professional-details" style={{color: 'blue'}}>Go To Register</Link>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#fff',
  }
})