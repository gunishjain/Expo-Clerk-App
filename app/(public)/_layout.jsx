import 'react-native-gesture-handler'
import { useNavigation,useRouter } from 'expo-router'
import { useAuth } from '@clerk/clerk-expo';
import { Pressable } from 'react-native';
import { useEffect } from 'react';
import { createDrawerNavigator, DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
 } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import React from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import DashBoard from './dashboard';
import Profile from './profile';
import AccountSetting from './accountSetting'

const Drawer = createDrawerNavigator();


const HomeLayout = () => {

  const { isSignedIn, isLoaded ,signOut} = useAuth();
  const router = useRouter();


  const handleLogout = async () => {
    try {
      await signOut();
      router.replace('/login'); // Redirect to login after logout
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
  

  function CustomDrawerContent(props) {
    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem label="Logout" onPress={handleLogout} />
      </DrawerContentScrollView>
    );
  }


  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.replace('/login');
    }
  }, [isSignedIn, isLoaded]);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
    <Drawer.Navigator
        drawerContent={props => <CustomDrawerContent {...props} />}
        screenOptions={({ navigation }) => ({
          headerShown: true,
          headerTitle: 'Xcel Med Connect',
          drawerPosition: 'right',
          drawerStyle: {
            backgroundColor: '#f4f4f4',
            width: 240,
          },
          headerRight: () => (
            <Pressable onPress={() => navigation.openDrawer()} style={{ marginRight: 10 }}>
              <Ionicons name="menu" size={24} color="#333" />
            </Pressable>
          ),
          headerLeft: () => null,
        })}
      >
        <Drawer.Screen name="Dashboard" component={DashBoard} />
        <Drawer.Screen name="Profile" component={Profile} />
        <Drawer.Screen name="AccountSettings" component={AccountSetting} />
        
      </Drawer.Navigator>
    </GestureHandlerRootView>
  )
}

export default HomeLayout