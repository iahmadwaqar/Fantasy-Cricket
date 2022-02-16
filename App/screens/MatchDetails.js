import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  View,
  Text,
  TextInput,
  SafeAreaView,
  Button,
} from 'react-native';

function MatchDetails({navigation, route}) {
  const [title, setTitle] = useState('STATE');
  useEffect(() => navigation.setOptions({title: title}), [navigation, title]);
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home {route.params?.matchID}</Text>
      <Button
        title={'Click Here To Update Header Title Dynamically'}
        onPress={() => setTitle('NEW')}
      />
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
}
export default MatchDetails;
