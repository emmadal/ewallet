import React from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import {withTheme, Title, Text, TextInput, Button} from 'react-native-paper';

const SendCrypto = ({theme}) => {
  const {colors} = theme;
  return (
    <View style={styles.container}>
      <TextInput
        mode="outlined"
        autoFocus={true}
        label="Wallet du beneficiaire"
        placeholder="Wallet du beneficiaire"
        style={styles.input}
      />
      <TextInput
        mode="outlined"
        autoFocus={true}
        label="Montant en XOF"
        placeholder="Montant en XOF"
        style={styles.input}
      />
      <TextInput
        disabled
        mode="outlined"
        label="Montant en USDT"
        placeholder="Montant en USDT"
        style={styles.input}
      />
      <Title style={styles.feeText}> Frais d'envoi = 500 XOF</Title>
      <Text style={styles.rate}>1 XOF = 0.97 USDT | 1 USDT = 500 XOF</Text>
      <Button
        labelStyle={[{color: colors.white}, styles.labelStyle]}
        mode="contained"
        onPress={() => console.log('Send crypto')}
        style={styles.btn}
        theme={{roundness: 20}}>
        Envoyer
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 17,
    backgroundColor: 'white',
    paddingTop: 40,
  },
  input: {
    marginVertical: 10,
  },
  feeText: {
    fontFamily: 'ProductSans-Medium',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 30,
  },
  btn: {
    width: Dimensions.get('window').width / 1.5,
    justifyContent: 'center',
    padding: 3,
    alignSelf: 'center',
    marginTop: 50,
  },
  rate: {
    textAlign: 'center',
    fontFamily: 'ProductSans-Light',
    fontSize: 15,
    marginTop: 30,
  },
});

export default withTheme(SendCrypto);
