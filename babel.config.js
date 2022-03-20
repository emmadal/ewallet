/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    ["module:react-native-dotenv", {
      "envName": "NODE_ENV",
      "moduleName": "@env",
      "path": ".env",
      "blocklist": null,
      "allowlist": null,
      "safe": false,
      "allowUndefined": true,
      "verbose": false,
    }],
  ],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
};
