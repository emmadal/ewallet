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
  Text,
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
      <View style={styles.containerHead}>
        <View style={styles.header}>
          <Avatar.Text
            size={35}
            label={getFirstLetterOfName()}
            color={colors.text}
            style={styles.avatar}
          />
          <View style={styles.viewIcon}>
            <TouchableOpacity
              onPress={() => navigate('Activity')}
              style={styles.icon}>
              <Icon name="bell" size={25} color={colors.white} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.icon}
              onPress={() => navigate('Settings')}>
              <Icon name="settings" size={25} color={colors.white} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.boxAmount}>
          <Title style={{color: colors.white}}>
            Solde Disponible
            <TouchableOpacity
              style={styles.balanceIcon}
              onPress={() => setHideAmount(!hideAmount)}>
              <Icon
                name={hideAmount ? 'eye' : 'eye-off'}
                size={20}
                color={colors.white}
              />
            </TouchableOpacity>{' '}
          </Title>
          <TouchableOpacity onPress={toggleBottomSheet}>
            <Title style={styles.amount}>
              {hideAmount
                ? '*'.repeat(5)
                : `${user?.accounts[seletedAccount]?.currentBalance} ${user?.accounts[seletedAccount]?.currencyIsoCode}`}{' '}
              <Icon
                name={openOptions ? 'chevron-up' : 'chevron-down'}
                size={23}
                color={colors.white}
              />
            </Title>
          </TouchableOpacity>
        </View>
        <View style={styles.viewBtn}>
          <View style={styles.btn}>
            <Button
              compact={true}
              icon="arrow-top-right"
              labelStyle={styles.labelStyle}
              contentStyle={styles.contentStyle}
              mode="contained"
              onPress={() => navigate('SendCrypto')}
              theme={{roundness: 10}}
            />
            <Text style={styles.btnText}>Envoyer</Text>
          </View>
          <View style={styles.btn}>
            <Button
              compact={true}
              contentStyle={styles.contentStyle}
              icon="arrow-bottom-right"
              labelStyle={styles.labelStyle}
              mode="contained"
              onPress={() => console.log('Pressed')}
              theme={{roundness: 10}}
            />
            <Text style={styles.btnText}>Retirer</Text>
          </View>

          <View style={styles.btn}>
            <Button
              icon="sync"
              contentStyle={styles.contentStyle}
              compact={true}
              labelStyle={styles.labelStyle}
              mode="contained"
              onPress={() => console.log('Pressed')}
              theme={{roundness: 10}}
            />
            <Text style={styles.btnText}>Convertir</Text>
          </View>
        </View>
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
  },
  containerHead: {
    backgroundColor: '#44bd32',
    paddingTop: Platform.OS === 'ios' ? 75 : 30,
    paddingBottom: 30,
  },
  btn: {
    flexDirection: 'column',
  },
  btnText: {
    color: 'white',
    fontFamily: 'ProductSans-Bold',
  },
  amount: {
    fontFamily: 'ProductSans-Bold',
    fontSize: 23,
    alignSelf: 'center',
    marginTop: 10,
    color: 'white',
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
    justifyContent: 'space-around',
    marginTop: 25,
    paddingHorizontal: 10,
    paddingTop: 15,
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
    paddingTop: 15,
  },
  transactionTitle: {
    marginLeft: 17,
    fontFamily: 'ProductSans-Bold',
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
  labelStyle: {
    color: '#000',
    fontFamily: 'ProductSans-Bold',
  },
  contentStyle: {
    backgroundColor: 'white',
  },
  avatar: {
    backgroundColor: 'white',
  },
});

export default withTheme(Home);
