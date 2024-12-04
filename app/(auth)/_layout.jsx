import { View, Text } from 'react-native'
import { Stack,usePathname } from 'expo-router'
import { SafeAreaView } from 'react-native';


import React from 'react'
import AuthStepper from '../components/AuthStepper';


const AuthLayout = () => {

  const pathname = usePathname();
  const hideStepperRoutes = ['/login', '/forgotpass'];
  const shouldHideAuthStepper = hideStepperRoutes.includes(pathname);


  return (
    <>
    {!shouldHideAuthStepper && <AuthStepper />}    
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

          <Stack.Screen
            name="login"
            options={{
                headerShown: false
            }}
          />
       
    </Stack>
    
    </>
  )
}

export default AuthLayout