import React, {useContext, useState, useEffect, useCallback} from 'react';
import {StyleSheet, View, Dimensions, Alert} from 'react-native';
import {withTheme, Text, Button, TextInput, Avatar} from 'react-native-paper';
import VirtualKeyboard from 'react-native-virtual-keyboard';
import Loader from '../components/Loader';
import {UserContext} from '../context';
import {useNavigation} from '@react-navigation/native';
import {MINIMUM_AMOUNT} from '../api/env';

const Deposit = ({theme}) => {
  const {colors} = theme;
  const [amount, setAmount] = useState(0);
  const [eth, setEth] = useState(0);
  const [loading, setLoading] = useState(false);
  const {user} = useContext(UserContext);
  const {navigate} = useNavigation();
  const {address} = user.accounts[1].address;

  const handleFees = useCallback(() => {
    const XOFUSDT = 0.0017;
    const XOFUSDTWithAmount = XOFUSDT * amount;
    setEth(XOFUSDTWithAmount);
  }, [amount]);

  const handleDepositThether = () => {
    if (amount < MINIMUM_AMOUNT) {
      Alert.alert('Le dépot minimal autorisé est de 1000 FCFA');
    } else {
      navigate('PaymentMethod', {amount});
    }
  };

  useEffect(() => handleFees(), [handleFees]);

  return (
    <View style={styles.container}>
      <Loader loading={loading} />
      <View style={styles.containerLogo}>
        <Avatar.Image
          size={50}
          source={require('../assets/tether-logo.png')}
          style={styles.logo}
        />
        <Text style={styles.caption}>1 XOF = 0.0017 USDT</Text>
      </View>
      <View style={styles.containerInput}>
        <TextInput
          style={styles.inputFlat}
          editable={false}
          underlineColorAndroid="transparent"
          mode="flat"
          label="XOF"
          right={<TextInput.Icon name="wallet-outline" />}
          value={String(amount)}
          onChangeText={text => setAmount(Number(text))}
        />
        <TextInput
          style={styles.inputFlat}
          editable={false}
          mode="flat"
          label="USDT"
          value={String(eth)}
          onChangeText={text => setEth(Number(text))}
          right={<TextInput.Icon name="wallet" />}
        />
        <TextInput
          style={styles.inputAddress}
          autoCapitalize="none"
          label="Votre adresse"
          value={address}
          right={<TextInput.Icon name="clipboard" />}
        />
      </View>
      <View style={styles.keyboardView}>
        <VirtualKeyboard
          decimal={true}
          color="black"
          pressMode="string"
          onPress={val => setAmount(val)}
        />
      </View>
      <Button
        labelStyle={[{color: colors.white}, styles.labelStyle]}
        mode="contained"
        onPress={handleDepositThether}
        style={styles.btn}
        theme={{roundness: 20}}>
        Faire le depot
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 17,
    backgroundColor: 'white',
  },
  logo: {
    marginBottom: 10,
  },
  caption: {
    fontSize: 15,
    fontFamily: 'ProductSans-Bold',
    textAlign: 'center',
  },
  containerLogo: {
    alignItems: 'center',
    marginTop: 25,
  },
  containerInput: {
    marginBottom: 5,
  },
  title: {
    fontSize: 18,
    fontFamily: 'ProductSans-Bold',
  },
  inputFlat: {
    backgroundColor: 'transparent',
    fontFamily: 'ProductSans-Bold',
    fontSize: 18,
    color: 'black',
  },
  inputAddress: {
    marginTop: 10,
    backgroundColor: 'transparent',
    fontFamily: 'ProductSans-Bold',
    fontSize: 18,
  },
  keyboardView: {
    paddingTop: 15,
  },
  btn: {
    width: Dimensions.get('window').width / 1.5,
    justifyContent: 'center',
    padding: 3,
    alignSelf: 'center',
    marginTop: 20,
  },
  keyStyle: {
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
});

export default withTheme(Deposit);
