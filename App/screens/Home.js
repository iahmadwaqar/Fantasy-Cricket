import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';

import AppBarComponent from '../components/AppBarComponent';
import CarouselCard from '../components/homeScreen/CarouselCards';
import News from '../components/homeScreen/News';

import colors from '../constants/colors';

const Home = ({navigation, route}) => {
  return (
    <View style={styles.container}>
      <AppBarComponent navigation={navigation} route={route} />
      <CarouselCard navigation={navigation} />
      <News navigation={navigation} />
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
