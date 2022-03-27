import React, {useCallback, useContext, useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  PermissionsAndroid,
  Alert,
  Platform,
} from 'react-native';
import {PERMISSIONS} from 'react-native-permissions';
import ImageModal from 'react-native-image-modal';
import {withTheme, Title, Subheading, Paragraph} from 'react-native-paper';
import {launchImageLibrary} from 'react-native-image-picker';
import {UserContext} from '../context';
import Icon from 'react-native-vector-icons/Ionicons';
import Loader from '../components/Loader';
import {updateProfile, uploadKYC} from '../api';

const ConfirmIdentity = ({theme}) => {
  const {colors} = theme;
  const [loading, setLoading] = useState(false);
  const {user, setUser} = useContext(UserContext);

  const handleKYC = useCallback(async () => {
    try {
      const pic = await launchImageLibrary({
        mediaType: 'photo',
        selectionLimit: 0,
      });
      setLoading(!loading);
      if (pic.assets) {
        const kycFiles = await uploadKYC(pic.assets);
        if (kycFiles.length) {
          const doc = await updateProfile(user, {kycFiles});
          setUser(doc);
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
      Alert.alert('Operation echouée');
      console.log(e.message);
    }
  }, [loading, setUser, user]);

  const requestCameraPermission = useCallback(async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PERMISSIONS.ANDROID.CAMERA,
        {
          title: 'eWallet Photo Permission',
          message: "Autoriser eWallet d'acceder a la librairie photo",
          buttonNeutral: 'Demander plutard',
          buttonNegative: 'Annuler',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        await handleKYC();
      } else {
        Alert.alert('Permission refusée');
      }
    } catch (err) {
      console.warn(err);
    }
  }, [handleKYC]);

  return (
    <View style={styles.container}>
      <Loader loading={loading} />
      <View>
        <Title>Téléchargez votre Pièce d'identité ou Passeport.</Title>
        <Subheading color={colors.gray}>
          Les fichiers PNG, JPEG, PDF sont autorisés
        </Subheading>
        <View style={styles.modalSubContent}>
          <TouchableOpacity
            style={styles.kycUploadField}
            onPress={
              Platform.OS === 'android' ? requestCameraPermission : handleKYC
            }>
            <Icon
              name="cloud-upload-outline"
              color={colors.primary}
              size={60}
            />
            <Paragraph>Téléchargez vos fichiers ici</Paragraph>
          </TouchableOpacity>
        </View>
      </View>
      {!user?.isActive && user?.kycFiles ? (
        <View>
          <Paragraph style={[{color: colors.danger}, styles.info]}>
            Votre compte est en attente de validation.
          </Paragraph>
          <View style={styles.imgView}>
            {user?.kycFiles.map(i => (
              <ImageModal
                key={i.id}
                resizeMode="contain"
                imageBackgroundColor="transparent"
                style={styles.img}
                source={{
                  uri: i.url,
                }}
              />
            ))}
          </View>
        </View>
      ) : (
        <Paragraph style={[{color: colors.danger}, styles.info]}>
          Confirmer votre identité pour bénéficier de tout les services de
          transactions.
        </Paragraph>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 17,
    backgroundColor: 'white',
    paddingTop: 30,
  },
  kycUploadField: {
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'dashed',
    borderColor: '#DCDCDC',
    borderWidth: 3,
    padding: 20,
    marginVertical: 15,
  },
  modalSubContent: {
    marginTop: 50,
  },
  input: {
    marginVertical: 9,
  },
  info: {
    marginTop: 30,
    fontFamily: 'ProductSans-Medium',
  },
  img: {
    width: 160,
    height: 160,
  },
  imgView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default withTheme(ConfirmIdentity);
