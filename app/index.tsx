import React, { useState } from 'react'; 
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Onboarding from "../screens/Onboarding";
import Profile from "../screens/Profile";
import Splash from "../screens/Splash";

const Stack = createNativeStackNavigator();

export default function Index() {
  const [loggedIn, onLogin] = useState(false);
  // if (state.isLoading) {
  //    return (
  //     <>
  //       <Splash />
  //     </>
  //   );
  // }

  return (
    <>
      <Stack.Navigator>
        {!loggedIn ? (
          <Stack.Screen name="Onboarding" component={Onboarding} />
        ) : (
          <Stack.Screen name="Profile" component={Profile} />
        )}
      </Stack.Navigator>
    </>
  );
}
