import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import AppBarComponent from '../components/AppBarComponent';
import colors from '../constants/colors';

const NewsDetail = ({navigation, route}) => {
  return (
    <View style={styles.container}>
      <AppBarComponent navigation={navigation} route={route} />
      <Text style={styles.title}>{route.params?.title}</Text>
      <Text style={styles.description}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eu nunc
        eget nunc efficitur efficitur.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.accent,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default NewsDetail;
