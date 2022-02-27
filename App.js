import React from 'react';
import {LogBox, StatusBar, Platform} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {Provider as PaperProvider} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import OnboardingStack from './src/navigation/OnboardingStack';
import {LightTheme} from './src/themes';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

const App = () => {
  if (Platform.OS === 'ios') {
    Icon.loadFont();
  }
  return (
    <PaperProvider
      theme={LightTheme}
      settings={{icon: props => <Icon {...props} />}}>
      <StatusBar
        backgroundColor={Platform.OS === 'ios' ? 'transparent' : '#44bd32'}
        barStyle="default"
        networkActivityIndicatorVisible={true}
      />
      <NavigationContainer theme={LightTheme}>
        <OnboardingStack />
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
