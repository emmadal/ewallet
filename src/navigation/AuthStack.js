import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {withTheme} from 'react-native-paper';
import Home from '../screens/Home';
import ConfirmIdentity from '../screens/ConfirmIdentity';
import Settings from '../screens/Settings';
import Activity from '../screens/Activity';
import Profile from '../screens/Profile';
import SendTether from '../screens/SendTether';
import Request from '../screens/Request';
import SendTetherSuccess from '../screens/SendTetherSuccess';
import Deposit from '../screens/Deposit';
import WithDrawal from '../screens/WithDrawal';
import PaymentMethod from '../screens/PaymentMethod';

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
        name="WithDrawal"
        component={WithDrawal}
        options={{
          headerTitle: "Retrait d'argent",
          headerBackTitle: 'Retour',
          headerTitleStyle: {
            fontFamily: 'ProductSans-Medium',
          },
        }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerTitle: 'Profil utilisateur',
          headerBackTitle: 'Retour',
          headerTitleStyle: {
            fontFamily: 'ProductSans-Medium',
          },
        }}
      />
      <Stack.Screen
        name="Deposit"
        component={Deposit}
        options={{
          headerTitle: 'Faire un dépot',
          headerBackTitle: 'Retour',
          headerTitleStyle: {
            fontFamily: 'ProductSans-Medium',
          },
        }}
      />
      <Stack.Screen
        name="Request"
        component={Request}
        options={{
          headerTitle: 'Demande de paiement',
          headerBackTitle: 'Retour',
          headerTitleStyle: {
            fontFamily: 'ProductSans-Medium',
          },
        }}
      />
      <Stack.Screen
        name="PaymentMethod"
        component={PaymentMethod}
        options={{
          headerTitle: 'Méthode de paiement',
          headerBackTitle: 'Retour',
          headerTitleStyle: {
            fontFamily: 'ProductSans-Medium',
          },
        }}
      />
      <Stack.Screen
        name="SendTether"
        component={SendTether}
        options={{
          headerTitle: 'Envoyer du Thether',
          headerBackTitle: 'Retour',
          headerTitleStyle: {
            fontFamily: 'ProductSans-Medium',
          },
        }}
      />
      <Stack.Screen
        name="SendTetherSuccess"
        component={SendTetherSuccess}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ConfirmIdentity"
        component={ConfirmIdentity}
        options={{
          headerTitle: "Confirmation d'identité",
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
