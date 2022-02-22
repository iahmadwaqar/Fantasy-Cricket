import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {TouchableOpacity, Text, View} from 'react-native';

import {Button, Caption} from 'react-native-paper';

const Stack = createNativeStackNavigator();

var clear;

const Home = ({navigation}) => {
  const [count, setCount] = React.useState(5);

  console.log('App');

  useEffect(() => {
    console.log('Use Effect', count);

    navigation.addListener('blur', () => {
      console.log('Blur');
      clearInterval(clear);
    });

    navigation.addListener('focus', () => {
      // clear = setInterval(() => {
      //   console.log(count);
      //   setCount(count => count + 1);
      // }, 1000);
      console.log('Focus');
    });

    return () => {
      console.log('Return');
      // clearInterval(clear);
    };
  }, []);

  return (
    <View>
      <Caption>{count}</Caption>
      <Button
        style={{marginVertical: 5, width: '70%', alignSelf: 'center'}}
        icon="camera"
        mode="contained"
        onPress={() => clearInterval(clear)}>
        Press me
      </Button>
      <Button mode="outlined" onPress={() => setCount(count + 1)}>
        Increament
      </Button>
      <Button onPress={() => navigation.navigate('Options')}>navigate</Button>
    </View>
  );
};

const Options = () => {
  return (
    <View style={{backgroundColor: 'blue'}}>
      <Text>Options</Text>
    </View>
  );
};

const HomeStackNavigation = () => {
  return (
    <Stack.Navigator mode="modal" initialRouteName="Home">
      {/* <Stack.Screen
        name="CurrencyList"
        component={CurrencyList}
        options={({route}) => ({
          title: route.params && route.params.title,
          headerBackVisible: false,
          headerLeft: null,
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Entypo name="cross" size={30} color={colors.lightGreen} />
              <Text>Back</Text>
            </TouchableOpacity>
          ),
          animation: 'fade',
        })}
      /> */}
      <Stack.Screen
        name="Home"
        component={Home}
        options={
          {
            //   headerShown: false,
          }
        }
      />
      <Stack.Screen
        name="Options"
        component={Options}
        options={{animation: 'slide_from_right'}}
      />
    </Stack.Navigator>
  );
};
export default HomeStackNavigation;
