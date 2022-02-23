import React from 'react';
import {View, StyleSheet, Text, ActivityIndicator, Button} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import CarouselCardItem, {SLIDER_WIDTH, ITEM_WIDTH} from './CarouselCardItem';
import useApiCall from '../util/ApiCall';
import {gql} from '@apollo/client';
import {useNavigation} from '@react-navigation/native';
import colors from '../constants/colors';

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

const CarouselCards = ({navigation}) => {
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
    return (
      <View style={styles.container}>
        <Text>
          There was an error in getting the matches data. Please check your
          network settings
        </Text>
        <Button
          title="Visit Matches Data"
          onPress={() => navigation.navigate('Match_Details')}
        />
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

  return (
    <View style={styles.container}>
      <Text>Currently There Is No Upcoming Matches</Text>
      <Button
        title="Visit Matches Data"
        onPress={() => navigation.navigate('Match_Details')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  carousalContainer: {
    backgroundColor: colors.grey,
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
  container: {
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    padding: 20,
    margin: 10,
    alignSelf: 'center',
  },
});
export default CarouselCards;
