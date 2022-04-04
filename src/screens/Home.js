import React, {useState, useContext, useRef, useCallback, useMemo} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  View,
  StyleSheet,
  Platform,
  TouchableOpacity,
  FlatList,
  Modal,
} from 'react-native';
// import BottomSheet, {BottomSheetFlatList} from '@gorhom/bottom-sheet';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  Avatar,
  withTheme,
  Title,
  Button,
  Checkbox,
  Text,
} from 'react-native-paper';
import {UserContext} from '../context';
// import {Transaction} from '../components/Transaction';
// import {RenderEmpty} from '../components/RenderEmpty';

const Home = ({theme}) => {
  const [hideAmount, setHideAmount] = useState(false);
  // const [checked, setChecked] = useState('XOF');
  const [showModal, setModal] = useState(false);
  // const [seletedAccount, setSeletedAccount] = useState(0);
  const {user} = useContext(UserContext);
  const {colors} = theme;
  const {navigate} = useNavigation();
  const [openOptions, setOptions] = useState(false);
  const [indexBottomRef, setIndexBottomRef] = useState(-1);

  const getFirstLetterOfName = () => user?.fullName.match(/\b(\w)/g).join('');

  //BottomSheet ref
  const bottomSheetRef = useRef(null);

  // variables
  // const snapPoints = useMemo(() => ['25%'], []);

  // const handleSheetChanges = useCallback(
  //   index => {
  //     if (index === -1 && openOptions) {
  //       setOptions(!openOptions);
  //     }
  //   },
  //   [openOptions],
  // );

  const toggleBottomSheet = () => {
    if (openOptions) {
      bottomSheetRef.current?.close();
    } else {
      bottomSheetRef.current?.expand();
    }
    setOptions(!openOptions);
  };

  // const selectAccount = e => {
  //   setChecked(e?.currencyIsoCode);
  //   setSeletedAccount(e?.id - 1);
  // };

  // render
  // const renderItem = useCallback(
  //   ({item}) => (
  //     <View style={styles.itemRender}>
  //       <Checkbox.Item
  //         onPress={() => selectAccount(item)}
  //         label={item?.currencyIsoCode}
  //         value={item?.currencyIsoCode}
  //         status={checked === item?.currencyIsoCode ? 'checked' : 'unchecked'}
  //         color={colors.primary}
  //         labelStyle={styles.renderLabel}
  //       />
  //     </View>
  //   ),
  //   [checked, colors.primary],
  // );

  //render Modal
  const renderModal = () => {
    return (
      <Modal
        animationType="slide"
        style={styles.modal}
        transparent={false}
        visible={showModal}
        onRequestClose={() => setModal(false)}>
        <View style={styles.modalContent}>
          <View style={styles.modalContentClose}>
            <TouchableOpacity onPress={() => setModal(false)}>
              <Icon name="close-outline" size={50} color={colors.black} />
            </TouchableOpacity>
          </View>
          <Title style={[{color: colors.danger}, styles.modalText]}>
            Votre compte n'est pas encore actif pour bénéficier de tout les
            services. Veuillez confirmer votre identité ou KYC dans le menu
            CONFIRMATION D'IDENTITE et patienter pour la vérification du compte.
          </Title>
        </View>
      </Modal>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerHead}>
        <View style={styles.header}>
          {user?.photoURL ? (
            <Avatar.Image
              size={60}
              source={{
                uri: user?.photoURL,
              }}
            />
          ) : (
            <Avatar.Text
              color={colors.primary}
              size={60}
              label={getFirstLetterOfName()}
              style={styles.avatar}
            />
          )}
          <View style={styles.viewIcon}>
            <TouchableOpacity
              onPress={() => navigate('Activity')}
              style={styles.icon}>
              <Icon name="notifications" size={25} color={colors.white} />
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
          <Title style={styles.amount}>
            {hideAmount
              ? '*'.repeat(5)
              : `${user?.walletAddress?.final_balance} USDT`}{' '}
          </Title>
        </View>
        <View style={styles.viewBtn}>
          <View style={styles.btn}>
            <Button
              compact={true}
              icon="arrow-top-right"
              labelStyle={styles.labelStyle}
              contentStyle={styles.contentStyle}
              mode="contained"
              onPress={() =>
                user?.isActive ? navigate('SendTether') : setModal(!showModal)
              }
              theme={{roundness: 10}}
            />
            <Text style={styles.btnText}>Envoyer</Text>
          </View>
          <View style={styles.btn}>
            <Button
              compact={true}
              icon="wallet"
              labelStyle={styles.labelStyle}
              contentStyle={styles.contentStyle}
              mode="contained"
              onPress={() =>
                user?.isActive ? navigate('Deposit') : setModal(!showModal)
              }
              theme={{roundness: 10}}
            />
            <Text style={styles.btnText}>Dépot</Text>
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
            <Text style={styles.btnText}>Vendre</Text>
          </View>
        </View>
      </View>
      <Title style={styles.transactionTitle}>Mes Transactions</Title>
      {/* <FlatList
        data={user?.accounts[seletedAccount]?.balances}
        ListEmptyComponent={RenderEmpty}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => console.log(item)}>
            <Transaction data={item} />
          </TouchableOpacity>
        )}
      /> */}
      {/* <BottomSheet
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
      </BottomSheet> */}
      {renderModal()}
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
    color: 'black',
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
  modal: {
    position: 'relative',
    backgroundColor: '#fff',
  },
  modalContent: {
    marginTop: 30,
    padding: 20,
    position: 'relative',
    display: 'flex',
  },
  modalContentClose: {
    top: 20,
    alignItems: 'flex-end',
    height: 70,
  },
  modalText: {
    marginTop: 50,
    fontFamily: 'ProductSans-Bold',
  },
});

export default withTheme(Home);
