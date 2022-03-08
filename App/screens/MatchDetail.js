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
import AppBarComponent from '../components/AppBar';

function MatchDetails({navigation, route}) {
  return (
    <>
      <AppBarComponent navigation={navigation} route={route} />
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{color:'red'}}>Home {route.params?.matchID}</Text>
        <Text style={{color:'red'}}>Home {route.params?.title}</Text>
        {/* <Button
          title={'Click Here To Update Header Title Dynamically'}
          onPress={() => setTitle('NEW')}
        /> */}
        <Button
          title="Go to Details"
          onPress={() => navigation.navigate('NewsDetail')}
        />
      </View>
    </>
  );
}
export default MatchDetails;
