import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {withTheme} from 'react-native-paper';
import OnboardingUserName from '../screens/OnboardingUserName';
import OnboardingPhone from '../screens/OnboardingPhone';
import Onboarding from '../screens/Onboarding';
import Login from '../screens/Login';

const Stack = createNativeStackNavigator();

const OnboardingStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Onboarding"
        component={Onboarding}
        options={{
          headerRight: () => null,
          headerLeft: () => null,
          headerTitle: () => null,
          headerShown: false,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="OnboardingPhone"
        component={OnboardingPhone}
        options={{
          headerTitle: 'Numéro de telephone',
          headerBackTitle: 'Retour',
          headerTitleStyle: {
            fontFamily: 'ProductSans-Medium',
          },
        }}
      />
      <Stack.Screen
        name="OnboardingUserName"
        component={OnboardingUserName}
        options={{
          headerTitle: "Informations sur l'utilisateur",
          headerBackTitle: 'Retour',
          headerTitleStyle: {
            fontFamily: 'ProductSans-Medium',
          },
        }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerTitle: 'Se connecter',
          headerBackTitle: 'Retour',
          headerTitleStyle: {
            fontFamily: 'ProductSans-Medium',
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default withTheme(OnboardingStack);
