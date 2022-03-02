import React from 'react';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {StatusBar} from 'react-native';

import colors from '../constants/colors';

const theme = {
  ...DefaultTheme,
  roundness: 5,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3db',
    accent: '#f0f',
    background: '#000',
    text: '#0ff',
  },
};

const PaperProviderWrapper = ({children}) => {
  return (
    <PaperProvider theme={theme}>
      <StatusBar barStyle="light-content" backgroundColor={colors.tomato} />
      {children}
    </PaperProvider>
  );
};

export default PaperProviderWrapper;
