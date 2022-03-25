import React, {useCallback} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import {
  withTheme,
  TextInput,
  Button,
  Title,
  Subheading,
  Paragraph,
} from 'react-native-paper';
import {launchImageLibrary} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';

const ConfirmIdentity = ({theme}) => {
  const {colors} = theme;

  const handlePicEdit = useCallback(async () => {
    try {
      const pic = await launchImageLibrary({
        mediaType: 'photo',
        selectionLimit: 0,
      });
      if (pic.assets) {
        // Formatted object data to send to the server
        const formData = new FormData();
        formData.append('filename', pic?.assets[0].fileName);
        formData.append('description', 'indentity ressources');
        // formData.append('file', {
        //   name: pic?.assets[0].fileName,
        //   uri: pic?.assets[0].uri,
        //   type: pic?.assets[0].type,
        // });
        // Object to combine with fetch met
        console.log(pic.assets);
      }
    } catch (error) {}
  }, []);

  const requestCameraPermission = useCallback(async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'eWallet Photo Permission',
          message: "Autoriser eWallet d'acceder a la librairie photo",
          buttonNeutral: 'Demander plutard',
          buttonNegative: 'Annuler',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        await handlePicEdit();
      } else {
        Alert.alert('Permission refusée');
      }
    } catch (err) {
      console.warn(err);
    }
  }, [handlePicEdit]);

  return (
    <View style={styles.container}>
      <View>
        <Title>
          Téléchargez votre Piece d'identite ou Passeport et renseignez votre
          adresse de domicialisation
        </Title>
        <Subheading color={colors.gray}>
          Les fichiers PNG, JPEG, PDF sont autorisés
        </Subheading>
        <View style={styles.modalSubContent}>
          <TouchableOpacity
            style={styles.kycUploadField}
            onPress={requestCameraPermission}>
            <Icon
              name="cloud-upload-outline"
              color={colors.primary}
              size={60}
            />
            <Paragraph>Téléchargez vos fichiers ici</Paragraph>
          </TouchableOpacity>
        </View>
      </View>
      <TextInput
        mode="outlined"
        autoFocus={true}
        label="Addresse"
        style={styles.input}
      />
      <TextInput
        mode="outlined"
        autoFocus={true}
        label="Ville"
        style={styles.input}
      />
      <Button
        labelStyle={[{color: colors.white}, styles.labelStyle]}
        mode="contained"
        onPress={() => console.log('Send crypto')}
        style={styles.btn}
        theme={{roundness: 20}}>
        Confirmation
      </Button>
      <Paragraph style={[{color: colors.danger}, styles.info]}>
        Apres Confirmation de votre didentite vous serez en mesure de benificier
        de tout les services de transactions.
      </Paragraph>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 17,
    backgroundColor: 'white',
    paddingTop: 20,
  },
  kycUploadField: {
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'dashed',
    borderColor: '#DCDCDC',
    borderWidth: 3,
    padding: 20,
    marginVertical: 25,
  },
  input: {
    marginVertical: 10,
  },
  feeText: {
    fontFamily: 'ProductSans-Medium',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 30,
  },
  btn: {
    width: Dimensions.get('window').width / 1.5,
    justifyContent: 'center',
    padding: 3,
    alignSelf: 'center',
    marginVertical: 25,
  },
  rate: {
    textAlign: 'center',
    fontFamily: 'ProductSans-Light',
    fontSize: 15,
    marginTop: 30,
  },
  info: {
    textAlign: 'center',
    fontFamily: 'ProductSans-Light',
  },
});

export default withTheme(ConfirmIdentity);
