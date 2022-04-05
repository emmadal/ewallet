import React, {
  useRef,
  useContext,
  useState,
  useCallback,
  useEffect,
  useMemo,
} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Modal,
  TouchableOpacity,
  Alert,
  Pressable,
  Image,
} from 'react-native';
import {
  withTheme,
  Text,
  Button,
  Title,
  TextInput,
  Avatar,
  Paragraph,
} from 'react-native-paper';
import BottomSheet, {BottomSheetFlatList} from '@gorhom/bottom-sheet';
import Loader from '../components/Loader';
import {UserContext} from '../context';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {payments} from '../data/payments';

const WithDrawal = ({theme}) => {
  const {colors} = theme;
  const [amount, setAmount] = useState(0);
  const [xof, setXOF] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const {user} = useContext(UserContext);
  const [checked, setChecked] = useState({});
  const [openOptions, setOptions] = useState(false);
  const [indexBottomRef, setIndexBottomRef] = useState(-1);
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber ?? '');
  const [cardNumber, setCardNumber] = useState('');
  const {navigate} = useNavigation();

  //BottomSheet ref
  const bottomSheetRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ['25%', '45%', '60%'], []);

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

  const handleMethod = item => setChecked(item);

  // render
  const renderItem = useCallback(
    ({item}) => (
      <Pressable
        key={item.id}
        style={styles.rows}
        onPress={() => handleMethod(item)}>
        <Image style={styles.img} source={item.logo} />
        <Icon
          name={
            item.id === checked.id
              ? 'checkmark-circle-outline'
              : 'radio-button-off-outline'
          }
          size={40}
          color={item.id === checked.id ? colors.primary : colors.text}
        />
      </Pressable>
    ),
    [checked.id, colors.primary, colors.text],
  );

  const renderModal = () => {
    return (
      <Modal
        animationType="fade"
        style={styles.modal}
        transparent={false}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}>
        <View style={styles.modalContent}>
          <View style={styles.modalContentClose}>
            <TouchableOpacity onPress={() => setShowModal(false)}>
              <Icon name="close-outline" size={40} color={colors.black} />
            </TouchableOpacity>
          </View>
          <>
            <Text>common.helpquestion</Text>
            <>
              <View style={styles.card}>
                <Text>common.forgotpasscode</Text>
              </View>
              <View style={styles.card}>
                <Text>common.contactus</Text>
              </View>
              <View style={styles.card}>
                <Text>common.paymentissuetext</Text>
              </View>
            </>
          </>
        </View>
      </Modal>
    );
  };

  const handleWithDraw = () => {
    if (amount && checked?.name) {
      if (checked?.name === 'Wave') {
        Alert.alert('Retrait avec wave');
      }
      if (checked?.name === 'Orange Money') {
        Alert.alert('Retrait avec Orange Money');
      }
      if (checked?.name === 'Airtel Money') {
        Alert.alert('Retrait avec Airtel Money');
      }
      if (checked?.name === 'Credit Card') {
        Alert.alert(`Le numero de la carte est ${cardNumber}`);
      }
    }
  };

  const handleFees = useCallback(() => {
    const USDTXOF = 590;
    const fees = 0.01;
    const USDTXOFWithAmount = USDTXOF * amount;
    const total = USDTXOFWithAmount + fees * USDTXOFWithAmount;
    setXOF(total);
  }, [amount]);

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
        <Paragraph style={styles.caption}>1 USDT = 590 XOF</Paragraph>
        <Title style={[styles.caption, {color: colors.danger}]}>
          Solde principal = {`${user?.walletAddress?.final_balance} USDT`}
        </Title>
      </View>
      <View style={styles.containerInput}>
        <Title style={styles.methodTitle}>Montant a retirer</Title>
        <TextInput
          style={styles.inputFlat}
          underlineColorAndroid="transparent"
          label="USDT"
          mode="outlined"
          placeholder="Entrer le montant"
          right={<TextInput.Icon name="wallet-outline" />}
          value={amount}
          onChangeText={text => setAmount(Number(text))}
        />
        <TextInput
          style={styles.inputFlat}
          editable={false}
          underlineColorAndroid="transparent"
          label="Montant a recevoir"
          mode="outlined"
          value={String(xof)}
          onChangeText={text => setXOF(Number(text))}
          right={<TextInput.Icon name="wallet" />}
        />
        <Title style={styles.methodTitle}>Methode de retrait</Title>
        <TextInput
          style={styles.inputFlat}
          editable={false}
          onPressIn={toggleBottomSheet}
          underlineColorAndroid="transparent"
          label="Choisir la methode"
          placeholder="Choisir la methode"
          value={checked?.name ?? ''}
          mode="outlined"
          right={<TextInput.Icon name="chevron-right" />}
        />
        <TextInput
          style={styles.inputFlat}
          underlineColorAndroid="transparent"
          label={
            checked?.name === 'Credit Card'
              ? 'Numéro de la carte'
              : 'Numéro du compte'
          }
          mode="outlined"
          onChangeText={text => {
            checked?.name === 'Credit Card'
              ? setCardNumber(text)
              : setPhoneNumber(text);
          }}
          value={checked?.name === 'Credit Card' ? cardNumber : phoneNumber}
          right={
            <TextInput.Icon
              name={checked?.name === 'Credit Card' ? 'credit-card' : 'phone'}
            />
          }
        />
      </View>
      <Button
        labelStyle={[{color: colors.white}, styles.labelStyle]}
        mode="contained"
        onPress={handleWithDraw}
        style={styles.btn}
        theme={{roundness: 20}}>
        Retirer
      </Button>
      <BottomSheet
        enablePanDownToClose={true}
        ref={bottomSheetRef}
        index={indexBottomRef}
        onChange={handleSheetChanges}
        snapPoints={snapPoints}>
        <BottomSheetFlatList
          data={payments}
          keyExtractor={i => i.id}
          renderItem={renderItem}
          contentContainerStyle={styles.contentContainer}
        />
      </BottomSheet>
      {renderModal()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 17,
  },
  logo: {
    marginBottom: 10,
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
  caption: {
    fontSize: 15,
    fontFamily: 'ProductSans-Bold',
    textAlign: 'center',
  },
  inputFlat: {
    fontFamily: 'ProductSans-Bold',
    fontSize: 18,
    marginVertical: 10,
  },
  inputAddress: {
    marginTop: 10,
    backgroundColor: 'transparent',
    fontFamily: 'ProductSans-Bold',
    fontSize: 18,
  },
  img: {
    height: 60,
    width: 60,
  },
  btn: {
    width: Dimensions.get('window').width / 1.5,
    justifyContent: 'center',
    padding: 3,
    alignSelf: 'center',
    marginTop: 20,
  },
  rows: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#f5f6fa',
    borderColor: '#f5f6fa',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 20,
    marginVertical: 10,
    padding: 5,
    marginHorizontal: 15,
  },
  methodTitle: {
    marginTop: 15,
    fontFamily: 'ProductSans-Bold',
  },
});

export default withTheme(WithDrawal);
