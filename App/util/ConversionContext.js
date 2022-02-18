import React, {createContext, useState} from 'react';
import {api} from './api';

export const ConversionContext = createContext();

const ConversionContextProvider = ({children}) => {
  const [baseCurrency, _setBaseCurrency] = useState('USD');
  const [targetCurrency, setTargetCurrency] = useState('PKR');
  const [conversionRate, setConversionRate] = useState(171.5);

  const setBaseCurrency = currency => {
    api(`/latest?base=${currency}`).then(res => {
      const {rates} = res;
      const rate = rates[baseCurrency];
      setConversionRate(rate);
    });

    _setBaseCurrency(currency);
  };

  const swapCurrencies = () => {
    setBaseCurrency(targetCurrency);
    setTargetCurrency(baseCurrency);
  };

  const contextValues = {
    baseCurrency,
    setBaseCurrency,
    targetCurrency,
    setTargetCurrency,
    conversionRate,
    setConversionRate,
    swapCurrencies,
  };

  return (
    <ConversionContext.Provider value={contextValues}>
      {children}
    </ConversionContext.Provider>
  );
};

export default ConversionContextProvider;
