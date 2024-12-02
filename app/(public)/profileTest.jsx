import React from 'react';
import { SafeAreaView } from 'react-native';
import BalanceScreen from './profile'; // Import the component you want to test

const ProfileTest = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <BalanceScreen />
    </SafeAreaView>
  );
};

export default ProfileTest;