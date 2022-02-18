import React from 'react';
import {View, Linking, StatusBar} from 'react-native';
import {RowItem, RowSeparator} from '../components/RowItem';

function openLink(url) {
  return Linking.openURL(url).catch(err =>
    console.error('An error occurred', err),
  );
}

const Options = () => {
  return (
    <View>
      <StatusBar barStyle="dark-content" backgroundColor={'white'} />
      <RowItem
        title={'Theme'}
        icon={'chevron-right'}
        onPress={() => openLink('https://www.google.com')}
      />

      <RowSeparator />

      <RowItem
        title={'Items Second'}
        icon={'share'}
        onPress={() => alert('Hell')}
      />

      <RowSeparator />

      <RowItem title={'Rss Item'} icon={'rss'} onPress={() => alert('Hedll')} />
    </View>
  );
};

export default Options;
