import React, {
  useRef,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Modal,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  withTheme,
  Text,
  Paragraph,
  Button,
  TextInput,
  Avatar,
} from 'react-native-paper';
import {VirtualKeyboard} from 'react-native-screen-keyboard';
import Loader from '../components/Loader';
import {UserContext} from '../context';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {MINIMUM_AMOUNT} from '../api/env';

const Deposit = ({theme}) => {
  const {colors} = theme;
  const [amount, setAmount] = useState(0);
  const [eth, setEth] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [address, setAddress] = useState('');
  const keyboardRef = useRef(null);
  const {user} = useContext(UserContext);
  const {navigate} = useNavigation();

  const keyboardSetting = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    ['', 0, <Icon name={'arrow-back-outline'} color={colors.text} size={35} />],
  ];

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
          value={amount}
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
          value={user?.walletAddress?.address}
          onChangeText={text => setAddress(text)}
          right={<TextInput.Icon name="clipboard" />}
        />
      </View>
      <View style={styles.keyboardView}>
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
        onPress={handleDepositThether}
        style={styles.btn}
        theme={{roundness: 20}}>
        Faire le depot
      </Button>
      {renderModal()}
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
