import React, {
  useRef,
  useContext,
  useState,
  useCallback,
  useEffect,
} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Modal,
  TouchableOpacity,
} from 'react-native';
import {
  withTheme,
  Text,
  Title,
  Button,
  TextInput,
  Avatar,
  Caption,
  Paragraph,
} from 'react-native-paper';
import {VirtualKeyboard} from 'react-native-screen-keyboard';
import Loader from '../components/Loader';
import {UserContext} from '../context';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const SendTether = ({theme}) => {
  const {colors} = theme;
  const [amount, setAmount] = useState(0);
  const [xof, setXOF] = useState(0);
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

  const handleSendThether = () => {
    navigate('SendTetherSuccess', {
      recipientWallet: address,
      cryptoAmount: amount,
    });
    // setLoading(!loading);
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
        <Paragraph style={[{color: colors.primary}, styles.caption]}>
          Frais de transfert 1%
        </Paragraph>
      </View>
      <View style={styles.containerInput}>
        <TextInput
          style={styles.inputFlat}
          underlineColorAndroid="transparent"
          editable={false}
          mode="flat"
          label="USDT"
          right={<TextInput.Icon name="wallet-outline" />}
          value={amount}
          onChangeText={text => setAmount(Number(text))}
        />
        <TextInput
          style={styles.inputFlat}
          editable={false}
          mode="flat"
          label="XOF"
          value={String(xof)}
          onChangeText={text => setXOF(Number(text))}
          right={<TextInput.Icon name="wallet" />}
        />
        <TextInput
          style={styles.inputAddress}
          autoCapitalize="none"
          underlineColorAndroid="transparent"
          label="Coller l'adresse"
          value={address}
          onChangeText={text => setAddress(text)}
          right={<TextInput.Icon name="qrcode" />}
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
        disabled={amount >= 1 ? false : true}
        onPress={handleSendThether}
        style={styles.btn}
        theme={{roundness: 20}}>
        Envoyer
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
    backgroundColor: 'transparent',
    fontFamily: 'ProductSans-Bold',
    fontSize: 18,
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

export default withTheme(SendTether);
