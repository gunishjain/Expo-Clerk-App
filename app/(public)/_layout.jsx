import { View, Text } from 'react-native'
import { Stack,useRouter } from 'expo-router'
import { useAuth } from '@clerk/clerk-expo';
import { useEffect } from 'react';


import React from 'react'



const HomeLayout = () => {

  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.replace('/login');
    }
  }, [isSignedIn, isLoaded]);

  return (
    <>
      <Stack>
        <Stack.Screen
          name="home"
          options={{
            headerShown: false
          }}
        />
      </Stack>
    </>
  )
}

export default HomeLayout