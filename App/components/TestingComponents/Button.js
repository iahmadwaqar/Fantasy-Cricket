import React from 'react';
import {TouchableOpacity, Text, Image, StyleSheet} from 'react-native'; // import the components we will need
import colors from '../../constants/colors';

const Button = ({onPress, text}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Image
        source={require('../assets/images/reverse.png')}
        style={styles.buttonImage}
      />
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonImage: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 10,
  },
  buttonText: {
    color: colors.white,
  },
});

export default Button;
