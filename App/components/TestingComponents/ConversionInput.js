import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import colors from '../../constants/colors';

const ConversionInput = ({text, onPress, ...props}) => {
  const inputStyle = [styles.input];
  if (props.editable === false) {
    inputStyle.push(styles.inputDisabled);
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.label}>{text}</Text>
      </TouchableOpacity>
      <TextInput style={inputStyle} {...props} />
    </View>
  );
};

const styles = StyleSheet.create({
  inputDisabled: {
    backgroundColor: colors.lightGray,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 5,
  },
  input: {
    flex: 1,
    padding: 10,
    color: colors.lightGreen,
    fontSize: 16,
  },
  label: {
    color: colors.lightGreen,
    fontSize: 18,
    fontWeight: 'bold',
  },
  button: {
    padding: 10,
    borderRightWidth: 1,
    width: '25%',
    borderColor: colors.divider,
  },
});

export default ConversionInput;
