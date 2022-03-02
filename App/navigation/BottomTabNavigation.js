import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import DrawerNavigation from './DrawerNavigation';
import HomeStackNavigation from './HomeStackNavigation';

import colors from '../constants/colors';

const Tab = createMaterialBottomTabNavigator();

function BottomTabNavigation() {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      activeColor={colors.lightGreen}
      inactiveColor={colors.black}
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
        component={HomeStackNavigation}
        options={{
          tabBarLabel: 'Updates',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="bell" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={DrawerNavigation}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTabNavigation;
