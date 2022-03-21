import React from 'react';
import {Platform, StyleSheet} from 'react-native';
import {Appbar} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';

const AppBarComponent = ({navigation, route}) => {
  const canGoBack = navigation.canGoBack();
  return (
    <Appbar.Header>
      {canGoBack && <Appbar.BackAction onPress={() => navigation.goBack()} />}
      <Appbar.Content
        title={route.params?.title || route.name}
        titleStyle={styles.titleStyle}
        style={styles.appbarContent}
      />
      <Appbar.Action
        icon="magnify"
        onPress={() => {}}
        style={{paddingHorizontal: 0, marginHorizontal: 0}}
      />
      <Appbar.Action icon={MORE_ICON} onPress={() => {}} />
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  titleStyle: {
    fontSize: 19,
  },
  appbarContent: {
    paddingLeft: 0,
    marginLeft: 0,
  },
});

export default AppBarComponent;
