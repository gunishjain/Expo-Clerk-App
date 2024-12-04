import React from 'react';
import { SafeAreaView } from 'react-native';
import DashBoard from './dashboard'; // Import the component you want to test

const ProfileTest = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <DashBoard />
    </SafeAreaView>
  );
};

export default ProfileTest;