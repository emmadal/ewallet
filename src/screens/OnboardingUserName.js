import React, {useState, useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {withTheme, Button, TextInput, Subheading} from 'react-native-paper';
import * as regex from '../constants/regex';
import {login, register} from '../api';
import {UserContext} from '../context';
import Loader from '../components/Loader';

const OnboardingUserName = ({theme, route}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const {setUser} = useContext(UserContext);
  const {colors} = theme;

  const createAccount = async () => {
    try {
      setLoading(!loading);
      const userData = {
        email,
        password,
        fullName: name,
        phone: route.params.phoneNumber,
        country: route.params.country,
        currency: route.params.currency,
      };
      const res = await register(userData);
      if (res) {
        const auth = await login({email, password});
        setUser(auth);
      }
    } catch (error) {
      console.log(error.message);
      setLoading(false);
      return;
    }
  };

  return (
    <View style={styles.container}>
      <Loader loading={loading} />
      <TextInput
        style={styles.input}
        maxLength={17}
        autoCapitalize="none"
        value={name}
        label="Nom & Prénom"
        onChangeText={text => setName(text)}
        right={<TextInput.Icon name="human-male" color={colors.primary} />}
      />
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        label="Email"
        onChangeText={text => setEmail(text)}
        right={<TextInput.Icon name="email" color={colors.primary} />}
      />
      <TextInput
        style={styles.input}
        minLength={8}
        secureTextEntry={true}
        autoCapitalize="none"
        value={password}
        label="Mot de passe"
        onChangeText={text => setPassword(text)}
        right={<TextInput.Icon name="lock" color={colors.primary} />}
      />
      <Subheading style={[styles.passwordInfo, {color: colors.danger}]}>
        Votre mot de passe doit contenir des caractères speciaux, des chiffres,
        des lettres minuscules, majuscules et au moins d'une longeur de 08
        caractères.
      </Subheading>
      <Button
        labelStyle={[{color: colors.white}, styles.labelStyle]}
        disabled={
          name.length >= 6 &&
          regex.password.test(password) &&
          regex.email.test(email)
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
  passwordInfo: {
    // textAlign: 'center',
    fontFamily: 'ProductSans-Light',
    fontWeight: 'bold',
    fontSize: 15,
    marginHorizontal: 30,
  },
});

export default withTheme(OnboardingUserName);
