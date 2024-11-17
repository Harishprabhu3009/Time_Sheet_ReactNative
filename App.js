import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { LoginScreen, OtpVerification, ForgetPassScreen, LogNewEntryScreen, EditLogNewEntryScreen } from './Screens';
import Tabs from './navigation/tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from './constants/theme';
import { MenuProvider } from 'react-native-popup-menu';

const StackNavigation = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      
        
        <Stack.Screen name='Activity' component={Tabs} />
       
      
      <Stack.Screen name='LogNewEntry' component={LogNewEntryScreen} />
      <Stack.Screen name='EditLogNewEntry' component={EditLogNewEntryScreen} />
      <Stack.Screen name='NavSignout' component={LogNavigation} />
    </Stack.Navigator>
    
  );
}

const LogNavigation = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Login' component={LoginScreen} />
      <Stack.Screen name='OtpVerification' component={OtpVerification} />
      <Stack.Screen name='ForgetPass' component={ForgetPassScreen} />
      <Stack.Screen name='Activity' component={StackNavigation} />
    </Stack.Navigator>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null); // Initialize as null

  const getData = async () => {
    try {
      const data = await AsyncStorage.getItem('LoggedIn');
      console.log(data, 'at app.js');
      setIsLoggedIn(data === 'true'); // Assuming 'LoggedIn' is stored as a string 'true' or 'false'
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  if (isLoggedIn === null) {
    // Show a loading indicator while determining login status
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={COLORS.primarycolor} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {isLoggedIn ? <StackNavigation /> : <LogNavigation />}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
});
