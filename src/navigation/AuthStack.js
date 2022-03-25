import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {withTheme} from 'react-native-paper';
import Home from '../screens/Home';
import SendCrypto from '../screens/SendCrypto';
import ConfirmIdentity from '../screens/ConfirmIdentity';
import Settings from '../screens/Settings';
import Activity from '../screens/Activity';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{
          headerTitle: 'Réglages',
          headerBackTitle: 'Retour',
          headerTitleStyle: {
            fontFamily: 'ProductSans-Medium',
          },
        }}
      />
      <Stack.Screen
        name="Activity"
        component={Activity}
        options={{
          headerTitle: 'Activité',
          headerBackTitle: 'Retour',
          headerTitleStyle: {
            fontFamily: 'ProductSans-Medium',
          },
        }}
      />
      <Stack.Screen
        name="SendCrypto"
        component={SendCrypto}
        options={{
          headerTitle: 'Envoyer de la cryptomonnaie',
          headerBackTitle: 'Retour',
          headerTitleStyle: {
            fontFamily: 'ProductSans-Medium',
          },
        }}
      />
      <Stack.Screen
        name="ConfirmIdentity"
        component={ConfirmIdentity}
        options={{
          headerTitle: "Confirmation d'indentite",
          headerBackTitle: 'Retour',
          headerTitleStyle: {
            fontFamily: 'ProductSans-Medium',
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default withTheme(AuthStack);
