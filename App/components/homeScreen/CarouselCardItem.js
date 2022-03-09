import React from 'react';
import {View, StyleSheet, Dimensions, Image} from 'react-native';
import {Text, TouchableRipple} from 'react-native-paper';

import colors from '../../constants/colors';

export const SLIDER_WIDTH = Dimensions.get('window').width + 120;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);

const CarouselCardItem = ({index, item, navigation}) => {
  const matchIndex = index;
  const matchData = item;
  return (
    <TouchableRipple
      onPress={() => {
        navigation.navigate('MatchDetail', {
          matchID: matchData.matchID,
          title: `${matchData.homeTeamShortName} vs ${matchData.awayTeamShortName}`,
        });
      }}>
      <View style={styles.container} key={matchIndex}>
        <Text style={styles.matchName}>{matchData.matchName}</Text>
        <View style={styles.matchTimeAndVenueContainer}>
          <Text style={styles.matchTimeAndVenue}>{matchData.matchNumber},</Text>
          <Text style={styles.matchTimeAndVenue}>{matchData.matchType},</Text>
          <Text style={styles.matchTimeAndVenue}>AT {matchData.city},</Text>
          <Text style={styles.matchTimeAndVenue}>
            {new Date(
              parseInt(matchData.matchDateTimeGMT, 10),
            ).toLocaleDateString()}
          </Text>
        </View>
        <View style={styles.horizontalLineView} />
        <View style={{paddingTop: 15}}>
          <View style={styles.teamNameAndFlagContainer}>
            <Image
              source={{
                uri: `https://images.cricket.com/teams/${matchData.homeTeamID}_flag_safari.png`,
              }}
              style={styles.image}
            />
            <Text style={styles.teamName}>
              {matchData.matchScore[1].teamFullName}
            </Text>
          </View>

          <View style={styles.teamNameAndFlagContainer}>
            <Image
              source={{
                uri: `https://images.cricket.com/teams/${matchData.awayTeamID}_flag_safari.png`,
              }}
              style={styles.image}
            />
            <Text style={styles.teamName}>
              {matchData.matchScore[0].teamFullName}
            </Text>
          </View>
        </View>
      </View>
    </TouchableRipple>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.accent,
    borderRadius: 15,
    width: ITEM_WIDTH,
    paddingBottom: 10,
  },
  matchTimeAndVenueContainer: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  horizontalLineView: {
    borderBottomColor: colors.grey,
    borderBottomWidth: 1,
    marginLeft: 10,
    marginRight: 10,
  },
  image: {
    width: 60,
    height: 35,
    borderRadius: 5,
    marginRight: 10,
    borderColor: colors.grey,
    borderWidth: 1,
  },
  matchName: {
    color: colors.text,
    fontSize: 12,
    fontWeight: 'bold',
    padding: 10,
  },
  matchTimeAndVenue: {
    color: colors.textLight,
    fontSize: 12,
    paddingRight: 5,
  },
  teamNameAndFlagContainer: {
    flexDirection: 'row',
    marginLeft: 10,
    paddingBottom: 10,
    alignItems: 'center',
  },
  teamName: {
    color: colors.textLight,
    fontSize: 14,
  },
});

export default CarouselCardItem;
