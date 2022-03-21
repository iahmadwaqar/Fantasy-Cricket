import React from 'react';
import {View, Image, StyleSheet, ScrollView} from 'react-native';
import {
  Text,
  Title,
  Button,
  Paragraph,
  TouchableRipple,
} from 'react-native-paper';

import colors from '../../constants/colors';

const News = ({navigation}) => {
  return (
    <ScrollView>
      <NewsItem navigation={navigation} title={'News Title 1'}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eu nunc
        eget nunc efficitur efficitur.
      </NewsItem>
      <NewsItem navigation={navigation} title={'News Title 2'}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eu nunc
        eget nunc efficitur efficitur.
      </NewsItem>
      <NewsItem navigation={navigation} title={'News Title 3'}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eu nunc
        eget nunc efficitur efficitur.
      </NewsItem>
      <NewsItem navigation={navigation} title={'News Title 4'}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eu nunc
        eget nunc efficitur efficitur.
      </NewsItem>
      <NewsItem navigation={navigation} title={'News Title 5'}>
        Lorem ipsum dolor sit amet, consectetur adipiscing 5elit. Nullam eu nunc
        eget nunc efficitur efficitur.
      </NewsItem>
      <NewsItem navigation={navigation} title={'News Title 6'}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eu nunc
        eget nunc efficitur efficitur.
      </NewsItem>
    </ScrollView>
  );
};

const NewsItem = ({navigation, title, children}) => {
  return (
    <TouchableRipple
      onPress={() =>
        navigation.navigate('NewsDetail', {
          title: title,
          id: Math.random(),
        })
      }>
      <View style={styles.newsContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={{uri: 'https://picsum.photos/700'}}
            style={styles.image}
          />
        </View>
        <View style={styles.contentContainer}>
          <Title style={styles.newsTitle}>{title}</Title>
          <Text numberOfLines={4} style={styles.newsDescription}>
            {children}
          </Text>
        </View>
      </View>
    </TouchableRipple>
  );
};

const styles = StyleSheet.create({
  newsContainer: {
    flexDirection: 'row',
    backgroundColor: colors.background,
    margin: 3,
    height: 100,
    borderRadius: 5,
    borderColor: colors.border,
    borderWidth: 1,
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 11,
    },
    shadowOpacity: 0.57,
    shadowRadius: 15.19,
    elevation: 3,
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  contentContainer: {
    flex: 3,
    backgroundColor: colors.background,
    paddingHorizontal: 10,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  newsTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
  newsDescription: {
    color: colors.textLight,
    fontSize: 13,
    textAlign: 'justify',
  },
  newsLink: {
    color: '#00f',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});

export default News;
