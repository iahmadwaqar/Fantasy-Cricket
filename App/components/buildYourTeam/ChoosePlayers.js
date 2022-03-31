import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch, useStore} from 'react-redux';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import EventEmitter from 'eventemitter3';

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
  TouchableWithoutFeedback,
  StyleSheet,
  ToastAndroid,
  Platform,
  AlertIOS,
} from 'react-native';
import {List, ActivityIndicator, Text, FAB} from 'react-native-paper';

import colors from '../../constants/colors';

const Tab = createMaterialTopTabNavigator();
const eventManager = new EventEmitter();

const displayToast = toastText => {
  if (Platform.OS === 'android') {
    ToastAndroid.show(toastText, ToastAndroid.SHORT);
  } else {
    AlertIOS.alert(toastText);
  }
};

const ChoosePlayers = ({navigation}) => {
  const store = useStore();
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  console.log('Team Selection Screen');

  useEffect(() => {
    eventManager.addListener('playerSelectionChanged', () => {
      const selectedPlayersInStore =
        store.getState().buildYourTeam?.selectedPlayers;
      setSelectedPlayers(selectedPlayersInStore);
    });

    return () => {
      eventManager.removeAllListeners();
    };
  });

  const countPlayers = () => {
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

    return {
      numberOfBatsmenSelected,
      numberOfBowlersSelected,
      numberOfAllroundersSelected,
      numberOfKeeperSelected,
    };
  };

  return (
    <>
      <Tab.Navigator
        initialRouteName="WicketKeeper"
        screenOptions={{
          lazy: false,
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
            tabBarBadge: () => (
              <Text>{countPlayers().numberOfKeeperSelected || 0}</Text>
            ),
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
            tabBarBadge: () => (
              <Text>{countPlayers().numberOfBatsmenSelected || 0}</Text>
            ),
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
            tabBarBadge: () => (
              <Text>{countPlayers().numberOfBowlersSelected || 0}</Text>
            ),
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
            tabBarBadge: () => (
              <Text>{countPlayers().numberOfAllroundersSelected || 0}</Text>
            ),
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
          const {
            numberOfBatsmenSelected,
            numberOfBowlersSelected,
            numberOfAllroundersSelected,
            numberOfKeeperSelected,
          } = countPlayers();

          if (!selectedPlayers || selectedPlayers.length === 0) {
            displayToast('Please select atleast one player');
            return;
          }
          if (numberOfKeeperSelected < 1) {
            displayToast('Please select atleast one keeper');
            return;
          } else if (numberOfBatsmenSelected + numberOfBowlersSelected < 5) {
            displayToast('You must select a total of 5 Batsmen and Bowlers');
            return;
          } else if (numberOfAllroundersSelected < 1) {
            displayToast('You must select atleast one AllRounder');
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
  const [imageError, setImageError] = useState(false);

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

  const addOrRemovePlayer = playerData => {
    if (isSelected) {
      setIsSelected(false);
      dispatch({
        type: 'REMOVE_TEAM_PLAYER',
        payload: player,
      });
      eventManager.emit('playerSelectionChanged', playerData);
      return;
    }

    if (!isSelected) {
      const selectedPlayers = store.getState().buildYourTeam?.selectedPlayers;
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
        type: 'CHOOSE_TEAM_PLAYER',
        payload: player,
      });
      eventManager.emit('playerSelectionChanged');

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
            description={player.teamName}
            key={player.playerID}
            left={() => (
              <Image
                style={styles.playerImage}
                source={
                  !imageError
                    ? {
                        uri: `https://images.cricket.com/players/${player.playerID}_headshot.png`,
                      }
                    : require('../../assets/images/Player.png')
                }
                onError={() => {
                  setImageError(true);
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
  playerImage: {
    resizeMode: 'contain',
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
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default ChoosePlayers;
