import React, {useEffect, useState} from 'react';
import {LogBox, StatusBar, Platform} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {UserContext} from './src/context';
import auth from '@react-native-firebase/auth';
import {Provider as PaperProvider} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import OnboardingStack from './src/navigation/OnboardingStack';
import {LightTheme} from './src/themes';
import {getProfile} from './src/api';
import Home from './src/screens/Home';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

const App = () => {
  const [user, setUser] = useState();

  if (Platform.OS === 'ios') {
    Icon.loadFont();
  }

  // Handle user state changes
  const onAuthStateChanged = u => {
    getProfile(u?.uid).then(e => setUser(e));
  };

  useEffect(() => {
    //Check if user is authenticated on app load..
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <PaperProvider
      theme={LightTheme}
      settings={{icon: props => <Icon {...props} />}}>
      <StatusBar
        backgroundColor={Platform.OS === 'ios' ? 'transparent' : '#44bd32'}
        barStyle="default"
        networkActivityIndicatorVisible={true}
      />
      <UserContext.Provider value={{setUser, user}}>
        <NavigationContainer theme={LightTheme}>
          {!user ? <OnboardingStack /> : <Home />}
        </NavigationContainer>
      </UserContext.Provider>
    </PaperProvider>
  );
};

export default App;
