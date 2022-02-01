import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';

export const SLIDER_WIDTH = Dimensions.get('window').width + 100;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);

const CarouselCardItem = ({index, item, navigation}) => {
  const matchIndex = index;
  const matchData = item;
  return (
    <TouchableWithoutFeedback
      onPress={() =>
        navigation.navigate('Match_Details', {matchID: matchData.matchID})
      }>
      <View style={styles.container} key={matchIndex}>
        <Text numberOfLines={1} style={styles.matchName}>
          {matchData.matchName}
        </Text>
        <View style={{flexDirection: 'row', marginLeft: 10}}>
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
          <View style={styles.teamNameAndFlagView}>
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

          <View style={styles.teamNameAndFlagView}>
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
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 15,
    width: ITEM_WIDTH,
    paddingBottom: 10,
  },
  horizontalLineView: {
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    marginLeft: 10,
    marginRight: 10,
  },
  image: {
    width: 55,
    height: 30,
    borderRadius: 5,
  },
  matchName: {
    color: '#222',
    fontSize: 12,
    fontWeight: 'bold',
    padding: 10,
  },
  matchTimeAndVenue: {
    color: '#555',
    fontSize: 12,
    paddingRight: 5,
  },
  teamNameAndFlagView: {
    flexDirection: 'row',
    marginLeft: 10,
    paddingBottom: 10,
    alignItems: 'center',
  },
  teamName: {
    color: '#555',
    fontSize: 14,
  },
});

export default CarouselCardItem;
