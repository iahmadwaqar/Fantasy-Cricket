import React from 'react';
import {View, Text, Button} from 'react-native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeStackNavigation from './HomeStackNavigation';
import colors from '../constants/colors';

const Tab = createMaterialBottomTabNavigator();

function BottomTabNavigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Feed"
        activeColor="#e91e63"
        barStyle={{backgroundColor: colors.tomato}}>
        <Tab.Screen
          name="Feed"
          component={HomeStackNavigation}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Notifications"
          component={Screen1}
          options={{
            tabBarLabel: 'Updates',
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons name="bell" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Screen2}
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons name="account" color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default BottomTabNavigation;

const Screen1 = ({navigation}) => {
  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <Text>Screen 1</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.jumpTo('Profile')}
      />
    </View>
  );
};

const Screen2 = () => {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightblue',
        flex: 1,
      }}>
      <Text>Screen 2</Text>
    </View>
  );
};
