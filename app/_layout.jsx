import { Slot, useSegments, useRouter} from 'expo-router'
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import * as SecureStore from 'expo-secure-store'
import React, { useEffect } from "react";
import "../global.css";

// SplashScreen.preventAutoHideAsync();


const publishableKey = "pk_test_c2VsZWN0LXN3aWZ0LTQyLmNsZXJrLmFjY291bnRzLmRldiQ"


const tokenCache = {
  async getToken(key: string) {
    try {
      const item = await SecureStore.getItemAsync(key)
      if (item) {
        console.log(`${key} was used 🔐 \n`)
      } else {
        console.log('No values stored under key: ' + key)
      }
      return item
    } catch (error) {
      console.error('SecureStore get item error: ', error)
      await SecureStore.deleteItemAsync(key)
      return null
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value)
    } catch (err) {
      return
    }
  },
}

const InitialLayout = () => {
	const { isLoaded, isSignedIn } = useAuth();
	const segments = useSegments();
	const router = useRouter();

	
	useEffect(() => {
		if (!isLoaded) return;

    const inAuthGroup = segments[0] === '(auth)';
    const inPublicGroup = segments[0] === '(public)';

    console.log('Auth state:', { isSignedIn, inAuthGroup, inPublicGroup }); // Add logging

    if (isSignedIn && inAuthGroup) {
      router.replace('/(public)/home');
    } else if (!isSignedIn && !inAuthGroup && segments[0] !== 'register') {
      // Only redirect to login if not on register page and not in auth group
      router.replace('/login');
    }
  }, [isSignedIn, isLoaded, segments]);


  return <Slot />;
};

const RootLayout = () => {

 
  if (!publishableKey) {
    throw new Error('Add EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env')
  }


  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>

        <InitialLayout />
    </ClerkProvider>
  )
}

export default RootLayout




