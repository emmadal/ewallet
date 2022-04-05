import React, {useRef, useContext, useState} from 'react';
import {StyleSheet, View, Dimensions, TextInput} from 'react-native';
import {withTheme, Title, Text, Button} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {VirtualKeyboard} from 'react-native-screen-keyboard';
import {UserContext} from '../context';
import Icon from 'react-native-vector-icons/Ionicons';

const SendCrypto = ({theme}) => {
  const {colors} = theme;
  const [amount, setAmount] = useState(0);
  const keyboardRef = useRef(null);
  const {navigate} = useNavigation();
  const {user} = useContext(UserContext);

  const keyboardSetting = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    ['', 0, <Icon name={'arrow-back-outline'} color={colors.text} size={35} />],
  ];

  return (
    <View style={styles.container}>
      <View style={styles.keyboardView}>
        <View style={styles.viewCurrency}>
          <Title style={styles.account}>
            {`${user?.accounts[1]?.currencyIsoCode}`}
            <Icon name="chevron-down" size={23} color={colors.white} />
          </Title>
        </View>
        <TextInput
          defaultValue={amount}
          style={styles.userInputNumber}
          editable={false}
          textAlign="center"
          placeholder="0"
          keyboardType="number-pad"
          onChangeText={value => setAmount(Number(value))}
          underlineColor="transparent"
          activeUnderlineColor="transparent"
          placeholderTextColor={colors.text}
        />
        <Text style={styles.balance}>
          Solde disponible : {user?.accounts[1]?.currentBalance}{' '}
          {`${user?.accounts[1]?.currencyIsoCode}`}
        </Text>
        <VirtualKeyboard
          onRef={ref => {
            return (keyboardRef.current = ref);
          }}
          keyStyle={styles.keyStyle}
          onChange={val => {
            if (val) {
              setAmount(val);
            } else {
              setAmount(0);
            }
          }}
          keyboard={keyboardSetting}
        />
      </View>
      <Button
        labelStyle={[{color: colors.white}, styles.labelStyle]}
        mode="contained"
        disabled={amount >= 1 ? false : true}
        onPress={() => navigate('SendTether', {amount})}
        style={styles.btn}
        theme={{roundness: 20}}>
        Suivant
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
  keyboardView: {
    paddingTop: 40,
  },
  btn: {
    width: Dimensions.get('window').width / 1.5,
    justifyContent: 'center',
    padding: 3,
    alignSelf: 'center',
    marginTop: 50,
  },
  viewCurrency: {
    borderWidth: 1,
    borderColor: '#bdc3c7',
    backgroundColor: '#bdc3c7',
    borderRadius: 20,
    width: 120,
    alignSelf: 'center',
    marginBottom: 40,
  },
  amount: {
    fontFamily: 'ProductSans-Bold',
    fontSize: 40,
    alignSelf: 'center',
    lineHeight: 50,
    marginBottom: 40,
  },
  userInputNumber: {
    fontSize: 40,
    fontFamily: 'ProductSans-Bold',
    color: 'black',
    borderBottomColor: 'transparent',
    borderBottomWidth: 0,
    backgroundColor: 'transparent',
    marginBottom: 30,
  },
  account: {
    fontFamily: 'ProductSans-Medium',
    fontSize: 25,
    alignSelf: 'center',
    alignItems: 'center',
    color: 'white',
  },
  keyStyle: {
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  balance: {
    fontFamily: 'ProductSans-Medium',
    alignSelf: 'center',
    fontSize: 20,
    marginBottom: 25,
  },
  keyTextStyle: {
    fontFamily: 'ProductSans-Bold',
    fontSize: 5,
  },
});

export default withTheme(SendCrypto);
