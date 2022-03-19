import React from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import {Text} from 'react-native-paper';

export const RenderEmpty = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.emptymessage}>
        Vous n'avez aucune transaction pour le moment.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptymessage: {
    fontFamily: 'ProductSans-Bold',
    fontSize: 20,
    paddingTop: Dimensions.get('window').height / 10,
    paddingHorizontal: 20,
  },
});
