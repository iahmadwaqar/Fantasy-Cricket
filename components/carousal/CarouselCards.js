import React from 'react';
import {View, StyleSheet, Text, ActivityIndicator} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import CarouselCardItem, {SLIDER_WIDTH, ITEM_WIDTH} from './CarouselCardItem';
import useApiCall from './ApiCall';
import {gql} from '@apollo/client';
import {useNavigation} from '@react-navigation/native';

const CRICKET_MATCHES = gql`
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

const CarouselCards = () => {
  const navigation = useNavigation();
  const {error, loading, data} = useApiCall(CRICKET_MATCHES);
  const [index, setIndex] = React.useState(0);
  const isCarousel = React.useRef(null);

  if (loading) {
    return (
      <View style={styles.activityIndicator}>
        <ActivityIndicator size={'large'} />
      </View>
    );
  }
  if (error) {
    return <Text>Error</Text>;
  }
  if (data) {
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
          loop={true}
          autoplay={true}
        />
        <Pagination
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
};

const styles = StyleSheet.create({
  carousalContainer: {
    backgroundColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  paginationDotStyle: {
    width: 10,
    height: 5,
    borderRadius: 5,
    marginHorizontal: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.92)',
  },
  activityIndicator: {
    height: '50%',
    justifyContent: 'center',
  },
});
export default CarouselCards;
