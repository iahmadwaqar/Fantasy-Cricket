import React from 'react';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {gql} from '@apollo/client';

import {View, StyleSheet, Linking} from 'react-native';
import {Button, ActivityIndicator, Text} from 'react-native-paper';

import CarouselCardItem, {SLIDER_WIDTH, ITEM_WIDTH} from './CarouselCardItem';
import useGrapthQLApiCall from '../../../util/ApiCall';
import colors from '../../../constants/colors';

const CRICKET_MATCHES_QUERY = gql`
  query getFRCHomePage {
    getFRCHomePage {
      upcomingmatches {
        matchID
        matchName
        matchStatus
        statusMessage
        isLiveCriclyticsAvailable
        homeTeamID
        awayTeamID
        homeTeamShortName
        awayTeamShortName
        matchNumber
        toss
        matchDateTimeGMT
        tourName
        matchType
        city
        matchScore {
          teamShortName
          teamID
          teamFullName
        }
      }
    }
  }
`;

const CarouselCards = ({navigation}) => {
  const {error, loading, data} = useGrapthQLApiCall(CRICKET_MATCHES_QUERY);
  const [index, setIndex] = React.useState(0);
  const isCarousel = React.useRef(null);

  if (loading) {
    return (
      <View style={styles.loadingContainerStyle}>
        <ActivityIndicator size={'large'} />
      </View>
    );
  }
  if (error) {
    return (
      <View style={styles.errorContainerStyle}>
        <Text>
          There was an error in getting the matches data. Please check your
          network settings
        </Text>
        <Button
          style={{marginVertical: 20}}
          mode="contained"
          onPress={() => Linking.openSettings()}>
          Go To Settings
        </Button>
      </View>
    );
  }
  if (data.getFRCHomePage.upcomingmatches.length > 0) {
    return (
      <View style={styles.carousalContainer}>
        <Carousel
          ref={isCarousel}
          data={data.getFRCHomePage.upcomingmatches}
          renderItem={({item}) => (
            <CarouselCardItem
              item={item}
              index={index}
              navigation={navigation}
            />
          )}
          sliderWidth={SLIDER_WIDTH}
          itemWidth={ITEM_WIDTH}
          onSnapToItem={index => {
            setIndex(index);
          }}
          useScrollView={true}
          // loop={true}
          // autoplay={true}
        />
        <Pagination
          containerStyle={styles.paginationContainerStyle}
          dotsLength={data.getFRCHomePage.upcomingmatches.length}
          activeDotIndex={index}
          carouselRef={isCarousel}
          dotStyle={styles.paginationDotStyle}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
          tappableDots={true}
        />
      </View>
    );
  }
  return (
    <View style={styles.noDataContainerStyle}>
      <Text>Currently there are no live matches</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  carousalContainer: {
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  paginationDotStyle: {
    width: 10,
    height: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.92)',
  },
  paginationContainerStyle: {
    paddingVertical: 10,
  },
  loadingContainerStyle: {
    height: '25%',
    justifyContent: 'center',
  },
  errorContainerStyle: {
    backgroundColor: colors.accent,
    height: '20%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: '95%',
    padding: 30,
    margin: 10,
  },
  noDataContainerStyle: {
    backgroundColor: colors.accent,
    height: '20%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: '95%',
    padding: 30,
    margin: 10,
  },
});
export default CarouselCards;
