import React, {useState, useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  View,
  StyleSheet,
  Platform,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {Avatar, withTheme, Title, Button} from 'react-native-paper';
import {UserContext} from '../context';
import Icon from 'react-native-vector-icons/Feather';
import {Transaction} from '../components/Transaction';
import {transactions} from '../data/transactions';

const Home = ({theme}) => {
  const [hideAmount, setHideAmount] = useState(false);
  const [seletedAccount, setSeletedAccount] = useState(0);
  const {user} = useContext(UserContext);
  const {colors} = theme;
  const {navigate} = useNavigation();

  const getFirstLetterOfName = () => {
    const matches = user?.fullName.match(/\b(\w)/g);
    return matches.join('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Avatar.Text
          size={40}
          label={getFirstLetterOfName()}
          color={colors.white}
        />
        <View style={styles.viewIcon}>
          <TouchableOpacity
            onPress={() => console.log('Notifications')}
            style={styles.icon}>
            <Icon name="bell" size={20} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.icon}
            onPress={() => navigate('Settings')}>
            <Icon name="settings" size={20} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.boxAmount}>
        <Title style={{color: colors.primary}}>
          Solde Disponible
          <TouchableOpacity
            style={styles.balanceIcon}
            onPress={() => setHideAmount(!hideAmount)}>
            <Icon
              name={hideAmount ? 'eye' : 'eye-off'}
              size={20}
              color={colors.primary}
            />
          </TouchableOpacity>{' '}
        </Title>
        <Title style={styles.amount}>
          {hideAmount
            ? '*'.repeat(5)
            : `${user?.accounts[seletedAccount]?.currentBalance} ${user?.accounts[seletedAccount]?.currencyIsoCode}`}{' '}
        </Title>
      </View>
      <View style={styles.viewBtn}>
        <Button
          icon="arrow-down"
          labelStyle={{color: colors.white}}
          mode="contained"
          onPress={() => console.log('Pressed')}>
          Retrait
        </Button>
        <Button
          icon="credit-card"
          labelStyle={{color: colors.white}}
          mode="contained"
          onPress={() => console.log('Pressed')}>
          Envoyer
        </Button>
      </View>
      <Title style={styles.transactionTitle}>Mes Transactions</Title>
      <FlatList
        data={transactions}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => console.log(item)}>
            <Transaction data={item} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 80 : 30,
  },
  amount: {
    fontFamily: 'ProductSans-Bold',
    fontSize: 25,
    alignSelf: 'center',
    textAlign: 'center',
    paddingTop: 10,
  },
  caption: {
    fontFamily: 'ProductSans-Bold',
    fontSize: 25,
    alignSelf: 'center',
    paddingTop: 25,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  viewBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 25,
    paddingHorizontal: 17,
  },
  viewIcon: {
    flexDirection: 'row',
  },
  icon: {
    marginHorizontal: 10,
  },
  boxAmount: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  transactionTitle: {
    marginLeft: 17,
    fontFamily: 'ProductSans-Medium',
    marginVertical: 13,
  },
  balanceIcon: {
    paddingLeft: 10,
  },
});

export default withTheme(Home);
