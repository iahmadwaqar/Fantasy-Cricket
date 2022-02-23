import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from '../screens/Home';
import MatchDetails from '../screens/MatchDetails';

const Stack = createNativeStackNavigator();

const HomeStackNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen
        name="Home2"
        component={Home}
        options={
          {
            //   headerShown: false,
          }
        }
      />
      <Stack.Screen
        name="Match_Details"
        component={MatchDetails}
        options={{animation:'fade'}}
      />
    </Stack.Navigator>
  );
};
export default HomeStackNavigation;
