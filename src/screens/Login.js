import React, {useState, useContext} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {Text, withTheme, Button, TextInput} from 'react-native-paper';
import {login} from '../api';
import Loader from '../components/Loader';
import {UserContext} from '../context';
import * as regex from '../constants/regex';

const Login = ({theme}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const {colors} = theme;
  const {setUser} = useContext(UserContext);

  const handleLogin = async () => {
    try {
      setLoading(!loading);
      const res = await login({email, password});
      if (res) {
        setUser(res);
      }
    } catch (error) {
      setLoading(false);
      if (error.code === 'auth/user-not-found') {
        Alert.alert('Aucun utilisateur ne correspond a ces identifiants');
      }
      if (error.code === 'auth/wrong-password') {
        Alert.alert("Le mot de passe ou l'email est invalide");
      }
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <Loader loading={loading} />
      <View>
        <Text style={styles.title}>Bienvenue sur eWallet</Text>
        <Text style={styles.subtitle}>Connectez vous pour commencer</Text>
      </View>
      <TextInput
        style={styles.input}
        autoFocus={true}
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
      <Button
        disabled={
          regex.password.test(password) && regex.email.test(email)
            ? false
            : true
        }
        labelStyle={[{color: colors.white}, styles.labelStyle]}
        onPress={handleLogin}
        style={styles.btn}
        mode="contained"
        theme={{roundness: 20}}>
        Se connecter
      </Button>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  phoneInputStyle: {
    alignSelf: 'center',
    marginTop: 15,
  },
  title: {
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'ProductSans-Bold',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginVertical: 15,
    fontFamily: 'ProductSans-Light',
  },
  btn: {
    width: Dimensions.get('window').width / 1.5,
    padding: 4,
    alignSelf: 'center',
    marginTop: 35,
  },
  input: {
    marginHorizontal: 30,
    marginBottom: 20,
    backgroundColor: 'transparent',
  },
  labelStyle: {
    fontFamily: 'ProductSans-Medium',
    fontSize: 14,
  },
});

export default withTheme(Login);
