import React, {useContext, useEffect, useState, useCallback} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  FlatList,
  Modal,
} from 'react-native';
import {
  withTheme,
  Avatar,
  Title,
  Colors,
  Paragraph,
  Caption,
  Button,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {UserContext} from '../context';
import {getRequests} from '../api';

const Activity = ({theme}) => {
  const {colors} = theme;
  const {navigate} = useNavigation();
  const [request, setRequest] = useState([]);
  const [data, setData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const {user} = useContext(UserContext);

  const getFirstLetterOfName = name => name.match(/\b(\w)/g).join('');

  useEffect(() => {
    const handleRequest = async () => {
      const req = await getRequests(user?.uid);
      setRequest(req);
    };
    handleRequest();
  }, [user?.uid]);

  const handlePay = useCallback(() => {
    setShowModal(false);
    navigate('SendTether', {
      senderAddress: data?.senderAddress,
      senderAmount: data?.senderAmount,
    });
  }, [data?.senderAddress, data?.senderAmount, navigate]);

  const renderModal = () => {
    return (
      <Modal
        animationType="slide"
        style={styles.modal}
        transparent={false}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}>
        <View style={styles.modalContent}>
          <View style={styles.modalContentClose}>
            <TouchableOpacity onPress={() => setShowModal(!showModal)}>
              <Icon name="close-outline" size={50} color={colors.text} />
            </TouchableOpacity>
          </View>
          <View>
            <Title style={styles.info}>
              {data?.type === 'Sent'
                ? `Destinataire : ${data?.payeeUsername}`
                : `Requérant : ${data?.senderUserFullName}`}
            </Title>
            <Title style={styles.info}>
              Montant : {data?.senderAmount} USDT
            </Title>
            <Title
              style={[
                styles.info,
                data?.status === 'unpaid'
                  ? {color: colors.danger}
                  : {color: colors.primary},
              ]}>
              Status : {data?.status === 'unpaid' ? 'Non payé' : 'Soldé'}
            </Title>
            <Title style={styles.info}>Notes: {data?.senderNote}</Title>
            <Paragraph style={[styles.paragraph, {color: colors.primary}]}>
              {data?.type === 'Sent'
                ? 'Vous avez envoyé une requette de paiement'
                : 'Vous avez reçu une demande de paiement'}
            </Paragraph>
            {data?.type === 'Receive' ? (
              <Button
                labelStyle={[{color: colors.white}, styles.labelStyle]}
                mode="contained"
                onPress={handlePay}
                style={styles.btn}
                theme={{roundness: 5}}>
                Procéder au paiement
              </Button>
            ) : null}
            {data?.status === 'unpaid' ? null : (
              <Icon
                color={colors.primary}
                name="checkmark-done"
                size={60}
                style={styles.icon}
              />
            )}
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={request}
        key={item => item._data?.id}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.pressable}
            onPress={() => {
              setData(item._data);
              setShowModal(!showModal);
            }}>
            <View style={styles.userInfo}>
              <Avatar.Text
                color={colors.white}
                size={60}
                label={
                  item._data.type === 'Sent'
                    ? getFirstLetterOfName(item._data.payeeUsername)
                    : getFirstLetterOfName(item._data.senderUserFullName)
                }
                style={styles.avatar}
              />
              <View style={styles.senderUser}>
                <Title>
                  {item._data.type === 'Sent'
                    ? item._data.payeeUsername
                    : item._data.senderUserFullName}
                </Title>
                <Caption style={{color: colors.danger}}>
                  {item._data.type === 'Sent'
                    ? 'Demande de paiement envoyée'
                    : 'Demande de paiement reçue'}
                </Caption>
              </View>
            </View>
            <Title style={styles.amount}>{item._data.senderAmount} USDT</Title>
          </TouchableOpacity>
        )}
      />
      {renderModal()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 7,
  },
  pressable: {
    borderWidth: 1,
    borderColor: Colors.grey300,
    backgroundColor: Colors.grey300,
    borderRadius: 9,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  senderUser: {
    marginLeft: 15,
    fontFamily: 'ProductSans-Bold',
  },
  amount: {
    fontFamily: 'ProductSans-Bold',
  },
  modal: {
    position: 'relative',
    backgroundColor: '#fff',
  },
  modalContent: {
    marginTop: 40,
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
    marginBottom: 30,
    fontFamily: 'ProductSans-Bold',
    textAlign: 'center',
  },
  info: {
    fontSize: 28,
    fontFamily: 'ProductSans-Medium',
    marginVertical: 20,
  },
  paragraph: {
    textAlign: 'center',
    fontSize: 17,
    marginTop: 50,
    fontFamily: 'ProductSans-Medium',
  },
  icon: {
    alignSelf: 'center',
  },
  labelStyle: {
    fontFamily: 'ProductSans-Bold',
    fontSize: 14,
  },
  btn: {
    justifyContent: 'center',
    padding: 3,
    alignSelf: 'center',
    marginTop: 40,
  },
});

export default withTheme(Activity);
