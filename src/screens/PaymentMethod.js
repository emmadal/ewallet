import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Modal,
  TouchableOpacity,
  Pressable,
  Image,
  ScrollView,
} from 'react-native';
import {withTheme, Title, Button} from 'react-native-paper';
import {CreditCardInput} from 'react-native-credit-card-input';
import Loader from '../components/Loader';
import Icon from 'react-native-vector-icons/Ionicons';
import {payments} from '../data/payments';

const PaymentMethod = ({theme, route}) => {
  const {colors} = theme;
  const [checked, setChecked] = useState({});
  const [loading, setLoading] = useState(false);
  const [showModal, setModal] = useState(false);
  const [bankLink, setBankLink] = useState({});

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
          <View style={styles.modalCreditCard}>
            <Title style={[{color: colors.danger}, styles.modalText]}>
             Remplissez les champs suivants
            </Title>
            <CreditCardInput
              requiresName={true}
              onChange={item => setBankLink(item)}
            />
            <Button
              labelStyle={[{color: colors.white}, styles.labelStyle]}
              mode="contained"
              onPress={handleVerifyMethod}
              style={styles.btn}
              theme={{roundness: 20}}>
              Procéder au paiement
            </Button>
          </View>
        </View>
      </Modal>
    );
  };

  const handleVerifyMethod = () => {
    if (checked.name === 'Credit Card') {
      setModal(!showModal);
    }
  };

  const handleMethod = item => setChecked(item);

  return (
    <ScrollView
      style={styles.container}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}>
      <Loader loading={loading} />
      <Title style={styles.title}>Choisir une méthode de paiement</Title>
      {payments.map(item => (
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
      ))}
      <Button
        labelStyle={[{color: colors.white}, styles.labelStyle]}
        mode="contained"
        onPress={handleVerifyMethod}
        style={styles.btn}
        theme={{roundness: 20}}>
        Selectionner
      </Button>

      {renderModal()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 17,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 21,
    fontFamily: 'ProductSans-Bold',
    textAlign: 'center',
    paddingVertical: 40,
  },
  btn: {
    width: Dimensions.get('window').width / 1.5,
    justifyContent: 'center',
    padding: 3,
    alignSelf: 'center',
    marginTop: 40,
  },
  labelStyle: {
    fontFamily: 'ProductSans-Bold',
    fontSize: 14,
  },
  img: {
    height: 80,
    width: 80,
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
    padding: 7,
  },
  modal: {
    position: 'relative',
    backgroundColor: '#fff',
  },
  modalContent: {
    marginTop: 4,
    padding: 20,
    position: 'relative',
    display: 'flex',
  },
  modalContentClose: {
    top: 20,
    alignItems: 'flex-end',
    height: 70,
  },
  modalCreditCard: {
    marginTop: 20,
    color: 'black',
    fontFamily: 'ProductSans-Bold',
  },
  modalText: {
    marginBottom: 30,
    fontFamily: 'ProductSans-Bold',
    textAlign: 'center',
  },
});

export default withTheme(PaymentMethod);
