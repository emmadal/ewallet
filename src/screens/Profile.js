import React, {useContext, useState, useCallback} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Alert,
  ScrollView,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {UserContext} from '../context';
import {
  withTheme,
  Avatar,
  TextInput,
  Button,
  Snackbar,
} from 'react-native-paper';
import {updateProfile, uploadFile} from '../api';
import Loader from '../components/Loader';

const Profile = ({theme}) => {
  const {colors} = theme;
  const {user, setUser} = useContext(UserContext);
  const [fullName, setFullName] = useState(user?.fullName);
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber ?? '');
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = React.useState(false);

  const handleUploadImage = useCallback(async () => {
    try {
      const pic = await launchImageLibrary({mediaType: 'photo'});
      setLoading(!loading);
      if (pic.assets) {
        const photoURL = await uploadFile({
          uri: pic?.assets[0].uri,
          fileName: pic?.assets[0].fileName,
        });
        if (photoURL) {
          const doc = await updateProfile(user, {photoURL});
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

  const onDismissSnackBar = () => setVisible(false);

  const getFirstLetterOfName = () => {
    const matches = user?.fullName.match(/\b(\w)/g);
    return matches.join('');
  };

  const handleSubmit = useCallback(async () => {
    setLoading(!loading);
    try {
      if (fullName.length && phoneNumber.length) {
        const doc = await updateProfile(user, {fullName, phoneNumber});
        if (doc) {
          setUser(doc);
          setLoading(false);
          setVisible(!visible);
        }
      }
    } catch (e) {
      Alert.alert('Operation echouée');
      setLoading(false);
      return;
    }
  }, [fullName, loading, phoneNumber, setUser, user, visible]);

  return (
    <View style={styles.container}>
      <Loader loading={loading} />
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={styles.scroll}>
        <TouchableOpacity onPress={handleUploadImage} style={styles.avatar}>
          {user?.photoURL ? (
            <Avatar.Image
              size={60}
              source={{
                uri: user?.photoURL,
              }}
            />
          ) : (
            <Avatar.Text
              color={colors.white}
              size={60}
              label={getFirstLetterOfName()}
            />
          )}
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          disabled
          value={user?.email}
          mode="outlined"
          label="Email"
          right={<TextInput.Icon name="email" color={colors.primary} />}
        />
        <TextInput
          style={styles.input}
          mode="outlined"
          autoFocus={true}
          maxLength={17}
          autoCapitalize="none"
          value={fullName}
          label="Nom & Prénom"
          onChangeText={text => setFullName(text)}
          right={<TextInput.Icon name="human-male" color={colors.primary} />}
        />
        <TextInput
          style={styles.input}
          keyboardType="number-pad"
          autoFocus={true}
          mode="outlined"
          autoCapitalize="none"
          value={phoneNumber}
          label="Numero de telephone"
          onChangeText={text => setPhoneNumber(text)}
          right={<TextInput.Icon name="phone" color={colors.primary} />}
        />
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          disabled
          value={user?.country}
          mode="outlined"
          label="Pays"
        />
        <TextInput
          mode="outlined"
          autoFocus={true}
          label="Adresse"
          style={styles.input}
        />
        <TextInput
          mode="outlined"
          autoFocus={true}
          label="Ville"
          style={styles.input}
        />
        <Button
          disabled={phoneNumber.length && fullName.length >= 5 ? false : true}
          labelStyle={{color: colors.white}}
          onPress={handleSubmit}
          style={styles.btn}
          mode="contained"
          theme={{roundness: 20}}>
          Mise a jour
        </Button>
      </ScrollView>
      <Snackbar
        duration={3000}
        style={[
          styles.snackbar,
          {
            backgroundColor: colors.primary,
            color: colors.white,
          },
        ]}
        visible={visible}
        onDismiss={onDismissSnackBar}>
        Profil mis a jour.
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
  },
  scroll: {
    paddingTop: 25,
  },
  input: {
    marginVertical: 5,
  },
  btn: {
    padding: 4,
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 20,
  },
  avatar: {
    alignSelf: 'center',
    marginVertical: 10,
  },
});

export default withTheme(Profile);
