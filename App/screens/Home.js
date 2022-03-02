import React from 'react';
import {Dimensions, StyleSheet, Platform, View} from 'react-native';
import {Button, Text, Appbar, FAB} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';

import CarouselCard from '../components/CarouselCards';

import colors from '../constants/colors';

const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';

const AppBarComponent = () => (
  <Appbar.Header style={{backgroundColor: 'tomato'}}>
    <Appbar.Content title="Title" subtitle={'Subtitle'} />
    <Appbar.Action icon="magnify" onPress={() => {}} />
    <Appbar.Action icon={MORE_ICON} onPress={() => {}} />
  </Appbar.Header>
);

const Home = ({navigation, route}) => {
  const dispatch = useDispatch();
  const counter = useSelector(state => state.counter);

  return (
    <View style={styles.container}>
      <AppBarComponent />
      <CarouselCard navigation={navigation} />
      <FAB
        style={{
          position: 'absolute',
          margin: 20,
          right: 0,
          bottom: 0,
        }}
        label="Add"
        icon="headset"
        onPress={() => console.log('Pressed')}
      />
      <View style={styles.container}>
        <Text>This is paper {counter} text</Text>
        <Button
          mode="contained"
          icon="car"
          style={{alignSelf: 'center'}}
          onPress={() => dispatch({type: 'INCREMENT'})}>
          Increment
        </Button>
      </View>
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
