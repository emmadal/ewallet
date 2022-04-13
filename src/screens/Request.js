import React, {useContext, useState, useCallback, useEffect} from 'react';
import {StyleSheet, View, Dimensions, Modal, Alert} from 'react-native';
import {
  withTheme,
  Text,
  Button,
  TextInput,
  Avatar,
  Paragraph,
  Title,
  Divider,
  Colors,
} from 'react-native-paper';
import Loader from '../components/Loader';
import {UserContext} from '../context';
import Icon from 'react-native-vector-icons/AntDesign';
import {getUser, sentRequest} from '../api';

const Request = ({theme}) => {
  const {colors} = theme;
  const [amount, setAmount] = useState(0);
  const [payee, setPayee] = useState('');
  const [notes, setNotes] = useState(null);
  const [xof, setXOF] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const {user} = useContext(UserContext);
  const {address} = user.accounts[1].address;

  const handleCloseModalSuccess = () => {
    setShowModal(false);
    setAmount(0);
    setPayee('');
    setNotes('');
  };

  const renderModal = () => {
    return (
      <Modal
        animationType="slide"
        style={styles.modal}
        transparent={false}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}>
        <View style={styles.modalContent}>
          <Title style={styles.modaltitle}>Requêtte envoyée</Title>
          <View>
            <Icon
              style={styles.icon}
              name="checkcircle"
              color={colors.primary}
              size={85}
            />
            <Divider style={styles.divider} />
            <View style={styles.footerModal}>
              <Title style={styles.amountTitle}>
                Vous avez envoyé une requette de paiement
              </Title>
              <Text style={[styles.amount, {color: colors.primary}]}>
                {amount} USDT
              </Text>
              <Text style={styles.time}>{new Date().toGMTString()}</Text>
            </View>
          </View>
          <Button
            labelStyle={[{color: colors.white}, styles.labelStyle]}
            mode="contained"
            onPress={handleCloseModalSuccess}
            style={styles.btn}
            theme={{roundness: 20}}>
            Terminer
          </Button>
        </View>
      </Modal>
    );
  };

  const handleSendThether = useCallback(async () => {
    setLoading(!loading);
    if (payee.trim() === user?.fullName) {
      setLoading(false);
      Alert.alert(
        "Vous n'êtes pas autorisé à vous envoyer une demande de paiment",
      );
    } else {
      const recipient = await getUser(payee.trim());
      if (recipient) {
        const data = {
          id: new Date().getTime(),
          status: 'unpaid',
          senderAddress: address,
          senderPhone: user?.phoneNumber,
          senderUserFullName: user?.fullName,
          senderPhotoURL: user?.photoURL,
          created_at: new Date(),
          senderAmount: amount,
          senderNote: notes ?? 'Pouvez vous recharger mon compte SVP',
        };
        const e = await sentRequest(data, recipient.uid, user?.uid);
        if (e) {
          setLoading(false);
          setShowModal(!showModal);
        }
      } else {
        setLoading(false);
        Alert.alert('Utilisateur introuvable');
      }
    }
  }, [
    address,
    amount,
    loading,
    notes,
    payee,
    showModal,
    user?.fullName,
    user?.phoneNumber,
    user?.photoURL,
    user?.uid,
  ]);

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
      </View>
      <View style={styles.containerInput}>
        <TextInput
          style={styles.inputFlat}
          underlineColorAndroid="transparent"
          keyboardType="number-pad"
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
          right={<TextInput.Icon name="wallet-outline" />}
        />
        <TextInput
          style={styles.inputAddress}
          autoCapitalize="none"
          underlineColorAndroid="transparent"
          label="Nom du destinataire"
          value={payee}
          onChangeText={text => setPayee(text)}
          right={<TextInput.Icon name="account-circle-outline" />}
        />
        <TextInput
          style={styles.inputAddress}
          autoCapitalize="none"
          underlineColorAndroid="transparent"
          label="Note (optionnel)"
          value={notes}
          onChangeText={text => setNotes(text)}
          right={<TextInput.Icon name="book-outline" />}
        />
        <TextInput
          style={styles.inputAddress}
          autoCapitalize="none"
          underlineColorAndroid="transparent"
          label="Votre adresse"
          value={address}
          right={<TextInput.Icon name="qrcode" />}
        />
      </View>
      <Button
        labelStyle={[{color: colors.white}, styles.labelStyle]}
        mode="contained"
        disabled={amount >= 1 && payee ? false : true}
        onPress={handleSendThether}
        style={styles.btn}
        theme={{roundness: 20}}>
        Envoyer la demande
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
  footerModal: {
    marginTop: 30,
  },
  modalContent: {
    marginTop: 70,
    padding: 20,
    position: 'relative',
    display: 'flex',
  },
  modalContentClose: {
    top: 20,
    alignItems: 'flex-end',
    height: 70,
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
  modaltitle: {
    fontSize: 25,
    fontFamily: 'ProductSans-Bold',
    alignSelf: 'center',
    paddingVertical: 17,
  },
  divider: {
    borderWidth: 0.5,
    borderColor: Colors.grey500,
    marginVertical: 20,
  },
  caption: {
    fontSize: 15,
    fontFamily: 'ProductSans-Bold',
    textAlign: 'center',
  },
  inputFlat: {
    marginVertical: 5,
    backgroundColor: 'transparent',
    fontFamily: 'ProductSans-Bold',
    fontSize: 18,
  },
  inputAddress: {
    marginVertical: 10,
    backgroundColor: 'transparent',
    fontFamily: 'ProductSans-Bold',
    fontSize: 18,
  },
  btn: {
    width: Dimensions.get('window').width / 1.5,
    justifyContent: 'center',
    padding: 3,
    alignSelf: 'center',
    marginTop: 20,
  },
  icon: {
    alignSelf: 'center',
    marginVertical: 15,
  },
  time: {
    fontFamily: 'ProductSans-Bold',
    marginVertical: 15,
    textAlign: 'center',
  },
  amount: {
    fontFamily: 'ProductSans-Bold',
    fontSize: 30,
    textAlign: 'center',
    marginVertical: 20,
  },
  amountTitle: {
    fontFamily: 'ProductSans-Bold',
    fontSize: 25,
    textAlign: 'center',
  },
  labelStyle: {
    fontFamily: 'ProductSans-Bold',
  },
});

export default withTheme(Request);
