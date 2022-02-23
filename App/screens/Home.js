import React, {useState} from 'react';
import {Dimensions, StyleSheet, View, StatusBar} from 'react-native';

import CarouselCard from '../components/CarouselCards';

import colors from '../constants/colors';

const Home = ({navigation, route}) => {
  const [text, setText] = useState('');

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.grey} />
      <CarouselCard navigation={navigation} />
    </View>
  );
}; // end of Home

const screen = Dimensions.get('window'); // get the screen dimensions
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: colors.tomato,
  },
  content: {
    // justifyContent: 'center',
    paddingTop: screen.height * 0.15,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  logo: {
    position: 'absolute',
    resizeMode: 'contain',
    width: screen.width * 0.25,
    height: screen.width * 0.25,
  },
  logoBackground: {
    width: screen.width * 0.5,
    height: screen.width * 0.5,
    resizeMode: 'contain',
  },
  note: {
    color: colors.white,
    fontSize: 12,
    textAlign: 'center',
    marginTop: 10,
  },
  header: {
    color: colors.white,
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  menuIcon: {
    alignItems: 'flex-end',
    marginRight: 20,
  },
});
export default Home; // end of export default Home
