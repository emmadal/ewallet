import React, {useCallback, useContext} from 'react';
import {StyleSheet, TouchableOpacity, View, Dimensions} from 'react-native';
import {UserContext} from '../context';
import {logout} from '../api';
import {withTheme, Title, Divider, Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';

const Activity = ({theme}) => {
  const {colors} = theme;
  const {setUser} = useContext(UserContext);
  const {navigate} = useNavigation();

  const handleLogout = useCallback(() => {
    logout().then(() => setUser(null));
  }, [setUser]);

  return (
    <View style={styles.container}>
      <View style={styles.notif}>
        <Text>Vous n'avez aucune activite en cours</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 20,
  },
});

export default withTheme(Activity);
