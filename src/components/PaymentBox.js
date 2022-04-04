import React, {useState} from 'react';
import {StyleSheet, Image, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {withTheme} from 'react-native-paper';

const PaymentBox = ({data, theme}) => {
  const {colors} = theme;
  const [userOption, setUserOption] = useState(0);

  const selectHandler = item => {
    console.log(item);
    setUserOption(item?.id);
  };

  return (
    <Pressable style={styles.rows}>
      <Image style={styles.img} source={data.logo} />
      <Icon
        name={
          data.id === userOption
            ? 'checkmark-circle-outline'
            : 'radio-button-off-outline'
        }
        size={40}
        color={data.id === userOption ? colors.primary : colors.text}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
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
});

export default withTheme(PaymentBox);
