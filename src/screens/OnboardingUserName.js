import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {withTheme, Button, TextInput} from 'react-native-paper';
import * as regex from '../constants/regex';

const OnboardingUserName = ({theme, route}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {colors} = theme;

  const createAccount = () => {};

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        maxLength={17}
        autoCapitalize="none"
        value={name}
        label="Nom & Prénom"
        onChangeText={text => setName(text)}
        right={<TextInput.Icon name="user" color={colors.primary} />}
      />
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        label="Email"
        onChangeText={text => setEmail(text)}
        right={<TextInput.Icon name="envelope" color={colors.primary} />}
      />
      <TextInput
        style={styles.input}
        maxLength={8}
        secureTextEntry={true}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        autoCapitalize="none"
        value={password}
        label="Mot de passe"
        onChangeText={text => setPassword(text)}
        right={<TextInput.Icon name="lock" color={colors.primary} />}
      />
      <Button
        labelStyle={[{color: colors.white}, styles.labelStyle]}
        disabled={
          name.length >= 6 && password.length === 8 && regex.email.test(email)
            ? false
            : true
        }
        onPress={createAccount}
        style={styles.btn}
        mode="contained"
        theme={{roundness: 20}}>
        S'enregistrer
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    marginHorizontal: 30,
    marginBottom: 20,
    backgroundColor: 'transparent',
  },

  header: {
    textAlign: 'center',
    fontSize: 20,
  },
  btn: {
    padding: 4,
    alignSelf: 'center',
    marginTop: 40,
  },
  error: {
    lineHeight: 30,
    height: 30,
    marginTop: 15,
  },
  labelStyle: {
    fontFamily: 'ProductSans-Medium',
    fontSize: 18,
  },
});

export default withTheme(OnboardingUserName);