import React, {useState, useContext, useRef, useCallback, useMemo} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  View,
  StyleSheet,
  Platform,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import BottomSheet, {BottomSheetFlatList} from '@gorhom/bottom-sheet';
import {
  Avatar,
  withTheme,
  Title,
  Button,
  RadioButton,
} from 'react-native-paper';
import {UserContext} from '../context';
import Icon from 'react-native-vector-icons/Feather';
import {Transaction} from '../components/Transaction';
import {RenderEmpty} from '../components/RenderEmpty';

const Home = ({theme}) => {
  const [hideAmount, setHideAmount] = useState(false);
  const [seletedAccount, setSeletedAccount] = useState(0);
  const {user} = useContext(UserContext);
  const {colors} = theme;
  const {navigate} = useNavigation();
  const [openOptions, setOptions] = useState(false);
  const [indexBottomRef, setIndexBottomRef] = useState(-1);

  const getFirstLetterOfName = () => user?.fullName.match(/\b(\w)/g).join('');

  //BottomSheet ref
  const bottomSheetRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ['25%'], []);

  const handleSheetChanges = useCallback(
    index => {
      if (index === -1 && openOptions) {
        setOptions(!openOptions);
      }
    },
    [openOptions],
  );

  const toggleBottomSheet = () => {
    if (openOptions) {
      bottomSheetRef.current?.close();
    } else {
      bottomSheetRef.current?.expand();
    }
    setOptions(!openOptions);
  };

  const selectAccount = e => setSeletedAccount(e?.id - 1);

  // render
  const renderItem = useCallback(
    ({item}) => (
      <RadioButton.Group
        onValueChange={() => selectAccount(item)}
        value={item}
        style={styles.itemContainer}>
        <View style={styles.itemRender}>
          <RadioButton.Item
            label={item?.accountName}
            value={item?.currencyIsoCode}
            status="checked"
            color={colors.primary}
            labelStyle={styles.renderLabel}
          />
        </View>
      </RadioButton.Group>
    ),
    [colors.primary],
  );

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
          <TouchableOpacity onPress={toggleBottomSheet}>
            <Icon
              name={openOptions ? 'chevron-up' : 'chevron-down'}
              size={23}
              color={colors.text}
            />
          </TouchableOpacity>
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
        data={user?.accounts[seletedAccount]?.balances}
        ListEmptyComponent={RenderEmpty}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => console.log(item)}>
            <Transaction data={item} />
          </TouchableOpacity>
        )}
      />
      <BottomSheet
        enablePanDownToClose={true}
        ref={bottomSheetRef}
        index={indexBottomRef}
        onChange={handleSheetChanges}
        snapPoints={snapPoints}>
        <BottomSheetFlatList
          data={user?.accounts}
          keyExtractor={i => i.id}
          renderItem={renderItem}
          contentContainerStyle={styles.contentContainer}
        />
      </BottomSheet>
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
    fontSize: 23,
    alignSelf: 'center',
    marginTop: 10,
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
  itemContainer: {
    flex: 1,
  },
  itemRender: {
    paddingHorizontal: 20,
  },
  renderLabel: {
    fontFamily: 'ProductSans-Bold',
    fontSize: 18,
  },
  contentContainer: {
    backgroundColor: 'white',
  },
});

export default withTheme(Home);
