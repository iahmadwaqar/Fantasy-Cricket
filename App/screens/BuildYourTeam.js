import React, {useEffect} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {gql, useQuery} from '@apollo/client';
import {View, Text, Alert, StyleSheet} from 'react-native';
import {useDispatch, useStore} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import AppBarComponent from '../components/AppBarComponent';
import colors from '../constants/colors';

import matchDetailQuery from '../constants/queries/matchDetailQuery';

import ChooseLeague from '../components/buildYourTeam/ChooseLeague';
import ChoosePlayers from '../components/buildYourTeam/ChoosePlayers';
import ChooseLogic from '../components/buildYourTeam/ChooseLogic';
import ChooseTeam from '../components/buildYourTeam/ChooseTeam';

const Tab = createMaterialTopTabNavigator();

const MATCH_DETAILS_QUERY = gql`
  ${matchDetailQuery}
`;

const BuildYourTeam = ({navigation, route}) => {
  const store = useStore();
  console.log('Match Details Screen');

  const dispatch = useDispatch();

  useEffect(() => {
    const backAction = navigation.addListener('beforeRemove', e => {
      const selectedPlayers = store.getState().buildYourTeam?.selectedPlayers;
      if (selectedPlayers?.length > 0) {
        e.preventDefault();
        Alert.alert(
          'Exit',
          'Are you sure you want to exit? You will lose your selected players.',
          [
            {
              text: 'Cancel',
              onPress: () => {},
              style: 'cancel',
            },
            {
              text: 'OK',
              onPress: () => {
                dispatch({type: 'CLEAR_TEAM_BUILD'});
                navigation.dispatch(e.data.action);
              },
            },
          ],
          {
            cancelable: true,
          },
        );
      }
    });

    return () => backAction;
  }, []);

  const {error, loading, data, refetch, networkStatus} = useQuery(
    MATCH_DETAILS_QUERY,
    {
      variables: {matchID: route.params?.matchID},
      fetchPolicy: 'cache-and-network',
      pollInterval: 500,
    },
  );

  if (loading) {
    return <Text>Loading</Text>;
  }

  if (error) {
    // console.log('error');
    return <Text>error</Text>;
  }

  if (data) {
    dispatch({
      type: 'PLAYERS_LIST',
      payload: data.playerHub,
    });
    dispatch({
      type: 'CHOOSE_MATCH_ID',
      payload: route.params?.matchID,
    });
  }

  return (
    <>
      <AppBarComponent navigation={navigation} route={route} />
      <Tab.Navigator
        backBehavior="order"
        screenOptions={{
          lazy: true,
          swipeEnabled: false,
          tabBarScrollEnabled: true,
          tabBarActiveTintColor: colors.black,
          tabBarInactiveTintColor: colors.textWhite,
          tabBarStyle: {backgroundColor: colors.primary},
          tabBarIndicator: () => null,
          tabBarPressColor: colors.primary,
        }}>
        <Tab.Screen
          name="ChooseLeague"
          options={{
            tabBarLabel: ({color}) => (
              <View style={styles.tabBarLabelContainer}>
                <Text style={{color: color}}>Choose League</Text>
                <Icon name="arrow-right" size={20} color={color} />
              </View>
            ),
          }}
          listeners={{
            tabPress: e => {
              // Prevent default action
              e.preventDefault();
            },
          }}
          component={ChooseLeague}
        />
        <Tab.Screen
          name="ChoosePlayers"
          options={{
            tabBarLabel: ({color}) => (
              <View style={styles.tabBarLabelContainer}>
                <Text style={{color: color}}>Choose Players</Text>
                <Icon name="arrow-right" size={20} color={color} />
              </View>
            ),
          }}
          listeners={{
            tabPress: e => {
              // Prevent default action
              e.preventDefault();
            },
          }}
          component={ChoosePlayers}
        />
        <Tab.Screen
          name="ChooseLogic"
          options={{
            tabBarLabel: ({color}) => (
              <View style={styles.tabBarLabelContainer}>
                <Text style={{color: color}}>Choose Logic</Text>
                <Icon name="arrow-right" size={20} color={color} />
              </View>
            ),
          }}
          listeners={{
            tabPress: e => {
              // Prevent default action
              e.preventDefault();
            },
          }}
          component={ChooseLogic}
        />
        <Tab.Screen
          name="ChooseTeam"
          options={{
            tabBarLabel: ({color}) => (
              <View style={styles.tabBarLabelContainer}>
                <Text style={{color: color}}>Choose Team</Text>
              </View>
            ),
          }}
          listeners={{
            tabPress: e => {
              // Prevent default action
              e.preventDefault();
            },
          }}
          component={ChooseTeam}
        />
      </Tab.Navigator>
    </>
  );
};

const styles = StyleSheet.create({
  tabBarLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default BuildYourTeam;
