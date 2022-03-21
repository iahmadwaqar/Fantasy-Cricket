import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import colors from '../../constants/colors';
import {Entypo} from '@expo/vector-icons';

export const RowItem = ({title, onPress, icon}) => {
  return (
    <TouchableOpacity style={styles.row} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
      <Entypo name={icon} size={20} color={colors.blue} />
    </TouchableOpacity>
  );
};

export const RowSeparator = () => {
  return <View style={styles.divider} />;
};

const styles = StyleSheet.create({
  divider: {
    left: 20,
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.divider,
  },
  row: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    color: colors.text,
  },
});
