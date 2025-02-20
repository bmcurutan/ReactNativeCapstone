import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Onboarding from "../screens/Onboarding";
import Profile from "../screens/Profile";

const Stack = createNativeStackNavigator();

export default function Index() {
  // if (state.isLoading) {
  //    return (
  //     <>
  //       <Splash />
  //     </>
  //   );
  // }

  return (
    <Stack.Navigator initialRouteName={'Onboarding'}>
        <Stack.Screen name='Onboarding' component={Onboarding} options={{ headerShown: false }} />
        <Stack.Screen name='Profile' component={Profile} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
