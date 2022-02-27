import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {
  configureFonts,
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
} from 'react-native-paper';

const fontConfig = {
  ios: {
    bold: {
      fontFamily: 'ProductSans-Bold',
    },
    regular: {
      fontFamily: 'ProductSans-Regular',
    },
    medium: {
      fontFamily: 'ProductSans-Medium',
    },
    light: {
      fontFamily: 'ProductSans-Light',
    },
    thin: {
      fontFamily: 'ProductSans-Thin',
    },
  },
  android: {
    bold: {
      fontFamily: 'ProductSans-Bold',
    },
    regular: {
      fontFamily: 'ProductSans-Regular',
    },
    medium: {
      fontFamily: 'ProductSans-Medium',
    },
    light: {
      fontFamily: 'ProductSans-Light',
    },
    thin: {
      fontFamily: 'ProductSans-Thin',
    },
  },
};
export const LightTheme = {
  ...PaperDefaultTheme,
  ...NavigationDefaultTheme,
  colors: {
    ...PaperDefaultTheme.colors,
    ...NavigationDefaultTheme.colors,
    primary: '#44bd32',
    accent: '#f5f6fa',
    warning: '#e67e22',
    danger: '#EA2027',
    white: '#ffffff',
  },
  fonts: configureFonts(fontConfig),
};
export const DarkTheme = {
  ...PaperDarkTheme,
  ...NavigationDarkTheme,
  fonts: configureFonts(fontConfig),
  colors: {
    ...PaperDarkTheme.colors,
    ...NavigationDarkTheme.colors,
    primary: '#44bd32',
    accent: '#f5f6fa',
    warning: '#e67e22',
    danger: '#c0392b',
    white: '#ffffff',
  },
};
