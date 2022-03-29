import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {Button} from 'react-native-paper';

import EventEmitter from 'react-native/Libraries/vendor/emitter/EventEmitter';

import AppBarComponent from '../components/AppBarComponent';
import CarouselCard from '../components/homeScreen/CarouselCards';
import News from '../components/homeScreen/News';

import colors from '../constants/colors';

const Home = ({navigation, route}) => {
  const newEvent = new EventEmitter();

  newEvent.addListener('pressing', () => {
    console.log('pressing');
  });

  return (
    <View style={styles.container}>
      <AppBarComponent navigation={navigation} route={route} />
      <CarouselCard navigation={navigation} />
      <News navigation={navigation} />
      <Button mode="contained" onPress={() => newEvent.emit('pressing')}>
        Press me
      </Button>
    </View>
  );
}; // end of Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
export default Home; // end of export default Home
