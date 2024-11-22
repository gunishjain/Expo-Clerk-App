import { View, Text } from 'react-native'
import { Stack } from 'expo-router'
import Stepper from 'react-native-stepper-view';

import React from 'react'
import AuthStepper from '../components/AuthStepper';


const AuthLayout = () => {
  return (
    <>
    <AuthStepper/>
    <Stack>

        <Stack.Screen
          name="personal-details"
          options={{
              headerShown: false
            }}
        />
        <Stack.Screen
          name="verify"
          options={{
              headerShown: false
            }}
          />
        <Stack.Screen
            name="professional-details"
            options={{
                headerShown: false
            }}
          />
            
    </Stack>
    
    </>
  )
}

export default AuthLayout