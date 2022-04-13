import React, {useState, useCallback, useEffect, useContext} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Modal,
  TouchableOpacity,
  FlatList,
  Platform,
} from 'react-native';
import VirtualKeyboard from 'react-native-virtual-keyboard';
import {
  withTheme,
  Colors,
  FAB,
  Title,
  Button,
  TextInput,
  Avatar,
  Caption,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {UserContext} from '../context';
import Loader from '../components/Loader';
import {createOffer, getOffers} from '../api';

const SellCrypto = ({theme, route}) => {
  const {colors} = theme;
  const [amount, setAmount] = useState('');
  const [xof, setXOF] = useState('');
  const [response, setResponse] = useState([]);
  const [data, setData] = useState(null);
  const {user} = useContext(UserContext);
  const [desc, setDesc] = useState('');
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const {address} = user.accounts[1].address;

  const handleFees = useCallback(() => {
    const USDTXOF = 590;
    const fees = 0.01;
    const USDTXOFWithAmount = USDTXOF * Number(amount);
    const total = USDTXOFWithAmount + fees * USDTXOFWithAmount;
    setXOF(total);
  }, [amount]);

  useEffect(() => {
    const getAllOffers = async () => {
      const req = await getOffers();
      setResponse(req);
    };
    getAllOffers();
  }, []);

  useEffect(() => handleFees(), [handleFees]);

  const handlePublish = useCallback(async () => {
    setLoading(!loading);
    setShowModal(false);
    const item = {
      id: new Date().getTime(),
      desc,
      amount_xof: xof,
      amount_usdt: amount,
      authorId: user?.uid,
      authorName: user?.fullName,
      authorPhone: user?.phoneNumber,
      authorAddress: address,
    };
    const req = await createOffer(item);
    if (req) {
      setResponse(req);
      setLoading(false);
    }
  }, [
    address,
    amount,
    desc,
    loading,
    user?.fullName,
    user?.phoneNumber,
    user?.uid,
    xof,
  ]);

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
            <Title style={styles.header}>Nouvelle offre de vente</Title>
            <TouchableOpacity onPress={() => setShowModal(false)}>
              <Icon name="close-outline" size={40} color={colors.text} />
            </TouchableOpacity>
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              editable={false}
              mode="outlined"
              label="Montant (USDT)"
              value={String(amount)}
              onChangeText={text => setAmount(Number(text))}
            />
            <TextInput
              style={styles.input}
              editable={false}
              mode="outlined"
              label="Montant (XOF)"
              value={String(xof)}
              onChangeText={text => setXOF(Number(text))}
            />
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              autoCorrect={false}
              multiline={true}
              value={desc}
              numberOfLines={3}
              mode="outlined"
              label="Description de l'offre"
              onChangeText={text => setDesc(text)}
            />
          </View>
          <VirtualKeyboard
            decimal={true}
            color="black"
            pressMode="string"
            onPress={val => setAmount(val)}
          />
          <Button
            labelStyle={[{color: colors.white}, styles.labelStyle]}
            mode="contained"
            disabled={amount >= 1 ? false : true}
            onPress={handlePublish}
            style={styles.btn}
            theme={{roundness: 20}}>
            Publier l'offre
          </Button>
        </View>
      </Modal>
    );
  };

  return (
    <View style={styles.container}>
      <Loader loading={loading} />
      <FlatList
        refreshing={true}
        data={response}
        key={item => item._data?.id}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.pressable}
            onPress={() => setData(item._data)}>
            <View style={styles.userInfo}>
              <View style={styles.senderUser}>
                <Title>{item._data.authorName}</Title>
                <Caption style={{color: colors.danger}}>
                  Nouvelle offre de vente
                </Caption>
              </View>
            </View>
            <Title style={styles.amount}>
              {item._data.amount_xof} XOF - {item._data.amount_usdt} USDT
            </Title>
          </TouchableOpacity>
        )}
        ListEmptyComponent={() => (
          <View style={styles.container}>
            <Title style={styles.emptymessage}>
              Aucune offre de Vente disponible
            </Title>
          </View>
        )}
      />
      <FAB
        color={colors.white}
        style={styles.fab}
        large
        icon="plus"
        onPress={() => setShowModal(!showModal)}
      />
      {renderModal()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  input: {
    marginVertical: 12,
    maxHeight: 100,
  },
  inputView: {
    marginTop: 30,
  },
  header: {
    fontFamily: 'ProductSans-Bold',
  },
  fab: {
    position: 'absolute',
    backgroundColor: '#44bd32',
    margin: 45,
    right: 0,
    bottom: 40,
  },
  btn: {
    width: Dimensions.get('window').width / 1.5,
    justifyContent: 'center',
    padding: 3,
    alignSelf: 'center',
    marginTop: 30,
  },
  emptymessage: {
    fontFamily: 'ProductSans-Bold',
    textAlign: 'center',
    fontSize: 18,
    paddingTop: 20,
  },
  modal: {
    position: 'relative',
    backgroundColor: '#fff',
  },
  modalContent: {
    marginTop: Platform.OS === 'android' ? 20 : 30,
    padding: 20,
    position: 'relative',
    display: 'flex',
  },
  modalContentClose: {
    top: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 70,
  },
  modalText: {
    marginBottom: 30,
    fontFamily: 'ProductSans-Bold',
    textAlign: 'center',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  amount: {
    fontFamily: 'ProductSans-Bold',
    fontSize: 15,
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
});

export default withTheme(SellCrypto);
