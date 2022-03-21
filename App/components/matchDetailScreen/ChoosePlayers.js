import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch, useStore} from 'react-redux';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import Animated, {
  useDerivedValue,
  withTiming,
  StretchInY,
  PinwheelIn,
  interpolateColor,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TouchableHighlight,
  StyleSheet,
  FlatList,
  ToastAndroid,
  Platform,
  AlertIOS,
} from 'react-native';
import {
  List,
  Avatar,
  TouchableRipple,
  ActivityIndicator,
  Text,
  FAB,
} from 'react-native-paper';

import colors from '../../constants/colors';

const Tab = createMaterialTopTabNavigator();

const ChoosePlayers = ({navigation}) => {
  const store = useStore();
  console.log('Team Selection Screen');

  const selectedPlayers = store.getState().selectedPlayers;

  const numberOfBatsmenSelected = selectedPlayers?.filter(
    player => player.playerSkill === 'BATSMAN',
  ).length;

  const numberOfBowlersSelected = selectedPlayers?.filter(
    player => player.playerSkill === 'BOWLER',
  ).length;

  const numberOfAllroundersSelected = selectedPlayers?.filter(
    player => player.playerSkill === 'ALL_ROUNDER',
  ).length;

  const numberOfKeeperSelected = selectedPlayers?.filter(
    player => player.playerSkill === 'KEEPER',
  ).length;

  return (
    <>
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
            tabBarBadge: () => <Text>{numberOfKeeperSelected || 0}</Text>,
            tabBarIcon: ({color, focused}) => {
              return (
                <Image
                  source={require('../../assets/images/WicketKeeper.png')}
                  style={[
                    styles.image,
                    {
                      borderColor: color,
                      transform: [{scale: focused ? 1.1 : 1}],
                    },
                  ]}
                />
              );
            },
          }}
          component={WicketKeeper}
        />
        <Tab.Screen
          name="Batsmen"
          options={{
            tabBarBadge: () => <Text>{numberOfBatsmenSelected || 0}</Text>,
            tabBarIcon: ({color, focused}) => {
              return (
                <Image
                  source={require('../../assets/images/Batsmen.png')}
                  style={[
                    styles.image,
                    {
                      borderColor: color,
                      transform: [{scale: focused ? 1.1 : 1}],
                    },
                  ]}
                />
              );
            },
          }}
          component={Batsmen}
        />
        <Tab.Screen
          name="Bollers"
          options={{
            tabBarBadge: () => <Text>{numberOfBowlersSelected || 0}</Text>,
            tabBarIcon: ({color, focused}) => {
              return (
                <Image
                  source={require('../../assets/images/Bowlers.png')}
                  style={[
                    styles.image,
                    {
                      borderColor: color,
                      transform: [{scale: focused ? 1.1 : 1}],
                    },
                  ]}
                />
              );
            },
          }}
          component={Bollers}
        />
        <Tab.Screen
          name="AllRounders"
          options={{
            tabBarBadge: () => <Text>{numberOfAllroundersSelected || 0}</Text>,
            tabBarIcon: ({color, focused}) => {
              return (
                <Image
                  source={require('../../assets/images/AllRounders.jpg')}
                  style={[
                    styles.image,
                    {
                      borderColor: color,
                      transform: [{scale: focused ? 1.1 : 1}],
                    },
                  ]}
                />
              );
            },
          }}
          component={AllRounders}
        />
      </Tab.Navigator>
      <FAB
        style={styles.fab}
        large
        icon="arrow-right"
        onPress={() => {
          const selectedPlayersCount = store.getState().selectedPlayers;

          if (!selectedPlayersCount || selectedPlayersCount.length === 0) {
            ToastAndroid.show(
              'Please select your team first',
              ToastAndroid.SHORT,
            );
            return;
          }

          const batsmenCount = selectedPlayersCount?.filter(
            player => player.playerSkill === 'BATSMAN',
          ).length;

          const bowlersCount = selectedPlayersCount?.filter(
            player => player.playerSkill === 'BOWLER',
          ).length;

          const allRoundersCount = selectedPlayersCount?.filter(
            player => player.playerSkill === 'ALL_ROUNDER',
          ).length;

          const keeperCount = selectedPlayersCount?.filter(
            player => player.playerSkill === 'KEEPER',
          ).length;

          if (keeperCount < 1) {
            ToastAndroid.show('You must select 1 Keeper', ToastAndroid.SHORT);
            return;
          } else if (batsmenCount + bowlersCount < 5) {
            ToastAndroid.show(
              'You must select a total of 5 Batsmen and Bowlers',
              ToastAndroid.SHORT,
            );
            return;
          } else if (allRoundersCount < 1) {
            ToastAndroid.show(
              'You must select 1 All Rounder',
              ToastAndroid.SHORT,
            );
            return;
          }

          navigation.jumpTo('ChooseLogic');
        }}
      />
    </>
  );
};

const WicketKeeper = () => {
  const playersData = useSelector(state => state.PlayersData);
  const playersList = playersData?.recentForm;
  return (
    <ScrollView>
      {playersList?.map(player => {
        if (player.playerSkill === 'KEEPER') {
          return <Player key={player.playerID} player={player} />;
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
          return <Player key={player.playerID} player={player} />;
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
          return <Player key={player.playerID} player={player} />;
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
          return <Player key={player.playerID} player={player} />;
        }
      })}
    </ScrollView>
  );
};

const Player = ({player}) => {
  const dispatch = useDispatch();
  const store = useStore();
  const [isSelected, setIsSelected] = useState(false);

  const isSelectedBackground = useDerivedValue(() => {
    return isSelected ? withTiming(1) : withTiming(0);
  });

  const backgroundColorStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        isSelectedBackground.value,
        [0, 1],
        [colors.background, colors.accent],
      ),
    };
  });

  const displayToast = toastText => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(toastText, ToastAndroid.SHORT);
    } else {
      AlertIOS.alert(toastText);
    }
  };

  const addOrRemovePlayer = playerData => {
    if (isSelected) {
      setIsSelected(false);
      dispatch({
        type: 'REMOVE_PLAYER',
        payload: player,
      });
      return;
    }

    if (!isSelected) {
      const selectedPlayers = store.getState().selectedPlayers;
      const numberOfPlayersWithThisSkill = selectedPlayers?.filter(
        player => player.playerSkill === playerData.playerSkill,
      ).length;

      switch (playerData.playerSkill) {
        case 'KEEPER':
          if (numberOfPlayersWithThisSkill > 0) {
            displayToast('Only one keeper can be selected');
            return;
          }
          break;

        case 'ALL_ROUNDER':
          if (numberOfPlayersWithThisSkill > 0) {
            displayToast('Only one all rounder can be selected');
            return;
          }
          break;

        case 'BATSMAN':
          if (numberOfPlayersWithThisSkill > 2) {
            displayToast('Only three batsmen can be selected');
            return;
          } else {
            const numberOfBowlers = selectedPlayers?.filter(
              player => player.playerSkill === 'BOWLER',
            ).length;
            if (numberOfBowlers > 2 && numberOfPlayersWithThisSkill > 1) {
              displayToast('Only two batsmen when three bowlers are selected');
              return;
            }
          }
          break;

        case 'BOWLER':
          if (numberOfPlayersWithThisSkill > 2) {
            displayToast('Only three bowlers are allowed');
            return;
          } else {
            const numberOfBatsmen = selectedPlayers?.filter(
              player => player.playerSkill === 'BATSMAN',
            ).length;
            if (numberOfBatsmen > 2 && numberOfPlayersWithThisSkill > 1) {
              displayToast('Only two bowlers when three batsmen are selected');
              return;
            }
          }
          break;

        default:
          break;
      }

      dispatch({
        type: 'ADD_PLAYER',
        payload: player,
      });

      setIsSelected(true);
    }
  };

  return (
    <Animated.View
      entering={StretchInY}
      style={[backgroundColorStyle, styles.playerContainer]}>
      <TouchableWithoutFeedback
        onPress={() => {
          addOrRemovePlayer(player);
        }}>
        <View>
          <List.Item
            title={player.name}
            description={player.playerID}
            key={player.playerID}
            left={() => (
              <Avatar.Image
                size={54}
                source={{
                  uri: `https://images.cricket.com/teams/${player.teamID}_flag_safari.png`,
                }}
              />
            )}
            right={() => {
              return (
                <>
                  {isSelected ? (
                    <Animated.View entering={PinwheelIn.duration(500)}>
                      <List.Icon icon="check" color={colors.primary} />
                    </Animated.View>
                  ) : (
                    <List.Icon icon="plus" color={colors.primary} />
                  )}
                </>
              );
            }}
          />
        </View>
      </TouchableWithoutFeedback>
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
  snackbar: {
    backgroundColor: colors.primary,
    position: 'absolute',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default ChoosePlayers;
