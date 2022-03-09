import React, {useEffect, useRef, useState} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {gql, useQuery} from '@apollo/client';
import {View, Text, Button} from 'react-native';
import {useDispatch} from 'react-redux';

import AppBarComponent from '../components/AppBar';
import colors from '../constants/colors';

import matchDetailQuery from '../constants/queries/matchDetailQuery';

import PlayersList from '../components/matchDetailScreen/PlayersList';

const Tab = createMaterialTopTabNavigator();

const MATCH_DETAILS_QUERY = gql`
  ${matchDetailQuery}
`;

const MatchDetail = ({navigation, route}) => {
  console.log('MatchDetail');

  const timeRef = useRef(0);

  // useEffect(() => {
  //   const focusListener = navigation.addListener('focus', () => {
  //     timeRef.current = setInterval(() => {
  //       refetch();
  //       console.log('Refresh');
  //     }, 2000);
  //   });

  //   const blurListener = navigation.addListener('blur', () => {
  //     clearInterval(timeRef.current);
  //   });

  //   return () => {
  //     focusListener;
  //     blurListener;
  //   };
  // }, []);

  const dispatch = useDispatch();
  const {error, loading, data, refetch} = useQuery(MATCH_DETAILS_QUERY, {
    variables: {matchID: route.params?.matchID},
    fetchPolicy: 'cache-and-network',
    // pollInterval: 500,
  });

  if (loading) {
    console.log('Loaidng');
    return <Text>Loading</Text>;
  }

  if (error) {
    console.log('error');
    return <Text>error</Text>;
  }

  if (data) {
    console.log('data');
    dispatch({
      type: 'PLAYERS_LIST',
      payload: data.playerHub,
    });
  }

  return (
    <>
      <AppBarComponent navigation={navigation} route={route} />
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: {fontWeight: '500', color: colors.textWhite},
          tabBarScrollEnabled: true,
          tabBarItemStyle: {width: 130},
          tabBarStyle: {backgroundColor: colors.primary},
        }}>
        {/* <Tab.Screen
          name="Info"
          options={{tabBarLabel: 'Info'}}
          component={MatchDetails}
        />
        <Tab.Screen
          name="Live"
          options={{tabBarLabel: 'Live'}}
          component={MatchDetails}
        />
        <Tab.Screen
          name="ScoreCard"
          options={{tabBarLabel: 'ScoreCard'}}
          component={MatchDetails}
        />
        <Tab.Screen
          name="Commentary"
          options={{tabBarLabel: 'Commentary'}}
          component={MatchDetails}
        />
        <Tab.Screen
          name="Highlights"
          options={{tabBarLabel: 'Highlights'}}
          component={MatchDetails}
        /> */}
        <Tab.Screen
          name="FantasyPicks"
          options={{tabBarLabel: 'Fantasy Picks'}}
          component={MatchDetails}
        />
        <Tab.Screen
          name="PlayersList"
          options={{tabBarLabel: 'Players List'}}
          component={PlayersList}
        />
        {/* <Tab.Screen
          name="Head2Head"
          options={{tabBarLabel: 'Head 2 Head'}}
          component={MatchDetails}
        />
        <Tab.Screen
          name="PointsTable"
          options={{tabBarLabel: 'Points Table'}}
          component={MatchDetails}
        /> */}
      </Tab.Navigator>
    </>
  );
};
function MatchDetails({navigation, route}) {
  return (
    <>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{color: 'red'}}>Home {route.params?.matchID}</Text>
        <Text style={{color: 'red'}}>Home {route.params?.title}</Text>
        {/* <Button
          title={'Click Here To Update Header Title Dynamically'}
          onPress={() => setTitle('NEW')}
        /> */}
        <Button
          title="Go to Details"
          onPress={() => navigation.navigate('NewsDetail')}
        />
      </View>
    </>
  );
}
export default MatchDetail;
