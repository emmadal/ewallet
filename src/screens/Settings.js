import React, {useCallback} from 'react';
import {StyleSheet, TouchableOpacity, View, Dimensions} from 'react-native';
import {withTheme, Title, Divider, Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

const Settings = ({theme}) => {
  const {colors} = theme;
  const handleLogout = useCallback(() => {}, []);
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.optionContainer} onPress={() => ''}>
        <Title style={styles.titleOptions}>
          <Icon name="envelope" size={18} color={colors.placeholder} /> Messages
        </Title>
        <Icon
          color={colors.primary}
          style={styles.iconOptions}
          name="chevron-right"
          size={15}
        />
      </TouchableOpacity>
      <Divider />
      <TouchableOpacity style={styles.optionContainer} onPress={() => ''}>
        <Title style={styles.titleOptions}>
          <Icon name="globe" size={18} color={colors.placeholder} />
          {'  '}
          Langue
        </Title>
        <Icon
          color={colors.primary}
          style={styles.iconOptions}
          name="chevron-right"
          size={17}
        />
      </TouchableOpacity>
      <Divider />
      <TouchableOpacity style={styles.optionContainer} onPress={() => ''}>
        <Title style={styles.titleOptions}>
          <Icon name="lock" size={18} color={colors.placeholder} />
          {'  '} Reinitialiser mot de passe
        </Title>
        <Icon
          color={colors.primary}
          style={styles.iconOptions}
          name="chevron-right"
          size={17}
        />
      </TouchableOpacity>
      <Divider />
      <TouchableOpacity style={styles.optionContainer} onPress={() => ''}>
        <Title style={styles.titleOptions}>
          <Icon name="user" size={18} color={colors.placeholder} />
          {'  '} Profil utilisateur
        </Title>
        <Icon
          color={colors.primary}
          style={styles.iconOptions}
          name="chevron-right"
          size={17}
        />
      </TouchableOpacity>
      <Divider />
      <TouchableOpacity style={styles.optionContainer} onPress={handleLogout}>
        <Title style={styles.titleOptions}>
          <Icon name="user-times" size={18} color={colors.placeholder} />{' '}
          Déconnexion
        </Title>
        <Icon name="power-off" size={18} color={colors.primary} />
      </TouchableOpacity>
      <View style={styles.viewFooter}>
        <Text style={{color: colors.primary}}>
          eWallet - {new Date().getFullYear()}
        </Text>
        <Text>Version 0.1</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 13,
  },
  titleOptions: {
    fontSize: 18,
    fontFamily: 'ProductSans-Regular',
  },
  iconOptions: {
    alignSelf: 'center',
    marginTop: 5,
  },
  viewFooter: {
    alignItems: 'center',
    paddingTop: Dimensions.get('window').height / 3,
  },
});

export default withTheme(Settings);