import React, {useContext} from 'react';
import {FlatList} from 'react-native';

import currencies from '../data/currencies';
import {RowItem, RowSeparator} from '../components/RowItem';
import {ConversionContext} from '../util/ConversionContext';

const CurrencyList = ({navigation, route = {}}) => {
  const {baseCurrency, setBaseCurrency, targetCurrency, setTargetCurrency} =
    useContext(ConversionContext);
  const {isBaseCurrency} = route.params;

  const renderItem = ({item}) => {
    let selected = false;
    if (isBaseCurrency) {
      selected = baseCurrency === item;
    } else {
      selected = targetCurrency === item;
    }

    return (
      <RowItem
        title={item}
        onPress={() => {
          if (isBaseCurrency) {
            setBaseCurrency(item);
          } else {
            setTargetCurrency(item);
          }
          navigation.pop();
        }}
        icon={selected && 'check'}
      />
    );
  };
  return (
    <FlatList
      data={currencies}
      renderItem={renderItem}
      keyExtractor={item => item}
      ItemSeparatorComponent={() => <RowSeparator />}
    />
  );
};

export default CurrencyList;
