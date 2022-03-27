import React, {useState, useRef} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {Text, withTheme, Button} from 'react-native-paper';
import PhoneInput from 'react-native-phone-number-input';

const OnboardingPhone = ({theme, navigation}) => {
  const [phoneValue, setPhoneValue] = useState('');
  const [country, setCountry] = useState(null);
  const [formattedValue, setFormattedValue] = useState('');
  const phoneInput = useRef(null);
  const {colors} = theme;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Bienvenue sur eWallet</Text>
      <Text style={styles.subtitle}>
        Veuillez entre votre numéro de telephone
      </Text>
      <PhoneInput
        ref={phoneInput}
        defaultValue={phoneValue}
        layout="first"
        onChangeText={text => setPhoneValue(text)}
        containerStyle={styles.phoneInputStyle}
        onChangeFormattedText={text => setFormattedValue(text)}
        onChangeCountry={({name, currency}) =>
          setCountry({name, currency: currency[0]})
        }
        withShadow={true}
        autoFocus
      />
      <Button
        disabled={phoneInput?.current?.isValidNumber(phoneValue) ? false : true}
        labelStyle={[{color: colors.white}, styles.labelStyle]}
        onPress={() =>
          navigation.navigate('OnboardingUserName', {
            phoneNumber: formattedValue,
            country: country?.name,
            currency: country?.currency,
          })
        }
        style={styles.btn}
        mode="contained"
        theme={{roundness: 20}}>
        Suivant
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  phoneInputStyle: {
    marginHorizontal: 30,
    width: 'auto',
    marginTop: 15,
    fontFamily: 'ProductSans-Regular',
  },
  header: {
    textAlign: 'center',
    fontSize: 23,
    fontFamily: 'ProductSans-Bold',
  },
  subtitle: {
    textAlign: 'center',
    fontFamily: 'ProductSans-Light',
  },
  btn: {
    width: Dimensions.get('window').width / 2,
    padding: 4,
    alignSelf: 'center',
    marginTop: 30,
  },
  labelStyle: {
    fontFamily: 'ProductSans-Medium',
    fontSize: 18,
  },
});

export default withTheme(OnboardingPhone);
