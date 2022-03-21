import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

const ChooseLeague = ({navigation, route}) => {
  return (
    <View style={{flex: 1}}>
      <Text>Choose League</Text>
      <Button
        title="Go to Team Selection"
        onPress={() => navigation.jumpTo('ChoosePlayers')}
      />
    </View>
  );
};

export default ChooseLeague;
