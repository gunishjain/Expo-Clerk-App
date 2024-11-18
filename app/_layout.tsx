import { SplashScreen , Stack} from 'expo-router'
import React from 'react'


// SplashScreen.preventAutoHideAsync();

const RootLayout = () => {

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false}}/>
    </Stack>
  )
}

export default RootLayout




