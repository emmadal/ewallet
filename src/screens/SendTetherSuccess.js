import React from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {
  Button,
  Text,
  Title,
  withTheme,
  Divider,
  Colors,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';

const SendTetherSuccess = ({theme, route}) => {
  const {navigate} = useNavigation();
  const {colors} = theme;

  return (
    <View style={styles.container}>
      <View>
        <Title style={styles.title}>Transaction réussie</Title>
        <View>
          <Icon
            style={styles.icon}
            name="check-circle"
            color={colors.primary}
            size={85}
          />
          <Divider style={styles.divider} />
          <View>
            <Title style={styles.amountTitle}>Montant transféré</Title>
            <Text style={[styles.amount, {color: colors.primary}]}>
              {route?.params?.cryptoAmount} USDT
            </Text>
            <Text style={styles.time}>{new Date().toGMTString()}</Text>
          </View>
        </View>
        <Button
          labelStyle={[{color: colors.white}, styles.labelStyle]}
          mode="contained"
          onPress={() => navigate('Home')}
          style={styles.btn}
          theme={{roundness: 20}}>
          Terminer
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 17,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 25,
    fontFamily: 'ProductSans-Bold',
    alignSelf: 'center',
    paddingVertical: 17,
  },
  error: {
    lineHeight: 30,
    height: 30,
    marginTop: 15,
  },
  icon: {
    alignSelf: 'center',
  },
  btn: {
    width: Dimensions.get('window').width / 1.5,
    justifyContent: 'center',
    padding: 3,
    alignSelf: 'center',
    marginTop: 50,
  },
  labelStyle: {
    fontFamily: 'ProductSans-Bold',
  },
  paragraph: {
    fontFamily: 'ProductSans-Bold',
    fontSize: 18,
  },
  amount: {
    fontFamily: 'ProductSans-Bold',
    fontSize: 30,
    textAlign: 'center',
    paddingVertical: 5,
  },
  amountTitle: {
    fontFamily: 'ProductSans-Bold',
    fontSize: 25,
    textAlign: 'center',
  },
  time: {
    fontFamily: 'ProductSans-Bold',
    textAlign: 'center',
  },
  divider: {
    borderWidth: 0.5,
    borderColor: Colors.grey500,
    marginVertical: 20,
  },
});

export default withTheme(SendTetherSuccess);
