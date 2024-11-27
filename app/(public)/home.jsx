import React, { useState } from "react";
import { View, Text,Alert } from "react-native";
import { Button } from 'react-native';
import { useRouter } from "expo-router";
import styles from "./styles/homeStyle";
import {  useAuth, useUser} from '@clerk/clerk-expo';


const Home = () => {
  const router = useRouter();
  const { signOut } = useAuth();
  const { user } = useUser();

  const handleLogout = async () => {
   
    try {
        await signOut();
        router.replace('/login');
      } catch (error) {
        console.error('Error signing out:', error);
      }
    };

  const userEmail = user?.emailAddresses?.[0]?.emailAddress || 'Guest';


  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome {userEmail}</Text>
    

      <Text onPress={handleLogout} style={styles.logoutButton}>
  Logout
</Text>
    </View>
  );
};

export default Home;
