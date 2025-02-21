import React, { useState, useEffect } from 'react'; 
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Splash from '../screens/Splash';
import Onboarding from '../screens/Onboarding';
import Profile from '../screens/Profile';
import Home from '../screens/Home';

const Stack = createNativeStackNavigator();

export default function Index() {
  const [loggedIn, setLoggedIn] = useState<boolean|null>(null);

  useEffect(() => {
    const checkLoginStatus = async() => {
      const loginStatus = await AsyncStorage.getItem('loggedIn');
      setLoggedIn(loginStatus === 'true');
    };
    checkLoginStatus();
  }, []);

  if (loggedIn === null) {
    return (
      <>
        <Splash />
      </>
    );
  }

  return (
    <Stack.Navigator>
      {loggedIn ? (
        <>
          <Stack.Screen name='Home' component={Home} options={{ headerShown: false }} />
          <Stack.Screen name='Profile' component={Profile} options={{ headerShown: false }} />
        </>
      ) : (
          <Stack.Screen name='Onboarding' component={Onboarding} options={{ headerShown: false }} />
      )}
    </Stack.Navigator>
  );
}
