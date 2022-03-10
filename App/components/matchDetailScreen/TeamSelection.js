import React, {useEffect, useState, useRef} from 'react';
import {useSelector} from 'react-redux';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Animated, {
  StretchInY,
  RotateInUpRight,
  PinwheelIn,
} from 'react-native-reanimated';
import {View, ScrollView, Image, StyleSheet} from 'react-native';
import {
  List,
  Text,
  Avatar,
  TouchableRipple,
  ActivityIndicator,
} from 'react-native-paper';

import colors from '../../constants/colors';

const Tab = createMaterialTopTabNavigator();

const TeamSelection = ({navigation}) => {
  const playersData = useSelector(state => state.PlayersData);
  const playersList = playersData?.recentForm;

  return (
    <Tab.Navigator
      initialRouteName="WicketKeeper"
      screenOptions={{
        lazy: true,
        lazyPlaceholder: () => (
          <View style={styles.lazyPlaceholder}>
            <ActivityIndicator size={50} />
          </View>
        ),
        swipeEnabled: false,
        tabBarShowLabel: false,
        tabBarIndicator: () => null,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.accent,
        tabBarIconStyle: {
          alignItems: 'center',
          justifyContent: 'center',
          width: 60,
          height: 60,
          borderRadius: 50,
        },
        tabBarContentContainerStyle: {
          justifyContent: 'space-between',
        },
        tabBarStyle: {
          backgroundColor: colors.surface,
          margin: 5,
          borderRadius: 10,
        },
      }}>
      <Tab.Screen
        name="WicketKeeper"
        options={{
          tabBarIcon: ({color}) => {
            return (
              <Image
                source={require('../../assets/images/WicketKeeper.png')}
                style={[styles.image, {borderColor: color}]}
              />
            );
          },
        }}
        component={WicketKeeper}
      />
      <Tab.Screen
        name="Batsmen"
        options={{
          tabBarIcon: ({color}) => {
            return (
              <Image
                source={require('../../assets/images/Batsmen.png')}
                style={[styles.image, {borderColor: color}]}
              />
            );
          },
        }}
        component={Batsmen}
      />
      <Tab.Screen
        name="Bollers"
        options={{
          tabBarIcon: ({color}) => {
            return (
              <Image
                source={require('../../assets/images/Bowlers.png')}
                style={[styles.image, {borderColor: color}]}
              />
            );
          },
        }}
        component={Bollers}
      />
      <Tab.Screen
        name="AllRounders"
        options={{
          tabBarIcon: ({color}) => {
            return (
              <Image
                source={require('../../assets/images/AllRounders.jpg')}
                style={[styles.image, {borderColor: color}]}
              />
            );
          },
        }}
        component={AllRounders}
      />
    </Tab.Navigator>
  );
};

const WicketKeeper = () => {
  const playersData = useSelector(state => state.PlayersData);
  const playersList = playersData?.recentForm;
  return (
    <ScrollView>
      {playersList?.map(player => {
        if (player.playerSkill === 'KEEPER') {
          return (
            <Player
              key={player.playerID}
              PlayerName={player.name}
              playerTeamID={player.teamID}
            />
          );
        }
      })}
    </ScrollView>
  );
};

const Batsmen = () => {
  const playersData = useSelector(state => state.PlayersData);
  const playersList = playersData?.recentForm;
  return (
    <ScrollView>
      {playersList?.map(player => {
        if (player.playerSkill === 'BATSMAN') {
          return (
            <Player
              key={player.playerID}
              PlayerName={player.name}
              playerTeamID={player.teamID}
            />
          );
        }
      })}
    </ScrollView>
  );
};

const Bollers = () => {
  const playersData = useSelector(state => state.PlayersData);
  const playersList = playersData?.recentForm;
  return (
    <ScrollView>
      {playersList?.map(player => {
        if (player.playerSkill === 'BOWLER') {
          return (
            <Player
              key={player.playerID}
              PlayerName={player.name}
              playerTeamID={player.teamID}
            />
          );
        }
      })}
    </ScrollView>
  );
};

const AllRounders = () => {
  const playersData = useSelector(state => state.PlayersData);
  const playersList = playersData?.recentForm;
  return (
    <ScrollView>
      {playersList?.map(player => {
        if (player.playerSkill === 'ALL_ROUNDER') {
          return (
            <Player
              key={player.playerID}
              PlayerName={player.name}
              playerTeamID={player.teamID}
            />
          );
        }
      })}
    </ScrollView>
  );
};

const Player = ({navigation, playerID, PlayerName, playerTeamID}) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <Animated.View entering={StretchInY}>
      <TouchableRipple onPress={() => {}}>
        <List.Item
          style={styles.playerContainer}
          title={PlayerName}
          description={playerTeamID}
          key={playerID}
          left={() => (
            <Avatar.Image
              size={54}
              source={{
                uri: `https://images.cricket.com/teams/${playerTeamID}_flag_safari.png`,
              }}
            />
          )}
          right={() => {
            return (
              <TouchableRipple onPress={() => setModalVisible(!modalVisible)}>
                {modalVisible ? (
                  <Animated.View entering={PinwheelIn.duration(500)}>
                    <List.Icon icon="check" color={colors.primary} />
                  </Animated.View>
                ) : (
                  <List.Icon icon="plus" color={colors.primary} />
                )}
              </TouchableRipple>
            );
          }}
        />
      </TouchableRipple>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 65,
    height: 65,
    borderRadius: 50,
    borderWidth: 2,
  },
  playerContainer: {
    backgroundColor: colors.accent,
    borderRadius: 10,
    margin: 5,
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  lazyPlaceholder: {
    alignContent: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});

export default TeamSelection;
