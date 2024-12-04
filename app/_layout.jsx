import { Slot, useSegments, useRouter} from 'expo-router'
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import * as SecureStore from 'expo-secure-store'
import React, { useEffect } from "react";
import "../global.css";

// SplashScreen.preventAutoHideAsync();


const publishableKey = "pk_test_c2VsZWN0LXN3aWZ0LTQyLmNsZXJrLmFjY291bnRzLmRldiQ"


const tokenCache = {
  async getToken(key) {
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
  async saveToken(key, value) {
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

    //FOR TESTING ONLY
    // return;

    // if (!isLoaded) return;


		if (!isLoaded) return;

    const inAuthGroup = segments[0] === '(auth)';
    const inPublicGroup = segments[0] === '(public)';
    const isVerifyPage = segments.includes('verify');
    const isProfessionalDetailsPage = segments.includes('professional-details');
    const isDashboardPage = segments.includes('dashboard');

    console.log('Auth state:', { isSignedIn, inAuthGroup, inPublicGroup, isVerifyPage, segments });

    if (isSignedIn) {
      if (isVerifyPage) {
        // After verification, route to professional details
        router.replace('/(auth)/professional-details');
      } else if (!isProfessionalDetailsPage && !inPublicGroup && !isDashboardPage) {
        // Only route to professional-details if not already there, not in public group, and not on home page
        router.replace('/(auth)/professional-details');
      }
    } else {
      // If not signed in and not already in login/register
      if (!inAuthGroup && segments[0] !== 'register') {
        router.replace('/login');
      }
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




