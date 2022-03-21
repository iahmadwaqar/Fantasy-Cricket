import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from '../screens/Home';
import BuildYourTeam from '../screens/BuildYourTeam';
import NewsDetail from '../screens/NewsDetail';

const Stack = createNativeStackNavigator();

const HomeStackNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="NewsDetail" component={NewsDetail} />
      <Stack.Screen name="MatchDetail" component={BuildYourTeam} />
    </Stack.Navigator>
  );
};
export default HomeStackNavigation;
