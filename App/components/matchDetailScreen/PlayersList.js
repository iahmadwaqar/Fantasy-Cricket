import React, {useEffect, useState, useRef} from 'react';
import {useSelector} from 'react-redux';

import Animated, {StretchInY, StretchInX} from 'react-native-reanimated';
import {View, ScrollView} from 'react-native';
import {List, Text, Avatar, Button} from 'react-native-paper';

import colors from '../../constants/colors';

const PlayersList = ({navigation}) => {
  const playersData = useSelector(state => state.PlayersData);
  const playersList = playersData?.recentForm;
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const focusListener = navigation.addListener('focus', () => {
      setIsFocused(true);
    });
    const blurListener = navigation.addListener('blur', () => {
      setIsFocused(false);
    });

    return () => {
      focusListener;
      blurListener;
    };
  }, [navigation]);

  if (!isFocused) {
    return null;
  }

  return (
    <Animated.View entering={StretchInX.duration(500).springify()}>
      <ScrollView>
        <List.AccordionGroup>
          <List.Accordion
            id={1}
            title={playersData?.homeTeamName}
            left={() => (
              <Avatar.Image
                size={54}
                source={{
                  uri: `https://images.cricket.com/teams/${playersData.homeTeamID}_flag_safari.png`,
                }}
              />
            )}>
            {playersList.map(player => {
              if (player.teamID === playersData?.homeTeamID) {
                return (
                  <AccordionListItem
                    key={player.playerID}
                    playerId={player.playerID}
                    PlayerName={player.name}
                  />
                );
              }
            })}
          </List.Accordion>
          <List.Accordion
            id={2}
            title={playersData?.awayTeamName}
            left={() => (
              <Avatar.Image
                size={54}
                source={{
                  uri: `https://images.cricket.com/teams/${playersData.awayTeamID}_flag_safari.png`,
                }}
              />
            )}>
            {playersList.map(player => {
              if (player.teamID === playersData?.awayTeamID) {
                return (
                  <AccordionListItem
                    key={player.playerID}
                    playerId={player.playerID}
                    PlayerName={player.name}
                  />
                );
              }
            })}
          </List.Accordion>
        </List.AccordionGroup>
      </ScrollView>
    </Animated.View>
  );
};

const AccordionListItem = ({navigation, playerId, PlayerName}) => {
  return (
    <Animated.View entering={StretchInY.springify()}>
      <List.Item
        title={PlayerName}
        key={playerId}
        style={{backgroundColor: colors.accent, borderRadius: 10, margin: 5}}
        left={() => (
          <Avatar.Image size={44} source={{uri: 'https://picsum.photos/200'}} />
        )}
        right={() => <List.Icon icon="cricket" color={colors.primary} />}
      />
    </Animated.View>
  );
};

export default PlayersList;
