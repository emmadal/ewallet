import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text, Card, Caption, Title, useTheme, Colors} from 'react-native-paper';

export const Transaction = ({data}) => {
  const {colors} = useTheme();
  return (
    <View style={styles.card}>
      <Card.Content style={styles.viewUserInfo}>
        <View>
          <Text style={styles.name}>{data?.name}</Text>
          <Caption style={[styles.date, {color: colors.placeholder}]}>
            {data?.date}
          </Caption>
        </View>
        <Title style={[styles.amount, {color: colors.primary}]}>
          {data?.type === 'Deposit' ? '+' : '-'}
          {data?.amount}
        </Title>
      </Card.Content>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 15,
    marginVertical: 5,
    borderRadius: 9,
    paddingVertical: 10,
    backgroundColor: Colors.white,
  },
  viewUserInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontFamily: 'ProductSans-Bold',
    fontSize: 15,
  },
  date: {
    fontFamily: 'ProductSans-Light',
    fontSize: 12,
  },
  amount: {
    fontFamily: 'ProductSans-Bold',
  },
});
