import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {TouchableOpacity, Text, View, Button} from 'react-native';

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
    <View style={{backgroundColor: 'red'}}>
      <Text>{count}</Text>
      <Button onPress={() => clearInterval(clear)} title="Clear" />
      <Button onPress={() => setCount(count + 1)} title="Increment" />
      <Button onPress={() => navigation.navigate('Options')} title="Nav" />
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
        options={{
          headerShown: false,
        }}
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
