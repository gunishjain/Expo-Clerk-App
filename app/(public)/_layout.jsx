import { Stack,useRouter } from 'expo-router'
import { useAuth } from '@clerk/clerk-expo';
import { Pressable } from 'react-native';
import { useEffect } from 'react';
import { Drawer } from 'expo-router/drawer';
import { Ionicons } from '@expo/vector-icons';
import React from 'react'
import {
  useNavigation,
} from '@react-navigation/native';



const HomeLayout = () => {

  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();
  const navigation = useNavigation();



  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.replace('/login');
    }
  }, [isSignedIn, isLoaded]);

  return (
    <>
    <Drawer
         screenOptions={{
          headerShown: true,
          headerTitle: 'Xcel Med Connect', // Title in the header
          drawerPosition: 'right', // Drawer opens from the right
          drawerStyle: {
            backgroundColor: '#f4f4f4', // Drawer background color
            width: 240, // Drawer width
          },
          drawerLabelStyle: {
            fontSize: 16, 
            color: '#333', 
          },
          headerRight: ({ tintColor }) => (
            <Pressable
              onPress={() => {
              }}
              style={{ marginRight: 10 }}
            >
              <Ionicons name="menu" size={24} color={tintColor || '#333'} />
            </Pressable>
          ),
         
          headerLeft: () => null,
        }}
    >
      <Stack>
        <Stack.Screen
          name="dashboard"
          options={{
            headerShown: false
          }}
        />
      </Stack>
    </Drawer>
    </>
  )
}

export default HomeLayout