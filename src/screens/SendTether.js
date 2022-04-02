import React, {useRef, useContext, useState} from 'react';
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
} from 'react-native-paper';
import {VirtualKeyboard} from 'react-native-screen-keyboard';
import Loader from '../components/Loader';
import {UserContext} from '../context';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const SendTether = ({theme}) => {
  const {colors} = theme;
  const [amount, setAmount] = useState(0);
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
    [
      '',
      0,
      <Icon name={'arrow-back-outline'} color={colors.black} size={35} />,
    ],
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

  return (
    <View style={styles.container}>
      <Loader loading={loading} />
      <View style={styles.containerLogo}>
        <Avatar.Image
          size={50}
          source={require('../assets/tether-logo.png')}
          style={styles.logo}
        />
        <Title style={styles.title}>Envoyer du Tether</Title>
        <Caption style={styles.caption}>
          Entrer le montant que vous voulez envoyer
        </Caption>
      </View>
      <View style={styles.containerInput}>
        <TextInput
          style={styles.inputFlat}
          editable={false}
          mode="flat"
          label="ETH"
          right={<TextInput.Icon name="wallet-outline" />}
          value={amount}
          onChangeText={text => setAmount(Number(text))}
        />
        <TextInput
          style={styles.inputFlat}
          editable={false}
          mode="flat"
          label="XOF"
          right={<TextInput.Icon name="wallet" />}
        />
        <TextInput
          style={styles.inputAddress}
          autoCapitalize="none"
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
    fontFamily: 'ProductSans-Light',
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
